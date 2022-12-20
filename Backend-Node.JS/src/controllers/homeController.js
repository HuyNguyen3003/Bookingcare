import db from "../models/index"
import CRUDServices from "../services/CRUDServices"

let getHomepage = async (req, res) => {

    try {

        let data = await db.User.findAll();


        return res.render('homepage.ejs', {
            data: JSON.stringify(data)

        })


    } catch (e) {
        console.log(e);
    }


}


let getAbout = (req, res) => {
    return res.render('about.ejs')
}
let getCrud = (req, res) => {
    return res.render('crud.ejs')

}
let postCrud = async (req, res) => {

    let message = await CRUDServices.createNewUser(req.body)

    return res.send("post crud from server")
}

let displayCrud = async (req, res) => {
    let data = await CRUDServices.getAllUser()



    return res.render("displayCRUD.ejs", {
        DataTable: data
    })

}

let getEditCrud = async (req, res) => {
    let UserId = req.query.id
    if (UserId) {
        let UserData = await CRUDServices.getUserInfoById(UserId)
        return res.render("editCRUD.ejs", {
            dataUser: UserData
        })

    } else {
        return res.send("edit link pl")
    }



}

let putcrud = async (req, res) => {
    let data = req.body
    await CRUDServices.updateUserdata(data)
    return res.send("done")

}

let deletecrud = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDServices.deleteUserdata(id)
        return res.send("done")
    } else {
        return res.send("user not found")
    }



}

module.exports = {
    getHomepage,
    getAbout,
    getCrud,
    postCrud,
    displayCrud,
    getEditCrud,
    putcrud,
    deletecrud,


} 