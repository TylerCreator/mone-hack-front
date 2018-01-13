import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import App from "./App";
import { unregister } from "./registerServiceWorker";
import "./index.css";

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById("root")
);

unregister();
