import React, { useContext, useState } from "react";
import { Context } from "../../App";
import { Modal } from "react-responsive-modal";
import { ButtonGroup, Button } from "reactstrap";
import "react-responsive-modal/styles.css";
import "./QuestionModal.scss";

const ModalExample = () => {
    const { showResult, renderQuiz, result, open, switchToEnglish, switchToFrench, startButton, instruction } = useContext(Context);
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
                <ButtonGroup className="float-right">
                    <Button style={{ margin: "0", background: "#3c79c9", border: "none" }} onClick={switchToEnglish}>English</Button>
                    <Button style={{ paddingLeft: "5%", background: "#5eaa3d", border: "none" }} onClick={switchToFrench}>Français</Button>
                </ButtonGroup>
                <p style={{ padding: "3em 0em 1em 0em", fontFamily: 'sans serif', fontSize: "1.2em" }}>
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
        <div style={{ fontFamily: "sans-serif", }}>
            <Modal open={open} >
                {!result ? !starter ? startQuestionnaire() : renderQuiz() : showResult()}
            </Modal>
        </div>
    );
}

export default ModalExample;

