import { Address_Post_details} from "../../helpers/fakebackend_helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_Address_details = createAsyncThunk(
    "AddressDetails/post",
    async (user, thunkAPI) => {
        try {
            const vendorUser= JSON.parse(localStorage.getItem("vendorUser"));
            
            const response = Address_Post_details({
                SubscriberID: vendorUser.subscriberID,
                LicensedTo: user.licensedTo,
                ContactPersonName: user.firstname+ ' '+ user.lastname,
                // Categories: user.categories,
                Mobile: user.phonenumber,
                EmailID: user.email,
                GSTIN: user.gstin,
                GSTINRegistrationType:user.gstinregistration,
                Designation: user.designation,
                Address : user.addressline1,
                Address1: user.addressline2,
                City: user.city,
                State: user.state,
                PinCode: user.zipcode,
                Country: user.country,
                



            });
            const data = await response;
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);