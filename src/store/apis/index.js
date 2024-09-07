import axios from "axios";

// API component manages communication with external APIs, handling requests and responses to the server
axios.defaults.withCredentials = true; // Ensures cookies (JWT token) are sent with requests
const API = axios.create({ baseURL: process.env.REACT_APP_API });
API.interceptors.request.use((req) => {
  return req;
});

// APIs Endpoints for personal blogs
export const addBlog = (data) => API.post(`/personalBlog`, data);
export const allBlogs = () => API.get("/personalBlogs");
export const deleteBlog = (id) => API.delete(`/delete/${id}`);
export const getBlog = (id) => API.get(`/personalBlog/${id}`);
export const updateBlog = (id, data) => API.put(`/updateBlog/${id}`, data);

// APIs Endpoints for User
export const addUser = (data) => API.post(`/user`, data);
export const userLogin = (data) => API.post(`/userLogin`, data);
