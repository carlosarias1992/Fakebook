import { connect } from 'react-redux';
import App from './App';
import { fetchUsers } from '../actions/user_actions';
import { fetchPosts } from '../actions/posts_actions';

const mapStateToProps = state => ({
    currentUser: state.session.current_user_id
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers())
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(App);