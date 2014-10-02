class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :listings, :booker_id
  end
end
