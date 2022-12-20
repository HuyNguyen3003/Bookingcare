import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
import clinicController from "../controllers/clinicController"



let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", homeController.getHomepage)
    router.get("/about", homeController.getAbout)

    router.get("/crud", homeController.getCrud)
    router.get("/get-crud", homeController.displayCrud)
    router.get("/edit-crud", homeController.getEditCrud)
    router.get("/delete-crud", homeController.deletecrud)
    router.post("/post-crud", homeController.postCrud)
    router.post("/put-crud", homeController.putcrud)


    router.post("/api/login", userController.apiLogin)
    router.get("/api/getAllUser", userController.handlegetAlluser)
    router.post("/api/ceatuser", userController.creatuser)
    router.put("/api/editeuser", userController.editeuser)
    router.delete("/api/deleteuser", userController.deleteuser)
    router.get("/api/allcode", userController.getAllcode)


    router.get("/api/top-doctor-home", doctorController.getTopDocter)
    router.get("/api/getAlls-doctor-home", doctorController.getAllTopDocter)
    router.post("/api/save-infor-doctor-home", doctorController.postInforDocter)
    router.get("/api/getdetaildoctor", doctorController.getDetailDoctorbyId)
    router.post("/api/bulk-creat-schedule", doctorController.bulkCreatSchedule)
    router.get("/api/getScheduleBydate", doctorController.getScheduleBydate)
    router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInfor)
    router.get("/api/get-profile-doctor-by-id", doctorController.getprofile)
    router.get("/api/get-list-patient-for-dortor", doctorController.getlistPatirntforDoctor)
    router.post("/api/sendRemedy", doctorController.sendRemedy)







    router.post("/api/patient-book-appointment", patientController.postBookAppointment)
    router.post("/api/verify-book-appointment", patientController.postVerifyAppointment)


    router.post("/api/creat-new-specialty", specialtyController.creatNewSpecialty)
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty)
    router.get("/api/get-detail-byId", specialtyController.getDetailSpecialty)


    router.post("/api/creat-new-clinic", clinicController.creatNewClinic)
    router.get("/api/get-all-clinic", clinicController.getAllClinic)
    router.get("/api/get-detailClinic-byId", clinicController.getDetailClinic)



























    return app.use("/", router)



}


module.exports = initWebRoutes;