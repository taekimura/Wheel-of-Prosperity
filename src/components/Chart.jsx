import React, { Component } from "react";
// import Wheel from "../assets/Wheel.png";

class Canvas extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
        ctx.strokeStyle = '#FFD700';
        ctx.fillStyle = '#FFD700';
        //circle1
        ctx.beginPath();
        ctx.arc(X, Y, 185, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle2
        ctx.beginPath();
        ctx.arc(X, Y, 170, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle3
        ctx.beginPath();
        ctx.arc(X, Y, 155, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle4
        ctx.beginPath();
        ctx.arc(X, Y, 140, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle5
        ctx.beginPath();
        ctx.arc(X, Y, 125, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle6
        ctx.beginPath();
        ctx.arc(X, Y, 110, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle7
        ctx.beginPath();
        ctx.arc(X, Y, 95, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle8
        ctx.beginPath();
        ctx.arc(X, Y, 80, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle9
        ctx.beginPath();
        ctx.arc(X, Y, 65, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle10
        ctx.beginPath();
        ctx.arc(X, Y, 50, 0, 2 * Math.PI, false);
        ctx.stroke();
        //circle10
        ctx.beginPath();
        ctx.arc(X, Y, 35, 0, 2 * Math.PI, false);
        ctx.fill();
        //bars with loop
        // ctx.translate(X, Y);
        // ctx.strokeStyle = "#006c8b";
        // ctx.lineWidth = 3;
        // ctx.beginPath();
        // for (var i = 0; i < 60; i++) {
        //     ctx.moveTo(185, 0);
        //     ctx.lineTo(35, 0);
        //     ctx.rotate(Math.PI / 6);
        // }
        // ctx.stroke();
        // ctx.restore();

        //accueil
        ctx.translate(X, Y);
        ctx.strokeStyle = "#006c8b";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.rotate(270 * Math.PI / 180);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //style de vie
        ctx.strokeStyle = "#50959a";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //soi
        ctx.strokeStyle = "#005c41";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //couple
        ctx.strokeStyle = "#32774b";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //famille
        ctx.strokeStyle = "#5b9e51";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //inspiration
        ctx.strokeStyle = "#c54619";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //creativitte
        ctx.strokeStyle = "#c45621";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //sante
        ctx.strokeStyle = "#e07c27";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //argent
        ctx.strokeStyle = "#8c191c";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //travail
        ctx.strokeStyle = "#8c191c";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //expansion
        ctx.strokeStyle = "#b92351";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();

        //ressourcement
        ctx.strokeStyle = "#00506d";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(185, 0);
        ctx.lineTo(35, 0);
        ctx.stroke();
        ctx.restore();






        // var gradient = ctx.createRadialGradient(75, 50, 5, 90, 70, 150);
        // gradient.addColorStop(0, 'white');
        // gradient.addColorStop(0.4, 'black');
        // ctx.fillStyle = gradient;
        // ctx.fillRect(10, 10, 150, 100);
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