import React, { useContext, useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import { Context } from "../../App";
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
import EnglishExternalCircle from "../../assets/EnglishExternalCircle.png"
import Harmonie from "../../assets/Harmonie.png";
import Plentitude from "../../assets/Plentitude.png";
import Vitalite from "../../assets/Vitalite.png";
import Prosperite from "../../assets/Prosperite.png";
import "./Chart.scss";

const Chart = () => {
    const { data, colors, lengthOfBar, totalScore, lang } = useContext(Context);
    const [renderedBarsArray, setRenderedBarsArray] = useState([]);
    const [itemsRendered, setItemsRendered] = useState(0);
    const [barHeight] = useState(200);

    useEffect(() => {
        const timer = itemsRendered < data.length && setTimeout(updateRenderedThings, 100);
        return () => clearInterval(timer);
    }, [data, itemsRendered]);

    //Save an image of wheel as a png file 
    const printDocument = () => {
        html2canvas(document.getElementById('body'))
            .then((canvas) => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "universalprosperity.png";
                link.click();
                console.log(link);
            });
    };

    const updateRenderedThings = () => {
        setRenderedBarsArray(renderedBarsArray.concat(data[itemsRendered]));
        setItemsRendered(itemsRendered + 1);
        if (itemsRendered === 11) {
            setTimeout(printDocument(), 2000);
        }
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
        if (lang === "french") {
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
                    <div className="goldenCircle11" >
                        <img src={ExternalCircle} width="640" alt="Asset1" />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="harmonie2">
                        <div style={{ color: "#32774b", fontSize: "1.6em", fontFamily: 'Playfair Display SC', letterSpacing: '0.5mm' }}>HARMONY</div>
                    </div>
                    <div className="plentitude2">
                        <div style={{ color: "#006c8b", fontSize: "1.5em", fontFamily: 'Playfair Display SC', letterSpacing: '0.5mm' }}>PLENITUDE</div>
                    </div>
                    <div className="vitalite2">
                        <div style={{ color: "#c45621", fontSize: "1.7em", fontFamily: 'Playfair Display SC', letterSpacing: '0.5mm' }}>VITALITY</div>
                    </div>
                    <div className="prosperite2">
                        <div style={{ color: "#8c191c", fontSize: "1.6em", fontFamily: 'Playfair Display SC', letterSpacing: '0.5mm' }}>PROSPERITY</div>
                    </div>
                    <div className="goldenCircle11" >
                        <img src={EnglishExternalCircle} width="640" alt="Asset1" />
                    </div>
                </>
            )
        }
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
                    <div>
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
                    </div>
                );
            case 8:
                return (
                    <div>
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
                    </div>
                );
            case 7:
                return (
                    <div>
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
                    </div>
                );
            case 6:
                return (
                    <div>
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
                    </div>
                );
            case 5:
                return (
                    <div>
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
                    </div>
                );
            case 4:
                return (
                    <div>
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
                    </div>
                );
            case 3:
                return (
                    <div>
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
                    </div>
                );
            case 2:
                return (
                    <div>
                        {renderLabel()}
                        {renderInnerCircle()}
                        <div className="middleCircle">
                            <img src={Asset9} width="150" alt="Asset9" />
                        </div>
                        <div className="middleCircle">
                            <img src={Asset8} width="190" alt="Asset8" />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        {renderLabel()}
                        {renderInnerCircle()}
                        <div className="middleCircle">
                            <img src={Asset9} width="150" alt="Asset9" />
                        </div>
                    </div>
                );
            case 0:
                return (
                    <div>
                        {renderLabel()}
                        {renderInnerCircle()}
                    </div>
                );

            default:
                return (
                    <div>
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
                    </div>
                );
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

                    style = {
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

export default Chart;
