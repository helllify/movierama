import axiosInstance from "./axiosInstance";
import token from "./serviceCallUtilities";

const serviceCall = (
  type,
  url,
  payload,
  timeout = 5000,
  headers = {},
  responseType = "json"
) => {
  const isGetRequest = type.toLowerCase() === "get";
  const payloadAsParams = isGetRequest;
  const payloadAsData = !isGetRequest;

  const request = {
    method: type.toLowerCase() || "get",
    url,
    ...(payloadAsParams && {
      params: { api_key: token, ...payload },
    }),
    ...(payloadAsData && {
      data: payload,
    }),
    timeout,
    responseType,
  };

  return axiosInstance(request);
};

export default serviceCall;
