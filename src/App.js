import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas';
import quizQuestions from "./data/questions.json";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import Chart from "./components/Chart/Chart";
import QuestionModal from "./components/QuestionModal/QuestionModal";
import Loading from "./components/Loading/Loading";
import { initialState, seriesLabels, groupOneColors, groupTwoColors, groupThreeColors, groupFourColors } from "./constants";
import firebase from './components/firebase/firebase_utils';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const Context = React.createContext('this is context!');
export const Provider = Context.Provider;


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
  const [applyButton, setApplyButton] = useState("Apply");
  const [startButton, setStartButton] = useState("Start");
  const [instruction, setInstruction] = useState(quizQuestions[0].instructionEnglish);
  const [yesNoQuestion, setYesNoQuestion] = useState(false);
  const [totalScore, setTotalScore] = useState();
  const [inputNum, setInputNum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [englishButtonColor, setEnglishButtonColor] = useState("#babac4");
  const [frenchButtonColor, setFrenchButtonColor] = useState("#babac4");
  const [no, setNo] = useState(false);
  const [yes, setYes] = useState(false);

  useEffect(() => {
    setLangage();
    demoAsyncCall().then(() => setLoading(false));
    setData(lengthOfBar);
    //User Input (24 answers)
    console.log(ans);
    sumOfUserInput(ans)
    //Average Scores before convert to length for chart (12 answers)
    console.log(aveAnswers);
  }, [lengthOfBar, selectedAnwsers])


  const showRoading = () => {
    if (loading) {
      return (
        <>
          <Loading />
          <Chart />
        </>
      )
    } else {
      return (
        <>
          <QuestionModal />
          <Chart />
        </>
      )
    }
  }

  const demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  }

  // Set languages English or French
  const setLangage = () => {
    if (lang === "english" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionEngLish);
      setApplyButton("Apply");
      setStartButton("Start");
      setEnglishButtonColor("#276a7c");
      setInstruction(quizQuestions[0].instructionEnglish);
    } else if (lang === "french" && !yesNoQuestion) {
      setQuestion(quizQuestions[counter].questionFrench);
      setApplyButton("Appliquer");
      setStartButton("Début");
      setInstruction(quizQuestions[0].instructionFrench);
      setFrenchButtonColor("#276a7c");
    }
  }

  // Translate to french
  const switchToFrench = () => {
    if (no) {
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
      setFrenchButtonColor("#276a7c");
      setEnglishButtonColor("#babac4");
    } else if (yes) {
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setAnwerOptions(quizQuestions[0].answers);
      setFrenchButtonColor("#276a7c");
      setEnglishButtonColor("#babac4");
    } else {
      setLang("french");
      setInstruction(quizQuestions[0].instructionFrench)
      setQuestion(quizQuestions[counter].questionFrench);
      setApplyButton("Appliquer");
      setStartButton("Début");
      setFrenchButtonColor("#276a7c");
      setEnglishButtonColor("#babac4");
    }
  };

  // Translate to english
  const switchToEnglish = () => {
    if (no) {
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setAnwerOptions(quizQuestions[0].answers);
      setEnglishButtonColor("#276a7c");
      setFrenchButtonColor("#babac4");
    } else if (yes) {
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setAnwerOptions(quizQuestions[0].answers);
      setEnglishButtonColor("#276a7c");
      setFrenchButtonColor("#babac4");
    } else {
      setLang("english");
      setInstruction(quizQuestions[0].instructionEnglish);
      setQuestion(quizQuestions[counter].questionEngLish);
      setApplyButton("Apply");
      setStartButton("Start");
      setEnglishButtonColor("#276a7c");
      setFrenchButtonColor("#babac4");
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
      setNo(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "french") {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
      setNo(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "english") {
      // If the answer of No.9 is "Yes" and state of langage is "english", set this question.
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
      setYes(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "french") {
      // If the answer of No.9 is "Yes" and state of langage is "french", set this question.
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setInputNum("");
      setAnwerOptions(quizQuestions[0].answers);
      setYesNoQuestion(false);
      setYes(true);
    } else {
      setYesNoQuestion(false);
      movingNextQuestion();
      createNewObject();
      setInputNum("");
      setYes(false);
      setNo(false);
    }
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
      asyncCall();
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

  const sendDataToFirebasePromise = () => {
    return new Promise(resolve => {
      const sendDataToFirebase = () => {
        const createdAt = new Date();
        firebase
          .firestore()
          .collection('results')
          .add({
            ans,
            aveAnswers,
            totalScore,
            createdAt,

          })
      }
      sendDataToFirebase();
      resolve('sent data to firebase!');
    });
  }

  async function asyncCall() {
    createNewObject();
    const result = await sendDataToFirebasePromise();
    console.log(result);
  }

  //Save an image of wheel as a png file 
  const printDocument = () => {
    html2canvas(document.getElementById('body')
      // , {
      //   scale: 1,
      //   width: 1000,
      //   height: 1000,
      // }
    )
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "universalprosperity.png";
        link.click();
        console.log(link);
      });
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
        applyButton,
        startButton,
        instruction,
        yesNoQuestion,
        totalScore,
        inputNum, setInputNum,
        loading,
        englishButtonColor,
        frenchButtonColor,

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish,
        onOpenModal,
        printDocument,
      }}
    >
      {children}
      {showRoading()}
    </Provider>
  );
}

export default App;