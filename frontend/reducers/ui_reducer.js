import { merge } from 'lodash';
import { 
    SHOW_EDIT_MODAL,
    HIDE_EDIT_MODAL
} from '../actions/ui_actions';
import { RECEIVE_POSTS } from '../actions/posts_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case SHOW_EDIT_MODAL:
            newState = { editModal: { [action.id]: true } };
            return merge({}, oldState, newState);
        case HIDE_EDIT_MODAL:
            newState = { editModal: { [action.id]: false } };
            return merge({}, oldState, newState);
        case RECEIVE_POSTS:
            const posts = Object.keys(action.posts);

            for (let i = 0; i < posts.length; i++) {
                newState = merge(newState, { [posts[i]]: false });
            }

            return { editModal: newState };
        default: 
            return oldState;
    }
};