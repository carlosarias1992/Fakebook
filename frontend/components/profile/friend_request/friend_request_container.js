import { connect } from 'react-redux';
import FriendRequest from './friend_request';
import {
    acceptFriendRequest,
    deleteFriendRequest,
    denyFriendRequest,
    sendFriendRequest
} from '../../../actions/friend_request_actions';
import { findFriendRequestByUserId } from '../../../util/ui_util';

const mapStateToProps = (state, ownProps) => {
    const user = ownProps.user;
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    let friendRequest = findFriendRequestByUserId(user.id, currentUser.id, state.entities.friendRequests);
    friendRequest = friendRequest || {};
    
    return {
        user,
        currentUser,
        friendRequest
    };
};

const mapDispatchToProps = dispatch => {
    return {
        acceptFriendRequest: id => dispatch(acceptFriendRequest(id)),
        denyFriendRequest: id => dispatch(denyFriendRequest(id)),
        deleteFriendRequest: id => dispatch(deleteFriendRequest(id)),
        sendFriendRequest: id => dispatch(sendFriendRequest(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);