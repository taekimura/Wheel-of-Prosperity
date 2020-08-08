import React, { useContext } from "react";
import { Context } from "../../App";
import Question from "../Questions/Question";
import AnswerOptions from "../AnswerOptions/AnswerOptions";
import QuestionCount from "../QuestionCount/QuestionCount";
import { ButtonGroup, Button } from "reactstrap";
import "./QuestionContainer.css";

const QuestionContainer = () => {
  const { handleNextQuestion, handleSubmitAnswers, anwserOptions, totalQuestion, counter, switchToEnglish, switchToFrench, applyButton, instruction } = useContext(Context);

  const nextButton = <Button color="danger" onClick={handleNextQuestion} className="btn-submit">{applyButton}</Button>;
  const subButton = <Button color="danger" onClick={handleSubmitAnswers} className="btn-submit">{applyButton}</Button>;

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
      <ButtonGroup className="float-right">
        <Button style={{ margin: "0" }} color="primary" onClick={switchToEnglish}>English</Button>
        <Button style={{ paddingLeft: "5%" }} color="success" onClick={switchToFrench}>Français</Button>
      </ButtonGroup>
      <p style={{ padding: "3em 0em 1em 0em" }}> {instruction}</p>
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