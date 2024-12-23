import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import gateGIF from "../../../assets/images/Gate.gif";

const CPVoucherNumGateCard = ({ logistics, labelTitle }) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          {/* <div className="d-flex">
            <h5 className="card-title flex-grow-1 mb-0">
              <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
              {labelTitle}
            </h5>
          </div> */}
          <div className="d-flex">
            <h5 className="card-title flex-grow-1 mb-0">
              <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
              {labelTitle}
            </h5>
            <Button
              className="text-end btn-sm"
              // onClick={toggleModalVehicle}
            >
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="text-center">
            <lord-icon
              src="https://cdn.lordicon.com/wvaaucoa.json"
              trigger="loop"
              colors="primary:#405189,secondary:#0ab39c"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>

            {/* <img
              src={gateGIF}
              alt="Description of the GIF"
              style={{ width: "80px", height: "80px" }}
            /> */}

            {logistics === undefined || logistics === null ? (
              <h5 className="fs-16 mt-2 text-danger">Not Yet Filled</h5>
            ) : (
              <div>
                <h5 className="fs-16 mt-1" style={{ fontWeight: 700 }}>
                  2hr 12min
                  <small style={{ fontSize: "12px" }} className="text-muted">
                    <br />
                    CG13LA3077{" "}
                  </small>
                </h5>
                <br />
                <table className="table table-borderless table-sm mb-0">
                  <tbody>
                    {/* Gross */}
                    <tr>
                      <td className="text-start">Gate In:</td>
                      <td className="text-end"></td>
                      <td className="text-start text-muted">
                        12/09/2024 12:20 AM{" "}
                      </td>
                    </tr>

                    {/* Tare */}
                    <tr>
                      <td className="text-start">Gate Out:</td>
                      <td className="text-end"></td>
                      <td className="text-start text-muted">
                        12/09/2024 12:20 AM{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CPVoucherNumGateCard;
