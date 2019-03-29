import React from 'react';

export default props => {
    const { currentUser } = props;
    let avatar;

    if (currentUser.avatar !== null) {
        avatar = currentUser.avatar;
    } else {
        avatar = currentUser.gender === "F" ? window.femaleAvatar : window.maleAvatar;
    }
    
    return (  
        <> 
            <img src={avatar} alt="Profile picture" className="avatar" />
        </>
    );
};

