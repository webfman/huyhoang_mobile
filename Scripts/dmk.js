$(function () {
    changeAppNameSize();

    $('#txtOldPass').focus();

    $('#txtOldPass').blur(function () {
        if ($(this).val() === '') {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group has-warning has-feedback');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-warning-sign').show();
            $(this).siblings('.glyphicon-remove').hide();
            removeAllNotification();
            notification.warning('Chưa nhập mật khẩu cũ');
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'DoiMatKhau.aspx/CheckPassword',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ Email: $('#hidEmail').val(), Password: $('#txtOldPass').val() })
            })
            .done(function (data) {
                $('#txtOldPass').parent().removeClass();
                $('#txtOldPass').siblings('.glyphicon-warning-sign').hide();
                if (data.d) {
                    $('#txtOldPass').parent().addClass('form-group has-success has-feedback');
                    $('#txtOldPass').siblings('.glyphicon-ok').show();
                    $('#txtOldPass').siblings('.glyphicon-remove').hide();
                }
                else {
                    $('#txtOldPass').parent().addClass('form-group has-error has-feedback');
                    $('#txtOldPass').siblings('.glyphicon-ok').hide();
                    $('#txtOldPass').siblings('.glyphicon-remove').show();
                }
            })
            .fail(function () {
                removeAllNotification();
                notification.error('Lỗi, không kiểm tra được mật khẩu cũ');
            });
        }
    });

    $('#txtNewPass').blur(function () {
        if ($(this).val() === '') {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group has-warning has-feedback');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-remove').hide();
            $(this).siblings('.glyphicon-warning-sign').show();
            removeAllNotification();
            notification.warning('Chưa nhập mật khẩu mới');
        }
        else if ($(this).val() === $('#txtOldPass').val()) {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group has-warning has-feedback');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-remove').hide();
            $(this).siblings('.glyphicon-warning-sign').show();
            removeAllNotification();
            notification.warning('Mật khẩu mới trùng mật khẩu cũ');
        }
        else if ($('#txtVerifyPass').val() !== '') {
            if ($('#txtVerifyPass').val() !== $(this).val()) {
                $(this).parent().removeClass();
                $(this).parent().addClass('form-group has-error has-feedback');
                $(this).siblings('.glyphicon-ok').hide();
                $(this).siblings('.glyphicon-remove').show();
                $(this).siblings('.glyphicon-warning-sign').hide();
                removeAllNotification();
                notification.warning('Mật khẩu mới chưa khớp nhau');
            }
            else {
                $(this).parent().removeClass();
                $(this).parent().addClass('form-group has-success has-feedback');
                $(this).siblings('.glyphicon-ok').show();
                $(this).siblings('.glyphicon-remove').hide();
                $(this).siblings('.glyphicon-warning-sign').hide();
            }
        }
        else {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-remove').hide();
            $(this).siblings('.glyphicon-warning-sign').hide();
        }
    });

    $('#txtVerifyPass').blur(function () {
        if ($(this).val() === '') {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group has-warning has-feedback');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-remove').hide();
            $(this).siblings('.glyphicon-warning-sign').show();
            removeAllNotification();
            notification.warning('Chưa xác nhận mật khẩu mới');
        }
        else if ($('#txtNewPass').val() !== '') {
            if ($('#txtNewPass').val() !== $(this).val()) {
                $(this).parent().removeClass();
                $(this).parent().addClass('form-group has-error has-feedback');
                $(this).siblings('.glyphicon-ok').hide();
                $(this).siblings('.glyphicon-remove').show();
                $(this).siblings('.glyphicon-warning-sign').hide();
                removeAllNotification();
                notification.warning('Mật khẩu mới chưa khớp nhau');
            }
            else {
                $(this).parent().removeClass();
                $(this).parent().addClass('form-group has-success has-feedback');
                $(this).siblings('.glyphicon-ok').show();
                $(this).siblings('.glyphicon-remove').hide();
                $(this).siblings('.glyphicon-warning-sign').hide();
            }
        }
        else {
            $(this).parent().removeClass();
            $(this).parent().addClass('form-group');
            $(this).siblings('.glyphicon-ok').hide();
            $(this).siblings('.glyphicon-remove').hide();
            $(this).siblings('.glyphicon-warning-sign').hide();
        }
    });

    var notification = $('#notification').kendoNotification({
        autoHideAfter: 3000,
        button: true,
        position: { top: 455 },
        show: function (e) {
            var myLeft = ($(document).width() - e.element.parent().width()) / 2;
            e.element.parent().css('left', myLeft);
        }
    }).data('kendoNotification');

    $('#btnDoiMK').click(function (e) {
        var email = $('#hidEmail').val();
        var oldPass = $('#txtOldPass').val();
        var newPass = $('#txtNewPass').val();
        var verifyPass = $('#txtVerifyPass').val();
        if (oldPass === '' || newPass === '' || verifyPass === '') {
            removeAllNotification();
            notification.warning('Chưa nhập mật khẩu');
            $('#txtOldPass').focus();
        }
        else if (!$('#txtOldPass').parent().hasClass('has-success')) {
            removeAllNotification();
            notification.error('Mật khẩu cũ không chính xác');
            $('#txtOldPass').focus();
        }
        else if (newPass !== verifyPass) {
            removeAllNotification();
            notification.error('Mật khẩu mới chưa khớp nhau');
            $('#txtVerifyPass').focus();
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'DoiMatKhau.aspx/ChangePassword',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ Email: email, Password: newPass })
            })
            .done(function (data) {
                if (data.d) {
                    removeAllNotification();
                    notification.success('Đổi mật khẩu thành công, vui lòng đăng nhập lại');
                    setTimeout(function () {
                        if ($('#hidRedirectPage').val() !== '')
                            window.location.replace("DangXuat.aspx?p=" + $('#hidRedirectPage').val());
                        else
                            window.location.replace("DangXuat.aspx");
                    }, 3000);
                }
            })
            .fail(function () {
                removeAllNotification();
                notification.error('Đổi mật khẩu không thành công');
            });
        }
    });

    $('#btnCancel').click(function () {
        if ($('#hidRedirectPage').val() !== '')
            window.location.replace($('#hidRedirectPage').val());
        else
            window.location.replace('index.aspx');
    });

    $('#txtOldPass,#txtNewPass,#txtVerifyPass').keyup(function (e) {
        if (e.which === 13) $('#btnDoiMK').click();
    });

    $('#txtOldPass,#txtNewPass,#txtVerifyPass').focus(function () {
        $(this).select();
    });

    function removeAllNotification() {
        var elements = notification.getNotifications();
        elements.each(function () { $(this).parent().remove(); });
    }

    function changeAppNameSize() {
        $('.AppName').css('font-size', $(document).width() / 42);
        if ($('.AppName').height() > 80) $('.AppName').css('line-height', '40px');
        else $('.AppName').css('line-height', '80px');
    }
});