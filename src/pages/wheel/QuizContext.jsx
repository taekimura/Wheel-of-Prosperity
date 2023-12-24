import React from 'react';

const defaultQuizStateValue = {
  lang: 'english',
  question: '',
  counter: 0,
  options: [...Array(11).keys()],
  answers: [],
  finalData: null
};

const defaultQuizContextValue = {
  quizState: defaultQuizStateValue,
  setQuizState: () => defaultQuizStateValue,
  isBooleanQuiz: false
};

const QuizContext = React.createContext(defaultQuizContextValue);

const indexOfBooleanAnswer = 9;

export const QuizContextProvider = ({ children }) => {
  const [quizState, setQuizState] = React.useState(defaultQuizStateValue);

  const isBooleanQuiz = React.useMemo(
    () => quizState.answers.length === indexOfBooleanAnswer,
    [quizState]
  );

  console.log(quizState.answers.length);

  return (
    <QuizContext.Provider
      value={{
        quizState,
        setQuizState,
        isBooleanQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
