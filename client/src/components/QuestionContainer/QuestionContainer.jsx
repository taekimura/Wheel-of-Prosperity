import React, { useContext, useState } from "react";
import { Context } from "../../App";
import questions from "../../data/questions.json";
import Question from "../Questions/Question";
import AnswerOptions from "../AnswerOptions/AnswerOptions";
import QuestionCount from "../QuestionCount/QuestionCount";
import TranlationButton from "../TranslationButton/TranslationButton";
import { Button } from "reactstrap";
import "./QuestionContainer.scss";

const QuestionContainer = () => {
  const { handleNextQuestion, handleSubmitAnswers, anwserOptions, counter, applyButton, explanation, handleKeyPress } = useContext(Context);
  const [totalQuestion] = useState(questions.length);

  const nextButton = <Button aria-controls="example-fade-text" style={{ width: "100%", margin: "1% auto", fontSize: "1.3em", backgroundColor: "#84123c", border: "none" }} onKeyPress={handleKeyPress} onClick={handleNextQuestion} className="btn-submit">{applyButton}</Button>;
  const subButton = <Button aria-controls="example-fade-text" style={{ width: "100%", margin: "1% auto", fontSize: "1.3em", backgroundColor: "#84123c", border: "none" }} onKeyPress={handleKeyPress} onClick={handleSubmitAnswers} className="btn-submit">{applyButton}</Button>;

  const renderAnswerOption = (data, index) => {
    return (
      <AnswerOptions
        key={index}
        index={index}
        anwserContent={data.content}
      />
    );
  };

  return (
    <>
      <TranlationButton />
      <br />
      <p className="explanation" style={{ margin: "3em 0em 1em 0.5%", color: "#3d2903" }}> {explanation}</p>
      <QuestionCount />
      <Question />
      <ul>{anwserOptions.map(renderAnswerOption)}</ul>

      <div style={{ textAlign: "right" }}>
        {counter < 0 || counter === totalQuestion - 1 ? (
          <span />
        ) : (
            nextButton
          )}
        {counter === totalQuestion - 1 ? subButton : <span />}
      </div>
    </>
  );
};
export default QuestionContainer;