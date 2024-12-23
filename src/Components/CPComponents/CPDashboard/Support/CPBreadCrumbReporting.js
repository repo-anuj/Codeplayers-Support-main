import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import RaiseTicketModal from "../../../../pages/Dashboards/SupportDashboard/raiseticket/RaiseTicketModal"; // Import the modal component
import CPDateBox from "./../../CPInputs/CPDateBox";

const CPBreadCrumbReporting = ({
  title,
  selectedRange,
  onDateRangeChange,
  handleModalClose, // Corrected casing
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle modal submission
  const handleModalSubmit = () => {
    setIsModalOpen(false); // Close the modal
    handleModalClose(); // Refresh the page
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            {/* Title */}
            <h4 className="mb-sm-0">{title}</h4>

            {/* Date and Raise Ticket Button */}
            <div
              className="d-flex align-items-center justify-content-end"
              style={{ gap: "10px", flexWrap: "wrap" }} // Ensures proper spacing and wraps on smaller screens
            >
              <CPDateBox
                selectedRange={selectedRange}
                onRangeChange={onDateRangeChange}
              />

              <button
                type="button"
                className="btn btn-success"
                onClick={toggleModal}
                style={{ height: "38px" }}
              >
                <i className="ri-download-2-line"></i> Raise Ticket
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Include the RaiseTicketModal component */}
      <RaiseTicketModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onClose={handleModalSubmit}
        parent="Dashboard" // Pass the submission handler
      />
    </React.Fragment>
  );
};

export default CPBreadCrumbReporting;
