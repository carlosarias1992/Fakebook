import { connect } from 'react-redux';
import PostIndex from './post_index';

const mapStateToProps = state => {
    return {
        posts: state.entities.posts
    };
};

export default connect(mapStateToProps)(PostIndex);