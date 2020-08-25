const mailer = require("nodemailer");
// const { Hello } = require("./hello_template");

const getEmailData = (to, name, template, image) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "Tae Kimura <sheepman7893@gmail.com>",
                to,
                cc: "Tae Kimura <sheepman7893@gmail.com>",
                // bcc: "Tae Kimura <sheepman7893@gmail.com>",
                subject: `Universal prosperity blueprint`,
                html: `
                Hello ${name}. <br/>
                This is your universal prosperity blueprint.
                `,
                attachments: [{
                    filename: 'image.png',
                    contentType: 'image/png',
                    content: new Buffer.from(image.split("base64,")[1], "base64"),
                }]
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type, image) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sheepman7893@gmail.com",
            pass: "kimukimu831"
        }
    })

    const mail = getEmailData(to, name, type, image)

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            console.log(" email sent successfully")
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }