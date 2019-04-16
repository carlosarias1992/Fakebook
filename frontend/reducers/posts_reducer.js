import { merge } from 'lodash';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions';
import { REMOVE_COMMENT, RECEIVE_COMMENT } from '../actions/comments_actions';
import { RECEIVE_SESSION_DATA } from '../actions/user_actions';
import { 
    RECEIVE_POST,
    REMOVE_POST,
    RECEIVE_POSTS
} from '../actions/posts_actions';
import { removeObject } from '../util/reducer_util';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState, like, post_id, comment;

    switch(action.type) {
        case RECEIVE_POSTS:
            return action.posts;
        case RECEIVE_SESSION_DATA:
            return action.posts;
        case RECEIVE_POST:
            newState = { [action.post.id]: action.post };
            return merge({}, oldState, newState);
        case RECEIVE_LIKE:
            like = Object.values(action.like)[0];
            newState = merge({}, oldState);

            if (like.likeable_type === "post") {
                post_id = like.likeable_id;
                newState[post_id].likes_id.push(like.id);
                newState = { [post_id]: { likes_id: newState[post_id].likes_id } };
            } else {
                newState = {};
            }

            return merge({}, oldState, newState);
        case REMOVE_LIKE:
            like = Object.values(action.like)[0];
            newState = merge({}, oldState);

            if (like.likeable_type === "post") {
                post_id = like.likeable_id;

                const likes_id = newState[post_id].likes_id.filter(like_id => {
                    return like_id !== like.id;
                });

                newState[post_id].likes_id = likes_id;
            } 

            return newState;
        case REMOVE_POST:
            return removeObject(action.post.id, oldState);
        case RECEIVE_COMMENT:
            comment = Object.values(action.comment)[0];
            newState = merge({}, oldState);

            post_id = comment.post_id;
            if (!newState[post_id].comments_id.includes(comment.id)) {
                newState[post_id].comments_id.push(comment.id);
                newState = { [post_id]: { comments_id: newState[post_id].comments_id } };
            }

            return merge({}, oldState, newState);
        case REMOVE_COMMENT:
            comment = Object.values(action.comment)[0];
            newState = merge({}, oldState);

            post_id = comment.post_id;

            const comments_id = newState[post_id].comments_id.filter(comment_id => {
                return comment_id !== comment.id;
            });

            newState[post_id].comments_id = comments_id;

            return newState;
        default: 
            return oldState;
    }
};