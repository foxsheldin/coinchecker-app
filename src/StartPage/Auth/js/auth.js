import $ from "jquery";

const submitBtn = document.querySelector("#submitBtn");

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
if (getCookie("userID") != undefined && getCookie("email") != undefined) {
  document.cookie =
    "userID=" + getCookie("userID") + "; path=/; max-age=900; samesite=strict";
  document.cookie =
    "email=" + getCookie("email") + "; path=/; max-age=900; samesite=strict";
  document.cookie =
    "startPage=" +
    getCookie("startPage") +
    "; path=/; max-age=900; samesite=strict";
  if (getCookie("startPage") != undefined) {
    window.location.href = "/system/" + getCookie("startPage") + ".php";
  } else {
    window.location.href = "/system/transaction/1";
  }
}

submitBtn.addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.querySelector("#password").value;
  /* let email = $('#email').val();
    let password = $('#password').val(); */

  $.ajax({
    url: "/auth/php/auth.php",
    type: "POST",
    dataType: "json",
    data: {
      email: email,
      password: password,
    },
    success: function (data) {
      if (!data.error) {
        console.log("Данные отправлены!");
        document.cookie =
          "userID=" + data.userID + "; path=/; max-age=900; samesite=strict";
        document.cookie =
          "email=" + data.email + "; path=/; max-age=900; samesite=strict";
        document.cookie =
          "startPage=" +
          data.startPage +
          "; path=/; max-age=900; samesite=strict";
        window.location.href = "/system/" + data.startPage + ".php";
      } else {
        note({
          content: data.msg,
          type: "error",
          time: 15,
        });
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      note({
        content: "Ошибка: Невозможно установить соединение с базой данных",
        type: "error",
        time: 15,
      });
    },
  });
});
