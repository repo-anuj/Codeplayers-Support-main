import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useScrollNavigation } from "../../../utils/NavigationUtils";
import LightDark from "../../../Components/Common/LightDark";
// Import Images
import logodark from "../../../assets/images/logo-light.png";
import logolight from "../../../assets/images/logo-light.png";

const Navbar = ({ onChangeLayoutMode, layoutModeType }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [navClass, setNavClass] = useState("");
  const { navigateAndScroll, activeSection } = useScrollNavigation();

  const toggle = () => setIsOpenMenu(!isOpenMenu);

  useEffect(() => {
    const handleScroll = () => {
      const scrollup = document.documentElement.scrollTop;
      setNavClass(scrollup > 50 ? "is-sticky" : "");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e, path, hash) => {
    e.preventDefault();
    navigateAndScroll(path, hash);
    setIsOpenMenu(false);
  };

  const isActiveLink = (path) => {
    if (location.pathname === "/Landing" || location.pathname === "/") {
      return location.hash === `#${path}`;
    }
    return location.pathname === `/${path}`;
  };

  const activeStyle = {
    color: "#9f7aea",
    fontWeight: "500",
  };

  const getNavLinkClass = (section) => {
    return `nav-link fs-14 ${activeSection === section ? "active" : ""}`;
  };

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg navbar-landing2 fixed-top ${navClass}`}
        id="navbar"
      >
        <Container>
          <Link className="navbar-brand" to="/Landing">
            <img
              src={logodark}
              className="card-logo card-logo-dark"
              alt="logo dark"
              height="60"
            />
            <img
              src={logolight}
              className="card-logo card-logo-light"
              alt="logo light"
              height="60"
            />
          </Link>

          <NavbarToggler
            className="navbar-toggler py-0 fs-20 text-body"
            onClick={toggle}
            type="button"
            aria-expanded={isOpenMenu}
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse
            isOpen={isOpenMenu}
            className="navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a
                  className={getNavLinkClass("hero")}
                  href="/Landing#hero"
                  onClick={(e) => handleNavClick(e, "/Landing", "#hero")}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={getNavLinkClass("services")}
                  href="/Landing#services"
                  onClick={(e) => handleNavClick(e, "/Landing", "#services")}
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={getNavLinkClass("features")}
                  href="/Landing#features"
                  onClick={(e) => handleNavClick(e, "/Landing", "#features")}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={getNavLinkClass("reviews")}
                  href="/Landing#reviews"
                  onClick={(e) => handleNavClick(e, "/Landing", "#reviews")}
                >
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={getNavLinkClass("contact")}
                  href="/Landing#contact"
                  onClick={(e) => handleNavClick(e, "/Landing", "#contact")}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs">
                  <NavLink
                    className="fs-14"
                    style={location.pathname === "/AboutUs" ? activeStyle : {}}
                    onClick={() => setIsOpenMenu(false)}
                  >
                    About Us
                  </NavLink>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/CareerPage">
                  <NavLink
                    className="fs-14"
                    style={
                      location.pathname === "/CareerPage" ? activeStyle : {}
                    }
                    onClick={() => setIsOpenMenu(false)}
                  >
                    Career
                  </NavLink>
                </Link>
              </li>
            </ul>
            <LightDark
              layoutMode={layoutModeType}
              onChangeLayoutMode={onChangeLayoutMode}
            />
            <div className="">
              <Link to="/ERPLogin" className="btn btn-primary">
                Sign in
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
