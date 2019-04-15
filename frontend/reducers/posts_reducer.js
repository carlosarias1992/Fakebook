import { merge } from 'lodash';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/likes_actions';
import { 
    RECEIVE_POST,
    REMOVE_POST,
    RECEIVE_POSTS
} from '../actions/posts_actions';
import { removeObject } from '../util/reducer_util';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;
    let like;
    let post_id;

    switch(action.type) {
        case RECEIVE_POSTS:
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
        default: 
            return oldState;
    }
};