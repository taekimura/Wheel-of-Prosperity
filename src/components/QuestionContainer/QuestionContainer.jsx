import React from 'react';
import { Context } from '../../pages/wheel/WheelPage';
import Question from '../Questions/Question';
import AnswerOptions from '../AnswerOptions/AnswerOptions';
import QuestionCount from '../QuestionCount/QuestionCount';
import TranslationButton from '../TranslationButton/TranslationButton';
import questions from '../../data/questions.json';
import QuizContext from '../../pages/wheel/QuizContext';
import './QuestionContainer.scss';

const QuestionContainer = () => {
  const { quizState } = React.useContext(QuizContext);
  const { answerOptions } = React.useContext(Context);

  const renderAnswerOption = (data, index) => {
    return (
      <AnswerOptions key={index} index={index} answerContent={data.content} />
    );
  };

  return (
    <>
      <TranslationButton />
      <br />
      <p
        className='explanation'
        style={{ margin: '3em 0em 1em 0.5%', color: '#3d2903' }}
      >
        {quizState.lang === 'english'
          ? questions[0].explanationEnglish
          : questions[0].explanationFrench}
      </p>
      <QuestionCount />
      <Question />
      <ul style={{ padding: '0' }}>{answerOptions.map(renderAnswerOption)}</ul>
    </>
  );
};
export default QuestionContainer;
