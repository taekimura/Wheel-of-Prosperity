import React from 'react';
import QuizContext from '../../pages/wheel/QuizContext';
import { Context } from '../../pages/wheel/WheelPage';
import { ButtonGroup, Button } from 'reactstrap';
import './TranslationButton.scss';

const TranslationButton = () => {
  const { switchToEnglish, switchToFrench } = React.useContext(Context);
  const { quizState } = React.useContext(QuizContext);

  return (
    <ButtonGroup className='float-right'>
      <Button
        className='tran'
        style={
          quizState.lang === 'english'
            ? { background: '#276a7c', margin: 0 }
            : { background: '#babac4', margin: 0 }
        }
        onClick={switchToEnglish}
      >
        English
      </Button>
      <Button
        className='tran'
        style={
          quizState.lang === 'french'
            ? { background: '#276a7c', paddingLeft: '5%' }
            : { background: '#babac4', paddingLeft: '5%' }
        }
        onClick={switchToFrench}
      >
        Français
      </Button>
    </ButtonGroup>
  );
};
export default TranslationButton;
