import React from "react";
import "./Question.css";
let Question = props => {
  const { category, color, question } = props;
  return (
    <div className="quiz--question__component">
      <h4 style={{ color: color }}>{category}</h4>
      <p>{question}</p>
    </div>
  );
};

export default Question;