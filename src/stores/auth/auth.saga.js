import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN, loginSuccess, loginError } from "./auth.action";
import API from "services/api";

function* loginSaga({ payload }) {
  try {
    // call api
    const response = yield call(API.user.login, payload);
    yield put(
      loginSuccess({
        data: response?.data,
        token: response?.data?.token || "",
      })
    );
  } catch (e) {
    yield put(loginError(e));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
}
