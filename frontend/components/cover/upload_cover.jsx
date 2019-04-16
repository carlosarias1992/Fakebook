import React from 'react';
import { merge } from 'lodash';

class UploadCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: props.currentUser.cover };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { imageUrl } = this.state;
    const { currentUser, receiveUser } = this.props;

    if (imageUrl !== currentUser.cover) {
      const user = merge(currentUser, { cover: imageUrl });
      receiveUser(user);
    }
  }

  handleSubmit(e) {
    const { currentUser, updatePhoto } = this.props;
    const element = e.target;

    const reader = new FileReader();
    reader.onloadend = () => this.setState({ imageUrl: reader.result }); 
    
    const file = element.files[0];
    if (file) {
      reader.readAsDataURL(file);

      const coverPicture = new FormData();
      coverPicture.append('user[cover]', file);

      updatePhoto(coverPicture, currentUser.id);
    } else {
      this.setState({ imageUrl: currentUser.avatar });
    }
  }
  
  render() {
      return (
          <>
              <i className="camera-icon before-hover"></i>
              <div className="cover-upload-button">
                  <label htmlFor='coverUpload'>
                      <i className="camera-icon"></i>
                      Add Cover Photo
                      <form>
                          <input
                              id="coverUpload"
                              type="file"
                              accept="image/*"
                              onChange={this.handleSubmit}
                          />
                          <input type="submit" value="" />
                      </form>
                  </label>
              </div>
          </>
      )
  }
}

export default UploadCover;