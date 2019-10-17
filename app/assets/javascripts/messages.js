$(function(){
  function buildMessage(message){
  // 画像がある場合、変数imageの中に代入する
    var image = message.image ? `<img src="${message.image}">`: "";
    var html =`<div class="message" data-id=${message.id}>
                 <div class="message__upper-info">
                   <div class="message__upper-info__talker">
                     ${message.user_name}
                   </div>
                   <div class="message__upper-info__date">
                     ${message.time}
                   </div>
                 </div>
                   <div class="message-text">
                     <p class="message-text__content">
                       ${message.content}
                     </p>
                   </div>
                   <div class="message-text__image">
                    ${image}
                   </div>
               </div>`
    return html;
  }
  
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
            // $(アペンド先).append(html)
      var html = buildMessage(message);
      $('.messages').append(html)
      $(".send-btn").attr('disabled', false);
      $('#new_message')[0].reset();
      $('.messages').scrollTop( $(".messages")[0].scrollHeight );
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {:format=>"json"}'
    last_message_id = $('.message:last').data('message-id');
    // console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
      .done(function(messages) {
        // console.log(messages)
      //追加するHTMLの入れ物を作る
        var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function (message) {
          // console.log(message)
        //メッセージが入ったHTMLを取得
          insertHTML += buildMessage(message);
        //メッセージを追加
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
    
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  };
setInterval(reloadMessages, 5000);
}); 