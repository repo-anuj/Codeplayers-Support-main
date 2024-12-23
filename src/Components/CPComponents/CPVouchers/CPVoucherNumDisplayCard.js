import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { GET_VOUCHERNUM_PDF } from "../../../slices/ERPReportings/VoucherNum/DownloadPDF/thunk";
import { useSelector, useDispatch } from "react-redux";
import CPVoucherNumBillingShippingCard from "./CPVoucherNumBillingShippingCard";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import FeatherIcon from "feather-icons-react";
import CPVoucherNumItemModal from "./EditModals/CPVoucherNumItemEditModal";
import CPVoucherNumHeaderEditModal from "./EditModals/CPVoucherNumHeaderEditModal";

const NumberFormatter = ({ number }) => {
  const formattedNumber = Number(number).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
};

const CPVoucherNumDisplayCard = ({ voucher, expand, changeVoucher }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.VoucherNumPDF.data);
  const loading = useSelector((state) => state.VoucherNumPDF.loading);
  const error = useSelector((state) => state.VoucherNumPDF.error);
  const success = useSelector((state) => state.VoucherNumPDF.success);

  const navigate = useNavigate(); // Access the history object for navigation

  const [isExpanded, setIsExpanded] = useState(expand);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    if (voucher.billing) {
      setModal(!modal);
    } else {
      navigate("/VoucherNum?VoucherNumID=" + voucher.voucherNumID);
    }
  };

  const handleDownload = async () => {
    dispatch(GET_VOUCHERNUM_PDF(voucher.voucherNumID));
  };
  const handleWhatsAppClick = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const [modalItem, setModalItem] = useState(false);
  const [modalVoucherHeader, setmodalVoucherHeader] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleModalItem = () => {
    setModalItem(!modalItem);
  };

  const toggleModalVoucherHeader = () => {
    setmodalVoucherHeader(!modalVoucherHeader);
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    toggleModalItem();
  };

  const handleHeaderVoucherClick = () => {
    //setSelectedItem(item);
    toggleModalVoucherHeader();
  };

  const handleUpdateVoucherHeader = (updatedHeader) => {};

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = voucher.item.map((item) => {
      if (item.vendorReply?.rfpuid === updatedItem.rfpuid) {
        return {
          ...item,
          vendorReply: { ...item.vendorReply, ...updatedItem },
        };
      }
      return item; // Return the item unchanged if IDs do not match
    });

    const updatedVoucher = {
      ...voucher,
      item: updatedItems,
    };

    if (
      (updatedItem.rfpuid === "Discount") |
      (updatedItem.rfpuid === "Freight")
    ) {
      if (updatedVoucher.financial && updatedVoucher.financial.length > 0) {
        updatedVoucher.financial = updatedVoucher.financial.map(
          (finItem, index) => {
            if (
              finItem.particulars === "Discount" &&
              updatedItem.rfpuid === "Discount"
            ) {
              return {
                ...finItem,
                exclusiveAmount: updatedItem.amount * -1,
                vendorReply: { ...finItem.vendorReply, ...updatedItem },
              }; // Update only the first item
            } else if (
              finItem.particulars === "Freight" &&
              updatedItem.rfpuid === "Freight"
            ) {
              return {
                ...finItem,
                exclusiveAmount: updatedItem.amount,
                vendorReply: { ...finItem.vendorReply, ...updatedItem },
              }; // Update only the first item
            }

            return finItem; // Return unchanged financial items
          }
        );
      }
    }

    var Discount = 0;
    var Freight = 0;
    const subtotal = updatedItems.reduce((total, item) => {
      return total + (item.vendorReply?.amount || 0); // Sum up vendorReply amounts
    }, 0);

    const gstAmount = updatedItems.reduce((total, item) => {
      return (
        total +
        (item.vendorReply?.amount || 0) *
          (item.vendorReply?.taxRate || 0) *
          0.01
      ); // Sum up tax rates if applicable
    }, 0);

    const gstAmountFin = updatedVoucher.financial.reduce((total, fin) => {
      return (
        total +
        (fin.vendorReply === null
          ? 0
          : (fin.exclusiveAmount || 0) * (fin.vendorReply?.taxRate || 0) * 0.01)
      );
    }, 0);

    if (updatedVoucher.financial && updatedVoucher.financial.length > 0) {
      updatedVoucher.financial = updatedVoucher.financial.map(
        (finItem, index) => {
          if (finItem.particulars === "Sub Total") {
            return { ...finItem, exclusiveAmount: subtotal }; // Update only the first item
          } else if (finItem.particulars === "Discount") {
            Discount = finItem.exclusiveAmount;
          } else if (finItem.particulars === "Freight") {
            Freight = finItem.exclusiveAmount;
          } else if (finItem.particulars === "GST") {
            return { ...finItem, exclusiveAmount: gstAmount + gstAmountFin }; // Update only the first item
          }

          return finItem; // Return unchanged financial items
        }
      );
    }

    const finalAmount =
      subtotal + Discount + Freight + gstAmount + gstAmountFin;

    updatedVoucher.grandTotal = Math.round(finalAmount);

    setVoucher(updatedVoucher);
    changeVoucher(updatedVoucher);

    toggleModalItem();
  };

  if (voucher != null) {
    if (voucher.item.length === 0) {
      if (voucher.financial.length > 0) {
        if (!isExpanded) handleToggle();
      }
    }
  }

  return (
    <React.Fragment>
      <Col>
        <Card>
          <CardHeader>
            <div className="align-items-center d-flex">
              <h5
                className="flex-grow-1"
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              >
                {(voucher === undefined || voucher.account === null) &
                voucher.inventoryVoucher ? (
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleHeaderVoucherClick()}
                    className="text-danger"
                  >
                    Not Yet Filled
                  </span>
                ) : (
                  voucher?.account
                )}
              </h5>

              <div className="d-flex align-items-center flex-shrink-0">
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={handleDownload}
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <i className="ri-download-2-fill align-middle me-0 fs-6"></i>
                  )}
                </button>
                <UncontrolledDropdown className="sm">
                  <DropdownToggle
                    tag="button"
                    className="btn btn-info btn-sm dropdown"
                    type="button"
                  >
                    <i className="ri-more-fill"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <li>
                      <DropdownItem>
                        <i className="ri-check-fill align-bottom me-2 text-success"></i>{" "}
                        Approve
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem>
                        <i className="ri-close-fill align-bottom me-2 text-danger"></i>{" "}
                        Reject
                      </DropdownItem>
                    </li>
                    <li>
                      <DropdownItem
                        onClick={() => {
                          handleWhatsAppClick("testing");
                        }}
                      >
                        <i className="ri-whatsapp-fill align-bottom me-2 text-success"></i>{" "}
                        Whatsapp
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="flex-grow-1">
              <p className="text-muted">{voucher?.voucherSeries}</p>
              <div className="d-flex gap-4 mb-1">
                <div>
                  <i className="ri-time-line text-primary me-1 align-bottom"></i>
                  {voucher?.voucherNumber} |{" "}
                  {moment(voucher?.voucherDate).format("DD-MM-yyyy")}
                </div>
                <div>
                  <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                  {voucher?.entity} | {voucher?.division}
                </div>
              </div>
            </div>
            <div className="d-flex gap-4 mb-1">
              <div id="Purchase-Details">
                <i className="ri-shield-user-line text-primary me-1 align-bottom"></i>

                {voucher?.voucherType === "Request for Proposal" &&
                voucher?.purchaseNumber?.length === 0 ? (
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleHeaderVoucherClick()}
                    className="text-danger"
                  >
                    Not Yet Filled
                  </span>
                ) : voucher?.purchaseNumber?.length > 0 ? (
                  voucher?.purchaseNumber +
                  "| " +
                  moment(voucher?.purchaseDate).format("DD-MM-yyyy")
                ) : (
                  ""
                )}
              </div>
              <div style={{ visibility: "hidden" }}>
                <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                {voucher?.entity} | {voucher?.division}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-borderless align-middle mb-0 table-sm">
                <thead className="table-light text-muted">
                  <tr>
                    <th colSpan="2" scope="col">
                      {(voucher?.item === null ? 0 : voucher?.item?.length) +
                        (voucher?.financial === null
                          ? 0
                          : voucher?.financial?.length) >
                      1 ? (
                        <i
                          className={
                            isExpanded ? "text-danger" : "text-success"
                          }
                          onClick={handleToggle}
                          style={{ cursor: "pointer" }}
                        >
                          {isExpanded ? (
                            <FeatherIcon
                              style={{ width: "16px", height: "16px" }}
                              icon="minus"
                            />
                          ) : (
                            <FeatherIcon
                              style={{ width: "16px", height: "16px" }}
                              icon="plus"
                            />
                          )}
                        </i>
                      ) : (
                        ""
                      )}{" "}
                      Particulars
                    </th>
                    <th scope="col" className="text-end">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voucher?.item
                    ?.slice(0, isExpanded ? voucher?.item.length : 1)
                    .map((item, index) => (
                      <tr
                        key={index}
                        id={index === 0 ? "Item-Zero" : ""}
                        onClick={() => handleRowClick(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <td colSpan="2">
                          <h5 className="fs-14">{item.particulars} </h5>
                          <p className="text-muted mb-0">
                            {item.exclusiveRate == 0 ? (
                              ""
                            ) : (
                              <span>
                                {voucher?.currencyDetails?.symbol}{" "}
                                <NumberFormatter number={item.exclusiveRate} />
                                {" x "}
                              </span>
                            )}
                            {item.quantity} {item.unit}
                            {item.vendorReply === null ? (
                              ""
                            ) : item.vendorReply.quantity +
                                item.vendorReply.rate +
                                item.vendorReply.amount ===
                              0 ? (
                              <span className="text-warning">
                                {" "}
                                | Not Yet Filled
                              </span>
                            ) : item.vendorReply.regret ? (
                              <span className="text-danger"> | Regret</span>
                            ) : (
                              <span className="text-success">
                                {" | " +
                                  voucher?.currencyDetails?.symbol +
                                  " " +
                                  item.vendorReply.rate +
                                  " x " +
                                  item.vendorReply.quantity +
                                  " " +
                                  item.vendorReply.unit +
                                  (item.vendorReply.discount === 0
                                    ? ""
                                    : " @ " + item.vendorReply.discount + "%") +
                                  (item.vendorReply.taxRate === 0
                                    ? ""
                                    : " +" + item.vendorReply.taxRate + "%")}
                              </span>
                            )}
                          </p>
                        </td>
                        <td className="text-end">
                          {item.vendorReply === null ? (
                            <span>
                              {voucher?.currencyDetails?.symbol}{" "}
                              <NumberFormatter number={item.exclusiveAmount} />
                            </span>
                          ) : (
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {voucher?.currencyDetails?.symbol}{" "}
                              <NumberFormatter
                                number={item.vendorReply.amount}
                              />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}

                  {isExpanded && voucher?.financial
                    ? voucher?.financial.map((item, index) =>
                        item.type === "Item" ? null : (
                          <tr
                            key={index}
                            className={
                              item.drCr === "Cr." &&
                              !voucher?.financial
                                .slice(0, index)
                                .some((i) => i.drCr === "Cr.")
                                ? "border-top"
                                : (item.particulars === "Sub Total") |
                                  (item.particulars === "GST")
                                ? "table-active"
                                : ""
                            }
                          >
                            <td colSpan="2" className="text">
                              {voucher?.inventoryVoucher ? "" : item.drCr}{" "}
                              {item.particulars}
                            </td>
                            <td
                              id={
                                item.particulars === "Discount"
                                  ? "input-discount"
                                  : item.particulars === "Freight"
                                  ? "input-freight"
                                  : ""
                              }
                              className="text-end"
                            >
                              {item.particulars === "Sub Total"
                                ? voucher?.currencyDetails?.symbol + " "
                                : ""}
                              {item.editable ? (
                                <span
                                  onClick={() => handleRowClick(item)}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <NumberFormatter
                                    number={item.exclusiveAmount}
                                  />
                                </span>
                              ) : (
                                <div>
                                  <NumberFormatter
                                    number={item.exclusiveAmount}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      )
                    : null}

                  <tr className="table-active">
                    <th colSpan="2">
                      Total ({voucher?.currencyDetails?.symbol}) :
                    </th>
                    <td className="text-end">
                      <span className="fw-semibold">
                        {voucher?.currencyDetails?.symbol}{" "}
                        <NumberFormatter number={voucher?.grandTotal} />
                      </span>
                    </td>
                  </tr>
                  {voucher?.gstPortalNumberAvailable ? (
                    <tr
                      className={
                        voucher?.gstPortalTotal === voucher?.grandTotal
                          ? "table-success"
                          : "table-danger"
                      }
                    >
                      <th colSpan="2">
                        GST Portal ({voucher?.currencyDetails?.symbol}) :
                      </th>
                      <td className="text-end">
                        <span className="fw-semibold">
                          {voucher?.currencyDetails?.symbol}{" "}
                          <NumberFormatter number={voucher?.gstPortalTotal} />
                        </span>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {selectedItem && (
        <CPVoucherNumItemModal
          item={selectedItem}
          modalItem={modalItem}
          toggleModalItem={toggleModalItem}
          onUpdate={handleUpdateItem}
        />
      )}

      {modalVoucherHeader && (
        <CPVoucherNumHeaderEditModal
          voucherJSON={voucher}
          modalVoucherHeader={modalVoucherHeader}
          toggleModalVoucherHeader={toggleModalVoucherHeader}
          onUpdate={handleUpdateVoucherHeader}
        />
      )}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Billing Shipping Details</ModalHeader>
        <ModalBody>
          <CPVoucherNumBillingShippingCard
            billingShipping={voucher?.billing}
            labelTitle={"Billing Details"}
          />
          <CPVoucherNumBillingShippingCard
            billingShipping={voucher?.shipping}
            labelTitle={"Shipping Details"}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CPVoucherNumDisplayCard;
