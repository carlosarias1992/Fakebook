import { connect } from 'react-redux';
import Profile from './profile';
import { fetchPosts } from '../../actions/posts_actions';
import { fetchUsers } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId;
    let user = state.entities.users[userId];
    user = user || {};
    
    return {
        user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);