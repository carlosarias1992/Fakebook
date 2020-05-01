# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::SignInMutation
    field :create_post, mutation: Mutations::CreatePostMutation
  end
end
