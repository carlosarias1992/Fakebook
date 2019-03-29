import React from 'react';
import AvatarContainer from '../avatar_container';
import { Link } from 'react-router-dom';
import { getMonthName, getTime } from '../../util/ui_util';

export default props => {
    const created_at = new Date(props.post.created_at);
    const month = created_at.getMonth();
    const day = created_at.getDate();
    const time = getTime(created_at);
    let postYear = created_at.getFullYear();
    let dateEnding;

    const presentYear = new Date().getFullYear();

    dateEnding = postYear === presentYear ? ` at ${time}` : `, ${postYear}`;

    return (
        <div className="card-body post">
            <div className="post-header">
                <AvatarContainer userId={props.author.id} />
                <div>
                    <Link to={"users/" + props.author.id}>
                        {props.author.first_name + " " + props.author.last_name}
                    </Link>
                    <small>
                        {
                            getMonthName(month) + " " + day + dateEnding
                        }
                    </small>
                </div>
            </div>
            <p className={props.post.content.length < 80 ? "large-font" : ""}>
                {props.post.content}
            </p>
            <hr />
        </div>
    );
};