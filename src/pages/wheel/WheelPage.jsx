import React from 'react';
import questions from '../../data/questions.json';
import Chart from '../../components/Chart/Chart';
import QuestionModal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import firebase from '../../components/firebase/firebase_utils';
import QuizContext, { QuizContextProvider } from './QuizContext';
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
  const { quizState, setQuizState, isBooleanQuiz } =
    React.useContext(QuizContext);
  const { lang, counter, answers, finalData } = quizState;

  React.useEffect(() => {
    demoAsyncCall().then(() => setLoading(false));
    setLanguage();
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

  // Set languages English or French
  const setLanguage = () => {
    if (lang === 'english' && !isBooleanQuiz) {
      setQuizState({
        ...quizState,
        question: questions[counter].questionEngLish
      });
    } else if (lang === 'french' && !isBooleanQuiz) {
      setQuizState({
        ...quizState,
        question: questions[counter].questionFrench
      });
    }
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
