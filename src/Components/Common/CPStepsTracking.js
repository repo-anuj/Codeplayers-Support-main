import React, { useState } from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import { Link,useLocation } from "react-router-dom";
import classnames from "classnames";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_DailyStatusDetails } from "../../slices/thunks";
import { GET_TICKET_DETAILS } from "../../helpers/url_helper";
import { GET_TicketDetails } from "../../slices/Dashboards/TicketDetails/thunk";
const CPStepsTracking = ({
  tracking = [],
  labelTitle = "Steps Tracking",
  Page = "",
  statuses = [],
  onClick,
  
}) => {
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  // Extract query parameters from the URL
  
  const SupportID = JSON.parse(localStorage.getItem('query'))?.SupportID;
  
  const dispatch = useDispatch();
  const DailyStatusData = useSelector((state) => state.DailyStatus.data);
  const SupportStatusData = useSelector((state) => state.SupportStatuses.data);
  const DailyStatusByIdData = useSelector((state) => state.DailyStatusById.data);
  const DailyStatusByIdError = useSelector((state) => state.DailyStatusById.error);
  const DailyStatusError = useSelector((state) => state.DailyStatus.error);

  const data2 = useSelector((state) => state.TicketDetail.data) || [];
  const loading = useSelector((state) => state.TicketDetail.loading);
  const error = useSelector((state) => state.TicketDetail.error);
  const success = useSelector((state) => state.TicketDetail.success);
  const query =data2[0];

  // Handle row click
  
  console.log(SupportID)
  // Effect to run when selectedRow changes
  useEffect(() => {
    if (SupportID) {
      const now = new Date();
      console.log(now.toISOString()); // Logs the date and time in ISO 8601 format

      dispatch(GET_TicketDetails(SupportID));
      dispatch(GET_DailyStatusDetails(SupportID));
      console.log(DailyStatusByIdData); // Assuming this is the data you want to log
    }
  }, [ SupportID,dispatch]); 
  const handleClose=()=>{
    dispatch(GET_DailyStatusDetails(SupportID));
  }
  console.log(query);
  // Icon selection logic
  const getIconClass = (statusName) => {
    switch (statusName) {
      case "Client Review Pending":
        return "bx bx-user-check text-info";
      case "Support Review Pending":
        return "bx bx-time text-warning";
      case "Development Review Pending":
        return "bx bx-code-alt text-secondary";
      case "Done":
        return "ri-checkbox-circle-line";
      default:
        return "ri-question-line";
    }
  };

  // Toggle section and notify parent with DailyID
  const toggleSection = (dailyID) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [dailyID]: !prevOpenSections[dailyID],
    }));

    // Notify parent about the clicked DailyID
    onClick(dailyID);
  };

  if (Page === "DailyStatus") {
    return (
      <Card>
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0 d-flex align-items-center">
              <i className="ri-list-check align-middle me-1 text-muted"></i>
              {labelTitle}
            </h5>
            {query?.CurrentStatus !== "Done" && (
              <Button
                onClick={() => {
                  onClick(null);
                  handleClose();
                }}
                color="primary"
                style={{
                  fontSize: "14px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                }}
              >
                Today's Status
              </Button>
            )}

          </div>
        </CardHeader>

        <CardBody>
          {statuses.length === 0 ? (
            <h5 className="fs-16 mt-2 text-danger">No Statuses Available</h5>
          ) : (
            [...statuses] // Create a shallow copy of the array to avoid mutating the original
              .sort((a, b) => moment(a.StatusDate).diff(moment(b.StatusDate))) // Sort by StatusDate
              .map((status) => (
                <div key={status.DailyID} className="accordion-item border-0">
                  <div
                    className="accordion-header"
                    onClick={() => toggleSection(status)}
                  >
                    <Link
                      to="#"
                      className={classnames(
                        "accordion-button",
                        "p-2",
                        "shadow-none",
                        {
                          collapsed: !openSections[status.DailyID],
                        }
                      )}
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar-xs">
                          <div
                            className={classnames("avatar-title rounded-circle", {
                              "bg-success": status.SupportStatusName === "Done",
                              "bg-body": status.SupportStatusName !== "Done",
                            })}
                          >
                            <i className={getIconClass(status.SupportStatusName)}></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="fs-15 mb-0 fw-semibold">
                            {status.SupportStatusName}
                          </h6>
                          <span className="fs-11 text-muted">
                            {moment.utc(status.StatusDate).local().format("DD MMM - hh:mm A")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <Collapse
                    id={`collapse${status.DailyID}`}
                    className="accordion-collapse"
                    isOpen={!!openSections[status.DailyID]}
                  >
                    <div className="accordion-body ms-2 ps-5 pt-0">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Due Date:</span>
                        <span>
                          {status.DueDate === "0001-01-01T00:00:00"
                            ? "N/A"
                            : moment.utc(status.DueDate).local().format("DD MMM YYYY, hh:mm A")}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="fw-semibold">Remarks:</span>
                        <span>{status.Remarks || "N/A"}</span>
                      </div>
                    </div>
                  </Collapse>
                </div>
              ))
          )}

        </CardBody>
      </Card>
    );
  }

  // Default rendering for non-specified pages
  return <h1>Hello World</h1>;
};

export default CPStepsTracking;