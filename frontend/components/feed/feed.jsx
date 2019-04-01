import React from 'react';
import HeaderContainer from './header/header_container';
import PostsFormContainer from '../posts/posts_form_container';
import AvatarContainer from '../avatar_container';
import { NavLink } from 'react-router-dom';
import PostIndexContainer from '../posts/post_index_container';
import Copyright from '../copyright';

class Feed extends React.Component {
    render() {
        const { currentUser, posts } = this.props;
        const allPosts = Object.keys(posts);
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
                            </ul>
                        </aside>
                        <div className="center-col">
                            <PostsFormContainer />

                            {allPosts.length !== 0 ? 
                                <PostIndexContainer /> 
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
                            <Copyright />
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Feed;