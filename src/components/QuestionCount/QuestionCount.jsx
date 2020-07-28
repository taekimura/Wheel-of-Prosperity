import React, { useContext } from "react";
import { Context } from "../../App";
import "./QuestionCount.css";

const QuestionCount = () => {
  const { totalQuestion, counter } = useContext(Context);
  return (
    <div className="quiz--number__component">
      <h6>
        Question.
      </h6>
      <h6>
        {counter + 1}
      </h6>
      <h6>
        of
      </h6>
      <h6>
        {totalQuestion}
      </h6>
    </div>
  );
};

export default QuestionCount;