import React, { useContext, useState } from "react";
import { Context } from "../../App";
import { Modal } from "react-responsive-modal";
import { ButtonGroup, Button } from "reactstrap";
import "react-responsive-modal/styles.css";
import "./QuestionModal.scss";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    display: "table",
    width: "100%",
};

const ModalExample = () => {
    const { showResult, renderQuiz, result, onOpenModal, open, switchToEnglish, switchToFrench, startButton, instruction } = useContext(Context);
    const [starter, setStarter] = useState(false);

    const setStarterOn = () => {
        setStarter(true);
        return (
            <Modal open={open} >
                {renderQuiz()}
            </Modal>
        );
    }

    const startQuestionnaire = () => {
        return (
            <>
                <ButtonGroup className="float-right">
                    <Button style={{ margin: "0" }} color="primary" onClick={switchToEnglish}>English</Button>
                    <Button style={{ paddingLeft: "5%" }} color="success" onClick={switchToFrench}>Français</Button>
                </ButtonGroup>
                <p style={{ padding: "3em 0em 1em 0em" }}>
                    {instruction}
                </p>
                <div style={{ textAlign: "center" }}>
                    <Button color="danger" style={{ width: "300px", textAlign: "center" }} onClick={setStarterOn} className="btn-submit">{startButton}</Button>
                </div>
            </>
        )
    }

    return (
        <div style={styles}>
            {/* <button onClick={onOpenModal}>
                Start a questionnaire
            </button> */}
            <Modal open={open} >
                {!result ? !starter ? startQuestionnaire() : renderQuiz() : showResult()}
            </Modal>
        </div>
    );
}

export default ModalExample;

