# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

###Association
has_many :groups, through :group_users
has_many :messages


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

###Association
has_many :users, through :group_users
has_many :messages
accepts_nested_attributes_for :group_users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: folse, foreign_key: true|

###Association
belongs_to :user
belongs_to :group