# frozen_string_literal: true

module Mutations
  class DeleteCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true

    def resolve(id:)
      check_authentication!

      current_user = context[:current_user]
      comment = current_user.comments.find(id)
      if comment.destroy
        { id: id }
      else
        { errors: comment.errors }
      end
    end
  end
end
