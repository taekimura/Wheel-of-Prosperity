import React, { useContext } from "react";
import { Context } from "../../App";
import { Button } from "reactstrap";
import "./AnswerOptions.css";

const AnswerOptions = (props) => {
  const { handleAnswerSelected, yesNoQuestion, inputNum } = useContext(Context);
  if (yesNoQuestion) {
    return (
      <Button color="secondary" style={{ width: "8%", margin: "0 0.5%", fontFamily: "Open sans", border: "none" }}
        type="button"
        value={props.index + 100}
        onClick={handleAnswerSelected}
        className={inputNum === props.index + 100 ? "btn-selected" : "button"}
      >
        {props.anwserContent}
      </Button>
    );
  } else {
    return (
      <Button color="secondary" style={{ width: "8%", margin: "0 0.5%", fontFamily: "Open sans", border: "none" }}
        type="button"
        value={props.index}
        onClick={handleAnswerSelected}
        className={inputNum === props.index ? "btn-selected" : "button"}
      >
        {props.anwserContent}
      </Button>
    );
  }
};
export default AnswerOptions;