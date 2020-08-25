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
                subject: `Your Universal Prosperity BluePrint`,
                html: `
                Congratulations! Here's your Universal Prosperity Blueprint.
                <br/>
                <br/>
                With Love,<br/>
                Sylvie & Bernard
                `,
                attachments: [{
                    filename: 'image.png',
                    contentType: 'image/png',
                    content: new Buffer.from(image.split("base64,")[1], "base64"),
                }]
            }
            break;
        case "french":
            data = {
                from: "Tae Kimura <sheepman7893@gmail.com>",
                to,
                cc: "Tae Kimura <sheepman7893@gmail.com>",
                // bcc: "Tae Kimura <sheepman7893@gmail.com>",
                subject: `Votre Signal de Prospérité Universelle`,
                html: `
                Félicitations ! Voici le résultat de votre signal de Prospérité Universelle.
                <br/>
                <br/>
                Avec Amour,<br/>
                Sylvie & Bernard
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