import React from 'react';
import Question from '../Questions/Question';
import AnswerOptions from '../AnswerOptions/AnswerOptions';
import QuestionCount from '../QuestionCount/QuestionCount';
import TranslationButton from '../TranslationButton/TranslationButton';
import questions from '../../data/questions.json';
import QuizContext from '../../pages/wheel/QuizContext';
import './QuestionContainer.scss';

const QuestionContainer = () => {
  const { quizState } = React.useContext(QuizContext);

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
      <ul style={{ padding: '0' }}>
        {quizState.options.map((option, index) => (
          <AnswerOptions
            key={index}
            index={index}
            answerContent={String(option)}
          />
        ))}
      </ul>
    </>
  );
};
export default QuestionContainer;
