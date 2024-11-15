import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import store from "./store/store";

import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <>
    <Router>
      <Provider store={store}>
          <App />
          <Toaster/>
      </Provider>
    </Router>
  </>,
  document.getElementById("root")
);
