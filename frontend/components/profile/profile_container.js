import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { fetchLikes } from '../../actions/likes_actions';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { fetchComments } from '../../actions/comments_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    const userId = ownProps.match.params.userId;
    let user = state.entities.users[userId];
    user = user || {};
    let friendRequest = findFriendRequestByUserId(user.id, currentUserId, state.entities.friendRequests);
    friendRequest = friendRequest || {};
    const friendsBoolean = friendRequest.status === "accepted";

    const { friendRequests } = state.entities;
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

        return state.entities.users[friendId];
    });
    
    return {
        user,
        friendsBoolean,
        currentUser,
        friends
    };
};

const mapDispatchToProps = dispatch => {
    const currentUser = window.currentUser || {};
    
    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests(currentUser.id)),
        fetchLikes: () => dispatch(fetchLikes(currentUser.id)),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchComments: () => dispatch(fetchComments())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);