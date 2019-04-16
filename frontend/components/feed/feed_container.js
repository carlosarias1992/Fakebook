import { connect } from 'react-redux';
import Feed from './feed';
import { fetchSessionData } from '../../actions/user_actions';
import { fetchPosts } from '../../actions/posts_actions';
import { getCurrentUser } from '../../util/container_util';
import { merge } from 'lodash';

const mapStateToProps = state => {
    const { posts, users, ui } = state.entities;
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

        if (friend && friend.posts_id) {
            friend.posts_id.forEach(post_id => {
                const post = posts[post_id];

                if (post && !post.life_event) {
                    feedPosts = merge(feedPosts, { [post_id]: posts[post_id] });
                }
            });
        }
    });

    return { 
        currentUser, feedPosts, sessionDataReceived: ui.sessionDataReceived 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSessionData: () => dispatch(fetchSessionData()),
        fetchPosts: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);