import React from "react";
import { Route } from "react-router-dom";
import SplashContainer from "./session/splash_container";
import FeedContainer from "./feed/feed_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import FailedLoginContainer from "./login/failed_login_container";
import FailedSignup from "./signup/failed_signup";
import ProfileContainer from "./profile/profile_container";
import GraphqlExample from "../examples/GraphqlExample";

function App() {
  return (
    <div>
      <div className="overlay hide" />
      <Route exact path="/examples/graphql" component={GraphqlExample} />
      <AuthRoute exact path="/" component={SplashContainer} />
      <ProtectedRoute path="/feed" component={FeedContainer} />
      <ProtectedRoute path="/users/:userId" component={ProfileContainer} />
      <AuthRoute path="/login" component={FailedLoginContainer} />
      <AuthRoute path="/signup" component={FailedSignup} />
    </div>
  );
}

export default App;
