# frozen_string_literal: true

module Types
  class RejectionType < Types::BaseObject
    field :id, ID, null: false
    field :rejector_id, ID, null: false
    field :rejected_id, ID, null: false
  end
end
