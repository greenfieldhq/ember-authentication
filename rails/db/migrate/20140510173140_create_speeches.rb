class CreateSpeeches < ActiveRecord::Migration
  def change
    create_table :speeches do |t|
      t.string :name
      t.integer :speaker_id

      t.timestamps
    end
  end
end
