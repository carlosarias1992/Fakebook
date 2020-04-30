module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :birth_date, GraphQL::Types::ISO8601DateTime, null: false
    field :gender, String, null: false
    field :avatar_url, String, null: true

    def avatar_url
      url_for(object.avatar) if object.avatar.attached?
    end
  end
end
