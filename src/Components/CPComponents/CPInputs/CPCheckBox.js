import React from "react";
import { Label, Input } from "reactstrap";

const CPCheckBox = ({ title, id, isChecked, onChange }) => {
  return (
    <div className="form-check mb-3">
      <Input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
      <Label className="form-check-label" htmlFor={id}>
        {title}
      </Label>
    </div>
  );
};

export default CPCheckBox;
