import React from "react";
import "./CaseStudyPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Case_5 = () => {
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
            Optimizing Steel Manufacturing Operations with CodePlayers' Infinity
            ERP at Hector Pipes
          </h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Hector Pipes, a leading manufacturer in the steel sector, faced
            significant operational challenges, including inefficient inventory
            management, production scheduling, and data accuracy issues.
            Overstocks and stockouts disrupted their production schedules, while
            manual scheduling processes caused frequent delays and increased
            lead times. Additionally, reliance on disparate data sources and
            manual data entry resulted in inaccuracies, negatively impacting
            decision-making and overall efficiency.
          </p>
          <p>
            To address these challenges, Hector Pipes implemented CodePlayers'
            Infinity ERP software, which provided comprehensive modules for
            inventory management, production planning, and real-time data
            integration. This strategic move resulted in substantial
            improvements across their operations. The enhanced inventory
            management capabilities of Infinity ERP helped Hector Pipes reduce
            inventory carrying costs by 30%, effectively addressing overstocking
            and stockout issues. Automated production scheduling improved
            operational efficiency, cutting lead times by 20% and ensuring
            timely product deliveries. Additionally, real-time data integration
            streamlined data processes, reducing manual entry errors and
            increasing data accuracy by 50%, significantly enhancing their
            decision-making capabilities.
          </p>
          <p>
            In conclusion, the implementation of CodePlayers' Infinity ERP
            software enabled Hector Pipes to overcome their operational
            challenges, resulting in streamlined processes, reduced costs, and
            improved productivity. The ERP solution provided Hector Pipes with
            the necessary tools to maintain accurate inventory levels, optimize
            production scheduling, and make informed business decisions based on
            precise and reliable data. This transformation not only improved
            their operational efficiency but also positioned Hector Pipes for
            sustained growth and success in the competitive steel industry.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Case_5;
