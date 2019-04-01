class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :sender_id, null: false 
      t.integer :receiver_id, null: false
      t.string :status, default: "pending"
      t.timestamps
    end

    add_index :friends, [:sender_id, :receiver_id], unique: true
    add_index :friends, :receiver_id
  end
end
