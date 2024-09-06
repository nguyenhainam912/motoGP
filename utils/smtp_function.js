const nodemailer = require('nodemailer')

async function sendEmail(userEmail, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    })

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: "Foodly Verfication Code",
        html: `<h1>Foodly Email Verfication</h1>
        <p>Your verfication is :</p>
        <h2 style="color: blue">${message}</h2>
        <p>Please enter this code on the page</p>
        `
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Email sent successfully")
    }catch(e) {
        console.log("Failed")
        console.log(e.message)
    }
}

module.exports = sendEmail