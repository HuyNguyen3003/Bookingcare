import specialtyServices from "../services/specialtyServices"





let creatNewSpecialty = async (req, res) => {
    try {



        let infor = await specialtyServices.postAddNewSpecialty(req.body)

        return res.status(200).json(infor)




    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service dm'
        })
    }
}


let getAllSpecialty = async (req, res) => {
    try {



        let infor = await specialtyServices.getAllSpecialtyServices()

        return res.status(200).json(infor)




    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service dm'
        })
    }

}

let getDetailSpecialty = async (req, res) => {
    try {



        let infor = await specialtyServices.getAllDetailId(req.query.id, req.query.location)

        return res.status(200).json(infor)




    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service '
        })
    }
}


module.exports = {
    creatNewSpecialty,
    getAllSpecialty, getDetailSpecialty


} 