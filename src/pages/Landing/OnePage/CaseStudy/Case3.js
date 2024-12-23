import React from "react";
import "./CaseStudyPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Case_3 = () => {
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

  return (
    <div>
      <Navbar
        onChangeLayoutMode={onChangeLayoutMode}
        layoutModeType={layoutModeType}
      />
      <br />
      <br />
      <br />
      <div className="simple-privacy-policy">
        <header>
          <h1>
            Transforming Steel Manufacturing Operations with CodePlayers ERP at
            Navdurga Group
          </h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Navdurga Group, a prominent steel manufacturer in India, faced
            numerous operational challenges, such as inefficient inventory
            management, complex supply chain issues, production scheduling
            problems, quality control inconsistencies, and fragmented data
            management. These issues led to overproduction, stockouts, high
            holding costs, and delays caused by manual tracking and poor
            supplier coordination. Frequent production disruptions and high
            defect rates further exacerbated inconsistent product quality, while
            a lack of real-time data visibility and disjointed information
            across departments compounded these challenges.
          </p>
          <p>
            To address these challenges, Navdurga Group implemented CodePlayers
            ERP software, incorporating modules for inventory management, supply
            chain management, production scheduling, quality control, and data
            integration. This comprehensive solution resulted in a 28% reduction
            in holding costs, improved inventory accuracy, and a 32% reduction
            in supply chain delays. Production scheduling accuracy improved by
            25%, significantly reducing delays, while quality control
            enhancements led to an 18% reduction in defects and consistent
            product quality. The integration of data provided real-time
            operational visibility and better coordination between departments.
          </p>
          <p>
            Overall, Navdurga Group achieved substantial improvements in
            efficiency, cost reduction, and product quality with the
            implementation of CodePlayers ERP software.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Case_3;
