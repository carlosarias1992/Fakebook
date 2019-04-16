import { connect } from 'react-redux';
import { receiveUser } from '../../actions/user_actions';
import UploadPicture from './upload_picture';
import { getCurrentUser } from '../../util/container_util';
import { updatePhoto } from '../../actions/user_actions';

const mapStateToProps = state => {
    const currentUser = getCurrentUser(state);

    return { currentUser };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUser: user => dispatch(receiveUser(user)),
        updatePhoto: (avatar, userId) => dispatch(updatePhoto(avatar, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPicture);