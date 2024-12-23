import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

import { Link } from "react-router-dom";
//Import Icons
import IconsForVoucherType from "../../CPIcons/IconsForVoucherType";
import { truncateText } from "../../TextSizeForOverflow";

//SimpleBar
import SimpleBar from "simplebar-react";
import moment from "moment/moment";

const RecentActivity = ({ latestActivity }) => {
  if (latestActivity === null || latestActivity === undefined) {
    return "";
  }

  return (
    <React.Fragment>
      <Col xxl={12}>
        <Card className="card-height-100">
          <CardHeader className="card-header align-items-center d-flex">
            {IconsForVoucherType("Recent Activity")}
            <h4 className="card-title mb-0 flex-grow-1">Recent Activity</h4>
          </CardHeader>
          <CardBody className="p-0">
            <SimpleBar style={{ height: "435px" }}>
              <div className="p-3">
                {latestActivity.map((individualData, index) => (
                  <h6 className="text-muted text mb-3 fs-11">
                    <div className="d-flex align-items-center">
                      <div className="avatar-xs flex-shrink-0">
                        <span className="avatar-title bg-light rounded-circle">
                          {IconsForVoucherType(individualData.voucherType)}
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <Link
                          to={
                            "/VoucherNum?VoucherNumID=" +
                            individualData.voucherNumID
                          }
                        >
                          <h6 className="fs-14 mb-1">
                            {individualData.particulars}
                            {" - "}
                            {individualData.voucherNumber}
                          </h6>
                        </Link>
                        <p className="text-muted fs-12 mb-0">
                          <h6 className="mb-1 text-success">
                            {moment(individualData.entryTime).format(
                              "DD MMM - hh:mmA"
                            )}
                          </h6>
                        </p>
                        <p className="text-muted fs-12 mb-0">
                          <i className="mdi mdi-circle-medium text-success fs-15 align-middle"></i>
                          {truncateText(individualData.account)}
                        </p>
                        <p className="text-muted fs-12 mb-0">
                          <i className="mdi mdi-circle-medium text-success fs-15 align-middle"></i>
                          {individualData.item}
                        </p>
                        <p className="text-muted fs-12 mb-0">
                          <i className="mdi mdi-circle-medium text-success fs-15 align-middle"></i>
                          {individualData.weight}
                        </p>
                      </div>
                      {/* <div className="flex-shrink-0 text-end">
                        <h6 className="mb-1 text-success">
                          {moment(individualData.entryTime).format(
                            "DD MMM - hh:mmA"
                          )}
                        </h6>
                        <p className="text-muted fs-13 mb-0">
                          {individualData.weight}
                        </p>
                      </div> */}
                    </div>
                  </h6>
                ))}
              </div>
            </SimpleBar>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentActivity;
