# frozen_string_literal: true

module Mutations
  class RejectFriendSuggestionMutation < Mutations::BaseMutation
    argument :rejected_id, ID, required: true

    field :rejection, Types::RejectionType, null: false

    def resolve(rejected_id:)
      check_authentication!

      current_user = context[:current_user]

      rejection = Rejection.new(
        rejector_id: current_user.id,
        rejected_id: rejected_id
      )

      if rejection.save
        { rejection: rejection }
      else
        { errors: rejection.errors }
      end
    end
  end
end
