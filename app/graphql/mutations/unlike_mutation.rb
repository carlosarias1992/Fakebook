# frozen_string_literal: true

module Mutations
  class UnlikeMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true

    def resolve(id:)
      check_authentication!

      like = Like.find(id)

      if like.destroy
        { id: id }
      else
        { errors: like.errors }
      end
    end
  end
end
