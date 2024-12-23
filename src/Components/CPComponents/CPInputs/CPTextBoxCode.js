import React from "react";
import { Input, Label } from "reactstrap";

const CPTextBoxCode = ({ title, id, value }) => {
  return (
    <React.Fragment>
      <div className="input-group mb-3">
        <Label className="cpinput-group-text" htmlFor={id}>
          {title}
        </Label>
        <Input
          type="null"
          className="form-control"
          id={id}
          value={value}
          readOnly
          placeholder=""
        />
      </div>
    </React.Fragment>
  );
};

export default CPTextBoxCode;
