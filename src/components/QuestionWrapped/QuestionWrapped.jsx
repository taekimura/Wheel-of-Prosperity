import React, { Component } from "react";
import { connect } from "react-redux";
import { updateWheel, updateAverage } from "../../js/actions/index";
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
            data: [],
        };
    }

    componentDidMount() {
        this.setState({
            data: [...this.props.sectionScores],
            averageAnswers: [...this.props.averageScores]
        })
    }

    componentWillMount() {
        this.setState({
            question: quizQuestions[0].question,
            category: quizQuestions[0].category,
            color: quizQuestions[0].color,
            anwserOptions: quizQuestions[0].answers,
            allQuestion: quizQuestions,
        });
    }

    componentDidUpdate(prevState) {
        if (prevState.averageAnswers !== this.state.averageAnswers) {
            console.log('componentDidUpdate: ', this.state.data);
            console.log('componentDidUpdate: ', this.state.averageAnswers);

            //going to redux store
            this.props.updateWheel(this.state.data);
            this.props.updateAverage(this.state.averageAnswers);
        }
    }

    //handle get value selected for question
    handleAnswerSelected = (e) => {
        let { selectedAnwsers, counter } = this.state;
        let target = e.target;
        let objSelected = selectedAnwsers;
        let index = parseInt(target.value, 10);
        let quantityIndex = counter;

        //object container & save anwsers after selected answer
        objSelected[quantityIndex] = index;
        this.setState({
            selectedAnwsers: objSelected,
        });
        console.log("The array of User input: " + selectedAnwsers);
    };

    //handle next questions & answer
    handleNextQuestion = (e) => {
        let { selectedAnwsers, counter, questionID } = this.state;
        const answerArray = selectedAnwsers.length;
        if (selectedAnwsers.length === counter || answerArray === 0) {
            alert("Please input a number:)");
        } else if (this.state.questionID === 9 && selectedAnwsers[8] === 0) {
            this.setState({
                question: "With your spouse: Do you feel at peace, whole and complete without the presence of your life partner?",
                category: "Relationship",
                color: "#32774b",
            });
            alert("Yes");
        } else if (this.state.questionID === 9 && selectedAnwsers[8] === 10) {
            this.setState({
                question: "For single people: Do you feel at peace, whole, and complete without a life partner?",
                category: "Relationship",
                color: "#32774b",
            });
            alert("No");
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
            });

            if (answerArray % 2 === 0) {
                var lastTwoNum = selectedAnwsers.slice(-2);
                let averageCal =
                    lastTwoNum.reduce((pre, curr) => {
                        return pre + curr;
                    }, 0) / lastTwoNum.length;
                let average = Math.round(averageCal);
                let joined = this.state.averageAnswers.concat(average);
                this.setState({
                    averageAnswers: joined,
                });
                if (average === 0) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 185;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 1) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 170;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 2) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 155;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 3) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 140;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 4) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 125;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 5) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 110;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 6) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 95;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 7) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 80;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 8) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 65;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 9) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 50;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 10) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 35;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                }
                // console.log("last 2 nums of the array" + lastTwoNum);
                // alert("The Average number is " + average);
                // console.log("The array of average:" + joined);
            }
        }
    };

    handleSubmitAnswers = () => {
        let { selectedAnwsers, counter } = this.state;
        const answerArray = selectedAnwsers.length;
        if (selectedAnwsers.length === counter || answerArray === 0) {
            alert("Please input a number:)");
        } else {
            const answerArray = selectedAnwsers.length;
            if (answerArray % 2 === 0) {
                var lastTwoNum = selectedAnwsers.slice(-2);
                let averageCal =
                    lastTwoNum.reduce((pre, curr) => {
                        return pre + curr;
                    }, 0) / lastTwoNum.length;
                let average = Math.round(averageCal);
                let joined = this.state.averageAnswers.concat(average);
                this.setState({
                    averageAnswers: joined,
                });
                if (average === 0) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 185;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 1) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 170;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 2) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 155;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 3) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 140;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 4) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 125;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 5) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 110;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 6) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 95;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 7) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 80;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 8) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 65;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 9) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 50;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                } else if (average === 10) {
                    this.setState((prevState) => {
                        let data = Object.assign({}, prevState.data);
                        const key = Object.keys(data[this.props.averageScores.length]);
                        data[this.state.averageAnswers.length][key] = 35;
                        //wrapped the data in an array first before returning
                        const stateData = [data]
                        return { stateData, result: true };
                    });
                    console.log('handleNextQuestion: ', this.state.data);
                }
                // console.log("last 2 nums of the array: " + lastTwoNum);
                // console.log("The Average number is " + average);
                // console.log("The array of average:" + joined);
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
            averageAnswers,
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateWheel: (data) => dispatch(updateWheel(data)),
        updateAverage: (averageAnswers) => dispatch(updateAverage(averageAnswers)),
    };
}

const mapStateToProps = (state) => {
    return {
        sectionScores: state.sectionScores,
        averageScores: state.averageScores
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionWrapped);
