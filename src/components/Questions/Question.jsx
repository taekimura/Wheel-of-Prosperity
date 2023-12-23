import React from 'react';
import QuizContext from '../../pages/wheel/QuizContext';
import './Question.scss';

const Question = () => {
  const { quizState } = React.useContext(QuizContext);

  return (
    <div className='quiz--question__component'>
      <p>{quizState.question}</p>
    </div>
  );
};

export default Question;
