import bcrypt from "bcryptjs"
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);





let handleUserLogin = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'id'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)

                    if (check) {
                        userData.errcode = 0
                        userData.errMessage = `ok`
                        delete user.password
                        userData.user = user
                        resolve(userData)

                    } else {
                        userData.errcode = 3
                        userData.errMessage = `password is false`


                    }

                } else {
                    userData.errcode = 2
                    userData.errMessage = `errol user when u creat`

                }


            } else {
                userData.errcode = 1
                userData.errMessage = `your's email is errol`

            }
            resolve(userData)
        } catch (e) {
            reject(e)

        }
    })
}



let checkUserEmail = (UserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: UserEmail }
            })
            if (user) {
                resolve(true)
            } else resolve(false)


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



let getAllUser = (Userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (Userid === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }
            if (Userid && Userid !== "ALL") {
                users = await db.User.findOne({
                    where: { id: Userid }
                })
                attributes: {
                    exclude: ['password']
                }
            }
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}

let CreatNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errcode: 1,
                    errMessage: "email is user, pl"
                });

            } else {
                let hashPasswordFromBrcypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBrcypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionID,
                    image: data.avatar
                })
                resolve({
                    errcode: 0,
                    errMessage: "ok"
                });

            }




        } catch (e) {
            reject(e)
        }

    })
}

let deleteuser = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!UserId) {
                resolve({
                    errcode: 1,
                    errMessage: "not have id , pl check"
                });
            }

            let user = await db.User.findOne({
                where: { id: UserId }
            })


            if (user) {
                await user.destroy()
                resolve({
                    errcode: 0,
                    errMessage: "ok"
                })

            }


        } catch (e) {
            reject(e)
        }
    })

}
let editeuser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender || !data.positionId) {
                resolve({
                    errcode: 1,
                    errMessage: "err"

                });
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.roleId = data.roleId
                user.positionId = data.positionId
                user.gender = data.gender
                user.phonenumber = data.phonenumber
                if (data.avatar) {
                    user.image = data.avatar
                }

                await user.save();

                resolve({
                    errcode: 0,
                    errMessage: "oke done"
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}


let getAllcodeservice = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "missing required parametere"
                })
            } else {
                let res = {};

                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errcode = 0;
                res.data = allcode;



                resolve(res)
            }

        } catch (e) {
            reject(e);
        }
    })
}







module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUser,
    CreatNewUser,
    deleteuser,
    editeuser, getAllcodeservice,



}





