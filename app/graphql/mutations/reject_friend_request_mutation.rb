# frozen_string_literal: true

module Mutations
  class RejectFriendRequestMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: false

    def resolve(id:)
      check_authentication!

      current_user = context[:current_user]

      friend_request = current_user.received_friend_requests.find(id)
      if friend_request.destroy
        { id: id }
      else
        { errors: friend_request.errors }
      end
    end
  end
end
