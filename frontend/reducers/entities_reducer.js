import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import uiReducer from './ui_reducer';
import friendRequestsReducer from './friend_requests_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    ui: uiReducer,
    friendRequests: friendRequestsReducer
});

export default entitiesReducer;