import React from "react";
import "./PrivacyPolicy.scss";
import Footer from "../footer";
import Navbar from "../NavbarPage";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../../../slices/thunks";
import { useEffect } from "react";

const TermsOfService = () => {
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
          <h1>Terms of Use for www.codeplayers.in, api.codeplayers.in</h1>
        </header>
        <section>
          <p>
            The use of any product, service or feature (the{" "}
            <strong>Materials</strong>) available through the internet websites
            accessible at www.codeplayers.in, api.codeplayers.in(collectively,
            the <strong>Website</strong>) by any user of the Website ({" "}
            <strong>You</strong> or <strong>Your</strong> hereafter) shall be
            governed by the following terms of use.
          </p>

          <ul>
            <li>
              This Website is provided by Codeplayers Business System Pvt.
              Ltd.(hereinafter referred to as Codeplayers ), a company
              incorporated under the Companies Act, 1956 of India, having its
              registered office at 191/2, Nand Bhawan, Gandhi Ganj, Raigarh(CG),
              India and shall be used for informational purposes only. By using
              the Website or downloading Materials from the Website, You hereby
              agree to abide by the terms and conditions set forth in this Terms
              of Use. In the event of You not agreeing to these terms and
              conditions, You are requested by Codeplayers not to use the
              Website or download Materials from the Website.
            </li>
            <li>
              This Website, including all Materials present (excluding any
              applicable third party materials), is the property of Codeplayers
              and is copyrighted and protected by worldwide copyright laws and
              treaty provisions. You hereby agree to comply with all copyright
              laws worldwide in Your use of this Website and to prevent any
              unauthorized copying of the Materials. Codeplayers does not grant
              any express or implied rights under any patents, trademarks,
              copyrights or trade secret information.
            </li>
            <li>
              Codeplayers has business relationships with thousands of
              customers, suppliers, governments, and others. For convenience and
              simplicity, words like joint venture, partnership, and partner are
              used to indicate business relationships involving common
              activities and interests, and those words may not indicate precise
              legal relationships.
            </li>
          </ul>

          <h2>Ownership and Copyright</h2>
          <p>
            This Website, including all Materials present (excluding any
            applicable third party materials), is the property of Codeplayers
            and is copyrighted and protected by worldwide copyright laws and
            treaty provisions. You hereby agree to comply with all copyright
            laws worldwide in Your use of this Website and to prevent any
            unauthorized copying of the Materials. Codeplayers does not grant
            any express or implied rights under any patents, trademarks,
            copyrights or trade secret information.
          </p>

          <h2>Business Relationships</h2>
          <p>
            Codeplayers has business relationships with thousands of customers,
            suppliers, governments, and others. For convenience and simplicity,
            words like joint venture, partnership, and partner are used to
            indicate business relationships involving common activities and
            interests, and those words may not indicate precise legal
            relationships.
          </p>

          <h2>Limited License</h2>
          <p>
            Subject to the terms and conditions set forth in these Terms of Use,
            Codeplayers grants You a non-exclusive, non-transferable, limited
            right to access, use and display this Website and the Materials
            thereon. You agree not to interrupt or attempt to interrupt the
            operation of the Website in any manner. Unless otherwise specified,
            the Website is for Your personal and non-commercial use. You shall
            not modify, copy, distribute, transmit, display, perform, reproduce,
            publish, license, create derivative works from, transfer, or sell
            any information, software, products or services obtained from this
            Website.
          </p>

          <h2>Blogs</h2>
          <p>
            This is to inform and clarify that individuals (including but not
            limited to employees of Codeplayers and referred to as “Individuals”
            hereafter) may contribute articles and opinions on this Website
            entirely at the sole discretion of Codeplayers, in the form of
            “blogs”, as such term is generally understood. You hereby
            acknowledge and agree that these blogs constitute the opinion of the
            Individuals in their personal capacity, and may not represent
            official positions of Codeplayers in any manner. Codeplayers retains
            all copyright to these blogs.
          </p>

          <p>
            You may be permitted to post comments and feedback to these blogs.
            By doing so, You expressly agree and acknowledge to abide by the
            following:
          </p>
          <ul>
            <li>
              You shall not defame, abuse, harass or threaten Codeplayers or any
              third party, or otherwise violate the legal rights of Codeplayers
              or any third party.
            </li>
            <li>
              You shall not contribute any content or take any action that may
              in any manner adversely affect the reputation of Codeplayers, or
              that is otherwise detrimental to Codeplayers.
            </li>
            <li>
              You shall not in any manner publish or post any inappropriate,
              defamatory, infringing, obscene, racist, terrorist, politically
              slanted, indecent or unlawful topic, name, material or
              information.
            </li>
            <li>
              You shall not use profane and objectionable language or
              abbreviations. You shall not use any character(s) as a substitute
              for objectionable language.
            </li>
            <li>
              You shall not in any manner reveal confidential or proprietary
              information of any third party. Specifically, You shall not post
              any material for which You do not have requisite and applicable
              right(s) under law.
            </li>
            <li>
              You shall not conduct any contests or publish or propagate any
              forwards.
            </li>
            <li>
              You shall not defame, abuse, harass, stalk, threaten or otherwise
              violate the legal rights (such as rights of privacy and publicity
              but not limited to the foregoing) of any other party including
              Codeplayers.
            </li>
            <li>
              You shall not publish, post, upload, distribute or disseminate any
              inappropriate, profane, defamatory, obscene, indecent or unlawful
              topic, name, material or information.
            </li>
            <li>
              You shall not upload or otherwise make available, files that
              contain images, photographs, software or other material protected
              by intellectual property laws, including, by way of example, and
              not as limitation, copyright or trademark laws (or by rights of
              privacy or publicity) unless You own or control the rights thereto
              or have received all necessary consent to do the same.
            </li>
            <li>
              You shall not upload files that contain viruses, trojan horses,
              worms, time bombs, cancelbots, corrupted files, or any other
              similar software or programs that may damage the operation of
              another's computer or property of another.
            </li>
            <li>
              You shall not advertise or offer to sell or buy any goods or
              services for any business purpose.
            </li>
            <li>
              You shall not download any file posted that You know, or
              reasonably should know, cannot be legally reproduced, displayed,
              performed, and/or distributed in such manner.
            </li>
            <li>
              You shall not falsify or delete any copyright management
              information, such as author attributions, legal or other proper
              notices or proprietary designations or labels of the origin or
              source of software or other material contained in a file that is
              uploaded.
            </li>
            <li>
              You shall not create a false identity for the purpose of
              misleading others.
            </li>
            <li>
              You shall not in any way deface or vandalize this Website, or
              prevent or restrict others from using this Website.
            </li>
            <li>
              You shall indemnify and hold harmless Codeplayers from any claims
              and loss incurred by Codeplayers as a result of Your violation of
              these Terms of Use.
            </li>
            <li>
              You acknowledge that Codeplayers may, at its sole discretion,
              monitor, remove or edit any content that You contribute.
              Codeplayers may also pursue remedies available to it under law for
              any violation of these terms and conditions.
            </li>
          </ul>

          <h2>Third Party Content</h2>
          <p>
            The Website makes information of third parties available, including
            articles, analyst reports, news reports, tools to facilitate
            calculation, company information and data about financial markets,
            including any regulatory authority and other financial markets and
            other data from external sources (the{" "}
            <strong>Third Party Content</strong>). You acknowledge and agree
            that the Third Party Content is not created or endorsed by
            Codeplayers. The provision of Third Party Content is for general
            informational purposes only and does not constitute a recommendation
            or solicitation to purchase or sell any securities or shares or to
            make any other type of investment or investment decision. In
            addition, the Third Party Content is not intended to provide tax,
            legal or investment advice. You acknowledge that the Third Party
            Content provided to You is obtained from sources believed to be
            reliable, but that no guarantees are made by Codeplayers or the
            providers of Third Party Content as to its accuracy, completeness,
            timeliness. You agree not to hold Codeplayers, any business offering
            products or services through the Website or any provider of Third
            Party Content liable for any investment decision or other
            transaction You may make based on Your reliance on or use of such
            data, or any liability that may arise due to delays or interruptions
            in the delivery of the Third Party Content for any reason.
          </p>
          <p>
            By using any Third Party Content, You may leave this Website and be
            directed to an external website, or to a website maintained by an
            entity other than Codeplayers. If You decide to visit any such site,
            You do so at Your own risk and it is Your responsibility to take all
            protective measures to guard against viruses or any other
            destructive elements. Codeplayers makes no warranty or
            representation regarding, and does not endorse, any linked Websites
            or the information appearing thereon or any of the products or
            services described thereon. Links do not imply that Codeplayers or
            this Website sponsors, endorses, is affiliated or associated with,
            or is legally authorized to use any trademark, trade name, logo or
            copyright symbol displayed in or accessible through the links, or
            that any linked site is authorized to use any trademark, trade name,
            logo or copyright symbol of Codeplayers or any of its affiliates or
            subsidiaries. You hereby expressly acknowledge and agree that the
            linked sites are not under the control of Codeplayers and
            Codeplayers is not responsible for the contents of any linked site
            or any link contained in a linked site, or any changes or updates to
            such sites. Codeplayers is not responsible for webcasting or any
            other form of transmission received from any linked site.
            Codeplayers is providing these links to You only as a convenience,
            and the inclusion of any link shall not be construed to imply
            endorsement by Codeplayers in any manner of the website.
          </p>

          <h2>No Warranties</h2>
          <p>
            This website, the information and materials on the site, and any
            software made available on the Website, are provided as is without
            any representation or warranty, express or implied, of any kind,
            including, but not limited to, warranties of merchantability,
            non-infringement, or fitness for any particular purpose. There is no
            warranty of any kind, express or implied, regarding third party
            content. In spite of Codeplayers’ best endeavors, there is no
            warranty on behalf of Codeplayers that this Website will be free of
            any computer viruses. Some jurisdictions do not allow for the
            exclusion of implied warranties, so the above exclusions may not
            apply to you.
          </p>

          <h2>Limitation of Damages</h2>
          <p>
            In no event shall Codeplayers or any of its subsidiaries or
            affiliates be liable to any entity for any direct, indirect,
            special, consequential or other damages (including, without
            limitation, any lost profits, business interruption, loss of
            information or programs or other data on your information handling
            system) that are related to the use of, or the inability to use, the
            content, materials, and functions of this Website or any linked
            Website, even if Codeplayers is expressly advised of the possibility
            of such damages.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The website may contain inaccuracies and typographical and clerical
            errors. Codeplayers expressly disclaims any obligation(s) to update
            this website or any of the materials on this website. Codeplayers
            does not warrant the accuracy or completeness of the materials or
            the reliability of any advice, opinion, statement or other
            information displayed or distributed through the Website. You
            acknowledge that any reliance on any such opinion, advice,
            statement, memorandum, or information shall be at your sole risk.
            Codeplayers reserves the right, in its sole discretion, to correct
            any errors or omissions in any portion of the Website. Codeplayers
            may make any other changes to the Website, the materials and the
            products, programs, services or prices (if any) described in the
            Website at any time without notice. This Website is for
            informational purposes only and should not be construed as technical
            advice of any manner.
          </p>

          <h2>Posting on the Codeplayers Website</h2>
          <p>
            Codeplayers does not claim ownership of the materials You provide to
            Codeplayers (including feedback and suggestions) or post, upload,
            input or submit to any section of the Website, (each a{" "}
            <strong>Submission</strong> and collectively{" "}
            <strong>Submissions</strong>). However, by posting, uploading,
            inputting, providing or submitting ( Posting ) Your Submission You
            are granting Codeplayers, its affiliated companies and necessary
            sub-licensees permission to use Your Submission in connection with
            the operation of their Internet businesses (including, without
            limitation, all services offered by Codeplayers), including, without
            limitation, the license rights to copy, distribute, transmit,
            publicly display, publicly perform, reproduce, edit, translate and
            reformat Your Submission; to publish Your name in connection with
            Your Submission; and the right to sublicense such rights to any
            other party.
          </p>
          <p>
            You hereby acknowledge and agree that no compensation shall be paid
            or no future commercial consideration has accrued with respect to
            the use of Your Submission by Codeplayers, as provided herein.
            Codeplayers shall be under no obligation to post or use any
            Submission You may provide and Codeplayers shall remove any
            Submission at any time at its own sole discretion.
          </p>
          <p>
            By Posting a Submission You hereby warrant and represent that You
            own or otherwise control all of the rights required under worldwide
            law for Your Submission as described in these Terms of Use
            including, without limitation, all the rights necessary for You to
            provide, post, upload, input or submit the Submissions.
          </p>

          <h2>Lawful and/or Prohibited Use of the Website</h2>
          <p>
            As a condition of Your use of the Website, You shall not use the
            Website for any purpose(s) that is unlawful or prohibited by the
            Terms of Use. You shall not use the Website in any manner that could
            damage, disable, overburden, or impair any Codeplayers server, or
            the network(s) connected to any Codeplayers server, or interfere
            with any other party's use and enjoyment of any services associated
            with the Website. You shall not attempt to gain unauthorized access
            to any section of the Website, other accounts, computer systems or
            networks connected to any Codeplayers server or to any of the
            services associated with the Website, through hacking, password
            mining or any other means. You shall not obtain or attempt to obtain
            any Materials or information through any means not intentionally
            made available through the Website.
          </p>

          <h2>Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless Codeplayers, its
            subsidiaries and affiliates from any claim, cost, expense, judgment
            or other loss relating to Your use of this Website in any manner,
            including without limitation of the foregoing, any action You take
            which is in violation of the terms and conditions of these Terms of
            Use and against any applicable law.
          </p>

          <h2>Changes</h2>
          <p>
            Codeplayers reserves the rights, at its sole discretion, to change,
            modify, add or remove any portion of these Terms of Use in whole or
            in part, at any time. Changes in these Terms of Use will be
            effective when notice of such change is posted. Your continued use
            of the Website after any changes to these Terms of Use are posted
            will be considered acceptance of those changes. Codeplayers may
            terminate, change, suspend or discontinue any aspect of the Website,
            including the availability of any feature(s) of the Website, at any
            time. Codeplayers may also impose limits on certain features and
            services or restrict Your access to certain sections or all of the
            Website without notice or liability. You hereby acknowledge and
            agree that Codeplayers may terminate the authorization, rights and
            license given above at any point of time at its own sole discretion
            and upon such termination; You shall immediately destroy all
            Materials.
          </p>

          <h2>International Users and Choice of Law</h2>
          <p>
            This Site is controlled, operated and administered by Codeplayers
            from its offices within India. Codeplayers makes no representation
            that Materials on this Website are appropriate or available for use
            at any other location(s) outside India. Any access to this Website
            from territories where their contents are illegal is prohibited. You
            may not use the Website or export the Materials in violation of any
            applicable export laws and regulations. If You access this Website
            from a location outside India, You are responsible for compliance
            with all local laws.
          </p>
          <p>
            These Terms of Use shall be governed by the laws of India, without
            giving effect to its conflict of laws provisions. You agree that the
            appropriate court(s) in Bangalore, India, will have the exclusive
            jurisdiction to resolve all disputes arising under these Terms of
            Use and You hereby consent to personal jurisdiction in such forum.
          </p>
          <p>
            These Terms of Use constitutes the entire agreement between
            Codeplayers and You with respect to Your use of the Website. Any
            claim You may have with respect to Your use of the Website must be
            commenced within one (1) year of the cause of action. If any
            provision(s) of this Terms of Use is held by a court of competent
            jurisdiction to be contrary to law then such provision(s) shall be
            severed from this Terms of Use and the other remaining provisions of
            this Terms of Use shall remain in full force and effect.
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

export default TermsOfService;
