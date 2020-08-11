import React, { useContext } from "react";
import { Context } from "../../App";
import { Button } from "reactstrap";
import "./AnswerOptions.css";

const AnswerOptions = (props) => {
  const { selectedAnwsers, handleAnswerSelected, yesNoQuestion } = useContext(Context);
  if (selectedAnwsers.length === 9 && yesNoQuestion) {
    return (
      <Button color="secondary" style={{ width: "8%", margin: "0 0.5%", fontFamily: "Open sans" }}
        type="button"
        value={props.index + 100}
        onClick={handleAnswerSelected}
        className={selectedAnwsers === props.index ? "btn-selected" : ""}
      >
        {props.anwserContent}
      </Button>
    );
  } else {
    return (
      <Button color="secondary" style={{ width: "8%", margin: "0 0.5%", fontFamily: "Open sans" }}
        type="button"
        value={props.index}
        onClick={handleAnswerSelected}
        className={selectedAnwsers === props.index ? "btn-selected" : ""}
      // [counter - 1]
      >
        {props.anwserContent}
      </Button>
    );
  }
};
export default AnswerOptions;