import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Badge, Row, Col, Table } from "reactstrap";
import { GET_License_History } from "../../slices/Licensing/thunk";

// Utility function to format date
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const LicenseDetails = () => {
  const dispatch = useDispatch();
  const licenseHistoryData = useSelector((state) => state.LicenseHistory.data) || [];

  useEffect(() => {
    dispatch(GET_License_History());
  }, []);



  const subscriptionDetails = {
    subscriptionKey: "50928300000",
    product: "Hotel Management",
    edition: "Enterprise Edition",
    additionalInfo: "Unlimited Multi User",
    amcValidTill: "31-Aug-2020",
    status: "Trial",
    computerName: "DEVELOPMENT",
    operatingSystem: "Microsoft Windows 11 Pro for Workstations",
    user: "DEVELOPMENT\\Codeplayers",
    publicIp: "45.124.144.253",
    localIp: "192.168.0.99",
  };


  return (
    <div
      style={{
        padding: "20px",
        marginTop: "50px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Subscription Details */}
      <Card className="mt-3">
        <CardBody>
          <Row className="text-center">
            <Col xs="12" md="3" className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>Subscription Key</h6>
              <h4 style={{ color: "#e83e8c" }}>{subscriptionDetails.subscriptionKey}</h4>
            </Col>
            <Col xs="12" md="2" className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>Product</h6>
              <p style={{ fontSize: "1.1rem" }}>{subscriptionDetails.product}</p>
            </Col>
            <Col xs="12" md="3" className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>Edition</h6>
              <p style={{ fontSize: "1.1rem" }}>
                {subscriptionDetails.edition}
                <Badge
                  color="dark"
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "0.85rem",
                  }}
                >
                  {subscriptionDetails.additionalInfo}
                </Badge>
              </p>
            </Col>
            <Col xs="12" md="2" className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>AMC Valid Till</h6>
              <p style={{ fontSize: "1.1rem" }}>{subscriptionDetails.amcValidTill}</p>
            </Col>
            <Col xs="12" md="2" className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>Status</h6>
              <Badge
                color="danger"
                style={{
                  padding: "5px 10px",
                  fontSize: "0.85rem",
                }}
              >
                {subscriptionDetails.status}
              </Badge>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Activation Details */}
      <Card className="mt-4 shadow-sm">
        <CardBody>
          <h5 style={{ fontWeight: "bold", marginBottom: "20px" }}>Activation Details</h5>
          <p style={{ marginBottom: "30px", color: "#6c757d", fontSize: "0.95rem" }}>
            This subscription is currently being used on the following computer:
          </p>
          <div className="d-flex flex-wrap justify-content-between align-items-start">
            <div style={{ flex: "1 1 25%", minWidth: "200px", marginBottom: "15px" }}>
              <h6 style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}>
                Computer Name
              </h6>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#212529" }}>
                {subscriptionDetails.computerName}
              </p>
            </div>
            <div style={{ flex: "1 1 25%", minWidth: "200px", marginBottom: "15px" }}>
              <h6 style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}>
                Operating System
              </h6>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#212529" }}>
                {subscriptionDetails.operatingSystem}
              </p>
            </div>
            <div style={{ flex: "1 1 25%", minWidth: "200px", marginBottom: "15px" }}>
              <h6 style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}>
                Public IP Address
              </h6>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#212529" }}>
                {subscriptionDetails.publicIp}
              </p>
            </div>
            <div style={{ flex: "1 1 25%", minWidth: "200px", marginBottom: "15px" }}>
              <h6 style={{ fontWeight: "bold", marginBottom: "8px", color: "#495057" }}>
                Local IP Address
              </h6>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "#212529" }}>
                {subscriptionDetails.localIp}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>   

      {/* Activation History */}
      <Card style={{ marginTop: "20px" }}>
        <CardBody>
          <h5 style={{ fontWeight: "bold", marginBottom: "20px" }}>Activation History</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Mode</th>
                <th>Computer</th>
              </tr>
            </thead>
            <tbody>
              {licenseHistoryData.map((history, index) => (
                <tr key={index}>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(history.RequestDateTime))}
                  </td>
                  <td>
                    <Badge color="success">{history.Action}</Badge>
                  </td>
                  <td>{history.Mode}</td>
                  <td>
                    <strong>Name:</strong> {history.ComputerName} <br />
                    <strong>OS:</strong> {history.OS} <br />
                    <strong>User:</strong> {history.ComputerUserName} <br />
                    <strong>IP Address:</strong> {history.RequestIP}
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default LicenseDetails;
