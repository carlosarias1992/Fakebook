import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { fetchSessionData } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps.match.params;
    const { users, friendRequests, ui } = state.entities;
    const currentUser = getCurrentUser(state);
    const user = users[userId] || {};
    const friendRequest = findFriendRequestByUserId(user.id, currentUser.id, friendRequests) || {};
    const friendsBoolean = friendRequest.status === "accepted";
    const friendRequestsForUser = findAllFriendRequestsByUserId(user.id, friendRequests);

    const acceptedFriendRequests = friendRequestsForUser.filter(friendRequest => {
        return friendRequest.status === "accepted";
    });

    let friends = acceptedFriendRequests.map(acceptedFriendRequest => {
        let friendId;

        if (acceptedFriendRequest.sender_id !== user.id) {
            friendId = acceptedFriendRequest.sender_id;
        } else {
            friendId = acceptedFriendRequest.receiver_id;
        }

        return users[friendId];
    });
    
    return { 
        user, friendsBoolean, currentUser, friends, 
        sessionDataReceived: ui.sessionDataReceived,
        profileTab: ui.profileTab || "timeline"
     };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSessionData: () => dispatch(fetchSessionData()),
        fetchPosts: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);