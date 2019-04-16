import { connect } from 'react-redux';
import UploadCover from './upload_cover';
import { receiveUser } from '../../actions/user_actions';
import { getCurrentUser } from '../../util/container_util';
import { updatePhoto } from '../../actions/user_actions';

const mapStateToProps = state => {
  return { currentUser: getCurrentUser(state) };
};

const mapDispatchToProps = dispatch => {
  return { 
    receiveUser: user => dispatch(receiveUser(user)),
    updatePhoto: (cover, userId) => dispatch(updatePhoto(cover, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCover);