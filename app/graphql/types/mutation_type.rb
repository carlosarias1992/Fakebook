# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::SignInMutation
    field :create_post, mutation: Mutations::CreatePostMutation
    field :update_post, mutation: Mutations::UpdatePostMutation
    field :like, mutation: Mutations::LikeMutation
    field :unlike, mutation: Mutations::UnlikeMutation
    field :create_comment, mutation: Mutations::CreateCommentMutation
    field :update_comment, mutation: Mutations::UpdateCommentMutation
    field :delete_post, mutation: Mutations::DeletePostMutation
    field :delete_comment, mutation: Mutations::DeleteCommentMutation
    field :accept_friend_request, mutation: Mutations::AcceptFriendRequestMutation
    field :reject_friend_request, mutation: Mutations::RejectFriendRequestMutation
  end
end
