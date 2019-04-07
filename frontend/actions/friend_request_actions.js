import * as FriendRequestApiUtil from '../util/friend_request_api_util';

export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST";

const receiveFriendRequests = requests => {
    return {
        type: RECEIVE_FRIEND_REQUESTS,
        requests
    };
};

const receiveFriendRequest = request => {
    return {
        type: RECEIVE_FRIEND_REQUEST,
        request
    };
};

const removeFriendRequest = id => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        friendRequestId: id
    };
};

export const fetchFriendRequests = userId => dispatch => {
    return FriendRequestApiUtil.fetchFriendRequests(userId)
        .then(requests => dispatch(receiveFriendRequests(requests)));
};

export const acceptFriendRequest = id => dispatch => {
    return FriendRequestApiUtil.acceptFriendRequest(id)
        .then(request => dispatch(receiveFriendRequest(request)));
};

export const deleteFriendRequest = id => dispatch => {
    return FriendRequestApiUtil.deleteFriendRequest(id)
        .then(() => dispatch(removeFriendRequest(id)));
};

export const sendFriendRequest = id => dispatch => {
    return FriendRequestApiUtil.sendFriendRequest(id)
        .then(request => dispatch(receiveFriendRequest(request)));
};

export const seenFriendRequest = id => dispatch => {
    return FriendRequestApiUtil.seenFriendRequest(id)
        .then(request => dispatch(receiveFriendRequest(request)));
};