class CreateLineImages < ActiveRecord::Migration
  def change
    create_table :line_images do |t|
      t.integer :queue_id
      t.string :img_link

      t.timestamps
    end
  end
end
