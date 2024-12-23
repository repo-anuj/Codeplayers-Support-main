import React from 'react';
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

const ModuleCharts = ({ dataColors, series, moduleLabels }) => {
    // Get chart colors dynamically based on the passed dataColors
    const donutchartmoduleColors = getChartColorsArray(dataColors);

    // Chart configuration for donut chart
    const options = {
        labels: moduleLabels,  // Labels will be statuses (e.g., "Won", "Pending", etc.)
        chart: {
            type: "donut",
            height: 224,
        },
        plotOptions: {
            pie: {
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '18px',
                            offsetY: -5,
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            color: '#343a40',
                            fontWeight: 500,
                            offsetY: 5,
                            formatter: function (val) {
                                return val;
                            }
                        },
                        total: {
                            show: true,
                            fontSize: '13px',
                            label: 'Total Queries',
                            color: '#9599ad',
                            fontWeight: 500,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value;
                }
            }
        },
        stroke: {
            lineCap: "round",
            width: 2
        },
        colors: donutchartmoduleColors,  // Dynamic colors for each status
    };

    return (
        <React.Fragment>
            <ReactApexChart
                dir="ltr"
                options={options}
                series={series} // Series will be status counts
                type="donut"
                height="224"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export default ModuleCharts;
