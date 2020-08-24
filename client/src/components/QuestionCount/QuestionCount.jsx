import React, { useContext } from "react";
import { Context } from "../../pages/wheel/WheelPage";
import "./QuestionCount.scss";
import { Progress } from "reactstrap";

const QuestionCount = () => {
  const { counter } = useContext(Context);
  return (
    <div>
      <Progress className="progress" value={counter} max="24" >{counter}/24</Progress>
    </div>
  );
};

export default QuestionCount;