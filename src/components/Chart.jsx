import React, { Component } from "react";
// import Wheel from "../assets/Wheel.png";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageAnswers: [],
            data: {
                A1: 185,
                A2: 50,
                A3: 50,
                A4: 50,
                A5: 50,
                A6: 50,
                A7: 50,
                A8: 50,
                A9: 50,
                A10: 50,
                A11: 50,
                A12: 110
            }
        };
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
        }

        const colors = [
            '#006c8b',
            '#50959a',
            '#005c41',
            '#32774b',
            '#5b9e51',
            '#c54619',
            '#c45621',
            '#e07c27',
            '#8c191c',
            '#8c191c',
            '#b92351',
            '#00506d'
        ];

        ctx.strokeStyle = '#FFD700';
        ctx.fillStyle = '#FFD700';
        for (let value in nums) {
            ctx.beginPath();
            ctx.arc(X, Y, nums[value], 0, 2 * Math.PI, false);
            ctx.stroke();
        }
        ctx.fill();

        let index = 0;
        ctx.translate(X, Y);
        ctx.rotate(240 * Math.PI / 180);
        const data = this.state.data
        for (let value in data) {
            ctx.strokeStyle = colors[index];
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(data[value], 0);
            ctx.lineTo(35, 0);
            ctx.stroke();
            ctx.restore();
            index += 1;
        }
    }

    render() {
        return (
            <>
                {/* <img style={{ width: "100%", height: "100%" }} src={Wheel} alt="" /> */}
                <canvas
                    ref="canvas"
                    width="500px"
                    height="500px"
                />
            </>
        );
    }
}
export default Canvas;