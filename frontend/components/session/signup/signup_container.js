import { connect } from 'react-redux';
import Signup from './signup';
import { signup, login } from '../../../actions/session_actions';

const demoUser ={
    user: { username: 'test', password: 'starwars' }
};

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(signup(user)),
        demoLogin: () => dispatch(login(demoUser))
    };
};

export default connect(null, mapDispatchToProps)(Signup);