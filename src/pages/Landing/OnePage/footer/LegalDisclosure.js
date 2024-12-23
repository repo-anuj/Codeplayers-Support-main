import React from "react";
import "./PrivacyPolicy.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const LegalDisclosure = () => {
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
          <h1>LegalDisclosure</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>
            The Codeplayers, External, & Legal Affairs group works on the
            cutting edge of business and regulatory issues around the world,
            playing a proactive and engaged role pioneering new legal and
            corporate affairs solutions that will advance business goals and
            also benefit consumers, industry partners, and the communities where
            we live and work.
          </p>
          <p>
            Please contact us at the below address in case of any legal concerns
            or queries.
          </p>

          <address>
            <strong>CODEPLAYERS Business System Private Limited</strong>
            <br />
            191/2, Nand Bhawan, Gandhi Ganj, Raigarh(CG) 496001, INDIA
            <br />
            Phone: +91 75828 75000, +91 75829 75000
            <br />
            Email:{" "}
            <a href="mailto:codeplayers@outlook.com">codeplayers@outlook.com</a>
          </address>
        </section>
        <footer>
          <h2>Contact Us</h2>
          <p>
            Questions? Email us at{" "}
            <a href="mailto:admin@codeplayers.in">admin@codeplayers.in</a>
          </p>
        </footer>
      </div>
      <Footer />
    </div>
  );
};

export default LegalDisclosure;
