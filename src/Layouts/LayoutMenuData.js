import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const userType = localStorage.getItem("userType");
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  const userRole=localStorage.getItem("userRole");
  const updateIconSidebar = (e) => {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      iconItems.forEach((item) => {
        item.classList.remove("active");
        const id = item.getAttribute("subitems");
        if (document.getElementById(id)) {
          document.getElementById(id).classList.remove("show");
        }
      });
    }
  };

  const commonMenuItems = {
    support: {
      id: "Support",
      label: "Support",
      icon: "las la-headset",
      link: "/#",
      click: (e) => {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MultiLevel");
        updateIconSidebar(e);
      },
      stateVariables: isMultiLevel,
      subItems: [
        { id: "Support.Dashboard", label: "Dashboard", link: "/support-dashboard" },
        { id: "Support.Register", label: "Register", link: "/support-register" },
       
      ],
    },
    training: {
      id: "Training",
      label: "Training",
      icon: "las la-graduation-cap",
      link: "/#",
      click: (e) => {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MultiLevel");
        updateIconSidebar(e);
      },
      stateVariables: isMultiLevel,
      subItems: [
        { id: "Training.Dashboard", label: "Dashboard", link: "/training-dashboard" },
        { id: "Training.Register", label: "Register", link: "/training-register" },
      ],
    },
    user: {
      id: "User",
      label: "User",
      icon: "las la-user-circle",
      link: "/#",
      click: (e) => {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MultiLevel");
        updateIconSidebar(e);
      },
      stateVariables: isMultiLevel,
      subItems: [
        { id: "Users", label: "User List", link: "/users" },
        { id: "User.AllotTraining", label: "Allot Training", link: "/training-allotment" },
      ],
    },
    products: {
      id: "Products",
      label: "Products",
      icon: "las la-shopping-cart",
      link: "/#",
      click: (e) => {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MultiLevel");
        updateIconSidebar(e);
      },
      stateVariables: isMultiLevel,
      subItems: [
        { id: "Products.Buy", label: "Buy", link: "/Products-buy" },
        { id: "Products.History", label: "History", link: "/Products-history" },
      ],
    },
    license:{
      id: "License", label: "License", icon: "las la-award", link: "/license-history"
    },
    
  };

  let menuItems;
  
  if (userType === "Infinity-ERP") {
    
  } else if (userType === "Vend-X") {
    menuItems = [
      { id: "Quotation", label: "Quotation Register", icon: "ri-calculator-fill", link: "/Quotation-register" },
    ];
  } else if(userType==="Support-Portal"&&userRole=="Admin"){
    menuItems=[
      commonMenuItems.support,
      commonMenuItems.training,
      { id: "Users", label: "Users", icon: "ri-calculator-fill", link: "/users" },
    ]
  }else if(userType==="CPTeam"){
    menuItems=[
      commonMenuItems.support,
      commonMenuItems.training
    ]
  }
  else {
    menuItems = [commonMenuItems.support, commonMenuItems.training, commonMenuItems.user,commonMenuItems.products];
  }

  if (userType === "Infinity-ERP") {
    if (userRole === "Admin") {
      menuItems = [
        commonMenuItems.license,
        commonMenuItems.support,
        commonMenuItems.training,
        commonMenuItems.user,
        commonMenuItems.products,


      ];
    }
    else if (userRole === "Manager") {
      menuItems = [
        
        commonMenuItems.support,
        commonMenuItems.training,
        commonMenuItems.user,
        


      ];
    }
    else if (userRole === "User") {
      menuItems = [
        
        commonMenuItems.support,
        commonMenuItems.training,
        


      ];
    }
  } else if (userType === "Support-Portal") {
    if (userRole === "Admin") {
      menuItems = [
        
        commonMenuItems.support,
        commonMenuItems.training,
        commonMenuItems.user,
        


      ];
    } else if (userRole === "Manager") {
      menuItems = [
        
        commonMenuItems.support,
        commonMenuItems.training,
        commonMenuItems.user,
        


      ];
    }
    else if (userRole === "User") {
      menuItems = [
        
        commonMenuItems.support,
        commonMenuItems.training,
        


      ];
    }
  }
  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, iscurrentState]);

  return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
