import React from 'react';

export default props => {
    let avatar;
    
    if (currentUser.avatar) {
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

