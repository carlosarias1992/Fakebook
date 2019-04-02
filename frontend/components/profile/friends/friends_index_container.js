import { connect } from 'react-redux';
import FriendsIndex from './friends_index';

const mapStateToProps = (state, ownProps) => {
    let friends = ownProps.friends;
    if (friends[0] === undefined) friends = [];

    return {
        friends
    };
};

export default connect(mapStateToProps)(FriendsIndex);