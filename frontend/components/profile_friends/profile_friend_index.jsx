import React from 'react';
import ProfileFriendIndexItem from './profile_friend_index_item';

export default props => {
    const friends = props.friends.map(friend => {
        return <ProfileFriendIndexItem friend={friend} key={friend.id} />;
    });

    return (
        <div className="profile-section">
            <div className="profile-section-header">
                <i className="profile-friends-icon"></i> Friends
            </div>
            {
                friends.length > 0 ? 
                    friends
                : 
                    <div className="no-data-message">No friends to show</div>
            }
        </div>
    )
}