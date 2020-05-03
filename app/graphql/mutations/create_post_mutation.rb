# frozen_string_literal: true

module Mutations
  class CreatePostMutation < Mutations::BaseMutation
    argument :content, String, required: true
    argument :receiver_id, ID, required: false
    argument :photos, [Types::File], required: true

    field :post, Types::PostType, null: false

    def resolve(content:, photos:, receiver_id: nil)
      check_authentication!

      current_user = context[:current_user]

      post = Post.new(
        content: content,
        receiver_id: receiver_id,
        author_id: current_user.id,
        photos: photos
      )

      if post.save
        { post: post }
      else
        { errors: post.errors }
      end
    end
  end
end
