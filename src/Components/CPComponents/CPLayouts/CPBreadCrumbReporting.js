import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import CPBreadCrumbReportingFilter from "./CPBreadCrumbReportingFilter";
import CPDateBox from "../CPInputs/CPDateBox";

const CPBreadCrumbReporting = ({
  title,
  pageTitle,
  selectedRange,
  onDateRangeChange,
  filterData,
  onClickSetFilter,
  onClickDownload,
}) => {
  const [isInfoDetails, setIsInfoDetails] = useState(false);
  const toggleInfo = () => {
    setIsInfoDetails(!isInfoDetails);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">{title}</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <CPDateBox
                  selectedRange={selectedRange}
                  onRangeChange={onDateRangeChange}
                />

                <button
                  type="button"
                  className="btn btn-danger me-1"
                  onClick={toggleInfo}
                  style={{ height: "38px", marginLeft: "4px" }}
                >
                  {" "}
                  <i className="ri-filter-2-line"></i>{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-success me-1"
                  onClick={onClickDownload}
                  style={{ height: "38px", marginLeft: "0px" }}
                >
                  {" "}
                  <i className="ri-download-2-line"></i>{" "}
                </button>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
      <CPBreadCrumbReportingFilter
        show={isInfoDetails}
        filterData={filterData}
        onCloseClick={() => setIsInfoDetails(false)}
        onClickSetFilter={onClickSetFilter}
      />
    </React.Fragment>
  );
};

export default CPBreadCrumbReporting;
