import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import "../../CPSCSS/setPageScale.css";
import { textSizeForOverflow } from "../../TextSizeForOverflow";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";

import IconsForVoucherType from "../../CPIcons/IconsForVoucherType";
import CPComboBox from "../../CPInputs/CPComboBox";
import CPTextBox from "../../CPInputs/CPTextBox";

const CPInwardOrderSummaryCard = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  const validationSchema = Yup.object().shape({
    orderMode: Yup.string().required("Order Mode is required"),
    freightRate: Yup.number().required("Freight Rate is required"),
    billMode: Yup.string().required("Bill Mode is required"),
    rateDiff: Yup.number().required("Rate Diff is required"),
  });
  const orderOptions = [
    {
      primaryKey: "1",
      mainColumn: "EX",
    },
    {
      primaryKey: "2",
      mainColumn: "For",
    },
  ];

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleQuantityChange = (e) => setNewQuantity(e.target.value);

  const handleSave = () => {
    if (selectedItem) {
      selectedItem.updatedQuantity = newQuantity;
      setModalOpen(false); // Close the modal
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setNewQuantity(item.updatedQuantity || "0.00");
    toggleModal();
  };

  if (!data || data.length === 0) {
    return "";
  }

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
                  <IconsForVoucherType type="voucher" />
                </span>
                <h4
                  style={textSizeForOverflow()}
                  className="card-title mb-0 flex-grow-1"
                >
                  Pending Purchase Orders
                </h4>
              </div>
            </CardHeader>
            <CardBody>
              <div className="table-responsive table-card">
                <table className="table align-middle mb-3 table-sm">
                  <thead className="table-light text-muted">
                    <tr>
                      <th colSpan="2" scope="col">
                        Item
                      </th>
                      <th scope="col" className="text-end">
                        Rate
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <SimpleBar style={{ height: "297px" }}>
                <div className="table-responsive table-card">
                  <table className="table align-middle mb-0 table-sm">
                    <thead
                      className="table-light text-muted"
                      style={{ visibility: "hidden" }}
                    >
                      <tr>
                        <th colSpan="2" scope="col">
                          Item
                        </th>
                        <th scope="col" className="text-end">
                          Voucher No
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.voucherNumID}>
                          <th colSpan="2">
                            <div
                              className="d-flex align-items-center"
                              style={{ marginBottom: "4px" }}
                            >
                              <h6 className="fw-bold mb-0">
                                {item.item[0].particulars}
                              </h6>{" "}
                              {/* Assuming you want the first item's particulars */}
                              <span
                                className={`badge bg-${
                                  item.transportationMode === "EX"
                                    ? "warning"
                                    : "success"
                                } ms-2`}
                              >
                                {item.transportationMode}
                              </span>
                            </div>
                            <p className="text-muted mb-0">
                              <i className="mdi mdi-calendar-outline align-middle me-1 text-muted"></i>
                              {item.voucherNumber} |{" "}
                              {item.voucherDate.split("T")[0]}{" "}
                              {/* Extracting the date */}
                            </p>
                            <p className="text-muted mb-0">
                              {item.item[0].approvedQuantity || "0.00"}{" "}
                              <span className="text-danger">
                                {item.item[0].unit}
                              </span>{" "}
                              |&nbsp; Bal:-{" "}
                              <span className="text-black">
                                {item.item[0].exclusiveAmount || "0.00"}
                              </span>{" "}
                              {/* Using exclusiveAmount as the balance */}
                            </p>
                          </th>

                          <td className="text-end">
                            <div className="d-flex flex-column justify-content-between">
                              <i
                                className="mdi mdi-currency-inr me-1 text-muted"
                                style={{
                                  position: "relative",
                                  top: "-11px",
                                }}
                              ></i>
                              <p
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  textDecoration: "underline",
                                  position: "relative",
                                  bottom: "-11px",
                                }}
                                className="fw-semibold mb-0"
                                onClick={() => openModal(item)}
                              >
                                {item.updatedQuantity || "0.00"}
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SimpleBar>

              <br />
              <Formik
                initialValues={{
                  orderMode: "",
                  freightRate: "",
                  billMode: "",
                  rateDiff: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log("Form Submitted with values: ", values);
                }}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <Row>
                      <Col>
                        <Field
                          name="orderMode"
                          component={({ field }) => (
                            <CPComboBox
                              labelTitle={"Order Mode"}
                              choicesFromApi={orderOptions}
                              value={values.orderMode}
                              onChange={(value) =>
                                handleChange({
                                  target: { name: "orderMode", value },
                                })
                              }
                              onBlur={handleBlur}
                              error={touched.orderMode && errors.orderMode}
                            />
                          )}
                        />
                      </Col>
                      <Col>
                        <Field name="freightRate">
                          {({ field }) => (
                            <CPTextBox
                              id="freightRate"
                              title={"Freight Rate"}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e); // Use Formik's onChange
                              }}
                              onBlur={handleBlur}
                              error={touched.freightRate && errors.freightRate}
                            />
                          )}
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Field
                          name="billMode"
                          component={({ field }) => (
                            <CPComboBox
                              labelTitle={"Bill Mode"}
                              choicesFromApi={orderOptions}
                              value={values.billMode}
                              onChange={(value) =>
                                handleChange({
                                  target: { name: "billMode", value },
                                })
                              }
                              onBlur={handleBlur}
                              error={touched.billMode && errors.billMode}
                            />
                          )}
                        />
                      </Col>
                      <Col>
                        <Field name="rateDiff">
                          {({ field }) => (
                            <CPTextBox
                              id="rateDiff"
                              title={"Rate Diff"}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e); // Use Formik's onChange
                              }}
                              onBlur={handleBlur}
                              error={touched.rateDiff && errors.rateDiff}
                            />
                          )}
                        </Field>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Enter Quantity</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            value={newQuantity}
            onChange={handleQuantityChange}
            placeholder="Enter new quantity"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default CPInwardOrderSummaryCard;
