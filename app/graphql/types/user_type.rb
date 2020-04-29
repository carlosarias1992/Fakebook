module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :birth_date, String, null: false
    field :gender, GraphQL::Types::ISO8601DateTime, null: false
  end
end
