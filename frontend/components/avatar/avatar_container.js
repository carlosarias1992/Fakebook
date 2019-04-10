import { connect } from 'react-redux';
import { getCurrentUser, getUser } from '../../util/container_util';
import Avatar from './avatar';

const mapStateToProps = (state, ownProps) => {
    const { message, className, userId } = ownProps;
    const user = userId ? getUser(state, userId) : getCurrentUser(state);

    return { user, message, avatarClass: className };
};

export default connect(mapStateToProps)(Avatar);