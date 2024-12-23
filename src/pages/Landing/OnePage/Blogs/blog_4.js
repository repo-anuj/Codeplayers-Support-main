import React from "react";
import "./BlogsPage.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const Blog_4 = () => {
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
          <h1>The Benefits of Cloud-Based ERP Systems</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            Cloud-based Enterprise Resource Planning (ERP) systems are becoming
            increasingly popular among businesses of all sizes. Unlike
            traditional on-premise ERP systems, cloud-based ERP solutions are
            hosted on remote servers and accessed via the internet. This model
            offers numerous benefits that can drive efficiency and growth.
          </p>
          <p>
            One of the primary advantages of cloud-based ERP is lower upfront
            costs. With cloud ERP, there is no need to invest in expensive
            hardware or infrastructure. Instead, businesses pay a subscription
            fee, which includes maintenance, updates, and support. This makes
            cloud ERP a more affordable option, especially for small and
            medium-sized enterprises.
          </p>
          <p>
            Cloud ERP also offers greater scalability. As your business grows,
            you can easily add new users and modules without the need for
            significant investments. This flexibility allows you to scale your
            ERP system according to your evolving needs.
          </p>
          <p>
            Another key benefit of cloud-based ERP is accessibility. With cloud
            ERP, you can access your business data from anywhere with an
            internet connection. This is particularly beneficial for businesses
            with remote teams or multiple locations. Employees can collaborate
            more effectively and make informed decisions in real-time.
          </p>
          <p>
            Security is another area where cloud-based ERP systems excel.
            Reputable cloud ERP providers implement robust security measures,
            including data encryption, multi-factor authentication, and regular
            security audits. This ensures that your business data is protected
            from unauthorized access and cyber threats.
          </p>
          <p>
            In addition to these benefits, cloud ERP systems offer automatic
            updates. The ERP provider handles all updates and maintenance,
            ensuring that you always have access to the latest features and
            improvements. This reduces the burden on your IT team and minimizes
            disruptions to your business operations.
          </p>
          <p>
            In conclusion, cloud-based ERP systems offer numerous advantages,
            including lower upfront costs, greater scalability, improved
            accessibility, enhanced security, and automatic updates. By adopting
            a cloud ERP solution, businesses can drive efficiency and stay
            competitive in a rapidly changing market.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog_4;
