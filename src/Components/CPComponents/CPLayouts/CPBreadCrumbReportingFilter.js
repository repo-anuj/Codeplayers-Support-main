import React, { useState } from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

const CPBreadCrumbReportingFilter = ({
  show,
  onCloseClick,
  filterData,
  onClickSetFilter,
}) => {
  const [filters, setFilters] = useState({
    voucherType: [],
    Accounts: [],
    item: [],
    stockgGroup: [],
    broker: [],
  });

  const handleButtonClick = () => {
    onClickSetFilter(filters);
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const currentFilter = newFilters[filterType];
      if (currentFilter.includes(value)) {
        newFilters[filterType] = currentFilter.filter((item) => item !== value);
      } else {
        newFilters[filterType] = [...currentFilter, value];
      }
      return newFilters;
    });
  };

  if (filterData) {
  } else {
    return "";
  }

  return (
    <Offcanvas
      direction="end"
      isOpen={show}
      id="offcanvasExample"
      toggle={onCloseClick}
    >
      <OffcanvasHeader className="bg-light" toggle={onCloseClick}>
        Fliters
      </OffcanvasHeader>
      {/* <form action="" className="d-flex flex-column justify-content-end h-100"> */}
      <OffcanvasBody>
        {filterData.map((individualData, index) => (
          <div className="mb-4">
            <Label
              htmlFor="status-select"
              className="form-label text-muted text-uppercase fw-semibold mb-3"
            >
              {individualData.filterType}
            </Label>
            <Row className="g-2">
              {individualData.filterValues.map((fv, ifv) => (
                <Col lg={6}>
                  <div className="form-check">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id={fv}
                      onChange={() => {
                        handleCheckboxChange(individualData.filterType, fv);
                      }}
                      defaultValue="option1"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      {fv}
                    </Label>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </OffcanvasBody>
      <div className="offcanvas-footer border-top p-3 text-center hstack gap-2">
        <button className="btn btn-light w-100" onClick={onCloseClick}>
          Clear Filter
        </button>
        <button className="btn btn-success w-100" onClick={handleButtonClick}>
          Filters
        </button>
      </div>
      {/* </form> */}
    </Offcanvas>
  );
};

export default CPBreadCrumbReportingFilter;
