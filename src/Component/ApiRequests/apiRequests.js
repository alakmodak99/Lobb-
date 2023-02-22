//https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken

import axios from "axios";
const getContentUrl =
  "https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent";
const getTokenUrl =
  "https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken";
export const postApiData = (obj) => {
  return axios.post(`${getTokenUrl}`, {
    ...obj,
  });
};

export const getApiData = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${getContentUrl}`, config);
};
