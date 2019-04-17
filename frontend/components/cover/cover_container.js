import { connect } from 'react-redux';
import Cover from './cover';
import { getCurrentUser } from '../../util/container_util';
import { 
    showTimeline, showPhotos, showFriends
} from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = getCurrentUser(state);
    const { user } = ownProps;
    
    return { currentUser, user };
};

const mapDispatchToProps = dispatch => {
    return {
        showTimeline: () => dispatch(showTimeline()),
        showFriends: () => dispatch(showFriends()),
        showPhotos: () => dispatch(showPhotos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cover);