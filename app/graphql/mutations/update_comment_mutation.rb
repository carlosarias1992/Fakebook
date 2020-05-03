# frozen_string_literal: true

module Mutations
  class UpdateCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :content, String, required: true

    field :comment, Types::CommentType, null: false

    def resolve(id:, content:)
      check_authentication!

      comment = Comment.find(id)
      comment.content = content

      if comment.save
        { comment: comment }
      else
        { errors: comment.errors }
      end
    end
  end
end
