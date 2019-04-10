import { connect } from 'react-redux';
import Header from './header';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    return { currentUser: getCurrentUser(state) };
};

export default connect(mapStateToProps)(Header);