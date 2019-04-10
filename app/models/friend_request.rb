class FriendRequest < ApplicationRecord
    validates :sender_id, :receiver_id, presence: true

    belongs_to :sender, 
        primary_key: :id, 
        foreign_key: :sender_id, 
        class_name: :User

    belongs_to :receiver, 
        primary_key: :id, 
        foreign_key: :receiver_id, 
        class_name: :User
end
