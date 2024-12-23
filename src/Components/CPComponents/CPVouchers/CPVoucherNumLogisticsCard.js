import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";
import moment from "moment/moment";
// import CPVehicleDetailsModal from "../../Components/CPComponents/CPInputs/CPVehicleDetailsModal";

const CPVoucherNumLogisticsCard = ({ logistics, labelTitle }) => {
  const [modalVehicle, setModalVehicle] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState(logistics || {});

  const toggleModalVehicle = () => {
    setModalVehicle(!modalVehicle);
  };
  const handleUpdateVehicleDetails = (updatedDetails) => {
    setVehicleDetails(updatedDetails);
    toggleModalVehicle();
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="d-flex">
            <h5 className="card-title flex-grow-1 mb-0">
              <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
              {labelTitle}
            </h5>
            <Button className="text-end btn-sm" onClick={toggleModalVehicle}>
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="text-center">
            <p className="text-muted mb-0">{logistics?.transporterName}</p>
            <lord-icon
              src="https://cdn.lordicon.com/uetqnvvg.json"
              trigger="loop"
              colors="primary:#405189,secondary:#0ab39c"
              style={{ width: "80px", height: "80px" }}
            ></lord-icon>

            {logistics === undefined || logistics === null ? (
              <h5 className="fs-16 mt-2 text-danger">Not Yet Filled</h5>
            ) : (
              <div>
                <h5 className="fs-16 mt-2">{logistics?.vehicleNumber}</h5>
              </div>
            )}
          </div>
          <table className="table table-borderless table-sm mb-0">
            <tbody>
              {/* LR */}
              <tr>
                <td className="text-start">LR:</td>
                <td className="text-end">
                  <b>{logistics?.lrNo}</b>
                  <b>
                    {moment(logistics?.lrDate).format("DD-MM-yyyy") ===
                    "01-01-0001"
                      ? ""
                      : moment(logistics?.lrDate).format("DD-MM-yyyy")}
                  </b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* Driver Name */}
              <tr>
                <td className="text-start">Driver Name:</td>
                <td className="text-end">
                  <b>{logistics?.driverName}</b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* Driver Mobile */}
              <tr>
                <td className="text-start">Driver's Mobile:</td>
                <td className="text-end">
                  <b>{logistics?.driverMobile}</b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* AADHAR/DL */}
              <tr>
                <td className="text-start">AADHAR/DL:</td>
                <td className="text-end">
                  <b>{logistics?.aadhaarDl}</b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* Party Gross */}
              <tr>
                <td className="text-start">Party Gross:</td>
                <td className="text-end">
                  <b>
                    {logistics?.partyGross}{" "}
                    {logistics?.partyGross === undefined ? "" : "KGS"}
                  </b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* Party Tare */}
              <tr>
                <td className="text-start">Party Tare:</td>
                <td className="text-end">
                  <b>
                    {logistics?.partyTare}{" "}
                    {logistics?.partyTare === undefined ? "" : "KGS"}
                  </b>
                </td>
                <td className="text-start"></td>
              </tr>

              {/* Advance Amount */}
              <tr>
                <td className="text-start">Advance Amount:</td>
                <td className="text-end">
                  {logistics?.advanceAmount === undefined ? "" : "₹"}
                  <b>{logistics?.advanceAmount}</b>
                </td>
                <td className="text-start"></td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* <CPVehicleDetailsModal
        vehicleDetails={vehicleDetails}
        onUpdate={handleUpdateVehicleDetails}
        modalVehicle={modalVehicle}
        toggleModalVehicle={toggleModalVehicle}
      /> */}
    </React.Fragment>
  );
};

export default CPVoucherNumLogisticsCard;

// const CPVoucherNumLogisticsCard = ({ logistics, labelTitle }) => {
//   return (
//     <React.Fragment>
//       <Card>
//         <CardHeader>
//           <div className="d-flex">
//             <h5 className="card-title flex-grow-1 mb-0">
//               <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
//               {labelTitle}
//             </h5>
//           </div>
//         </CardHeader>
//         <CardBody>
//           <div className="text-center">
//             <lord-icon
//               src="https://cdn.lordicon.com/uetqnvvg.json"
//               trigger="loop"
//               colors="primary:#405189,secondary:#0ab39c"
//               style={{ width: "80px", height: "80px" }}
//             ></lord-icon>

//             {logistics === undefined || logistics === null ? (
//               <h5 className="fs-16 mt-2 text-danger">Not Yet Filled</h5>
//             ) : (
//               <div>
//                 <h5 className="fs-16 mt-2">{logistics?.vehicleNumber}</h5>
//                 <p className="text-muted mb-0">{logistics?.transporterName}</p>

//                 <p className="text-muted mb-0">
//                   LR : <b>{logistics?.lrNumber}</b> dt.{" "}
//                   {moment(logistics?.lrDate).format("DD-MM-yyyy") ===
//                   "01-01-0001"
//                     ? ""
//                     : moment(logistics?.lrDate).format("DD-MM-yyyy")}
//                 </p>
//               </div>
//             )}
//           </div>
//         </CardBody>
//       </Card>
//     </React.Fragment>
//   );
// };

// export default CPVoucherNumLogisticsCard;
