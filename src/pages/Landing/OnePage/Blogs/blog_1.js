import React from "react";
import "./BlogsPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Blog_1 = () => {
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
          <h1>The Future of ERP: Trends to Watch</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Enterprise Resource Planning (ERP) systems have undergone
            significant changes over the past few decades. Initially, ERP
            systems were primarily used by large organizations to manage their
            business processes. However, with advancements in technology, the
            scope and functionality of ERP systems have expanded considerably.
            Today, ERP systems are integral to the operations of businesses of
            all sizes.
          </p>
          <p>
            One of the key trends in the future of ERP is the increasing
            integration of Artificial Intelligence (AI) and Machine Learning
            (ML). These technologies enable ERP systems to provide more
            insightful data analysis and predictive analytics. For example,
            AI-powered ERP systems can identify patterns in sales data and
            predict future trends, helping businesses make more informed
            decisions.
          </p>
          <p>
            Another significant trend is the move towards cloud-based ERP
            systems. Cloud ERP offers numerous benefits, including lower upfront
            costs, greater scalability, and easier access to data from anywhere
            with an internet connection. As more businesses recognize these
            advantages, the adoption of cloud ERP is expected to increase
            significantly.
          </p>
          <p>
            Additionally, ERP systems are becoming more user-friendly. Modern
            ERP solutions feature intuitive interfaces and customizable
            dashboards, making it easier for employees to navigate and utilize
            the system effectively. This improved usability reduces the need for
            extensive training and increases employee productivity.
          </p>
          <p>
            In conclusion, the future of ERP looks promising with advancements
            in AI, the shift to cloud-based solutions, and enhanced user
            experiences. As businesses continue to embrace these trends, ERP
            systems will become even more vital in driving efficiency and
            innovation.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog_1;
