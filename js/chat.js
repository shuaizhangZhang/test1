$(function () {
  resetui();
  //为发送按钮添加点击事件

  $("#btnSend").on("click", function () {
    var text = $("#ipt").val().trim();
    if (text.length <= 0) {
      return $("#ipt").val("");
    }
    $("#talk_list").append(
      '<li class="right_word"><img src="img/person02.png" /> <span>' +
        text +
        "</span></li>"
    );
    $("#ipt").val("");
    // 重置滚动条的位置
    resetui();
    // 发起请求，获取聊天内容
    getMsg(text);
  });
  //获取机器人返回的消息
  function getMsg(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/robot",
      data: {
        spoken: text,
      },
      success: function (res) {
        if (res.message === "success") {
          let msg = res.data.info.text;
          $("#talk_list").append(
            '<li class="left_word"><img src="img/person01.png" /><span>' +
              msg +
              "</span></li>"
          );
          resetui();
          getVoice(msg);
        }
      },
    });
  }
  //文字转换为语音播放
  function getVoice(text) {
    $.ajax({
      method: "GET",
      url: "http://www.liulongbin.top:3006/api/synthesize",
      data: {
        text: text,
      },
      success: function (res) {
        if (res.status === 200) {
          $("#voice").attr("src", res.voiceUrl);
        }
      },
    });
  }

  // 添加键盘发送事件;
  $("#ipt").on("keyup", function (e) {
    if (e.keyCode === 13) {
      $("#btnSend").click();
    }
  });
});
