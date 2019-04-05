import { connect } from 'react-redux';
import PostIndexItem from '../posts/post_index_item';
import { getTimeString } from '../../util/ui_util';

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.current_user_id;
    const currentUser = state.entities.users[currentUserId];
    let user = ownProps.user;
    user = user || currentUser;
    const birthDate = new Date(user.birth_date);
    
    return {
        post: { 
            content: `Born on ${getTimeString(birthDate)}`,
            created_at: user.birth_date,
            photos: []
        },
        author: user,
        event: true
    };
};

export default connect(mapStateToProps)(PostIndexItem);
