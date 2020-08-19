import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<Provider><App /></Provider>, rootElement);
