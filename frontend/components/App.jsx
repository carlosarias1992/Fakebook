import React from 'react';
import Splash from './session/splash';
import FeedContainer from './feed/feed_container';

const App = ({ currentUser }) => {
    return (
        <div>
            {currentUser ? <FeedContainer /> : <Splash />}
        </div>
    );
};

export default App;