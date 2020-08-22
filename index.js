const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sendEmail } = require('./mail');

const app = express();
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(bodyParser.urlencoded({
    limit: '10mb',
    parameterLimit: 100000,
    extended: true
}));

app.use(cookieParser());

// , parameterLimit: 10000

app.post("/api/sendMail", (req, res) => {
    sendEmail(req.body.email, req.body.name, "hello", req.body.image)
})


app.listen(5000, () => {
    console.log("Server Running at 5000 ");
})