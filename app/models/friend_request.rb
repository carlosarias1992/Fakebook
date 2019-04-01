class FriendRequest < ApplicationRecord
    validates :sender_id, :receiver_id, presence: true

    belongs_to :sender
    belongs_to :receiver
end
