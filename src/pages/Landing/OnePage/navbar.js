import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";
import LightDark from "../../../Components/Common/LightDark";
// Import Images
import logodark from "../../../assets/images/logo-light.png";
import logolight from "../../../assets/images/logo-light.png";

const Navbar = ({ onChangeLayoutMode, layoutModeType }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [navClass, setNavClass] = useState("");

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

  const [activeLink, setActiveLink] = useState();

  useEffect(() => {
    const activation = (event) => {
      const target = event.target;
      if (target) {
        target.classList.add("active");
        setActiveLink(target);
        if (activeLink && activeLink !== target) {
          activeLink.classList.remove("active");
        }
        // Close the dropdown menu after clicking a link
        setIsOpenMenu(false);
      }
    };

    const defaultLink = document.querySelector(".navbar li a.active");
    if (defaultLink) {
      defaultLink.classList.add("active");
      setActiveLink(defaultLink);
    }
    const links = document.querySelectorAll(".navbar a");
    links.forEach((link) => {
      link.addEventListener("click", activation);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", activation);
      });
    };
  }, [activeLink]);

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
              height="20"
            />
            <img
              src={logolight}
              className="card-logo card-logo-light"
              alt="logo light"
              height="20"
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
                "About Us",
                "career",
              ]}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0"
              style={{ color: "#9f7aea" }}
              id="navbar-example"
            >
              <li className="nav-item">
                <NavLink className="fs-14 active" href="#hero">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-14" href="#features">
                  Features
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-14" href="#services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-14" href="#reviews">
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-14" href="#contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs">
                  <NavLink className="fs-14">About Us</NavLink>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/CareerPage">
                  <NavLink className="fs-14">Career</NavLink>
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
