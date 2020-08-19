import React, { useContext } from "react";
import { Context } from "../../App";
// import Fade from 'react-reveal/Fade';

import "./Question.scss";

const Question = () => {
  const { question } = useContext(Context);
  return (
    <div className="quiz--question__component">
      {/* <Fade bottom> */}
      <p>{question}</p>
      {/* </Fade> */}
    </div>
  );
};

export default Question;