class User < ApplicationRecord
    validates :username, :session_token, :password_digest, presence: true 
    validates :birth_date, :gender, :first_name, :last_name, presence: true 
    validates :username, :session_token, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }

    attr_reader :password 

    has_one_attached :avatar
    has_one_attached :cover
    has_many :posts, foreign_key: :author_id, class_name: :Post, dependent: :destroy

    has_many :sent_friend_requests,
        primary_key: :id, 
        foreign_key: :sender_id, 
        class_name: :FriendRequest,
        dependent: :destroy

    has_many :received_friend_requests, 
        primary_key: :id, 
        foreign_key: :receiver_id, 
        class_name: :FriendRequest,
        dependent: :destroy

    has_many :comments, 
        primary_key: :id, 
        foreign_key: :author_id, 
        class_name: :Comment, 
        dependent: :destroy

    has_many :likes, 
        primary_key: :id, 
        foreign_key: :user_id, 
        class_name: :Like,
        dependent: :destroy

    has_many :rejections, 
        primary_key: :id, 
        foreign_key: :rejector_id, 
        class_name: :Rejection, 
        dependent: :destroy

    after_initialize :ensure_session_token 

    def friend_requests
        friend_requests = []
        friend_requests.concat(self.sent_friend_requests.includes(:receiver)
            .where(status: "accepted"))
        friend_requests.concat(self.received_friend_requests.includes(:sender)
            .where(status: "accepted"))
    end 

    def friends 
        friends = []

        self.friend_requests.each do |friend_request|
            if (friend_request.sender_id === self.id) 
                friends.push(friend_request.receiver)
            else 
                friends.push(friend_request.sender)
            end 
        end 

        friends
    end 

    def suggestions
        current_user_friends = self.friends
        current_user_friend_ids = current_user_friends.map(&:id)

        rejections = self.rejections.map { |rejection| rejection.rejected_id }
        suggestions = []
        tries = 0

        all_users = User.all.pluck(:id)
        until suggestions.length === 7 || tries > 15
            user_id = all_users.sample

            unless (user_id == nil || suggestions.include?(user_id) || 
                self.id === user_id || rejections.include?(user_id) || 
                current_user_friend_ids.include?(user_id)) 
                suggestions << user_id
            end 

            tries += 1
        end 

        suggestions
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil 
    end 

    def password=(password)
        @password = password 
        self.password_digest = BCrypt::Password.create(password)
    end 

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end 

    def reset_session_token 
        self.session_token = User.generate_session_token 
        self.save 
        self.session_token
    end 

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end 

    private 

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end 
end
