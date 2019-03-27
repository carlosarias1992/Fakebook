import React from 'react';
import Splash from './session/splash';
import FeedContainer from './feed/feed_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import FailedLoginContainer from './session/login/failed_login_container';
import FailedSignupContainer from './session/signup/failed_signup_container';
import { Route } from 'react-router-dom';

const App = ({ currentUser }) => {
    const LandingPage = currentUser ? FeedContainer : Splash;

    return (
        <div>
            <Route exact path="/" component={LandingPage} />
            <ProtectedRoute path="/feed" component={FeedContainer} />
            <AuthRoute path="/login" component={FailedLoginContainer} />
            <AuthRoute path="/signup" component={FailedSignupContainer}/>
        </div>
    );
};

export default App;