import { 
    RECEIVE_POST,
    REMOVE_POST,
    RECEIVE_POSTS
} from '../actions/posts_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        default: 
            return oldState;
    }
};