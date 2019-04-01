import { merge } from 'lodash';
import { 
    RECEIVE_POST,
    REMOVE_POST,
    RECEIVE_POSTS
} from '../actions/posts_actions';
import { removeObject } from '../util/reducer_util';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_POSTS:
            return action.posts;
        case RECEIVE_POST:
            newState = { [action.post.id]: action.post };
            return merge({}, oldState, newState);
        case REMOVE_POST:
            return removeObject(action.postId, oldState);
        default: 
            return oldState;
    }
};