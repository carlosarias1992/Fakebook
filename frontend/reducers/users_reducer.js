import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_POST, RECEIVE_POST } from '../actions/posts_actions';
import { RECEIVE_FRIEND_REQUEST } from '../actions/friend_request_actions';
import {
    RECEIVE_USERS,
    RECEIVE_USER
} from '../actions/user_actions';

export default (state = {}, action) => {
    const { user } = action;
    const oldState = Object.freeze(state);
    let newState, updatedUser;

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            newState = { [user.id]: user };
            return merge({}, oldState, newState);
        case RECEIVE_USERS:
            newState = action.users;
            return merge({}, oldState, newState);
        case RECEIVE_USER:
            newState = { [user.id]: user };
            return merge({}, oldState, newState);
        case RECEIVE_FRIEND_REQUEST:
            const { request } = action;
            const requestValue = Object.values(request)[0];
            const senderFriends = merge({}, oldState[requestValue.sender_id]).friends_id;
            const receiverFriends = merge({}, oldState[requestValue.receiver_id]).friends_id;
            let sender, receiver;
            
            if(requestValue.status === "accepted") {
                senderFriends.push(requestValue.receiver_id);
                sender = { [requestValue.sender_id]: { friends_id: senderFriends } };

                receiverFriends.push(requestValue.sender_id);
                receiver = { [requestValue.receiver_id]: { friends_id: receiverFriends } };
            } 

            return merge({}, oldState, sender, receiver);
        case RECEIVE_POST: 
            updatedUser = merge({}, oldState[action.post.author_id]);
            
            if (action.newPost) {
                action.post.photos.forEach(photo => {
                    updatedUser.photos.unshift(photo);
                });
            }

            newState = { [updatedUser.id]: updatedUser };
            return merge({}, oldState, newState);
        case REMOVE_POST:
            updatedUser = oldState[action.post.author_id];

            updatedUser.photos = updatedUser.photos.filter(photo => {
                return !action.post.photos.includes(photo);
            });

            newState = { [updatedUser.id]: updatedUser };
            return merge({}, oldState, newState);
        default: 
            return state;
    }
};