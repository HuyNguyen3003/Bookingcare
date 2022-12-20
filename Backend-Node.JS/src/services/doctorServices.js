import db from "../models/index";
require('dotenv').config()
import _, { reject } from "lodash";
import emailServices from "./emailServices"



const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDoctorHome = (limit) => {
    return new Promise(async (resole, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }

                ],
                raw: true,
                nest: true,
            })
            resole({
                errCode: 0,
                data: users
            })



        } catch (e) {
            reject(e)
        }

    })
}

let getAllTopDocter = () => {
    return new Promise(async (resole, reject) => {
        try {
            let doctor = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', "image"]
                },

            })
            resole({
                errCode: 0,
                data: doctor
            })



        } catch (e) {
            reject(e)
        }

    })
}

let postDocter = (data) => {
    return new Promise(async (resole, reject) => {

        try {

            if (!data.doctorId
                || !data.contentHTML
                || !data.contentMarkdown
                || !data.action
                || !data.SelectPrice
                || !data.SelectPayment
                || !data.SelectProvince
                || !data.nameClinic
                || !data.addressClinic
                || !data.note
                //  || !data.clinicId
                || !data.specialtyId
            ) {
                resole({
                    errCode: -1,
                    errMessage: 'Missing parameter'
                })

            }
            else {

                // up markdown
                if (data.action === 'CREAT') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,

                    })
                } else if (data.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML
                        doctorMarkdown.contentMarkdown = data.contentMarkdown
                        doctorMarkdown.description = data.description
                        doctorMarkdown.updateAt = new Date()
                        await doctorMarkdown.save()
                    }

                }

                //upto doctor infor

                let doctorInfor = await db.doctor_Infor.findOne({
                    where: { doctorId: data.doctorId },
                    raw: false
                })


                if (doctorInfor) {
                    //up
                    doctorInfor.doctorId = data.doctorId
                    doctorInfor.pirceId = data.SelectPrice
                    doctorInfor.paymentId = data.SelectPayment
                    doctorInfor.provinceId = data.SelectProvince
                    doctorInfor.nameClinic = data.nameClinic
                    doctorInfor.addressClinic = data.addressClinic
                    doctorInfor.note = data.note
                    //  doctorInfor.clinicId = data.clinicId
                    doctorInfor.specialtyId = data.specialtyId

                    await doctorInfor.save()
                } else {
                    await db.doctor_Infor.create({
                        doctorId: data.doctorId,
                        priceId: data.SelectPrice,
                        paymentId: data.SelectPayment,
                        provinceId: data.SelectProvince,
                        nameClinic: data.nameClinic,
                        addressClinic: data.addressClinic,
                        note: data.note,
                        // clinicId: data.clinicId,
                        specialtyId: data.specialtyId
                    })
                }


                resole({
                    errCode: 0,
                    errMessage: 'Save infor succeed'
                })

            }

        } catch (e) {
            reject(e)
            console.log(e)
        }
    })
}

let getDoctor = (Inputid) => {
    return new Promise(async (resole, reject) => {
        try {
            if (!Inputid) {
                reject({
                    errCode: -1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: Inputid
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        // { model: db.doctor_Infor }



                        {
                            model: db.doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId',]
                            },

                            include: [
                                { model: db.Allcode, as: 'priceIdData', attributes: ['valueEn', 'valueVi'] },

                                { model: db.Allcode, as: 'provinceIdData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentIdData', attributes: ['valueEn', 'valueVi'] },

                                { model: db.Specialty, as: 'specialtyidData', attributes: ['name', 'id'] },


                            ]
                        },





                    ],
                    raw: false,
                    nest: true,
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')

                }
                resole({
                    errCode: 0,
                    data: data
                })
            }


        } catch (e) {
            console.log(e)
            reject(e)
        }
    })

}

let bulkCreatdata = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            if (!data.data) {
                resole({
                    errCode: 1,
                    errMessage: "mising req param !"
                })
            } else {




                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.date },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true

                    }
                )






                let toCreat = _.differenceWith(data.data, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date
                })
                if (toCreat && toCreat.length > 0) {
                    toCreat = toCreat.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }

                if (toCreat && toCreat.length > 0) {
                    await db.Schedule.bulkCreate(toCreat)
                }

                resole({
                    errCode: 0,
                    errMessage: "OK"
                })

            }

        } catch (e) {
            reject(e)
        }
    })

}

let getSchedule = (Id, Date) => {
    return new Promise(async (resole, reject) => {
        try {
            if (!Id || !Date) {
                resole({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {


                let dataTimeTpye = await db.Schedule.findAll(
                    {
                        where: {
                            doctorId: Id,
                            date: Date
                        },
                        include: [
                            { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                            { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },

                        ],
                        raw: false,
                        nest: true,


                    },


                )
                if (!dataTimeTpye) {
                    resole({
                        errCode: -1
                    })
                }

                resole({
                    errCode: 0,
                    data: dataTimeTpye
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}

let getExtraInforSV = (doctorId) => {
    return new Promise(async (resole, reject) => {
        try {
            if (!doctorId) {
                resole({
                    errCode: -1,
                    errMessage: 'Missing doctor id'
                })
            } else {
                let data = await db.doctor_Infor.findOne({
                    where: { doctorId: doctorId },
                    include: [
                        { model: db.Allcode, as: 'priceIdData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceIdData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentIdData', attributes: ['valueEn', 'valueVi'] },

                    ]
                })
                if (!data) data = {}

                resole({
                    errCode: 0,
                    data: data
                })





            }


        } catch (e) {
            reject(e)
        }
    })
}


let getprofileDoctor = (doctorId) => {
    return new Promise(async (resole, reject) => {
        try {
            if (!doctorId) {
                resole({
                    errCode: -1,
                    errMessage: 'Missing doctor id'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        {
                            model: db.doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },

                            include: [
                                { model: db.Allcode, as: 'priceIdData', attributes: ['valueEn', 'valueVi'] },

                                { model: db.Allcode, as: 'provinceIdData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentIdData', attributes: ['valueEn', 'valueVi'] },

                            ]
                        },
                    ],
                    raw: false,
                    nest: true,
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')

                }
                if (!data) data = {}
                resole({
                    errCode: 0,
                    data: data
                })





            }


        } catch (e) {
            reject(e)
        }
    })
}


let getlistPatirntforDoctor = (id, date) => {

    return new Promise(async (resole, reject) => {
        try {

            if (!id || !date) {
                resole({
                    errCode: -1,
                    errMessage: 'Missing paramer'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: { doctorId: id, date: date, statusId: 'S2' },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.Allcode, as: 'patientDataPatient', attributes: ['valueEn', 'valueVi'] }


                    ],
                    raw: false,
                    nest: true,
                })


                resole({
                    errCode: 0,
                    data: data
                })





            }


        } catch (e) {
            reject(e)
        }
    })




}

let sendRemedy = (data) => {
    return new Promise(async (resole, reject) => {
        try {

            if (!data.email || !data.doctorId || !data.patientiId || !data.timeType || !data.image) {
                resole({
                    errCode: -1,
                    errMessage: 'Missing paramer'
                })
            } else {

                // update
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        statusId: 'S2',
                        patientiId: data.patientiId,
                        timeType: data.timeType
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S3'
                    await appointment.save()
                }

                await emailServices.sendAttachment(data)



                resole({
                    errCode: 0,
                    data: data
                })






            }







        } catch (e) {
            reject(e)
        }
    })


}





module.exports = {
    getTopDoctorHome, getAllTopDocter,
    postDocter, getDoctor, bulkCreatdata,
    getSchedule, getExtraInforSV,
    getprofileDoctor, getlistPatirntforDoctor,
    sendRemedy
}


