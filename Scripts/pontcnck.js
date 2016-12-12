$(function () {
    kendo.culture('vi-VN');

    $('#txtSoVB').focus();

    var notification = $('#notification').kendoNotification().data('kendoNotification');

    $('#btnTim').click(function (e) {
        if ($('#txtSoVB').val().trim() === '') {
            setNotificationPosition(notification, getBottom($('#txtSoVB')) + 7, null, null, getLeft($('#txtSoVB')));
            notification.warning('Chưa nhập số văn bản');
        }
        else {
            var ds = new kendo.data.DataSource({
                error: function () {
                    alert('Lỗi đường truyền');
                },
                pageSize: 5,
                requestEnd: function (event) {
                    if (event.response.d.Total > 0)
                        createGrid();
                    else {
                        notification.options.autoHideAfter = 15000;
                        setNotificationPosition(notification, getBottom($('#txtSoVB')) + 7, null, null, getLeft($('#txtSoVB')));
                        notification.warning('Không tìm thấy số văn bản này do một trong những nguyên nhân sau:<ul><li>Số văn bản không tồn tại</li><li>Đã khóa cập nhật số lượng cam kết</li><li>Đã khóa cập nhật số lượng thực tế</li><li>Thuộc quyền quản lý của nhà thầu khác</li></ul>');
                        notification.options.autoHideAfter = 5000;
                    }
                },
                schema: {
                    data: 'd.Data',
                    total: 'd.Total'
                },
                serverPaging: true,
                transport: {
                    parameterMap: function (data, operation) {
                        return JSON.stringify(data);
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        data: { SoVB: $('#txtSoVB').val().trim() },
                        dataType: 'json',
                        type: 'POST',
                        url: 'PONT_CapNhatCamKet.aspx/GetDSPONhaThau'
                    }
                }
            });
            ds.read();
        }
    });

    $('#txtSoVB').keydown(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            $('#btnTim').click();
        }
    });

    var dlgLichSu = $('#dlgLichSu').kendoWindow({
        modal: true,
        resizable: false,
        visible: false,
        width: 700
    }).data('kendoWindow');

    $('#btnClose').click(function (e) {
        e.preventDefault();
        dlgLichSu.close();
    });

    function createGrid() {
        if ($('#gvData').data('kendoGrid') !== undefined) {
            var wrapper = $('#gvData').data('kendoGrid').wrapper;
            $('#gvData').data('kendoGrid').destroy();
            wrapper.remove();
            $('.panel-body').append($('<div id="gvData"></div>'));
        }
        var gvData = $('#gvData').kendoGrid({
            change: function (e) {
                this.expandRow(this.select());
            },
            columnResizeHandleWidth: 6,
            columns: [
                { field: 'Id', hidden: true },
                { field: 'SoVanBan', title: 'Số Văn Bản', width: 200 },
                { attributes: { 'class': 'text-center' }, field: 'NgayVanBan', title: 'Ngày Văn Bản', width: 100 },
                { field: 'ThoiGianTaoDonHang', title: 'Thời Gian Xuất Phiếu' }
            ],
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            dataSource: {
                error: function () {
                    alert('Lỗi đường truyền');
                },
                pageSize: 5,
                schema: {
                    data: 'd.Data',
                    total: 'd.Total'
                },
                serverPaging: true,
                transport: {
                    parameterMap: function (data, operation) {
                        return JSON.stringify(data);
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        data: { SoVB: $('#txtSoVB').val().trim() },
                        dataType: 'json',
                        type: 'POST',
                        url: 'PONT_CapNhatCamKet.aspx/GetDSPONhaThau'
                    }
                }
            },
            detailExpand: function (e) {
                this.select(e.masterRow);
                e.masterRow.siblings().each(function () {
                    e.sender.collapseRow($(this));
                });
            },
            detailInit: function (e) {
                $("<div/>").appendTo(e.detailCell).kendoGrid({
                    change: function (e) {
                        this.expandRow(this.select());
                    },
                    columnResizeHandleWidth: 6,
                    columns: [
                        { field: 'ID', hidden: true },
                        { field: 'Ten', title: 'Đơn Vị', width: 200 },
                        { field: 'Tinh.TenTinh', title: 'Tỉnh Thành' }
                    ],
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                    },
                    dataSource: {
                        error: function () {
                            alert('Lỗi đường truyền');
                        },
                        pageSize: 5,
                        schema: {
                            data: 'd.Data',
                            total: 'd.Total'
                        },
                        serverPaging: true,
                        serverSorting: true,
                        sort: {
                            field: 'Ten',
                            dir: 'asc'
                        },
                        transport: {
                            parameterMap: function (data, operation) {
                                return JSON.stringify(data);
                            },
                            read: {
                                contentType: "application/json; charset=utf-8",
                                data: { PONhaThauId: e.data.Id },
                                dataType: 'json',
                                type: 'POST',
                                url: 'PONT_CapNhatCamKet.aspx/GetDSDonVi'
                            }
                        }
                    },
                    detailExpand: function (e) {
                        this.select(e.masterRow);
                        e.masterRow.siblings().each(function () {
                            e.sender.collapseRow($(this));
                        });
                    },
                    detailInit: function (e) {
                        $("<div/>").appendTo(e.detailCell).kendoGrid({
                            columnResizeHandleWidth: 6,
                            columns: [
                                { field: 'Id', hidden: true },
                                { field: 'TenVatTu', headerAttributes: { 'style': 'vertical-align:middle' }, title: 'Tên Vật Tư' },
                                { field: 'DonViTinh', title: 'Đơn Vị<br/>Tính', width: 70 },
                                {
                                    attributes: { 'class': 'text-right' },
                                    field: 'SoLuongGiaoHang',
                                    format: '{0:n0}',
                                    title: 'Số Lượng<br/>Đặt Hàng',
                                    width: 90
                                },
                                {
                                    attributes: { 'class': 'text-right' },
                                    field: 'SoLuongCamKet',
                                    format: '{0:n0}',
                                    title: 'Số Lượng<br/>Cam Kết',
                                    width: 90
                                },
                                {
                                    attributes: { 'class': 'text-center' },
                                    editor: function (container, options) {
                                        var input = $("<input/>");

                                        input.attr("name", options.field);
                                        input.appendTo(container);
                                        input.kendoDatePicker({
                                            footer: 'Hôm nay: #: kendo.toString(data, "dd MMMM yyyy") #',
                                            format: 'dd/MM/yyyy',
                                            min: new Date(2000, 0, 1),
                                            value: new Date()
                                        });
                                    },
                                    field: 'NgayCamKet',
                                    format: '{0:dd/MM/yyyy}',
                                    headerAttributes: { 'style': 'vertical-align:middle' },
                                    title: 'Ngày Cam Kết',
                                    width: 120
                                },
                                { field: 'ThoiGianCapNhatCamKet', title: 'Thời Gian<br/>Cập Nhật Cam Kết', width: 130 },
                                {
                                    command: {
                                        name: 'xemLichSu',
                                        text: "&nbsp;&nbsp;Xem lịch sử",
                                        click: function (e) {
                                            e.preventDefault();

                                            if ($('#gvLichSu').data('kendoGrid') !== undefined) {
                                                var wrapper = $('#gvLichSu').data('kendoGrid').wrapper;
                                                $('#gvLichSu').data('kendoGrid').destroy();
                                                wrapper.remove();
                                                $('<div id="gvLichSu"></div>').prependTo('#dlgLichSu');
                                            }

                                            var tr = $(e.target).closest("tr");
                                            var data = this.dataItem(tr);
                                            if (data.ThoiGianCapNhatCamKet !== '') {
                                                $.ajax({
                                                    contentType: 'application/json; charset=utf-8',
                                                    data: JSON.stringify({ PONhaThauChiTietId: data.Id }),
                                                    dataType: 'json',
                                                    type: 'POST',
                                                    url: 'PONT_CapNhatCamKet.aspx/GetLichSu'
                                                })
                                                .done(function (response) {
                                                    $('#gvLichSu').kendoGrid({
                                                        columns: [
                                                            { field: 'SoLuong', title: 'Số Lượng' },
                                                            { field: 'Ngay', title: 'Ngày Cam Kết' },
                                                            { field: 'NgayCapNhat', title: 'Ngày Cập Nhật' }
                                                        ],
                                                        dataSource: { data: response.d },
                                                        pageable: {
                                                            buttonCount: 3,
                                                            input: true,
                                                            messages: {
                                                                display: 'dòng {0} - {1} / {2} dòng',
                                                                empty: 'Không có dữ liệu',
                                                                first: 'Trang đầu',
                                                                itemsPerPage: 'dòng / trang',
                                                                last: 'Trang cuối',
                                                                next: 'Trang sau',
                                                                of: '/ {0}',
                                                                page: 'Trang',
                                                                previous: 'Trang trước'
                                                            },
                                                            pageSize: 5
                                                        }
                                                    });
                                                    dlgLichSu.title('Lịch Sử Xác Nhận Cam Kết Của Vật Tư: ' + data.TenVatTu);
                                                    dlgLichSu.center().open();
                                                })
                                                .fail(function () {
                                                    alert('Lỗi đường truyền');
                                                });
                                            }
                                            else {
                                                setNotificationPosition(notification, e.target.getBoundingClientRect().bottom + 7, e.target.getBoundingClientRect().right, null, null);
                                                notification.warning('Chưa có lịch sử xác nhận cam kết');
                                            }
                                        },
                                        iconClass: 'fa fa-list-alt'
                                    },
                                    width: 140
                                }
                            ],
                            dataSource: {
                                change: function (e) {
                                    if (e.action === 'itemchange' && e.items[0].NgayCamKet !== null && e.items[0].SoLuongCamKet > 0 && e.items[0].SoLuongCamKet <= e.items[0].SoLuongGiaoHang)
                                        this.sync();
                                },
                                error: function () {
                                    alert('Lỗi đường truyền');
                                },
                                pageSize: 5,
                                requestEnd: function (e) {
                                    if (e.response && e.type === 'update') {
                                        if (e.response.d.ThoiGianCapNhatCamKet === '00:00:00 01/01/2000') {
                                            setNotificationPosition(notification, $(window).height() / 2, null, null, $(window).width() / 2);
                                            notification.warning('Đơn hàng này đã bị khóa cập nhật số lượng cam kết');
                                            this.cancelChanges();
                                        }
                                        else
                                            this.read();
                                    }
                                },
                                schema: {
                                    data: 'd.Data',
                                    model: {
                                        id: 'Id',
                                        fields: {
                                            Id: {
                                                editable: false,
                                                type: 'number'
                                            },
                                            TenVatTu: { editable: false },
                                            DonViTinh: { editable: false },
                                            SoLuongGiaoHang: {
                                                editable: false,
                                                type: 'number'
                                            },
                                            SoLuongCamKet: {
                                                nullable: false,
                                                type: 'number',
                                                validation: {
                                                    checkSL: function (input) {
                                                        if (input.attr('name') === 'SoLuongCamKet' && parseInt(input.val()) > parseInt(input.closest('td').prev().text().replace(/\./g, ''))) {
                                                            input.attr("data-checkSL-msg", "Số lượng cam kết không được lớn hơn số lượng đặt hàng");
                                                            return false;
                                                        }
                                                        return true;
                                                    }
                                                }
                                            },
                                            NgayCamKet: { nullable: false, editable: true, type: 'date' },
                                            ThoiGianCapNhatCamKet: { editable: false }
                                        }
                                    },
                                    total: 'd.Total'
                                },
                                serverPaging: true,
                                transport: {
                                    parameterMap: function (data, operation) {
                                        if (operation === 'read')
                                            return JSON.stringify(data);
                                        else {
                                            delete data.ThoiGianCapNhatCamKetData;
                                            delete data.ThoiGianCapNhatThucTeData;
                                            delete data.NgayCamKetData;
                                            delete data.NgayThucTeData;
                                            data.NgayCamKet = kendo.toString(data.NgayCamKet, 'dd/MM/yyyy');
                                            return JSON.stringify({ PONTCT: data });
                                        }
                                    },
                                    read: {
                                        contentType: "application/json; charset=utf-8",
                                        data: {
                                            PONhaThauId: gvData.dataItem(e.sender.wrapper.closest('tr').prev()).Id,
                                            DonViId: e.data.ID
                                        },
                                        dataType: 'json',
                                        type: 'POST',
                                        url: 'PONT_CapNhatCamKet.aspx/GetDSVatTuCK'
                                    },
                                    update: {
                                        contentType: "application/json; charset=utf-8",
                                        dataType: 'json',
                                        type: 'POST',
                                        url: 'PONT_CapNhatCamKet.aspx/CapNhatSoLuongCK'
                                    }
                                }
                            },
                            editable: true,
                            pageable: {
                                buttonCount: 3,
                                input: true,
                                messages: {
                                    display: 'Vật tư {0} - {1} / {2} vật tư',
                                    empty: 'Không có dữ liệu',
                                    first: 'Trang đầu',
                                    itemsPerPage: 'vật tư / trang',
                                    last: 'Trang cuối',
                                    next: 'Trang sau',
                                    of: '/ {0}',
                                    page: 'Trang',
                                    previous: 'Trang trước'
                                },
                                pageSize: 5,
                                pageSizes: [5, 10, 20]
                            },
                            resizable: true
                        });
                    },
                    pageable: {
                        buttonCount: 3,
                        input: true,
                        messages: {
                            display: 'Đơn vị {0} - {1} / {2} đơn vị',
                            empty: 'Không có dữ liệu',
                            first: 'Trang đầu',
                            itemsPerPage: 'đơn vị / trang',
                            last: 'Trang cuối',
                            next: 'Trang sau',
                            of: '/ {0}',
                            page: 'Trang',
                            previous: 'Trang trước'
                        },
                        pageSize: 5,
                        pageSizes: [5, 10, 20]
                    },
                    resizable: true,
                    selectable: true,
                    sortable: { allowUnsort: false }
                });
            },
            pageable: {
                buttonCount: 3,
                input: true,
                messages: {
                    display: 'PO {0} - {1} / {2} PO',
                    empty: 'Không có dữ liệu',
                    first: 'Trang đầu',
                    itemsPerPage: 'PO / trang',
                    last: 'Trang cuối',
                    next: 'Trang sau',
                    of: '/ {0}',
                    page: 'Trang',
                    previous: 'Trang trước'
                },
                pageSize: 5,
                pageSizes: [5, 10, 20]
            },
            resizable: true,
            selectable: true
        }).data('kendoGrid');
    }
});