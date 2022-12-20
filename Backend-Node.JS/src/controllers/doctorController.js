import doctorServices from "../services/doctorServices"


let getTopDocter = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 10;
    try {
        let response = await doctorServices.getTopDoctorHome(+limit)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "err from service "
        })
    }
}

let getAllTopDocter = async (req, res) => {
    try {
        let doctor = await doctorServices.getAllTopDocter();
        return res.status(200).json(doctor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            Message: "err"
        })
    }

}

let postInforDocter = async (req, res) => {
    try {

        let response = await doctorServices.postDocter(req.body);
        return res.status(200).json(response)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            Message: "errol from server xxx"
        })
    }
}

let getDetailDoctorbyId = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                reeCode: -2,
                errMessage: "missing id"
            })

        } else {
            let response = await doctorServices.getDoctor(req.query.id)
            return res.status(200).json(
                response
            )
        }

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            reeCode: -1,
            errMessage: "err from server"
        })
    }
}

let bulkCreatSchedule = async (req, res) => {
    try {
        let infor = await doctorServices.bulkCreatdata(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}
let getScheduleBydate = async (req, res) => {
    try {
        let infor = await doctorServices.getSchedule(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })
    }
}

let getExtraInfor = async (req, res) => {
    try {
        let infor = await doctorServices.getExtraInforSV(req.query.doctorId)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })

    }
}

let getprofile = async (req, res) => {
    try {
        let infor = await doctorServices.getprofileDoctor(req.query.doctorId)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })

    }
}


let getlistPatirntforDoctor = async (req, res) => {
    try {
        let infor = await doctorServices.getlistPatirntforDoctor(req.query.doctorId, req.query.date)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })

    }



}

let sendRemedy = async (req, res) => {
    try {
        let infor = await doctorServices.sendRemedy(req.body)
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from server"
        })

    }

}


module.exports = {
    getTopDocter, getAllTopDocter,
    postInforDocter, getDetailDoctorbyId,
    bulkCreatSchedule, getScheduleBydate,
    getExtraInfor, getprofile, getlistPatirntforDoctor,
    sendRemedy


} 