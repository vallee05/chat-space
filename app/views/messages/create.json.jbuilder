json.(@message, :content)
json.time @message.created_at.to_s
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
json.image @message.image.url