import React, { useState, useEffect } from 'react';
import ModuleCharts from './ModuleCharts';
import SimpleBar from "simplebar-react";
import IconsForVoucherType from "../../../../Components/CPComponents/CPIcons/IconsForVoucherType";

const ModuleData = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [moduleLabels, setModuleLabels] = useState([]);
    const [moduleSummary, setModuleSummary] = useState({});

    useEffect(() => {
        if (data && data.length > 0) {
            const summary = calculateModuleSummary(data);
            const chartSeries = Object.values(summary).map(mod => mod.totalQueries);
            const labels = Object.keys(summary);
            setModuleSummary(summary);
            setChartData(chartSeries);
            setModuleLabels(labels);
        }
    }, [data]);

    const calculateModuleSummary = (data) => {
        let summary = {};
        data.forEach((item) => {
            const moduleName = item.Module || "Unknown Module";
            const submoduleName = item["Sub module"] || "Unknown Submodule";
            const formName = item.Form || "Unknown Form";
            const currentStatus = item.Status || "Others";

            if (!summary[moduleName]) {
                summary[moduleName] = { totalQueries: 0, submoduleCount: 0, formCount: 0, submodules: {} };
            }

            if (!summary[moduleName].submodules[submoduleName]) {
                summary[moduleName].submodules[submoduleName] = { totalQueries: 0, formCount: 0, forms: {} };
                summary[moduleName].submoduleCount += 1;
            }

            if (!summary[moduleName].submodules[submoduleName].forms[formName]) {
                summary[moduleName].submodules[submoduleName].forms[formName] = {
                    totalQueries: 0,
                    statusCounts: { "Done": 0, "TRP": 0, "CRP": 0, "Pending": 0, "Others": 0 },
                };
                summary[moduleName].formCount += 1;
                summary[moduleName].submodules[submoduleName].formCount += 1;
            }

            summary[moduleName].totalQueries += 1;
            summary[moduleName].submodules[submoduleName].totalQueries += 1;
            summary[moduleName].submodules[submoduleName].forms[formName].totalQueries += 1;
            summary[moduleName].submodules[submoduleName].forms[formName].statusCounts[currentStatus] += 1;
        });
        return summary;
    };

    return (
        <React.Fragment>
            <div className="col-xxl-12 overflow-auto">
                <div className="card card-height-100">
                    <div className="card-header border-0 align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Module Data</h4>
                    </div>
                    <div className="card-body">
                        {/* Only render ModuleCharts if data is available */}
                        {chartData.length > 0 && moduleLabels.length > 0 && (
                            <ModuleCharts
                                series={chartData}
                                moduleLabels={moduleLabels}
                                dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
                            />
                        )}

                        <SimpleBar style={{ maxHeight: "400px", overflowX: "hidden" }}>
                            <div className="p-3 overflowX-hidden">
                                {Object.entries(moduleSummary).map(([moduleName, moduleDetails], moduleIdx) => (
                                    <div key={moduleIdx} className="mb-4">
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="avatar-xs flex-shrink-0">
                                                <span className="avatar-title bg-light rounded-circle">
                                                    {IconsForVoucherType(moduleName !== "NULL" ? moduleName : "N/A")}
                                                </span>
                                            </div>
                                            <div className="ms-3 flex-grow-1">
                                                <h5 className="mb-0 fs-16 fw-bold">
                                                    {moduleName !== "NULL" ? moduleName : "N/A"}
                                                </h5>
                                                <span className="text-muted fs-12">Total Queries: {moduleDetails.totalQueries}</span>
                                                <div className="text-muted fs-12 mt-1">Submodules: {moduleDetails.submoduleCount} | Forms: {moduleDetails.formCount}</div>
                                            </div>
                                        </div>

                                        {Object.entries(moduleDetails.submodules).map(([submoduleName, submoduleDetails], submoduleIdx) => (
                                            <div key={submoduleIdx} style={{ marginLeft: "30px", paddingLeft: "15px", borderLeft: "2px solid #e9ecef" }}>
                                                <h6 className="text-secondary mb-1 fs-14">
                                                    {submoduleName} (Total Queries: {submoduleDetails.totalQueries}, Forms: {submoduleDetails.formCount})
                                                </h6>

                                                {Object.entries(submoduleDetails.forms).map(([formName, formDetails], formIdx) => (
                                                    <div key={formIdx} style={{ marginLeft: "30px", paddingLeft: "15px", borderLeft: "2px dashed #e0e0e0" }}>
                                                        <h6 className="text-info mb-1 fs-13">
                                                            {formName} (Total Queries: {formDetails.totalQueries})
                                                        </h6>

                                                        <div style={{ marginLeft: "20px" }}>
                                                            {Object.entries(formDetails.statusCounts).map(([status, count], statusIdx) => (
                                                                <div key={statusIdx} className="d-flex align-items-center mb-1 fs-12 text-muted">
                                                                    <i className={`mdi mdi-circle-medium me-2 ${status === 'Open' ? 'text-success' : 'text-warning'}`}></i>
                                                                    <span style={{ flex: 1 }}>{status}</span>
                                                                    <span style={{ textAlign: "center", minWidth: "40px" }}>{count}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
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
