import { Vendor_Post_Login } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_Vendor_Login = createAsyncThunk(
  "VendorLogin/post",
  async (user, thunkAPI) => {
    try {
      const response = Vendor_Post_Login({
        UserName: user.userName,
        Password: user.password,
      });
      const data = await response;
      localStorage.setItem("mobileNumber",data.mobileNumber);
      localStorage.setItem("vendorUser", JSON.stringify(data));
      localStorage.setItem("verifiedOTP",data.otpVerified);
      localStorage.setItem("verifiedAddress",data.addressVerified);
      localStorage.setItem("userName", user.userName);
      localStorage.setItem("password", user.password);
      localStorage.setItem("userType",data.userType);
      localStorage.setItem("userRole", data.userRole);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutLicenseUser = async () => {
  try {
    await removeLocalStorageItemsForLogout();
    window.location.href = "/Login";
    dispatch(logoutUserSuccess(true));
  } catch (error) {
    dispatch(error);
  }
};

function removeLocalStorageItemsForLogout() {
  return new Promise((resolve) => {
    const keysToRemove = [
      "vendorUser",
      "userName",
      "mobileNumber",
      "gstin",
      "userType",
      "password",
      "verifiedAddress",
      "verifiedOTP",

    ];
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    resolve();
  });
}

const removeLocalStorageItemsForLock = () => {
  return new Promise((resolve) => {
    const keysToRemove = ["vendorUser", "password", "userName"];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    resolve();
  });
};

export const logoutERPUser = async () => {
  try {
    await removeLocalStorageItemsForLock();

    window.location.replace("/ERPLogin");
  } catch (error) {
    console.error("Error during lockScreen operation:", error);
  }
};