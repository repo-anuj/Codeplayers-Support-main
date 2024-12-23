import React from "react";
import { Navigate } from "react-router-dom";

//ERP Login
import Login from "../pages/ERPLogin/Authentication/Login";
import Logout from "../pages/ERPLogin/Authentication/Logout";
import Register from "../pages/Register/Authentication";
// Dashboards
import Registration from "../pages/ERPLogin/jhaki/Registration";
import UserOnboarding from "../pages/AddressVerification/UserOnboarding";
import VendorDashboard from "./../pages/Dashboards/VendorDashboard";
import InfinityDashboard from "../pages/Dashboards/InfinityDashboard";
import TrainingDashboard from "../pages/Dashboards/TrainingDashboard";
import QuotationRegister from "../pages/QuotationRegister/QuotationRegister";
import OrderDetails from "../pages/QuotationRegister/OrderDetails";
import RecentOrders from "../pages/QuotationRegister/RecentOrders";
import Users from "../pages/Infinity/User/Index";
import OtpVerification from "../pages/OTPVerification/OtpVerification";
import ForgetPassword from "../pages/ERPLogin/Authentication/ForgetPassword";
import AddressVerification from "../pages/AddressVerification/AddressVerification";
import TrainingRegister from "../pages/Training/Register";
import SupportDashboard from "../pages/Dashboards/SupportDashboard";
// import QueryRegister from "../pages/Dashboards/SupportDashboard/QueryRegister";
import QueryRegister from "../pages/Dashboards/Register/QueryRegister";
import Buy from "../pages/Products/Buy";
import History from "../pages/Products/History";
import ProductDetail from "../pages/Products/Buy/ProductDetail";
import SubscriptionDetail from "../pages/Licensing/SubscriptionDetail";
import LicenseHistory from "../pages/Licensing/LicenseHistory";
import TicketDetails from "../pages/Dashboards/SupportDashboard/TicketDetails";
import TrainingAllotment from "../pages/User/TrainingAllotment";
import DailyStatus from "../pages/Dashboards/SupportDashboard/DailyStatus";
import ChangePassword from "../pages/ERPLogin/Authentication/ChangePassword";
//landing
import OnePage from "../pages/Landing/OnePage";
import Services_all from "../pages/Landing/OnePage/Services_all";

//ManasAgrawal
import ManasAgrawal from "../pages/Landing/OnePage/ManasAgrawal";

//ManishAgrawal
import ManishAgrawal from "../pages/Landing/OnePage/ManishAgrawal";

//HarshitGoel
import HarshitGoel from "../pages/Landing/OnePage/HarshitGoel";

//AditiAgrawal
import AditiAgrawal from "../pages/Landing/OnePage/AditiAgrawal";

//ArpitAgrawal
import ArpitAgrawal from "../pages/Landing/OnePage/ArpitAgrawal";

//IleshThakkar
import IleshThakkar from "../pages/Landing/OnePage/IleshThakkar";

//RitikaAgrawal
import RitikaAgrawal from "../pages/Landing/OnePage/RitikaAgrawal";

//UtkarshAgrawal
import UtkarshAgrawal from "../pages/Landing/OnePage/UtkarshAgrawal";

//Integration
import IntegrationPage from "../pages/Landing/OnePage/IntegrationPage";
//footer things
import PrivacyPolicy from "../pages/Landing/OnePage/footer/PrivacyPolicy";
import TermsOfService from "../pages/Landing/OnePage/footer/TermsOfService";
import FeedBack from "../pages/Landing/OnePage/footer/FeedBack";
import Cookies from "../pages/Landing/OnePage/footer/Cookies";
import LegalDisclosure from "../pages/Landing/OnePage/footer/LegalDisclosure";
import EULA from "../pages/Landing/OnePage/footer/EULA";

//career
import CareerPage from "../pages/Landing/OnePage/CareerPage";
import AboutUs from "../pages/Landing/OnePage/AboutUs";
//BlogsPage
import BlogsPage from "../pages/Landing/OnePage/Blogs/BlogsPage";
import Blog_1 from "../pages/Landing/OnePage/Blogs/blog_1";
import Blog_2 from "../pages/Landing/OnePage/Blogs/blog_2";
import Blog_3 from "../pages/Landing/OnePage/Blogs/blog_3";
import Blog_4 from "../pages/Landing/OnePage/Blogs/blog_4";
import Blog_5 from "../pages/Landing/OnePage/Blogs/blog_5";
//CaseStudies
import CaseStudiesPage from "../pages/Landing/OnePage/CaseStudy/CaseStudyPage";
import Case_1 from "../pages/Landing/OnePage/CaseStudy/Case1";
import Case_2 from "../pages/Landing/OnePage/CaseStudy/Case2";
import Case_3 from "../pages/Landing/OnePage/CaseStudy/Case3";
import Case_4 from "../pages/Landing/OnePage/CaseStudy/Case_4";
import Case_5 from "../pages/Landing/OnePage/CaseStudy/Case5";
// Route Protection logic
const RouteProtection = ({ component, allowedUserTypes }) => {
  const userType = localStorage.getItem("userType"); // Get the userType from localStorage

  if (!userType) {
    // If no userType is found, redirect to login
    return <Navigate to="/Login" />;
  }

  if (!allowedUserTypes.includes(userType)) {
    // If the userType is not allowed for this route, redirect to an appropriate page
    return <Navigate to="/Login" />; // You can modify this to redirect to an 'unauthorized' page
  }

  return component; // If userType matches, render the component
};

const authProtectedRoutes = [
  
  {
    path: "/quotation-register",
    component: <QuotationRegister />,
  },
  {
    path: "/order-details",
    component: <OrderDetails />,
  },
  {
    path: "/recent-orders",
    component: <RecentOrders />,
  },
  {
    path: "/vendor-dashboard",
    component: (
      <RouteProtection
        component={<VendorDashboard />}
        allowedUserTypes={["Vend-X"]}
      />
    ),
  },
  {
    path: "/InfinityDashboard",
    component: (
      <RouteProtection
        component={<InfinityDashboard />}
        allowedUserTypes={["Infinity-ERP"]}
      />
    ),
  },
  {
    path: "/training-dashboard",
    component: (
      <RouteProtection
        component={<TrainingDashboard />}
        allowedUserTypes={["Support-Portal","Infinity-ERP","CPTeam"]}
      />
    ),
  },
  {
    path: "/training-register",
    component:(
      <RouteProtection
      component={<TrainingRegister />}
      allowedUserTypes={["Support-Portal","Infinity-ERP","CPTeam"]}/>
    ),
  },
  {
    path: "/support-dashboard",
    component: (
      <RouteProtection
        component={<SupportDashboard />}
        allowedUserTypes={["Support-Portal", "Infinity-ERP", "CPTeam"]}
      />
    ),
  },
  {
    path: "/TicketDetails",
    component: (
      <RouteProtection
        component={<TicketDetails />}
        allowedUserTypes={["Support-Portal","Infinity-ERP","CPTeam"]}
      />
    ),
  },
  {
    path: "/support-register",
    component: (
      <RouteProtection
        component={<QueryRegister />}
        allowedUserTypes={["Support-Portal", "Infinity-ERP", "CPTeam"]} />
    ),
  },
  {
    path: "/support-dailyStatus",
    component: (
      <RouteProtection
        component={<DailyStatus />}
        allowedUserTypes={["Support-Portal", "Infinity-ERP", "CPTeam"]} />
    ),
  },
  {
    path: "/users",
    component: (
      <RouteProtection
        component={<Users />}
        allowedUserTypes={["Infinity-ERP","Support-Portal"]}
      />
    ),
  },
  {
    path: "/training-allotment",
    component: (
      <RouteProtection
        component={<TrainingAllotment />}
        allowedUserTypes={["Infinity-ERP", "Support-Portal"]}
      />
    ),
  },
  {
    path: "/license-history",
    component: (
      <RouteProtection
        component={<LicenseHistory />}
        allowedUserTypes={["Infinity-ERP"]}
      />
    )
  },
  {
    path: "/subscription-details",
    component: (
      <RouteProtection
        component={<SubscriptionDetail />}
        allowedUserTypes={["Infinity-ERP"]}
      />
    )
  },
  {
    path: "/Products-buy",
    component: (
      <RouteProtection
        component={<Buy />}
        allowedUserTypes={["Infinity-ERP","Support-Portal"]}
      />
    ),
  },
  {
    path: "/Products-history",
    component: (
      <RouteProtection
        component={<History />}
        allowedUserTypes={["Infinity-ERP","Support-Portal"]}
      />
    ),
  },
  
  {
    path: "/product/:id",
    component: (
      <RouteProtection
        component={<ProductDetail />}
        allowedUserTypes={["Infinity-ERP","Support-Portal"]}
      />
    ),
  },
  {
    path:"/ChangePassword",
    component:(
      <RouteProtection
        component={<ChangePassword/>}
        allowedUserTypes={["Infinity-ERP", "Support-Portal"]}
      />
    ),
  }
];

const publicRoutes = [
  // Authentication Page
  
  { path: "/Logout", component: <Logout /> },
  { path: "/Login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/otp-verification", component: <OtpVerification /> },
  { path: "/forgot-password", component: <ForgetPassword /> },
  { path: "/address-verification", component: <AddressVerification /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/landing" />,
  },
  { path: "*", component: <Navigate to="/landing" /> },
  // { path: "/ERPLogout", component: <Logout /> },
  // { path: "/GSTIn", component: <GSTIn /> },
  { path: "/Registration", component: <Registration /> },
  { path: "/UserOnboarding", component: <UserOnboarding /> },
  { path: "/landing", component: <OnePage /> },
  { path: "/UtkarshAgrawal", component: <UtkarshAgrawal /> },
  { path: "/ManasAgrawal", component: <ManasAgrawal /> },
  { path: "/ManishAgrawal", component: <ManishAgrawal /> },
  { path: "/HarshitGoel", component: <HarshitGoel /> },
  { path: "/AditiAgrawal", component: <AditiAgrawal /> },
  { path: "/ArpitAgrawal", component: <ArpitAgrawal /> },
  { path: "/IleshThakkar", component: <IleshThakkar /> },
  { path: "/RitikaAgrawal", component: <RitikaAgrawal /> },
  { path: "/PrivacyPolicy", component: <PrivacyPolicy /> },
  { path: "/TermsOfService", component: <TermsOfService /> },
  { path: "/FeedBack", component: <FeedBack /> },
  { path: "/Cookies", component: <Cookies /> },
  { path: "/LegalDisclosure", component: <LegalDisclosure /> },
  { path: "/EULA", component: <EULA /> },
  { path: "/Services_all", component: <Services_all /> },
  { path: "/IntegrationPage", component: <IntegrationPage /> },
  { path: "/CareerPage", component: <CareerPage /> },
  { path: "/AboutUs", component: <AboutUs /> },
  { path: "/BlogsPage", component: <BlogsPage /> },
  { path: "/Blog_1", component: <Blog_1 /> },
  { path: "/Blog_2", component: <Blog_2 /> },
  { path: "/Blog_3", component: <Blog_3 /> },
  { path: "/Blog_4", component: <Blog_4 /> },
  { path: "/Blog_5", component: <Blog_5 /> },
  //CaseStudies
  { path: "/CaseStudiesPage", component: <CaseStudiesPage /> },
  { path: "/Case_1", component: <Case_1 /> },
  { path: "/Case_2", component: <Case_2 /> },
  { path: "/Case_3", component: <Case_3 /> },
  { path: "/Case_4", component: <Case_4 /> },
  { path: "/Case_5", component: <Case_5 /> },
  // { path: "/ERPLogin", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
