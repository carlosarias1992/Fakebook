import { connect } from 'react-redux';
import Feed from './feed';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { merge } from 'lodash';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    const allPosts = state.entities.posts;
    const allFriendRequests = state.entities.friendRequests;
    const allFriendRequestsForCurrentUser = findAllFriendRequestsByUserId(currentUserId, allFriendRequests)

    const friends = Object.values(allFriendRequestsForCurrentUser).map(friendRequest => {
        if (friendRequest.status === "accepted") {
            if (friendRequest.sender_id === currentUserId) {
                if (state.entities.users[friendRequest.receiver_id]) {
                    return state.entities.users[friendRequest.receiver_id];
                }
            } else {
                if (state.entities.users[friendRequest.sender_id]) {
                    return state.entities.users[friendRequest.sender_id];
                }
            }
        }

        return {};
    });

    const postKeys = Object.keys(allPosts);
    const friendIds = friends.map(user => user.id);
    let posts = {};

    for (let i = 0; i < postKeys.length; i++) {
        if (friendIds.includes(allPosts[postKeys[i]].author_id) ||
            friendIds.includes(allPosts[postKeys[i]].receiver_id)) {
            posts = merge(posts, { [postKeys[i]]: allPosts[postKeys[i]] });
        }

        if (allPosts[postKeys[i]].author_id === currentUserId ||
            allPosts[postKeys[i]].receiver_id === currentUserId) {
            posts = merge(posts, { [postKeys[i]]: allPosts[postKeys[i]] });
        }
    }

    return {
        currentUser,
        posts
    };
};

const mapDispatchToProps = dispatch => {
    const currentUser = window.currentUser || {};

    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests(currentUser.id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);