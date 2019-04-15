import { connect } from 'react-redux';
import PeopleYouMayKnowIndexItem from './people_you_may_know_index_item';
import { 
    fetchRejection, createRejection
} from '../../actions/rejections_actions';

const mapDispatchToProps = dispatch => {
    return {
        fetchRejection: id => dispatch(fetchRejection(id)),
        createRejection: rejection => dispatch(createRejection(rejection))
    };
};

export default connect(null, mapDispatchToProps)(PeopleYouMayKnowIndexItem);