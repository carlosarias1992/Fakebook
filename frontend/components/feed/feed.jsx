import React from 'react';

export default (props) => {
    return (
        <div>
            You are logged in
            <button onClick={props.logout}>Log out</button>
        </div>
    );
};