class AddSeenColumnToFriendRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :friend_requests, :seen, :boolean
    change_column_default :friend_requests, :seen, false
  end
end
