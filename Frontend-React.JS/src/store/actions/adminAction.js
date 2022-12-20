import actionTypes from './actionTypes';
import {
    getAllcodeservice, creatNewUser,
    getAllUser, deleteUser, updateUser,
    getTopDocter, getAllTopDocter,
    saveDetailDoctor, getAllSpecialty
} from "../../services/userService"
import { toast } from 'react-toastify';



// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START

// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: actionTypes.FETCH_GENDER_START })


            let res = await getAllcodeservice('GENDER')
            if (res && res.errcode === 0) {
                dispatch(fetchGenderSUCCESS(res.data));
            } else {
                dispatch(fetchGenderFailded());
            }

        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart error', e)
        }
    }

}


export const fetchGenderSUCCESS = (genderdata) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderdata
})
export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAILDAD
})

export const fetchPositionSUCCESS = (positionData) => ({

    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILDAD
})

export const fetchRoleSUCCESS = (Roledata) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: Roledata
})
export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILDAD
})


export const CreatNewUser = (data) => {
    return async (dispatch, getState) => {
        try {


            let res = await creatNewUser(data)
            if (res && res.errcode === 0) {
                toast.success('creat success')
                dispatch(fetchSaveSUCCESS());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(fetchSaveFailded());
                alert(res.errMessage)
            }

        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart error', e)
        }
    }

}


export const fetchSaveSUCCESS = (Roledata) => ({
    type: actionTypes.CREAT_USER_SUCCESS,

})
export const fetchSaveFailded = () => ({
    type: actionTypes.CREAT_USER_FAILDAD
})



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUser('ALL')


            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSUCCESS(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailded());
            }

        } catch (e) {
            dispatch(fetchAllUserFailded());
            console.log('fetchAll 1 error', e)
        }
    }

}

export const fetchAllUserSUCCESS = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data


})
export const fetchAllUserFailded = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDAD

})


export const fetchDeleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUser(id)
            if (res && res.errcode === 0) {
                toast.success('delete success')
                dispatch(fetchDeleteUserSuccess());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(fetchDeleteUserFailded());
            }

        } catch (e) {
            dispatch(fetchDeleteUserFailded());
            console.log('fetch del error', e)
        }
    }

}

export const fetchDeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS


})
export const fetchDeleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDAD

})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {


            let res = await updateUser(data)
            if (res && res.errcode === 0) {
                toast.success('Update success')
                dispatch(fetchEditSUCCESS());
                dispatch(fetchAllUserStart())
            } else {
                dispatch(fetchSaveFailded());
                alert(res.errMessage)
            }

        } catch (e) {
            dispatch(fetchEditFailded());
            console.log('update faild', e)
        }
    }

}


export const fetchEditSUCCESS = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})
export const fetchEditFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDAD
})

//   

export const fetchGetTopDoctor = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getTopDocter('3')

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
                    dataDocter: res
                })


            } else {
                dispatch({
                    type: actionTypes.GET_TOP_DOCTOR_FAILDED
                });
            }

        } catch (e) {
            dispatch({
                type: actionTypes.GET_TOP_DOCTOR_FAILDED
            });
            console.log('fetch docter  error', e)
        }
    }

}

export const fetchGetAllTopDoctor = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllTopDocter()

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })



            } else {
                dispatch({
                    type: actionTypes.GET_ALL_TOP_DOCTOR_FAILDED
                });
            }

        } catch (e) {
            dispatch({
                type: actionTypes.GET_TOP_DOCTOR_FAILDED
            });
            console.log('fetch docter  error', e)
        }
    }

}

export const saveDoctor = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await saveDetailDoctor(data)

            if (res && res.errCode === 0) {
                toast.success('Creat success')
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_SUCCESS,
                })



            } else {
                toast.error('errol')
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_FAILDED
                });
            }

        } catch (e) {
            toast.error('errol')
            dispatch({
                type: actionTypes.SAVE_DOCTOR_FAILDED
            });
            console.log('fetch docter  error', e)
        }
    }

}

export const fetchGetAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcodeservice("TIME")
            //console.log(res)

            if (res && res.errcode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })



            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
                });
            }

        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
            });
            console.log('fetch time  error', e)
        }
    }

}
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {

            let resPrice = await getAllcodeservice('PRICE')
            let resPayment = await getAllcodeservice('PAYMENT')
            let resProvince = await getAllcodeservice('PROVINCE')
            let resSpecialty = await getAllSpecialty()

            if (resPrice && resPrice.errcode === 0 &&
                resPayment && resPayment.errcode === 0 &&
                resProvince && resProvince.errcode === 0 &&
                resSpecialty && resSpecialty.errCode === 0
            ) {
                let resData = {
                    resPrice: resPrice,
                    resPayment: resPayment,
                    resProvince: resProvince,
                    resSpecialty: resSpecialty

                }
                dispatch(getRequiredDoctorSUCCESS(resData));
            } else {
                dispatch(getRequiredDoctorFailded());
            }

        } catch (e) {
            dispatch(getRequiredDoctorFailded());
            console.log('fet required doctor error', e)
        }
    }

}


export const getRequiredDoctorSUCCESS = (resData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
    data: resData
})
export const getRequiredDoctorFailded = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_FAILDAD
})
