class CreateLineListingImages < ActiveRecord::Migration
  def change
    create_table :line_listing_images do |t|
      t.integer :line_listing_id
      t.string :img_link

      t.timestamps
    end
  end
end
