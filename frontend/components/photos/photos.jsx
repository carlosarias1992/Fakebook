import React from 'react';
import PhotosIndex from './photos_index';    

export default props => {
    if (props.photos) {
        const photos = props.photos.reverse().slice(0, 9).map((photoUrl, idx) => {
            return <PhotosIndex url={photoUrl} key={idx} idx={idx} />;
        });
    } else {
        const photos = [];
    }

    return (
        <div className="side-box clearfix">{photos}</div>
    )
};