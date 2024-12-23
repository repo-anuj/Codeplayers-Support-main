import React from "react";
import "./CaseStudyPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Case_1 = () => {
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
          <h1>Streamlining University Administration with CodePlayers ERP</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Epsilon University faced challenges with inefficient administrative
            processes, difficulty in managing student records, and a lack of
            integration between departments. By implementing the CodePlayers ERP
            system, the university successfully streamlined administrative tasks
            and enhanced student record management. This comprehensive ERP
            solution integrated various departments, facilitating seamless
            information flow and improving overall efficiency.
          </p>
          <p>
            As a result, Epsilon University achieved a 15% reduction in
            administrative costs, improved accuracy in student records
            management, and enhanced inter-departmental collaboration.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Case_1;
