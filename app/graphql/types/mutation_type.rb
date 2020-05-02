# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::SignInMutation
    field :create_post, mutation: Mutations::CreatePostMutation
    field :update_post, mutation: Mutations::UpdatePostMutation
    field :like, mutation: Mutations::LikeMutation
    field :unlike, mutation: Mutations::UnlikeMutation
  end
end
