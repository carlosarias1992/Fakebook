import * as ApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER
    };
};

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    };
};

export const login = user => dispatch => {
    return ApiUtil
        .loginUser(user)
        .then(currentUser => { 
            dispatch(receiveCurrentUser(currentUser));
        }, errors => {
            dispatch(receiveErrors(errors));
        });
};

export const logout = () => dispatch => {
    return ApiUtil
        .logoutUser()
        .then(() => {
            dispatch(logoutCurrentUser());
        }, errors => {
            dispatch(receiveErrors(errors));
        });
};

export const signup = user => dispatch => {
    return ApiUtil
        .signupUser(user)
        .then(currentUser => {
            dispatch(receiveCurrentUser(currentUser));
        }, errors => {
            dispatch(receiveErrors(errors));
        });
};