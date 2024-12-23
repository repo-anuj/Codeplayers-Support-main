import React from "react";
import "./CaseStudyPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Case_4 = () => {
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
            Enhancing Jewelry Manufacturing Efficiency with CodePlayers ERP at
            Rambhagat Laxminarayan Jewelry
          </h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Rambhagat Laxminarayan Jewelry, a leading jewelry manufacturer and
            retailer in India, faced several challenges, including inefficient
            inventory management, manual order processing delays, and production
            inefficiencies. These issues were compounded by inconsistent quality
            control and fragmented data across departments.
          </p>
          <p>
            Implementing CodePlayers ERP software significantly streamlined
            operations, improving inventory accuracy by 30%, reducing order
            processing time by 25%, and cutting custom order turnaround time by
            20%. Quality control saw a 15% reduction in returns and rework,
            ensuring consistent product quality. Real-time data integration
            provided insights across sales, production, and inventory, enhancing
            overall operational efficiency and customer satisfaction.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Case_4;
