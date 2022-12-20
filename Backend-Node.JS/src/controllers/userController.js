import userService from "../services/userService"

let apiLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errorcode: 1,
            message: 'missing inputs parameter !~~'
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errcode,
        message: userData.errMessage,
        userData: userData.user ? userData.user : {},

    })

}


let handlegetAlluser = async (req, res) => {
    let id = req.query.id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "check id, pls",
            users
        })

    }

    let users = await userService.getAllUser(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users
    })


}


let creatuser = async (req, res) => {

    let message = await userService.CreatNewUser(req.body)
    return res.status(200).json(message)

}

let editeuser = async (req, res) => {
    let data = req.body
    if (!data) {
        return res.status(200).json({
            errCode: 2,
            errMessage: "err"
        })
    }

    let UserData = await userService.editeuser(data)
    return res.status(200).json(UserData)




}



let deleteuser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "check id"
        })

    }
    let message = await userService.deleteuser(id)
    return res.status(200).json(message)


}

let getAllcode = async (req, res) => {
    try {
        let data = await userService.getAllcodeservice(req.query.type);
        return res.status(200).json(data)

    } catch (e) {
        console.log("get all code", e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "errol from server"
        })
    }

}







module.exports = {
    apiLogin,
    handlegetAlluser,
    creatuser,
    editeuser,
    deleteuser,
    getAllcode,

}