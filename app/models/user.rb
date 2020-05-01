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

    def suggestions(all_users, friend_requests)
        current_user_friend_requests = friend_requests.select do |request|
            (request.sender_id == self.id || request.receiver_id == self.id) &&
            request.status == "accepted"
        end 

        current_user_friends = current_user_friend_requests.map do |request|
            if request.sender_id == self.id 
                request.receiver
            else
                request.sender
            end 
        end 

        sent_friend_requests = friend_requests.select do |request|
            request.sender_id == self.id && request.status == "pending"
        end 

        sent_friend_request_ids = sent_friend_requests.map(&:receiver_id)

        received_friend_requests = friend_requests.select do |request|
            request.receiver_id == self.id && request.status == "pending"
        end 

        received_friend_request_ids = received_friend_requests.map(&:sender_id)
        
        current_user_friend_ids = current_user_friends.map(&:id)

        rejections = self.rejections.map { |rejection| rejection.rejected_id }
        suggestions = []
        tries = 0

        until suggestions.length === 7 || tries > 25
            user_id = all_users.map(&:id).sample

            unless (user_id == nil || suggestions.include?(user_id) || 
                self.id === user_id || rejections.include?(user_id) || 
                current_user_friend_ids.include?(user_id) || sent_friend_request_ids.include?(user_id) ||
                received_friend_request_ids.include?(user_id)) 
                suggestions << user_id
            end 

            tries += 1
        end 
        
        suggestions
    end

    def friends
        accepted_friend_requests = FriendRequest
                                       .where("(sender_id=#{id} or receiver_id=#{id}) and status='accepted'")
                                       .preload(:sender, :receiver)

        accepted_friend_requests.map do |friend_request|
            if friend_request.receiver == self
                friend_request.sender
            else
                friend_request.receiver
            end
        end
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
