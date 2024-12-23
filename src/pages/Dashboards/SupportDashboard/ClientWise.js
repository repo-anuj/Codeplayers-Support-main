import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Card, CardBody } from "reactstrap";

// Card Component
const QueryCard = ({ name, done, supportReview, devReview, clientReview, total }) => {
  return (
    <Card className="card-animate" style={{ padding: "10px", height: "175px" }}>
      <CardBody style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h6
            title={name}
            className="card-title mb-0 text-truncate"
            style={{ fontSize: "12px", maxWidth: "180px" }}
          >
            {name}
          </h6>
          <div
            className="fw-bold text-muted"
            style={{ fontSize: "12px", marginLeft: "10px" }}
          >
            {total}
          </div>
        </div>

        <hr className="my-1" />
        <div>
          <div className="d-flex justify-content-between text-success" style={{ fontSize: "12px" }}>
            <span>Done:</span> <span>{done}</span>
          </div>
          <div className="d-flex justify-content-between text-warning" style={{ fontSize: "12px" }}>
            <span>Support Review Pending:</span> <span>{supportReview}</span>
          </div>
          <div className="d-flex justify-content-between text-primary" style={{ fontSize: "12px" }}>
            <span>Development Review Pending:</span> <span>{devReview}</span>
          </div>
          <div className="d-flex justify-content-between text-danger" style={{ fontSize: "12px" }}>
            <span>Client Review Pending:</span> <span>{clientReview}</span>
          </div>
          <div className="d-flex justify-content-between text-danger" style={{ fontSize: "12px" }}>
            <span>To be Assigned:</span> <span>{total - clientReview - supportReview - devReview - done}</span>
          </div>
        </div>
        
      </CardBody>
    </Card>
  );
};

// Main Component
const ClientWise = ({ queries }) => {
  // Possible statuses to match
  const statusCategories = {
    Done: "done",
    "Support Review Pending": "supportReview",
    "Development Review Pending": "devReview",
    "Client Review Pending": "clientReview",
    "To Be Assigned": "Unknown",
  };

  // Group queries by LicensedTo and count statuses
  const groupedData = queries.reduce((acc, query) => {
    const key = query.LicensedTo || "Unknown";
    if (!acc[key]) {
      acc[key] = { name: key, done: 0, supportReview: 0, devReview: 0, clientReview: 0, total: 0 };
    }

    const status = statusCategories[query.CurrentStatus] || "Unknown"; // Default to clientReview if status is unrecognized
    if (status) acc[key][status] += 1;
    acc[key].total += 1;

    return acc;
  }, {});

  // Prepare the "All" card by aggregating all counts
  const allCard = Object.values(groupedData).reduce(
    (acc, company) => {
      acc.done += company.done;
      acc.supportReview += company.supportReview;
      acc.devReview += company.devReview;
      acc.clientReview += company.clientReview;
      acc.total += company.total;
      return acc;
    },
    { name: "ALL", done: 0, supportReview: 0, devReview: 0, clientReview: 0, total: 0 }
  );

  const cards = [allCard, ...Object.values(groupedData)];

  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        mousewheel={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 },
          576: { slidesPerView: 1, spaceBetween: 8 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          992: { slidesPerView: 3, spaceBetween: 10 },
        }}
        modules={[Autoplay, Mousewheel]}
      >
        {/* Dynamically render QueryCards */}
        {cards.map((item) => (
          <SwiperSlide key={item.name}>
            <QueryCard
              name={item.name}
              done={item.done}
              supportReview={item.supportReview}
              devReview={item.devReview}
              clientReview={item.clientReview}
              total={item.total}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientWise;