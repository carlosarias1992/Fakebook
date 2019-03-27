import { connect } from 'react-redux';
import Signup from './signup';

const mapStateToProps = state => {
    return {
        failedSignup: true
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, null)(Signup);