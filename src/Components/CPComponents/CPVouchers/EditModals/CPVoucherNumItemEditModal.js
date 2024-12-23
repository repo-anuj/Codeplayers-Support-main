import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CPVoucherNumItemModal = ({
  item,
  onUpdate,
  modalItem,
  toggleModalItem,
}) => {
  const handleSubmit = (values) => {
    onUpdate(values);
  };

  const calculateAmount = (regret, quantity, rate, discount) => {
    if ((item.particulars === "Discount") | (item.particulars === "Freight")) {
      quantity = 1;
    }
    const totalAmount = quantity * rate;
    const discountAmount = (totalAmount * discount) / 100;
    const discountedAmount = totalAmount - discountAmount;
    const finalAmount = Math.max(discountedAmount, 0);
    if (regret) {
      return parseFloat(0);
    } else {
      return parseFloat(finalAmount.toFixed(2));
    }
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .min(0, "Quantity must be 0 or greater")
      .required("Quantity is required"),
    rate: Yup.number()
      .min(0, "Rate must be 0 or greater")
      .required("Rate is required"),
    discount: Yup.number().min(0, "Discount cannot be negative"),
    hsn: Yup.number()
      .integer("HSN must be a whole number")
      .required("HSN is required"),
    unit: Yup.string()
      .oneOf(["MTS", "KG"], "Unit is required") // Validate that the unit is either MTS or KG
      .required("Unit is required"), // Ensure unit is selected
  });

  return (
    <Modal isOpen={modalItem} toggle={toggleModalItem}>
      <ModalHeader toggle={toggleModalItem}>
        <div className="w-100 ">
          <div className="d-flex align-items-center mb-2 ">
            <span className="flex-grow-1">{`${item.particulars} `}</span>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <Formik
          initialValues={{
            rfpuid: item.vendorReply.rfpuid,
            regret: item.vendorReply.regret || false,
            quantity: item.vendorReply.quantity || item.quantity,
            unit: item.vendorReply.unit || item.unit, // Initialize unit with default value
            rate: item.vendorReply.rate || 0,
            discount: item.vendorReply.discount || 0,
            description: item.vendorReply.description || "",
            make: item.vendorReply.make || "",
            hsnsac: item.vendorReply.hsnsac || "",
            taxRate: item.vendorReply.taxRate || "0",
            amount: item.vendorReply.amount,
          }}
          //validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Row className="align-items-center mb-3">
                <Col>
                  <Label for="regret">
                    <span className="text-success fw-bold">Item Status</span>
                  </Label>
                  <div>
                    <Input
                      type="radio"
                      name="regret"
                      value={false}
                      id="available"
                      checked={!values.regret}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("regret", false);
                        setFieldValue(
                          "amount",
                          calculateAmount(
                            false,
                            values.quantity,
                            values.rate,
                            values.discount
                          )
                        );
                      }}
                    />{" "}
                    <Label for="available" className="me-3">
                      Available &nbsp;&nbsp;&nbsp;&nbsp;
                    </Label>
                    <Input
                      type="radio"
                      name="regret"
                      id="regret"
                      value={true}
                      checked={values.regret}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("regret", true);
                        setFieldValue(
                          "amount",
                          calculateAmount(
                            true,
                            values.quantity,
                            values.rate,
                            values.discount
                          )
                        );
                      }}
                    />{" "}
                    <Label for="regret" className="me-3">
                      Regret &nbsp;&nbsp;&nbsp;&nbsp;
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={values.quantity}
                    min="0"
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "amount",
                        calculateAmount(
                          values.regret,
                          e.target.value,
                          values.rate,
                          values.discount
                        )
                      );
                    }}
                  />
                  <div className="text-danger">
                    {touched.quantity && errors.quantity}
                  </div>
                </Col>

                <Col>
                  <Label for="unit">Unit</Label>
                  <Input
                    type="select"
                    name="unit"
                    id="unit"
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    value={values.unit}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="MTS">MTS</option>
                    <option value="KG">KG</option>
                    <option value="PCS">PCS</option>
                  </Input>
                </Col>

                <Col>
                  <Label for="rate">Rate</Label>
                  <Input
                    type="number"
                    name="rate"
                    id="rate"
                    value={values.rate}
                    min="0"
                    disabled={values.regret} // Disable when regret is true
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "amount",
                        calculateAmount(
                          values.regret,
                          values.quantity,
                          e.target.value,
                          values.discount
                        )
                      );
                    }}
                  />
                  <div className="text-danger">
                    {touched.rate && errors.rate}
                  </div>
                </Col>

                <Col>
                  <Label for="discount">Discount (%)</Label>
                  <Input
                    type="number"
                    name="discount"
                    id="discount"
                    value={values.discount}
                    min="0"
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "amount",
                        calculateAmount(
                          values.regret,
                          values.quantity,
                          values.rate,
                          e.target.value
                        )
                      );
                    }}
                  />
                  <div className="text-danger">
                    {touched.discount && errors.discount}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    value={values.description}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="make">Make</Label>
                  <Input
                    type="text"
                    name="make"
                    id="make"
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    value={values.make}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="hsnsac">HSN Code</Label>
                  <Input
                    type="number"
                    name="hsnsac"
                    id="hsnsac"
                    value={values.hsnsac}
                    disabled={
                      values.regret |
                      (item.particulars === "Discount") |
                      (item.particulars === "Freight")
                    } // Disable when regret is true
                    min="0"
                    onChange={handleChange}
                  />
                  <div className="text-danger">
                    {touched.hsnsac && errors.hsnsac}
                  </div>
                </Col>
                <Col>
                  <Label for="taxRate">Tax (%)</Label>
                  <Input
                    type="select"
                    name="taxRate"
                    id="taxRate"
                    value={values.taxRate}
                    disabled={values.regret} // Disable when regret is true
                    min="0"
                    onChange={handleChange}
                  >
                    <option value="0">0</option>
                    <option value="5">5</option>
                    <option value="12">12</option>
                    <option value="18">18</option>
                    <option value="28">28</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label for="amount">Exclusive Amount</Label>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    value={values.regret === true ? 0 : values.amount}
                    onChange={handleChange}
                    disabled
                  />
                </Col>
              </Row>
              <br />

              <Row>
                <Col className="text-end">
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default CPVoucherNumItemModal;
