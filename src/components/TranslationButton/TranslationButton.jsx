import React, { useContext } from "react";
import { Context } from "../../App";
import { ButtonGroup, Button } from "reactstrap";
import "./TranslationButton.scss";

const TranlationButton = () => {
    const { switchToEnglish, switchToFrench, englishButtonColor, frenchButtonColor, } = useContext(Context);


    return (
        <>
            <ButtonGroup className="float-right">
                <Button className="tran" style={{ margin: "0", background: englishButtonColor, }} onClick={switchToEnglish}>English</Button>
                <Button className="tran" style={{ paddingLeft: "5%", background: frenchButtonColor }} onClick={switchToFrench}>Français</Button>
            </ButtonGroup>
        </>
    );
};
export default TranlationButton;