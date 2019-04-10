import { connect } from 'react-redux';
import FriendRequestIndex from './friend_request_index';
import { findAllFriendRequestsByUserId } from '../../util/ui_util';
import { seenFriendRequest } from '../../actions/friend_request_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    const currentUser = getCurrentUser(state);
    const { friendRequests } = state.entities;
    const userFriendRequests = findAllFriendRequestsByUserId(currentUser.id, friendRequests);

    const pendingFriendRequests = userFriendRequests.filter(friendRequest => {
        return friendRequest.status === "pending" && 
            friendRequest.receiver_id === currentUser.id;
    });

    const unseenFriendRequests = pendingFriendRequests.filter(friendRequest => {
        return friendRequest.seen === false;
    });

    return { pendingFriendRequests, unseenFriendRequests };
};

const mapDispatchToProps = dispatch => {
    return { seenFriendRequest: id => dispatch(seenFriendRequest(id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestIndex);