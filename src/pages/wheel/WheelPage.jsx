import React from 'react';
import { useTranslation } from 'react-i18next';
import questions from '../../data/questions.json';
import Chart from '../../components/Chart/Chart';
import QuestionModal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import firebase from '../../components/firebase/firebase_utils';
import QuizContext, { QuizContextProvider } from '../../contexts/QuizContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const WheelPage = ({ currentUser }) => {
  return (
    <QuizContextProvider>
      <WheelPageBase currentUser={currentUser} />
    </QuizContextProvider>
  );
};

const WheelPageBase = ({ currentUser }) => {
  const [loading, setLoading] = React.useState(true);
  const { quizState, setQuizState } = React.useContext(QuizContext);
  const { counter, answers, finalData } = quizState;
  const { i18n } = useTranslation();

  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  React.useEffect(() => {
    i18n.changeLanguage('en');
    demoAsyncCall().then(() => setLoading(false));
    setQuizState({
      ...quizState,
      question: questions[counter].questionEngLish
    });
  }, []);

  React.useEffect(() => {
    if (answers.length > 23) {
      sendDataToFirebasePromise();
    }
  }, [answers.length]);

  const demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  };

  const sendDataToFirebasePromise = () => {
    return new Promise((resolve) => {
      const sendDataToFirebase = () => {
        // const createdAt = new Date();
        // const total = answers.length > 0 ? totalScore : null;
        // const displayName = currentUser.displayName;
        // const email = currentUser.email;
        // const role = currentUser.role;
        //Disabled for portfolio purpose
        // firebase.firestore().collection('results').add({
        //   displayName,
        //   email,
        //   ans,
        //   total,
        //   createdAt
        // });
        // firebase.firestore().collection('users').add({
        //   createdAt,
        //   displayName,
        //   email,
        //   role
        // });
      };
      if (finalData) {
        sendDataToFirebase();
      }
      resolve('Sent data to the firebase');
    });
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
          <Chart />
        </>
      ) : (
        <>
          <QuestionModal />
          <Chart />
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(WheelPage);
