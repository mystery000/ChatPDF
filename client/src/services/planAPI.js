import { getRequest, postRequest } from "./axiosClient";

export const getUserSubscription = () => getRequest('plans/getUserSubscription');
export const createSubscription = (data) => postRequest('plans/createSubscription', data);