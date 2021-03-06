import React from 'react';
import Header from '../header/splash_header';
import SignupContainer from '../signup/signup_container';
import Footer from '../footer';

export default (props) => {
  if (props.loggedIn) props.history.push("/feed");
  
  return (
    <main className="white-background">
      <Header />
      <section className="flex-center outer-login-body">
        <section className="container flex-space-between login-body">
          <article className="about">
            <h2>
              Connect with friends and the world around you on Fakebook.
            </h2>
            <ul className="icons">
              <li>
                <div className="icon updates"></div>
                <strong>
                  See photos and updates
                </strong> from friends in News Feed.
              </li>
              <li>
                <div className="icon whats_new"></div>
                <strong>
                  Share what's new
                </strong> in your life on your Timeline.
              </li>
              <li>
                <div className="icon find_more"></div>
                <strong>
                  Find more
                </strong> of what you're looking for with Facebook Search.
              </li>
            </ul>
          </article>
          <SignupContainer />
        </section>
      </section>
      <Footer />
    </main>
  );
};