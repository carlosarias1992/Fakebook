import { connect } from 'react-redux';
import Feed from './feed';
import { fetchPosts } from '../../actions/posts_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser,
        posts: state.entities.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);