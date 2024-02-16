import axios from "axios";

export const setBaseUrl = () => {
  axios.defaults.baseURL = "https://omd-movie-gnj.onrender.com/api";
  //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post["Content-Type"] = "application/json";
};
