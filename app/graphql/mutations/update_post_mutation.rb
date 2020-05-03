# frozen_string_literal: true

module Mutations
  class UpdatePostMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :content, String, required: true
    argument :photos, [Boolean], required: false

    field :post, Types::PostType, null: false

    def resolve(id:, content:, photos: nil)
      check_authentication!

      current_user = context[:current_user]

      post = current_user.posts.find(id)
      post.content = content
      post.photos = photos if photos

      if post.save
        { post: post }
      else
        { errors: post.errors }
      end
    end
  end
end
