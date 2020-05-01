# frozen_string_literal: true

module Mutations
  class SignInMutation < Mutations::BaseMutation
    argument :username, String, required: true

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(username:)
      user = User.find_by!(username: username)
      return {} unless user

      token = Base64.encode64(user.email)
      {
        token: token,
        user: user
      }
    end
  end
end
