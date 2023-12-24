import React from 'react';

const defaultQuizStateValue = {
  lang: 'english',
  question: '',
  counter: 0,
  options: [...Array(11).keys()],
  answers: []
};

const defaultQuizContextValue = {
  quizState: defaultQuizStateValue,
  setQuizState: () => defaultQuizStateValue
};

const QuizContext = React.createContext(defaultQuizContextValue);

export const QuizContextProvider = ({ children }) => {
  const [quizState, setQuizState] = React.useState(defaultQuizStateValue);

  return (
    <QuizContext.Provider
      value={{
        quizState,
        setQuizState
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
