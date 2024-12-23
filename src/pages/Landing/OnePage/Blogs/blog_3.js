import React from "react";
import "./BlogsPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Blog_3 = () => {
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
          <h1>Choosing the Right ERP System for Your Business</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Selecting the right Enterprise Resource Planning (ERP) system is a
            critical decision for any business. The right ERP system can
            streamline operations, improve data visibility, and drive growth.
            However, with so many options available, choosing the best ERP
            solution for your organization can be challenging.
          </p>
          <p>
            The first step in selecting an ERP system is to identify your
            business needs and goals. Consider the specific challenges you are
            facing and the processes you want to improve. For example, if
            inventory management is a pain point, look for an ERP system with
            robust supply chain management capabilities.
          </p>
          <p>
            Next, evaluate the scalability of the ERP system. Your business
            needs may change over time, so it is essential to choose an ERP
            solution that can grow with your organization. Look for a system
            that offers flexible modules and can easily accommodate new users
            and functionalities.
          </p>
          <p>
            Usability is another crucial factor to consider. An ERP system
            should be user-friendly and intuitive, with a clean interface and
            easy navigation. This will reduce the learning curve for your
            employees and increase adoption rates.
          </p>
          <p>
            Additionally, consider the level of support and training provided by
            the ERP vendor. Implementing an ERP system can be complex, and
            having access to reliable support can make a significant difference.
            Look for a vendor that offers comprehensive training resources and
            responsive customer service.
          </p>
          <p>
            Finally, consider the total cost of ownership. In addition to the
            initial purchase price, factor in costs such as implementation,
            training, and ongoing maintenance. A clear understanding of the
            total cost will help you make a more informed decision.
          </p>
          <p>
            In conclusion, choosing the right ERP system requires careful
            consideration of your business needs, scalability, usability,
            support, and cost. By taking the time to evaluate these factors, you
            can select an ERP solution that will drive efficiency and growth for
            your organization.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog_3;
