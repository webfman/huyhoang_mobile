var selectedRow = null;
var change = false;
$(document).ready(function () {
    $("#dialog_subform").dialog("destroy");
    $("#dialog_subform").dialog({
        modal: true,
        autoOpen: false,
        width: screen.width * 0.5,
        height: screen.height * 0.4,
        buttons: { Thoát: function () {
            $(this).dialog("close");
        }
        }
    });
    $("#dialog_subform").dialog("option", "draggable", true);
    $("#dialog_subform").dialog("close");

    $("#dialog_loading").dialog("destroy");
    $("#dialog_loading").dialog({
        modal: true,
        autoOpen: false,
        width: 300,
        height: 120
    });
});

function showDialog(file, paraname, title) {
    $(document).ready(function () {
        //showLoading();
        //var d = new Date();
        //var s = d.getMilliseconds();
        var url = file + '?' + paraname;
        $("#framesubform").attr("src", url);
        $("#dialog_subform").dialog("open");
    });
}

function openDialog() {
    $("#dialog_loading").dialog("close");
    $("#dialog_subform").dialog("open");
}

function showDetail(key, session_id, row) {
    selectedRow = row;
    change = false;
    showDialog('Capnhat.aspx', 'key=' + key + '&session_id=' + session_id);
}

function disableRow() {
    if (selectedRow == null) return;
    selectedRow.className = 'disabledrow';
}
function enableRow() {
    //nếu không được thì dùng onunload của form update để gọi hàm này
    //bằng cách kiểm tra trong from xem chkByPass... có chọn hay không thì mới gọi.
    if (selectedRow == null) return;
    selectedRow.className = 'default';
}

function selectRow(row) {
    if (row.className == 'disabledrow') return;
    row.className = 'selectedrow';
}

function unSelectRow(row) {
    if (row.className == 'disabledrow') return;
    row.className = 'default';
}

function showLoading() {
    $("#dialog_loading").dialog("open");
}

function showError(error) {
    document.getElementById('dialog_loading').innerHTML = error;
}
