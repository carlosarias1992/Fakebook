class AddEventsToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :life_event, :boolean, default: false
    add_column :posts, :event_date, :datetime
    add_column :posts, :event_category, :string
  end
end
