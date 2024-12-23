import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardHeader, CardBody, Table ,Input} from "reactstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DailyStatusModal from "../SupportDashboard/DailyStatusModal";
import QueryCard from "../../../Components/CPComponents/CPRegister/CPRegisterDataCard";
import { useDispatch, useSelector } from "react-redux";
import { GET_SupportDashboard } from "../../../slices/Dashboards/SupportDashboard/thunk"; // Ensure this import is used correctly
import CPSupportDataCardSirEdit from "./../../../Components/CPComponents/CPDashboard/Support/CPSupportDataCardSirEdit"
const QueryRegister = () => {
    // State for filters
    const userType = localStorage.getItem("userType");
    const [filterStatus, setFilterStatus] = useState(""); // For filtering by CurrentStatus
    const [filterModule, setFilterModule] = useState(""); // For filtering by Module
    const [filterClient, setFilterClient] = useState(""); // For filtering by Client
    const [filterTodayStatus,SetFilterTodayStatus]=useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalData, setModalData] = useState(null);

    // Redux state
    const data = useSelector((state) => state.SupportDashboard.data);
    const loading = useSelector((state) => state.SupportDashboard.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle button click (Open modal with data)
    const handleButtonClick = (dailyID, Row) => {
        if (dailyID) {
            console.log("DailyID clicked:", dailyID);
            setModalData(dailyID); // Set state for the modal
            setModalOpen(!modalOpen); // Open the modal
        } else {
            
            setModalOpen(!modalOpen);
            setModalData(null);
            setSelectedRow(Row);
            console.log(selectedRow); // Handle the generic "Today's Status" action if required
        }
        dispatch(GET_SupportDashboard());
    };
    const handleCloseModal = () => {
        setModalOpen(!modalOpen); 
        dispatch(GET_SupportDashboard());// Close the modal
        // Refresh the page
    };
    // Local state to manage filtered data
    const [queriesData, setQueriesData] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(GET_SupportDashboard());
    }, [dispatch]);

    // Update local state when data from Redux changes
    useEffect(() => {
        if (data?.length > 0) {
            setQueriesData(data);
        }
    }, [data]);

    // Handle filter changes
    const handleFilterStatusChange = (event) => setFilterStatus(event.target.value);
    const handleFilterModuleChange = (event) => setFilterModule(event.target.value);
    const handleFilterClientChange = (event) => setFilterClient(event.target.value);
    const handleFilterTodayStatus = (event) => SetFilterTodayStatus(event.target.value);
    // Extract unique values for dropdown filters
    const uniqueStatuses = [
        ...new Set(queriesData?.map((query) => query?.CurrentStatus || "Not Updated")),
    ];
    const uniqueModules = [...new Set(queriesData?.map((query) => query?.Module))];
    const uniqueClients = [...new Set(queriesData?.map((query) => query?.LicensedTo))];
    const uniqueTodayStatus = [...new Set(queriesData?.map((query) => query?.TodaysStatus))];
    // Filter the data based on selected filters
    
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const computeFilteredData = () => {
            const filtered = queriesData?.filter((query) => {
                const matchesStatus =
                    filterStatus === "" || (query?.CurrentStatus || "Not Updated") === filterStatus;
                const matchesModule = filterModule === "" || query?.Module === filterModule;
                const matchesClient = filterClient === "" || query?.LicensedTo === filterClient;
                const matchesTodayStatus =
                    filterTodayStatus === "" || query?.TodaysStatus === filterTodayStatus;
                return matchesStatus && matchesModule && matchesClient && matchesTodayStatus;
            });
            setFilteredData(filtered);
        };

        computeFilteredData();
    }, [queriesData, filterStatus, filterModule, filterClient, filterTodayStatus]);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (query) => {
        setSearchQuery(query);
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Breadcrumb */}
                    <BreadCrumb title="Support Register" />

                    {/* Filters */}
                    <Row className="mt-3">
                        <Col xl={18}>
                            <Table className="border shadow-none flex-grow-0" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <th className="d-flex justify-content-between align-items-center">
                                    <Row className="mb-3">
                                        <Col md="3">
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

                                        <Col md="3">
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
                                        {userType === "CPTeam" && (
                                            <Col md="3">
                                                <label>Filter by Client:</label>
                                                <select
                                                    className="form-control"
                                                    value={filterClient}
                                                    onChange={handleFilterClientChange}
                                                >
                                                    <option value="">All Clients</option>
                                                    {uniqueClients.map((client, index) => (
                                                        <option key={index} value={client}>
                                                            {client}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>

                                        )}
                                        <Col md="3">
                                            <label>Filter by Today Status:</label>
                                            <select
                                                className="form-control"
                                                value={filterTodayStatus}
                                                onChange={handleFilterTodayStatus}
                                            >
                                                <option value="">All Today Status</option>
                                                {uniqueTodayStatus.map((TodayStatus, index) => (
                                                    <option key={index} value={TodayStatus}>
                                                        {TodayStatus}
                                                    </option>
                                                ))}
                                            </select>
                                        </Col>
                                        
                                        <Col md="3">
                                            <label htmlFor="Search">Search By Ticket Number</label>
                                            <Input
                                                type="text"
                                                placeholder="Search by Ticket Number or Subject"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                            />
                                        </Col>

                                                    </Row>
                                    
                                </th>

                                <tr>
                                    {loading ? (
                                        <p>Loading queries...</p>
                                    ) : filteredData?.length > 0 ? (
                                        <div
                                            
                                        >
                                                
                                                    
                                                        <QueryCard data={filteredData} onButtonClick={handleButtonClick} query={searchQuery} />
                                                        
                                                    
                                                
                                            
                                            
                                        </div>
                                    ) : (
                                        <p>No queries found for the selected filters.</p>
                                    )}
                                </tr>
                            </Table>
                        </Col>
                    </Row>
                    {modalOpen && (
                        <DailyStatusModal
                            modalOpen={modalOpen}
                            modalData={modalData}
                            selectedRow={selectedRow}
                            onClose={handleCloseModal}
                        />
                    )}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default QueryRegister;
