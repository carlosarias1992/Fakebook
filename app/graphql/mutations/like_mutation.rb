# frozen_string_literal: true

module Mutations
  class LikeMutation < Mutations::BaseMutation
    argument :likeable_id, ID, required: true
    argument :likeable_type, String, required: true

    field :like, Types::LikeType, null: true

    def resolve(likeable_id:, likeable_type:)
      check_authentication!

      current_user = context[:current_user]

      like = Like.new(
        likeable_id: likeable_id,
        likeable_type: likeable_type,
        user_id: current_user.id
      )

      if like.save
        { like: like }
      else
        { errors: like.errors }
      end
    end
  end
end
