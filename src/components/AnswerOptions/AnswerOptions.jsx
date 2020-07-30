import React, { useContext } from "react";
import { Context } from "../../App";
import { Button } from "reactstrap";
import "./AnswerOptions.css";

const AnswerOptions = (props) => {
  const { selectedAnwsers, handleAnswerSelected } = useContext(Context);
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
};
export default AnswerOptions;