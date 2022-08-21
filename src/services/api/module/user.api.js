import baseApi from "../base.api";
import { paths } from "../paths";

export const login = (data) => {
  return baseApi.post(paths.login(), data);
};

export const register = (data) => {
  return baseApi.post(paths.register(), data);
};
