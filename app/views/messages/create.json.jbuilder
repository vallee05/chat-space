# キー              バリュー
json.content       @message.content
json.user_name     @message.user.name
json.time          @message.created_at.to_s
json.image         @message.image.url