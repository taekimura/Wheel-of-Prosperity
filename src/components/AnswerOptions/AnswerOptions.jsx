import React, { useContext } from "react";
import { Context } from "../../App";
import { Button } from "reactstrap";
import "./AnswerOptions.css";

const AnswerOptions = (props) => {
  const { selectedAnwsers, handleAnswerSelected } = useContext(Context);
  return (
    <Button style={{ width: "7%", margin: "0 1%" }}
      type="button"
      value={props.index}
      onClick={handleAnswerSelected}
      className={selectedAnwsers === props.index ? "btn-selected" : ""}
    >
      {props.anwserContent}
    </Button>
  );
};
export default AnswerOptions;