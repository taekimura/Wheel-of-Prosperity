import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { connect } from "react-redux";
import { groupOneColors } from "../../constants";
import centerWheelGray from "../../assets/centerWheel-gray.png";
import centerWheelGold from "../../assets/centerWheel-gold.png";
import Asset9 from "../../assets/Asset9.png";
import Asset8 from "../../assets/Asset8.png";
import Asset7 from "../../assets/Asset7.png";
import Asset6 from "../../assets/Asset6.png";
import Asset5 from "../../assets/Asset5.png";
import Asset4 from "../../assets/Asset4.png";
import Asset3 from "../../assets/Asset3.png";
import Asset2 from "../../assets/Asset2.png";
import Asset1 from "../../assets/Asset1.png";
import ExternalCircle from "../../assets/ExternalCircle.png";
import Harmonie from "../../assets/Harmonie.png";
import Plentitude from "../../assets/Plentitude.png";
import Vitalite from "../../assets/Vitalite.png";
import Prosperite from "../../assets/Prosperite.png";
import "./Chart.scss";

const Chart = () => {
    const { data, colors, barHeight, lengthOfBar, totalScore } = useContext(Context);

    const [renderedBarsArray, setRenderedBarsArray] = useState([]);
    const [itemsRendered, setItemsRendered] = useState(0);

    useEffect(() => {
        const timer = itemsRendered < data.length && setTimeout(updateRenderedThings, 100);
        return () => clearInterval(timer);
    }, [data, itemsRendered]);

    const updateRenderedThings = () => {
        setRenderedBarsArray(renderedBarsArray.concat(data[itemsRendered]));
        setItemsRendered(itemsRendered + 1);
    };

    let max = 0;
    for (let i = data.length; i--;) {
        for (let j = data[i].length; j--;) {
            if (data[i][j] > max) {
                max = data[i][j];
            }
        }
    }

    const renderLabel = () => {
        return (
            <>
                <div className="harmonie">
                    <img src={Harmonie} width="150" alt="Harmonie" />
                </div>
                <div className="plentitude">
                    <img src={Plentitude} width="150" alt="Plentitude" />
                </div>
                <div className="vitalite">
                    <img src={Vitalite} width="130" alt="Vitalite" />
                </div>
                <div className="prosperite">
                    <img src={Prosperite} width="170" alt="Prosperite" />
                </div>
                <div className="goldenCircle11">
                    <img src={ExternalCircle} width="640" alt="Asset1" />
                </div>
            </>
        )
    }

    const renderInnerCircle = () => {
        if (totalScore === 0) {
            return (
                <div className="goldenCircle">
                    <img src={centerWheelGold} width="100" alt="centerWheelGold" />
                </div>
            )
        } else {
            return (
                <div className="goldenCircle">
                    <img src={centerWheelGray} width="109" alt="centerWheelGray" />
                </div>
            )
        }
    }

    const renderGoldenRings = () => {
        const minNumber = Math.min.apply(null, lengthOfBar);
        switch (minNumber) {
            case 9:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
            case 8:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 7:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 6:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 5:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 4:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 3:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );
            case 2:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
                        <div className="middleCircle">
                            <img src={Asset9} width="150" alt="Asset9" />
                        </div>
                        <div className="middleCircle">
                            <img src={Asset8} width="190" alt="Asset8" />
                        </div>
                    </>
                );
            case 1:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
                        <div className="middleCircle">
                            <img src={Asset9} width="150" alt="Asset9" />
                        </div>
                    </>
                );
            case 0:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
                    </>
                );

            default:
                return (
                    <>
                        {renderLabel()}
                        {renderInnerCircle()}
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
                );;
        }
    }

    const convertLengthToAverage = (length) => {
        switch (length) {
            case 0: return 10;
            case 1: return 9;
            case 2: return 8;
            case 3: return 7;
            case 4: return 6;
            case 5: return 5;
            case 6: return 4;
            case 7: return 3;
            case 8: return 2;
            case 9: return 1;
            case 10: return null;
            default: return "";
        }
    }

    return (
        <>
            <div className="Charts">
                {renderedBarsArray.map((serie, serieIndex) => {
                    const color = groupOneColors[serieIndex];
                    let style;
                    let size = serie;
                    let tae = colors[serieIndex]

                    style = {
                        // backgroundColor: colors[serieIndex], 
                        backgroundImage: 'radial-gradient( white,' + colors[serieIndex] + ')',
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
                                <b style={{ color: color, fontSize: "15px", padding: "2%", fontFamily: "sans-serif" }}>{convertLengthToAverage(serie)}</b>
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
