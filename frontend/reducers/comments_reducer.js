import { merge } from 'lodash';
import { removeObject } from '../util/reducer_util';
import { 
    RECEIVE_COMMENT, 
    RECEIVE_COMMENTS, 
    REMOVE_COMMENT 
} from '../actions/comments_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newComment;

    switch(action.type) {
        case RECEIVE_COMMENT:
            const oldComment = oldState[Object.keys(action.comment)[0]];
            if (oldComment && oldComment.newComment) {
                newComment = true;
            } else {
                newComment = action.newComment || false;
            }

            const nextState = merge({ [Object.keys(action.comment)[0]]: { newComment } }, action.comment);
            return merge({}, oldState, nextState);
        case RECEIVE_COMMENTS:
            return action.comments;
        case REMOVE_COMMENT:
            return removeObject(action.id, oldState);
        default: 
            return oldState;
    }
};