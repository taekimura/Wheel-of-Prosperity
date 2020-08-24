import React, { useContext, useState } from "react";
import { Context } from "../../pages/wheel/WheelPage";
import { Modal } from "react-responsive-modal";
import { Button } from "reactstrap";
import TranlationButton from "../TranslationButton/TranslationButton";
import "react-responsive-modal/styles.css";
import "./Modal.scss";

const QuestionModal = () => {
    const { renderQuiz, result, startButton, instruction, open, showResult, title } = useContext(Context);
    const [starter, setStarter] = useState(false);

    const setStarterOn = () => {
        setStarter(true);
        return (
            <Modal open={open}  >
                {renderQuiz()}
            </Modal>
        );
    }

    const startQuestionnaire = () => {
        return (
            <>
                <TranlationButton />
                <br />
                <h3 style={{ textAlign: "center", padding: "0.8em 0em 0.3em 0", fontFamily: 'Open Sans', fontWeight: "600", color: "#3d2903" }}>{title}</h3>
                <p id="instruction" style={{ padding: "0em 0em 1em 0em", color: "#3d2903", fontSize: "1.1em" }}>
                    {instruction}
                </p>
                <div style={{
                    textAlign: "center", display: "table", width: "100%",
                }}>
                    <Button style={{ margin: "0", textAlign: "center", fontSize: "1.3em", backgroundColor: "#84123c", border: "none" }} onClick={setStarterOn} className="btn-submit">{startButton}</Button>
                </div>
            </>
        )
    }

    return (
        <div>
            <Modal open={open} >
                {!result ? !starter ? startQuestionnaire() : renderQuiz() : showResult()}
            </Modal>
        </div>
    );
}

export default QuestionModal;

