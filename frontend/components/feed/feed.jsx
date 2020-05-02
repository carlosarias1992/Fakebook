import React from "react";
import HeaderContainer from "../feed_header/header_container";
import CreatePostForm from "../posts/CreatePostFormContainer";
import AvatarContainer from "../avatar/avatar_container";
import { NavLink } from "react-router-dom";
import Posts from "../posts/Posts";
import PeopleYouMayKnowIndexContainer from "../people_you_may_know/people_you_may_know_index_container";
import Copyright from "../copyright";

class Feed extends React.Component {
  componentDidMount() {
    if (!this.props.sessionDataReceived) {
      this.props.fetchSessionData();
    }
  }

  render() {
    if (this.props.loading) return null;

    const { currentUser, data } = this.props;

    const linkTitle = `${currentUser.first_name} ${currentUser.last_name}`;

    return (
      <main className="feed">
        <HeaderContainer />
        <section className="flex-center">
          <div className="feed-body large-container flex-space-between">
            <aside>
              <ul>
                <li>
                  <AvatarContainer message={linkTitle} />
                </li>
                <li>
                  <NavLink to="/feed" activeClassName="active">
                    <i className="news-feed-icon" /> News Feed
                  </NavLink>
                </li>
                <hr />
                <li>
                  <a target="_blank" href="https://github.com/carlosarias1992">
                    <i className="fab fa-github" /> Creator's Github
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/carlos-arias-miranda-a98025172/"
                  >
                    <i className="fab fa-linkedin" /> Creator's LinkedIn
                  </a>
                </li>
                <li>
                  <a target="_blank" href="http://carlos-arias.me">
                    <i className="fas fa-laptop" /> Creator's Website
                  </a>
                </li>
              </ul>
            </aside>
            <div className="center-col">
              <CreatePostForm />
              {data.feedPosts.length !== 0 ? (
                <Posts data={data} />
              ) : (
                <div className="welcome">
                  <h1>Welcome to Fakebook</h1>
                  <h2>
                    Get started by adding friends. You'll see their videos,
                    photos and posts here.
                  </h2>
                </div>
              )}
            </div>
            <div className="right-col">
              <PeopleYouMayKnowIndexContainer />
              <Copyright />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Feed;
