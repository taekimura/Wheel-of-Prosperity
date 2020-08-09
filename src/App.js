import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import quizQuestions from "../src/data/questions.json";
import QuestionContainer from "../src/components/QuestionContainer/QuestionContainer";
import Chart from "./components/Chart/Chart";
import ModalExample from "./components/QuestionModal/QuestionModal";
import { seriesLabels, groupOneColors } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const Context = React.createContext('this is context!');
export const Provider = Context.Provider;

const initialState = [
  { category: "Rejuvenation", value: 10 },
  { category: "Embrace", value: 10 },
  { category: "Lifestyle", value: 10 },
  { category: "Self", value: 10 },
  { category: "Relationship", value: 10 },
  { category: "Family", value: 10 },
  { category: "Inspiration", value: 10 },
  { category: "Creativity", value: 10 },
  { category: "Health", value: 10 },
  { category: "Money", value: 10 },
  { category: "Work", value: 10 },
  { category: "Expansion", value: 10 }
];

const App = ({ children }) => {
  const [data, setData] = useState([]);
  const [aveAnswers] = useState(initialState);
  const [ans, setAns] = useState([]);
  const [averageAnswers, setAverageAnswers] = useState([]);
  const [test, setTest] = useState([]);
  const [lengthOfBar, setLengthOfBar] = useState([]);
  const [series, setSeries] = useState(seriesLabels);
  const [colors, setColors] = useState(groupOneColors);
  const [barHeight, setBarHeight] = useState(200);
  const [counter, setCounter] = useState(0);
  const [questionID, setQuestionID] = useState(1);
  const [selectedAnwsers, setSelectedAnswers] = useState([]);
  const [question, setQuestion] = useState();
  const [anwserOptions, setAnwerOptions] = useState(quizQuestions[0].answers);
  const [allQuestion, setAllQuestion] = useState(quizQuestions);
  const [totalQuestion, setTotalQuestion] = useState(allQuestion.length);
  const [result, setResult] = useState(false);
  const [lang, setLang] = useState("english");
  const [open, setOpen] = useState(true);
  const [starter, setStarter] = useState(false);
  const [applyButton, setApplyButton] = useState("Apply");
  const [startButton, setStartButton] = useState("Start");
  const [instruction, setInstruction] = useState(quizQuestions[0].instructionEnglish);
  const [yesNoQuestion, setYesNoQuestion] = useState(false);
  const [totalScore, setTotalScore] = useState();

  useEffect(() => {
    populateArray();
    setLangage();
    //User Input (24 answers)
    console.log(ans);
    //Average Scores before convert to length for chart (12 answers)
    console.log(aveAnswers);
    console.log(setTotalScore(sumOfUserInput(ans)));
  }, [lengthOfBar])
  // If you want the chart's bar to render only in the end of user input, 
  // change dependency from "lengthOfBar" to "data"

  const populateArray = () => {
    setData(lengthOfBar);
  };

  const setLangage = () => {
    if (lang === "english" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionEngLish);
      setApplyButton("Appliquer");
      setStartButton("Start");
      setInstruction(quizQuestions[0].instructionEnglish);
    } else if (lang === "french" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionFrench);
      setApplyButton("Apply");
      setStartButton("Début");
      setInstruction(quizQuestions[0].instructionFrench);
    }
  }

  const switchToFrench = () => {
    if (yesNoQuestion && selectedAnwsers[9] === 101) {
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (yesNoQuestion && selectedAnwsers[9] === 100) {
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else {
      setLang("french");
      setInstruction(quizQuestions[0].instructionFrench)
      setQuestion(quizQuestions[counter].questionFrench);
      setApplyButton("Appliquer");
      setStartButton("Début");
    }
  };

  const switchToEnglish = () => {
    if (yesNoQuestion && selectedAnwsers[9] === 101) {
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (yesNoQuestion && selectedAnwsers[9] === 100) {
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else {
      setLang("english");
      setInstruction(quizQuestions[0].instructionEnglish);
      setQuestion(quizQuestions[counter].questionEngLish);
      setApplyButton("Apply");
      setStartButton("Start");
    }
  };

  //handle get value selected for question
  const handleAnswerSelected = (e) => {
    let target = e.target;
    let objSelected = selectedAnwsers;
    let index = parseInt(target.value, 10);
    let quantityIndex = counter;
    //object container & save anwsers after selected answer
    objSelected[quantityIndex] = index;
    setSelectedAnswers(objSelected);
    console.log("The array of User input: " + selectedAnwsers);
  };

  //handle next questions & answer
  const handleNextQuestion = (e) => {
    if (selectedAnwsers.length === counter || selectedAnwsers.length === 0) {
      alert("Please input a number:)");
    } else if (selectedAnwsers.length === 9) {
      setCounter(counter + 1);
      setQuestionID(questionID + 1);
      setAnwerOptions(quizQuestions[9].answers);
      setYesNoQuestion(true);
      if (lang === "english") {
        setQuestion(quizQuestions[counter + 1].questionEngLish)
        createNewObject();
      } else if (lang === "french") {
        setQuestion(quizQuestions[counter + 1].questionFrench);
        createNewObject();
      }
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "english") {
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "french") {
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "english") {
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "french") {
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else {
      setYesNoQuestion(false);
      createNewObject();
      setCounter(counter + 1);
      setQuestionID(questionID + 1);
      pushArray();
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
        convertAverageToLength(aveAnswers[11].value),
      ];
      setLengthOfBar(finalArray);
      setTest(finalArray);
    }
  };

  const createNewObject = () => {
    const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
    let join = ans.concat(newObj);
    setAns(join);
    checkPair(newObj.category, newObj.value);
  }

  const sumOfUserInput = (ans) => {
    var total = 0;
    for (var property in ans) {
      total += ans[property].value;
    }
    return total;
  }

  const checkPair = (category, value) => {
    ans.filter((a, counter) => {
      const index = Object.keys(ans)[counter];
      if (ans[index].category === category) {
        const averageNum = Math.round((ans[index].value + value) / 2);
        insertLength(category, averageNum);
      }
      return null;
    })
  }


  const insertLength = (category, average) => {
    aveAnswers.filter((ave, counter) => {
      const index = Object.keys(aveAnswers)[counter];
      if (aveAnswers[index].category === category) {
        aveAnswers[index].value = average;
      }
      return null;
    })
  }

  const pushArray = () => {
    if (selectedAnwsers.length % 2 === 0) {
      var lastTwoNum = selectedAnwsers.slice(-2);
      let averageCal =
        lastTwoNum.reduce((pre, curr) => {
          return pre + curr;
        }, 0) / lastTwoNum.length;

      // This is an array of the length to draw bars
      let LengthArray = [];
      // This is an array of averages
      let AverageArray = [];

      let average = Math.round(averageCal);
      AverageArray.push(average);
      LengthArray.push(convertAverageToLength(average));
      let joinedAverage = averageAnswers.concat(AverageArray);
      setAverageAnswers(joinedAverage);
    }
  }

  const convertAverageToLength = (average) => {
    if (average === 0) {
      return 10;
    } else if (average === 1) {
      return 9;
    } else if (average === 2) {
      return 8;
    } else if (average === 3) {
      return 7;
    } else if (average === 4) {
      return 6;
    } else if (average === 5) {
      return 5;
    } else if (average === 6) {
      return 4;
    } else if (average === 7) {
      return 3;
    } else if (average === 8) {
      return 2;
    } else if (average === 9) {
      return 1;
    } else if (average === 10) {
      return 0;
    }
  }

  const handleSubmitAnswers = () => {
    const answerArray = selectedAnwsers.length;
    if (answerArray.length === counter || answerArray === 0) {
      alert("Please input a number:)");
    } else {
      createNewObject();
      setData(lengthOfBar);
      setResult(true);
      pushArray();
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
        convertAverageToLength(aveAnswers[11].value),
      ];
      console.log("finalScoreforChart" + finalArray);
      setLengthOfBar(finalArray);
      setTest(finalArray);
    }
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const showResult = () => {
    setOpen(false);
  };

  const renderQuiz = () => {
    return (
      <QuestionContainer />
    );
  }

  return (
    <Provider
      value={{
        data, setData,
        series, setSeries,
        colors, setColors,
        barHeight, setBarHeight,
        averageAnswers, setAverageAnswers,
        question, setQuestion,
        anwserOptions, setAnwerOptions,
        allQuestion, setAllQuestion,
        counter, setCounter,
        questionID, setQuestionID,
        selectedAnwsers, setSelectedAnswers,
        result, setResult,
        totalQuestion, setTotalQuestion,
        lang, setLang,
        test,
        open, setOpen,
        starter, setStarter,
        applyButton,
        startButton,
        instruction,
        yesNoQuestion,
        totalScore,

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish,
        onOpenModal,
      }}
    >
      {children}
      <ModalExample />
      <Chart />
      {/* <QuestionWrapped /> */}
    </Provider>
  );
}

const mapStateToProps = (state) => {
  console.log('mapping.... ', state.sectionScores);
  console.log('mapping Average Scores.... ', state.averageScores);
  return {
    sectionScores: state,
    averageScores: state
  };
};

export default connect(mapStateToProps)(App);