import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { POST_RaiseTicket,PATCH_RaiseTicket } from "../../../../slices/Dashboards/SupportDashboard/thunk";
import { GET_ListClient, GET_ListModule,GET_ListClientUser } from "../../../../slices/User/Combo/ModuleCombo/thunk";
import { GET_MaxTicketNumber } from "../../../../slices/User/MaxTicketNumber/thunk";
import { GET_TicketDetails } from "../../../../slices/Dashboards/TicketDetails/thunk";
import { jelly } from "ldrs";
import CPDropDownBox from "../../../../Components/CPComponents/CPInputs/CPDropDownBox";
const formatLocalDateTime = (date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};

const RaiseTicketModal = ({ isOpen, toggle, onClose,parent }) => {
  const [clientName, setClientName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenSubscriberID, setDropdownOpenSubscriberID]=useState(false);
  const [dropdownOpenTicketUser, setDropdownOpenTicketUser] = useState(false);
  const [currentMenuID, setCurrentMenuID] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const [searchTermSubscriberID, setSearchTermSubscriberID]=useState("");
  const [searchTermTicketUser,setSearchTermTicketUser]=useState("");
  const dispatch = useDispatch();
  const moduleData = useSelector((state) => state.ListModule.data);
  const clientData=useSelector((state)=>state.ListClient.data);
  const clientUserData=useSelector((state)=>state.ListClientUser.data);
  const ticketData = useSelector((state) => state.TicketNumber.data);
  const vendorUser = JSON.parse(localStorage.getItem("vendorUser"));
  const query = JSON.parse(localStorage.getItem('query'));
  
  const SupportID = query?.SupportID;
  const userType=localStorage.getItem("userType");
  const data2 = useSelector((state) => state.TicketDetail.data) || [];
  const loading = useSelector((state) => state.TicketDetail.loading);
  const error = useSelector((state) => state.TicketDetail.error);
  const success = useSelector((state) => state.TicketDetail.success);
  // const companies=useSelector((state)=>state.companies.data);
  useEffect(() => {
    dispatch(GET_ListModule());
    dispatch(GET_ListClient());
    dispatch(GET_MaxTicketNumber());
    // dispatch(GET_LiscenseSub)
  }, [dispatch]);
  if(parent=="TicketDetails"){
    useEffect(() => {
      dispatch(GET_TicketDetails(SupportID));
    }, [SupportID]);
    useEffect(() => {
      // console.log("data2 ",data2);
      const firstData = data2 && data2.length > 0 ? data2[0] : null;
      if (firstData) {
        // Filter data for the Menu, Ticket User, and Subscriber ID
        const filteredData = moduleData?.filter(
          (menu) =>
            menu.MenuName.toLowerCase().includes(data2[0]?.Menu.trim().toLowerCase())
        );
        const filteredTicketUser = clientUserData?.filter((user) =>
          user.SubUserName?.toLowerCase().includes(searchTermTicketUser)
        );
        const filteredSubscriberID = clientData?.filter((subscriber) =>
          subscriber.ClientName?.toLowerCase().includes(searchTermSubscriberID)
        );

        const clientCodeToFind = data2[0]?.ClientCode; // The ClientCode to search for

        const firstSubscriberID = clientData?.find(client => client.Code === clientCodeToFind)?.ClientID || null;
        const firstSubscriberName = clientData?.find(client => client.Code === clientCodeToFind)?.ClientName || null;
        formik.setFieldValue('subscriberDisplayName',firstSubscriberName);
        formik.setFieldValue('subscriberID',firstSubscriberID);
        const clientUserToFind=data2[0]?.TicketUser;
        dispatch(GET_ListClientUser(firstSubscriberID));
        const firstTicketUserID = clientUserData?.find(client => client.SubUserName === clientUserToFind)?.SubUserID || null;
        const firstTicketUserName = clientUserData?.find(client => client.SubUserName === clientUserToFind)?.SubUserName || null;
        console.log(firstTicketUserName);
        formik.setFieldValue('ticketUser',firstTicketUserID);
        formik.setFieldValue('ticketUserDisplayName',firstTicketUserName);
        // Set the first menu if found
        const firstMenu = filteredData && filteredData.length > 0 ? filteredData[0] : null;
        formik.setFieldValue('Menu', "" || firstMenu?.Code);
        setCurrentMenuID(firstMenu?.MenuID);

        // Set other fields from data2
        formik.setFieldValue('IsCritical', data2[0]?.IsCritical);
        formik.setFieldValue('QuerySubject', data2[0]?.QuerySubject);
        formik.setFieldValue('QueryStatus', data2[0]?.QueryStatus);
        formik.setFieldValue('QueryDescription', data2[0]?.QueryDescription);

        // If userType is "support-portal", also set ticketUser and subscriberID from the filtered data
        if (userType === "support-portal") {
          const firstTicketUser = filteredTicketUser && filteredTicketUser.length > 0 ? filteredTicketUser[0] : null;
          const firstSubscriberID = filteredSubscriberID && filteredSubscriberID.length > 0 ? filteredSubscriberID[0] : null;

          formik.setFieldValue('ticketUser', firstTicketUser?.SubUserID || "");
          formik.setFieldValue('subscriberID', firstSubscriberID?.ClientID || "");
        }
      

        // Set initial value with Code
      }
    }, [data2]);
  }
  
  useEffect(() => {
    const storedClientName = vendorUser.subscriberName;
    setClientName(
      storedClientName || `${vendorUser.subscriberCode} - ${vendorUser.subscriberName}`
    );
  }, [vendorUser]);
  
  const formik = useFormik({
    initialValues: {
      Menu: "",
      IsCritical: false,
      QuerySubject: "",
      QueryDescription: "",
      uploadMedia: null,
      ticketUser: userType === "support-portal" ? "" : undefined,
      subscriberID: userType === "support-portal" ? "" : undefined,
      subscriberDisplayName: userType === "support-portal" ? "" : undefined,
    },
    validationSchema: Yup.object({
      Menu: parent === "TicketDetails" ? Yup.string() : Yup.string().required("Menu is required"),
      QuerySubject: Yup.string().required("Subject is required"),
      QueryDescription: Yup.string().required("Query details are required"),
      ticketUser: userType === "support-portal" ? Yup.string().required("Ticket User is required") : Yup.string(),
      ticketUserDisplayName: Yup.string(),
      subscriberID: userType === "support-portal" ? Yup.string().required("Subscriber ID is required") : Yup.string(),
      subscriberDisplayName: Yup.string(),
    }),
    onSubmit: async (values) => {
      // Function to convert file to Base64
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]); // Remove Data URL prefix
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };

      let base64Media = null;

      // Convert the file to Base64 if uploadMedia is not null
      if (values.uploadMedia) {
        try {
          base64Media = await fileToBase64(values.uploadMedia);
        } catch (error) {
          console.error("Error converting file to Base64:", error);
          alert("Failed to process the uploaded media.");
          return;
        }
      }

      const bodyData = {
        SubscriberID: userType === "Support-Portal" ? formik.values.subscriberID : vendorUser.subscriberID,
        TicketType: "Support",
        TicketUser: userType === "Support-Portal" ? formik.values.ticketUser : vendorUser.subUserID,
        UploadMedia: base64Media, // Include Base64 string here
        Menu: currentMenuID,
        QuerySubject: formik.values.QuerySubject,
        QueryDescription: formik.values.QueryDescription,
        IsCritical: formik.values.IsCritical,
        QueryStatus: "Review Pending",
      };

      console.log(bodyData);

      if (parent === "Dashboard") {
        dispatch(POST_RaiseTicket(bodyData));
        console.log("post", bodyData);
      } else {
        bodyData.SupportID = data2[0]?.SupportID;
        console.log("patch", bodyData);
        dispatch(PATCH_RaiseTicket(bodyData));
      }

      alert("Ticket raised successfully!");
      formik.resetForm();
      onClose();
      toggle();
    },
  });

  if(userType==="Support-Portal"){
    useEffect(() => {
      if (formik.values.subscriberID) {
        dispatch(GET_ListClientUser(formik.values.subscriberID));
      }
    }, [formik.values.subscriberID, dispatch]);
  }
 
  
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleDropdownSubscriberID = () => setDropdownOpenSubscriberID((prevState) => !prevState);
  const toggleDropdownTicketUser = () => setDropdownOpenTicketUser((prevState) => !prevState);
  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value?.toLowerCase());
  };
  const handleSearchSubscriberID=(e)=>{
    setSearchTermSubscriberID(e.target.value?.toLowerCase());
  };
  const handleSearchTicketUser=(e)=>{
    setSearchTermTicketUser(e.target.value?.toLowerCase());
  };
  
  
  
  const filteredTicketUser = clientUserData?.filter((user) =>
    user.SubUserName?.toLowerCase().includes(searchTermTicketUser)
  );
  console.log(filteredTicketUser);
  const filteredSubscriberID = clientData?.filter((subscriber) =>
    subscriber.ClientName?.toLowerCase().includes(searchTermSubscriberID)
  );


  // Filter moduleData based on search term
  const filteredData = moduleData?.filter(
    (menu) =>
      menu.MenuName?.toLowerCase().includes(searchTerm)
  );

  const modalStyles = {
    maxWidth: "500px",
    maxHeight: "90vh",
    fontSize: "12px",
  };

  const formControlSm = {
    height: "30px",
    fontSize: "12px",
    padding: "5px",
  };

  const labelStyles = {
    fontSize: "12px",
    marginBottom: "5px",
  };

  const rowStyles = {
    marginBottom: "5px",
  };

  const dummyData = {
    name: vendorUser.subUserName,
    mobile: localStorage.getItem("mobileNumber"),
    email: localStorage.getItem("userName"),
    ticketNo: (parent === "Dashboard") ? ticketData:data2[0]?.TicketNumber,
    clientName: clientName,
    dateTime: formatLocalDateTime(new Date()),
  };
  
  
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" style={modalStyles}>
      <ModalHeader toggle={toggle} style={{ fontSize: "14px", padding: "10px" }}>
        Raise a Ticket
      </ModalHeader>
      <ModalBody style={{ padding: "10px" }}>
        <form onSubmit={formik.handleSubmit}>
          {/* Disabled Fields */}
          <Row
            style={{
              margin: "0",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "5px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Col xs={12} style={{ fontSize: "12px" }}>
              {/* Name */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>{dummyData.name}</span>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {dummyData.ticketNo}
                  </span>
                </div>
              </div>

              {/* Mobile No & Email */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Align vertically for better appearance
                }}
              >
                {/* Mobile and Email */}
                <span
                  style={{
                    color: "#6c757d",
                    maxWidth: "50%", // Set a maximum width
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title={`${dummyData.mobile} | ${dummyData.email}`} // Tooltip for full data
                >
                  {dummyData.mobile} | {dummyData.email}
                </span>

                {/* Date and Time */}
                <span
                  style={{
                    maxWidth: "50%", // Set a maximum width
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title={new Date(dummyData.dateTime).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })} // Tooltip for full date and time
                >
                  {new Date(dummyData.dateTime).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Client Name */}
              
                <div>
                  <span>{dummyData.clientName}</span>
                </div>
              

            </Col>
          </Row>

          <hr />

          
          

          {/* Subscriber ID Dropdown */}
          {(userType === "Support-Portal") ? <Row style={rowStyles}>
            <Col lg={12}>
              

              <CPDropDownBox
                labelTitle="Select Subscriber"
                choicesFromApi={filteredSubscriberID?.map((subscriber) => ({
                  primaryKey: subscriber.ClientID,                      // Unique identifier
                  mainColumn: `${subscriber.ClientName} (${subscriber.Code})`, // Display Name + Code
                  masterFilter: subscriber.Code,                 // Optional filter attribute
                  code: subscriber.Code,                         // Extra data if needed
                }))}
                id="subscriberID"
                value={formik.values.subscriberDisplayName} // Must match the concatenated display format
                onChange={(value) => {
                  const selectedSubscriber = filteredSubscriberID.find(
                    (subscriber) => `${subscriber.ClientName} (${subscriber.Code})` === value
                  );
                  if (selectedSubscriber) {
                    // Update both subscriber ID and DisplayName in formik
                    formik.setFieldValue("subscriberID", selectedSubscriber.ClientID);
                    formik.setFieldValue(
                      "subscriberDisplayName",
                      `${selectedSubscriber.ClientName} (${selectedSubscriber.Code})`
                    );
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.subscriberID && formik.touched.subscriberID
                    ? formik.errors.subscriberID
                    : null
                }
              />




              {/* Validation Error for Subscriber ID */}
              {formik.touched.subscriberID && formik.errors.subscriberID ? (
                <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
                  {formik.errors.subscriberID}
                </div>
              ) : null}
            </Col>
          </Row>:(<></>)}

          {/* Ticket User Dropdown */}
          {(userType === "Support-Portal") ? (<Row style={rowStyles}>
            <Col lg={12}>
              

              <CPDropDownBox
                labelTitle="Select Ticket User"
                choicesFromApi={filteredTicketUser?.map((user) => ({
                  primaryKey: user.SubUserID,        // Unique ID for user
                  mainColumn: user.SubUserName,      // Display name
                  masterFilter: user.SubUserName,    // Optional search filter
                  code: user.SubUserID,              // Optional extra data
                }))}
                id="ticketUser"
                value={formik.values.ticketUserDisplayName} // Current selected value
                onChange={(value) => {
                  const selectedUser = filteredTicketUser.find(
                    (user) => user.SubUserName === value
                  );
                  if (selectedUser) {
                    formik.setFieldValue("ticketUser", selectedUser.SubUserID);
                    formik.setFieldValue("ticketUserDisplayName", selectedUser.SubUserName);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.ticketUser && formik.touched.ticketUser
                    ? formik.errors.ticketUser
                    : null
                }
              />

              {/* Validation Error for Ticket User */}
              {formik.touched.ticketUser && formik.errors.ticketUser ? (
                <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
                  {formik.errors.ticketUser}
                </div>
              ) : null}
            </Col>
          </Row>):(<></>)}
          {/* Menu & Is Critical */}
          <Row style={rowStyles}>
            <Col lg={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label htmlFor="Menu" style={labelStyles}>
                  Menu
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="IsCritical"
                    className="form-check-input me-2"
                    checked={formik.values.IsCritical}
                    onChange={(e) =>
                      formik.setFieldValue("IsCritical", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="IsCritical"
                    className="form-check-label"
                    style={{ fontSize: "12px" }}
                  >
                    Is Critical
                  </label>
                </div>
              </div>

              {/* Reactstrap Dropdown with Search */}
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{ width: "100%" }}>
                <DropdownToggle
                  caret
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    backgroundColor: "#f8f9fa",
                    color: "#333",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {formik.values.Menu || "Select a Menu"}
                </DropdownToggle>
                <DropdownMenu style={{ width: "100%", borderRadius: "6px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                  {/* Search Input */}
                  <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: "14px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  {/* Filtered Dropdown Items */}
                  {filteredData?.length > 0 ? (
                    filteredData?.map((menu) => (
                      <DropdownItem
                        key={menu.MenuID}
                        onClick={() => {
                          setCurrentMenuID(menu.MenuID);
                          formik.setFieldValue("Menu", menu.Code);
                        }}
                        style={{
                          padding: "12px",
                          fontSize: "14px",
                          whiteSpace: "normal",
                          lineHeight: "1.4",
                          cursor: "pointer",
                          transition: "background-color 0.2s ease",
                        }}
                        className="dropdown-item"
                      >
                        <div style={{ fontWeight: "600", color: "#333" }}>{menu.MenuName}</div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          {menu.Module} → {menu.MenuType}
                        </div>
                      </DropdownItem>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "10px",
                        fontSize: "14px",
                        color: "#999",
                        textAlign: "center",
                      }}
                    >
                      No results found
                    </div>
                  )}
                </DropdownMenu>
              </Dropdown>



              {/* Validation Error */}
              {formik.touched.Menu && formik.errors.Menu ? (
                <div style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>
                  {formik.errors.Menu}
                </div>
              ) : null}
            </Col>
          </Row>

          {/* Subject */}
          <Row style={rowStyles}>
            <Col md={12}>
              <label htmlFor="QuerySubject" style={labelStyles}>
                Subject
              </label>
              <input
                type="text"
                id="QuerySubject"
                style={formControlSm}
                className={`form-control ${
                  formik.touched.QuerySubject && formik.errors.QuerySubject
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("QuerySubject")}
              />
              {formik.touched.QuerySubject && formik.errors.QuerySubject ? (
                <div className="invalid-feedback">
                  {formik.errors.QuerySubject}
                </div>
              ) : null}
            </Col>
          </Row>

          {/* Query Details */}
          <Row style={rowStyles}>
            <Col md={12}>
              <label htmlFor="QueryDescription" style={labelStyles}>
                Query Details
              </label>
              <textarea
                id="QueryDescription"
                style={{ ...formControlSm, height: "60px" }}
                className={`form-control ${
                  formik.touched.QueryDescription &&
                  formik.errors.QueryDescription
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("QueryDescription")}
              />
              {formik.touched.QueryDescription &&
              formik.errors.QueryDescription ? (
                <div className="invalid-feedback">
                  {formik.errors.QueryDescription}
                </div>
              ) : null}
            </Col>
          </Row>

          {/* Upload Media */}
          <Row>
            <Col md={12}>
              <label htmlFor="uploadMedia" style={labelStyles}>
                Upload Media
              </label>
              <input
                type="file"
                id="uploadMedia"
                style={formControlSm}
                className="form-control"
                onChange={(event) =>
                  formik.setFieldValue("uploadMedia", event.target.files[0])
                }
              />
            </Col>
          </Row>
        </form>
      </ModalBody>
      <ModalFooter style={{ padding: "10px" }}>
        <Button color="primary" type="submit" size="sm" onClick={formik.handleSubmit}>
          Submit
        </Button>
        <Button color="secondary" size="sm" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RaiseTicketModal;
