import { connect } from 'react-redux';
import Feed from './feed';
import { fetchFriendRequests } from '../../actions/friend_request_actions';
import { fetchLikes } from '../../actions/likes_actions';
import { fetchRejections } from '../../actions/rejections_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { fetchComments } from '../../actions/comments_actions';
import { getCurrentUser } from '../../util/container_util';
import { merge } from 'lodash';

const mapStateToProps = state => {
    const { posts, users } = state.entities;
    const currentUser = getCurrentUser(state);
    const { friends_id } = currentUser;
    let feedPosts = {};

    currentUser.posts_id.forEach(post_id => {
        const post = posts[post_id];

        if (post && !post.life_event) {
            feedPosts = merge(feedPosts, { [post_id]: posts[post_id] });
        }
    });

    friends_id.forEach(friend_id => {
        const friend = users[friend_id];

        if (friend) {
            friend.posts_id.forEach(post_id => {
                const post = posts[post_id];

                if (post && !post.life_event) {
                    feedPosts = merge(feedPosts, { [post_id]: posts[post_id] });
                }
            });
        }
    });

    return { currentUser, feedPosts };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFriendRequests: () => dispatch(fetchFriendRequests()),
        fetchLikes: () => dispatch(fetchLikes()),
        fetchRejections: () => dispatch(fetchRejections()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchComments: () => dispatch(fetchComments())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);