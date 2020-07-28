import React, { useContext } from "react";
import { Context } from "../../App";
import Question from "../Questions/Question";
import AnswerOptions from "../AnswerOptions/AnswerOptions";
import QuestionCount from "../QuestionCount/QuestionCount";
import { ButtonGroup, Button } from "reactstrap";
import "./QuestionContainer.css";

const QuestionContainer = () => {
  const { handleNextQuestion, handleSubmitAnswers, anwserOptions, totalQuestion, counter, switchToFrench, switchToEnglish } = useContext(Context);

  const nextButton = <Button onClick={handleNextQuestion} className="btn-submit">Apply</Button>;
  const subButton = <Button onClick={handleSubmitAnswers} className="btn-submit">Apply</Button>;

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
      <ButtonGroup style={{ marginLeft: "72%" }}>
        <Button style={{ margin: "0" }} color="primary" onClick={switchToEnglish}>English</Button>
        <Button color="success" onClick={switchToFrench} >French</Button>
      </ButtonGroup>
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