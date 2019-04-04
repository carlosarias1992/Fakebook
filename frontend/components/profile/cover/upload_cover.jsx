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

    if (imageUrl !== this.props.currentUser.cover) {
      const user = merge(this.props.currentUser, { cover: imageUrl });
      this.props.receiveUser(user);
    }
  }

  handleSubmit(e) {
    const element = e.target;

    const reader = new FileReader();
    const file = element.files[0];

    reader.onloadend = () => {
      this.setState({ imageUrl: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('user[cover]', file);

      $.ajax({
        url: `/api/users/${this.props.currentUser.id}`,
        method: 'PATCH',
        data: formData,
        contentType: false,
        processData: false
      });
    } else {
      this.setState({ imageUrl: this.props.currentUser.avatar });
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