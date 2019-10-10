$(function(){
function buildMessage(message){
    var image = message.image ? `<img src="${message.image}">`: "";
    var html =`<div class="message">
                 <div class="message__upper-info">
                   <div class="message__upper-info__talker">
                     ${message.user_name}
                   </div>
                   <div class="message__upper-info__date">
                     ${message.created_at}
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
      $('#message_content').val("")
      $('.messages').scrollTop( $(".messages")[0].scrollHeight );
    })
    .fail(function(){
      alert('error');
    })
  })
}); 