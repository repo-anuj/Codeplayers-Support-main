import React, { useState } from "react";
import { Col, Row, Container } from "reactstrap";
import CPBreadCrumbReportingFilter from "./CPBreadCrumbReportingFilter";

const CPBreadCrumbMasters = ({
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
                <li className="breadcrumb-item">{pageTitle}</li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CPBreadCrumbMasters;
