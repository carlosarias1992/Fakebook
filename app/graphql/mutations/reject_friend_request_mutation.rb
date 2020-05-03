# frozen_string_literal: true

module Mutations
  class RejectFriendRequestMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :friend_request, Types::FriendRequestType, null: false

    def resolve(id:)
      check_authentication!

      current_user = context[:current_user]

      friend_request = current_user.received_friend_requests.find(id)
      friend_request.status = 'rejected'
      if friend_request.save
        { friend_request: friend_request }
      else
        { errors: friend_request.errors }
      end
    end
  end
end
