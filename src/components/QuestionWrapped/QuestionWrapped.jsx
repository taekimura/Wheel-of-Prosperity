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
            result: false,
            averageAnswers: [],
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
        this.setState({
            selectedAnwsers: objSelected
        });
        alert("your input is " + index);
        console.log("The array of User input: " + selectedAnwsers);
    };

    //handle next questions & answer
    handleNextQuestion = (e) => {
        let { selectedAnwsers, counter, questionID } = this.state;
        const answerArray = selectedAnwsers.length;
        if (selectedAnwsers.length === counter || answerArray === 0) {
            alert("Please input a number:)")
        } else {
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

            if ((answerArray % 2) === 0) {
                var lastTwoNum = selectedAnwsers.slice(-2);
                let averageCal = lastTwoNum.reduce((pre, curr) => {
                    return pre + curr;
                }, 0) / lastTwoNum.length;
                let average = Math.round(averageCal);
                let joined = this.state.averageAnswers.concat(average);
                this.setState({
                    averageAnswers: joined,
                })
                console.log("last 2 nums of the array" + lastTwoNum);
                console.log("The Average number is " + average);
                console.log("The array of average:" + joined);
                alert("Average:" + average);
            }
        }
    };

    handleSubmitAnswers = () => {
        let { selectedAnwsers, counter } = this.state;
        const answerArray = selectedAnwsers.length;
        if (selectedAnwsers.length === counter || answerArray === 0) {
            alert("Please input a number:)")
        } else {
            const answerArray = selectedAnwsers.length;
            if ((answerArray % 2) === 0) {
                var lastTwoNum = selectedAnwsers.slice(-2);
                let averageCal = lastTwoNum.reduce((pre, curr) => {
                    return pre + curr;
                }, 0) / lastTwoNum.length;
                let average = Math.round(averageCal);
                let joined = this.state.averageAnswers.concat(average);
                this.setState({
                    averageAnswers: joined,
                    result: true
                })
                console.log("last 2 nums of the array: " + lastTwoNum);
                console.log("The Average number is " + average);
                console.log("The array of average:" + joined);
                alert("Average:" + average);
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
            averageAnswers
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
                averageAnswers={averageAnswers}
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