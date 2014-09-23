class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zip
      t.integer :floor
      t.textarea :description
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
