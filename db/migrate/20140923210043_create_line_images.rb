class CreateLineImages < ActiveRecord::Migration
  def change
    create_table :line_images do |t|
      t.integer :line_id
      t.string :img_link

      t.timestamps
    end
    
    add_index :line_images, :line_id
  end
end
