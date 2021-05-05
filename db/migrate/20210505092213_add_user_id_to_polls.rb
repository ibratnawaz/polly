class AddUserIdToPolls < ActiveRecord::Migration[6.0]
  def change
    add_column :polls, :user_id, :integer
    add_foreign_key :polls, :users, column: :user_id, on_delete: :cascade
  end
end
