import React from 'react';
import { useTranslation } from 'react-i18next';
import QuizContext from '../../contexts/QuizContext';
import './Question.scss';

const Question = () => {
  const { t } = useTranslation();
  const { quizState } = React.useContext(QuizContext);

  return (
    <div className='quiz--question__component'>
      <p>{t(quizState.question)}</p>
    </div>
  );
};

export default Question;
