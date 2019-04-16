import { connect } from 'react-redux';
import PeopleYouMayKnowIndexItem from './people_you_may_know_index_item';
import { createRejection } from '../../actions/rejections_actions';
import { fetchSuggestion } from '../../actions/suggestions_actions';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    const currentUser = getCurrentUser(state);
    return { currentUser };
};

const mapDispatchToProps = dispatch => {
    return {
        createRejection: rejection => dispatch(createRejection(rejection)),
        fetchSuggestion: user => dispatch(fetchSuggestion(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleYouMayKnowIndexItem);