/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux-immutable";
import authReducer from "./auth/auth.reducer";

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    auth: authReducer,
  });
}
