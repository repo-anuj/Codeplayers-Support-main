import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";
import { useProfile } from "../Components/Hooks/UserHooks";
import { logoutLicenseUser } from "../slices/ERPLogin/auth/login/thunk";

const AuthProtected = ({ children }) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token, otpVerified, addressVerified } = useProfile();

  useEffect(() => {
    if (userProfile && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutLicenseUser());
    }
  }, [token, userProfile, loading, dispatch]);

  if (!userProfile && loading && !token) {
    return <Navigate to="/Login" />;
  }

  if (userProfile && token && !otpVerified) {
    return <Navigate to="/otp-verification" />;
  }

  if (userProfile && token && otpVerified && !addressVerified) {
    return <Navigate to="/address-verification" />;
  }

  return <>{children}</>;
};

export default AuthProtected;

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
