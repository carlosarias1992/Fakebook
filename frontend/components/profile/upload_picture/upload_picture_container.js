import { connect } from 'react-redux';
import { receiveUser } from '../../../actions/user_actions';
import UploadPicture from './upload_picture';

const mapStateToProps = state => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];

    return {
        currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUser: user => dispatch(receiveUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPicture);