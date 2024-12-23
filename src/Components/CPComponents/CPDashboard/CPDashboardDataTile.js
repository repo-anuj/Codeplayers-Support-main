import React from "react";
import { Card, CardHeader, Col, Row } from "reactstrap";
import CountUp from "react-countup";
import IconsForVoucherType from "../CPIcons/IconsForVoucherType";
import { size } from "lodash";
import { textSizeForOverflow } from "../TextSizeForOverflow";

const CPDashboardDataTile = ({ individualData, onCardClick }) => {
  if ((individualData === null) | (individualData === undefined)) {
    return "";
  }
  function checkIfInteger(value) {
    if (Number.isInteger(value)) {
      return true;
    } else {
      return false;
    }
  }
  const handleButtonClick = () => {
    onCardClick("status", individualData.voucherSeries);
  };

  return (
    <Card key={individualData.key}>
      <CardHeader className="border-0 align-items-center d-flex">
        <span
          className="avatar-title bg-light rounded-circle"
          style={{ width: "24px", height: "24px", paddingRight: "5px" }}
        >
          {IconsForVoucherType(individualData.voucherType)}
        </span>
        <h4
          style={textSizeForOverflow()}
          className="card-title mb-0 flex-grow-1"
          onClick={handleButtonClick}
        >
          {individualData.voucherSeries}
        </h4>
      </CardHeader>
      <CardHeader className="p-0 border-0 bg-light-subtle">
        <Row className="g-0 text-center">
          {individualData.argumentValue.map((arg, idx) => (
            <Col xs={6} sm={6} lg={6} key={idx}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <span className="counter-value" data-target={arg.argument}>
                    {checkIfInteger(arg.value) ? (
                      <CountUp
                        start={0}
                        end={parseFloat(arg.value)}
                        separator=","
                        duration={4}
                      />
                    ) : (
                      arg.value
                    )}
                  </span>
                </h5>
                <p className="text-muted mb-0">{arg.argument}</p>
              </div>
            </Col>
          ))}
        </Row>
      </CardHeader>
    </Card>
  );
};

export default CPDashboardDataTile;
