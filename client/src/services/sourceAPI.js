import { postRequest } from "./axiosClient";

export const deleteFile = (data) => postRequest('sources/deleteFile', data);