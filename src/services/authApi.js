import apiRequest from "./api/apiRequest";

export const sendOtpApi = (email) => {
  return apiRequest("post", "/send-otp", { email });
};

export const verifyOtpApi = (email, otp) => {
  return apiRequest("post", "/verify-otp", { email, otp });
};
