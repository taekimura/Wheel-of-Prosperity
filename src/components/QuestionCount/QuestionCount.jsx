import React from "react";
import "./QuestionCount.css";
let QuestionCount = props => {
  let { total, counter } = props;
  return (
    <div className="quiz--number__component">
      <h5>
        Question.
      </h5>
      <h5 style={{ color: "red" }}>
        {counter}
      </h5>
      <h5>
        of
      </h5>
      <h5>
        {total}
      </h5>
    </div>
  );
};

export default QuestionCount;