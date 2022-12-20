
import patientServices from "../services/patientServices"

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientServices.postBookuser(req.body)
        return res.status(200).json(infor)




    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service'
        })
    }
}

let postVerifyAppointment = async (req, res) => {
    try {
        let infor = await patientServices.postVerifyBookuser(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from the service'
        })
    }
}







module.exports = {
    postBookAppointment,
    postVerifyAppointment


} 