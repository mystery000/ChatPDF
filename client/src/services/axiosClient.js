import axios from 'axios';
import constants from '../config/constants';
import { getStorage } from '../helpers';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;
console.log(axiosClient.defaults.baseURL)
axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
// axiosClient.defaults.withCredentials = true;

const token = getStorage('token');

if(token) {
  axiosClient.defaults.headers['Authorization'] = `${token}`;
} else {
  delete axiosClient.defaults.headers['Authorization'];
}

export function getRequest(URL, params) {
  return axiosClient.get(`/${URL}`, { params }).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}
