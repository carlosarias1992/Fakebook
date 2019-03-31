import { merge } from 'lodash';
import { 
    RECEIVE_POST,
    REMOVE_POST,
    RECEIVE_POSTS
} from '../actions/posts_actions';

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
            const stateKeys = Object.keys(oldState);
            newState = {};

            for(let i = 0; i < stateKeys.length; i++) {
                if (parseInt(stateKeys[i]) !== action.postId) {
                    newState = merge(newState, { [stateKeys[i]]: state[stateKeys[i]] });
                }
            }

            return newState;
        default: 
            return oldState;
    }
};