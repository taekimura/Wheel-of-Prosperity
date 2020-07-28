import React, { useContext } from "react";
import { Context } from "../../App";
import "./Question.css";

const Question = () => {
  const { question } = useContext(Context);
  return (
    <div className="quiz--question__component">
      <p>{question}</p>
    </div>
  );
};

export default Question;