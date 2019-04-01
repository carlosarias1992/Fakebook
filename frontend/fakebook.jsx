import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//*** TESTING  ***/
import * as SessionApiUtil from './util/session_api_util';
import * as Actions from './actions/session_actions';
import * as PostsApiUtil from './util/posts_api_util';
import * as UserApiUtil from './util/user_api_util';
import * as FriendRequestApiUtil from './util/friend_request_api_util';
//*** TESTING  ***/

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    let savedSession;
    if (window.currentUser) {
        savedSession = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { current_user_id: window.currentUser.id }
        };
    } else {
        savedSession = {};
    }

    const store = configureStore(savedSession);
    
    //*** TESTING  ***/
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.signupUser = SessionApiUtil.signupUser;
    window.loginUser = SessionApiUtil.loginUser;
    window.logoutUser = SessionApiUtil.logoutUser;
    window.logout = Actions.logout;
    window.login = Actions.login;
    window.fetchPosts = PostsApiUtil.fetchPosts;
    window.fetchPost = PostsApiUtil.fetchPost;
    window.createPost = PostsApiUtil.createPost;
    window.updatePost = PostsApiUtil.updatePost;
    window.deletePost = PostsApiUtil.deletePost;
    window.fetchUsers = UserApiUtil.fetchUsers;
    window.fetchUser = UserApiUtil.fetchUser;
    window.fetchFriendRequests = FriendRequestApiUtil.fetchFriendRequests;
    window.sendFriendRequest = FriendRequestApiUtil.sendFriendRequest;
    window.acceptFriendRequest = FriendRequestApiUtil.acceptFriendRequest;
    window.denyFriendRequest = FriendRequestApiUtil.denyFriendRequest;
    //*** TESTING  ***/

    ReactDOM.render(<Root store={store} />, root);
});