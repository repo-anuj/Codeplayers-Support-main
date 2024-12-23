import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardBody, CardTitle, CardText } from "reactstrap";
import CPBreadCrumbReporting from "../../../Components/CPComponents/CPLayouts/CPBreadCrumbReporting";
import { useSelector, useDispatch } from "react-redux";
import { GET_ERPDashboard } from "../../../slices/Dashboards/ERPDashboard/thunk";
import moment from "moment";

const QueryRegister = () => {
    const dispatch = useDispatch();
    const queriesData = useSelector((state) => state.ERPDashboard.data) || {}; // Get the query data from Redux state
    const storedRange = JSON.parse(sessionStorage.getItem("selectedRange")) || [null, null]; // Get the stored date range or set to null

    // State to hold the selected date range and filters
    const [selectedRange, setSelectedRange] = useState(storedRange);
    const [filterStatus, setFilterStatus] = useState(""); // For filtering by CurrentStatus
    const [filterModule, setFilterModule] = useState(""); // For filtering by Module

    // Handle date range changes
    const dateChange = (newRange) => {
        if (newRange && newRange.length === 2) {
            setSelectedRange(newRange);
            sessionStorage.setItem("selectedRange", JSON.stringify(newRange));

            dispatch(
                GET_ERPDashboard({
                    FromDate: moment(newRange[0]).format("YYYY-MM-DD"),
                    ToDate: moment(newRange[1]).format("YYYY-MM-DD"),
                })
            );
        }
    };

    useEffect(() => {
        // This effect runs once when the component mounts
        const initialRange = storedRange.length === 2 ? [new Date(storedRange[0]), new Date(storedRange[1])] : [new Date(), new Date()];

        // If selectedRange is not set (null), use initialRange
        if (!selectedRange[0] || !selectedRange[1]) {
            dateChange(initialRange);
        }
    }, []); // Empty dependency array ensures this runs only once

    const handleFilterStatusChange = (event) => {
        setFilterStatus(event.target.value); // Updates filter based on CurrentStatus
    };

    const handleFilterModuleChange = (event) => {
        setFilterModule(event.target.value); // Updates filter based on Module
    };

    // Check if `queriesData.record` exists and is an array
    const queries = Array.isArray(queriesData.record) ? queriesData.record : [];
console.log(queries);
    // Extract unique `CurrentStatus` and `Module` values for filter dropdowns
    const uniqueStatusOptions = [...new Set(queries?.map(query => query.CurrentStatus))];
    const uniqueModuleOptions = [...new Set(queries?.map(query => query.Module))];

    // Filter the queries based on the selected filters and StatusDateTime range
    const filteredQueries = queries?.filter(query => {
        // Date filtering by StatusDateTime
        const queryStatusDate = moment(query.StatusDateTime);
        const isWithinDateRange = selectedRange[0] && selectedRange[1]
            ? queryStatusDate.isBetween(moment(selectedRange[0]), moment(selectedRange[1]), undefined, '[]') // Inclusive range
            : true;

        // Status and Module filtering
        const matchesStatus = filterStatus ? query.CurrentStatus === filterStatus : true;
        const matchesModule = filterModule ? query.Module === filterModule : true;

        return isWithinDateRange && matchesStatus && matchesModule;
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <CPBreadCrumbReporting
                        title="ERP Dashboard"
                        selectedRange={selectedRange}
                        onDateRangeChange={dateChange} // Pass the dateChange function correctly
                    />

                    {/* Filters for CurrentStatus and Module */}
                    <Row className="mb-3">
                        <Col md="4">
                            <label>Filter by Current Status:</label>
                            <select className="form-control" value={filterStatus} onChange={handleFilterStatusChange}>
                                <option value="">All Statuses</option>
                                {uniqueStatusOptions.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </Col>

                        <Col md="4">
                            <label>Filter by Module:</label>
                            <select className="form-control" value={filterModule} onChange={handleFilterModuleChange}>
                                <option value="">All Modules</option>
                                {uniqueModuleOptions.map((module, index) => (
                                    <option key={index} value={module}>
                                        {module}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    </Row>

                    {/* Row for displaying query cards */}
                    <Row className="mt-3">
                        {filteredQueries.length > 0 ? (
                            filteredQueries.map((query, index) => (
                                <Col md="4" key={index} className="mb-4">
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">{query.Module}</CardTitle>
                                            <CardText>
                                                <strong>Current Status:</strong> {query.CurrentStatus} <br />
                                                <strong>User Name:</strong> {query.UserName} <br />
                                                <strong>Query Subject:</strong> {query.QuerySubject || "N/A"} <br />
                                                <strong>Support Agent:</strong> {query.SupportUser} <br /> {/* Display SupportUser */}
                                                <strong>Status Date Time:</strong> {moment(query.StatusDateTime).format("YYYY-MM-DD HH:mm")} <br />
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No queries found for the selected filters.</p>
                        )}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default QueryRegister;
