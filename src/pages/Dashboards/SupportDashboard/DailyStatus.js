import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Table,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Flatpickr from 'react-flatpickr'
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GET_SupportDashboard } from "../../../slices/Dashboards/SupportDashboard/thunk";
import { GET_SUPPORTUSER, POST_DailyStatus,GET_SUPPORTSTATUSLIST,GET_DailyStatusDetails, PATCH_DailyStatus } from "../../../slices/thunks";
import DatePicker from "react-datepicker"; // Assuming you have the correct DatePicker component
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import CPDateBox from "./../../../Components/CPComponents/CPInputs/CPDateBox"
// import { GET_SupportStatusList } from "../../../helpers/fakebackend_helper";
import CPStepsTracking from "../../../Components/Common/CPStepsTracking";


const DailyStatus = () => {
  // Modal state
  const [modal, setModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalData,setModalData]=useState(null);


  // State for filters
  const [filterStatus, setFilterStatus] = useState(""); // For filtering by CurrentStatus
  const [filterModule, setFilterModule] = useState(""); // For filtering by Module

  // Redux state
  const data = useSelector((state) => state.SupportDashboard.data);
  const loading = useSelector((state) => state.SupportDashboard.loading);
  const SupportUserData=useSelector((state)=>state.SupportUser.data);
  const DailyStatusData = useSelector((state)=> state.DailyStatus.data);
  const SupportStatusData=useSelector((state)=>state.SupportStatuses.data);
  const DailyStatusByIdData=useSelector((state)=>state.DailyStatusById.data);
  const DailyStatusByIdError=useSelector((state)=>state.DailyStatusById.error);
  const DailyStatusError = useSelector((state) => state.DailyStatus.error);
  const dispatch = useDispatch();
  console.log(data);
  // Local state to manage filtered data
  const [queriesData, setQueriesData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(GET_SupportDashboard());
    dispatch(GET_SUPPORTUSER());
    dispatch(GET_SUPPORTSTATUSLIST());
  }, [dispatch]);
  
  // Update local state when data from Redux changes
  useEffect(() => {
    if (data?.length > 0) {
      setQueriesData(data);
    }
  }, [data]);
  
  //SUBMIT MODAL
  // const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    TicketNumber: Yup.string().required("Ticket Number is required"),
    SupportUser: Yup.string().required("Support User is required"),
    CurrentStatus: Yup.string().required("Status is required"),
    statusDate: Yup.date().required("Status Date is required"),
    DueDate: Yup.date().required("Due Date is required"),
    solutionDetails: Yup.string().required("Solution Details are required"),
    dailyID:Yup.string(),
  });

  const handleSubmit = (values) => {
    // dispatch({
    //   type: "SUBMIT_QUERY_DETAILS", // Replace with your desired action type
    //   payload: values, // Send the entire form data as payload
    // });
    values.SupportID = selectedRow.SupportID;
    if(values.dailyID==""){
      console.log("without dailyID", {values });
      dispatch(POST_DailyStatus({ body: values }));
    }
    else{
      console.log("WithDailyID",{values});
      dispatch(PATCH_DailyStatus({body:values}));
    }
    
    
    
    console.log({values});
    toggleModal(); // Close the modal after submission
  };


  // Handle filter changes
  const handleFilterStatusChange = (event) => setFilterStatus(event.target.value);
  const handleFilterModuleChange = (event) => setFilterModule(event.target.value);

  // Extract unique values for dropdown filters
  const uniqueStatuses = [
    ...new Set(queriesData?.map((query) => query?.CurrentStatus || "Not Updated")),
  ];
  const uniqueModules = [...new Set(queriesData?.map((query) => query?.Module))];

  // Filter the data based on selected filters
  const filteredData = queriesData?.filter((query) => {
    const matchesStatus =
      filterStatus === "" || (query?.CurrentStatus || "Not Updated") === filterStatus;
    const matchesModule = filterModule === "" || query?.Module === filterModule;
    return matchesStatus && matchesModule;
  });

  // Function to handle row click
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData); // Store clicked row's data
    console.log(rowData);
    const now = new Date();
    console.log(now.toISOString()); // Logs the date and time in ISO 8601 format
 // Logs the current date and time
    var SupportID=rowData.SupportID;
    dispatch(GET_DailyStatusDetails(SupportID));
    console.log(DailyStatusByIdData);
     // Open modal
  };
  const openModal = (dailyID) => {
    if (dailyID) {
      console.log("DailyID clicked:", dailyID);
      // Open a modal or perform other actions using the dailyID
      setModalData(dailyID); // Example: Set state for the modal
      setModal(true); // Example: Open the modal
    } else {
      setModal(true);
      setModalData(null);
      
      // Handle the generic "Today's Status" action if required
    }
  };

  // Function to toggle modal visibility
  const toggleModal = () => setModal(!modal);

  // Assuming the options for select inputs are available
  function extractSupportUsers(data) {
    if(data!==null){
      return data.map(item => ({
        id: item.SubUserID, // The value to be selected
        name: item.SubUserName // The label to be displayed
      }));
    }
    else{
      return [];
    }
  }
  function extractSupportStatusList(data) {
    if (data !== null) {
      return data.map(item => ({
        id: item.StatusID, // The value to be selected
        name: item.Status// The label to be displayed
      }));
    }
    else {
      return [];
    }
  }
  // Example usage
  const SupportUser = extractSupportUsers(SupportUserData);

  const statusOptions = extractSupportStatusList(SupportStatusData);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Daily Status" />
          <Row>
            <Col md="8">
              {/* Filters */}
              <Row>
                <Col md="6">
                  <label>Filter by Current Status:</label>
                  <select
                    className="form-control"
                    value={filterStatus}
                    onChange={handleFilterStatusChange}
                  >
                    <option value="">All Status</option>
                    {uniqueStatuses?.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Col>

                <Col md="6">
                  <label>Filter by Module:</label>
                  <select
                    className="form-control"
                    value={filterModule}
                    onChange={handleFilterModuleChange}
                  >
                    <option value="">All Modules</option>
                    {uniqueModules.map((module, index) => (
                      <option key={index} value={module}>
                        {module}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>

              {/* Query Data */}
              <Row className="mt-3">
                <Col xl={12}>
                  <Card className="border shadow-none">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Query Register</h5>
                    </CardHeader>
                    <CardBody>
                      {loading ? (
                        <p>Loading queries...</p>
                      ) : filteredData?.length > 0 ? (
                        <div
                          style={{
                            maxHeight: "60vh", // Adjust the max height as needed
                            overflowY: "auto", // Makes the table scrollable vertically
                            position: "relative",
                          }}
                        >
                          <Table bordered hover responsive>
                            <thead
                              style={{
                                position: "sticky",
                                top: 0,
                                background: "#fff",
                                zIndex: 1,
                              }}
                            >
                              <tr>
                                <th>#</th>
                                <th>Module</th>
                                <th>Daily Status</th>
                                <th>User Name</th>
                                <th>Query Subject</th>
                                <th>Due Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.map((query, index) => (
                                <tr
                                  key={index}
                                  onClick={() => handleRowClick(query)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <td>{index + 1}</td>
                                  <td>{query.Module}</td>
                                  <td>{query.CurrentStatus || "Not Updated"}</td>
                                  <td>{query.TicketUser}</td>
                                  <td>{query.QuerySubject || "N/A"}</td>
                                  <td>
                                    {moment(query.DueDate).format("YYYY-MM-DD")}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <p>No queries found for the selected filters.</p>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md="4">
              <CPStepsTracking
                Page="DailyStatus"
                statuses={DailyStatusByIdData||[]}
                labelTitle={selectedRow?.TicketNumber||""}
                onClick={openModal}
                
              />
            </Col>
          </Row>
          

          {/* Modal for Row Details */}
          <Modal isOpen={modal} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>Update Query Details</ModalHeader>
            <ModalBody>
              {modalData||selectedRow ? (
                <Formik
                  initialValues={{
                    TicketNumber: selectedRow.TicketNumber || "",
                    SupportUser: modalData!==null?(modalData.SupportUser || ""):(selectedRow.SupportUser||""),
                    CurrentStatus: modalData !== null ? (modalData.SupportStatus || "") : (selectedRow.SupportStatus || ""),
                    statusDate: modalData !== null ? (modalData.StatusDate || new Date()) : new Date(),
                    DueDate:
                      modalData !== null
                        ? (modalData.DueDate === "0001-01-01T00:00:00"
                          ? new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Add 7 days to current date
                          : new Date(modalData.DueDate).toISOString())
                        : (selectedRow.DueDate === "0001-01-01T00:00:00"
                          ? new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Add 7 days to current date
                          : new Date(selectedRow.DueDate).toISOString()),
                    solutionDetails: modalData !== null ?(modalData.Remarks || ""):(""),
                    dailyID: modalData!==null?(modalData.DailyID||""):(""),
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <Row className="gy-3">
                        {/* Ticket Number */}
                        <Col md={6} xs={12}>
                          <Label for="ticketNumber" className="fw-semibold">
                            Ticket Number:
                          </Label>
                          <Field
                            name="TicketNumber"
                            type="text"
                            className="form-control"
                            readOnly
                          />
                        </Col>

                        {/* Support User */}
                        <Col md={6} xs={12}>
                          <Label for="SupportUser" className="fw-semibold">
                            Support User:
                          </Label>
                          <Field
                            name="SupportUser"
                            as="select"
                            className="form-control"
                          >
                            <option value="">Select</option>
                            {SupportUser.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="SupportUser"
                            component="div"
                            className="text-danger"
                          />

                        </Col>

                        {/* Status */}
                        <Col md={4} xs={12}>
                          <Label for="CurrentStatus" className="fw-semibold">
                            Status:
                          </Label>
                          <Field
                            name="CurrentStatus"
                            as="select"
                            className="form-control"
                          >
                            <option value="">Select</option>
                            {statusOptions.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="CurrentStatus"
                            component="div"
                            className="text-danger"
                          />
                        </Col>

                        {/* Status Date */}
                        {/* Status Date */}
                        <Col md={4} xs={12}>
                          <Label for="statusDate" className="fw-semibold">
                            Status Date:
                          </Label>
                          <Flatpickr
                            id="statusDate"
                            className="form-control border-0 dash-filter-picker shadow bg-light"
                            value={values.statusDate} // Bind to Formik value
                            // Update Formik value
                            options={{
                              dateFormat: "d-m-Y", // Customize date format
                              clickOpens:false,
                            }}
                            readOnly
                          />
                        </Col>

                        {/* Due Date */}
                        <Col md={4} xs={12}>
                          <Label for="DueDate" className="fw-semibold">
                            Due Date:
                          </Label>
                          <Flatpickr
                            id="DueDate"
                            className="form-control border-0 dash-filter-picker shadow bg-light"
                            value={values.DueDate} // Bind to Formik value
                            onChange={(dates) => setFieldValue("DueDate", dates[0])} // Update Formik value
                            options={{
                              dateFormat: "d-m-Y", // Customize date format
                            }}
                          />
                        </Col>

                        {/* Solution Details */}
                        <Col xs={12}>
                          <Label for="solutionDetails" className="fw-semibold">
                            Solution Details:
                          </Label>
                          <Field
                            name="solutionDetails"
                            as="textarea"
                            rows="4"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="solutionDetails"
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                      </Row>
                      <ModalFooter>
                        <Button color="primary" type="submit" >
                          Submit
                        </Button>
                        <Button color="secondary" onClick={toggleModal}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              ) : (
                <p>No data available.</p>
              )}
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DailyStatus;
