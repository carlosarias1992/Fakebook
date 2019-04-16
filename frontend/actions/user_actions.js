import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_SESSION_DATA = "RECEIVE_SESSION_DATA";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveSessionData = ({ users, posts, comments, friendRequests, likes }) => {
    return {
        type: RECEIVE_SESSION_DATA,
        users,
        posts,
        comments,
        friendRequests,
        likes,
        sessionDataReceived: true
    };
};

const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const fetchSessionData = () => dispatch => {
    return UserApiUtil.fetchSessionData()
        .then(payload => dispatch(receiveSessionData(payload)));
};

export const fetchUser = id => dispatch => {
    return UserApiUtil.fetchUser(id)
        .then(user => dispatch(receiveUser(user)));
};

export const updateUser = user => dispatch => {
    return UserApiUtil.updateUser(user)
        .then(editedUser => dispatch(receiveUser(editedUser)));
};

export const updatePhoto = (photo, userId) => dispatch => {
    return UserApiUtil.updatePhoto(photo, userId)
        .then(editedUser => dispatch(receiveUser(editedUser)));
};