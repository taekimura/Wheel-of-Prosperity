import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-responsive-modal';
import { Button } from 'reactstrap';
import TranslationButton from '../TranslationButton/TranslationButton';
import QuestionContainer from '../QuestionContainer/QuestionContainer';
import QuizContext from '../../contexts/QuizContext';
import 'react-responsive-modal/styles.css';
import './Modal.scss';

const QuestionModal = () => {
  const [open, setOpen] = React.useState(true);
  const [isStarter, setIsStarter] = React.useState(true);
  const { quizState } = React.useContext(QuizContext);
  const { t } = useTranslation();

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
          {t('PROSPERITY QUIZ')}
        </h3>
        <p
          id='instruction'
          style={{
            padding: '0em 0em 1em 0em',
            color: '#3d2903',
            fontSize: '1.1em'
          }}
        >
          {t(
            'To assist you in having a clear picture of your Happiness Test, we invite you to note, on a scale of 0 to 10 - 0 representing always (light) and 10 representing never (heavy) - the frequency at which the residues from patterns and/or Qualities of the Heart impact your daily life in four (4) major categories, that of 1, 2, 3, and 4.'
          )}
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
            {t('Start')}
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
