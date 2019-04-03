import { connect } from 'react-redux';
import Feed from './feed';
import { fetchFriendRequests } from '../../actions/friend_request_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser,
        posts: state.entities.posts
    };
};

const mapDispatchToProps = dispatch => {
    const currentUser = window.currentUser || {};

    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests(currentUser.id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);