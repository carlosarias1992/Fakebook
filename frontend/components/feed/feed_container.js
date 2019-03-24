import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Feed from './feed';

const mapDispatchToProps = dispatch => ({
    logout: user => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Feed);