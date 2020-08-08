// import React, { useContext } from "react";
// import { Context } from "../../App";
// import { connect } from "react-redux";
// import { updateWheel, updateAverage } from "../../js/actions/index";
// import { ButtonGroup, Button } from "reactstrap";
// import "./QuestionWrapped.css";

// export const QuestionContext = React.createContext('this is context!')
// export const QuestionProvider = QuestionContext.Provider

// const QuestionWrapped = () => {
//     const { showResult, renderQuiz, result, switchToFrench, switchToEnglish, lang } = useContext(Context);

//     return (
//         <div className="container3">
//             <div className="quiz--wrapped__component">
//                 <div className="quiz--wrapped__question">
//                     <ButtonGroup className="float-right">
//                         <Button style={{ margin: "0" }} color="primary" onClick={switchToEnglish}>English</Button>
//                         <Button style={{ paddingLeft: "5%" }} color="success" onClick={switchToFrench}>Français</Button>
//                     </ButtonGroup>
//                     <p style={{ padding: "3em 2em 1em 2em" }}>To assist you in having a clear picture of your Universal Prosperity Blueprint, we invite you to note, on a scale of 0 to 10 - 0 representing always (light) and 10 representing never (heavy) - the frequency at which the residues from patterns and/or Qualities of the Heart impact your daily life in four (4) major categories, that of Plenitude, Harmony, Vitality, and Prosperity.</p>
//                     {result ? showResult() : renderQuiz()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateWheel: (data) => dispatch(updateWheel(data)),
//         updateAverage: (averageAnswers) => dispatch(updateAverage(averageAnswers)),
//     };
// }

// const mapStateToProps = (state) => {
//     return {
//         sectionScores: state.sectionScores,
//         averageScores: state.averageScores
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(QuestionWrapped);
