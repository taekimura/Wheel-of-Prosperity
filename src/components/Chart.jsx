import React, { Component } from "react";
import { connect } from "react-redux";
// import Wheel from "../assets/Wheel.png";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageAnswers: [],
            data: [...this.props.sectionScores.sectionScores],
        };
    }

    componentDidUpdate(prevState) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const X = canvas.width / 2;
        const Y = canvas.height / 2;
        const colors = [
            "#00506d",
            "#006c8b",
            "#50959a",
            "#005c41",
            "#32774b",
            "#5b9e51",
            "#c54619",
            "#c45621",
            "#e07c27",
            "#8c191c",
            "#8c191c",
            "#b92351",
        ];

        if (prevState.averageAnswers !== this.state.averageAnswers) {
            console.log("invoooooooooked")
            let index = 0;
            ctx.translate(X, Y);
            ctx.rotate((240 * Math.PI) / 180);
            const data = this.state.data;
            for (let value in data) {
                ctx.strokeStyle = colors[index];
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.rotate(Math.PI / 6);
                const length = Object.values(data[value]);
                ctx.moveTo(length, 0);
                ctx.lineTo(35, 0);
                ctx.stroke();
                ctx.restore();
                index += 1;
            }
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const X = canvas.width / 2;
        const Y = canvas.height / 2;
        const nums = {
            zero: 185,
            one: 170,
            two: 155,
            three: 140,
            four: 125,
            five: 110,
            six: 95,
            seven: 80,
            eight: 65,
            nine: 50,
            ten: 35,
        };

        ctx.strokeStyle = "#FFD700";
        ctx.fillStyle = "#FFD700";
        for (let value in nums) {
            ctx.beginPath();
            ctx.arc(X, Y, nums[value], 0, 2 * Math.PI, false);
            ctx.stroke();
        }
        ctx.fill();
    }

    render() {
        return (
            <>
                {/* <img style={{ width: "100%", height: "100%" }} src={Wheel} alt="" /> */}
                <canvas ref="canvas" width="500px" height="500px" />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('mapping.... ', state.sectionScores);
    console.log('mapping Average Scores.... ', state.averageScores);
    return {
        sectionScores: state,
        averageScores: state
    };
};

export default connect(mapStateToProps)(Canvas);
