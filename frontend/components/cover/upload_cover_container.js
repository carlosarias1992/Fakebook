import { connect } from 'react-redux';
import UploadCover from './upload_cover';
import { receiveUser } from '../../actions/user_actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(UploadCover);