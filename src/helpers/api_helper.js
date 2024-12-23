import axios from "axios";
//import https from "https";
// require("https").defaults({ rejectUnauthorized: false });

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
import {api} from "../config";
// content type
// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid Credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error;
    }
    return Promise.reject(message);
  }
);

const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  get = async (url, params) => {
    axios.defaults.baseURL = api.API_URL;

    const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    if (token) setAuthorization(token);

    const queryString = params
      ? Object.keys(params)
          .map((key) => key + "=" + encodeURIComponent(params[key]))
          .join("&")
      : "";

    const response = await axios.get(
      queryString ? `${url}?${queryString}` : url
    );
    return response;
  };

  api5_getdata = async (url, params) => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    if (token) setAuthorization(token);

    const subscriberID = JSON.parse(
      localStorage.getItem("authUser")
    )?.subscriberID;
    const queryString = params
      ? `?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")}`
      : "";

    const fullUrl = `${url}/${subscriberID}${queryString}`;

    const response = await axios.get(fullUrl);
    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    axios.defaults.baseURL = api.API_URL;

    const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    if (token) setAuthorization(token);

    return axios.post(url, data);
  };
  createNoToken = (url, data) => {
    axios.defaults.baseURL =api.API_URL;

    // const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    // if (token) setAuthorization(token);

    return axios.post(url, data);
  };

  /**
   * post given data to url
   */
  createPDF = async (url, data) => {
    axios.defaults.baseURL = api.API_URL;

    const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    if (token) setAuthorization(token);

    return axios.post(url, data, {
      responseType: "blob", // Important to specify blob for binary data
      headers: {
        "Content-Type": "application/json", // Adjust as needed
      },
    });
  };

  getPDF = async (url, params) => {
    axios.defaults.baseURL = api.API_URL;

    const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    if (token) setAuthorization(token);

    const queryString = params
      ? Object.keys(params)
          .map((key) => key + "=" + encodeURIComponent(params[key]))
          .join("&")
      : "";

    const response = await axios.get(
      queryString ?  `${url}?${queryString}` : url,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    axios.defaults.baseURL = api.API_URL;
    const token = JSON.parse(localStorage.getItem("vendorUser"))?.token;
    if (token) setAuthorization(token);
    
    return axios.patch(url, data);
  };

  put = (url, data) => {
    axios.defaults.baseURL=api.API_URL;
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    axios.defaults.baseURL=api.API_URL;
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = localStorage.getItem("vendorUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };