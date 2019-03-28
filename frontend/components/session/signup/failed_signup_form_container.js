import { connect } from 'react-redux';
import Signup from './signup';
import { signup } from '../../../actions/session_actions';

const mapStateToProps = state => {
    return {
        failedSignup: true,
        errors: state.errors.session.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(signup(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);