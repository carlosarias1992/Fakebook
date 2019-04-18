import { merge } from 'lodash';
import { RECEIVE_SESSION_DATA } from '../actions/user_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { 
    SHOW_EDIT_MODAL,
    HIDE_EDIT_MODAL,
    SHOW_COMMENT_EDIT_FORM,
    HIDE_COMMENT_EDIT_FORM,
    SHOW_FRIENDS,
    SHOW_PHOTOS,
    SHOW_TIMELINE
} from '../actions/ui_actions';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_SESSION_DATA:
            return { sessionDataReceived: action.sessionDataReceived };
        case LOGOUT_CURRENT_USER:
            return {};
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
        case SHOW_FRIENDS:
            return merge({}, oldState, { profileTab: 'friends' });
        case SHOW_TIMELINE:
            return merge({}, oldState, { profileTab: 'timeline' });
        case SHOW_PHOTOS:
            return merge({}, oldState, { profileTab: 'photos' });
        default: 
            return oldState;
    }
};