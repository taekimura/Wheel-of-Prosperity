import React, { useContext } from "react";
import { Context } from "../../App";
import "./QuestionCount.css";
import { Progress } from "reactstrap";

const QuestionCount = () => {
  const { counter } = useContext(Context);
  return (
    <div>
      <Progress color="info" value={counter} max="24" >{counter}/24</Progress>
    </div>
  );
};

export default QuestionCount;