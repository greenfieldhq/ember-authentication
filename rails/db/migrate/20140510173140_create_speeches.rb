class CreateSpeeches < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :make
      t.string :model
      t.integer :year
      t.string :color
      t.integer :user_id

      t.timestamps
    end
  end
end
