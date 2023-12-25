import React from 'react';
import {
  initialState,
  groupOneColors,
  groupTwoColors,
  groupThreeColors,
  groupFourColors,
  indexOfBooleanAnswer,
  CUSTOM_BOOLEAN
} from '../constants';
import questions from '../data/questions.json';

const sumOfUserInput = (arrayOfNum) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return arrayOfNum.length > 0 ? arrayOfNum.reduce(reducer) : 0;
};

const defaultQuizStateValue = {
  question: '',
  counter: 0,
  options: [...Array(11).keys()],
  answers: [],
  finalData: null
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
  const [result, setResult] = React.useState([]);

  const { counter, answers } = quizState;

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

  // Create new object and add to state of "result"
  const createNewObject = () => {
    if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      const newObj = {
        category: questions[counter].category,
        value: answers[counter]
      };
      let join = result.concat(newObj);
      setResult(join);
      checkPair(newObj.category, newObj.value);
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      const newObj = {
        category: questions[counter].category,
        value: answers[counter]
      };
      let join = result.concat(newObj);
      setResult(join);
      checkPair(newObj.category, newObj.value);
    } else {
      const newObj = {
        category: questions[counter].category,
        value: quizState.answers[counter]
      };
      let join = result.concat(newObj);
      setResult(join);
      checkPair(newObj.category, newObj.value);
    }
  };

  // Check a pair of same name of category. If there is an same name of category, calculate an average of 2 numbers
  const checkPair = (category, value) => {
    result.filter((_, counter) => {
      const index = Object.keys(result)[counter];
      if (result[index].category === category) {
        const averageNum = Math.round((result[index].value + value) / 2);
        insertLength(category, averageNum);
      }
      return null;
    });
  };

  // Find a same category name in "initialState", then insert calculated average in "checkPair" function
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
    answers[counter] = index;
    setQuizState({ ...quizState, answers });
    console.log('The array of User input: ' + answers);
    if (answers.length === 24) {
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
    } else if (answers.length === indexOfBooleanAnswer) {
      //Set Yes No Question of No.9
      setQuizState({
        ...quizState,
        counter: counter + 1,
        question: questions[answers.length].questionEngLish,
        options: ['Yes', 'No']
      });
      createNewObject();
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.NO) {
      // If the answer of No.9 is "No", set this question.
      setQuizState({
        ...quizState,
        question:
          'For single people: Do you feel at peace, whole, and complete without a life partner?',
        options: [...Array(11).keys()]
      });
    } else if (answers[indexOfBooleanAnswer] === CUSTOM_BOOLEAN.YES) {
      // If the answer of No.9 is "Yes", set this question.
      setQuizState({
        ...quizState,
        question:
          'With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?',
        options: [...Array(11).keys()]
      });
    } else {
      setQuizState({
        ...quizState,
        counter: counter + 1,
        question: questions[counter + 1].questionEngLish
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
        handleAnswerSelected
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
