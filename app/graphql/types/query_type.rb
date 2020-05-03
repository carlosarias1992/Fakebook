# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :users, [Types::UserType], null: false
    field :current_user, Types::UserType, null: true
    field :user, Types::UserType, null: true do
      argument :id, ID, required: true
    end
    field :friend_requests, [Types::FriendRequestType], null: false do
      argument :user_id, ID, required: true
    end
    field :feed_posts, [Types::PostType], null: false do
      argument :user_id, ID, required: true
    end
    field :profile_posts, [Types::PostType], null: false do
      argument :user_id, ID, required: true
    end
    field :friend_suggestions, [Types::UserType], null: false do
      argument :user_id, ID, required: true
    end

    def current_user
      context[:current_user]
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def friend_requests(user_id:)
      FriendRequest.where("sender_id=#{user_id} or receiver_id=#{user_id}")
    end

    def feed_posts(user_id:)
      user = User.find(user_id)
      visible_ids = [user_id, *user.friends.map(&:id)].join(',')
      visible_posts = Post.where(
        "(author_id in (#{visible_ids}) or receiver_id in (#{visible_ids})) and life_event != true"
      )
      visible_posts.order(updated_at: :desc)
    end

    def profile_posts(user_id:)
      user = User.find(user_id)
      visible_ids = [user_id, *user.friends.map(&:id)].join(',')
      visible_posts = Post.where(
        %{
          (author_id in (#{visible_ids}) or receiver_id in (#{visible_ids}))
            and (life_event != true or (life_event = true and author_id = #{user_id}))
        }
      )
      visible_posts.order(updated_at: :desc)
    end

    def friend_suggestions(user_id:)
      user = User.find(user_id)
      suggestions_blacklist = [user.id, *user.friends.map(&:id), *user.rejections.map(&:rejected_id)]
      max_suggestions = 6

      class << self
        def _get_suggestions(user, suggestions_blacklist, max_suggestions, suggestions = [], tries = 0)
          max_tries = 5
          return suggestions if suggestions.length >= max_suggestions || tries >= max_tries

          freq = Hash.new(0)
          freq_hash = get_friend_freq(user, suggestions, freq, suggestions_blacklist)
          suggestions = [*suggestions, *freq_hash.sort_by { |_, value| value }.map { |el| el[0] }].uniq
          tries += 1

          user.friends.each do |friend|
            suggestions = [
              *suggestions, *_get_suggestions(friend, suggestions_blacklist, max_suggestions, suggestions, tries)
            ].uniq
          end

          suggestions
        end
      end

      suggestions = _get_suggestions(user, suggestions_blacklist, max_suggestions)

      (suggestions.length...max_suggestions).each do
        rand_id = rand(User.count)
        random_user = User.find_by(id: rand_id)
        next if random_user.nil?

        if !suggestions.include?(random_user) && !suggestions_blacklist.include?(random_user.id)
          suggestions.push(random_user)
        end
      end

      suggestions.first(max_suggestions)
    end

    private

    def get_friend_freq(user, suggestions, freq, suggestions_blacklist)
      user.friends.each do |friend|
        freq[friend] += 1 if !suggestions.include?(friend) && !suggestions_blacklist.include?(friend.id)
      end

      freq
    end
  end
end
