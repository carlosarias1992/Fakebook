import React from 'react';

class UploadPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageUrl: props.currentUser.avatar };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const { currentUser, updatePhoto } = this.props;
        const element = e.target;
        
        const reader = new FileReader();
        const file = element.files[0];

        reader.onloadend = () => {
            this.setState({ imageUrl: reader.result });
        };
        
        if (file) {
            reader.readAsDataURL(file);
            
            const avatar = new FormData();
            avatar.append('user[avatar]', file);

            updatePhoto(avatar, currentUser.id);
        } else {
            this.setState({ imageUrl: currentUser.avatar });
        } 
    }

    render() {
        return (
            <div className="update-overlay">
                <label htmlFor='avatarUpload'>
                    <i className="camera-icon"></i>
                    Update
                    <form>
                        <input 
                            id="avatarUpload"
                            type="file" 
                            accept="images/*"
                            onChange={this.handleSubmit}
                            multiple={true}
                        />
                        <input type="submit" value=""/>
                    </form>
                </label>
            </div>
        )
    }
}

export default UploadPicture;