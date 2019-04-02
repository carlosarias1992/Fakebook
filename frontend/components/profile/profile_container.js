import { connect } from 'react-redux';
import Profile from './profile';
import { findFriendRequestByUserId } from '../../util/ui_util';
import { fetchFriendRequests } from '../../actions/friend_request_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    const userId = ownProps.match.params.userId;
    let user = state.entities.users[userId];
    user = user || {};
    let friendRequest = findFriendRequestByUserId(user.id, currentUserId, state.entities.friendRequests);
    friendRequest = friendRequest || {};
    const friends = friendRequest.status === "accepted";
    
    return {
        user,
        friends,
        currentUser
    };
};

const mapDispatchToProps = dispatch => {
    const currentUser = window.currentUser || {};
    
    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests(currentUser.id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);