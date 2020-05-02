import { connect } from "react-redux";
import { compose } from "recompose";
import PeopleYouMayKnowIndex from "./people_you_may_know_index";
import { getCurrentUser } from "../../util/container_util";
import { FriendSuggestionsQuery } from "../../graphql/queries";

const mapStateToProps = (state) => {
  const currentUser = getCurrentUser(state);
  return { userId: parseInt(currentUser.id) };
};

export default compose(
  connect(mapStateToProps),
  FriendSuggestionsQuery
)(PeopleYouMayKnowIndex);
