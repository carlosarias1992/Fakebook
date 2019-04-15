import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { fetchLikes } from '../../actions/likes_actions';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { fetchComments } from '../../actions/comments_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    const { userId } = ownProps.match.params;
    const { users, friendRequests } = state.entities;
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
    
    return { user, friendsBoolean, currentUser, friends };
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