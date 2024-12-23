import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutLicenseUser } from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../../Components/Common/withRouter";
import { createSelector } from "reselect";

const Logout = (props) => {
  const dispatch = useDispatch();

  const isUserLogoutSelector = createSelector(
    (state) => state.Login,
    (isUserLogout) => isUserLogout.isUserLogout
  );
  const isUserLogout = useSelector(isUserLogoutSelector);

  useEffect(() => {
    dispatch(logoutLicenseUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/ERPLogin" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
