export const PREFIX = "@global";
export const LOGIN = `${PREFIX}/LOGIN`;
export const LOGIN_SUCCESS = `${PREFIX}/LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${PREFIX}/LOGIN_ERROR`;
export const RESET_ERROR = `${PREFIX}/RESET_ERROR`;
export const LOGOUT = `${PREFIX}/LOGOUT`;

export const SAVE_USER = `${PREFIX}/SAVE_USER`;
export const SAVE_TOKEN = `${PREFIX}/SAVE_TOKEN`;

export const saveUser = (data) => ({
  type: SAVE_USER,
  payload: data,
});

export const saveToken = (data) => ({
  type: SAVE_TOKEN,
  payload: data,
});

// -------------------------------------------
export const login = (data) => ({
  type: LOGIN,
  payload: data,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (data) => ({
  type: LOGIN_ERROR,
  payload: data,
});

export const resetError = () => ({
  type: RESET_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
});