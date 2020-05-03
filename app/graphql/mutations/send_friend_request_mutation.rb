# frozen_string_literal: true

module Mutations
  class SendFriendRequestMutation < Mutations::BaseMutation
    argument :receiver_id, ID, required: true

    field :friend_request, Types::FriendRequestType, null: false

    def resolve(receiver_id:)
      check_authentication!

      current_user = context[:current_user]

      friend_request = FriendRequest.new(
        receiver_id: receiver_id,
        sender_id: current_user.id
      )

      if friend_request.save
        { friend_request: friend_request }
      else
        { errors: friend_request.errors }
      end
    end
  end
end
