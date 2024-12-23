import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const TicketDetailsCard = ({ labelTitle, details, isCritical, icon }) => {
  const renderDetailRow = (label, value) => {
    if (value && value !== 0) {
      return (
        <tr key={label}>
          <td className="text-start" style={{ whiteSpace: "nowrap" }}>
            {label}:
          </td>
          <td
            className="text-end"
            style={{
              maxWidth: "150px", // Adjust width as needed
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={value} // Shows full value on hover
          >
            {value}
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <Card className="ribbon-box border shadow-none right">
      {isCritical && (
        <span className="ribbon-three ribbon-three-danger">
          <span>Critical</span>
        </span>
      )}
      <CardHeader>
        <div className="d-flex align-items-center">
          {/* Display the icon passed as a prop */}
          {icon && <i className={`${icon} me-2 text-muted`}></i>}
          <h5
            className="card-title flex-grow-1 mb-0"
            style={{
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {labelTitle}
          </h5>
        </div>
      </CardHeader>
      <CardBody>
        <table className="table table-borderless table-sm mb-0">
          <tbody>
            {Object.keys(details).map((key) =>
              renderDetailRow(key, details[key])
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default TicketDetailsCard;
