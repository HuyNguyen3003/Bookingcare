const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILDAD: 'FETCH_GENDER_FAILDAD',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILDAD: 'FETCH_POSITION_FAILDAD',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILDAD: ' FETCH_ROLE_FAILDAD',

    CREAT_USER_SUCCESS: 'CREAT_USER_SUCCESS',
    CREAT_USER_FAILDAD: '  CREAT_USER_FAILDAD',

    EDIT_USER_SUCCESS: 'CREAT_USER_SUCCESS',
    EDIT_USER_FAILDAD: '  CREAT_USER_FAILDAD',


    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILDAD: '  DELETE_USER_FAILDAD',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILDAD: 'FETCH_ALL_USER_FAILDAD',

    GET_TOP_DOCTOR_SUCCESS: 'GET_TOP_DOCTOR_SUCCESS',
    GET_TOP_DOCTOR_FAILDED: 'GET_TOP_DOCTOR_FAILDED',

    GET_ALL_TOP_DOCTOR_SUCCESS: 'GET_ALL_TOP_DOCTOR_SUCCESS',
    GET_ALL_TOP_DOCTOR_FAILDED: 'GET_ALL_TOP_DOCTOR_FAILDED',

    SAVE_DOCTOR_SUCCESS: 'SAVE_DOCTOR_SUCCESS',
    SAVE_DOCTOR_FAILDED: 'SAVE_DOCTOR_FAILDED',

    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILDED',


    FETCH_REQUIRED_DOCTOR_SUCCESS: 'FETCH_DOCTOR_PRICE_SUCCESS',
    FETCH_REQUIRED_DOCTOR_FAILDAD: 'FETCH_DOCTOR_PRICE_FAILDAD',

})


export default actionTypes;