import React from 'react';
import QuizContext from '../../pages/wheel/QuizContext';
import { Button } from 'reactstrap';
import './AnswerOptions.scss';

const AnswerOptions = (props) => {
  const { isBooleanQuiz, handleAnswerSelected } = React.useContext(QuizContext);

  if (isBooleanQuiz) {
    return (
      <Button
        style={{
          backgroundColor: 'white',
          width: '8%',
          margin: '0 0.5%',
          fontFamily: 'Open sans',
          border: 'none',
          fontWeight: '300'
        }}
        type='button'
        value={props.index + 100}
        onClick={handleAnswerSelected}
        className='btn-unselected'
      >
        {props.answerContent}
      </Button>
    );
  } else {
    return (
      <Button
        style={{
          backgroundColor: 'white',
          width: '8%',
          margin: '0 0.5%',
          fontFamily: 'Open sans',
          border: 'none',
          fontWeight: '300'
        }}
        type='button'
        value={props.index}
        onClick={handleAnswerSelected}
        className='btn-unselected'
      >
        {props.answerContent}
      </Button>
    );
  }
};
export default AnswerOptions;
