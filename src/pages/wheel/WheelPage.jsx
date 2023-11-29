import React, { useState, useEffect } from 'react';
import questions from '../../data/questions.json';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
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
import 'bootstrap/dist/css/bootstrap.min.css';

export const Context = React.createContext('this is context!');
export const Provider = Context.Provider;

const WheelPage = ({ children, currentUser }) => {
  // For setting loading and languages
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('english');

  // For the chart section
  const [lengthOfBar, setLengthOfBar] = useState([]);
  const [series] = useState(seriesLabels);
  const [colors, setColors] = useState(groupOneColors);

  // For the user input data
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [aveAnswers] = useState(initialState);
  const [ans, setAns] = useState([]);
  const [data, setData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  // For the questionnaire section
  const [no, setNo] = useState(false);
  const [yes, setYes] = useState(false);
  const [yesNoQuestion, setYesNoQuestion] = useState(false);
  const [open, setOpen] = useState(true);
  const [instruction, setInstruction] = useState(
    questions[0].explanationEnglish
  );
  const [explanation, setExplanation] = useState(
    questions[0].instructionEnglish
  );
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState();
  const [inputNum, setInputNum] = useState(false);
  const [answerOptions, setAnswerOptions] = useState(questions[0].answers);
  const [totalQuestion] = useState(questions.length);
  const [result, setResult] = useState(false);

  // For Buttons and styles
  const [title, setTitle] = useState('PROSPERITY QUIZ');
  const [applyButton, setApplyButton] = useState('Apply');
  const [startButton, setStartButton] = useState('Start');
  const [englishButtonColor, setEnglishButtonColor] = useState('#babac4');
  const [frenchButtonColor, setFrenchButtonColor] = useState('#babac4');

  useEffect(() => {
    demoAsyncCall().then(() => setLoading(false));
    setLanguage();
    setData(lengthOfBar);
    console.log(ans);
    console.log(aveAnswers);
  }, [lengthOfBar, selectedAnswers]);

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
          selectedAnswers.length > 0 ? sumOfUserInput(selectedAnswers) : null;
        const displayName = currentUser.displayName;
        const email = currentUser.email;
        const role = currentUser.role;
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

  const showLoading = () => {
    if (loading) {
      return (
        <>
          <Loading />
          <Chart />
        </>
      );
    } else {
      return (
        <>
          <QuestionModal />
          <Chart />
        </>
      );
    }
  };
  // Set languages English or French
  const setLanguage = () => {
    if (lang === 'english' && !yesNoQuestion) {
      setQuestion(questions[counter].questionEngLish);
      setTitle('PROSPERITY QUIZ');
      setApplyButton('Apply');
      setStartButton('Start');
      setEnglishButtonColor('#276a7c');
      setInstruction(questions[0].instructionEnglish);
      setExplanation(questions[0].explanationEnglish);
    } else if (lang === 'french' && !yesNoQuestion) {
      setQuestion(questions[counter].questionFrench);
      setTitle('QUIZ PROSPÉRITÉ');
      setApplyButton('Appliquer');
      setStartButton('Début');
      setInstruction(questions[0].instructionFrench);
      setExplanation(questions[0].explanationFrench);
      setFrenchButtonColor('#276a7c');
    }
  };
  // Translate to french
  const switchToFrench = () => {
    if (no) {
      setLang('french');
      setQuestion(
        'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?'
      );
      setExplanation(questions[0].explanationFrench);
      setAnswerOptions(questions[0].answers);
      setFrenchButtonColor('#276a7c');
      setEnglishButtonColor('#babac4');
    } else if (yes) {
      setLang('french');
      setQuestion(
        'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?'
      );
      setExplanation(questions[0].explanationFrench);
      setAnswerOptions(questions[0].answers);
      setFrenchButtonColor('#276a7c');
      setEnglishButtonColor('#babac4');
    } else if (selectedAnswers.length === 9) {
      setLang('french');
      setExplanation(questions[0].explanationFrench);
      setQuestion(questions[9].questionFrench);
      setAnswerOptions(questions[9].answersFren);
      setFrenchButtonColor('#276a7c');
      setEnglishButtonColor('#babac4');
    } else {
      setLang('french');
      setTitle('QUIZ PROSPÉRITÉ');
      setInstruction(questions[0].instructionFrench);
      setExplanation(questions[0].explanationFrench);
      setQuestion(questions[counter].questionFrench);
      setApplyButton('Appliquer');
      setStartButton('Début');
      setFrenchButtonColor('#276a7c');
      setEnglishButtonColor('#babac4');
    }
  };
  // Translate to english
  const switchToEnglish = () => {
    if (no) {
      setLang('english');
      setQuestion(
        'For single people: Do you feel at peace, whole, and complete without a life partner?'
      );
      setExplanation(questions[0].explanationEnglish);
      setAnswerOptions(questions[0].answers);
      setEnglishButtonColor('#276a7c');
      setFrenchButtonColor('#babac4');
    } else if (yes) {
      setLang('english');
      setQuestion(
        'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?'
      );
      setExplanation(questions[0].explanationEnglish);
      setAnswerOptions(questions[0].answers);
      setEnglishButtonColor('#276a7c');
      setFrenchButtonColor('#babac4');
    } else if (selectedAnswers.length === 9) {
      setLang('english');
      setExplanation(questions[0].explanationEnglish);
      setQuestion(questions[9].questionEngLish);
      setAnswerOptions(questions[9].answersEng);
      setEnglishButtonColor('#276a7c');
      setFrenchButtonColor('#babac4');
    } else {
      setLang('english');
      setTitle('PROSPERITY QUIZ');
      setInstruction(questions[0].instructionEnglish);
      setExplanation(questions[0].explanationEnglish);
      setQuestion(questions[counter].questionEngLish);
      setApplyButton('Apply');
      setStartButton('Start');
      setEnglishButtonColor('#276a7c');
      setFrenchButtonColor('#babac4');
    }
  };
  // Handle get value selected for question
  const handleAnswerSelected = (e) => {
    let target = e.target;
    let index = parseInt(target.value, 10);
    // Object container & save answers after selected answer
    selectedAnswers[counter] = index;
    setSelectedAnswers(selectedAnswers);
    console.log('The array of User input: ' + selectedAnswers);
    console.log(sumOfUserInput(selectedAnswers));
    if (selectedAnswers.length === 9 && yesNoQuestion) {
      setInputNum(index + 100);
    } else if (selectedAnswers.length === 24) {
      handleSubmitAnswers();
    } else {
      handleNextQuestion(e);
    }
  };
  // Handle next questions & answer
  const handleNextQuestion = (e) => {
    if (selectedAnswers.length === counter || selectedAnswers.length === 0) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else if (selectedAnswers.length === 9 && lang === 'english') {
      //Set Yes No Question of No.9
      setInputNum('');
      movingNextQuestion();
      setAnswerOptions(questions[9].answersEng);
      createNewObject();
      setYesNoQuestion(true);
    } else if (selectedAnswers.length === 9 && lang === 'french') {
      //Set Yes No Question of No.9
      setInputNum('');
      movingNextQuestion();
      setAnswerOptions(questions[9].answersFren);
      createNewObject();
      setYesNoQuestion(true);
    } else if (
      selectedAnswers.length === 10 &&
      selectedAnswers[9] === 101 &&
      lang === 'english'
    ) {
      // If the answer of No.9 is "No" and state of language is "english", set this question.
      setQuestion(
        'For single people: Do you feel at peace, whole, and complete without a life partner?'
      );
      setInputNum('');
      setAnswerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setNo(true);
    } else if (
      selectedAnswers.length === 10 &&
      selectedAnswers[9] === 101 &&
      lang === 'french'
    ) {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuestion(
        'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?'
      );
      setInputNum('');
      setAnswerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setNo(true);
    } else if (
      selectedAnswers.length === 10 &&
      selectedAnswers[9] === 100 &&
      lang === 'english'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "english", set this question.
      setQuestion(
        'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?'
      );
      setInputNum('');
      setAnswerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setYes(true);
    } else if (
      selectedAnswers.length === 10 &&
      selectedAnswers[9] === 100 &&
      lang === 'french'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "french", set this question.
      setQuestion(
        'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?'
      );
      setInputNum('');
      setAnswerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setYes(true);
    } else {
      setYesNoQuestion(false);
      movingNextQuestion();
      createNewObject();
      setInputNum('');
      setYes(false);
      setNo(false);
    }
  };
  // For a final answer
  const handleSubmitAnswers = () => {
    const answerArray = selectedAnswers.length;
    if (answerArray.length === counter || answerArray === 0) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else {
      createNewObject();
      const finalArray = [
        convertAverageToLength(aveAnswers[0].value),
        convertAverageToLength(aveAnswers[1].value),
        convertAverageToLength(aveAnswers[2].value),
        convertAverageToLength(aveAnswers[3].value),
        convertAverageToLength(aveAnswers[4].value),
        convertAverageToLength(aveAnswers[5].value),
        convertAverageToLength(aveAnswers[6].value),
        convertAverageToLength(aveAnswers[7].value),
        convertAverageToLength(aveAnswers[8].value),
        convertAverageToLength(aveAnswers[9].value),
        convertAverageToLength(aveAnswers[10].value),
        convertAverageToLength(aveAnswers[11].value)
      ];
      setLengthOfBar(finalArray);
      setResult(true);
    }
  };
  // Show a next question and check if it's english or french
  const movingNextQuestion = () => {
    if (lang === 'english' && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(questions[counter + 1].questionEngLish);
    } else if (lang === 'french' && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(questions[counter + 1].questionFrench);
    }
  };
  // Create new object and add to state of "ans"
  const createNewObject = () => {
    if (no) {
      const newObj = {
        category: questions[counter].category,
        value: selectedAnswers[counter],
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
      setTotalScore(sumOfUserInput(selectedAnswers));
      setColorsOfBars(sumOfUserInput(selectedAnswers));
    } else if (yes) {
      const newObj = {
        category: questions[counter].category,
        value: selectedAnswers[counter],
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
      setTotalScore(sumOfUserInput(selectedAnswers));
      setColorsOfBars(sumOfUserInput(selectedAnswers));
    } else {
      const newObj = {
        category: questions[counter].category,
        value: selectedAnswers[counter],
        questions: {
          english: questions[counter].questionEngLish,
          french: questions[counter].questionFrench
        }
      };
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
      setTotalScore(sumOfUserInput(selectedAnswers));
      setColorsOfBars(sumOfUserInput(selectedAnswers));
    }
  };
  // Check a pair of same name of category. If there is an same name of category, calculate an average of 2 numbers
  const checkPair = (category, value) => {
    ans.filter((a, counter) => {
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
    aveAnswers.filter((ave, counter) => {
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
  const renderQuiz = () => {
    return <QuestionContainer />;
  };

  const showResult = () => {
    setOpen(false);
  };

  return (
    <Provider
      value={{
        title,
        data,
        series,
        colors,
        question,
        answerOptions,
        counter,
        selectedAnswers,
        result,
        totalQuestion,
        lang,
        lengthOfBar,
        open,
        applyButton,
        startButton,
        instruction,
        explanation,
        yesNoQuestion,
        totalScore,
        inputNum,
        englishButtonColor,
        frenchButtonColor,

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish
      }}
    >
      {children}
      {showLoading()}
    </Provider>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(WheelPage);
