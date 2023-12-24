import React from 'react';
import { Context } from '../../pages/wheel/WheelPage';
import { Modal } from 'react-responsive-modal';
import { Button } from 'reactstrap';
import TranslationButton from '../TranslationButton/TranslationButton';
import QuestionContainer from '../QuestionContainer/QuestionContainer';
import QuizContext from '../../pages/wheel/QuizContext';
import questions from '../../data/questions.json';
import 'react-responsive-modal/styles.css';
import './Modal.scss';

const QuestionModal = () => {
  const [open, setOpen] = React.useState(true);
  const [isStarter, setIsStarter] = React.useState(true);
  const { quizState } = React.useContext(QuizContext);

  React.useEffect(() => {
    if (quizState.finalData) {
      setOpen(false);
    }
  }, [quizState.finalData]);

  const startQuestionnaire = () => {
    return (
      <>
        <TranslationButton />
        <br />
        <h3
          style={{
            textAlign: 'center',
            padding: '0.8em 0em 0.3em 0',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            color: '#3d2903'
          }}
        >
          {quizState.lang === 'english' ? 'PROSPERITY QUIZ' : 'QUIZ PROSPÉRITÉ'}
        </h3>
        <p
          id='instruction'
          style={{
            padding: '0em 0em 1em 0em',
            color: '#3d2903',
            fontSize: '1.1em'
          }}
        >
          {quizState.lang === 'english'
            ? questions[0].instructionEnglish
            : questions[0].instructionFrench}
        </p>
        <div
          style={{
            textAlign: 'center',
            display: 'table',
            width: '100%'
          }}
        >
          <Button
            style={{
              margin: '0',
              textAlign: 'center',
              fontSize: '1.3em',
              backgroundColor: '#84123c',
              border: 'none'
            }}
            onClick={() => setIsStarter(false)}
            className='btn-submit'
          >
            {quizState.lang === 'english' ? 'Start' : 'Début'}
          </Button>
        </div>
      </>
    );
  };

  return (
    <div>
      <Modal open={open} closeOnOverlayClick={false}>
        {isStarter ? startQuestionnaire() : <QuestionContainer />}
      </Modal>
    </div>
  );
};

export default QuestionModal;
