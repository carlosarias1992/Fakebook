import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import Header from './header';
import { withRouter } from 'react-router-dom';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));