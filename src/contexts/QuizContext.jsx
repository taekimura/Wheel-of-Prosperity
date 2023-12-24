import React from 'react';
import {
  initialState,
  groupOneColors,
  groupTwoColors,
  groupThreeColors,
  groupFourColors
} from '../constants';
import questions from '../data/questions.json';

const indexOfBooleanAnswer = 9;
const CUSTOM_BOOLEAN = {
  YES: 100,
  NO: 101
};

const sumOfUserInput = (arrayOfNum) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arrayOfNum.length > 0 ? arrayOfNum.reduce(reducer) : 0;
};

const defaultQuizStateValue = {
  lang: 'english',
  question: '',
  counter: 0,
  options: [...Array(11).keys()],
  answers: [],
  finalData: null,
  answerWithCategories: []
};

const defaultQuizContextValue = {
  quizState: defaultQuizStateValue,
  setQuizState: () => defaultQuizStateValue,
  isBooleanQuiz: false,
  handleAnswerSelected: () => null,
  switchToEnglish: () => null,
  switchToFrench: () => null
};

const QuizContext = React.createContext(defaultQuizContextValue);

export const QuizContextProvider = ({ children }) => {
  const [quizState, setQuizState] = React.useState(defaultQuizStateValue);
  const [ans, setAns] = React.useState([]);

  const { lang, counter, answers } = quizState;

  const isBooleanQuiz = React.useMemo(
    () => quizState.answers.length === indexOfBooleanAnswer,
    [quizState]
  );

  const totalScore = React.useMemo(
    () => sumOfUserInput(quizState.answers),
    [quizState.answers]
  );

  // Get colors depends on a total score
  const getColorsOfBars = (totalScore) => {
    if (totalScore === 0) {
      return groupOneColors;
    } else if (totalScore >= 1 && totalScore <= 80) {
      return groupTwoColors;
    } else if (totalScore >= 81 && totalScore <= 120) {
      return groupThreeColors;
    } else if (totalScore >= 121 && totalScore <= 240) {
      return groupFourColors;
    }
  };

  const colors = React.useMemo(() => getColorsOfBars(totalScore), [totalScore]);

  // Translate to french
  const switchToFrench = () => {
    if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question:
          'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question:
          'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else if (answers.length === indexOfBooleanAnswer) {
      setQuizState({
        ...quizState,
        lang: 'french',
        question: questions[answers.length].questionFrench,
        options: ['Oui', 'Non']
      });
    } else {
      setQuizState({
        ...quizState,
        lang: 'french',
        question: questions[counter].questionFrench
      });
    }
  };

  // Translate to english
  const switchToEnglish = () => {
    if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      setQuizState({
        ...quizState,
        lang: 'english',
        counter: counter + 1,
        question:
          'For single people: Do you feel at peace, whole, and complete without a life partner?',
        options: [...Array(11).keys()]
      });
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      setQuizState({
        ...quizState,
        lang: 'english',
        counter: counter + 1,
        question:
          'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
        options: [...Array(11).keys()]
      });
    } else if (answers.length === indexOfBooleanAnswer) {
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
        question: questions[counter].questionEngLish
      });
    }
  };

  // Create new object and add to state of "ans"
  const createNewObject = () => {
    if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      const newObj = {
        category: questions[counter].category,
        value: answers[counter],
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
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      const newObj = {
        category: questions[counter].category,
        value: answers[counter],
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
    } else {
      const newObj = {
        category: questions[counter].category,
        value: quizState.answers[counter],
        questions: {
          english: questions[counter].questionEngLish,
          french: questions[counter].questionFrench
        }
      };
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
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

  // Find a same category name in "initialState", then insert a calculated average in "checkpair" function
  const insertLength = (category, average) => {
    initialState.filter((_, counter) => {
      const index = Object.keys(initialState)[counter];
      if (initialState[index].category === category) {
        initialState[index].value = average;
      }
      return null;
    });
  };

  // Handle get value selected for question
  const handleAnswerSelected = (e) => {
    let target = e.target;
    let index = parseInt(target.value, 10);
    // Object container & save answers after selected answer
    answers[counter] = index;
    setQuizState({ ...quizState, answers });
    console.log('The array of User input: ' + answers);
    if (answers[0] === 'Yes' || answers[0] === 'Oui') {
    } else if (answers.length === 24) {
      handleSubmitAnswers();
    } else {
      handleNextQuestion(e);
    }
  };

  const handleSubmitAnswers = () => {
    if (answers.length === counter || answers.length === 0) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else {
      createNewObject();

      const finalArray = Array(12)
        .fill()
        .map((_, i) => Math.abs(10 - initialState[i].value));
      setQuizState({ ...quizState, finalData: finalArray });
    }
  };

  // Handle next questions & answer
  const handleNextQuestion = () => {
    if (answers.length === counter || answers.length === 0) {
      alert('Please input a number. / Veuillez saisir un nombre.');
    } else if (answers.length === indexOfBooleanAnswer && lang === 'english') {
      //Set Yes No Question of No.9
      setQuizState({
        ...quizState,
        counter: counter + 1,
        question: questions[answers.length].questionEngLish,
        options: ['Yes', 'No']
      });
      createNewObject();
    } else if (answers.length === 9 && lang === 'french') {
      //Set Yes No Question of No.9
      setQuizState({
        ...quizState,
        counter: counter + 1,
        question: questions[answers.length].questionFrench,
        options: ['Oui', 'Non']
      });
      createNewObject();
    } else if (
      answers.length === 10 &&
      answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO &&
      lang === 'english'
    ) {
      // If the answer of No.9 is "No" and state of language is "english", set this question.
      setQuizState({
        ...quizState,
        question:
          'For single people: Do you feel at peace, whole, and complete without a life partner?',
        options: [...Array(11).keys()]
      });
    } else if (
      answers.length === 10 &&
      answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO &&
      lang === 'french'
    ) {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuizState({
        ...quizState,
        question:
          'Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else if (
      answers.length === 10 &&
      answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES &&
      lang === 'english'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "english", set this question.
      setQuizState({
        ...quizState,
        question:
          'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
        options: [...Array(11).keys()]
      });
    } else if (
      answers.length === 10 &&
      answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES &&
      lang === 'french'
    ) {
      // If the answer of No.9 is "Yes" and state of language is "french", set this question.
      setQuizState({
        ...quizState,
        question:
          'En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?',
        options: [...Array(11).keys()]
      });
    } else {
      setQuizState({
        ...quizState,
        counter: counter + 1,
        question:
          lang === 'english'
            ? questions[counter + 1].questionEngLish
            : questions[counter + 1].questionFrench
      });
      createNewObject();
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizState,
        setQuizState,
        isBooleanQuiz,
        totalScore,
        colors,
        handleAnswerSelected,
        switchToEnglish,
        switchToFrench
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
