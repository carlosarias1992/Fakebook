import React from 'react';
import PhotosIndex from './photos_index';    

export default props => {
    const photos = props.photos.reverse().slice(0, 9).map((photoUrl, idx) => {
        return <PhotosIndex url={photoUrl} key={idx} idx={idx}/>;
    });

    return (
        <div className="side-box clearfix">{photos}</div>
    )
};