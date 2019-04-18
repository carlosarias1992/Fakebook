import React from 'react';
import HeaderContainer from '../feed_header/header_container';
import CoverContainer from '../cover/cover_container';
import ProfilePostsIndexContainer from './profile_posts_index_container';
import PostsFormContainer from '../posts/posts_form_container';
import FriendsIndexContainer from '../friends/friends_index_container';
import PhotosContainer from '../photos/photos_container';
import Copyright from '../copyright';
import ProfileFriendIndex from '../profile_friends/profile_friend_index';
import ProfilePhotosIndex from '../profile_photos/profile_photos_index';

class Profile extends React.Component {
    componentDidMount() {
        if (!this.props.sessionDataReceived) {
            this.props.fetchSessionData();
        }

        scrollTo(0, 0);
    }

    render() {
        const { 
            user, friendsBoolean, currentUser, friends, profileTab, 
            showFriends, showPhotos
        } = this.props;
        const numberOfFriends = Object.values(friends).length;

        return (
            <main>
                <header className="flex-center">
                    <HeaderContainer />
                </header>
                <CoverContainer user={user}/>
                <section className="profile-body flex-center">
                    {
                        profileTab === "timeline" ?
                            <>
                                <aside>
                                    <div className="profile-box">
                                        <div className="profile-box-header">
                                            <i className="photos-box-icon"></i>
                                            <p onClick={showPhotos}>
                                                Photos
                                            </p>
                                        </div>
                                        <PhotosContainer user={user} />
                                    </div>
                                    <div className="profile-box">
                                        <div className="profile-box-header">
                                            <i className="friends-box-icon"></i>
                                            <p onClick={showFriends}>
                                                Friends
                                            </p> &nbsp;
                                            {
                                                numberOfFriends > 0 ?
                                                    <>
                                                        · <span>{numberOfFriends}</span>
                                                    </> : null
                                            }
                                        </div>
                                        <FriendsIndexContainer
                                            user={user}
                                            friends={friends}
                                        />
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
                                </div>
                            </> : null
                    }
                    {
                        profileTab === "friends" ?
                            <ProfileFriendIndex friends={friends} /> : null 
                    }
                    {
                        profileTab === "photos" ?
                            <ProfilePhotosIndex photos={user.photos} /> : null
                    }
                </section>
            </main>
        )
    }
}

export default Profile;