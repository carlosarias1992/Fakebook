class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :post_id, null: false
      t.text :content, null: false 
      t.index :author_id
      t.index :post_id
      t.timestamps
    end
  end
end
