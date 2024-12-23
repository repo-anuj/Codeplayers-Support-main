import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import CPBreadCrumbReporting from "../../../Components/CPComponents/CPDashboard/Support/CPBreadCrumbReporting";
import { GET_SupportDashboard } from "../../../slices/Dashboards/SupportDashboard/thunk.js";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
import FeatherIcon from "feather-icons-react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";
import RecentOrders from "./RecentOrders";
import ModuleData from "./ModuleData.js";
// import CurrentlyActiveQueries from "./CurrentlyActiveQueries.js";
import ModuleWiseDistribution from "./ModuleWiseDistribution.js";
import CurrentlyActiveQueries from "./CurrentlyActiveQueries.js";
import ActiveQueries from "./ActiveQueries.js";
import DeadLineCrossed from "./DeadLineCrossed.js";
import CriticalQueries from "./CriticalQueries.js";
import ReviewPending from "./ReviewPending.js";
import ClientWise from "./ClientWise.js";

const SupportDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SupportDashboard.data) ;
  
  
  const loading = useSelector((state) => state.SupportDashboard.loading);
  const success = useSelector((state) => state.SupportDashboard.success);
  const navigate = useNavigate();

  const today = new Date();
  const storedRange = JSON.parse(sessionStorage.getItem("selectedRange"));
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [Currdata,setCurrdata]=useState([]);
  const dateChange = (newRange) => {
    if (newRange.length === 2) {
      setSelectedRange(newRange);
      sessionStorage.setItem("selectedRange", JSON.stringify(newRange));

      dispatch(
        GET_SupportDashboard({
          FromDate: moment(newRange[0]).format("YYYY-MM-DD"),
          ToDate: moment(newRange[1]).format("YYYY-MM-DD"),
        })
      );
      setCurrdata(data);
    }
  };

  useEffect(() => {

    const initialRange = storedRange
      ? [new Date(storedRange[0]), new Date(storedRange[1])]
      : [today, today];

    if (!selectedRange || selectedRange.length !== 2 || !selectedRange[0]) {
      dateChange(initialRange);
    }
  }, [selectedRange, storedRange, today]);

  // Calculate counts based on CurrentStatus
  const countByStatus = {};
  if (success) {
    (data || []).forEach((item) => {
      const status = item?.CurrentStatus;
      countByStatus[status] = (countByStatus[status] || 0) + 1;
    });
  }

  const totalCount = success ? (data || []).length : 0;
  useEffect(() => {
    if (success) {
      setCurrdata(data);
    }
  }, [data, success]);

  // Sort and get the top 10 recent queries based on date
  const recentQueries = success
    ? [...(data || [])]
        .sort((a, b) => new Date(b?.ReportDateTime) - new Date(a?.ReportDateTime))
        .slice(0, 10)
    : [];
  const CloseModal = () =>{
    dispatch(GET_SupportDashboard());
    setCurrdata(data);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <CPBreadCrumbReporting title="Support Dashboard" pageTitle="Data" onDateRangeChange ={dateChange} handleModalClose={CloseModal}/>

          <Row className="d-flex">
            {/* Adjust container to remove horizontal scrolling */}
            <div style={{ overflow: "hidden", padding: "10px", width: "100%" }}>
              {/* Swiper Section */}
              

              <Row>
                <Col xs="12" md="4">
                  <ModuleWiseDistribution data={Currdata|| []} />
                </Col>
                <Col xs="12" md="4">
                  <CriticalQueries queries={Currdata || []} />
                </Col>
                <Col xs="12" md="4">
                  <DeadLineCrossed queries={Currdata || []} />
                </Col>
              </Row>

              <Row>
                <Col xs="12" md="4">
                  <ActiveQueries queries={Currdata || []} />
                </Col>
                <Col xs="12" md="4">
                  <CurrentlyActiveQueries queries={Currdata || []} />
                </Col>
                <Col xs="12" md="4">
                  <ReviewPending queries={Currdata ||[]}/>
                </Col>
              </Row>
              <ClientWise queries={Currdata ||[]} />
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SupportDashboard;
