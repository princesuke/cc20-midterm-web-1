import axios from "axios";

// axios.defaults.baseURL = "http://54.252.155.248/api";
// axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.baseURL =
  "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api";

axios.interceptors.request.use(
  (config) => {
    const local = localStorage.getItem("user_storage");
    const accessToken = local ? JSON.parse(local)?.state?.accessToken : "";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
