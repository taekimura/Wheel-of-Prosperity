import React, { useContext } from "react";
import { Context } from "../../App";
import { connect } from "react-redux";
import { updateWheel, updateAverage } from "../../js/actions/index";
import "./QuestionWrapped.css";

export const QuestionContext = React.createContext('this is context!')
export const QuestionProvider = QuestionContext.Provider

const QuestionWrapped = () => {
    const { showResult, renderQuiz, result } = useContext(Context);

    return (
        <div className="container3">
            <div className="quiz--wrapped__component">
                <div className="quiz--wrapped__question">
                    {result ? showResult() : renderQuiz()}
                </div>
            </div>
        </div>
    );
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
