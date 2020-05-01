import React from "react";

class Likes extends React.Component {
  likers() {
    const { likeable } = this.props;
    let likersString = "";

    for (let i = 0; i < likeable.likes.length; i++) {
      const likerFullName = `${likeable.likes[i].liker.firstName} ${likeable.likes[i].liker.lastName}`;

      if (likeable.likes.length === 1) {
        likersString += likerFullName;
        return likersString;
      } else if (likeable.likes.length === 2) {
        likersString += likerFullName;

        if (i === 0) {
          likersString += ", and ";
        } else {
          return likersString;
        }
      } else {
        if (i === 0) {
          likersString += likerFullName + ", ";
        } else if (i === 1) {
          likersString += likerFullName;

          if (likeable.likes.length === 3) {
            likersString += `, and 1 other`;
          } else {
            likersString += `, and ${likeable.likes.length - 2} others`;
          }
        }
      }
    }

    return likersString;
  }

  render() {
    const { likeable, type } = this.props;

    if (type === "post" && likeable.likes.length > 0) {
      return (
        <div className="likes">
          <i className="liked-icon" /> {this.likers()}
        </div>
      );
    } else if (type === "comment" && likeable.likes.length > 0) {
      return (
        <div className="likes comment-likes">
          <i className="liked-icon" /> <p>{likeable.likes.length}</p>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Likes;
