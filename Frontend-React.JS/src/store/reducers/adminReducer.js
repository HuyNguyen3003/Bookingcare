import actionTypes from '../actions/actionTypes';



const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    topAllDoctor: [],
    arrSchedule: [],
    resDataDoctor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:

            state.isLoadingGender = true
            //console.log("succsess->", action)
            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_SUCCESS:


            state.genders = action.data
            state.isLoadingGender = false
            //console.log("succsess->", action)

            return {
                ...state,

            }

        case actionTypes.FETCH_GENDER_FAILDAD:


            console.log("faild uu", action)
            state.isLoadingGender = false
            state.genders = []
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILDAD:


            console.log("faild uu", action)
            state.isLoadingGender = false
            state.positions = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:


            state.roles = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILDAD:

            console.log("faild uu", action)
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:

            state.users = action.users
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_FAILDAD:

            console.log("faild fetch data", action)
            state.users = []
            return {
                ...state,

            }
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:

            state.topDoctor = action.dataDocter
            return {
                ...state,

            }

        case actionTypes.GET_ALL_TOP_DOCTOR_SUCCESS:

            state.topAllDoctor = action.data

            return {
                ...state,

            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:

            state.arrSchedule = action.dataTime

            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:

            state.arrSchedule = []

            return {
                ...state,

            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:

            state.resDataDoctor = action.data

            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;