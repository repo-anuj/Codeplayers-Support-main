import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "../CPSCSS/setPageScale.css";
import { textSizeForOverflow } from "../TextSizeForOverflow";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import IconsForVoucherType from "../CPIcons/IconsForVoucherType";
const CPDashboardSummaryCard = ({ data, cardType, onCardClick }) => {
  const toggleModal = () => setModal(!modal);

  if (data === null || data === undefined) {
    return "";
  }
  // if (data.data === undefined) {
  //   return "";
  // }
  const handleButtonClick = () => {
    onCardClick(cardType, data.voucherSeries);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <div className="align-items-center d-flex">
                <span
                  className="avatar-title bg-light rounded-circle"
                  style={{ width: "24px", height: "24px", paddingRight: "5px" }}
                >
                  {IconsForVoucherType(data.voucherType)}
                </span>
                <h4
                  style={textSizeForOverflow()}
                  className="card-title mb-0 flex-grow-1"
                  onClick={handleButtonClick}
                >
                  {data.voucherSeries}
                </h4>
              </div>
            </CardHeader>
            <CardBody>
              <div className="table-responsive table-card">
                <table className="table align-middle mb-3 table-sm">
                  <thead className="table-light text-muted">
                    <tr>
                      <th colSpan="2" scope="col">
                        Particulars
                      </th>
                      <th scope="col" className="text-end">
                        Net Weight
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <SimpleBar style={{ height: "225px" }}>
                <div className="table-responsive table-card">
                  <table className="table align-middle mb-0 table-sm">
                    <thead
                      className="table-light text-muted"
                      style={{ visibility: "hidden" }}
                    >
                      <tr>
                        <th colSpan="2" scope="col">
                          Particulars
                        </th>
                        <th scope="col" className="text-end">
                          Net Weight
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((individualData) => (
                        <tr>
                          <td colSpan="2">
                            <h5 className="fs-14">{individualData.item} </h5>
                            <p className="text-muted mb-0">
                              <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                              {individualData.processed} |{" "}
                              <text className="text-danger">
                                {individualData.pending} Pending
                              </text>
                            </p>
                          </td>
                          <td className="text-end">
                            <h5 className="fs-14">
                              {formatter.format(individualData.netWeight)}
                            </h5>
                            <p className="text-danger mb-0">
                              {formatter.format(individualData.shortageWeight)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SimpleBar>
              <div className="table-responsive table-card">
                <table className="table align-middle mb-0 table-sm">
                  <thead
                    className="table-light text-muted"
                    style={{ visibility: "hidden" }}
                  >
                    <tr>
                      <th colSpan="2" scope="col">
                        Particulars
                      </th>
                      <th scope="col" className="text-end">
                        Net Weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-active">
                      <th colSpan="2">
                        Total :
                        <p className="text-muted mb-0">
                          <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                          {data.data.reduce(
                            (accumulator, data) => accumulator + data.processed,
                            0
                          )}{" "}
                          |{" "}
                          <text className="text-danger">
                            {data.data.reduce(
                              (accumulator, data) => accumulator + data.pending,
                              0
                            )}{" "}
                            Pending
                          </text>
                        </p>
                      </th>

                      <td className="text-end">
                        <span className="fw-semibold">
                          {formatter.format(
                            data.data.reduce(
                              (accumulator, data) =>
                                accumulator + data.netWeight,
                              0
                            )
                          )}
                        </span>
                        <p className="text-danger mb-0">
                          {formatter.format(
                            data.data.reduce(
                              (accumulator, data) =>
                                accumulator + data.shortageWeight,
                              0
                            )
                          )}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CPDashboardSummaryCard;
