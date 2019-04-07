import React from 'react';
import FriendsIndexItem from './friends_index_item';

export default props => {
    const friends = props.friends.reverse().slice(0, 9).map((friend, idx) => {
        return <FriendsIndexItem friend={friend} key={idx}/>;
    });

    return (
        <div className="side-box clearfix">{friends}</div>
    )
}