import React from "react";
import "./PrivacyPolicy.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const EULA = () => {
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
          <h1>End User License Agreement (EULA)</h1>
          <div className="underline"></div>
        </header>
        <section>
          <p>CODEPLAYERS Business System Private Limited (LICENSOR) operates</p>
          <ul>
            <li>
              <a
                href="https://codeplayers.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://codeplayers.in
              </a>{" "}
              website
            </li>
            <li>
              <a
                href="https://api.codeplayers.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://api.codeplayers.in
              </a>{" "}
              website
            </li>
            <li>Infinity ERP</li>
            <li>Infinity X</li>
            <li>At Your Service</li>
          </ul>
          <p>
            hereinafter referred to as SOFTWARE - is offered to the
            purchaser/user hereinafter referred to as CUSTOMER on the following
            terms and conditions, which the Customer will be deemed to have
            accepted in full upon opening/using and installing the SOFTWARE.
          </p>
          <p>
            By downloading and using the CODEPLAYERS application as mentioned
            above you expressly give us consent in accordance with this EULA.
          </p>
          <p>
            Note: Our End User License Agreement may change at any time without
            prior notification. To make sure that you are aware of any changes,
            kindly review the EULA periodically. This EULA shall apply uniformly
            to CODEPLAYERS applications as mentioned above.
          </p>
          <h2>General</h2>
          <ul>
            <li>
              The LICENSOR is the owner of copyright and all other intellectual
              property rights in the SOFTWARE.
            </li>
            <li>
              The LICENSOR grants to the CUSTOMER, a non-exclusive license to
              use the SOFTWARE, upon the terms and conditions contained
              hereinafter.
            </li>
            <li>
              The CUSTOMER, by opening and installing this SOFTWARE, is deemed
              to have read, understood and agreed to be bound by the terms of
              this agreement. It is also agreed that this agreement is the
              complete and exclusive statement of agreement between the CUSTOMER
              and the LICENSOR.
            </li>
            <li>
              The license to use the SOFTWARE becomes valid only after full
              payment towards the same has been realised by the supplier of the
              SOFTWARE.
            </li>
            <li>
              The CUSTOMER will not decompile, disassemble or otherwise modify
              the SOFTWARE, except as provided for by this license.
            </li>
            <li>
              The CUSTOMER is solely responsible for determining the suitability
              of the SOFTWARE for the purpose it is intended to be used, before
              the purchase of the SOFTWARE. Once the CUSTOMER purchases the
              SOFTWARE, the LICENSOR will not accept return of SOFTWARE under
              any circumstances, whatsoever, and the payment once made will be
              non-refundable.
            </li>
            <li>
              The LICENSOR does not extend and expressly disclaims any warranty,
              whatsoever, as to the suitability, applicability, fitness,
              merchantability or otherwise of the SOFTWARE and related Items.
            </li>
            <li>
              The SOFTWARE is offered in various secondary editions based on
              features. Each edition is available in one or more different
              variants – e.g. Single-user, Multi-user. In case of Single-user,
              the CUSTOMER can install the SOFTWARE on a single Computer/Device
              only. In case of Multi-user, the CUSTOMER can install the SOFTWARE
              on a single Local Area Network (LAN).
            </li>
            <li>
              The INFINITY ERP comes with a Software Security Lock, which needs
              to be installed on the Server/Standalone Computer over LAN, where
              the SOFTWARE is to be used. The SOFTWARE will work only when a
              valid Software Security Lock is found installed at the
              Server/Standalone Computer.
            </li>
            <li>
              The CUSTOMER will take all reasonable precautions and measures to
              protect the SOFTWARE and related Items from unauthorized use,
              access, copying, modifications, reproduction, distribution or
              publication.
            </li>
            <li>
              Under no circumstances, the LICENSOR will replenish the License
              Information if the same is lost / misplaced / destroyed, either
              intentionally or accidentally, by the CUSTOMER. In such a case, a
              new copy of the SOFTWARE needs to be purchased by the CUSTOMER at
              full price, as prevailing in the market at that time.
            </li>
            <li>
              The price of the SOFTWARE is the license fee for use of the
              SOFTWARE only. All services like Installation, Training, Support,
              Document Designing etc. are chargeable extra.
            </li>
            <li>
              Updates, enhancements, bug-fixing, additions and improved versions
              of the SOFTWARE, along with a host of Value-Added Services (VAS),
              will be available to the CUSTOMER only if INFINITY ERP License
              Subscription (AMC) is active. One-Year AMC will be provided to the
              CUSTOMER on purchase of New License. The same can be renewed /
              extended for one more year upon payment of additional fee / price,
              as per the policy of the LICENSOR, as may be prevalent from time
              to time.
            </li>
            <li>
              The LICENSOR does not guarantee the compatibility of the SOFTWARE
              and / or Software License Service with future Operating Systems /
              Technologies.
            </li>
            <li>
              The LICENSOR will not take any responsibility for any kind of
              corruption of data at the CUSTOMER site due to media failure /
              power failure / hardware problem / virus infection or any other
              reason. At most, the LICENSOR can try to recover the data either
              fully or partially and the same will be chargeable.
            </li>
            <li>
              It is expressly agreed by the CUSTOMER that neither the
              manufacturer nor the supplier of the SOFTWARE will be liable for
              any loss or damage, whether direct, indirect, special,
              consequential and / or incidental, arising from the use or
              application of the SOFTWARE and related items.
            </li>
            <li>
              The Statutory Reports provided in the SOFTWARE are intended to
              provide the information / data to the CUSTOMER, which is required
              for fulfilling of various statutory obligations like depositing of
              tax, filing of tax returns etc. The LICENSOR does not guarantee,
              promise or claim accuracy, completeness or adequacy of the
              information provided and makes no claim that the Statutory Reports
              provided in the SOFTWARE will be accepted by the tax authorities
              as it is. The Licensor will not be responsible for any error /
              omission or delay in fulfilling of statutory obligations by the
              CUSTOMER. In case there is any change in statutory requirement,
              the LICENSOR will try to incorporate the same in the forthcoming
              releases of the SOFTWARE, but will be under no obligation to do
              so.
            </li>
            <li>
              The parties hereby agree that the courts at Raigarh (Chhattisgarh)
              alone will have the jurisdiction to entertain any proceedings in
              respect of anything arising under this agreement.
            </li>
          </ul>
          <h2>Limitations</h2>
          <p>
            Except as otherwise expressly provided under this License Agreement,
            CUSTOMER shall have no right, and CUSTOMER specifically agree not
            to:
          </p>
          <ul>
            <li>Utilize the SOFTWARE beyond the applicable Term;</li>
            <li>
              Transfer, assign or sublicense CUSTOMER’s license rights to any
              other person, and any such attempted transfer, assignment or
              sublicense shall be void;
            </li>
            <li>
              Provide, divulge, disclose, or make available to, or permit the
              use of the SOFTWARE by any third party;
            </li>
            <li>
              Sell, resell, license, sublicense, distribute, rent or lease the
              SOFTWARE or include the Software in a service bureau or
              outsourcing offering;
            </li>
            <li>
              Make error corrections to or otherwise modify or adapt the
              SOFTWARE or create derivative works based upon the SOFTWARE, or to
              permit third parties to do the same;
            </li>
            <li>
              Decompile, decrypt, reverse engineer, disassemble or otherwise
              reduce the SOFTWARE to human-readable form, or to permit third
              parties to do the same;
            </li>
            <li>
              Circumvent or disable any features or technological protection
              measures in the SOFTWARE;
            </li>
          </ul>
          <h2>Limited Warranty & Limitation of Liability</h2>
          <p>
            The SOFTWARE is provided "as is" without warranty of any kind. All
            express, implied or statutory conditions, representations, and
            warranties including, without limitation, any implied warranty or
            condition of merchantability, fitness for a particular purpose,
            non-infringement, satisfactory quality or arising from a course of
            dealing, law, usage, or trade practice, are hereby excluded to the
            maximum extent allowed by applicable law. Neither SOFTWARE nor its
            LICENSOR shall be liable for CUSTOMER’s action, or failure to act,
            in reliance on any information furnished as part of the software.
            CUSTOMER is solely responsible for maintaining the security of
            CUSTOMER’s network and computer systems. Neither SOFTWARE nor its
            LICENSOR represent, warrant, or guarantee that (a) security threats,
            malicious code and/or vulnerabilities will be identified, or (b) the
            content will render CUSTOMER’s network and systems safe from
            malicious code, vulnerabilities, intrusions, or other security
            breaches, (c) every vulnerability on every tested system or
            application will be discovered, or (d) there will be no false
            positives. In no event will SOFTWARE or its LICENSOR be liable to
            CUSTOMER or CUSTOMER’s employees, or any third party, for any lost
            revenue, profit, or data, business interruption, or for special,
            indirect, consequential, incidental, or punitive damages, however
            caused and regardless of the theory of liability arising out of the
            use of or inability to use the SOFTWARE even if SOFTWARE have been
            advised of the possibility of such damages. In no event will
            SOFTWARE or its LICENSOR be liable to CUSTOMER, whether in contract,
            warranty or tort (including negligence or strict liability), or
            otherwise, exceed the fee paid by CUSTOMER.
          </p>
          <h2>Software Support Lifecycle Term</h2>
          <p>
            The support lifecycle Term for SOFTWARE states the length of time
            support will be available. This technical support period begins when
            the product is available for purchase, and ends when the product is
            no longer supported (End of Service). Each product, at the
            version/release level, has an established support period. Without
            adequate support, software potentially becomes less usable over
            time. Buyers typically are instructed not to use software versions
            without support, likely because a company does not intend to offer
            bug fixes or upgrades, to make the product more usable in aspect of
            statutory compliance or OS Environmental Upgrade. Based on market
            needs and client deployment patterns CODEPLAYERS is introducing the
            Continuous Delivery support system to enable clients to receive and
            install new functions much more rapidly than they have in the past.
            This system enables CODEPLAYERS to continually add/improve product
            functions and enables clients to accept and implement these updates
            faster. As it unveils new versions, CODEPLAYERS periodically
            announces the end of support for obsolete versions. An end-of-life
            policy or end-of-support policy helps facilitate the migration of
            services and platforms so that businesses and individual users are
            not caught in the middle.
          </p>
          <p>
            The support lifecycle Term for SOFTWARE also states any unique terms
            for product defect fixes and update patches or setup files
            availability.
          </p>
          <p>
            The support lifecycle Term for SOFTWARE will be maximum period of 5
            Years. It may vary upon future Operating System / Technology upgrade
            and Company Policy.
          </p>
          <p>
            CUSTOMER has to upgrade their IT Environment according to the
            available SOFTWARE version requirements time to time.
          </p>
          <h2>Term and Termination</h2>
          <p>
            This License Agreement is effective until terminated or the end of
            the Term. CUSTOMER may terminate this License Agreement at any time
            by destroying all copies of SOFTWARE, related documentation,
            analysis data and report and purging same from memory devices
            (required at the end of a Term). CUSTOMER’s rights under this
            License Agreement will terminate immediately without notice from
            LICENSOR, if CUSTOMER fail to comply with any provision of this
            Agreement. Upon any termination, CUSTOMER must destroy all copies of
            Software and related documentation and purge same from memory
            devices. All provisions of this License Agreement relating to
            disclaimers of warranties, limitation of liabilities, remedies,
            damages protection of information and shall survive termination.
          </p>
          <p>
            This License Agreement shall be governed by and construed in
            accordance with the laws of the INDIA.
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

export default EULA;
