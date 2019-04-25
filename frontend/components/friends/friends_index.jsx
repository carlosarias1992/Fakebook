import React from 'react';
import FriendsIndexItem from './friends_index_item';

export default props => {
    const { friends } = props;

    const lastNineFriends = friends.slice(0, 9).map(friend => {
        return <FriendsIndexItem friend={friend} key={friend.id}/>;
    });

    return (
        <div className="side-box clearfix">{lastNineFriends}</div>
    )
}