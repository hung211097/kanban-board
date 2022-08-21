import { createSelector } from "reselect";

const storeName = "auth";
export const selectAuthStore = (state) => state.get(storeName, {});

export const selectUser = () =>
  createSelector(selectAuthStore, (state) => state.get("user", null));

export const selectToken = () =>
  createSelector(selectAuthStore, (state) => state.get("userToken", null));

export const selectError = () =>
  createSelector(selectAuthStore, (state) => state.get("error", null));

export const selectLoading = () =>
  createSelector(selectAuthStore, (state) => state.get("loading", null));