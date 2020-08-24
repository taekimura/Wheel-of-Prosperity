import React, { useState, useEffect } from "react";
import questions from "./data/questions.json";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import Chart from "./components/Chart/Chart";
import QuestionModal from "./components/Modal/Modal";
import Loading from "./components/Loading/Loading";
import Form from "./components/Form/Form";
import html2canvas from 'html2canvas';
import { initialState, seriesLabels, groupOneColors, groupTwoColors, groupThreeColors, groupFourColors } from "./constants";
import firebase from './components/firebase/firebase_utils';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const Context = React.createContext('this is context!');
export const Provider = Context.Provider;

const App = ({ children }) => {
  // For setting loading and languages
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("french");

  // For the chart section
  const [lengthOfBar, setLengthOfBar] = useState([]);
  const [series] = useState(seriesLabels);
  const [colors, setColors] = useState(groupOneColors);

  // For the user input data
  const [selectedAnwsers, setSelectedAnswers] = useState([]);
  const [aveAnswers] = useState(initialState);
  const [ans, setAns] = useState([]);
  const [data, setData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [image, setImage] = useState("");

  // For the questionnaire section
  const [no, setNo] = useState(false);
  const [yes, setYes] = useState(false);
  const [yesNoQuestion, setYesNoQuestion] = useState(false);
  const [open, setOpen] = useState(true);
  const [instruction, setInstruction] = useState(questions[0].explanationEnglish);
  const [explanation, setExplanation] = useState(questions[0].instructionEnglish);
  const [counter, setCounter] = useState(0);
  const [question, setQuestion] = useState();
  const [inputNum, setInputNum] = useState(false);
  const [anwserOptions, setAnwerOptions] = useState(questions[0].answers);
  const [totalQuestion] = useState(questions.length);
  const [result, setResult] = useState(false);

  // For Buttons and styles
  const [title, setTitle] = useState("PROSPERITY QUIZ");
  const [applyButton, setApplyButton] = useState("Apply");
  const [startButton, setStartButton] = useState("Start");
  const [englishButtonColor, setEnglishButtonColor] = useState("#babac4");
  const [frenchButtonColor, setFrenchButtonColor] = useState("#babac4");

  useEffect(() => {
    demoAsyncCall().then(() => setLoading(false));
    setLangage();
    setData(lengthOfBar);
    console.log(ans);
    console.log(aveAnswers);
  }, [lengthOfBar, selectedAnwsers]);

  const demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  }

  const sendDataToFirebasePromise = () => {
    return new Promise(resolve => {
      const sendDataToFirebase = () => {
        const createdAt = new Date();
        const total = sumOfUserInput(selectedAnwsers);

        firebase
          .firestore()
          .collection('results')
          .add({
            aveAnswers,
            total,
            createdAt,
          })
      }
      sendDataToFirebase();
      resolve('Sent data to the firebase');
    });
  }

  async function asyncCall() {
    createNewObject();
    const result = await sendDataToFirebasePromise();
    console.log(result);
  }

  const showLoading = () => {
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
          <Form />
        </>
      )
    }
  }

  // Set languages English or French
  const setLangage = () => {
    if (lang === "english" && !yesNoQuestion) {
      setQuestion(questions[counter].questionEngLish);
      setTitle("PROSPERITY QUIZ");
      setApplyButton("Apply");
      setStartButton("Start");
      setEnglishButtonColor("#276a7c");
      setInstruction(questions[0].instructionEnglish);
      setExplanation(questions[0].explanationEnglish);
    } else if (lang === "french" && !yesNoQuestion) {
      setQuestion(questions[counter].questionFrench);
      setTitle("QUIZ PROSPÉRITÉ");
      setApplyButton("Appliquer");
      setStartButton("Début");
      setInstruction(questions[0].instructionFrench);
      setExplanation(questions[0].explanationFrench);
      setFrenchButtonColor("#276a7c");
    }
  }

  // Translate to french
  const switchToFrench = () => {
    if (no) {
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setExplanation(questions[0].explanationFrench);
      setAnwerOptions(questions[0].answers);
      setFrenchButtonColor("#276a7c");
      setEnglishButtonColor("#babac4");
    } else if (yes) {
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setExplanation(questions[0].explanationFrench);
      setAnwerOptions(questions[0].answers);
      setFrenchButtonColor("#276a7c");
      setEnglishButtonColor("#babac4");
    } else {
      setLang("french");
      setTitle("QUIZ PROSPÉRITÉ");
      setInstruction(questions[0].instructionFrench);
      setExplanation(questions[0].explanationFrench);
      setQuestion(questions[counter].questionFrench);
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
      setExplanation(questions[0].explanationEnglish);
      setAnwerOptions(questions[0].answers);
      setEnglishButtonColor("#276a7c");
      setFrenchButtonColor("#babac4");
    } else if (yes) {
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setExplanation(questions[0].explanationEnglish);
      setAnwerOptions(questions[0].answers);
      setEnglishButtonColor("#276a7c");
      setFrenchButtonColor("#babac4");
    } else {
      setLang("english");
      setTitle("PROSPERITY QUIZ");
      setInstruction(questions[0].instructionEnglish);
      setExplanation(questions[0].explanationEnglish);
      setQuestion(questions[counter].questionEngLish);
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
    console.log(sumOfUserInput(selectedAnwsers));
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
      setAnwerOptions(questions[9].answers);
      createNewObject();
      setYesNoQuestion(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "english") {
      // If the answer of No.9 is "No" and state of langage is "english", set this question.
      setQuestion("For single people: Do you feel at peace, whole, and complete without a life partner?");
      setInputNum("");
      setAnwerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setNo(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 101 && lang === "french") {
      // If the answer of No.9 is "No" and state of langage is "french", set this question.
      setQuestion("Pour personnes seules: Vous sentez-vous en paix, entier et complet sans partenaire de vie?");
      setInputNum("");
      setAnwerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setNo(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "english") {
      // If the answer of No.9 is "Yes" and state of langage is "english", set this question.
      setQuestion("With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?");
      setInputNum("");
      setAnwerOptions(questions[0].answers);
      setYesNoQuestion(false);
      setYes(true);
    } else if (selectedAnwsers.length === 10 && selectedAnwsers[9] === 100 && lang === "french") {
      // If the answer of No.9 is "Yes" and state of langage is "french", set this question.
      setQuestion("En couple: Vous sentez-vous en paix, entier et complet sans la présence de votre partenaire de vie?");
      setInputNum("");
      setAnwerOptions(questions[0].answers);
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

  // Show a next question and check if it's english or french
  const movingNextQuestion = () => {
    if (lang === "english" && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(questions[counter + 1].questionEngLish);
    } else if (lang === "french" && !yesNoQuestion) {
      setCounter(counter + 1);
      setQuestion(questions[counter + 1].questionFrench);
    }
  }

  // Create new object and add to state of "ans"
  const createNewObject = () => {
    const newObj = { category: questions[counter].category, value: selectedAnwsers[counter] }
    let join = ans.concat(newObj);
    setAns(join);
    checkPair(newObj.category, newObj.value);
    setTotalScore(sumOfUserInput(selectedAnwsers));
    setColorsOfBars(sumOfUserInput(selectedAnwsers))
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
  const sumOfUserInput = (selectedAnwsers) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return selectedAnwsers.reduce(reducer);
  }

  // const onOpenModal = () => {
  //   setOpen(true);
  // };

  const renderQuiz = () => {
    return (
      <QuestionContainer />
    );
  }

  const showResult = () => {
    setOpen(false);
  };

  //Save an image of wheel as a png file 
  const printDocument = () => {
    html2canvas(document.getElementById('body'))
      .then((canvas) => {
        const link = canvas.toDataURL("image/png");
        // link.download = "universalprosperity.png";
        // link.click();
        setImage(link);
        // console.log(link);
      });
  };

  return (
    <Provider
      value={{
        title,
        data,
        series,
        colors,
        question,
        anwserOptions,
        counter,
        selectedAnwsers,
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
        image,

        handleAnswerSelected,
        handleNextQuestion,
        handleSubmitAnswers,
        showResult,
        renderQuiz,
        convertAverageToLength,
        switchToFrench,
        switchToEnglish,
        printDocument
      }}
    >
      {children}
      {showLoading()}
    </Provider>
  );
}

export default App;