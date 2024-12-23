import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import CPBreadCrumbReporting from "../../../../Components/CPComponents/CPLayouts/CPBreadCrumbReporting.js";
import { GET_ERPDashboard } from "../../../slices/Dashboards/ERPDashboard/thunk.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CountUp from 'react-countup'; // Ensure this is installed
import FeatherIcon from 'feather-icons-react'; // Ensure this is installed
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import RecentOrders from "../RecentOrders.js";
import ModuleData from "./ModuleData.js";
import CurrentlyActiveQueries from "./CurrentlyActiveQueries.js";
import CPMasterRegisterTable from "../../../../Components/CPComponents/CPDashboard/CPMasterRegisterTable.js";
const ERPDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ERPDashboard.data);
  const loading = useSelector((state) => state.ERPDashboard.loading);
  const success = useSelector((state) => state.ERPDashboard.success);
  const navigate = useNavigate();
  console.log(data);
  const dataRecords = data;

  const today = new Date();
  const storedRange = JSON.parse(sessionStorage.getItem("selectedRange"));
  const [selectedRange, setSelectedRange] = useState([null, null]);

  const dateChange = (newRange) => {
    if (newRange.length === 2) {
      setSelectedRange(newRange);
      sessionStorage.setItem("selectedRange", JSON.stringify(newRange));

      dispatch(
        GET_ERPDashboard({
          FromDate: moment(newRange[0]).format("YYYY-MM-DD"),
          ToDate: moment(newRange[1]).format("YYYY-MM-DD"),
        })
      );
    }
  };

  useEffect(() => {
    const initialRange = storedRange
      ? [new Date(storedRange[0]), new Date(storedRange[1])]
      : [today, today];

    if (selectedRange && selectedRange.length === 2) {
      if (selectedRange[0] === null) {
        dateChange(initialRange);
      }
    }
  }, [selectedRange]);

  // Calculate counts based on CurrentStatus
  const countByStatus = {};
  if (success) {
    data.record.forEach((item) => {
      const status = item.Status;
      countByStatus[status] = (countByStatus[status] || 0) + 1;
    });
  }

  const totalCount = success ? data.record.length : 0;

  // Sort and get the top 10 recent queries based on date
  const recentQueries = success
    ? [...data.record]
      .sort((a, b) => new Date(b.StatusDateTime) - new Date(a.StatusDateTime))
      .slice(0, 10) // Ensure to take top 10
    : [];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CPBreadCrumbReporting
            title="ERP Dashboard"
            pageTitle="Data"

          />

          {/* Row for the Cards */}
          <Row>
            <Col xs="12">
              <div style={{ overflowX: "auto", padding: "10px" }}>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={24}
                  mousewheel={true}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    576: { slidesPerView: 1, spaceBetween: 15 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    992: { slidesPerView: 3, spaceBetween: 24 },
                  }}
                  modules={[Autoplay, Mousewheel]}
                  className="querySwiper"
                >
                  {/* Total Count of Queries */}
                  <SwiperSlide>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">Total Queries</p>
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

                  {/* Count of Queries Based on Status */}
                  {success &&
                    Object.keys(countByStatus).map((status, index) => (
                      <SwiperSlide key={index}>
                        <Card className="card-animate">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <div>
                                <p className="fw-medium text-muted mb-0">{status} Queries</p>
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
          <Row className="mt-3">
            <Col xs="12">
              <div className="table-container" style={{ padding: "10px" }}>
                {loading ? (
                  <p className="text-muted">Loading table data...</p>
                ) : (
                    <CPMasterRegisterTable dataFromAPI={dataRecords?.record || []} />
            
                )}
              </div>
            </Col>
          </Row>
          {/* Row for Module Data on the Left and Recent Queries on the Right */}
          <Row className="mt-3">
            {/* Module Data (Left Column) */}
            <Col xs="12" md="4" style={{ overflow: 'hidden' }}>
              <div
                className="module-data"
                style={{
                  // Consistent height
                  padding: "10px",
                  overflowY: "hidden", // Enable internal scrolling
                  overflowX: "hidden" // Prevent horizontal scrolling
                }}
              >
                <ModuleData data={dataRecords?.record || []} />
              </div>
            </Col>

            {/* Recent Queries (Right Column) */}
            <Col xs="12" md="4" mt="3" style={{ overflow: 'hidden' }}>
              <div
                className="recent-queries"
                style={{
                  // Consistent height
                  padding: "10px",
                  overflowY: "hidden", // Enable internal scrolling
                  overflowX: "hidden" // Prevent horizontal scrolling
                }}
              >
                {loading ? (
                  <p className="text-muted">Loading recent queries...</p>
                ) : (
                  <RecentOrders queries={recentQueries} />
                )}
              </div>
            </Col>
            <Col xs="12" md="4">
              <div
                className="active-queries"
                style={{
                  // Consistent height
                  padding: "10px",
                  overflowY: "hidden", // Enable internal scrolling
                  overflowX: "hidden" // Prevent horizontal scrolling
                }}
              >
                {loading ? (
                  <p className="text-muted">Loading active queries...</p>
                ) : (
                    <CurrentlyActiveQueries queries={dataRecords?.record || []} />
                )}
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ERPDashboard;
