import React from 'react';
import AvatarContainer from '../../avatar_container';
import { NavLink, Link } from 'react-router-dom';

export default props => {
    const { currentUser } = props;

    return (
        <div className="flex-center">
            <div className="cover container">
                <ul className="cover-navbar">
                    <li>About</li>
                    <li>Friends</li>
                    <li>Photos</li>
                </ul>
                <div className="profile-picture">
                    <div className="avatar-holder">
                        <AvatarContainer />
                    </div>
                    <Link to={"/users/" + currentUser.id} className="name">
                        {currentUser.first_name} {currentUser.last_name}
                    </Link>
                </div>
                <div className="cover-buttons">
                    <button>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}