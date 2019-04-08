import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { currentUser, className } = props;
    let avatar;

    if (currentUser.avatar !== null) {
        avatar = currentUser.avatar;
    } else {
        avatar = currentUser.gender === "F" ? window.femaleAvatar : window.maleAvatar;
    }
    
    return (  
        <Link to={"/users/" + currentUser.id} className={className}>
            <img src={avatar} alt="Profile picture" className="avatar" />
            {props.message}
        </Link>
    );
};

