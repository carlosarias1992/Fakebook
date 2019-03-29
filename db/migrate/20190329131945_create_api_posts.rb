class CreateApiPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false 
      t.index :author_id
      t.text :content
      t.timestamps
    end
  end
end
