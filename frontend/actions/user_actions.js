import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    };
};

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const fetchUsers = () => dispatch => {
    return UserApiUtil.fetchUsers()
        .then(users => dispatch(receiveUsers(users)));
};

export const fetchUser = id => dispatch => {
    return UserApiUtil.fetchUser(id)
        .then(user => dispatch(receiveUser(user)));
};

export const updateUser = user => dispatch => {
    return UserApiUtil.updateUser(user)
        .then(editedUser => dispatch(receiveUser(editedUser)));
};