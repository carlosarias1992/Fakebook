import React from 'react';
import AvatarContainer from '../avatar/avatar_container';
import FriendRequestContainer from '../friend_request/friend_request_container';
import { Link } from 'react-router-dom';
import UploadPictureContainer from '../upload_picture/upload_picture_container';
import UploadCoverContainer from './upload_cover_container';

export default props => {
    const { user, currentUser } = props;
    
    return (
        <div className="flex-center">
            <div className="cover container">
                { 
                  user.cover ? 
                    <img 
                        src={user.cover} alt="Cover picture" 
                        className="cover-image" 
                        /> : null
                }
                { 
                    user.id === currentUser.id ?
                        <UploadCoverContainer/> : null
                }
                <ul className="cover-navbar">
                    <li>About</li>
                    <li>Friends</li>
                    <li>Photos</li>
                </ul>
                <div className="profile-picture">
                    <div className="avatar-holder">
                        <AvatarContainer userId={user.id}/>
                        {
                            user.id === currentUser.id ?
                                <UploadPictureContainer /> : null
                        }
                    </div> 
                    <Link to={"/users/" + user.id} className="name">
                        {user.first_name} {user.last_name}
                    </Link>
                </div>
                <div className="cover-buttons">
                    {
                        user.id === currentUser.id ?
                            <button>
                                <i className="edit-icon"></i> Edit Profile
                            </button> 
                        :
                            <FriendRequestContainer user={user} />
                    }
                </div>
            </div>
        </div>
    )
}