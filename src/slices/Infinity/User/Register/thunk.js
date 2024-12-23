import { User_Post_Register, User_Patch_Register } from "../../../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

// Register User
export const POST_USER_Register = createAsyncThunk(
    "userRegister/post",
    async (user, thunkAPI) => {
        try {
            const subscriberID = JSON.parse(localStorage.getItem("vendorUser")).subscriberID;
            console.log({
                SubUserName: user.name,
                Password: user.password,
                WhatsappNumber: user.mobile,
                EmailID: user.email,
                UserType: JSON.parse(localStorage.getItem("vendorUser")).userType,
                SubscriberID: subscriberID,
                UserRole: user.userRole,
                IsActive: user.isActive,
            })
            const response = User_Post_Register({
                SubUserName: user.name,
                Password: user.password,
                WhatsappNumber: user.mobile,
                EmailID: user.email,
                UserType: JSON.parse(localStorage.getItem("vendorUser")).userType,
                SubscriberID: subscriberID,
                UserRole:user.userRole,
                IsActive: user.isActive,
            });

            const data = await response;

            // Show success toast
            toast.success("User registered successfully!");
            return data;
        } catch (error) {
            // Show error toast
            toast.error(error.response?.data || "Error during sign up");
            return thunkAPI.rejectWithValue(error.response?.data || "Error during sign up");
        }
    }
);

// Update User Details
export const PATCH_USER_Data = createAsyncThunk(
    "userRegister/update",
    async (user, thunkAPI) => {
        try {
            if (user === undefined || user === null) {
                toast.error("Invalid user data provided.");
                return;
            }

            console.log(user);

            const response = User_Patch_Register({
                SubUserID: user.SubUserID,
                SubUserName: user.Name,
                WhatsappNumber: user.WhatsappNumber,
                UserType: JSON.parse(localStorage.getItem("vendorUser")).userType,
                IsActive: user.IsActive,
            });

            const data = await response;

            // Show success toast
            toast.success("User updated successfully!");
            return data;
        } catch (error) {
            // Show error toast
            toast.error(error.response?.data || "Error during user update.");
            return thunkAPI.rejectWithValue(error.response?.data || "Error during Update User");
        }
    }
);
