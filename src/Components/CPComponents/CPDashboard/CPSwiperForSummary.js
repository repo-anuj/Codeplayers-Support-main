import React from "react";
import { Row } from "reactstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CPDashboardSummaryCard from "./CPDashboardSummaryCard";

const CPSwiperForSummary = ({ title, summaryData, showRegister }) => {
  return (
    <Row>
      <div className="d-flex pt-2 pb-4">
        <h5
          className="card-title fs-18 mb-1"
          style={{ paddingLeft: "40px", paddingTop: "5px" }}
        >
          {title}
        </h5>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        loop={true}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="mySwiper marketplace-swiper rounded gallery-light"
      >
        {(summaryData === null) | (summaryData === undefined)
          ? ""
          : summaryData.map((individualData, index) => (
              <SwiperSlide key={index}>
                <CPDashboardSummaryCard
                  data={individualData}
                  cardType={"item.particulars"}
                  onCardClick={showRegister}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </Row>
  );
};
export default CPSwiperForSummary;
