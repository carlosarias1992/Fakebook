import React from 'react';
import HeaderContainer from '../feed_header/header_container';
import PostsFormContainer from '../posts/posts_form_container';
import AvatarContainer from '../avatar/avatar_container';
import { NavLink } from 'react-router-dom';
import PostIndex from '../posts/post_index';
import PeopleYouMayKnowIndexContainer from '../people_you_may_know/people_you_may_know_index_container';
import Copyright from '../copyright';

class Feed extends React.Component {
    componentDidMount() {
        this.props.fetchFriendRequests();
        this.props.fetchRejections();
        this.props.fetchUsers().then(() => {
            this.props.fetchPosts().then(() => {
                this.props.fetchComments().then(() => {
                    this.props.fetchLikes();
                });
            });
        });
    }
    
    render() {
        const { currentUser, feedPosts } = this.props;
        const linkTitle = `${currentUser.first_name} ${currentUser.last_name}`;

        return (
            <main className="feed">
                <HeaderContainer />
                <section className="flex-center">
                    <div className="feed-body large-container flex-space-between">
                        <aside>
                            <ul>
                                <li>
                                    <AvatarContainer message={linkTitle}/>
                                </li>
                                <li>
                                    <NavLink to="/feed" activeClassName="active">
                                        <i className="news-feed-icon"></i> News Feed
                                    </NavLink>
                                </li>
                                <hr />
                                <li>
                                    <a 
                                        target="_blank" 
                                        href="https://github.com/carlosarias1992"
                                        >
                                        <i className="fab fa-github"></i> Creator's Github
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        target="_blank" 
                                        href="https://www.linkedin.com/in/carlos-arias-miranda-a98025172/"
                                        >
                                        <i className="fab fa-linkedin"></i> Creator's LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </aside>
                        <div className="center-col">
                            <PostsFormContainer />
                            {
                                Object.keys(feedPosts).length !== 0 ? 
                                    <PostIndex posts={feedPosts} /> 
                                :
                                    <div className="welcome">
                                        <h1>Welcome to Fakebook</h1>
                                        <h2>
                                            Get started by adding friends. You'll 
                                            see their videos, photos and posts here.
                                        </h2>
                                    </div>
                            }
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