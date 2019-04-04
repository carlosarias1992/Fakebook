import React from 'react';

export default props => {
    const { likes, likers, type } = props;

    if(type === "post") {
        let likersToString;

        if (likes.length > 2) {
            const liker1 = likers[likes[0].user_id];
            const liker2 = likers[likes[1].user_id];
            const remaining = likes.length - 2;

            if (remaining === 1) {
                likersToString = `${liker1.first_name} ${liker1.last_name}, ${liker2.first_name} ${liker2.last_name} and 1 other`;
            } else {
                likersToString = `${liker1.first_name} ${liker1.last_name}, ${liker2.first_name} ${liker2.last_name} and ${remaining} others`;
            }
        } else if (likes.length === 2) {
            const liker1 = likers[likes[0].user_id];
            const liker2 = likers[likes[1].user_id];

            likersToString = `${liker1.first_name} ${liker1.last_name} and ${liker2.first_name} ${liker2.last_name}`;
        } else if (likes.length === 1) {
            const liker = likers[likes[0].user_id];
            likersToString = `${liker.first_name} ${liker.last_name}`;
        } else {
            likersToString = "";
        }

        return (
          <div className="likes">
              {
                props.likes.length > 0 ?
                <>
                  <i className="liked-icon"></i> {likersToString}
                </> : null
              }
          </div>
        )
    } else if (type === "comment") {
        return (
            <>
                {
                    props.likes.length > 0 ?
                    <div className="likes comment-likes">
                      <i className="liked-icon"></i> <p>{likes.length}</p>
                    </div> : null
                }
            </>
        )
    }
}