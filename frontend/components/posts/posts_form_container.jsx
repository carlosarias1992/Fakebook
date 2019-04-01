import { connect } from 'react-redux';
import PostsForm from './posts_form';
import { createPost } from '../../actions/posts_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.current_user_id;
    let currentUser = state.entities.users[currentUserId];
    currentUser = currentUser || {};
    let receiver = ownProps.receiver;
    receiver = receiver || currentUser;
    
    return {
        content: '',
        className: '',
        currentUser,
        formType: "Create",
        receiver
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        action: post => dispatch(createPost(post))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PostsForm);