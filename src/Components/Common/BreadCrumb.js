import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle, onTour }) => {
  const handleTour = (values) => {
    onTour(values);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 d-flex align-items-center">
              <lord-icon
                src="https://cdn.lordicon.com/axteoudt.json"
                trigger="in"
                delay="2000"
                onClick={handleTour}
                colors="primary:#4169E1,secondary:#405189"
                style={{ width: "18px", height: "18px", marginRight: "8px" }} // Add margin for spacing
              />
              {title}
            </h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="#">{pageTitle}</Link>
                </li>
                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
