import React from 'react';
import { useTranslation } from 'react-i18next';
import Question from '../Questions/Question';
import AnswerOptions from '../AnswerOptions/AnswerOptions';
import QuestionCount from '../QuestionCount/QuestionCount';
import TranslationButton from '../TranslationButton/TranslationButton';
import QuizContext from '../../contexts/QuizContext';
import './QuestionContainer.scss';

const QuestionContainer = () => {
  const { t } = useTranslation();
  const { quizState } = React.useContext(QuizContext);

  return (
    <>
      <TranslationButton />
      <br />
      <p
        className='explanation'
        style={{ margin: '3em 0em 1em 0.5%', color: '#3d2903' }}
      >
        {t(
          '0 representing always and 10 never - what is the first number to come to mind.'
        )}
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
