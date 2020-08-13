import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { connect } from "react-redux";
import quizQuestions from "../src/data/questions.json";
import QuestionContainer from "../src/components/QuestionContainer/QuestionContainer";
import Chart from "./components/Chart/Chart";
import ModalExample from "./components/QuestionModal/QuestionModal";
import { seriesLabels, groupOneColors, groupTwoColors, groupThreeColors, groupFourColors } from "./constants";
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
  const [lengthOfBar, setLengthOfBar] = useState([]);
  const [series, setSeries] = useState(seriesLabels);
  const [colors, setColors] = useState(groupOneColors);
  const [barHeight, setBarHeight] = useState(200);
  const [counter, setCounter] = useState(0);
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
  const [inputNum, setInputNum] = useState(false);

  useEffect(() => {
    populateArray();
    setLangage();
    //User Input (24 answers)
    console.log(ans);
    //Average Scores before convert to length for chart (12 answers)
    console.log(aveAnswers);
  }, [lengthOfBar, selectedAnwsers])

  const populateArray = () => {
    setData(lengthOfBar);
  };

  // Set languages English or French
  const setLangage = () => {
    if (lang === "english" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionEngLish);
      setApplyButton("Apply");
      setStartButton("Start");
      setInstruction(quizQuestions[0].instructionEnglish);
    } else if (lang === "french" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionFrench);
      setApplyButton("Appliquer");
      setStartButton("Début");
      setInstruction(quizQuestions[0].instructionFrench);
    }
  }

  // Translate to french
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

  // Translate to english
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

  // Handle get value selected for question
  const handleAnswerSelected = (e) => {
    let target = e.target;
    let index = parseInt(target.value, 10);
    // Object container & save anwsers after selected answer
    selectedAnwsers[counter] = index;
    setSelectedAnswers(selectedAnwsers);
    console.log("The array of User input: " + selectedAnwsers);
    setInputNum(index);
    if (selectedAnwsers.length === 9 && yesNoQuestion) {
      setInputNum(index + 100);
    }
    return (
      <>
        {renderQuiz()}
      </>
    )
  };

  // Show a next question and check if it's english or french
  const movingNextQuestion = () => {
    if (lang === "english" && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(quizQuestions[counter + 1].questionEngLish);
    } else if (lang === "french" && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(quizQuestions[counter + 1].questionFrench);
    }
  }

  // Handle next questions & answer
  const handleNextQuestion = (e) => {
    if (selectedAnwsers.length === counter || selectedAnwsers.length === 0) {
      alert("Please input a number. / Veuillez saisir un nombre.");
    } else if (selectedAnwsers.length === 9) {
      //Set Yes No Question of No.9 
      setInputNum("");
      movingNextQuestion();
      setAnwerOptions(quizQuestions[9].answers);
      createNewObject();
      setYesNoQuestion(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "english") {
      // If the answer of No.9 is "No" and state of langage is "english", set this question.
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "french") {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "english") {
      // If the answer of No.9 is "Yes" and state of langage is "english", set this question.
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "french") {
      // If the answer of No.9 is "Yes" and state of langage is "french", set this question.
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
    } else {
      setYesNoQuestion(false);
      movingNextQuestion();
      createNewObject();
      setInputNum("");
    }
  };

  // Create new object and add to state of "ans"
  const createNewObject = () => {
    const newObj = { category: quizQuestions[counter].category, value: selectedAnwsers[counter] }
    let join = ans.concat(newObj);
    setAns(join);
    checkPair(newObj.category, newObj.value);
    sumOfUserInput(ans);
    setColorsOfBars(totalScore);
  }

  // Check a pair of same name of category. If there is an same name of category, calculate an average of 2 numbers 
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

  // Find a same category name in "initialState" of aveAnswers, then insert a calculated average in "checkpair"function
  const insertLength = (category, average) => {
    aveAnswers.filter((ave, counter) => {
      const index = Object.keys(aveAnswers)[counter];
      if (aveAnswers[index].category === category) {
        aveAnswers[index].value = average;
      }
      return null;
    })
  }

  // Convert average num to the length of bar
  const convertAverageToLength = (average) => {
    switch (average) {
      case 0: return 10;
      case 1: return 9;
      case 2: return 8;
      case 3: return 7;
      case 4: return 6;
      case 5: return 5;
      case 6: return 4;
      case 7: return 3;
      case 8: return 2;
      case 9: return 1;
      case 10: return 0;
      default: return null;
    }
  }

  // For a final answer
  const handleSubmitAnswers = () => {
    const answerArray = selectedAnwsers.length;
    if (answerArray.length === counter || answerArray === 0) {
      alert("Please input a number. / Veuillez saisir un nombre.");
    } else {
      createNewObject();
      setData(lengthOfBar);
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
      setResult(true);
    }
  };

  const printDocument = () => {
    const input = document.getElementById('body');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 300;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', [300, 200])
        var position = 20;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save("download.pdf");
      });
  }

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
  }

  // calculate sum of all answers
  const sumOfUserInput = (ans) => {
    var total = 0;
    for (var property in ans) {
      total += ans[property].value;
    }
    return setTotalScore(total);
  }

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
        selectedAnwsers, setSelectedAnswers,
        result, setResult,
        totalQuestion, setTotalQuestion,
        lang, setLang,
        lengthOfBar,
        open, setOpen,
        starter, setStarter,
        applyButton,
        startButton,
        instruction,
        yesNoQuestion,
        totalScore,
        inputNum, setInputNum,

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish,
        onOpenModal,
        printDocument
      }}
    >
      {children}
      <ModalExample />
      <Chart />
    </Provider>
  );
}

// const mapStateToProps = (state) => {
//   console.log('mapping.... ', state.sectionScores);
//   console.log('mapping Average Scores.... ', state.averageScores);
//   return {
//     sectionScores: state,
//     averageScores: state
//   };
// };
// export default connect(mapStateToProps)(App);

export default App;