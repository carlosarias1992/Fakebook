import { connect } from 'react-redux';
import FriendsIndex from './friends_index';
import { findAllFriendRequestsByUserId } from '../../../util/ui_util';

const mapStateToProps = (state, ownProps) => {
    const { user } = ownProps;
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
        friends
    };
};

export default connect(mapStateToProps)(FriendsIndex);