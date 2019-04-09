class CreateRejections < ActiveRecord::Migration[5.2]
  def change
    create_table :rejections do |t|
      t.integer :rejector_id, null: false
      t.integer :rejected_id, null: false 
      t.timestamps
    end

    add_index :rejections, [:rejector_id, :rejected_id], unique: true
    add_index :rejections, :rejected_id
  end
end
