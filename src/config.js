// Set dataExchangeURL based on the environment
const dataExchangeURL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.99:5005"
    : "https://api5.codeplayers.in";

// Export configuration
module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  api: {
    API_URL: dataExchangeURL,
  },
};
