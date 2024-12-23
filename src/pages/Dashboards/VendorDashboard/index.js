import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody,CardHeader } from "reactstrap";
import CPBreadCrumbReporting from "../../../Components/CPComponents/CPLayouts/CPBreadCrumbReporting";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { Autoplay, Mousewheel } from "swiper/modules";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import { GET_VendorDashboard } from "../../../slices/Dashboards/VendorDashboard/thunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RecentOrders from "../../QuotationRegister/RecentOrders.js";
import ModuleCharts from "./ModuleCharts.js";
import ModuleData from "./ModuleData.js";
const VendorDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.VendorDashboard.data);
  const loading = useSelector((state) => state.VendorDashboard.loading);
  const navigate = useNavigate();

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
  // Set initial range

  // State to hold the selected date range
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const totalCount = recentOrders.length || 0;

  const countByStatus = recentOrders.reduce((acc, order) => {
    const status = order.status || "No Status";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  console.log(countByStatus);
  const dateChange = (newRange) => {
    if (newRange.length === 2) {
      setSelectedRange(newRange);
      sessionStorage.setItem("selectedRange", JSON.stringify(newRange));
      dispatch(
        GET_VendorDashboard({
          FromDate: moment(newRange[0]).format("yyyy-MM-DD"),
          ToDate: moment(newRange[1]).format("yyyy-MM-DD"),
        })
      );
    }
  };

  useEffect(() => {
    const storedRange = JSON.parse(sessionStorage.getItem("selectedRange"));
    const initialRange = storedRange
      ? [new Date(storedRange[0]), new Date(storedRange[1])]
      : [new Date(), new Date()];

    if (!selectedRange[0] && !selectedRange[1]) {
      dateChange(initialRange);
    }
  }, [selectedRange]);

  


  //chart
  const chartLabels = Object.keys(countByStatus); 
  const chartData = Object.values(countByStatus); 



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CPBreadCrumbReporting
            title="Vendor Dashboard"
            pageTitle="Data"
            selectedRange={selectedRange}
            onDateRangeChange={dateChange}
          />
          <Row>
            <Col xs="12">
              <div style={{ overflowX: "auto", padding: "10px" }}>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={24}
                  mousewheel={true}
                  autoplay={false}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    576: { slidesPerView: 1, spaceBetween: 15 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    992: { slidesPerView: 3, spaceBetween: 24 },
                  }}
                  modules={[Autoplay, Mousewheel]}
                  direction="horizontal"
                  className="querySwiper"
                >
                  <SwiperSlide>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">Total </p>
                            <h2 className="mt-4 ff-secondary fw-semibold">
                              <span className="counter-value">
                                <CountUp start={0} end={totalCount} duration={4} />
                              </span>
                            </h2>
                          </div>
                          <div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-primary rounded-circle fs-2">
                                <FeatherIcon icon="list" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                  {Object.keys(countByStatus).map((status, index) => (
                    <SwiperSlide key={index}>
                      <Card className="card-animate">
                        <CardBody>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">{status} </p>
                              <h2 className="mt-4 ff-secondary fw-semibold">
                                <span className="counter-value">
                                  <CountUp start={0} end={countByStatus[status]} duration={4} />
                                </span>
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-info rounded-circle fs-2">
                                  <FeatherIcon icon="clock" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <RecentOrders />
            </Col>
            <Col lg={4}>
              <ModuleData data={recentOrders}/>
            </Col>
          </Row>
          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VendorDashboard;