import React from 'react';
import QuizContext from '../../pages/wheel/QuizContext';
import './QuestionCount.scss';
import { Progress } from 'reactstrap';

const QuestionCount = () => {
  const { quizState } = React.useContext(QuizContext);

  return (
    <div>
      <Progress className='progress' value={quizState.counter} max='24'>
        {quizState.counter}/24
      </Progress>
    </div>
  );
};

export default QuestionCount;
