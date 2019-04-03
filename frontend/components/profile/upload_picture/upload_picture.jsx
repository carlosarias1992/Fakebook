import React from 'react';
import { merge } from 'lodash';

class UploadPicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageUrl: props.currentUser.avatar };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        const { imageUrl } = this.state;

        if(imageUrl !== this.props.currentUser.avatar) {
            const user = merge(this.props.currentUser, { avatar: imageUrl });
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
            formData.append('user[avatar]', file);

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
            <div className="update-overlay">
                <label htmlFor='avatarUpload'>
                    <i className="camera-icon"></i>
                    Update
                    <form>
                        <input 
                            id="avatarUpload"
                            type="file" 
                            accept="image/*"
                            onChange={this.handleSubmit}
                        />
                        <input type="submit" value=""/>
                    </form>
                </label>
            </div>
        )
    }
}

export default UploadPicture;