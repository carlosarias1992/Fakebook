# Fakebook

Fakebook is a faithful clone of Facebook. Fakebook is a social media application that makes it easy for everyone to share with family and friends over the internet by sharing pictures and posts. 

## Getting Started

You can easily begin using Fakebook by signing up [here](https://fakebook-cam.herokuapp.com/#/). 

![sign-up-screenshot](https://github.com/carlosarias1992/Fakebook/raw/master/app/assets/images/sign-up.png "Sign Up")

You can also enjoy all of Fakebook's features by trying out the demo login. 

![demo-login-screenshot](https://github.com/carlosarias1992/Fakebook/raw/master/app/assets/images/demo-login.png "Demo Login")

## Features

### News Feed

![news-feed-screenshot](https://github.com/carlosarias1992/Fakebook/raw/master/app/assets/images/news-feed.png "News Feed")

One of the features that stands out from the news feed page is creating a post. A user can create a post that contains text, pictures, or both. However, the biggest challenge presented itself in the way that Facebook handles multiple media file uploads. In order to mimick this feature precisely, I needed to allow users to upload multiple pictures at once while also given them the ability to add more pictures if needed. I was able to handle multiple file uploads in the first occasion, but being able to upload more files as needed was more demanding. The way I decided to solve this issue was to store all files in the component's state, so that when the user was content with the post's content, the component could use the state to submit all information contained by the post. That being said, there was also the possibility that users were not happy with a particular picture in the uploading queue. Allow me to introduce the `removeFile` function. In case that a user wanted to remove a media file from the uploading queue, the user can hover over the specific file and click on the "x" icon at the top-right corner to remove it. This function finds the particular file in the component's state and removes it from the queue, so that it is not uploaded along with the rest of the files in the queue. 

``` Javascript
readAndPreview(file) {
    const { imageUrls, files } = this.state;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
        imageUrls.push(reader.result);
        files.push(file);
        this.setState({ imageUrls, files });
    };
}

handleFileInput(e) {
    const element = e.target;
    Array.from(element.files).forEach(file => this.readAndPreview(file));

    this.showOverlay();
    element.value = "";
}

removeFile(idx) {
    const { files, imageUrls } = merge({}, this.state);

    this.setState({ 
        files: removeFromArray(files, idx),
        imageUrls: removeFromArray(imageUrls, idx)
    });
}
```

![post-form-screenshot](https://github.com/carlosarias1992/Fakebook/raw/master/app/assets/images/post-form.png "Post Form")

### Profile Pages

![profile-page-screenshot](https://github.com/carlosarias1992/Fakebook/raw/master/app/assets/images/profile-page.png "Profile Page")

This features packs in more functionalities than it seems at first. The profile page component must be generic enough to not only display the current's users info, but also all the other users as well. Some internal features to these components will change depending on several factors. For example, if the current user visits another user's profile page and the two users are not already friends, an "Add Friend" button will be displayed, so that the current user can send a friend request to the profile page's owner. This button must not appear if the users are already friends or if the profile page belongs to the current user. Another important thing worth mentioning is that in order to improve server loading speed, we cannot fetch all information pertaining to all of our users in the database in the first request. Therefore, when the current user visits another user's profile page, the information for that specific user must be fetched before the page is rendered. This was accomplished by saving an attribute in our Redux store which allowed us to know if the user's information had already been fetched, and if not, we could fetch the user through our `UserApiUtil`.

## Technologies Used

* Ruby on Rails
* PostgreSQL
* JavaScript (ES6)
* React.js
* Redux
* AWS S3
* HTML
* CSS
* Heroku

## Future Implementations

* Real-time notifications
* Comments on a comment
* Photo albums
* Mentions (tags)
* Real-time messaging
