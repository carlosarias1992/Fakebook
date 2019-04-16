import { connect } from 'react-redux';
import ProfileNavbar from './profile_navbar';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions'; 
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    const currentUser = getCurrentUser(state);

    return { currentUser };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNavbar));