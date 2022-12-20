require('dotenv').config()
const db = require("../models")


import nodemailer from "nodemailer"






let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Ziilla-3003 <tronghuy0077@gmail.com', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLSend(dataSend)

    });


}

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport



}

let getBodyHTMLSend = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patienName}!</h3>
        <p>Bạn nhận được email vì đã đặt lịch khám bệnh onl trên web ZiilleCare.</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ   : ${dataSend.doctorName}</b></div>

        <p> Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới để hoàn tất thủ tục khám bệnh</p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Clink here</a>
        </div>
        <div>
        Xin chân thành cảm ơn
        </div>

        `
    } else {
        result =
            `
        <h3> Hello ${dataSend.patienName}!</h3>
        <p>You received an email because you booked an online medical appointment on the ZiilleCare website.</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor  : ${dataSend.doctorName}</b></div>

        <p> If the above information is true, please click on the link below to complete the medical examination procedure.</p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Clink here</a>
        </div>
        <div>
        Sincerely thank.
        </div>

        `
    }
    return result
}

let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Ziilla-3003 <tronghuy0077@gmail.com', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLSendRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientiId}-${dataSend.name}.png`,
                content: dataSend.image.split('base64')[1],
                encoding: 'base64'

            }
        ]

    });

}

let getBodyHTMLSendRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.name} !</h3>
        <p>Bạn nhận được email vì đã đặt lịch khám bệnh onl trên web ZiilleCare.</p>
        <p>Thông tin hóa đơn được gửi:</p>




        Xin chân thành cảm ơn
        </div>

        `
    } else {
        result =
            `
        <h3> Hello  ${dataSend.name} $!</h3>
        <p>You received an email because you booked an online medical appointment on the ZiilleCare website.</p>
        <p>Invoice information sent::</p>
        
        <div>
        Sincerely thank.
        </div>

        `
    }
    return result
}





module.exports = {
    sendSimpleEmail,
    sendAttachment



}

