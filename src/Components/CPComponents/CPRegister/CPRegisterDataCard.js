import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Input,
} from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { textSizeForOverflow,truncateText } from "../TextSizeForOverflow";
const QueryCard = ({ data, onButtonClick ,query}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(query); // State to store search input
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(()=>{
        setSearchQuery(query);
    },[query]);
    
    const formatDuration = (duration) => {
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Filter data based on search query
    const filteredData = data.filter(
        (query) =>
            query.QuerySubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            query.TicketNumber.toString().toLowerCase().includes(searchQuery)
    );

    const sortedData = [...filteredData].sort(
        (a, b) => moment(b.ReportDateTime).unix() - moment(a.ReportDateTime).unix()
    );

    return (
        <React.Fragment>
            
            {sortedData.length > 0 ? (
                sortedData.map((query, index) => (
                    <Row className="g-0 mb-1" key={index}>
                        <Col>
                            <Card className="mb-0">
                                <CardHeader
                                    onClick={() => {
                                        localStorage.setItem("query", JSON.stringify(query));
                                        navigate("/TicketDetails");
                                        setSelectedRow(query);
                                    }}
                                >
                                    <div className="align-items-center d-flex">
                                        <h5
                                            className="flex-grow-1"
                                            style={{
                                                cursor: "pointer", margin: "0" } }
                                            
                                        >
                                            {query.QuerySubject}
                                        </h5>

                                        <div className="d-flex align-items-center flex-shrink-0">
                                            <div style={{ marginRight: "10px" }}>
                                                {query.TicketNumber}
                                            </div>
                                            <UncontrolledDropdown className="sm">
                                                <DropdownToggle
                                                    tag="button"
                                                    className="btn btn-info btn-sm dropdown"
                                                    type="button"
                                                    style={{ margin: "0" }}
                                                >
                                                    <i className="ri-more-fill"></i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <li>
                                                        <DropdownItem>
                                                            <i className="ri-check-fill align-bottom me-2 text-success"></i>
                                                            Approve
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem>
                                                            <i className="ri-close-fill align-bottom me-2 text-danger"></i>
                                                            Reject
                                                        </DropdownItem>
                                                    </li>
                                                    <li>
                                                        <DropdownItem>
                                                            <i className="ri-whatsapp-fill align-bottom me-2 text-success"></i>
                                                            Whatsapp
                                                        </DropdownItem>
                                                    </li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="text-muted" style={{
                                            margin: "0", whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis", }}>
                                            {query.SubModule}-{query.Menu} ({query.Module})
                                        </p>
                                        <Row className="d-flex flex-wrap gap-0 gx-0"> {/* Removed gaps */}
                                            <Col
                                                className="d-flex align-items-center gap-1 p-0" /* Removed padding */
                                                md="2"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <i className="ri-time-line text-primary me-1 align-bottom"></i>
                                                <span>{moment.utc(query.ReportDateTime).local().format("DD/MM/YYYY hh:mm:ss A")}</span>
                                            </Col>
                                            <Col
                                                className="d-flex align-items-center gap-1 p-0" /* Removed padding */
                                                md="2"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                                                <span>{query.ClientCode}-{query.LicensedTo}</span>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex flex-wrap gap-0 gx-0 text-muted"> {/* Removed gaps */}
                                            <Col
                                                id="Purchase-Details"
                                                className="d-flex align-items-center gap-1 p-0" /* Removed padding */
                                                md="2"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <i className="ri-shield-user-line text-primary me-1 align-bottom"></i>
                                                <span>
                                                    {
                                                        query.CompletedOn !== "0001-01-01T00:00:00"
                                                            ? moment.utc(query.CompletedOn).local().format("DD/MM/YYYY hh:mm:ss A")
                                                            : query.DueDate !== "0001-01-01T00:00:00"
                                                                ? moment.utc(query.DueDate).local().format("DD/MM/YYYY hh:mm:ss A")
                                                                : ""
                                                    }

                                                </span>
                                            </Col>
                                            <Col
                                                className="d-flex align-items-center gap-1 p-0" /* Removed padding */
                                                md="2"
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>
                                                <span>{query.TicketUser} | {query.TicketUserMobile}</span>
                                            </Col>
                                        </Row>

                                    </div>
                                    

                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive table-card">
                                        <table
                                            className="table table-borderless align-middle mb-0 table-sm"
                                            style={{ tableLayout: "fixed", width: "100%" }} // Enforces a fixed layout for consistent column widths
                                        >
                                            <tbody>
                                                {query.CurrentStatus ? (
                                                    <tr className="table-active">
                                                        <th
                                                            colSpan="2"
                                                            style={{
                                                                margin: "0",
                                                                maxWidth: "200px", // Restricts the maximum width
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            {query.CurrentStatus}
                                                        </th>
                                                        <td
                                                            className="text-end"
                                                            style={{
                                                                maxWidth: "150px", // Restricts the maximum width
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            <span className="fw-semibold">{query.SupportUser}</span>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr className="table-active bg-red">
                                                        <th
                                                            colSpan="2"
                                                            style={{
                                                                margin: "0",
                                                                maxWidth: "200px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            Not Updated
                                                        </th>
                                                        <td
                                                            className="text-end"
                                                            style={{
                                                                maxWidth: "150px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            <span className="fw-semibold">Not assigned</span>
                                                        </td>
                                                    </tr>
                                                )}

                                                <tr
                                                    className={
                                                        query.IsCritical
                                                            ? "table-danger"
                                                            : query.CurrentStatus === "Done"
                                                                ? "table-success"
                                                                : moment.utc(query.DueDate).local().isBefore(moment())
                                                                    ? "table-warning"
                                                                    : ""
                                                    }
                                                >
                                                    <th
                                                        colSpan="2"
                                                        style={{
                                                            margin: "0",
                                                            maxWidth: "250px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >{query.DueDate === "0001-01-01T00:00:00"
                                                        ? "Support User to be assigned"
                                                        : query.CurrentStatus === "Done"
                                                            ? "Query is Done"
                                                            : query.IsCritical && moment.utc(query.DueDate).local().isBefore(moment())
                                                                ? `Query is Critical and Due Date is Passed, Time Passed: ${formatDuration(
                                                                    moment.duration(moment().diff(moment.utc(query.ReportDateTime).local()))
                                                                )}`
                                                                : query.IsCritical
                                                                    ? `Query is Critical Time Passed: ${formatDuration(
                                                                        moment.duration(moment().diff(moment.utc(query.ReportDateTime).local()))
                                                                    )}`
                                                                    : moment.utc(query.DueDate).local().isBefore(moment())
                                                                        ? `Due Date is Passed Time Passed: ${formatDuration(
                                                                            moment.duration(moment().diff(moment.utc(query.ReportDateTime).local()))
                                                                        )}`
                                                                        : `Time Passed: ${formatDuration(
                                                                            moment.duration(moment().diff(moment.utc(query.ReportDateTime).local()))
                                                                        )}`
                                                        }


                                                    </th>

                                                    <td
                                                        className="text-end"
                                                        style={{
                                                            maxWidth: "150px",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >
                                                        <span className="fw-semibold">
                                                            <div>
                                                                {query.CurrentStatus === "Done" ? null : (
                                                                    query.TodaysStatus === "NOT UPDATED" ? (
                                                                        <span
                                                                            style={{
                                                                                color: "red",
                                                                                cursor: "pointer",
                                                                                textDecoration: "underline",
                                                                            }}
                                                                            onClick={() => onButtonClick(null, query)}
                                                                        >
                                                                            Not Updated
                                                                        </span>
                                                                    ) : (
                                                                        <span>{query.TodaysStatus}</span>
                                                                    )
                                                                )}

                                                            </div>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>


                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ))
            ) : (
                <p className="text-muted text-center">No results found</p>
            )}
        </React.Fragment>
    );
};

export default QueryCard;
