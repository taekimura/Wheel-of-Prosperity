const mailer = require("nodemailer");
const { Hello } = require("./hello_template");

const getEmailData = (to, name, template) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "Tae Kimura <sheepman7893@gmail.com>",
                to,
                subject: `Hello ${name}. This is your universal prosperity blueprint`,
                html: Hello(),
                // attachments: [{
                //     filename: 'universalprosperity.pdf',
                //     path: 'C:/Users/taekimura/downloads/universalprosperity.pdf',
                //     contentType: 'application/pdf'
                // }]
            }
            break;
        default:
            data;
    }
    return data;
}
const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sheepman7893@gmail.com",
            pass: "kimukimu831"
        }
    })

    const mail = getEmailData(to, name, type)

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