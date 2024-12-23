import React, { useState, useMemo, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Label,
  Row,
  Col,
  FormGroup,
  Spinner,
} from "reactstrap";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CPInwardOrderSummaryCard from "./CPInwardOrderSummaryCard";
import CPDropDownBox from "../../CPInputs/CPDropDownBox";

const CPVoucherNumInwardOrderEntryModal = ({
  voucher,
  onUpdate,
  isOpen,
  toggleOpen,
  ppod,
}) => {
  const [selectedOrderAccount, setSelectedOrderAccount] = useState(null);
  const [selectedBrokerAccount, setSelectedBrokerAccount] = useState(null);

  // Extract unique order and broker accounts
  const uniqueOrderAccounts = (data) => {
    const accountSet = new Set();
    return data.reduce((acc, item) => {
      if (!accountSet.has(item.account)) {
        accountSet.add(item.account);
        acc.push({
          primaryKey: item.account,
          mainColumn: item.account,
          masterFilter: item.account.includes("PRIVATE LIMITED")
            ? "Business"
            : "Personal",
          code: item.purchaseDate.split("T")[0], // Format as YYYY-MM-DD
        });
      }
      return acc;
    }, []);
  };

  const uniqueBrokerAccounts = (data) => {
    const accountSet = new Set();
    return data.reduce((acc, item) => {
      if (!accountSet.has(item.broker)) {
        accountSet.add(item.broker);
        acc.push({
          primaryKey: item.broker,
          mainColumn: item.broker,
          masterFilter: item.broker.includes("PRIVATE LIMITED")
            ? "Business"
            : "Personal",
          code: item.purchaseDate.split("T")[0], // Format as YYYY-MM-DD
        });
      }
      return acc;
    }, []);
  };
  const uniquePurchaseNumber = (data) => {
    const uniquepurchaseNumber = [];
    const accountSet = new Set(); // to keep track of unique accounts

    data.forEach((item) => {
      const purchaseNumber = item.purchaseNumber;
      const purchaseDate = item.purchaseDate.split("T")[0]; // get date part only

      // Determine master filter based on account name
      const masterFilter = purchaseNumber.includes("PRIVATE LIMITED")
        ? "Business"
        : "Personal";

      // Check for uniqueness
      if (!accountSet.has(purchaseNumber)) {
        accountSet.add(purchaseNumber);
        uniquepurchaseNumber.push({
          primaryKey: (purchaseNumber.length + 1).toString(),
          mainColumn: purchaseNumber, // Use account name from dummyData
          masterFilter: masterFilter,
          code: purchaseDate, // format as YYYY-MM-DD
        });
      }
    });

    return uniquepurchaseNumber;
  };
  const uniqueBillingAccounts = (data) => {
    const uniqueBillingAccounts = [];
    const accountSet = new Set(); // to keep track of unique accounts

    data.forEach((item) => {
      const billingAccount = item.billing.name;
      const purchaseDate = item.purchaseDate.split("T")[0]; // get date part only

      // Determine master filter based on account name
      const masterFilter = purchaseNumber.includes("PRIVATE LIMITED")
        ? "Business"
        : "Personal";

      // Check for uniqueness
      if (!accountSet.has(billingAccount)) {
        accountSet.add(billingAccount);
        uniqueBillingAccounts.push({
          primaryKey: (billingAccount.length + 1).toString(),
          mainColumn: billingAccount, // Use account name from dummyData
          masterFilter: masterFilter,
          code: purchaseDate, // format as YYYY-MM-DD
        });
      }
    });

    return uniqueBillingAccounts;
  };

  const purchaseNumber = uniquePurchaseNumber(ppod);
  const billingAccounts = uniqueBillingAccounts(ppod);

  // Get unique Order Accounts and Broker Accounts
  const orderAccounts = uniqueOrderAccounts(ppod);

  // Memoize the filtered broker accounts based on the selected order account
  const filteredBrokerAccounts = useMemo(() => {
    if (!selectedOrderAccount) return uniqueBrokerAccounts(ppod);
    return uniqueBrokerAccounts(
      ppod.filter((item) => item.account === selectedOrderAccount)
    );
  }, [selectedOrderAccount, ppod]);

  // Auto-select broker if only one broker is available
  useEffect(() => {
    if (filteredBrokerAccounts.length === 1 && !selectedBrokerAccount) {
      const broker = filteredBrokerAccounts[0].primaryKey;
      setSelectedBrokerAccount(broker);
    }
  }, [filteredBrokerAccounts, selectedBrokerAccount]);

  // Filter data based on both selected dropdowns
  const filteredData = useMemo(() => {
    return ppod.filter((item) => {
      return (
        (!selectedOrderAccount || item.account === selectedOrderAccount) &&
        (filteredBrokerAccounts.length === 1 ||
          !selectedBrokerAccount ||
          item.broker === selectedBrokerAccount)
      );
    });
  }, [
    selectedOrderAccount,
    selectedBrokerAccount,
    ppod,
    filteredBrokerAccounts,
  ]);

  const validationSchema = Yup.object().shape({
    orderAccount: Yup.string().required("Order Account is required"),
    billingAccount: Yup.string().required("Billing Account is required"),
    purchaseNumber: Yup.string().required("Purchase Number is required"),
    brokerAccount: Yup.string().required("Broker Account is required"),
  });

  return (
    <Modal isOpen={isOpen} toggle={toggleOpen}>
      <ModalHeader toggle={toggleOpen}>Supplier Bill Info</ModalHeader>
      <Formik
        initialValues={{
          orderAccount: null,
          billingAccount: null,
          purchaseNumber: null,
          purchaseDate: "",
          brokerAccount: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form values on submit: ", values);
          setTimeout(() => {
            setSubmitting(false);
            toggle();
          }, 1500);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <ModalBody style={{ marginBottom: "-2rem" }}>
              <Row className="mb-0">
                <Col xs={6}>
                  <FormGroup>
                    <Field
                      name="orderAccount"
                      render={({ field, form }) => (
                        <CPDropDownBox
                          labelTitle="Order A/c:"
                          choicesFromApi={orderAccounts}
                          value={field.value}
                          onChange={(selectedValue) => {
                            setSelectedOrderAccount(selectedValue);
                            setFieldValue(field.name, selectedValue);
                            setFieldValue("brokerAccount", null);
                          }}
                          error={form.errors.orderAccounts}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="orderAccount"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <Field
                      name="billingAccount"
                      render={({ field, form }) => (
                        <CPDropDownBox
                          labelTitle="Billing A/c:"
                          choicesFromApi={billingAccounts}
                          value={field.value}
                          onChange={(selectedValue) =>
                            setFieldValue(field.name, selectedValue)
                          }
                          error={form.errors.billingAccounts}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="billingAccount"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-0">
                <Col xs={6}>
                  <FormGroup>
                    <Field
                      name="purchaseNumber"
                      render={({ field, form }) => (
                        <CPDropDownBox
                          labelTitle="Purchase No:"
                          choicesFromApi={purchaseNumber}
                          value={field.value}
                          onChange={(selectedValue) => {
                            const selectedChoice = purchaseNumber.find(
                              (choice) => choice.mainColumn === selectedValue
                            );
                            form.setFieldValue(field.name, selectedValue);
                            if (selectedChoice) {
                              form.setFieldValue(
                                "purchaseDate",
                                selectedChoice.code
                              );
                            }
                          }}
                          error={form.errors.purchaseNumber}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="purchaseNumber"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Label className="mb-1">Purchase Date:</Label>
                    <Field
                      name="purchaseDate"
                      render={({ field }) => (
                        <input
                          type="text"
                          value={field.value}
                          readOnly
                          className="form-control"
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Field
                  name="brokerAccount"
                  render={({ field, form }) => (
                    <CPDropDownBox
                      labelTitle="Broker A/c:"
                      choicesFromApi={filteredBrokerAccounts}
                      value={field.value}
                      onChange={(selectedValue) => {
                        setSelectedBrokerAccount(selectedValue);
                        setFieldValue(field.name, selectedValue);
                      }}
                      error={form.errors.brokerAccounts}
                    />
                  )}
                />
                <ErrorMessage
                  name="brokerAccount"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
            </ModalBody>
            <CPInwardOrderSummaryCard data={filteredData} />
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                disabled={isSubmitting}
                block
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="light" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CPVoucherNumInwardOrderEntryModal;
