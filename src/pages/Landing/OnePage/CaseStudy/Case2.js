import React from "react";
import "./CaseStudyPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Case_2 = () => {
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
            Enhancing Operational Efficiency at Jagadamba Trailers with
            CodePlayers ERP
          </h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Jagadamba Trailers, a leading manufacturer of trailers and transport
            solutions in India, faced several operational challenges, including
            inefficient inventory management, complex order processing,
            production scheduling problems, inconsistent product quality, and
            fragmented data management. By implementing CodePlayers ERP
            software, the company effectively addressed these issues.
          </p>
          <p>
            The ERP solution streamlined inventory management, resulting in a
            25% reduction in holding costs and improved stock accuracy. Order
            processing became more efficient, with a 30% reduction in processing
            time and fewer errors. Production scheduling saw a 20% improvement
            in accuracy, minimizing delays. Quality control was enhanced,
            leading to a 15% reduction in defects and consistent product
            quality. Additionally, the integration of data provided real-time
            visibility into operations and better departmental coordination.
          </p>
          <p>
            Overall, Jagadamba Trailers achieved significant operational
            efficiency, cost reduction, and improved product quality with
            CodePlayers ERP software.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Case_2;
