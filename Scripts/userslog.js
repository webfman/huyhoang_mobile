$(function () {
    kendo.culture('vi-VN');

    var notification = $('#notification').kendoNotification({
        autoHideAfter: 3000,
        button: true,
        position: { top: 350 },
        show: function (e) {
            var myLeft = ($(document).width() - e.element.parent().width()) / 2;
            e.element.parent().css('left', myLeft);
        }
    }).data('kendoNotification');

    var cboUser = $('#cboUser').kendoDropDownList({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            schema: {
                data: 'd'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'XemNhatKy.aspx/GetDSNguoiDung'
                }
            }
        },
        optionLabel: 'Chọn người dùng...'
    }).data('kendoDropDownList');

    var dpTuNgay = $('#dpTuNgay').kendoDatePicker({
        change: function () {
            dpDenNgay.min(this.value());
            if (this.value() > dpDenNgay.value())
                dpDenNgay.value(this.value());
            if (this.value() < this.min())
                this.value(this.min());
        },
        footer: 'Hôm nay: #: kendo.toString(data, "dd MMMM yyyy") #',
        min: new Date(2000, 0, 1),
        value: new Date()
    }).data('kendoDatePicker');

    var dpDenNgay = $('#dpDenNgay').kendoDatePicker({
        change: function () {
            if (this.value() < this.min())
                this.value(this.min());
        },
        footer: 'Hôm nay: #: kendo.toString(data, "dd MMMM yyyy") #',
        min: dpTuNgay.value(),
        value: new Date()
    }).data('kendoDatePicker');

    var gvData = $('#gvData').kendoGrid({
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Email', title: 'Tên Người Dùng' },
            { field: 'NoiDung', title: 'Nội Dung' },
            { field: 'ThoiDiem', title: 'Thời Điểm' }
        ],
        pageable: {
            messages: {
                display: 'Dòng {0} - {1} trong tổng số {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng mỗi trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                previous: 'Trang trước'
            },
            pageSize: 10,
            pageSizes: [10, 20, 50, 100]
        },
        resizable: true
    }).data('kendoGrid');

    $('input[data-role=datepicker]').click(selectDate);//.focus(selectDate)

    $('input[data-role=datepicker]').keydown(function (e) {
        var key = e.which;
        if (key !== 9 && (key < 112 || key > 123))
            e.preventDefault();
        var start = this.selectionStart;
        if (key === 38 || key === 40) {
            var v = $(this).val();
            if (start < 3) {
                var d = parseInt(v.substring(0, v.indexOf('/')));
                d = key === 38 ? d + 1 : d - 1;
                d = d < 10 ? '0' + d : d.toString();
                if (isValidDate(d + v.substr(v.indexOf('/'))))
                    $(this).val(d + v.substr(v.indexOf('/')));
                this.selectionStart = 0;
                this.selectionEnd = 2;
            }
            else if (start < 6) {
                var m = parseInt(v.substring(v.indexOf('/') + 1, v.lastIndexOf('/')));
                m = key === 38 ? m + 1 : m - 1;
                m = m < 10 ? '0' + m : m.toString();
                if (parseInt(m) >= 1 && parseInt(m) <= 12)
                    $(this).val(v.substring(0, v.indexOf('/') + 1) + m + v.substr(v.lastIndexOf('/')));
                this.selectionStart = 3;
                this.selectionEnd = 5;
            }
            else {
                var y = parseInt(v.substr(v.lastIndexOf('/') + 1));
                y = key === 38 ? y + 1 : y - 1;
                $(this).val(v.substring(0, v.lastIndexOf('/') + 1) + y);
                this.selectionStart = 6;
                this.selectionEnd = 10;
            }
        }
        else if (key === 37) {
            if (start < 3) {
                this.selectionStart = 6;
                this.selectionEnd = 10;
            }
            else if (start < 6) {
                this.selectionStart = 0;
                this.selectionEnd = 2;
            }
            else {
                this.selectionStart = 3;
                this.selectionEnd = 5;
            }
        }
        else if (key === 39) {
            if (start < 3) {
                this.selectionStart = 3;
                this.selectionEnd = 5;
            }
            else if (start < 6) {
                this.selectionStart = 6;
                this.selectionEnd = 10;
            }
            else {
                this.selectionStart = 0;
                this.selectionEnd = 2;
            }
        }
    });

    $('input[data-role=datepicker]').blur(function () {
        var v = $(this).val();
        while (!isValidDate(v)) {
            var d = parseInt(v.substring(0, v.indexOf('/'))) - 1;
            d = d < 10 ? '0' + d : d.toString();
            v = d + v.substr(v.indexOf('/'));
        }
        $(this).val(v);
    });

    $('#chkAll').change(function () {
        if ($(this).is(':checked'))
            cboUser.enable(false);
        else
            cboUser.enable(true);
    });

    $('#btnXem').click(function () {
        if (cboUser.select() === 0 && !($('#chkAll').is(':checked'))) {
            notification.error('Chưa chọn người dùng');
            return;
        }
        if (dpTuNgay.value() === null || dpDenNgay.value() === null) {
            notification.error('Chưa chọn ngày');
            return;
        }
        showBackdrop();
        var email = '';
        if (!($('#chkAll').is(':checked')))
            email = cboUser.value();
        var ds = new kendo.data.DataSource({
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 10,
            schema: {
                data: 'd.List',
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    return JSON.stringify(data);
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    data: {
                        Email: email,
                        TuNgay: dpTuNgay.value(),
                        DenNgay: dpDenNgay.value()
                    },
                    dataType: 'json',
                    type: 'POST',
                    url: 'XemNhatKy.aspx/GetLog'
                }
            }
        });
        gvData.unbind('dataBound');
        gvData.bind('dataBound', function () {
            hideBackdrop();
            if (this.dataSource.total() === 0)
                notification.warning('Không có nhật ký truy cập của người dùng này');
        });
        gvData.setDataSource(ds);
    });

    function removeAllNotification() {
        var elements = notification.getNotifications();
        elements.each(function () { $(this).parent().remove(); });
    }

    function isValidDate(inputDate) { // inputDate format: dd/mm/yyyy
        if (!inputDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) return false; // invalid format
        var dPart = inputDate.split('/');
        var tempDate = new Date(parseInt(dPart[2]), parseInt(dPart[1]) - 1, parseInt(dPart[0]));
        if (tempDate.getDate() === parseInt(dPart[0]) && tempDate.getFullYear() === parseInt(dPart[2])) return true;
        return false; // invalid date
    }

    function selectDate() {
        var start = this.selectionStart;
        if (start < 3) {
            this.selectionStart = 0;
            this.selectionEnd = 2;
        }
        else if (start < 6) {
            this.selectionStart = 3;
            this.selectionEnd = 5;
        }
        else {
            this.selectionStart = 6;
            this.selectionEnd = 10;
        }
    }

    function showBackdrop() {
        lockScroll();
        $('#backdrop').show();
    }

    function hideBackdrop() {
        unlockScroll();
        $('#backdrop').hide();
    }

    function lockScroll() {
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        if (document.attachEvent) document.attachEvent("on" + mousewheelevt, catchWheel);
        else if (document.addEventListener) document.addEventListener(mousewheelevt, catchWheel, false);
        document.body.style.overflowY = "hidden";
    }

    function unlockScroll() {
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
        if (document.detachEvent) document.detachEvent("on" + mousewheelevt, catchWheel);
        else if (document.removeEventListener) document.removeEventListener(mousewheelevt, catchWheel, false);
        document.body.style.overflowY = "auto";
    }

    function catchWheel(e) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }
});