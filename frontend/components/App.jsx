import React from 'react';
import LoggedOut from './session/logged_out';
import FeedContainer from './feed/feed_container';

const App = ({ currentUser }) => {
    return (
        <div>
            {currentUser ? <FeedContainer /> : <LoggedOut />}
        </div>
    );
};

export default App;