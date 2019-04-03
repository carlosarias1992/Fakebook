class AddReceiverColumnToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :receiver_id, :integer
  end
end
