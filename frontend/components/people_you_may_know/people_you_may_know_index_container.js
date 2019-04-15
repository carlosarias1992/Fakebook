import { connect } from 'react-redux';
import PeopleYouMayKnowIndex from './people_you_may_know_index';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    const { users, rejections, friendRequests } = state.entities;
    const currentUser = getCurrentUser(state);
    const rejectionValues = Object.values(rejections);
    const friendRequestValues = Object.values(friendRequests);

    const pendingRequests = friendRequestValues.filter(friendRequest => {
        return friendRequest.status === "pending" && 
                    (friendRequest.sender_id === currentUser.id ||
                        friendRequest.receiver_id === currentUser.id);
    });

    const pendingRequestUserIds = pendingRequests.map(pendingRequest => {
        if (pendingRequest.sender_id === currentUser.id) {
            return pendingRequest.receiver_id;
        } else {
            return pendingRequest.sender_id;
        }
    });

    const rejected_ids = rejectionValues.map(rejection => {
        return rejection.rejected_id;
    });

    const suggestedUsers = Object.values(users).filter(user => {
        return !rejected_ids.includes(user.id) && 
                    user.id !== currentUser.id &&
                        !currentUser.friends_id.includes(user.id) &&
                            !pendingRequestUserIds.includes(user.id); 
    });

    return {
        suggestedUsers
    };
};

export default connect(mapStateToProps)(PeopleYouMayKnowIndex);