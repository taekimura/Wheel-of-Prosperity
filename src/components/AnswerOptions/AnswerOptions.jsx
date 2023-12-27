import React from 'react';
import { useTranslation } from 'react-i18next';
import QuizContext from '../../contexts/QuizContext';
import { Button } from 'reactstrap';
import './AnswerOptions.scss';

const AnswerOptions = (props) => {
  const { t } = useTranslation();
  const { isBooleanQuiz, handleSelectedAnswers } =
    React.useContext(QuizContext);

  return (
    <Button
      style={{
        width: '8%',
        margin: '0 0.5%'
      }}
      type='button'
      value={isBooleanQuiz ? props.index + 100 : props.index}
      onClick={handleSelectedAnswers}
      className='btn-unselected'
    >
      {t(props.answerContent)}
    </Button>
  );
};

export default AnswerOptions;
