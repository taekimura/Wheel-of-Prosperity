import React, { useContext } from "react";
import { Context } from "../../App";
import { Button } from "reactstrap";
import "./AnswerOptions.scss";

const AnswerOptions = (props) => {
  const { handleAnswerSelected, yesNoQuestion, inputNum } = useContext(Context);
  if (yesNoQuestion) {
    return (
      <Button style={{ backgroundColor: "white", width: "8%", margin: "0 0.5%", fontFamily: "Open sans", border: "none", fontWeight: "300" }}
        type="button"
        value={props.index + 100}
        onClick={handleAnswerSelected}
        className={inputNum === props.index + 100 ? "btn-selected" : "btn-unselected"}
      >
        {props.anwserContent}
      </Button>
    );
  } else {
    return (
      <Button style={{ backgroundColor: "white", width: "8%", margin: "0 0.5%", fontFamily: "Open sans", border: "none", fontWeight: "300" }}
        type="button"
        value={props.index}
        onClick={handleAnswerSelected}
        className={inputNum === props.index ? "btn-selected" : "btn-unselected"}
      >
        {props.anwserContent}
      </Button>
    );
  }
};
export default AnswerOptions;