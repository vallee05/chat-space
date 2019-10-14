$(document).on('turbolinks:load', function() { 
  var search_list = $("#user-search-result");
  var user_add = $("#chat-group-users");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
    }

  function appendErrMsgToHTML(message) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    search_list.append(html);
    }

  function appendRemove(id,name) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    user_add.append(html);
  }




  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (!input) {
      $("#user-search-result").empty('');
      return false;
    }

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length != 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });


  // 追加ボタンが押された時にイベントが発火
  $('#user-search-result').on("click", '.chat-group-user__btn--add', function(){
    // removeで追加ボタンが押されると追加ボタンが表示されなくなる
    $(this).parent().remove();
    var id=$(this).data("user-id");
    var name=$(this).data("user-name");
    appendRemove(id,name);

  });

  $('#chat-group-users').on('click', '.user-search-remove ', function(){
    $(this).parent().remove();
  });
});
  