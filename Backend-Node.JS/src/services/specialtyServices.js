
const db = require("../models")
require('dotenv').config()



let postAddNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.descriptionMarkdown || !data.descriptionHTML || !data.name || !data.imageBase64) {
                resolve({
                    errCode: 1,
                    errMessage: "missing required parametereuuu"
                })
            } else {


                await db.Specialty.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64

                })



                resolve({

                    errCode: 0,
                    errMessage: 'ok!'
                })


            }


        } catch (e) {
            console.log(e)

            reject(e);
        }
    })
}


let getAllSpecialtyServices = () => {

    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Specialty.findAll()


            if (data && data.length > 0) {
                data.map((item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                }))
            }
            resolve({

                errCode: 0,
                errMessage: 'ok!',
                data: data
            })







        } catch (e) {
            console.log(e)

            reject(e);
        }
    })



}

let getAllDetailId = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: -1,
                    errMessage: 'missing id!',
                    data: []
                })

            } else {
                let data = {}

                let description = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (description) data.description = description

                let specialty = {}
                if (location === 'ALL') {
                    specialty = await db.doctor_Infor.findAll({
                        where: { specialtyId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })
                } else {
                    specialty = await db.doctor_Infor.findAll({
                        where: { specialtyId: inputId, provinceId: location },
                        attributes: ['doctorId', 'provinceId']
                    })
                }
                if (specialty) data.specialty = specialty

                if (data) {


                    resolve({

                        errCode: 0,
                        errMessage: 'ok!',
                        data
                    })
                } else {
                    resolve({
                        errCode: -2,
                        errMessage: 'err db',
                        data: []
                    })
                }


            }



        } catch (e) {
            console.log(e)

            reject(e);
        }
    })


}









module.exports = {
    postAddNewSpecialty,
    getAllSpecialtyServices,
    getAllDetailId



}

