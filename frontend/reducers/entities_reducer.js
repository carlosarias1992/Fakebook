import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import uiReducer from './ui_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    ui: uiReducer
});

export default entitiesReducer;