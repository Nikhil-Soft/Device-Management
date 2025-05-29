class CreateDevices < ActiveRecord::Migration[7.2]
  def change
    create_table :devices do |t|
      t.string :name
      t.string :ip_address
      t.integer :status
      t.boolean :active

      t.timestamps
    end
  end
end
