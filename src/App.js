import React, { Component } from "react";
import QuestionWrapped from "./components/QuestionWrapped/QuestionWrapped";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Canvas from "../src/components/Chart";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
        <QuestionWrapped />
      </div>
    );
  }
}
export default App;