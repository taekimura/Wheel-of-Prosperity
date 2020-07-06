import React, { Component } from "react";
import QuestionWrapped from "./components/QuestionWrapped/QuestionWrapped";
import Chart from "../src/components/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chart />
        <QuestionWrapped />
      </div>
    );
  }
}
export default App;
