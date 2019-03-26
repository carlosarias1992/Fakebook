import { connect } from 'react-redux';
import { login } from '../../../actions/session_actions';
import Login from './login';

const mapStateToProps = state => {
    return {
        className: "login-form"
    };
};
 
const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);