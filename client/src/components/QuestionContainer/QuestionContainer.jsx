import React, { useContext } from "react";
import { Context } from "../../pages/wheel/WheelPage";
import Question from "../Questions/Question";
import AnswerOptions from "../AnswerOptions/AnswerOptions";
import QuestionCount from "../QuestionCount/QuestionCount";
import TranlationButton from "../TranslationButton/TranslationButton";
import "./QuestionContainer.scss";

const QuestionContainer = () => {
  const { anwserOptions, explanation } = useContext(Context);

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
      <ul style={{ padding: "0" }}>{anwserOptions.map(renderAnswerOption)}</ul>
    </>
  );
};
export default QuestionContainer;
