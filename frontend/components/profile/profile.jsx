import React from 'react';
import HeaderContainer from '../feed/header/header_container';
import CoverContainer from './cover/cover_container';
import ProfilePostsIndexContainer from './profile_posts_index_container';
import PostsFormContainer from '../posts/posts_form_container';
import EventsIndexItemContainer from './events_index_item_container';
import FriendsIndexContainer from './friends/friends_index_container';
import Copyright from '../copyright';

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchFriendRequests();
        this.props.fetchLikes();
    }

    render() {
        const { user, friendsBoolean, currentUser, friends } = this.props;
        const numberOfFriends = Object.values(friends).length;

        return (
            <main>
                <header className="flex-center">
                    <HeaderContainer />
                </header>
                <CoverContainer user={user}/>
                <section className="profile-body flex-center">
                    <aside>
                        <div className="profile-box">
                            <div className="profile-box-header">
                                <i className="photos-box-icon"></i>
                                Photos
                            </div>
                        </div>
                        <div className="profile-box">
                            <div className="profile-box-header">
                                <i className="friends-box-icon"></i>
                                Friends &nbsp;
                                { 
                                    numberOfFriends > 0 ? 
                                    <>
                                        · <span>{numberOfFriends}</span> 
                                    </> : null 
                                }
                            </div>
                            <FriendsIndexContainer user={user} friends={friends}/>
                        </div>
                        <Copyright />
                    </aside>
                    <div className="center-col">
                        {
                            friendsBoolean || user.id === currentUser.id ?
                                <>
                                    <PostsFormContainer receiver={user} />
                                    <ProfilePostsIndexContainer user={user} />
                                </> : null
                        }
                        <EventsIndexItemContainer user={user} />
                    </div>
                </section>
            </main>
        )
    }
}

export default Profile;