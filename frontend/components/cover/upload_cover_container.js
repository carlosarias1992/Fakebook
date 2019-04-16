import { connect } from 'react-redux';
import UploadCover from './upload_cover';
import { getCurrentUser } from '../../util/container_util';
import { updatePhoto } from '../../actions/user_actions';

const mapStateToProps = state => {
  return { currentUser: getCurrentUser(state) };
};

const mapDispatchToProps = dispatch => {
  return { 
    updatePhoto: (cover, userId) => dispatch(updatePhoto(cover, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCover);