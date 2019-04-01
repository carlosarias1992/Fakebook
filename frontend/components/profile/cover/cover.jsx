import React from 'react';
import AvatarContainer from '../../avatar_container';
import { Link } from 'react-router-dom';

export default props => {
    const { user } = props;
    
    return (
        <div className="flex-center">
            <div className="cover container">
                <ul className="cover-navbar">
                    <li>About</li>
                    <li>Friends</li>
                    <li>Photos</li>
                </ul>
                <div className="profile-picture">
                    { user.id ? 
                        <div className="avatar-holder">
                            <AvatarContainer user={user}/>
                        </div> : null 
                    }
                    <Link to={"/users/" + user.id} className="name">
                        {user.first_name} {user.last_name}
                    </Link>
                </div>
                <div className="cover-buttons">
                    {user.id === currentUser.id ? 
                        <button>
                            <i className="edit-icon"></i> Edit Profile
                        </button> : 
                        <button>
                            <i className="add-friend-icon"></i> Add Friend
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}