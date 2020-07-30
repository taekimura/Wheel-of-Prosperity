import React, { useContext } from "react";
import { Context } from "../App";
import { connect } from "react-redux";
import centerWheelGray from "../assets/centerWheel-gray.png";
import centerWheelGold from "../assets/centerWheel-gold.png";
import Asset9 from "../assets/Asset9.png";
import Asset8 from "../assets/Asset8.png";
import Asset7 from "../assets/Asset7.png";
import Asset6 from "../assets/Asset6.png";
import Asset5 from "../assets/Asset5.png";
import Asset4 from "../assets/Asset4.png";
import Asset3 from "../assets/Asset3.png";
import Asset2 from "../assets/Asset2.png";
import Asset1 from "../assets/Asset1.png";
import ExternalCircle from "../assets/ExternalCircle.png";
import "./Chart.scss";

const Chart = () => {
    const { data, colors, barHeight, averageAnswers, test } = useContext(Context);
    let max = 0;

    for (let i = data.length; i--;) {
        for (let j = data[i].length; j--;) {
            if (data[i][j] > max) {
                max = data[i][j];
            }
        }
    }

    const renderGoldenRings = () => {
        const minNumber = Math.min.apply(null, test);
        if (minNumber === 9 || averageAnswers.length !== 12) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset4} width="345" alt="Asset4" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset3} width="390" alt="Asset3" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset2} width="425" alt="Asset2" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset1} width="465" alt="Asset1" />
                    </div>
                </>
            );
        } else if (minNumber === 8) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset4} width="345" alt="Asset4" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset3} width="390" alt="Asset3" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset2} width="425" alt="Asset2" />
                    </div>
                </>
            )
        } else if (minNumber === 7) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset4} width="345" alt="Asset4" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset3} width="390" alt="Asset3" />
                    </div>
                </>
            )
        } else if (minNumber === 6) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset4} width="345" alt="Asset4" />
                    </div>
                </>
            )
        } else if (minNumber === 5) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                </>
            )
        } else if (minNumber === 4) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                </>
            )
        } else if (minNumber === 3) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                </>
            )
        } else if (minNumber === 2) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                </>
            )
        } else if (minNumber === 1) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                </>
            )
        } else if (minNumber === 0) {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="goldenCircle11">
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGray} width="119" alt="centerWheelGray" />
                    </div>
                    <div className="goldenCircle">
                        <img src={centerWheelGold} width="110" alt="centerWheelGold" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset9} width="150" alt="Asset9" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset8} width="190" alt="Asset8" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset7} width="230" alt="Asset7" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset6} width="270" alt="Asset6" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset5} width="305" alt="Asset5" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset4} width="345" alt="Asset4" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset3} width="390" alt="Asset3" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset2} width="425" alt="Asset2" />
                    </div>
                    <div className="middleCircle">
                        <img src={Asset1} width="465" alt="Asset1" />
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="Charts">
                {data.map((serie, serieIndex) => {
                    const color = colors[serieIndex];
                    let style;
                    let size = serie;

                    style = {
                        backgroundColor: colors[serieIndex],
                        zIndex: serie
                    };

                    style["height"] = size * 10 + "%";
                    style["width"] = 10;

                    return (
                        <div
                            className={"Charts--serie"}
                            key={serieIndex}
                            style={{ height: barHeight ? barHeight : "auto" }}
                        >
                            <div className={"Charts--item"} style={style} key={serieIndex}>
                                <b style={{ color: color }}></b>
                            </div>
                            {/* <label>{labels[serieIndex]}</label> */}
                        </div>
                    );
                })}
                {renderGoldenRings()}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log('mapping.... ', state.sectionScores);
    console.log('mapping Average Scores.... ', state.averageScores);
    return {
        sectionScores: state,
        averageScores: state
    };
};

export default connect(mapStateToProps)(Chart);
