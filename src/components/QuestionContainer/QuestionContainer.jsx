import React from "react";
import Question from "../Questions/Question";
import AnswerOptions from "../AnswerOptions/AnswerOptions";
import QuestionCount from "../QuestionCount/QuestionCount";
import { Button } from "reactstrap";
import "./QuestionContainer.css";
let QuestionContainer = props => {
  const {
    question,
    anwserOptions,
    onSelectedAnwser,
    handleNextQuestion,
    selectedAnwser,
    showResult,
    totalQuestion,
    counterQuestion,
    category,
    color
  } = props;
  let nextButton = <Button onClick={handleNextQuestion} className="btn-submit">Apply</Button>;
  let subButton = <Button onClick={showResult} className="btn-submit">Apply</Button>;

  let renderAnswerOption = (data, index) => {
    return (
      <AnswerOptions
        key={index}
        index={index}
        anwserContent={data.content}
        onSelectedAnwser={onSelectedAnwser}
        selectedAnwser={selectedAnwser}
      />
    );
  };

  return (
    <>
      <QuestionCount total={totalQuestion} counter={counterQuestion + 1} />
      <Question category={category} color={color} question={question} />

      <ul>{anwserOptions.map(renderAnswerOption)}</ul>
      <div style={{ textAlign: "right" }}>
        {counterQuestion < 0 || counterQuestion === totalQuestion - 1 ? (
          <span />
        ) : (
            nextButton
          )}
        {counterQuestion === totalQuestion - 1 ? subButton : <span />}
      </div>
    </>
  );
};
export default QuestionContainer;