class RegenerateUsersTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :api_users 

    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false 
      t.string :session_token, null: false 

      t.timestamps
    end

    add_index :users, [:username, :session_token], unique: true 
  end
end
