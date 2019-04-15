import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import FailedLogin from './failed_login';

const mapStateToProps = state => {
    return { className: "failed-login-form" };
};

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FailedLogin);