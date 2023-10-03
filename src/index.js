import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// set up redux-thunk dan create redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import allReducer from "./redux/reducer";
import ReduxThunk from "redux-thunk";

// create global state
const globalState = createStore(allReducer, applyMiddleware(ReduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={globalState}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
