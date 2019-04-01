class ChangeFriendsToFriendsRequest < ActiveRecord::Migration[5.2]
  def change
    rename_table :friends, :friend_requests
  end
end
