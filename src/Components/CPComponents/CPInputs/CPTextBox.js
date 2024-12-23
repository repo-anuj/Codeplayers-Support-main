import React from "react";
import { Label, Input } from "reactstrap";

const CPTextBox = ({ title, id, value, onChange, onBlur, error }) => {
  const handleBlur = (e) => {
    const trimmedValue = e.target.value.trim();
    if (!trimmedValue) {
      onChange({ target: { id, value: "" } }); // Set value to an empty string if it’s blank or only whitespace
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleChange = (e) => {
    const trimmedValue = e.target.value;
    onChange({ target: { id, value: trimmedValue } });
  };

  return (
    <React.Fragment>
      <div className="input-group mb-3">
        <Label className="cpinput-group-text" htmlFor={id}>
          {title}
        </Label>
        <Input
          type="text"
          className={`form-control ${error ? "is-invalid" : ""}`}
          id={id}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=""
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </React.Fragment>
  );
};

export default CPTextBox;
