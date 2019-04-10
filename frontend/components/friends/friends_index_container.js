import { connect } from 'react-redux';
import FriendsIndex from './friends_index';

const mapStateToProps = (state, ownProps) => {
    return { friends: ownProps.friends };
};

export default connect(mapStateToProps)(FriendsIndex);