import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = state => {
    return { users: Object.values(state.entities.users) };
};

export default connect(mapStateToProps)(Search);