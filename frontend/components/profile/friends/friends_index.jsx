import React from 'react';
import FriendsIndexItem from './friends_index_item';

export default props => {
    const friends = props.friends.map((friend, idx) => {
        return <FriendsIndexItem friend={friend} key={idx}/>;
    });

    return (
        <div className="friends-box clearfix">{friends}</div>
    )
}