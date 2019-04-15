import { connect } from 'react-redux';
import Photos from './photos';

const mapStateToProps = (state, ownProps) => {
    const user = ownProps.user;

    return { photos: user.photos };
};

export default connect(mapStateToProps)(Photos);