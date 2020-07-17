import React from "react";
import "./Question.css";
let Question = props => {
  const { category, color, question } = props;
  return (
    <div className="quiz--question__component">
      <h3 style={{ color: color }}>{category}</h3>
      <p>{question}</p>
    </div>
  );
};

export default Question;