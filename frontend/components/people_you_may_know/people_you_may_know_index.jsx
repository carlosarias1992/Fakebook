import React from "react";
import PeopleYouMayKnowIndexItemContainer from "./people_you_may_know_index_item_container";

export default (props) => {
  if (props.loading) return null;

  const {
    data: { friendSuggestions },
  } = props;

  const suggestions = friendSuggestions.map((user) => {
    return <PeopleYouMayKnowIndexItemContainer user={user} key={user.id} />;
  });

  if (suggestions.length > 0) {
    return (
      <div className="suggestions">
        <h2>People You May Know</h2>
        {suggestions}
      </div>
    );
  } else {
    return null;
  }
};
