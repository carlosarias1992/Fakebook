import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import uiReducer from './ui_reducer';
import commentsReducer from './comments_reducer';
import friendRequestsReducer from './friend_requests_reducer';
import likesReducer from './likes_reducer';
import rejectionsReducer from './rejections_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    ui: uiReducer,
    friendRequests: friendRequestsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    rejections: rejectionsReducer
});

export default entitiesReducer;