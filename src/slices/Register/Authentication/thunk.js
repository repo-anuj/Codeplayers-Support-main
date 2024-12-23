import { Vendor_Post_Register } from "../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_Vendor_Register = createAsyncThunk(
    "vendorRegister/post",
    async (user, thunkAPI) => {
        try {
            const response = Vendor_Post_Register({
                UserName: user.userName,  // Using userName field from form data
                Password: user.password,
                Mobile: user.mobileNumber,
                GSTIN: user.gstin,
                UserType: user.userType,
            });
            const data = await response;

            // Store user information in local storage
            localStorage.setItem("authUser", JSON.stringify(data));
            localStorage.setItem("userName", user.userName);
            localStorage.setItem("mobileNumber", user.mobileNumber);
            localStorage.setItem("gstin", user.gstin);
            localStorage.setItem("userType", user.userType);
            localStorage.setItem("password",user.password);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Error during sign up');
        }
    }
);

export const logoutSignUpUser = async () => {
    try {
        await removeLocalStorageItemsForLogout();
        window.location.href = "/Login";
    } catch (error) {
        console.error("Error during logout", error);
    }
};

// Helper function to clear local storage upon logout
function removeLocalStorageItemsForLogout() {
    return new Promise((resolve) => {
        const keysToRemove = [
            "authUser",
            "userName",
            "mobileNumber",
            "gstin",
            "userType",
        ];
        keysToRemove.forEach((key) => {
            localStorage.removeItem(key);
        });
        resolve();
    });
}
