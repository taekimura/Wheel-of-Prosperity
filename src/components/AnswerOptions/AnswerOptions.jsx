import React from "react";
import { Button } from "reactstrap";
import "./AnswerOptions.css";
let AnswerOptions = props => {

  const { selectedAnwser, index, onSelectedAnwser } = props;
  return (

    <Button style={{ width: "7%", margin: "0 1%" }}
      type="button"
      value={index}
      onClick={onSelectedAnwser}
      className={selectedAnwser === index ? "btn-selected" : "btn-unselected"}
    >
      {props.anwserContent}
    </Button>
  );
};
export default AnswerOptions;