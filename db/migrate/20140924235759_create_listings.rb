class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.timestamp :eta
      t.interval :est_duration
      t.decimal :max_price
      t.integer :lister_id
      t.integer :booker_id
      t.boolean :active
      t.float :latitude
      t.float :longitude
      t.text :description

      t.timestamps
    end
  end
end
