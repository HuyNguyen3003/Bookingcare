const db = require("../models")
require('dotenv').config()

import { reject, result } from "lodash"
import emailServices from "./emailServices"
import { v4 as uuidv4 } from 'uuid';



let buildUrlEmail = (token, doctorId) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`


    return result
}


let postBookuser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: "missing required parametere"
                })
            } else {
                let token = uuidv4()


                await emailServices.sendSimpleEmail({
                    reciverEmail: data.email,
                    patienName: data.fullName,
                    doctorName: data.nameDoctor,
                    time: data.timeString,
                    language: data.language,
                    redirectLink: buildUrlEmail(token, data.doctorId)

                })


                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        firstName: data.fullName,
                        phonenumber: data.phoneNumber,
                        address: data.address,
                        gender: data.selectedGender

                    }
                })

                if (user && user[0]) {

                    await db.Booking.findOrCreate({
                        where: { patientiId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientiId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }


                resolve({

                    errCode: 0,
                    errMessage: 'save infor user succees!'
                })

            }

        } catch (e) {
            reject(e);
        }
    })
}


let postVerifyBookuser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing required parametere"
                })
            } else {

                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'appointment has been activated or does not exist!'
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })

}








module.exports = {
    postBookuser,
    postVerifyBookuser



}

