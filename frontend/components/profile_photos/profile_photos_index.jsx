import React from 'react';
import ProfilePhotoIndexItem from './profile_photo_index_item';

export default props => {
    const photos = props.photos.map((photo, idx) => {
        return <ProfilePhotoIndexItem photo={photo} key={idx} />
    });

    return (
        <div className="profile-section">
            <div className="profile-section-header profile-photos-header">
                <i className="profile-photos-icon"></i> Photos
            </div>
            <div>{photos}</div>
        </div>
    )
}