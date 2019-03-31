import React from 'react';
import SplashContainer from './session/splash_container';
import FeedContainer from './feed/feed_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import FailedLoginContainer from './session/login/failed_login_container';
import FailedSignup from './session/signup/failed_signup';
import ProfileContainer from './profile/profile_container';

const App = ({ currentUser }) => {
    return (
        <div>
            <AuthRoute exact path="/" component={SplashContainer} />
            <ProtectedRoute path="/feed" component={FeedContainer} />
            <ProtectedRoute path="/users/:userId" component={ProfileContainer} />
            <AuthRoute path="/login" component={FailedLoginContainer} />
            <AuthRoute path="/signup" component={FailedSignup}/>
        </div>
    );
};

export default App;