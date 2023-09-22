const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


async function sendWelcomeMail(email,name){
    try {
        const info = await transporter.sendMail({
            from: "From task-manager-app",
            to: email,
            subject: "Thanks for joining in.. ",
            text: `Welcome to the task-manager app, ${name}..!!.Let me know how you get along with the app.`,
        })
    
        console.log("Message Sent.. :  %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

async function sendCancelationMail(email,name){
    try {
        const info = await transporter.sendMail({
            from: "From task-manager-app",
            to: email,
            subject: "account removal ",
            text: `Hey ${name} !!.Let me know why you deleted your acccount.`,
        })
    
        console.log("Message Sent.. :  %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendWelcomeMail,
    sendCancelationMail
}