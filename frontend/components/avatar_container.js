import { connect } from 'react-redux';
import Avatar from './avatar';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = ownProps.userId ? ownProps.userId : state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

export default connect(mapStateToProps)(Avatar);