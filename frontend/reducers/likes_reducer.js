import { merge } from 'lodash';
import { removeObject } from '../util/reducer_util';
import { RECEIVE_SESSION_DATA } from '../actions/user_actions';
import {
    RECEIVE_LIKE, 
    RECEIVE_LIKES,
    REMOVE_LIKE
} from '../actions/likes_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);

    switch(action.type) {
      case RECEIVE_SESSION_DATA:
        return action.likes;
      case RECEIVE_LIKES:
        return action.likes;
      case RECEIVE_LIKE:
        return merge({}, oldState, action.like);
      case REMOVE_LIKE:
        const like = Object.values(action.like)[0];
        return removeObject(like.id, oldState);
      default: 
        return oldState;
    }
};