import { connect } from 'react-redux';
import Cover from './cover';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser,
        user: ownProps.user
    };
};

export default connect(mapStateToProps)(Cover);