# from http://stackoverflow.com/questions/4020131/rails-db-migration-how-to-drop-a-table

class DropUsersTable < ActiveRecord::Migration
  def up
    drop_table :users
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
