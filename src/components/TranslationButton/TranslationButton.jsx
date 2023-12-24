import React from 'react';
import { useTranslation } from 'react-i18next';
import QuizContext from '../../contexts/QuizContext';
import { ButtonGroup, Button } from 'reactstrap';
import './TranslationButton.scss';

const TranslationButton = () => {
  const { quizState, switchToEnglish, switchToFrench } =
    React.useContext(QuizContext);
  const { i18n } = useTranslation();

  return (
    <ButtonGroup className='float-right'>
      <Button
        className='tran'
        style={
          // i18n.language === 'en'
          quizState.lang === 'english'
            ? { background: '#276a7c', margin: 0 }
            : { background: '#babac4', margin: 0 }
        }
        onClick={switchToEnglish}
        // onClick={() => i18n.changeLanguage('en')}
      >
        English
      </Button>
      <Button
        className='tran'
        style={
          // i18n.language === 'fr'
          quizState.lang === 'french'
            ? { background: '#276a7c', paddingLeft: '5%' }
            : { background: '#babac4', paddingLeft: '5%' }
        }
        onClick={switchToFrench}
        // onClick={() => i18n.changeLanguage('fr')}
      >
        Français
      </Button>
    </ButtonGroup>
  );
};
export default TranslationButton;
