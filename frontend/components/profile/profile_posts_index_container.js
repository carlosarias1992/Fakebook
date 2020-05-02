import { connect } from "react-redux";
import { compose } from "recompose";
import Posts from "../posts/Posts";
import { ProfilePostsQuery } from "../../graphql/queries";

const mapStateToProps = (state, ownProps) => {
  return { userId: ownProps.user.id };
};

export default compose(connect(mapStateToProps), ProfilePostsQuery)(Posts);
