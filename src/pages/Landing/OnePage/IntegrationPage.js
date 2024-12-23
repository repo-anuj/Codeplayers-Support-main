import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "../../../assets/scss/pages/IntegrationPage.scss";
import Navbar from "./NavbarPage";
import Footer from "./footer";

// Assume these imports are correctly set up in your project
import weighbridge from "../../../assets/images/clients/weighbridge.png";
import tally from "../../../assets/images/clients/tally.png";
import rfid from "../../../assets/images/clients/rfid.png";
import epabx from "../../../assets/images/clients/epabx.jpg";
import attendance from "../../../assets/images/clients/attendance.png";
import secureye from "../../../assets/images/clients/secureye.png";
import client1 from "../../../assets/images/clients/client-1.png";
import client2 from "../../../assets/images/clients/client-2.png";
import client3 from "../../../assets/images/clients/client-3.jpg";
import client4 from "../../../assets/images/clients/client-4.png";
import client5 from "../../../assets/images/clients/client-5.png";
import client6 from "../../../assets/images/clients/client-6.png";

const integrations = [
  {
    title: "Weigh Bridge Integrations",
    image: weighbridge,
    content: [
      "SMEs not even think to systemize their business operations without integration with WeighBridges.",
      "Zero the chance of revenue leakage being done by weighment operator in your organization.",
    ],
  },
  {
    title: "Accounting Integrations",
    image: tally,
    content: [
      "Push your vouchers into Tally as well as other accounting software with ease.",
      "Save time and eliminate manual errors. Easily collaborate with tax practitioners for return filing.",
    ],
  },
  {
    title: "RFID Integrations",
    image: rfid,
    content: [
      "Our Hotel PMS is ready to work with RFID cards.",
      "You can manage your food court with Prepaid RFID card POS System.",
      "With a very cost effective solution you can prevent revenue loss in your organisation.",
    ],
  },
  {
    title: "Payment Integrations",
    content: [
      "Give your customers the freedom to pay online.",
      "Our ERP provides integrations with multiple leading online payment service providers.",
      "Accept online payments from the popular digital wallets without any hassles.",
    ],
    clients: [client1, client2, client3, client4, client5, client6],
  },
  {
    title: "Attendance Machine Integrations",
    image: attendance,
    content: [
      "Tell your Employees to touch their finger once or use face recognition with attendance machines.",
      "Leave rest on us. Do not waste time to prepare salary statement by manual attendance. Easily monitor employee's activity.",
    ],
  },
  {
    title: "Room Lock Integrations",
    image: secureye,
    content: [
      "Integrate your key card programmer with hotel PMS.",
      "Control your room lock with our PMS. No need to double the check-in/check-out entry with another software.",
    ],
  },
  {
    title: "EPABX Integrations",
    image: epabx,
    content: [
      "Integrate your Telephone EPABX System with hotel PMS.",
      "Let auto download the SMDR data to the server. And save revenue by controlling telephone misuse.",
    ],
  },
];

const IntegrationCard = ({ integration }) => {
  const isPaymentIntegration = integration.title === "Payment Integrations";

  return (
    <div
      className={`integration-item ${
        isPaymentIntegration ? "payment-integration" : ""
      }`}
    >
      {!isPaymentIntegration && (
        <div className="integration-image">
          <img src={integration.image} alt={integration.title} />
        </div>
      )}
      <div className="integration-card">
        <h2>{integration.title}</h2>
        <ul>
          {integration.content.map((item, i) => (
            <li key={i}>
              <span className="checkmark">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {isPaymentIntegration && (
        <div className="client-logos">
          {integration.clients.map((client, index) => (
            <img key={index} src={client} alt={`Client ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const IntegrationPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="integration-page">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <br />
            <br />
            Our Integrations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            See what we can Integrate
          </motion.p>

          <div className="integration-list">
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={integration.title}
                integration={integration}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntegrationPage;
