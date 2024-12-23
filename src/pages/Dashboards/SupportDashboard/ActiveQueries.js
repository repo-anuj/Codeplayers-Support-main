import React, { useState } from "react";
import { Col, Card, CardBody, CardHeader } from "reactstrap";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import IconsForVoucherType from "../../../Components/CPComponents/CPIcons/IconsForVoucherType";

// Extended Colors for Chart
const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#FFC107",
  "#9C27B0",
  "#FF5722",
  "#00BCD4",
  "#8BC34A",
];

// Helper function to group data
const groupBy = (array, key) => {
  return array.reduce((result, current) => {
    const groupKey = current[key] || "To be Decided";
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(current);
    return result;
  }, {});
};

// Custom Legend Component
const CustomLegend = ({ payload }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: "15px",
            fontSize: "12px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: entry.color,
              marginRight: "5px",
            }}
          ></span>
          <span>
            {entry.value}: {entry.payload.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const ActiveQueries = ({ queries }) => {
  const [selectedLevel, setSelectedLevel] = useState(0); // Tracks current level
  const [selectedData, setSelectedData] = useState(null); // Tracks data at each level

  // Process Level 1 (group by CurrentStatus)
  const statusGroups = groupBy(queries, "CurrentStatus");
  const dataLevel1 = Object.entries(statusGroups).map(([status, items]) => ({
    name: status,
    value: items.length,
    subData: groupBy(items, "ClientCode"), // Prepare subData for Level 2
  }));

  // Process Level 2 (group by ClientCode)
  const dataLevel2 =
    selectedData && selectedLevel === 1
      ? Object.entries(selectedData.subData).map(([clientCode, items]) => ({
        name: clientCode,
        value: items.length,
        subData: groupBy(items, "Module"), // Prepare subData for Level 3
      }))
      : [];

  // Process Level 3 (group by Module)
  const dataLevel3 =
    selectedData && selectedLevel === 2
      ? Object.entries(selectedData.subData).map(([module, items]) => ({
        name: module,
        value: items.length,
      }))
      : [];

  const handleClick = (data, index) => {
    if (selectedLevel === 0) {
      setSelectedLevel(1);
      setSelectedData(dataLevel1[index]);
    } else if (selectedLevel === 1) {
      setSelectedLevel(2);
      setSelectedData(dataLevel2[index]);
    }
  };

  const resetToPreviousLevel = () => {
    if (selectedLevel === 2) {
      setSelectedLevel(1);
    } else if (selectedLevel === 1) {
      setSelectedLevel(0);
      setSelectedData(null);
    }
  };

  const chartData =
    selectedLevel === 0
      ? dataLevel1
      : selectedLevel === 1
        ? dataLevel2
        : dataLevel3;

  return (
    <Col xxl={12}>
      <Card className="card-height-100" style={{ height: "487px" }}>
        <CardHeader className="card-header align-items-center d-flex">
          {IconsForVoucherType("Recent Activity")}
          <h4 className="card-title mb-0 flex-grow-1">Active Queries</h4>
        </CardHeader>
        <CardBody className="p-0 d-flex flex-column justify-content-center align-items-center">
          <div style={{ textAlign: "center", width: "100%", maxWidth: "500px" }}>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={selectedLevel > 0 ? 70 : 0}
                  onClick={handleClick}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                {/* Custom Legend to show name and count */}
                <Legend
                  content={<CustomLegend />}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>

            {selectedLevel > 0 && (
              <button
                onClick={resetToPreviousLevel}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#0088FE",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Back to {selectedLevel === 2 ? "Client Code" : "Status"}
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveQueries;
