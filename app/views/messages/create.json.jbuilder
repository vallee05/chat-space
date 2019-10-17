json.(@message, :content, :image)
json.time @message.created_at.to_s
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id