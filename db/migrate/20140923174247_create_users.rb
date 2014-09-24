class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :session_token
      t.string :password_digest, null: false
      t.string :img_url

      t.timestamps
    end
    
    add_index :users, :username
    add_index :users, :session_token
  end
end
