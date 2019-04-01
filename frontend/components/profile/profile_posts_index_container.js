import { connect } from 'react-redux';
import PostsIndex from '../posts/post_index';
import { merge } from 'lodash';

const mapStateToProps = (state, ownProps) => {
    let posts = {};
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    let user = ownProps.user || currentUser;
    const userId = user.id;
    const allPosts = state.entities.posts;
    const postKeys = Object.keys(allPosts);

    for (let i = 0; i < postKeys.length; i++) {
        if (allPosts[postKeys[i]].author_id === userId) {
            posts = merge(posts, { [postKeys[i]]: allPosts[postKeys[i]] });
        }
    }

    return {
        posts
    };
};

export default connect(mapStateToProps)(PostsIndex);