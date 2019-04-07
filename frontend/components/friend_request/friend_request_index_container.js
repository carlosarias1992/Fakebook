import { connect } from 'react-redux';
import FriendRequestIndex from './friend_request_index';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { seenFriendRequest } from '../../actions/friend_request_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const allFriendRequests = state.entities.friendRequests;
    const friendRequests = findAllFriendRequestsByUserId(currentUserId, allFriendRequests);
    const pendingFriendRequests = friendRequests.filter(friendRequest => {
        return friendRequest.status === "pending" && friendRequest.receiver_id === currentUserId;
    });

    const unseenFriendRequests = pendingFriendRequests.filter(friendRequest => {
        return friendRequest.seen === false;
    });

    return {
        pendingFriendRequests,
        unseenFriendRequests
    };
};

const mapDispatchToProps = dispatch => {
    return {
        seenFriendRequest: id => dispatch(seenFriendRequest(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestIndex);