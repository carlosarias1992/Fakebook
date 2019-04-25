import { connect } from 'react-redux';
import ProfileNavbar from './profile_navbar';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions'; 
import { getCurrentUser } from '../../util/container_util';
import { showTimeline } from '../../actions/ui_actions';

const mapStateToProps = state => {
    const currentUser = getCurrentUser(state);

    return { currentUser };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    showTimeline: () => dispatch(showTimeline())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNavbar));