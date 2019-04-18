import React from 'react';

export default props => {
    return (
        <div className="profile-photo-item">
            <img src={props.photo}/>
        </div>
    )
}