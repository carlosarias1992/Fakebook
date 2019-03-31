import { connect } from 'react-redux';
import Avatar from './avatar';

const mapStateToProps = (state, ownProps) => {
    const { users } = state.entities;
    const currentUserId = ownProps.userId ? ownProps.userId : state.session.current_user_id;
    const currentUser = users[currentUserId] || {};

    return {
        currentUser,
        message: ownProps.message,
        className: ownProps.className
    };
};

export default connect(mapStateToProps)(Avatar);