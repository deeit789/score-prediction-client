import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

export const matchByDate = (data) => api.post(url.API_MATCH_BY_DATE, data);
export const getTimeSystem = () => api.get(url.API_SYSTEM_TIME);
export const postMatch = (data) => api.post(url.API_MATCH, data);
export const getAllDataPrediction = () => api.get(url.API_ACCOUNT_ADMIN_DATA);
