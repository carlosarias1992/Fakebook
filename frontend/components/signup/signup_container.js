import { connect } from 'react-redux';
import Signup from './signup';
import { signup, login, removeErrors } from '../../actions/session_actions';

const demoUser = {
    user: { username: 'test', password: 'starwars' }
};

const mapStateToProps = state => {
    return {
        errors: state.errors.session.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(signup(user)),
        demoLogin: () => dispatch(login(demoUser)),
        removeErrors: () => dispatch(removeErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);