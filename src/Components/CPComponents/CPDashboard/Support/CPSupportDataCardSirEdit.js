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
// import { GET_VOUCHERNUM_PDF } from "../../../slices/ERPReportings/VoucherNum/DownloadPDF/thunk";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import FeatherIcon from "feather-icons-react";


const CPSupportDataCardSirEdit=()=>{
    return(
        <React.Fragment>
            <Col>
                <Card>
                    <CardHeader>
                        <div className="align-items-center d-flex">
                            <h5
                                className="flex-grow-1"
                                // onClick={toggleModal}
                                style={{ cursor: "pointer" }}
                            >
                                Weighment Form Linking to Sales Order Showing (Error) #Subject
                            </h5>

                            <div className="d-flex align-items-center flex-shrink-0">
                                     
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
                            <p className="text-muted">
                                Masters-Inventory-Unit (FNA)
                            </p>
                            <div className="d-flex gap-4 mb-1">
                                <div>
                                    <i className="ri-time-line text-primary me-1 align-bottom"></i>
                                    19/11/2024 12:20 PM
                                </div>
                                <div>
                                    <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                                    MRE-MR Enterprises
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-4 mb-1">
                            <div id="Purchase-Details">
                                <i className="ri-shield-user-line text-primary me-1 align-bottom"></i>

                                22/11/2024 12:20 PM
                            </div>
                            <div style={{ visibility: "visible" }}>
                                <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                                Anurag Gupta | data
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless align-middle mb-0 table-sm">
                                
                                <tbody>
                                    
                                            

                                    <tr className="table-active">
                                        <th colSpan="2">
                                            Current Status : Development Review Pending
                                        </th>
                                        <td className="text-end">
                                            <span className="fw-semibold">
                                                Movesh Kumar Sahu{" "}
                                                
                                            </span>
                                        </td>
                                    </tr>
                                    
                                        <tr
                                            className={
                                                
                                                "table-danger"
                                            }
                                        >
                                            <th colSpan="2">
                                                Query Is Critical And Due Date Crossed And Done And Today's Status Not Updated :
                                            </th>
                                            <td className="text-end">
                                                <span className="fw-semibold">
                                                    data{" "}
                                                    data
                                                </span>
                                            </td>
                                        </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>

            
        </React.Fragment>
    );
}
export default CPSupportDataCardSirEdit;

// <div >
//     {data.map((query, index) => (
//         <div
//             key={index}
//             style={{
//                 backgroundColor:
//                     new Date(query?.DueDate) < new Date()
//                         ? "#F72C5B"
//                         : index % 2 === 0
//                             ? "#ffffff"
//                             : "#efefef",
//                 display: "flex",
//                 width: "100%",
//                 padding: "10px",
//                 borderBottom: "1px solid #ddd", // Add border for better separation between rows
//             }}
//         >
//             <Col md="2" sm="3" xs="12" style={{ padding: "5px", textAlign: "center" }}>
//                 <div className="text-muted">
//                     {moment(query.ReportDateTime).format("DD/MM/YYYY HH:mm:ss")}
//                 </div>
//                 <div className="text-muted">
//                     <span>
//                         {query.CompletedOn !== "0001-01-01T00:00:00"
//                             ? moment(query.CompletedOn).format("DD/MM/YYYY HH:mm:ss")
//                             : moment(query.DueDate).format("DD/MM/YYYY HH:mm:ss")}
//                     </span>
//                 </div>
//             </Col>

//             <Col
//                 md="2" sm="3" xs="12"
//                 onClick={() => {
//                     localStorage.setItem("query", JSON.stringify(query));
//                     navigate("/TicketDetails");
//                     setSelectedRow(query);
//                 }}
//                 style={{
//                     cursor: "pointer",
//                     padding: "5px",
//                      textAlign: "center",
//                 }}
//             >
//                 <div>
//                     {query.ClientCode}-{query.LicensedTo}
//                 </div>
//                 <div>
//                     <span>
//                         {query.TicketUser}-{query.TicketUserMobile}
//                     </span>
//                 </div>
//             </Col>

//             <Col md="2" sm="3" xs="12" style={{ padding: "5px", textAlign: "center" }}>
//                 <div style={{ whiteSpace: "nowrap" }}>{query.Module}</div>
//                 <div
//                     style={{
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         width: "100%",
//                     }}
//                 >
//                     <span>
//                         {query.SubModule}-{query.Menu}
//                     </span>
//                 </div>
//             </Col>

//             <Col md="2" sm="3" xs="12" style={{ padding: "5px", textAlign: "center" }}>
//                 <div>
//                     <div><strong>{query.IsCritical && <RiAlertLine style={{ color: 'red', marginRight: '5px' }} />}{query.QuerySubject}</strong></div>
//                 </div>
//                 <div>
//                     <span style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//                         <div><i className="ri-image-line">{query.Media || 0}</i></div>
//                         <div><i className="ri-star-s-line">{query.Rating || 0}</i></div>
//                     </span>
//                 </div>
//             </Col>

//             <Col md="2" sm="3" xs="12" style={{ padding: "5px", textAlign: "center" }}>
//                 <div>
//                     {query.TodaysStatus === "NOT UPDATED" ? (
//                         <span
//                             style={{
//                                 color: "blue",
//                                 cursor: "pointer",
//                                 textDecoration: "underline",
//                             }}
//                             onClick={() => onButtonClick(null, query)}
//                         >
//                             Today's Status
//                         </span>
//                     ) : (
//                         <span>{query.TodaysStatus}</span>
//                     )}
//                 </div>
//                 <div style={{ whiteSpace: "nowrap" }}>{query.SupportUser}</div>
//             </Col>

//             <Col md="2" sm="3" xs="12" style={{ padding: "5px", textAlign: "center" }}>
//                 <div
//                     style={{
//                         whiteSpace: "nowrap",
//                         background:
//                             statusColors[query.CurrentStatus] ||
//                             (index % 2 === 0 ? "#cdd9e1" : "#ffffff"),
//                         color: "#6c757d", // Muted text color
//                         borderRadius: "7.5px", // Ellipse shape
//                         padding: "2.5px 5px", // Proper padding for ellipse appearance
//                         display: "inline-block", // Keeps the element inline and properly shaped
//                         fontSize: "0.875rem", // Optional: adjust text size
//                     }}
//                 >
//                     {query.CurrentStatus}
//                 </div>
//                 <div>
//                     <span>
//                         {query.CompletedOn === "0001-01-01T00:00:00"
//                             ? "Ongoing"
//                             : moment(query.CompletedOn).from(
//                                 moment(query.ReportDateTime)
//                             )}
//                     </span>
//                 </div>
//             </Col>
//         </div>
//     ))}
// </div>