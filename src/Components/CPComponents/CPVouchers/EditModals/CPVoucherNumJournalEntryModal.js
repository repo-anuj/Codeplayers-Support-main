import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Label,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { now } from "moment";
import { values } from "lodash";

const CPVoucherNumJournalEntryModal = ({
  voucherNumJSON,
  onUpdate,
  isOpen,
  toggleOpen,
}) => {
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const addEntry = (values, resetForm) => {
    setEntries((prevEntries) => [
      ...prevEntries,
      {
        type: values.type,
        account: values.account,
        amount: values.amount,
      },
    ]);

    const newType = values.type === "Dr." ? "Cr." : "Dr.";
    const nextAmount = values.type === "Dr." ? values.amount : "";

    resetForm({
      values: {
        voucherDate: values.voucherDate,
        narration: values.narration,
        type: newType,
        account: "",
        amount: nextAmount,
      },
    });
  };

  const handleSubmit = (values) => {
    if (balance !== 0) {
      setError("Debit is not equal to Credit");
    } else {
      setError("");

      const updatedJson = { ...voucherNumJSON };

      updatedJson.voucherDate = values.voucherDate;
      updatedJson.narration = values.narration;

      updatedJson.item = [];
      updatedJson.financial = [];

      entries.map((existingEntry, index) => {
        updatedJson.financial.push({
          type: "Ledger",
          sequence: index,
          stockGroup: "",
          particulars: existingEntry.account,
          exclusiveAmount: existingEntry.amount,
          drCr: existingEntry.type,
        });
      });

      updatedJson.grandTotal = updatedJson.financial.reduce((total, item) => {
        return total + (item.drCr === "Dr." ? item.exclusiveAmount : 0 || 0); // Sum up vendorReply amounts
      }, 0);

      onUpdate(updatedJson);
    }
  };

  const validationSchema = Yup.object({
    voucherDate: Yup.date().required("Voucher date is required").nullable(),
    narration: Yup.string()
      .required("Narration is required")
      .max(255, "Narration cannot exceed 255 characters"),
  });

  const handleModalClose = () => {
    setFormError("");
    setError("");
    toggleModalItem();
  };

  const calculateBalance = () => {
    const currentBalance = entries.reduce((acc, entry) => {
      return (
        acc +
        (entry.type === "Dr." ? Number(entry.amount) : -Number(entry.amount))
      );
    }, 0);
    setBalance(currentBalance);
  };

  useEffect(() => {
    calculateBalance();
  }, [entries]);

  const handleAddEntryClick = (values, resetForm) => {
    if (!values.type || !values.account || !values.amount) {
      setFormError("All fields (Type, Account, Amount) must be filled.");
      return;
    }
    setFormError("");
    setError("");
    addEntry(values, resetForm);
  };

  const handleDeleteEntry = (index) => {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleOpen}>
      <ModalHeader style={{ backgroundColor: "#f5f5f5" }} toggle={toggleOpen}>
        <div className="w-100 ">
          <div className="d-flex align-items-center mb-2 ">
            <span className="flex-grow-1">{`${voucherNumJSON.voucherNumber} `}</span>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {formError && <Alert color="danger">{formError}</Alert>}

        <Formik
          initialValues={{
            voucherDate: voucherNumJSON.voucherDate,
            narration: voucherNumJSON.narration,
            type: "Dr.",
            account: "",
            amount: "",
            entries: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, resetForm }) => (
            <Form>
              <Row className="mb-1">
                <Col>
                  <Label for="voucherDate" className="mb-0 mt-1">
                    Voucher Date
                  </Label>
                  <Input
                    type="date"
                    name="voucherDate"
                    id="voucherDate"
                    value={values.voucherDate}
                    onChange={handleChange}
                    invalid={touched.voucherDate && !!errors.voucherDate}
                  />
                  <FormFeedback>{errors.voucherDate}</FormFeedback>
                </Col>
              </Row>
              <br />

              <Row className="mb-3 align-items-center g-1">
                <Col xs={8} md={8} className="d-flex align-items-center">
                  {" "}
                  <Input
                    type="select"
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      background: "none",
                      padding: "9px",
                      width: "auto", // Adjust to your need
                      flex: "1", // Allow it to fill remaining space
                    }}
                    name="type"
                    id="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Cr.">Cr.</option>
                  </Input>
                  <Input
                    type="text"
                    name="account"
                    id="account"
                    placeholder="Enter Account"
                    value={values.account}
                    onChange={handleChange}
                    invalid={touched.account && !!errors.account}
                  />
                </Col>

                <Col xs={3} md={3}>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    value={values.amount}
                    onChange={handleChange}
                    invalid={touched.amount && !!errors.amount}
                  />
                  <FormFeedback>{errors.amount}</FormFeedback>
                </Col>

                <Col xs={1} md={1}>
                  <Button
                    className="btn-primary mt-0"
                    style={{ fontWeight: "bold" }}
                    type="button"
                    onClick={() => handleAddEntryClick(values, resetForm)}
                  >
                    +
                  </Button>
                </Col>
              </Row>

              {entries.length > 0 && (
                <Row>
                  <Col>
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <td>
                            <b className="fs-14">Particulars</b>
                          </td>
                          <td className="text-end">
                            <b className="fs-14">Amount</b>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Driver Name */}
                        {entries.map((entry, index) => (
                          <tr>
                            <td className="text-start">
                              <i className="mdi mdi-delete-outline align-middle me-3 text-danger fs-16"></i>
                              {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;
                              <b>{entry.account}</b>
                            </td>
                            <td className="text-end">
                              <b>
                                {entry.amount} {entry.type}
                              </b>
                            </td>
                            <td className="text-start"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              )}
              <br />
              <Row>
                <Col>
                  <Label for="narration" className="mb-0 mt-1">
                    Narration
                  </Label>
                  <Input
                    type="text"
                    name="narration"
                    id="narration"
                    value={values.narration}
                    onChange={handleChange}
                    invalid={touched.narration && !!errors.narration}
                  />
                  <FormFeedback>{errors.narration}</FormFeedback>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default CPVoucherNumJournalEntryModal;
