import React from "react";
import "./BlogsPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Blog_2 = () => {
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
          <h1>How ERP Can Improve Your Business Efficiency</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Enterprise Resource Planning (ERP) systems are designed to integrate
            and streamline various business processes, from accounting and human
            resources to supply chain management and customer relationship
            management. By centralizing data and automating routine tasks, ERP
            systems can significantly improve business efficiency.
          </p>
          <p>
            One of the primary benefits of ERP is improved data visibility. With
            all business data stored in a single system, employees can access
            real-time information across departments. This transparency enables
            better decision-making and coordination, reducing the risk of errors
            and redundancies.
          </p>
          <p>
            ERP systems also enhance operational efficiency by automating
            repetitive tasks. For instance, automated workflows can streamline
            processes such as order fulfillment, invoicing, and payroll
            management. By reducing manual intervention, businesses can save
            time and reduce the likelihood of mistakes.
          </p>
          <p>
            Furthermore, ERP systems can help businesses manage their resources
            more effectively. With integrated planning and scheduling tools,
            companies can optimize their use of materials, labor, and equipment.
            This leads to reduced waste, lower costs, and improved productivity.
          </p>
          <p>
            In addition to operational benefits, ERP systems can enhance
            customer satisfaction. By providing a complete view of customer
            interactions and preferences, ERP systems enable businesses to
            deliver personalized and responsive service. This can lead to
            increased customer loyalty and repeat business.
          </p>
          <p>
            Overall, ERP systems offer numerous advantages that can improve
            business efficiency. From enhanced data visibility and automation to
            better resource management and customer satisfaction, ERP is a
            powerful tool for driving growth and success.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog_2;
