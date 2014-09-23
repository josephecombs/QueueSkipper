class CreateLineListings < ActiveRecord::Migration
  def change
    create_table :line_listings do |t|
      t.integer :lister_id
      t.integer :booker_id
      t.currency :price
      t.integer :line_id
      t.bool :active
      t.float :latitude
      t.float :longitude
      t.textarea :description

      t.timestamps
    end
    
    add_index :line_listings, [:latitude, :longitude]
  end
end