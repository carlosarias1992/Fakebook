# frozen_string_literal: true

module Mutations
  class CreateCommentMutation < Mutations::BaseMutation
    argument :content, String, required: true
    argument :post_id, ID, required: true

    field :comment, Types::CommentType, null: false

    def resolve(content:, post_id:)
      check_authentication!

      current_user = context[:current_user]

      comment = Comment.new(
        content: content,
        author_id: current_user.id,
        post_id: post_id
      )

      if comment.save
        { comment: comment }
      else
        { errors: comment.errors }
      end
    end
  end
end
