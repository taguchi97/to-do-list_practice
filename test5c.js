// 現在時刻を取得して出力する関数
var writeToday = function () {
    //曜日取得
    var today = new Date();
    var week = today.getDay();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var year = today.getFullYear();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var time = today.getTime();
    var timeLeft = Math.floor((1000 * 60 * 60 * 24 - (time + 9 * 60 * 60 * 1000) % (1000 * 60 * 60 * 24)) / 1000)

    //曜日を入れる変数
    var str;

    //条件分岐
    switch (week) {
        case 0: str = "日"; break;
        case 1: str = "月"; break;
        case 2: str = "火"; break;
        case 3: str = "水"; break;
        case 4: str = "木"; break;
        case 5: str = "金"; break;
        default: str = "土"; break;
    }

    $(".time").html(
        year + "年" + month + "月" + date + "日" + str + "曜日  " +
        hour + "時" + min + "分" + sec + "秒<br>今日は残り" + timeLeft + "秒です"
    );
}

writeToday();
setInterval(writeToday, 500);

$(function () {
    //リストに新しいtodoを追加
    $("#addBtn").click(function () {
        let newToDo = $("#addToDo").val();
        if (newToDo != "") {
            //newToDoをリストに追加
            let currentToDoLists = $("#toDo").html();
            $("#toDo").html(
                currentToDoLists + '<div class="notChecked">' + newToDo + '</div>'
            );
            //divの中身をクリア
            $("#addToDo").val("").focus();
            $(".checked").addClass("notChecked").removeClass("checked");
        }
    });

    //Enterキーを押されたら追加ボタンをクリック
    $("#addToDo").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#addBtn").click();
        }
    });

    //todoを削除 関数
    function delToDo() {
        $(".checked").remove();
    }

    //削除ボタンで削除
    $("#delToDo").click(function () {
        delToDo();
    })

    //Deleteキーを押されたら削除ボタンをクリック
    $(document).keyup(function (event) {
        if (event.keyCode === 46) {
            $("#delToDo").click();
        }
    });

    //todoリストから完了リストへ移動
    $("#compBtn").click(function () {
        let currentCompList = $("#comp").html();
        $("#toDo").find('.checked').each(function () {
            currentCompList += ('<div class="notChecked">' + $(this).html() + '</div>');
            delToDo();
        });
        $("#comp").html(currentCompList);
        $(".checked").addClass("notChecked").removeClass("checked");
    })

    //完了リストからtodoリストへ移動
    $("#backBtn").click(function () {
        let currentToDoList = $("#toDo").html();
        $("#comp").find('.checked').each(function () {
            currentToDoList += ('<div class="notChecked">' + $(this).html() + '</div>');
            delToDo();
        });
        $("#toDo").html(currentToDoList);
        $(".checked").addClass("notChecked").removeClass("checked");
    })

    //divタグをクリックされたらchecked/notCheckedクラスを切り替える
    $(document).on('click', '.checked', function () {
        $(this).removeClass("checked").addClass("notChecked");
    });
    $(document).on('click', '.notChecked', function () {
        $(this).removeClass("notChecked").addClass("checked");
    });

});