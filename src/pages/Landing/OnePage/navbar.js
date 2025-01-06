import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link, useLocation } from "react-router-dom";
import LightDark from "../../../Components/Common/LightDark";
// Import Images
import logodark from "../../../assets/images/logo-light.png";
import logolight from "../../../assets/images/logo-light.png";

const Navbar = ({ onChangeLayoutMode, layoutModeType }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [activeItem, setActiveItem] = useState("hero");
  const location = useLocation();

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

  // Handle initial active state based on current route
  useEffect(() => {
    if (location.pathname === "/Landing" || location.pathname === "/") {
      // On landing page, check for hash or default to "hero"
      const hash = location.hash.replace("#", "") || "hero";
      setActiveItem(hash);
    } else {
      // On other pages, set active based on pathname
      const path = location.pathname.replace("/", "");
      setActiveItem(path);
    }
  }, [location]);

  const handleNavClick = (itemId) => {
    setActiveItem(itemId);
    setIsOpenMenu(false);
  };

  const isItemActive = (itemId) => {
    if (location.pathname === "/Landing" || location.pathname === "/") {
      return activeItem === itemId;
    }
    return location.pathname.includes(itemId);
  };

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navbar-landing fixed-top " + navClass
        }
        id="navbar"
      >
        <Container>
          <Link className="navbar-brand" to="/Landing">
            <img
              src={logodark}
              className="card-logo card-logo-dark"
              alt="logo dark"
              style={{ height: "53px" }}
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
            <Scrollspy
              offset={-18}
              items={[
                "hero",
                "services",
                "features",
                "reviews",
                "contact",
                "AboutUs",
                "career",
              ]}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0"
              style={{ color: "#9f7aea" }}
              id="navbar-example"
            >
              <li className="nav-item">
                <NavLink
                  className={`fs-14 ${isItemActive("hero") ? "active" : ""}`}
                  href="#hero"
                  onClick={() => handleNavClick("hero")}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`fs-14 ${
                    isItemActive("features") ? "active" : ""
                  }`}
                  href="#features"
                  onClick={() => handleNavClick("features")}
                >
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`fs-14 ${
                    isItemActive("services") ? "active" : ""
                  }`}
                  href="#services"
                  onClick={() => handleNavClick("services")}
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`fs-14 ${isItemActive("reviews") ? "active" : ""}`}
                  href="#reviews"
                  onClick={() => handleNavClick("reviews")}
                >
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`fs-14 ${isItemActive("contact") ? "active" : ""}`}
                  href="#contact"
                  onClick={() => handleNavClick("contact")}
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs">
                  <NavLink
                    className={`fs-14 ${
                      isItemActive("AboutUs") ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("AboutUs")}
                  >
                    About Us
                  </NavLink>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/CareerPage">
                  <NavLink
                    className={`fs-14 ${
                      isItemActive("career") ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("career")}
                  >
                    Career
                  </NavLink>
                </Link>
              </li>
            </Scrollspy>
            <LightDark
              layoutMode={layoutModeType}
              onChangeLayoutMode={onChangeLayoutMode}
            />
            <div className="">
              <Link to="/Login" className="btn btn-primary">
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
