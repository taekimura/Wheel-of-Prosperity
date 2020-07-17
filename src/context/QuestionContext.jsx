import React from 'react'
import get from 'lodash/get'

const { createContext, useState, useEffect } = React
const ThemeContext = createContext(null)

function ThemeContextProvider(props) {
    const initialStyle = get(props, 'value.style', 'light')
    const initialVisible = get(props, 'value.visible', true)
    const [style, setStyle] = useState(initialStyle)
    const [visible, setVisible] = useState(initialVisible)
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("../data/questions.json")
            .then(function (data) {
                console.log(data);
                setResult(data);
            });
    }, []);



    function toggleStyle() {
        setStyle(style => (style === 'light' ? 'dark' : 'light'))
    }
    function toggleVisible() {
        setVisible(visible => !visible)
    }

    return (
        <ThemeContext.Provider
            value={{ result, style, visible, toggleStyle, toggleVisible }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
export { ThemeContextProvider }

// import React, { useState, useEffect } from "react";
// import { OPEN_KEY, UNSPLASH_KEY, IP_KEY } from "../config";
// import Unsplash, { toJson } from "unsplash-js";
// import axios from "axios";

// const unsplash = new Unsplash({ accessKey: UNSPLASH_KEY });

// const WeatherContext = React.createContext();

// const WeatherProvider = (props) => {
//     const [results, setResults] = useState([]);
//     const [details, setDetails] = useState([]);
//     const [picture, setPicture] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchWords, setSearch] = useState("Vancouver");
//     const [error, setError] = useState(false);
//     const [tempUnit, settempUnit] = useState("F");
//     const [isActive, setIsActive] = useState(false);
//     const [chartData_cel, setChartData_cel] = useState({});
//     const [chartData_fah, setChartData_fah] = useState({});


//     // const loadWeather = async e => {
//     //   setTimeout(()=>{
//     //     fetch("https://ipgeolocation.io/signup/confirm.html?id=60d12ffe1b3f4297b3ade1a9faafd534")
//     //       .then((response) => {
//     //       response.json().then((data) => {
//     //         console.log(data);
//     //       setSearch(data.city);})
//     //       .then(()=>{
//     //         fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=vancouver&client_id=${UNSPLASH_KEY}`)
//     //         .then((response)=>{
//     //         response.json().then((data) => { 
//     //           setPicture(data.results[0].urls.regular);})
//     //           .then(()=>{
//     //             searchWeather();})
//     //         },1500)
//     //       })
//     //     })
//     //   })
//     // }
//     const loadWeather = async () => {
//         setLoading(true);
//         try {
//             // const currentPlace = await axios.get(
//             //     `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_KEY}`
//             // );
//             // setSearch(currentPlace.data.city);

//             // const loadPicture = await axios.get(
//             //     `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${currentPlace.data.city}&client_id=${UNSPLASH_KEY}`
//             // );
//             // setPicture(loadPicture.data.results[0].urls.regular);

//             const response = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/weather?q=${currentPlace.data.city}&APPID=$fd72503c5c0f324f87a6837fefe2d0ef&units=metric`
//             );
//             setResults(response.data);

//             // const response2 = await axios(
//             //     `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&APPID=${OPEN_KEY}&units=metric`
//             // );
//             // setDetails(response2.data);

//             // const time = [];
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[1].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[4].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[7].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[10].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[13].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[16].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[19].dt, response.data.timezone));
//             // time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[22].dt, response.data.timezone));

//             // const temp_cel = [];
//             // temp_cel.push(Math.floor(response2.data.hourly[1].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[4].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[7].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[10].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[13].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[16].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[19].temp));
//             // temp_cel.push(Math.floor(response2.data.hourly[22].temp));

//             // const temp_fah = [];
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[1].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[4].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[7].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[10].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[13].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[16].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[19].temp)));
//             // temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[22].temp)));

//             //         setChartData_cel({
//             //             labels: time,
//             //             datasets: [
//             //                 {
//             //                     label: 'tempareture(℃)',
//             //                     backgroundColor: 'rgb(255, 248, 248,0.4)',
//             //                     borderColor: 'rgb(255, 248, 248,1)',
//             //                     pointBorderColor: 'rgb(245, 239, 239)',
//             //                     pointBackgroundColor: '#fff',
//             //                     pointBorderWidth: 4,
//             //                     pointHoverBackgroundColor: 'black',
//             //                     pointHoverBorderColor: 'rgba(220,220,220,1)',
//             //                     pointHoverBorderWidth: 2,
//             //                     pointRadius: 1,
//             //                     pointHitRadius: 10,
//             //                     data: temp_cel,
//             //                 }
//             //             ],
//             //         });

//             //         setChartData_fah({
//             //             labels: time,
//             //             datasets: [
//             //                 {
//             //                     label: 'tempareture(℉)',
//             //                     backgroundColor: 'rgb(255, 248, 248,0.4)',
//             //                     borderColor: 'rgb(255, 248, 248,1)',
//             //                     pointBorderColor: 'rgb(245, 239, 239)',
//             //                     pointBackgroundColor: '#fff',
//             //                     pointBorderWidth: 4,
//             //                     pointHoverBackgroundColor: 'black',
//             //                     pointHoverBorderColor: 'rgba(220,220,220,1)',
//             //                     pointHoverBorderWidth: 2,
//             //                     pointRadius: 1,
//             //                     pointHitRadius: 10,
//             //                     data: temp_fah,
//             //                 }
//             //             ],
//             //         });
//             //         setLoading(false);
//             //     } catch (e) {
//             //         setLoading(false);
//             //         setError(true);
//             //     }
//             // };

//             const searchWeather = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await axios(
//                         `https://api.openweathermap.org/data/2.5/weather?q=${searchWords}&APPID=${OPEN_KEY}&units=metric`
//                     );
//                     setResults(response.data);

//                     const response2 = await axios(
//                         `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&APPID=${OPEN_KEY}&units=metric`
//                     );
//                     setDetails(response2.data);

//                     const time = [];
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[1].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[4].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[7].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[10].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[13].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[16].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[19].dt, response.data.timezone));
//                     time.push(ConvertUTCTimeToLocalTime(response2.data.hourly[22].dt, response.data.timezone));

//                     const temp_cel = [];
//                     temp_cel.push(Math.floor(response2.data.hourly[1].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[4].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[7].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[10].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[13].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[16].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[19].temp));
//                     temp_cel.push(Math.floor(response2.data.hourly[22].temp));

//                     const temp_fah = [];
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[1].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[4].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[7].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[10].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[13].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[16].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[19].temp)));
//                     temp_fah.push(celciusToFahrenheit(Math.floor(response2.data.hourly[22].temp)));

//                     setChartData_cel({
//                         labels: time,
//                         datasets: [
//                             {
//                                 label: 'tempareture(℃)',
//                                 backgroundColor: 'rgb(255, 248, 248,0.4)',
//                                 borderColor: 'rgb(255, 248, 248,1)',
//                                 pointBorderColor: 'rgb(245, 239, 239)',
//                                 pointBackgroundColor: '#fff',
//                                 pointBorderWidth: 4,
//                                 pointHoverBackgroundColor: 'black',
//                                 pointHoverBorderColor: 'rgba(220,220,220,1)',
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 1,
//                                 pointHitRadius: 10,
//                                 data: temp_cel,
//                             }
//                         ],
//                     });

//                     setChartData_fah({
//                         labels: time,
//                         datasets: [
//                             {
//                                 label: 'tempareture(℉)',
//                                 backgroundColor: 'rgb(255, 248, 248,0.4)',
//                                 borderColor: 'rgb(255, 248, 248,1)',
//                                 pointBorderColor: 'rgb(245, 239, 239)',
//                                 pointBackgroundColor: '#fff',
//                                 pointBorderWidth: 4,
//                                 pointHoverBackgroundColor: 'black',
//                                 pointHoverBorderColor: 'rgba(220,220,220,1)',
//                                 pointHoverBorderWidth: 2,
//                                 pointRadius: 1,
//                                 pointHitRadius: 10,
//                                 data: temp_fah,
//                             }
//                         ],
//                     });
//                     setLoading(false);
//                     setError(false);
//                 } catch (e) {
//                     setLoading(false);
//                     setError(true);
//                 }
//             }

//             const getPicture = () => {
//                 unsplash.search
//                     .photos(searchWords, 1)
//                     .then(toJson)
//                     .then(json => {
//                         let result = json.results[Math.floor(Math.random() * json.results.length)];
//                         if (!result) {
//                             setPicture('https://images.unsplash.com/photo-1515446808777-87f69cb475aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
//                             setLoading(false);
//                         } else {
//                             setPicture(result.urls.regular);
//                             setLoading(false);
//                         }
//                     });
//             };

//             const celciusToFahrenheit = celsius => {
//                 var cToFahr = celsius * 9 / 5 + 32;
//                 return cToFahr;
//             }

//             const ConvertUTCTimeToLocalTime = (dt, timezone) => {
//                 let timetime = dt * 1000 + timezone * 1000;
//                 var convertdLocalTime = new Date(timetime);
//                 let hours = convertdLocalTime.getUTCHours();
//                 let minutes = convertdLocalTime.getUTCMinutes();

//                 return hours.toString().padStart(2, '0') + ':' +
//                     minutes.toString().padStart(2, '0')
//             }

//             const handleSubmit = async (e) => {
//                 e.preventDefault();
//                 searchWeather();
//                 getPicture();
//                 setIsActive(false);
//             };

//             const handleChange = (e) => {
//                 setSearch(e.target.value);
//             };

//             const toggleUnits = () => {
//                 if (tempUnit === 'F') {
//                     settempUnit('C');
//                     setIsActive(true);
//                 } else {
//                     settempUnit('F');
//                     setIsActive(false);
//                 }
//             }

//             useEffect(() => {
//                 loadWeather();
//             }, []);

//             return (
//                 <WeatherContext.Provider
//                     value={{
//                         loading,
//                         searchWords,
//                         results,
//                         details,
//                         picture,
//                         error,
//                         chartData_cel,
//                         chartData_fah,
//                         tempUnit,
//                         isActive,

//                         handleChange,
//                         handleSubmit,
//                         celciusToFahrenheit,
//                         toggleUnits,
//                         ConvertUTCTimeToLocalTime
//                     }}
//                 >
//                     {props.children}
//                 </WeatherContext.Provider>
//             );
//         }
//     }
// };
// const WeatherConsumer = WeatherContext.Consumer;
// export { WeatherProvider, WeatherConsumer, WeatherContext };

// // import React, { useState, useEffect } from "react";

// // // import QuestionContainer from "../QuestionContainer/QuestionContainer";
// // // import Result from "../components/Result/Result";
// // // import "./QuestionWrapped.css";

// // const QuestionContext = React.createContext();

// // const QuestionProvider = (props) => {
// //     // const [counter, setCounter] = useState(0);
// //     // const [questionID, setquestionID] = useState(1);
// //     // const [question, setQuestion] = useState("");
// //     // const [category, setCategory] = useState("");
// //     // const [color, setColor] = useState("black");
// //     // const [anwserOptions, setAnwserOptions] = useState([]);
// //     // const [anwser, setAnswer] = useState("");
// //     // const [selectedAnwsers, setSelectedAnwsers] = useState([]);
// //     // const [allQuestion, setAllQuestion] = useState([]);
// //     const [result, setResult] = useState([]);
// //     // const [totalQuestion, setTotalQuestion] = (0);

// //     React.useEffect(() => {
// //         fetch("../data/questions.json").then(function (data) {
// //             console.log(data);
// //             setResult(data)
// //         });
// //         // showResult();
// //         // quizQuestions[0].question
// //         // setQuestion("konnichiwa");
// //         // setCategory("?");
// //         // setColor("blue");
// //         // setAnwserOptions([1]);
// //         // setAllQuestion([]);
// //     }, []);




// //     //handle get value selected for question
// //     // const handleAnswerSelected = e => {
// //     //     let target = e.target;
// //     //     let objSelected = selectedAnwsers;
// //     //     let index = parseInt(target.value, 10);
// //     //     let quantityIndex = counter;

// //     //     objSelected[quantityIndex] = index;
// //     //     // console.log(objSelected);
// //     //     // console.log(objSelected.length);
// //     //     setSelectedAnwsers(objSelected);
// //     //     // console.log(selectedAnwsers.length);
// //     //     // console.log(counter);
// //     //     alert("your input is " + index);
// //     // };

// //     //handle next questions & answer
// //     // const handleNextQuestion = () => {
// //     //     counter = counter + 1;
// //     //     questionID = questionID + 1;

// //     //     setCounter(counter);
// //     //     setquestionID(questionID);
// //     //     setAnswer("");
// //     //     setQuestion("");
// //     //     setCategory("");
// //     //     setColor("");
// //     //     setAnwserOptions([]);

// //     //     console.log("The array of User input: " + selectedAnwsers);
// //     //     const answerArray = selectedAnwsers.length;
// //     //     if ((answerArray % 2) === 0) {
// //     //         const result = selectedAnwsers.reduce((acc, cur) => {
// //     //             return Math.round((acc + cur) / 2);
// //     //         }, null);
// //     //         console.log("The Average number is " + result);
// //     //         alert("Average:" + result);
// //     //         setSelectedAnwsers([]);
// //     //     }
// //     //     // } else {
// //     //     //   alert("Input a number")
// //     //     // }
// //     // };

// //     // //handle show result
// //     // const handleSubmitAnswers = () => {
// //     //     if (!this.handleAnswerSelected) {
// //     //         console.log("Input something")
// //     //     } else {
// //     //         console.log("The array of User input: " + selectedAnwsers);
// //     //         const answerArray = selectedAnwsers.length;
// //     //         if ((answerArray % 2) === 0) {
// //     //             const result = selectedAnwsers.reduce(function (acc, cur) {
// //     //                 return Math.round((acc + cur) / 2);
// //     //             });
// //     //             console.log("The Average number is " + result);
// //     //             alert("Average:" + result);
// //     //             setSelectedAnwsers([]);
// //     //             setResult(true);
// //     //         }
// //     //     }
// //     // };

// //     // const showResult = () => {
// //     //     return <Result />;
// //     // };

// //     return (
// //         <QuestionContext.Provider
// //             value={{
// //                 // counter,
// //                 // questionID,
// //                 // question,
// //                 // category,
// //                 // color,
// //                 // anwserOptions,
// //                 // anwser,
// //                 // selectedAnwsers,
// //                 // allQuestion,
// //                 result,

// //                 // handleAnswerSelected,
// //                 // handleNextQuestion,
// //                 // handleSubmitAnswers,
// //                 // showResult
// //             }}
// //         >
// //             {props.children}
// //         </QuestionContext.Provider>
// //     );
// // };
// // const QuestionConsumer = QuestionContext.Consumer;
// // export { QuestionProvider, QuestionConsumer, QuestionContext };
