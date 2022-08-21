import createStorage from "./createStorage";

const instance = createStorage("kanban");
const KEY_PROFILE = "profile";
const KEY_TOKEN = "token";

export const setProfile = (data) => instance.setValue(KEY_PROFILE, data);

export const getValueUser = (key) => instance.getValue(key);

export const getProfile = () => instance.getValue(KEY_PROFILE);

export const setToken = (data) => instance.setValue(KEY_TOKEN, data);

export const getToken = () => instance.getValue(KEY_TOKEN);

export const clearToken = () => instance.clear();
