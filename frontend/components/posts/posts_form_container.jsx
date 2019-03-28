import { connect } from 'react-redux';
import PostsForm from './posts_form';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

export default connect(mapStateToProps)(PostsForm);