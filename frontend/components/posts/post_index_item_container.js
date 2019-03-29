import { connect } from 'react-redux';
import PostIndexItem from './post_index_item';

const mapStateToProps = (state, ownProps) => {
    const authorId = ownProps.post.author_id;
    
    return {
        author: state.entities.users[authorId]
    };
};

export default connect(mapStateToProps)(PostIndexItem);