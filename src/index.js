import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

// import "dotenv/config";
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./styles/global.scss";

import configureStore from "./stores/configureStore";
import rootSaga from "./sagas";

const store = configureStore();
store.runSaga(rootSaga);

const history = createBrowserHistory();

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<React.StrictMode></React.StrictMode>);

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
      <ToastContainer />
    </HistoryRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
