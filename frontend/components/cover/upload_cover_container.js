import { connect } from 'react-redux';
import UploadCover from './upload_cover';
import { receiveUser } from '../../actions/user_actions';
import { getCurrentUser } from '../../util/container_util';
import { updateCoverPhoto } from '../../actions/user_actions';
import cover from './cover';

const mapStateToProps = state => {
  return { currentUser: getCurrentUser(state) };
};

const mapDispatchToProps = dispatch => {
  return { 
    receiveUser: user => dispatch(receiveUser(user)),
    updateCoverPhoto: (cover, userId) => dispatch(updateCoverPhoto(cover, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCover);