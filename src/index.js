import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import "./styles.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Oxygen"],
  },
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: red.A400,
    },
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root"),
);
