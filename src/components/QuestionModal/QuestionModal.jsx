import React, { useContext, useState } from "react";
import { Context } from "../../App";
import { Modal } from "react-responsive-modal";
import { Button } from "reactstrap";
import TranlationButton from "../TranslationButton/TranslationButton";
import "react-responsive-modal/styles.css";
import "./QuestionModal.scss";

const QuestionModal = () => {
    const { renderQuiz, result, startButton, instruction, open, showResult } = useContext(Context);
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
                <p style={{ padding: "3em 0em 1em 0em", fontSize: "1.2em", color: "#3d2903" }}>
                    {instruction}
                </p>
                <div style={{
                    textAlign: "center", display: "table", width: "100%",
                }}>
                    <Button style={{ width: "300px", textAlign: "center", fontSize: "1.3em", backgroundColor: "#84123c", border: "none" }} onClick={setStarterOn} className="btn-submit">{startButton}</Button>
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

