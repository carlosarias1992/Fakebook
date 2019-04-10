import { connect } from 'react-redux';
import Cover from './cover';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = (state, ownProps) => {
    const currentUser = getCurrentUser(state);
    const { user } = ownProps;
    
    return { currentUser, user };
};

export default connect(mapStateToProps)(Cover);