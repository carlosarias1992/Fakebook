import { connect } from 'react-redux';
import PeopleYouMayKnowIndexItem from './people_you_may_know_index_item';
import {  createRejection } from '../../actions/rejections_actions';

const mapDispatchToProps = dispatch => {
    return {
        createRejection: rejection => dispatch(createRejection(rejection))
    };
};

export default connect(null, mapDispatchToProps)(PeopleYouMayKnowIndexItem);