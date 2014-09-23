class CreateLineListings < ActiveRecord::Migration
  def change
    create_table :line_listings do |t|
      t.integer :lister_id
      t.integer :booker_id
      t.decimal :price, precision: 2
      t.integer :line_id
      t.boolean :active
      t.float :latitude
      t.float :longitude
      t.text :description

      t.timestamps
    end
    
    add_index :line_listings, [:latitude, :longitude]
  end
end