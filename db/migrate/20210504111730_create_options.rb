class CreateOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :options do |t|
      t.string :option, null: false
      t.integer :vote, default: 0
      t.timestamps
    end
  end
end
