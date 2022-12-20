import bcrypt from "bcryptjs"
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBrcypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBrcypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,

            })
            resolve("oke done");


        } catch (e) {
            reject(e)
        }

    })



}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpassword = await bcrypt.hashSync(password, salt);
            resolve(hashpassword)

        } catch (e) {
            reject(e);

        }


    })

}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })
            resolve(users)

        } catch (e) {
            reject(e)

        }

    })

}
let getUserInfoById = (UserId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: UserId },
                raw: true,
            })

            if (user) {
                resolve(user)
            } else {
                resolve([])
            }

        } catch (e) {
            reject(e)
        }
    })


}
let updateUserdata = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save();
                let TableData = await db.User.findAll()
                resolve(TableData);
            } else {
                resolve();
            }

        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserdata = (Userid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { id: Userid }
            })
            if (user) {
                await user.destroy()
                resolve()

            }

        } catch (e) {
            reject(e)
        }
    })

}


module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserdata,
    deleteUserdata,


}