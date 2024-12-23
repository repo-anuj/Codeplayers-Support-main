import React, { useRef } from "react";

import { Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const CPDateBox = ({ selectedRange, onRangeChange }) => {
  const flatpickrRef = useRef(null);

  return (
    <form action="#">
      <Row className="g-3 mb-0 align-items-center">
        <div className="col-sm-auto">
          <div className="input-group">
            <Flatpickr
              ref={flatpickrRef}
              className="form-control border-0 dash-filter-picker shadow bg-light"
              value={selectedRange}
              onChange={(dates) => onRangeChange(dates)}
              options={{
                mode: "range", // Enable range mode
                dateFormat: "d-m-Y", // Customize your date format here
                // defaultDate: selectedRange, // Display the default date range
              }}
            />
            <div
              onClick={() => flatpickrRef.current.flatpickr.open()}
              className="input-group-text bg-primary border-primary text-white"
            >
              <i className="ri-calendar-2-line"></i>
            </div>
          </div>
        </div>
      </Row>
    </form>
  );
};

export default CPDateBox;
