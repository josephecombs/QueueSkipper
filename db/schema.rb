# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140923210043) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "line_images", force: true do |t|
    t.integer  "line_id"
    t.string   "img_link"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "line_images", ["line_id"], name: "index_line_images_on_line_id", using: :btree

  create_table "line_listing_images", force: true do |t|
    t.integer  "line_listing_id"
    t.string   "img_link"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "line_listing_images", ["line_listing_id"], name: "index_line_listing_images_on_line_listing_id", using: :btree

  create_table "line_listings", force: true do |t|
    t.integer  "lister_id"
    t.integer  "booker_id"
    t.decimal  "price",       precision: 2, scale: 0
    t.integer  "line_id"
    t.boolean  "active"
    t.float    "latitude"
    t.float    "longitude"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "line_listings", ["latitude", "longitude"], name: "index_line_listings_on_latitude_and_longitude", using: :btree

  create_table "lines", force: true do |t|
    t.string   "street_address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.integer  "floor"
    t.text     "description",    null: false
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "lines", ["latitude", "longitude"], name: "index_lines_on_latitude_and_longitude", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "session_token"
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
