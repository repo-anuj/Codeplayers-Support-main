import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

//License Validation
export const API5_POST_LicenseValidation = (data) =>
  api.create(url.POST_License_Validation, data);

//Compay Selection
export const API5_GET_CompanySelection = (data) =>
  api.api5_getdata(url.GET_COMPANYSELECTIONDATA, data);

//ERP Login
export const ERP_POST_Login = (data) => api.create(url.POST_ERP_Login, data);

// ERP Main Dashboard
export const ERP_GET_MainDashboard = (data) =>
  api.create(url.GET_ERP_MAIN_DASHBOARD, data);
export const ERP_GET_WBDashboard = (data) =>
  api.create(url.GET_ERP_WB_DASHBOARD, data);
export const ERP_GET_GateDashboard = (data) =>
  api.create(url.GET_ERP_GATE_DASHBOARD, data);
export const ERP_GET_RMDashboard = (data) =>
  api.create(url.GET_ERP_RM_DASHBOARD, data);

//ERP VoucherNum
export const ERP_GET_VOUCHERNUM = (data) =>
  api.get(url.GET_VOUCHERNUM_DATA, data);
export const ERP_GET_VOUCHERNUM_IMAGES = (data) =>
  api.get(url.GET_VOUCHERNUM_IMAGES, data);
export const ERP_GET_VOUCHERNUM_PDF = (data) =>
  api.getPDF(url.GET_VOUCHERNUM_PDF, data);

//VOUCHER REGISTER
export const ERP_POST_REPORT_PDF = (data) =>
  api.createPDF(url.POST_REPORT_PDF, data);

// //USERS
// export const ERP_POST_USER_NOTIFICATIONS = (data) =>
//   api.create(url.GET_USER_NOTIFICATIONS, data);
// export const ERP_GET_USER_NOTIFICATIONS = (data) =>
//   api.get(url.GET_USER_NOTIFICATIONS, data);

//Masters
export const ERP_GET_MASTER_REGISTER = (masterURL) => api.get(masterURL);
export const ERP_SAVE_MASTER_REGISTER = (masterURL, data) =>
  api.create(masterURL, data);

//Transactions
export const ERP_POST_INTEGRATIONDATA = (data) =>
  api.create(url.GET_ERP_TRANSACTION_INTEGRATIONDATA, data);

export const ERP_GET_NEWVOUCHERNUM = (data) =>
  api.create(url.GET_ERP_NEWVOUCHERNUM, data);

export const ERP_POST_VOUCHERNUM = (data) =>
  api.create(url.GET_ERP_NEWVOUCHERNUM, data);

//RFP
export const ERP_POST_VENDORRFP = (data) =>
  api.create(url.POST_VENDORRFP_Data, data);
export const ERP_SAVE_VENDORRFP = (data) =>
  api.create(url.SAVE_VENDORRFP_Data, data);

//Report
export const ERP_POST_LEDGER_REPORT = (data) =>
  api.create(url.GET_ERP_LEDGER_REPORT, data);


//Vendor
export const Vendor_Post_Register = (data) =>
  api.createNoToken(url.VENDOR_POST_REGISTER, data);

export const Vendor_Post_Login = (data) =>
  api.createNoToken(url.VENDOR_POST_LOGIN, data);

export const OTP_Post_Login = (data) =>
  api.create(url.OTP_VERIFICATION, data);
export const OTP_Post_Verified = (data) =>
  api.create(url.OTP_VERIFIED, data);
export const Vendor_Post_ForgotPassword=(data)=>
  api.createNoToken(url.VENDOR_POST_FORGOT_PASSWORD, data);
export const Address_Post_details = (data) =>
  api.create(url.ADDRESS_DETAILS, data);
export const ERP_GET_VendorDashboard = (data) =>
  api.create(url.GET_VENDOR_DASHBOARD, data);



//support
export const ERP_GET_SupportDashboard = (data) =>
  api.get(url.GET_ERP_SUPPORT_DASHBOARD, data);


//training
export const ERP_GET_TrainingDashboard = (data) =>
  api.get(url.GET_ERP_TRAINING_DASHBOARD, data);
//users
export const User_Post_Register=(data)=>
  api.create(url.USER_REGISTER,data);
export const User_Get_Data=(data)=>
  api.get(url.USER_REGISTER,data);

export const Max_Ticket_Get_Data=(data)=>
  api.get(url.GET_MAX_TICKET_NUMBER,data);

export const User_Patch_Register=(data)=>{
  api.update(url.USER_REGISTER, data);
}

export const Raise_Post_Ticket=(data)=>{
  api.create(url.POST_RAISE_TICKET, data);
}

//alloted Traning data
export const GET_ALLOTED_TRAINING = (data) =>
  api.get(url.GET_ALLOTED_TRAINING, data);

export const ERP_GET_TrainingTask = (data) => 
  api.get(url.GET_ERP_TRAINING_TASK,data)

export const ERP_POST_AllotTraining = (data) =>
  api.create(url.POST_ALLOT_TRAINING, data);



//ticket
export const Query_Post_Ticket=(data)=>
  api.create(url.QUERY_TICKET,data);

//module list
export const GET_ListofModules = (data) =>
  api.get(url.GET_LIST_OF_MODULES, data)
//client list
export const GET_ListofClient = (data) =>
  api.get(url.GET_LIST_OF_CLIENTS, data)
//client user list
export const GET_ListofClientUser = (masterURL) => api.get(masterURL);
//user list
export const GET_ListofUser = (data) =>
  api.get(url.GET_LIST_OF_USER, data)
//Product History
export const GET_Product_History = (data) =>
  api.get(url.GET_PRODUCT_ORDER_HISTORY, data)

//Licensing
export const License_History_GET = (data) =>
  api.get(url.GET_LICENSE_HISTORY, data)
//Support User

// rating
export const Post_Rating=(data)=>{
  api.create(url.POST_RATING, data)
}


//ticket Details
export const ERP_GET_TicketDetails = (masterURL) =>  api.get(masterURL);


//daily status

export const GET_SupportUser=(data)=>
  api.get(url.GET_LIST_OF_SUPPORTUSERS,data);

export const GET_SupportStatusList=(data)=>
  api.get(url.GET_LIST_OF_SUPPORTSTATUS,data);

export const Daily_Post_Status=(data)=>{
  api.create(url.POST_DAILY_STATUS,data);
}
export const Daily_Patch_Status = (data) => {
  api.update(url.POST_DAILY_STATUS, data);
}
export const ERP_GET_DailyStatusDetails = (masterURL) => api.get(masterURL);

export const Raise_Patch_Ticket=(data)=>{
  api.update(url.POST_RAISE_TICKET,data);
}

export const Vendor_Post_ChangePassword=(data)=>{
  api.create(url.POST_VENDOR_CHANGE_PASSWORD,data);
}

export const Ticket_GET_UploadMedia = (masterURL) => api.get(masterURL);