import { connect } from 'react-redux';
import FriendRequestIndexItem from './friend_request_index_item';
import { getUser } from '../../util/container_util';
import {
    acceptFriendRequest,
    deleteFriendRequest
} from '../../actions/friend_request_actions';

const mapStateToProps = (state, ownProps) => {
    const { friendRequest } = ownProps;
    const sender = getUser(state, friendRequest.sender_id);

    return { friendRequest, sender };
};

const mapDispatchToProps = dispatch => {
    return {
        acceptFriendRequest: id => dispatch(acceptFriendRequest(id)),
        deleteFriendRequest: id => dispatch(deleteFriendRequest(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestIndexItem);