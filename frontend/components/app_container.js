import { connect } from 'react-redux';
import app from './app';
import { fetchUsers } from '../actions/user_actions';
import { fetchPosts } from '../actions/posts_actions';
import { fetchComments } from '../actions/comments_actions';

const mapStateToProps = state => ({
    currentUser: state.session.current_user_id
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchComments: () => dispatch(fetchComments())
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(app);