import { connect } from 'react-redux';
import PostsIndex from '../posts/post_index';
import { merge } from 'lodash';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    let posts = {};
    const currentUser = getCurrentUser(state);
    let receiver = ownProps.user || currentUser;
    const allPosts = state.entities.posts;
    const postKeys = Object.keys(allPosts);

    for (let i = 0; i < postKeys.length; i++) {
        const post = allPosts[postKeys[i]];

        if (post.author_id === receiver.id || post.receiver_id === receiver.id) {
            posts = merge(posts, { [postKeys[i]]: post });
        }
    }
    
    return { posts, receiver };
};

export default connect(mapStateToProps)(PostsIndex);