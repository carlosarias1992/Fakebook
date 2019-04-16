import { merge } from 'lodash';
import { RECEIVE_SESSION_DATA } from '../actions/user_actions';
import { 
    SHOW_EDIT_MODAL,
    HIDE_EDIT_MODAL,
    SHOW_COMMENT_EDIT_FORM,
    HIDE_COMMENT_EDIT_FORM
} from '../actions/ui_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_SESSION_DATA:
            return { sessionDataReceived: action.sessionDataReceived };
        case SHOW_EDIT_MODAL:
            newState = { editModal: { [action.id]: true } };
            return merge({}, oldState, newState);
        case HIDE_EDIT_MODAL:
            newState = { editModal: { [action.id]: false } };
            return merge({}, oldState, newState);
        case SHOW_COMMENT_EDIT_FORM:
            newState = { commentEditForm: { [action.id]: true } };
            return merge({}, oldState, newState);
        case HIDE_COMMENT_EDIT_FORM:
            newState = { commentEditForm: { [action.id]: false } };
            return merge({}, oldState, newState);
        default: 
            return oldState;
    }
};