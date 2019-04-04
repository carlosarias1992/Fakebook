import { merge } from 'lodash';
import { removeObject } from '../util/reducer_util';
import { 
    RECEIVE_COMMENT, 
    RECEIVE_COMMENTS, 
    REMOVE_COMMENT 
} from '../actions/comments_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);

    switch(action.type) {
        case RECEIVE_COMMENT:
            return merge({}, oldState, action.comment);
        case RECEIVE_COMMENTS:
            return action.comments;
        case REMOVE_COMMENT:
            return removeObject(action.id, oldState);
        default: 
            return oldState;
    }
};