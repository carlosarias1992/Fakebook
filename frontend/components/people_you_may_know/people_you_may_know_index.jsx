import React from 'react';
import PeopleYouMayKnowIndexItemContainer from './people_you_may_know_index_item_container';
import { shuffle } from '../../util/ui_util';

export default props => {
    const { suggestedUsers } = props;

    const suggestions = shuffle(suggestedUsers).slice(0, 6).map(user => {
        return <PeopleYouMayKnowIndexItemContainer user={user} key={user.id} />;
    });

    if (suggestions.length > 0) {
        return (
            <div className="suggestions">
                <h2>People You May Know</h2>
                {suggestions}
            </div>
        )
    } else {
        return null
    }
}