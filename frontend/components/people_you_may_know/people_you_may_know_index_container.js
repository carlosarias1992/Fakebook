import { connect } from 'react-redux';
import PeopleYouMayKnowIndex from './people_you_may_know_index';
import { getCurrentUser } from '../../util/container_util';

const mapStateToProps = state => {
    const { users } = state.entities;
    const currentUser = getCurrentUser(state);
    let suggestedUsers = [];
    
    if (Object.keys(users).length > 1) {
        suggestedUsers = currentUser.suggestion_ids.map(suggestion_id => {
            return users[suggestion_id];
        });
    }

    return { suggestedUsers };
};

export default connect(mapStateToProps)(PeopleYouMayKnowIndex);