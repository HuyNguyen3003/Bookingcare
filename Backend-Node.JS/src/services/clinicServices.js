import db from "../models/index";



let postAddNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.descriptionMarkdown || !data.descriptionHTML || !data.name || !data.imageBase64 || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "missing required parametereuuu"
                })
            } else {


                await db.Clinic.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                    address: data.address

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




let getAllClinicServices = () => {

    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Clinic.findAll()



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

let getAllDetailClinicId = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: -1,
                    errMessage: 'missing id!',
                    data: []
                })

            } else {

                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')

                }
                if (data) {
                    resolve({

                        errCode: 0,
                        errMessage: 'ok!',
                        data: data
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

    postAddNewClinic,
    getAllClinicServices,
    getAllDetailClinicId


}
