import { connect } from 'react-redux';
import ProfileNavbar from './profile_navbar';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/session_actions';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNavbar));