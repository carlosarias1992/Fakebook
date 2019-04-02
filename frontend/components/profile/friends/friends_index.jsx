import React from 'react';
import FriendsIndexItem from './friends_index_item';

export default props => {
    const friends = props.friends.map(friend => {
        return <li key={friend.id}><FriendsIndexItem friend={friend}/></li>;
    });

    return (
        <ul className="friends-box">{friends}</ul>
    )
}