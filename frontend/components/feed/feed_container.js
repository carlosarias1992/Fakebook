import { connect } from 'react-redux';
import Feed from './feed';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { fetchLikes } from '../../actions/likes_actions';
import { fetchRejections } from '../../actions/rejections_actions';
import { merge } from 'lodash';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    const friends = currentUser.friends_id || [];

    const allPosts = state.entities.posts;
    const postKeys = Object.keys(allPosts);
    let posts = {};

    for (let i = 0; i < postKeys.length; i++) {
        if (!allPosts[postKeys[i]].event_category) {
            if (friends.includes(allPosts[postKeys[i]].author_id) ||
                friends.includes(allPosts[postKeys[i]].receiver_id)) {
                posts = merge(posts, { [postKeys[i]]: allPosts[postKeys[i]] });
            }

            if (allPosts[postKeys[i]].author_id === currentUserId ||
                allPosts[postKeys[i]].receiver_id === currentUserId) {
                posts = merge(posts, { [postKeys[i]]: allPosts[postKeys[i]] });
            }
        }
    }

    return {
        currentUser,
        posts
    };
};

const mapDispatchToProps = dispatch => {
    const currentUser = window.currentUser || {};

    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests(currentUser.id)),
        fetchLikes: () => dispatch(fetchLikes(currentUser.id)),
        fetchRejections: () => dispatch(fetchRejections())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);