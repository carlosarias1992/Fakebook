import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_POST, RECEIVE_POST } from '../actions/posts_actions';
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