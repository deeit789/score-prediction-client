import { APIClient } from "./api_helper";
import { site } from "./config";
import * as url from "./url_helper";

const api = new APIClient();

const pathSite =
  site.name === "shbet"
    ? "?path=sh"
    : site.name === "new88"
    ? "?path=new"
    : site.name === "789bet"
    ? "?path=bet789"
    : site.name === "jun88"
    ? "?path=jun88"
    : site.name === "hi88"
    ? "?path=hi88"
    : "";

export const getIP = () => api.get(url.API_GET_IP);
export const getFP = () => api.get(url.API_GET_FP);

export const matchByDate = (data) => api.post(url.API_MATCH_BY_DATE, data);
export const getTimeSystem = () => api.get(url.API_SYSTEM_TIME);
export const postMatch = (data) => api.post(url.API_MATCH + pathSite, data);
export const getAllDataPrediction = () => api.get(url.API_ACCOUNT_ADMIN_DATA);
export const getDataPredictionByDate = (data) =>
  api.post(url.API_MATCH_GET_DATE + pathSite, data);
export const getPlayerMatchScore = (data) =>
  api.post(url.API_MATCH_FIND_PLAYER + pathSite, data);
