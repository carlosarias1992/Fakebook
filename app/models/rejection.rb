class Rejection < ApplicationRecord
    validates :rejector_id, :rejected_id, presence: true
end 