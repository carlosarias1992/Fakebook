import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import { Link } from 'react-router-dom';
import FriendRequestContainer from '../friend_request/friend_request_container';

class PeopleYouMayKnowIndexItem extends React.Component {
    render() {
        const { user, createRejection } = this.props;

        return (
            <div className="suggestion-item">
                <AvatarContainer userId={user.id} />
                <div>
                    <Link to={"/users/" + user.id}>
                        {user.first_name} {user.last_name}
                    </Link>
                    <div className="suggestion-buttons">
                        <FriendRequestContainer user={user} />
                        <button onClick={() => createRejection({
                            rejected_id: user.id
                        })}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PeopleYouMayKnowIndexItem;