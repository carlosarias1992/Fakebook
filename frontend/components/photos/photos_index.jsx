import React from 'react';

export default props => {
    return (
        <div className="image-holder">
            <img src={props.url} alt={"photos-" + props.idx} />
        </div>
    )
}