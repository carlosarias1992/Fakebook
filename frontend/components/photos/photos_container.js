import { connect } from 'react-redux';
import Photos from './photos';

const mapStateToProps = (state, ownProps) => {
    const user = ownProps.user || {};
    const photos = state.entities.users[user.id].photos;

    return {
        photos
    };
};

export default connect(mapStateToProps)(Photos);