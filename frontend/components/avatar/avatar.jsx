import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { user, avatarClass } = props;
    let avatar;

    if (user.avatar) {
        avatar = user.avatar;
    } else {
        avatar = user.gender === "F" ? window.femaleAvatar : window.maleAvatar;
    }
    
    return (  
        <Link to={"/users/" + user.id} className={avatarClass}>
            <img src={avatar} alt="Profile picture" className="avatar" />
            {props.message}
        </Link>
    );
};

