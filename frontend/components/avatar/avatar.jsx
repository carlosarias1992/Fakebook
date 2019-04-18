import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
    const { user, avatarClass, sessionDataReceived, message } = props;
    let avatar;

    if (user.avatar) {
        avatar = user.avatar;
    } else {
        avatar = user.gender === "F" ? window.femaleAvatar : window.maleAvatar;
    }
    
    if (sessionDataReceived) {
        return (
            <Link to={"/users/" + user.id} className={avatarClass}>
                <img src={avatar} alt="Profile picture" className="avatar" />
                {message}
            </Link>
        );
    } else {
        return (
            <Link to={"/users/" + user.id} className={avatarClass}>
                <img src={window.loadingImage} alt="Loading" className="avatar" />
                {message}
            </Link>
        )
    }
};

