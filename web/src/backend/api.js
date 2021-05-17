import { get, post } from "./http";

// var baseUrl = "http://10.0.0.21:8888";
// var baseUrl = "http://114.212.81.3:5000";
var baseUrl = "http://s1.portmapping.opennetlab.org:22102";

export const getTask = (userId, key) => {
  return get(`${baseUrl}/getTask?userId=${userId}&key=${key}`);
}

export const upload = (params) => {
  return post(`${baseUrl}/upload`, params);
}