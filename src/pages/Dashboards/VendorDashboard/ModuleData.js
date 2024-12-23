import React, { useState, useEffect } from 'react';
import ModuleCharts from './ModuleCharts';
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";
import SimpleBar from "simplebar-react";

const ModuleData = ({ data }) => {
    const recentOrders = data; // Using the recentOrders data passed in as `data`
    const [chartData, setChartData] = useState([]);
    const [moduleLabels, setModuleLabels] = useState([]);
    const [statusSummary, setStatusSummary] = useState({});

    useEffect(() => {
        if (recentOrders && recentOrders.length > 0) {
            const summary = calculateStatusSummary(recentOrders);
            const chartSeries = Object.values(summary).map(status => status.count);
            const labels = Object.keys(summary);  // Status labels
            setStatusSummary(summary);
            setChartData(chartSeries);
            setModuleLabels(labels);
        }
    }, [recentOrders]);

    // Function to calculate summary of query statuses
    const calculateStatusSummary = (data) => {
        let summary = {};
        data.forEach((order) => {
            const status = order.status || "No Status";

            // Initialize status summary if it doesn't exist
            if (!summary[status]) {
                summary[status] = {
                    count: 0,
                };
            }

            // Increment total count for each status
            summary[status].count += 1;
        });
        return summary;
    };

    // Function to assign the correct class based on the status
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "won":
                return "badge bg-success-subtle text-success";
            case "expired":
                return "badge bg-danger-subtle text-danger";
            case "lost":
                return "badge bg-light-subtle text-muted";
            default:
                return "badge bg-warning-subtle text-warning";
        }
    };

    return (
        <React.Fragment>
            <div className="col-xxl-12 overflow-auto">
                <div className="card card-height-100">
                    <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">RFQ Status Summary</h4>
                    </div>
                    <div className="card-body">
                        {/* Displaying the doughnut chart */}
                        <ModuleCharts
                            series={chartData}
                            moduleLabels={moduleLabels}  // Pass dynamic labels here
                            dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
                        />

                        {/* Displaying card-like status data */}
                        <SimpleBar style={{ maxHeight: "400px", overflowX: "hidden" }}>
                            <div className="p-3 overflowX-hidden">
                                {Object.keys(statusSummary).map((status, index) => (
                                    <div key={index} className="text-muted mb-3 fs-11 overflowX-hidden">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar-xs flex-shrink-0">
                                                <span className="avatar-title bg-light rounded-circle">
                                                    {IconsForVoucherType(status)}
                                                </span>
                                            </div>
                                            <div className="flex-grow-1 ms-2 d-flex justify-content-between align-items-center">
                                                {/* Status and Total Count */}
                                                <h6 className="fs-14 mb-1">
                                                    <span className={`badge ${getStatusClass(status)} text-muted fs-12`}>{status}</span>
                                                </h6>
                                                <span className="fs-16 fw-bold text-muted">{statusSummary[status].count}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ModuleData;
