import { connect } from 'react-redux';
import PostsForm from './posts_form';
import { createPost } from '../../actions/posts_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        createPost: post => dispatch(createPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostsForm);