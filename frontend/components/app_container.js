import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
    currentUser: state.session.current_user_id
});
 
export default connect(mapStateToProps, null)(App);