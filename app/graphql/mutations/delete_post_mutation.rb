# frozen_string_literal: true

module Mutations
  class DeletePostMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true

    def resolve(id:)
      check_authentication!

      current_user = context[:current_user]

      post = current_user.posts.find(id)

      if post.destroy
        { id: id }
      else
        { errors: post.errors }
      end
    end
  end
end
