import React, { useContext } from "react";
import { Context } from "../../pages/wheel/WheelPage";
import "./Question.scss";

const Question = () => {
  const { question } = useContext(Context);
  return (
    <div className="quiz--question__component">
      <p>{question}</p>
    </div>
  );
};

export default Question;
