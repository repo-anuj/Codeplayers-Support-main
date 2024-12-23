import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../slices/thunks";
import rest from "../../../assets/images/landing/features/rest.jpg";
import hotel from "../../../assets/images/landing/features/hotel.jpg";
import school from "../../../assets/images/landing/features/school.jpg";
import sme from "../../../assets/images/landing/features/sme.jpg";
import food from "../../../assets/images/landing/features/food.jpg";
import theater from "../../../assets/images/landing/features/theater.jpg";
import retail from "../../../assets/images/landing/features/retail.jpg";
import build from "../../../assets/images/landing/features/build.jpg";
import fast2 from "../../../assets/images/landing/features/fast2.jpg";
import steel from "../../../assets/images/landing/features/steel.jpg";
import route from "../../../assets/images/landing/features/route.jpg";
import vehicle from "../../../assets/images/landing/features/vehicle.jpg";
import movement from "../../../assets/images/landing/features/movement.jpg";
import driver from "../../../assets/images/landing/features/driver.jpg";
import infinityERP from "../../../assets/images/landing/features/infinityERP.png";
import Fleet from "../../../assets/images/landing/features/FleetLOGO.png";
import InfinityXLogo from "../../../assets/images/landing/features/InfinityX.png";
import atyour from "../../../assets/images/landing/features/atyour.png";
import MIS from "../../../assets/images/landing/features/misfinal.jpg";
import "../../../assets/scss/pages/Services.sass";
import Navbar from "./NavbarPage";
import Footer from "./footer";

const Services = () => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeType: layout.layoutModeType,
    })
  );
  const { layoutModeType } = useSelector(selectLayoutProperties);

  useEffect(() => {
    if (layoutModeType) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLayoutMode(layoutModeType));
    }
  }, [layoutModeType, dispatch]);
  /*
call dark/light mode
*/
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const services = [
    {
      img: steel,
      title: "Steel and Allied Industries",
      description:
        "Infinity ERP offers comprehensive solutions tailored for Steel and Allied Industries, covering manufacturing, inventory management, quality control, and logistics.",
      extraImg: infinityERP,
    },
    {
      img: movement,
      title: "Logistics & Movement",
      description:
        "Track all inward and outward material movement at Security Gate and Weighbridge with our Infinity Fleet.",
      extraImg: Fleet,
    },
    {
      img: sme,
      title: "SMEs",
      description:
        "InfinityX is fully equipped with features to manage all processes of SMEs, including procurement, material management, payroll, CRM, and more.",
      extraImg: infinityERP,
    },
    {
      img: MIS,
      title: "Management Information System (MIS)",
      description:
        "InfinityX offers a robust Management Information System (MIS) that provides comprehensive reporting and data analysis, helping businesses make informed decisions.",
      extraImg: InfinityXLogo,
    },
    {
      img: build,
      title: "Builders and Contractors",
      description:
        "InfinityX is highly capable of managing material flow across multiple sites, providing centralized reporting to ensure a smooth workflow.",
      extraImg: infinityERP,
    },
    {
      img: rest,
      title: "Restaurant & Bar Management",
      description:
        "Simplify your restaurant's operation with fast and accurate billing and KOTs. Online Aggregator and Payments Integrations are other highlights of InfinityX.",
      extraImg: atyour,
    },
    {
      img: route,
      title: "Route Optimization",
      description:
        "Plan and optimize routes to reduce travel time, fuel consumption, and enhance delivery efficiency with our Infinity Fleet.",
      extraImg: Fleet,
    },
    {
      img: vehicle,
      title: "Vehicle Maintenance Management",
      description:
        "Schedule and track maintenance activities, ensuring all vehicles are kept in optimal condition with our Infinity Fleet.",
      extraImg: Fleet,
    },
    {
      img: driver,
      title: "Driver Management",
      description:
        "Manage driver schedules, track driving hours, and ensure compliance with regulations with our Infinity Fleet.",
      extraImg: Fleet,
    },
    {
      img: food,
      title: "Food Court Management",
      description:
        "Infinity ERP is fully prepared for integration with RFID cards and Touch-POS, enabling complete control over your food court operations.",
      extraImg: atyour,
    },
    {
      img: theater,
      title: "Theater Food Ordering",
      description:
        "This unique innovation by InfinityX developers allows theater audiences to order food directly from their seats, making it convenient to manage crowds efficiently.",
      extraImg: InfinityXLogo,
    },
    {
      img: retail,
      title: "Retail and Wholesale Traders",
      description:
        "InfinityX serves as an invaluable assistant for retail and wholesale traders, streamlining daily business processes such as inventory management, banking, and tracking debtor outstandings instantly.",
      extraImg: infinityERP,
    },
    {
      img: fast2,
      title: "FMCG",
      description:
        "Unlike other trades, FMCG companies must maintain their own records. Infinity ERP can manage this efficiently through integration, eliminating the need for double data entry.",
      extraImg: atyour,
    },
    {
      img: hotel,
      title: "Property Management System",
      description:
        "Infinity ERP features a dedicated PMS Module, meticulously designed for the hotel industry, ensuring efficient management of your hotels and restaurants.",
      extraImg: atyour,
    },
    {
      img: school,
      title: "School Management System",
      description:
        "Leading schools have successfully transitioned to Infinity ERP, replacing their previous School Management Software due to its exceptional features and user-friendly interface.",
      extraImg: infinityERP,
    },
  ];

  return (
    <div>
      <Navbar
        onChangeLayoutMode={onChangeLayoutMode}
        layoutModeType={layoutModeType}
      />
      <section id="services-details" className="services-details section">
        <div className="container">
          <div className="container section-title text-center">
            <br />
            <br />
            <h2>Services</h2>
            <p>
              Our Excellent Services
              <br /> Single product, multiple verticals.
            </p>
          </div>
          <div className="row justify-content-center">
            {services.map((service, index) => (
              <div key={index} className="col-md-4 text-center">
                <div className="services-item">
                  <div className="images-container">
                    <img
                      src={service.img}
                      className="img-fluid"
                      alt={service.title}
                    />
                  </div>
                  <div className="content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="extra-img-container">
                      {service.extraImg && (
                        <img
                          src={service.extraImg}
                          className="img-fluid extra-img"
                          alt={`Extra ${service.title}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
