import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import quizQuestions from "../src/data/questions.json";
import QuestionWrapped from "../src/components/QuestionWrapped/QuestionWrapped";
import QuestionContainer from "../src/components/QuestionContainer/QuestionContainer";
import Result from "../src/components/Result/Result";
import Chart from "../src/components/Chart";
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

  useEffect(() => {
    populateArray();
    setLangage();
    //User Input (24 answers)
    console.log(ans);
    //Average Scores before convert to length for chart (12 answers)
    console.log(aveAnswers);
  }, [data])
  // If you want the chart's bar to render only in the end of user input, 
  // change dependency from "lengthOfBar" to "data"

  const populateArray = () => {
    setData(lengthOfBar);
  };

  const setLangage = () => {
    if (lang === "english") {
      setQuestion(quizQuestions[counter].questionEngLish);
    } else if (lang === "french") {
      setQuestion(quizQuestions[counter].questionFrench)
    }
  }

  const switchToFrench = () => {
    setLang("french");
    setQuestion(quizQuestions[counter].questionFrench);
  };

  const switchToEnglish = () => {
    setLang("english");
    setQuestion(quizQuestions[counter].questionEngLish);
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
    // setAns([{ category: quizQuestions[counter].category, value: selectedAnwsers[counter] }]);
    console.log("The array of User input: " + selectedAnwsers);
  };

  //handle next questions & answer
  const handleNextQuestion = (e) => {
    if (selectedAnwsers.length === counter || selectedAnwsers.length === 0) {
      alert("Please input a number:)");
    } else if (selectedAnwsers.length === 9) {
      const count = counter + 1;
      const questionIDPlus = questionID + 1;
      setCounter(count);
      setQuestionID(questionIDPlus);
      setAnwerOptions(quizQuestions[9].answers);
      if (lang === "english") {
        setQuestion(quizQuestions[count].questionEngLish)
        const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
        let join = ans.concat(newObj);
        setAns(join);
        checkPair(newObj.category, newObj.value);
      } else if (lang === "french") {
        setQuestion(quizQuestions[count].questionFrench)
        const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
        let join = ans.concat(newObj);
        setAns(join);
        console.log(ans);
        checkPair(newObj.category, newObj.value);
      }
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 1 && lang === "english") {
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 1 && lang === "french") {
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 0 && lang === "english") {
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setAnwerOptions(quizQuestions[0].answers);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 0 && lang === "french") {
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
    } else {
      const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
      const count = counter + 1;
      const questionIDPlus = questionID + 1;
      setCounter(count);
      setQuestionID(questionIDPlus);
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


      if (lang === "english") {
        setQuestion(quizQuestions[count].questionEngLish)
      } else if (lang === "french") {
        setQuestion(quizQuestions[count].questionFrench)
      }
    }
  };


  const checkPair = (category, value) => {
    ans.filter((a, counter) => {
      const index = Object.keys(ans)[counter];
      if (ans[index].category === category) {
        const averageNum = Math.round((ans[index].value + value) / 2);
        console.log("Category: " + ans[index].category, "Average num:" + averageNum + "calculated!");
        insertLength(category, averageNum);
      }
      return;
    })
  }

  const insertLength = (category, average) => {
    aveAnswers.filter((ave, counter) => {
      const index = Object.keys(aveAnswers)[counter];
      if (aveAnswers[index].category === category) {
        aveAnswers[index].value = average;
      }
      return;
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
      // let joinedLength = lengthOfBar.concat(LengthArray);
      setAverageAnswers(joinedAverage);
      // setLengthOfBar(joinedLength);
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
      const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
      let join = ans.concat(newObj);
      setAns(join);
      checkPair(newObj.category, newObj.value);
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

  const showResult = () => {
    return <Result />;
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

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish,
      }}
    >
      {children}
      <Chart />
      <QuestionWrapped />
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