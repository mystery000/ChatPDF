import { getRequest, postRequest } from "./axiosClient";

export const createSubscription = (data) => postRequest('plans/createSubscription', data);