import React from 'react';
import PhotosIndex from './photos_index';    

export default props => {
    let photos = [];

    if (props.photos) {
        photos = props.photos.slice(0, 9).map((photoUrl, idx) => {
            return <PhotosIndex url={photoUrl} key={idx} idx={idx} />;
        });
    }

    return (
        <div className="side-box clearfix">{photos}</div>
    )
};