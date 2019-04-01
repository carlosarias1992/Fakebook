import { connect } from 'react-redux';
import Feed from './feed';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser,
        posts: state.entities.posts
    };
};

export default connect(mapStateToProps)(Feed);