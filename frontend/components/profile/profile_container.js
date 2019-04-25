import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';
import { fetchSessionData } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { getCurrentUser } from '../../util/container_util';
import { showFriends, showPhotos, showTimeline } from '../../actions/ui_actions';
import { fetchUser } from '../../actions/user_actions';
import { sendFriendRequest } from '../../actions/friend_request_actions';

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps.match.params;
    const { users, friendRequests, ui } = state.entities;
    const currentUser = getCurrentUser(state);
    const user = users[userId] || {};
    const friendRequest = findFriendRequestByUserId(user.id, currentUser.id, friendRequests) || {};
    const friendsBoolean = friendRequest.status === "accepted";
    
    let friends = [];
    if (user.friends_id && Object.values(users).length > 1) {
        friends = user.friends_id.map(friend_id => {
            return users[friend_id];
        });
    }
    
    return { 
        user, friendsBoolean, currentUser, friends, 
        sessionDataReceived: ui.sessionDataReceived,
        profileTab: ui.profileTab || "timeline", 
        friendRequest
     };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSessionData: () => dispatch(fetchSessionData()),
        fetchPosts: () => dispatch(fetchPosts()),
        showFriends: () => dispatch(showFriends()),
        showPhotos: () => dispatch(showPhotos()),
        fetchUser: id => dispatch(fetchUser(id)),
        sendFriendRequest: id => dispatch(sendFriendRequest(id)),
        showTimeline: () => dispatch(showTimeline())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);