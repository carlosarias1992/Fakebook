import { connect } from 'react-redux';
import FriendRequestIndex from './friend_request_index';
import { findAllFriendRequestsByUserId } from '../../../util/ui_util';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const allFriendRequests = state.entities.friendRequests;
    const friendRequests = findAllFriendRequestsByUserId(currentUserId, allFriendRequests);
    const pendingFriendRequests = friendRequests.filter(friendRequest => {
        return friendRequest.status === "pending" && friendRequest.receiver_id === currentUserId;
    });

    return {
        pendingFriendRequests
    };
};

export default connect(mapStateToProps)(FriendRequestIndex);