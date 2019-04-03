import { connect } from 'react-redux';
import FriendRequestIndexItem from './friend_request_index_item';
import {
    acceptFriendRequest,
    deleteFriendRequest
} from '../../../actions/friend_request_actions';

const mapStateToProps = (state, ownProps) => {
    const { users } = state.entities;
    let { friendRequest } = ownProps;
    let sender = users[friendRequest.sender_id];
    sender = sender || {};

    return {
        friendRequestId: friendRequest.id,
        sender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        acceptFriendRequest: id => dispatch(acceptFriendRequest(id)),
        deleteFriendRequest: id => dispatch(deleteFriendRequest(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestIndexItem);