class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.timestamp :eta
      t.timestamp :est_duration
      t.decimal :max_price, null: false, precision: 2
      t.integer :lister_id, null: false
      t.integer :booker_id
      t.boolean :active
      t.float :latitude
      t.float :longitude
      t.text :description, null: false

      t.timestamps
    end
    
    add_index :listings, :lister_id
    add_index :listings, [:latitude, :longitude]
    
  end
end
