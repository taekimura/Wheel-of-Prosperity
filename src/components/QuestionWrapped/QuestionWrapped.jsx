import React, { Component } from "react";
import quizQuestions from "../../data/questions";
import QuestionContainer from "../QuestionContainer/QuestionContainer";
import Result from "../Result/Result";
import "./QuestionWrapped.css";

class QuestionWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionID: 1,
      question: "",
      category: "",
      color: "",
      anwserOptions: [],
      anwser: "",
      selectedAnwsers: [],
      allQuestion: [],
      result: false
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      question: quizQuestions[0].question,
      category: quizQuestions[0].category,
      color: quizQuestions[0].color,
      anwserOptions: quizQuestions[0].answers,
      allQuestion: quizQuestions
    });
  }

  //handle get value selected for question
  handleAnswerSelected = e => {
    let { selectedAnwsers, counter } = this.state;
    let target = e.target;
    let objSelected = selectedAnwsers;
    let index = parseInt(target.value, 10);
    let quantityIndex = counter;

    //object container & save anwsers after selected answer
    objSelected[quantityIndex] = index;
    // console.log(objSelected);
    // console.log(objSelected.length);
    this.setState({
      selectedAnwsers: objSelected
    });

    // console.log(selectedAnwsers.length);
    // console.log(counter);

    alert("your input is " + index);
  };

  //handle next questions & answer
  handleNextQuestion = () => {
    let { selectedAnwsers, counter, questionID } = this.state;
    // if (!this.handleAnswerSelected) {
    counter = counter + 1;
    questionID = questionID + 1;
    this.setState({
      counter: counter,
      questionID: questionID,
      answer: "",
      question: quizQuestions[counter].question,
      category: quizQuestions[counter].category,
      color: quizQuestions[counter].color,
      anwserOptions: quizQuestions[counter].answers
    });
    console.log("The array of User input: " + selectedAnwsers);
    const answerArray = selectedAnwsers.length;
    if ((answerArray % 2) === 0) {
      const result = selectedAnwsers.reduce((acc, cur) => {
        return Math.round((acc + cur) / 2);
      }, null);
      console.log("The Average number is " + result);
      alert("Average:" + result);
      this.setState({
        selectedAnwsers: [],
      })
    }
    // } else {
    //   alert("Input a number")
    // }
  };

  //handle show result
  handleSubmitAnswers = () => {
    if (!this.handleAnswerSelected) {
      console.log("Input something")
    } else {
      let { selectedAnwsers } = this.state;
      console.log("The array of User input: " + selectedAnwsers);
      const answerArray = selectedAnwsers.length;
      if ((answerArray % 2) === 0) {
        const result = selectedAnwsers.reduce(function (acc, cur) {
          return Math.round((acc + cur) / 2);
        });
        console.log("The Average number is " + result);
        alert("Average:" + result);
        this.setState({
          selectedAnwsers: [],
          result: true
        })
      }
    }
  };

  showResult = () => {
    return <Result />;
  };

  renderQuiz() {
    const {
      question,
      anwserOptions,
      anwser,
      selectedAnwsers,
      questionID,
      allQuestion,
      counter,
      category,
      color,
    } = this.state;
    return (
      <QuestionContainer
        selectedAnwser={selectedAnwsers[counter]}
        answer={anwser}
        anwserOptions={anwserOptions}
        question={question}
        category={category}
        color={color}
        questionID={questionID}
        onSelectedAnwser={this.handleAnswerSelected}
        handleNextQuestion={this.handleNextQuestion}
        handlePreviewQuestion={this.handlePreviewQuestion}
        showResult={this.handleSubmitAnswers}
        totalQuestion={allQuestion.length}
        counterQuestion={counter}
      />
    );
  }
  render() {
    let { result } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="quiz--wrapped__component">
            <div className="quiz--wrapped__question">
              {result ? this.showResult() : this.renderQuiz()}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default QuestionWrapped;
