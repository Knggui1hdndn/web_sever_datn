import axios from "axios";
import router from "../router";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "*/*"
  },
})

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token") || ""
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  });

instance.interceptors.response.use((response) => {
  return response;
},
  (error) => {
    const status = error.response ? error.response.status : null;
    // Nếu không xác thực, xóa mã jwt và chuyển hướng người dùng về trang đăng nhập
    if (status === 401) {
      localStorage.removeItem('token');
      // localStorage.removeItem('fullname');
      // localStorage.removeItem('role');
      router.push("/login");
    }else if (status == 500 || status == 500) {
      router.push("/error/500");;
    }
    return Promise.reject(error);
  }
)

export default instance;