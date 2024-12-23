import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
// Authentication

import VendorLoginReducer from "./ERPLogin/auth/login/reducer";

import ProfileReducer from "./ERPLogin/auth/profile/reducer";

//Dashboard
// import ERPDashboardReducer from "./Dashboards/ERPDashboard/reducer";
import VendorDashboardReducer from "./Dashboards/VendorDashboard/reducer";
//register
import VendorRegisterReducer from "./Register/Authentication/reducer";
import {OTPVerificationReducer,OTPVerifiedReducer} from "./OTPVerification/reducer";
//Users
// import UserNotificationsReducer from "./UserNotifications/reducer";
import ForgotPassword from "./ERPLogin/auth/ForgotPassword/reducer";
import ChangePasswordReducer from "./ERPLogin/auth/ChangePassword/reducer"
import { AddressDetailsReducer } from "./AddressVerification/reducer";
import SupportDashboardReducer from "./Dashboards/SupportDashboard/reducer";
import TrainingDashboardReducer from "./Dashboards/TrainingDashboard/reducer";
import UserRegisterReducer from "./Infinity/User/Register/reducer";
import UserDataReducer from "./Infinity/User/Data/reducer";
import QueryTicketReducer from "./Support/RaiseTicket/reducer"

import MaxTicketNumberReducer from "./User/MaxTicketNumber/reducer";
// orderhistory
import GetOrderHistoryReducer from "./Products/History/reducer"
import LicenseDetailReducer from "./Licensing/reducer";

//ticketDetail
import TicketDetailsReducer from "./Dashboards/SupportDashboard/TicketDetails/reducer"
import RatingReducer from "./Dashboards/TicketDetails/Rating/reducer"

import ModuleComboReducer from "./User/Combo/ModuleCombo/reducer";
const ListModuleReducer = ModuleComboReducer.ListModuleReducer;
const ListClientsReducer = ModuleComboReducer.ListClientsReducer;
const ListClientUserReducer=ModuleComboReducer.ListClientUserReducer;

import ListUserReducer from "./User/Combo/UserCombo/reducer"

import TraningTaskReducer from "./User/TraningAllotment/reducer"

import SupportUserReducer from "./Dashboards/SupportDashboard/DailyStatus/SupportUserList/reducer"

import DailyStatusReducer from "./Dashboards/SupportDashboard/DailyStatus/reducer"

import SupportStatusReducer from "./Dashboards/SupportDashboard/DailyStatus/SupportStatusList/reducer"

import DailyStatusByIdReducer from "./Dashboards/SupportDashboard/DailyStatus/DailyStatusById/reducer"

import UploadMediaReducer from "./Dashboards/SupportDashboard/TicketDetails/GetMedia/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  VendorLogin: VendorLoginReducer,
  VendorDashboard:VendorDashboardReducer,
  Profile: ProfileReducer,
  Register:VendorRegisterReducer,
  OTPVerification:OTPVerificationReducer,
  OTPVerified:OTPVerifiedReducer,
  ForgotPassword:ForgotPassword,
  AddressDetails:AddressDetailsReducer,
  SupportDashboard:SupportDashboardReducer,
  UserRegister:UserRegisterReducer,
  UserData:UserDataReducer,
  TrainingDashboard:TrainingDashboardReducer,
  QueryTicket: QueryTicketReducer,
  ChangePassword: ChangePasswordReducer,
  TicketNumber : MaxTicketNumberReducer,
  ProductHistory: GetOrderHistoryReducer,
  LicenseHistory: LicenseDetailReducer,
  TicketDetail : TicketDetailsReducer,
  Rating : RatingReducer,
  ListModule: ListModuleReducer,
  ListClient: ListClientsReducer,
  ListUser: ListUserReducer,
  ListClientUser:ListClientUserReducer,
  TraningTask: TraningTaskReducer,
  DailyStatus: DailyStatusReducer,
  SupportUser: SupportUserReducer,
  SupportStatuses: SupportStatusReducer,
  DailyStatusById:DailyStatusByIdReducer,
  UploadMedia: UploadMediaReducer,
   // UserNotifications: UserNotificationsReducer,
});

export default rootReducer;

//const store = createStore(rootReducer, applyMiddleware(thunk));

//export default store;
