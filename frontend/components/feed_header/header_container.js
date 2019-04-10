import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

export default connect(mapStateToProps)(Header);