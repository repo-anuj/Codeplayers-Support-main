import React, { useState, useEffect } from "react";
import { Spinner, Card, CardHeader, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CPBreadCrumbMasters from "../../Components/CPComponents/CPLayouts/CPBreadCrumbMasters";

const LicenseHistory = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Simulate data fetching
  useEffect(() => {
      setLicenses([
        {
          subscriptionKey: "50928300000",
          product: "Hotel Management",
          edition: "Enterprise Edition",
          additionalInfo: "Unlimited Multi User",
          issueDate: "16-Aug-2020",
          amcValidTill: "31-Aug-2020",
          status: "Trial",
        },
      ]);
      setLoading(false); // Stop loading after data is fetched
  }, []);

  // Navigate to subscription details
  const handleSubscriptionClick = (key) => {
    navigate("/subscription-details", { state: { subscriptionKey: key } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <CPBreadCrumbMasters title={"Licence History"} pageTitle={"Subscription"} />
      {/* Card Section */}
      <Card
        style={{
          width: "80%",
          maxWidth: "1200px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <CardHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Subscriptions</h1>
          </div>
          <Button
            color="primary"
            style={{ padding: "10px 20px", fontSize: "1rem", borderRadius: "5px" }}
            onClick={() => alert("Redirecting to Buy Page...")}
          >
            Buy
          </Button>
        </CardHeader>

        <CardBody>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Spinner color="primary" />
            </div>
          ) : (
            <table className="table table-bordered">
              <thead className="bg-light">
                <tr>
                  <th>Subscription Key</th>
                  <th>Product</th>
                  <th>Edition</th>
                  <th>Issue Date</th>
                  <th>AMC Valid Till</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((license, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td
                      className="text-primary cursor-pointer"
                      onClick={() => handleSubscriptionClick(license.subscriptionKey)} // Add click handler
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {license.subscriptionKey}
                    </td>
                    <td>{license.product}</td>
                    <td>
                      {license.edition}{" "}
                      <span className="badge bg-secondary">
                        {license.additionalInfo}
                      </span>
                    </td>
                    <td>{license.issueDate}</td>
                    <td>{license.amcValidTill}</td>
                    <td>
                      <span
                        className={`badge ${
                          license.status === "Trial"
                            ? "bg-danger text-white"
                            : "bg-success text-white"
                        }`}
                      >
                        {license.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>

        <div
          style={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
            color: "#6c757d",
          }}
        >
          <span>© 2020 - CODEPLAYERS Business System Private Limited</span>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="#terms" style={{ color: "#007bff", textDecoration: "none" }}>
              Terms of Use
            </a>
            <a
              href="#privacy"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            <a
              href="#contact"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LicenseHistory;
