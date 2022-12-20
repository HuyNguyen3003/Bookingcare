import clinicServer from "../services/clinicServices"





let creatNewClinic = async (req, res) => {
    try {



        let infor = await clinicServer.postAddNewClinic(req.body)

        return res.status(200).json(infor)




    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service dm'
        })
    }
}

//


let getAllClinic = async (req, res) => {
    try {



        let infor = await clinicServer.getAllClinicServices()

        return res.status(200).json(infor)




    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service dm'
        })
    }

}

let getDetailClinic = async (req, res) => {
    try {



        let infor = await clinicServer.getAllDetailClinicId(req.query.id)

        return res.status(200).json(infor)




    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service '
        })
    }
}




module.exports = {
    creatNewClinic,
    getAllClinic,
    getDetailClinic


} 