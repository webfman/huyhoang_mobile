$(function () {
    changeAppNameSize();

    $('#txtEmail').focus();

    $('#btnDangNhap').click(function (e) {
        var email = $('#txtEmail').val().trim();
        var pass = $('#txtPassword').val();

        if (pass === '') {
            e.preventDefault();
            $('.k-empty-password').show();
            setTimeout(function () {
                $('.k-empty-password').hide();
            }, 5000);
            $('#txtPassword').focus();
        }

        if (email === '') {
            e.preventDefault();
            $('.k-empty-username').show();
            setTimeout(function () {
                $('.k-empty-username').hide();
            }, 5000);
            $('#txtEmail').focus();
        }
    });

    $('#txtPassword,#txtEmail').focus(function () {
        $(this).select();
    });

    $('#ddlChuongTrinh').kendoDropDownList({
        change: function () {
            $('#hfChuongTrinh').val(this.value());
        },
        dataSource: {
            data: [
                { text: 'Quản lý hợp đồng mua sắm', value: 'HD' },
                { text: 'Quản lý vật tư web', value: 'VT' }
            ]
        },
        dataTextField: 'text',
        dataValueField: 'value'
    });

    $('#ddlChuongTrinh').data('kendoDropDownList').value($('#hfChuongTrinh').val());

    function changeAppNameSize() {
        $('.AppName').css('font-size', $(document).width() / 42);
        if ($('.AppName').height() > 80) $('.AppName').css('line-height', '40px');
        else $('.AppName').css('line-height', '80px');
    }
});
