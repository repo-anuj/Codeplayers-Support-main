import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  const token = userProfileSession?.token;
  const otpVerified = localStorage.getItem("verifiedOTP") === "true";
  const addressVerified = localStorage.getItem("verifiedAddress") === "true";
  const [loading, setLoading] = useState(!!userProfileSession);
  const [userProfile, setUserProfile] = useState(userProfileSession);

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    const token = userProfileSession?.token;
    setUserProfile(userProfileSession);
    setLoading(!token);
  }, []);

  return { userProfile, loading, token, otpVerified, addressVerified };
};

export { useProfile };
