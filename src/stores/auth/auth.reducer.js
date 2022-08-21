import { fromJS } from "immutable";
import {
  clearToken,
  getProfile,
  getToken,
  setProfile,
  setToken,
} from "services/storages/userStorage";
import baseApi from "services/api/base.api";

import {
  SAVE_TOKEN,
  SAVE_USER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RESET_ERROR,
  LOGOUT,
} from "./auth.action";

const initialState = fromJS({
  user: getProfile(),
  userToken: getToken(),
  error: null,
  loading: false,
});

baseApi.setToken(getToken());
baseApi.setClearCallback(clearToken);

const reducer = (state = initialState, action) => {
  let user, newUser, token;
  switch (action.type) {
    case SAVE_USER:
      user = state.get("user", {});
      newUser = { ...user, ...action.payload };
      setProfile(newUser);
      return state.set("user", fromJS(newUser));

    case SAVE_TOKEN:
      token = action.payload;
      baseApi.setToken(token);
      baseApi.setClearCallback(clearToken);
      setToken(token);
      return state.set("userToken", fromJS(token));

    case LOGIN:
      return state.set("loading", true);
    case LOGIN_ERROR:
      return state.set("error", action.payload).set("loading", false);
    case LOGIN_SUCCESS:
      user = state.get("user", {});
      newUser = { ...user, ...action.payload.data };
      setProfile(newUser);

      token = action.payload.token;
      baseApi.setToken(token);
      baseApi.setClearCallback(clearToken);
      setToken(token);

      return state
        .set("user", action.payload.data)
        .set("userToken", action.payload.token)
        .set("error", null)
        .set("loading", false);

    case RESET_ERROR:
      return state.set("error", null).set("loading", false);

    case LOGOUT:
      clearToken();
      return state
        .set("user", null)
        .set("userToken", null)
        .set("error", null)
        .set("loading", false);
    default:
      return state;
  }
};

export default reducer;
