import React from "react";
import "./QuestionCount.css";
let QuestionCount = props => {
  let { total, counter } = props;
  return (
    <div className="quiz--number__component">
      <h6>
        Question.
      </h6>
      <h6>
        {counter}
      </h6>
      <h6>
        of
      </h6>
      <h6>
        {total}
      </h6>
    </div>
  );
};

export default QuestionCount;