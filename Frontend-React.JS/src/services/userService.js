import axios from "../axios"


const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/getAllUser?id=${idUser}`);
}

const creatNewUser = (data) => {
    return axios.post('/api/ceatuser', data)
}
const updateUser = (Userdata) => {
    return axios.put("/api/editeuser", Userdata)
}




const deleteUser = (idUser) => {

    return axios.delete('/api/deleteuser', {

        data: {
            id: idUser
        }
    });


}

const getAllcodeservice = (typeInput) => {
    return axios.get(`/api/allcode?type=${typeInput}`)

}


const getTopDocter = (limit) => {
    return axios.get(`/api/top-doctor-home?=${limit}`)
}

const getAllTopDocter = () => {
    return axios.get(`/api/getAlls-doctor-home`)
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor-home`, data)
}
const getDetailDoctor = (id) => {
    return axios.get(`/api/getdetaildoctor?id=${id}`)
}
const bulkCreat = (data) => {
    return axios.post(`/api/bulk-creat-schedule`, data)
}

const getSchedule = (doctorId, date) => {
    return axios.get(`/api/getScheduleBydate?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfor = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}


const getinforDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const postBooking = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const verifyBooking = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}




const addNewSpecialty = (data) => {
    return axios.post(`/api/creat-new-specialty`, data)
}



const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}



const getAllSpecialtybyId = (inputId, type) => {
    return axios.get(`/api/get-detail-byId?id=${inputId}&location=${type}`)
}


const addNewClinic = (data) => {
    return axios.post(`/api/creat-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}



const getAllClinicbyId = (inputId) => {
    return axios.get(`/api/get-detailClinic-byId?id=${inputId}`)
}


const getAllPatient = (Id, date) => {
    return axios.get(`/api/get-list-patient-for-dortor?doctorId=${Id}&date=${date}`)
}

const sendRemedy = (data) => {
    return axios.post(`/api/sendRemedy`, data)
}


export {
    handleLogin, getAllUser, deleteUser, creatNewUser,
    updateUser, getAllcodeservice, getTopDocter, getAllTopDocter,
    saveDetailDoctor, getDetailDoctor, bulkCreat, getSchedule,
    getExtraInfor, getinforDoctor, postBooking, verifyBooking,
    addNewSpecialty, getAllSpecialty, getAllSpecialtybyId,
    addNewClinic, getAllClinic, getAllClinicbyId, getAllPatient,
    sendRemedy



}


