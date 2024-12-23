import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

const recentOrders = [
  {
    rfqNo: "RFQ|24-25|1220",
    rfqDate: "21|09|2024",
    status: "Won",
    items: [
      { name: "Laptop", RequiredQuantity: 10, amount: 0, RequiredDescription: "8gb Ram", RequiredMake: "Dell", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Mouse", RequiredQuantity: 10, amount: 0, RequiredDescription: "300DPI Mouse", RequiredMake: "Logitech", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Keyboard", RequiredQuantity: 5, amount: 0, RequiredDescription: "Red key switch Mechanical Keyboard", RequiredMake: "Razer", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "USB Hub", RequiredQuantity: 5, amount: 0, RequiredDescription: "100mbps speed", RequiredMake: "", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "TechWorld",
  },
  {
    rfqNo: "RFQ|24-25|1221",
    rfqDate: "22|09|2024",
    status: "Expired",
    items: [
      { name: "Monitor", RequiredQuantity: 15, amount: 0, RequiredDescription: "1080p, 60Hz", RequiredMake: "Samsung", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Printer", RequiredQuantity: 3, amount: 0, RequiredDescription: "Laser Printer", RequiredMake: "HP", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "OfficeHub",
  },
  {
    rfqNo: "RFQ|24-25|1222",
    rfqDate: "23|09|2024",
    status: "Pending",
    items: [
      { name: "Projector", RequiredQuantity: 2, amount: 0, RequiredDescription: "4K HDR", RequiredMake: "Sony", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Whiteboard", RequiredQuantity: 5, amount: 0, RequiredDescription: "Magnetic", RequiredMake: "", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "SchoolSuppliesCo",
  },
  {
    rfqNo: "RFQ|24-25|1223",
    rfqDate: "24|09|2024",
    status: "Lost",
    items: [
      { name: "Smartphone", RequiredQuantity: 20, amount: 0, RequiredDescription: "5G, 128GB Storage", RequiredMake: "Xiaomi", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Tablet", RequiredQuantity: 10, amount: 0, RequiredDescription: "10-inch, 64GB Storage", RequiredMake: "Samsung", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "GadgetLand",
  },
  {
    rfqNo: "RFQ|24-25|1224",
    rfqDate: "25|09|2024",
    status: "Won",
    items: [
      { name: "Headphones", RequiredQuantity: 25, amount: 0, RequiredDescription: "Noise Cancelling", RequiredMake: "Sony", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Webcam", RequiredQuantity: 10, amount: 0, RequiredDescription: "HD, 1080p", RequiredMake: "Logitech", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "AudioVisualsPlus",
  },
  {
    rfqNo: "RFQ|24-25|1225",
    rfqDate: "26|09|2024",
    status: "Pending",
    items: [
      { name: "Router", RequiredQuantity: 12, amount: 0, RequiredDescription: "Dual-band, 5GHz", RequiredMake: "Netgear", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Switch", RequiredQuantity: 5, amount: 0, RequiredDescription: "24-Port Gigabit", RequiredMake: "Cisco", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "NetWorks Inc.",
  },
  {
    rfqNo: "RFQ|24-25|1226",
    rfqDate: "27|09|2024",
    status: "Expired",
    items: [
      { name: "Server", RequiredQuantity: 2, amount: 0, RequiredDescription: "Rack-mounted, 64GB RAM", RequiredMake: "Dell", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "UPS", RequiredQuantity: 3, amount: 0, RequiredDescription: "2000VA", RequiredMake: "APC", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "DataCenter Solutions",
  },
  {
    rfqNo: "RFQ|24-25|1227",
    rfqDate: "28|09|2024",
    status: "Lost",
    items: [
      { name: "Laptop Stand", RequiredQuantity: 30, amount: 0, RequiredDescription: "Adjustable, Aluminum", RequiredMake: "", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "External Hard Drive", RequiredQuantity: 20, amount: 0, RequiredDescription: "1TB, USB 3.0", RequiredMake: "WD", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "GizmoShop",
  },
  {
    rfqNo: "RFQ|24-25|1228",
    rfqDate: "29|09|2024",
    status: "Won",
    items: [
      { name: "Air Conditioner", RequiredQuantity: 3, amount: 0, RequiredDescription: "Inverter AC, 1.5 Ton", RequiredMake: "Daikin", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Water Dispenser", RequiredQuantity: 5, amount: 0, RequiredDescription: "Hot & Cold", RequiredMake: "", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "HomeAppliancesDepot",
  },
  {
    rfqNo: "RFQ|24-25|1229",
    rfqDate: "30|09|2024",
    status: "Pending",
    items: [
      { name: "Printer Ink", RequiredQuantity: 50, amount: 0, RequiredDescription: "Black Ink Cartridge", RequiredMake: "HP", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
      { name: "Paper Shredder", RequiredQuantity: 4, amount: 0, RequiredDescription: "Cross-cut", RequiredMake: "Fellowes", VendorStatus: "", VendorQuantity: "", VendorRate: "" },
    ],
    vendor: "OfficeEssentials",
  },
];


const RecentOrders = () => {
  const navigate = useNavigate(); // Using useNavigate for redirection

  // Function to assign the correct class based on the status
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "won":
        return "badge bg-success-subtle text-success";
      case "expired":
        return "badge bg-danger-subtle text-danger";
      case "lost":
        return "badge bg-light-subtle text-muted";
      default:
        return "badge bg-warning-subtle text-warning";
    }
  };

  // Handle row click to navigate to order details page
  const handleRowClick = (order) => {
    navigate(`/Order-details?${order.rfqNo}`, { state: { order } });
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">RFQ DATE</th>
                  <th scope="col">Products</th>
                  <th scope="col">Vendor</th>
                  <th scope="col">RFQ NO</th>
                  <th scope="col">Status</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders || []).map((order, key) => (
                  <tr
                    key={key}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(order)}
                  >
                    <td>{order.rfqDate}</td>

                    <td>
                      {/* Show first product and indicate more items if available */}
                      {order.items.length > 1 ? (
                        <span>
                          {order.items[0].name} + {order.items.length - 1}{" "}
                          more items
                        </span>
                      ) : (
                        <span>{order.items[0].name}</span>
                      )}
                    </td>

                    <td>{order.vendor}</td>

                    <td>
                      <span>{order.rfqNo}</span>
                    </td>
                    <td>
                      <span className={getStatusClass(order.status)}>
                        {order.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      {/* Calculate total RequiredQuantity for the order */}
                      <span>
                        {order.items.reduce(
                          (total, product) => total + product.RequiredQuantity,
                          0
                        )}
                      </span>
                    </td>

                    <td>
                      {/* Calculate total amount for the order */}
                      <span className="text-success">
                        ₹{" "}
                        {order.items.reduce(
                          (total, product) => total + product.amount,
                          0
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RecentOrders;