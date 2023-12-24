import React, { useState, useEffect } from 'react';
import questions from '../../data/questions.json';
import Chart from '../../components/Chart/Chart';
import QuestionModal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import {
  initialState,
  seriesLabels,
  groupOneColors,
  groupTwoColors,
  groupThreeColors,
  groupFourColors
} from '../../constants';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import firebase from '../../components/firebase/firebase_utils';
import QuizContext, { QuizContextProvider } from './QuizContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const CUSTOM_BOOLEAN = {
  YES: 100,
  NO: 101
};

const indexOfBooleanAnswer = 9;

export const Context = React.createContext('this is context!');
export const Provider = Context.Provider;

const WheelPage = ({ currentUser }) => {
  return (
    <QuizContextProvider>
      <WheelPageBase currentUser={currentUser} />
    </QuizContextProvider>
  );
};

const WheelPageBase = ({ currentUser }) => {
  // For setting loading and languages
  const [loading, setLoading] = useState(true);

  // For the chart section
  const [lengthOfBar, setLengthOfBar] = useState([]);
  const [series] = useState(seriesLabels);
  const [colors, setColors] = useState(groupOneColors);

  // For the user input data
  const [aveAnswers] = useState(initialState);
  const [ans, setAns] = useState([]);
  const [data, setData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  // For the questionnaire section
  const [yesNoQuestion, setYesNoQuestion] = useState(false);
  const [open, setOpen] = useState(true);
  const [inputNum, setInputNum] = useState(false);
  const [result, setResult] = useState(false);

  const { quizState, setQuizState } = React.useContext(QuizContext);

  useEffect(() => {
    demoAsyncCall().then(() => setLoading(false));
    setLanguage();
    setData(lengthOfBar);
    console.log(ans);
    console.log(aveAnswers);
  }, [lengthOfBar, quizState.answers]);

  useEffect(() => {
    sendDataToFirebasePromise();
  }, [ans.length > 23]);

  const demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  };

  const sendDataToFirebasePromise = () => {
    return new Promise((resolve) => {
      const sendDataToFirebase = () => {
        const createdAt = new Date();
        const total =
          quizState.answers.length > 0
            ? sumOfUserInput(quizState.answers)
            : null;
        const displayName = currentUser.displayName;
        const email = currentUser.email;
        const role = currentUser.role;

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
      if (result) {
        sendDataToFirebase();
      }
      resolve('Sent data to the firebase');
    });
  };

  // Set languages English or French
  const setLanguage = () => {
    if (quizState.lang === 'english' && !yesNoQuestion) {
      setQuizState({
        ...quizState,
        question: questions[quizState.counter].questionEngLish
      });
    } else if (quizState.lang === 'french' && !yesNoQuestion) {
      setQuizState({
        ...quizState,
        question: questions[quizState.counter].questionFrench
      });
    }
  };

  // Translate to french
  const switchToFrench = () => {
    if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question:
          'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question:
          'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else if (quizState.answers.length === indexOfBooleanAnswer) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question: questions[quizState.answers.length].questionFrench,
        options: ['Oui', 'Non']
      });
    } else {
      setQuizState({
        ...quizState,
        lang: 'french',
        question: questions[quizState.counter].questionFrench
      });
    }
  };
  // Translate to english
  const switchToEnglish = () => {
    if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      setQuizState({
        ...quizState,
        lang: 'english',
        counter: quizState.counter + 1,
        question:
          'For single people: Do you feel at peace, whole, and complete without a life partner?',
        options: [...Array(11).keys()]
      });
    } else if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      setQuizState({
        ...quizState,
        lang: 'english',
        counter: quizState.counter + 1,
        question:
          'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
        options: [...Array(11).keys()]
      });
    } else if (quizState.answers.length === indexOfBooleanAnswer) {
      setQuizState({
        ...quizState,
        lang: 'english',
        question: questions[indexOfBooleanAnswer].questionEngLish,
        options: ['Yes', 'No']
      });
    } else {
      setQuizState({
        ...quizState,
        lang: 'english',
        question: questions[quizState.counter].questionEngLish
      });
    }
  };
  // Handle get value selected for question
  const handleAnswerSelected = (e) => {
    let target = e.target;
    let index = parseInt(target.value, 10);
    // Object container & save answers after selected answer
    quizState.answers[quizState.counter] = index;
    setQuizState({ ...quizState, answers: quizState.answers });
    console.log('The array of User input: ' + quizState.answers);
    console.log(sumOfUserInput(quizState.answers));
    if (quizState.answers.length === 9 && yesNoQuestion) {
      setInputNum(index + 100);
    } else if (quizState.answers.length === 24) {
      handleSubmitAnswers();
    } else {
      handleNextQuestion(e);
    }
  };
  // Handle next questions & answer
  const handleNextQuestion = (e) => {
    if (
      quizState.answers.length === quizState.counter ||
      quizState.answers.length === 0
    ) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else if (
      quizState.answers.length === indexOfBooleanAnswer &&
      quizState.lang === 'english'
    ) {
      //Set Yes No Question of No.9
      setInputNum('');
      setQuizState({
        ...quizState,
        counter: quizState.counter + 1,
        question: questions[quizState.answers.length].questionEngLish,
        options: ['Yes', 'No']
      });
      createNewObject();
      setYesNoQuestion(true);
    } else if (quizState.answers.length === 9 && quizState.lang === 'french') {
      //Set Yes No Question of No.9
      setInputNum('');
      setQuizState({
        ...quizState,
        counter: quizState.counter + 1,
        question: questions[quizState.answers.length].questionFrench,
        options: ['Oui', 'Non']
      });
      createNewObject();
      setYesNoQuestion(true);
    } else if (
      quizState.answers.length === 10 &&
      quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO &&
      quizState.lang === 'english'
    ) {
      // If the answer of No.9 is "No" and state of language is "english", set this question.
      setQuizState({
        ...quizState,
        question:
          'For single people: Do you feel at peace, whole, and complete without a life partner?',
        options: [...Array(11).keys()]
      });
      setInputNum('');
      setYesNoQuestion(false);
    } else if (
      quizState.answers.length === 10 &&
      quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO &&
      quizState.lang === 'french'
    ) {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuizState({
        ...quizState,
        question:
          'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?',
        options: [...Array(11).keys()]
      });
      setInputNum('');
      setYesNoQuestion(false);
    } else if (
      quizState.answers.length === 10 &&
      quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES &&
      quizState.lang === 'english'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "english", set this question.
      setQuizState({
        ...quizState,
        question:
          'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
        options: [...Array(11).keys()]
      });
      setInputNum('');
      setYesNoQuestion(false);
    } else if (
      quizState.answers.length === 10 &&
      (quizState.answers[9] === quizState.answers[indexOfBooleanAnswer]) ===
        CUSTOM_BOOLEAN.YES &&
      quizState.lang === 'french'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "french", set this question.
      setQuizState({
        ...quizState,
        question:
          'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?',
        options: [...Array(11).keys()]
      });
      setInputNum('');
      setYesNoQuestion(false);
    } else {
      setQuizState({
        ...quizState,
        counter: quizState.counter + 1,
        question:
          quizState.lang === 'english'
            ? questions[quizState.counter + 1].questionEngLish
            : questions[quizState.counter + 1].questionFrench
      });
      setYesNoQuestion(false);
      createNewObject();
      setInputNum('');
    }
  };
  // For a final answer
  const handleSubmitAnswers = () => {
    const answerArray = quizState.answers.length;
    if (answerArray.length === quizState.counter || answerArray === 0) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else {
      createNewObject();

      const finalArray = Array(12)
        .fill()
        .map((_, i) => convertAverageToLength(aveAnswers[i].value));
      setLengthOfBar(finalArray);
      setResult(true);
    }
  };

  // Create new object and add to state of "ans"
  const createNewObject = () => {
    if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      const newObj = {
        category: questions[quizState.counter].category,
        value: quizState.answers[quizState.counter],
        questions: {
          english:
            'For single people: Do you feel at peace, whole, and complete without a life partner?',
          french:
            'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?'
        }
      };
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
      setTotalScore(sumOfUserInput(quizState.answers));
      setColorsOfBars(sumOfUserInput(quizState.answers));
    } else if (quizState.answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      const newObj = {
        category: questions[quizState.counter].category,
        value: quizState.answers[quizState.counter],
        questions: {
          english:
            'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
          french:
            'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?'
        }
      };
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
      setTotalScore(sumOfUserInput(quizState.answers));
      setColorsOfBars(sumOfUserInput(quizState.answers));
    } else {
      const newObj = {
        category: questions[quizState.counter].category,
        value: quizState.answers[quizState.counter],
        questions: {
          english: questions[quizState.counter].questionEngLish,
          french: questions[quizState.counter].questionFrench
        }
      };
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
      setTotalScore(sumOfUserInput(quizState.answers));
      setColorsOfBars(sumOfUserInput(quizState.answers));
    }
  };
  // Check a pair of same name of category. If there is an same name of category, calculate an average of 2 numbers
  const checkPair = (category, value) => {
    ans.filter((_, counter) => {
      const index = Object.keys(ans)[counter];
      if (ans[index].category === category) {
        const averageNum = Math.round((ans[index].value + value) / 2);
        insertLength(category, averageNum);
      }
      return null;
    });
  };
  // Find a same category name in "initialState" of aveAnswers, then insert a calculated average in "checkpair"function
  const insertLength = (category, average) => {
    aveAnswers.filter((_, counter) => {
      const index = Object.keys(aveAnswers)[counter];
      if (aveAnswers[index].category === category) {
        aveAnswers[index].value = average;
      }
      return null;
    });
  };
  // Convert average num to the length of bar
  const convertAverageToLength = (average) => {
    switch (average) {
      case 0:
        return 10;
      case 1:
        return 9;
      case 2:
        return 8;
      case 3:
        return 7;
      case 4:
        return 6;
      case 5:
        return 5;
      case 6:
        return 4;
      case 7:
        return 3;
      case 8:
        return 2;
      case 9:
        return 1;
      case 10:
        return 0;
      default:
        return null;
    }
  };
  // Set colors depends on a total score
  const setColorsOfBars = (totalScore) => {
    if (totalScore === 0) {
      setColors(groupOneColors);
    } else if (totalScore >= 1 && totalScore <= 80) {
      setColors(groupTwoColors);
    } else if (totalScore >= 81 && totalScore <= 120) {
      setColors(groupThreeColors);
    } else if (totalScore >= 121 && totalScore <= 240) {
      setColors(groupFourColors);
    }
  };
  // calculate sum of all answers
  const sumOfUserInput = (selectedAnswers) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return selectedAnswers.reduce(reducer);
  };

  // console.log(quizState);
  // console.log(quizState.answers);

  return (
    <Provider
      value={{
        data,
        series,
        colors,
        result,
        lengthOfBar,
        open,
        setOpen,
        yesNoQuestion,
        totalScore,
        inputNum,
        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish
      }}
    >
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
    </Provider>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(WheelPage);
