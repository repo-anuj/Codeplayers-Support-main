import React from "react";
import "./PrivacyPolicy.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p>Last Updated: November 2024</p>
        </header>
        <section>
          <h3>CODEPLAYERS Business System Private Limited operates</h3>
          <ul>
            <li>
              <a href="https://codeplayers.com">https://codeplayers.in</a>
              Website
            </li>
            <li>
              <a href="https://api.codeplayers.in">
                https://api.codeplayers.in
              </a>
              Website
            </li>
            <li>Infinity ERP</li>
            <li>Infinity X</li>
            <li>At Your Service</li>
          </ul>
          <p>
            which provides the software service (Service) of GST returns
            preparation and providing relevant information and assistance.
          </p>
          <p>
            This page is used to inform website visitors and software users
            regarding our policies with the collection, use, and disclosure of
            Personal Information if anyone decided to use our Service.
          </p>
          <p>
            {" "}
            By downloading and using the CODEPLAYERS application as mentioned
            above you expressly give us consent to use & disclose your personal
            information in accordance with this Privacy Policy. The Personal
            Information that we collect are used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy.
          </p>
          <p>
            {" "}
            The terms used in this Privacy Policy have the same meanings as in
            our Terms of Use, which is accessible at
            <a>https://codeplayers.in</a>, unless otherwise defined in this
            Privacy Policy.
          </p>
        </section>

        <section>
          <h3>Information Collection and Use</h3>
          <p>
            We collect personal information such as name, phone number, email
            address, and postal address to contact and identify you. When you
            register, we require user credentials and may use your contact
            information to send communications like OTP, order confirmations,
            and subscription updates.
          </p>
          <p>
            We may ask for the customer information before providing the
            software support.
          </p>
          <p>
            We may employ third-party companies and individuals to facilitate
            our service or assist us in improving it. We want to inform our
            users that these third parties have access to your Personal
            Information. The reason is to perform the tasks assigned to them on
            our behalf. However, they are obligated not to disclose or use the
            information for any other purpose.
          </p>
          <p>
            When you register, we require that you create user credentials
            consisting of user id and password. We also collect your email
            address and mobile number so that we may send communications such as
            verification OTP, order confirmation and status of your orders and
            subscriptions
          </p>
        </section>

        <section>
          <h3>Customer Data</h3>
          <p>
            Data files or databases created during software usage are stored at
            the customer's chosen location. CODEPLAYERS does not transmit this
            data to external servers, and support personnel cannot access
            customer data without explicit sharing.
          </p>
        </section>

        <section>
          <h3>Security</h3>
          <p>
            We take precautions to protect your personal information from being
            lost, misused, or inappropriately accessed. However, no internet
            transmission method is 100% secure.
          </p>
        </section>

        <section>
          <h3>Payments</h3>
          <p>
            We use Razorpay for payment processing. Card data is not stored on
            servers and is encrypted through PCI-DSS standards. Transaction data
            is only used to complete your purchase.
          </p>
        </section>

        <section>
          <h3>Consent</h3>
          <p>
            By using our services, you consent to our information collection and
            use policies. We may send updates to your mobile and email, even if
            registered under Do Not Disturb.
          </p>
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

export default PrivacyPolicy;
