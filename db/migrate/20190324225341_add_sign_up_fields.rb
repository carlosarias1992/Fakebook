class AddSignUpFields < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :birth_date, :datetime
    add_column :users, :gender, :string

    change_column_null :users, :first_name, false
    change_column_null :users, :last_name, false
    change_column_null :users, :birth_date, false
    change_column_null :users, :gender, false
  end
end
