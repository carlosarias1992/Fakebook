import { merge } from 'lodash';
import { removeObject } from '../util/reducer_util';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions';
import { 
    RECEIVE_COMMENT, 
    RECEIVE_COMMENTS, 
    REMOVE_COMMENT 
} from '../actions/comments_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newComment, like, comment_id, newState;

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
        case RECEIVE_LIKE:
            like = Object.values(action.like)[0];
            newState = merge({}, oldState);

            if (like.likeable_type === "comment") {
                comment_id = like.likeable_id;
                newState[comment_id].likes_id.push(like.id);
                newState = { [comment_id]: { likes_id: newState[comment_id].likes_id } };
            } else {
                newState = {};
            }

            return merge({}, oldState, newState);
        case REMOVE_LIKE:
            like = Object.values(action.like)[0];
            newState = merge({}, oldState);

            if (like.likeable_type === "comment") {
                comment_id = like.likeable_id;

                const likes_id = newState[comment_id].likes_id.filter(like_id => {
                    return like_id !== like.id;
                });

                newState[comment_id].likes_id = likes_id;
            }

            return newState;
        default: 
            return oldState;
    }
};