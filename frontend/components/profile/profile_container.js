import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId;
    let user = state.entities.users[userId];
    user = user || {};
    let friendRequest = findFriendRequestByUserId(user.id, state.entities.friendRequests);
    friendRequest = friendRequest || {};
    const friends = friendRequest.status === "accepted";
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    
    return {
        user,
        friends,
        currentUser
    };
};

export default connect(mapStateToProps)(Profile);