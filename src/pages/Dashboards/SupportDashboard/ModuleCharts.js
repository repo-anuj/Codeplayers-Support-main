import React from 'react';
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

const ModuleCharts = ({ dataColors, series, moduleLabels }) => {
    var donutchartmoduleColors = getChartColorsArray(dataColors);

    var options = {
        labels: moduleLabels,  // Dynamically update with passed module names
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
        colors: donutchartmoduleColors,
    };

    return (
        <React.Fragment>
            <ReactApexChart dir="ltr"
                options={options}
                series={series}
                type="donut"
                height="224"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export default ModuleCharts;
