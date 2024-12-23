import React from "react";
import { useEffect } from "react";

import Navbar from "./navbar";
import Home from "./home";
import Services from "./services";
// import Features from "./features";
import Faqs from "./faq";
import Contact from "./contact";
// import Cta from "./cta";
import Footer from "./footer";
import IndustriesSection from "./IndustriesSection";
import WhatMakesUsDifferent from "./WhatMakesUsDifferent";
// import Achievement from "./Achievement";
import OurProduct from "./OurProduct";
import TestimonialSection from "./TestimonialSection";
import Features from "./NewFeatures";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import HeroSection from "./herosection/HeroSection";
import { changeLayoutMode } from "../../../slices/thunks";

const Index = () => {
  document.title = " Landing | CodePlayers - ERP Software Development Company";

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeType: layout.layoutModeType,
    })
  );
  const { layoutModeType } = useSelector(selectLayoutProperties);

  window.onscroll = function () {
    scrollFunction();
  };

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

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Navbar
          onChangeLayoutMode={onChangeLayoutMode}
          layoutModeType={layoutModeType}
        />
        <HeroSection />
        <WhatMakesUsDifferent />
        <IndustriesSection />
        <OurProduct />
        <Features />
        <TestimonialSection />
        <Faqs />
        <Contact />
        <Footer />
        <button
          onClick={() => toTop()}
          className="btn btn-danger btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Index;
