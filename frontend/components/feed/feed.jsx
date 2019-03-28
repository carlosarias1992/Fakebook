import React from 'react';
import HeaderContainer from './header/header_container';
import PostsFormContainer from '../posts/posts_form_container';
import PeopleYouMayKnow from './people_you_may_know/people_you_may_know';
import Avatar from '../avatar';
import { NavLink } from 'react-router-dom';

export default props => {
    const { currentUser } = props;

    return (
        <main className="feed">
            <HeaderContainer />
            <section className="flex-center">
                <div className="feed-body large-container flex-space-between">
                    <aside>
                        <ul>
                            <li>
                                <NavLink to="/user/2">
                                    <Avatar /> 
                                    {currentUser.first_name} {currentUser.last_name}
                                </NavLink>
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
                        <div className="horizontal-people">
                            <PeopleYouMayKnow />
                        </div>
                    </div>
                    <div className="right-col vertical-people">
                        <PeopleYouMayKnow />
                    </div>
                </div>
            </section>
        </main>
    );
}