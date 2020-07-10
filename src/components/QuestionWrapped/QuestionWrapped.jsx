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
        // console.log("AnswerLength: " + selectedAnwsers.length);
        // console.log("counter: " + counter);
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
                let average = selectedAnwsers.reduce((acc, cur) => {
                    return Math.ceil((acc + cur) / 2);
                }, null);
                //Comment:Trying to make the array of average scores, but I wasn't able to do it for now, I'm going to fix it:)
                const array = [];
                array.push(average);
                console.log("The array of average:" + array);
                this.setState({
                    averageAnswers: average,
                    selectedAnwsers: [],
                })
                console.log("The Average number is " + average);
                alert("Average:" + average);
                // console.log("A" + averageAnswers);
            }
        }
    };

    handleSubmitAnswers = () => {
        if (!this.handleAnswerSelected) {
            console.log("Input something")
        } else {
            let { averageArray, selectedAnwsers } = this.state;
            console.log("The array of User input: " + selectedAnwsers);
            const answerArray = selectedAnwsers.length;
            if ((answerArray % 2) === 0) {
                const average = selectedAnwsers.reduce(function (acc, cur) {
                    return Math.round((acc + cur) / 2);
                });
                console.log("The Average number is " + average);
                alert("Average:" + average);
                this.setState({
                    averageArray: average,
                    selectedAnwsers: [],
                    result: true
                })
                console.log(averageArray);
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