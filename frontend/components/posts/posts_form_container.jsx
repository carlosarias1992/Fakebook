import { connect } from 'react-redux';
import PostsForm from './posts_form';
import { createPost } from '../../actions/posts_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    
    return {
        content: '',
        className: '',
        currentUser,
        formType: "Create"
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        action: post => dispatch(createPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostsForm);