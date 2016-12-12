$(function () {
    kendo.culture('vi-VN');

    var selectedRow = null;
    var currentPage = null;
    var existChecked = false;

    var notification = $('#notification').kendoNotification().data('kendoNotification');

    var cboLoaiDM = $('#cboLoaiDM').kendoDropDownList({
        change: function (e) {
            hideAllGrid();
            switch (this.value()) {
                case "NT":
                    gvNhaThau.wrapper.show();
                    gvNhaThau.dataSource.read();
                    break;
                case "LVT":
                    gvLoaiVT.wrapper.show();
                    gvLoaiVT.dataSource.read();
                    break;
                case "VT":
                    gvVatTu.wrapper.show();
                    gvVatTu.dataSource.read();
                    break;
                case "DVT":
                    gvDVTinh.wrapper.show();
                    gvDVTinh.dataSource.read();
                    break;
                case "DVVT":
                    gvDonVi.wrapper.show();
                    gvDonVi.dataSource.read();
                    break;
                case "LDA":
                    gvLoaiDuAn.wrapper.show();
                    gvLoaiDuAn.dataSource.read();
                    break;
                case "DA":
                    gvDuAn.wrapper.show();
                    gvDuAn.dataSource.read();
                    break;
                case "LTT":
                    gvLoaiTienTrinh.wrapper.show();
                    gvLoaiTienTrinh.dataSource.read();
                    break;
            }
        },
        dataSource: {
            data: [
                { Text: "Nhà thầu", Value: 'NT' },
                { Text: "Loại vật tư", Value: 'LVT' },
                { Text: "Vật tư", Value: 'VT' },
                { Text: "Đơn vị tính", Value: 'DVT' },
                { Text: "Đơn vị Viễn thông", Value: 'DVVT' },
                { Text: "Loại dự án", Value: 'LDA' },
                { Text: "Dự án", Value: 'DA' },
                { Text: "Loại tiến trình", Value: 'LTT' }
            ]
        },
        dataTextField: 'Text',
        dataValueField: 'Value',
        optionLabel: 'Chọn loại danh mục...'
    }).data('kendoDropDownList');

    cboLoaiDM.wrapper.width(200);

    var gvNhaThau = $('#gvNhaThau').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ten', title: 'Tên', width: 200 },
            { field: 'TenTat', title: 'Tên Viết Tắt', width: 90 },
            { field: 'DiaChi', title: 'Địa Chỉ', width: 200 },
            { field: 'DienThoai', title: 'Điện Thoại', width: 100 },
            { field: 'Fax', width: 100 }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        if (e.response.d !== null) {
                            $.ajax({
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify({
                                    NhaThauID: e.response.d.Id,
                                    PageSize: this.pageSize()
                                }),
                                dataType: 'json',
                                type: 'POST',
                                url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaNhaThauMoi'
                            }).done(function (response) {
                                selectedRow = response.d[1];
                                if (gvNhaThau.dataSource.page() !== response.d[0])
                                    gvNhaThau.dataSource.page(response.d[0]);
                                else
                                    gvNhaThau.dataSource.read();
                            }).fail(function () {
                                alert('Lỗi đường truyền');
                            });
                        }
                        else {
                            gvNhaThau.cancelChanges();
                            $('#dlgDangNhap').data('kendoWindow').center().open();
                        }
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên nhà thầu' } } },
                        TenTat: { nullable: true },
                        DiaChi: { nullable: true },
                        DienThoai: {
                            nullable: true,
                            validation: {
                                checkDT: function (input) {
                                    if (input.attr('name') === 'DienThoai' && input.val().length < 8 && input.val().length > 0) {
                                        input.attr("data-checkDT-msg", "Số điện thoại không chính xác");
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        Fax: {
                            nullable: true,
                            validation: {
                                checkFax: function (input) {
                                    if (input.attr('name') === 'Fax' && input.val().length < 8 && input.val().length > 0) {
                                        input.attr("data-checkFax-msg", "Số fax không chính xác");
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else
                        return JSON.stringify({ NT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemNhaThau'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMNhaThau'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaNhaThau'
                }
            }
        },
        edit: function (e) {
            $(".k-edit-form-container").width(600).parent().data("kendoWindow").center();
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width('17%');
            e.container.find('.k-edit-field').width('75%');
            e.container.find('input').width('90%');
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Nhà Thầu' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var nhaThauId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        TenTat: e.model.TenTat,
                        NhaThauId: nhaThauId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckNhaThauExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input').first();
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Tên hoặc tên viết tắt của nhà thầu này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvNhaThau.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvLoaiVT = $('#gvLoaiVT').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'ID', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ma', title: 'Mã Loại Vật Tư', width: 250 },
            { field: 'Ten', title: 'Tên', width: 500 }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                LoaiVTID: e.response.d.ID,
                                PageSize: this.pageSize()
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaLoaiVTMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvLoaiVT.dataSource.page() !== response.d[0])
                                gvLoaiVT.dataSource.page(response.d[0]);
                            else
                                gvLoaiVT.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'ID',
                    fields: {
                        ID: { editable: false, type: 'number' },
                        Ma: { validation: { required: { message: 'Chưa nhập mã loại vật tư' } } },
                        Ten: { validation: { required: { message: 'Chưa nhập tên loại vật tư' } } }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else
                        return JSON.stringify({ LVT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemLoaiVT'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMLoaiVT'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaLoaiVT'
                }
            }
        },
        edit: function (e) {
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width('30%');
            e.container.find('.k-edit-field').width('60%');
            e.container.find('input').width('90%');
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Loại Vật Tư' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var loaiVatTuId = e.model.id === 0 ? 0 : e.model.ID;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        Ma: e.model.Ma,
                        LoaiVatTuId: loaiVatTuId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckLoaiVatTuExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input').first();
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Tên hoặc mã của loại vật tư này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvLoaiVT.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvVatTu = $('#gvVatTu').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { command: [{ name: 'destroy', text: 'Xóa' }], width: 90 },
            {
                attributes: { 'class': 'text-center' },
                field: 'IsNgungSuDung',
                sortable: false,
                title: 'Không Còn Sử Dụng',
                width: 150,
                template: '#if(IsNgungSuDung){#<input type="checkbox" disabled checked />#}else{#<input type="checkbox" disabled />#}#'
            },
            { field: 'Ma', title: 'Mã Vật Tư', width: 150 },
            { field: 'Ten', title: 'Tên', width: 350 },
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: {
                            schema: { data: 'd' },
                            transport: {
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetDSLoaiVT'
                                }
                            }
                        },
                        dataTextField: 'Ten',
                        dataValueField: 'ID',
                        optionLabel: 'Chọn loại vật tư...',
                        template: '#if (data.Ma !== undefined) {# <b>#= data.Ma #</b> - #= data.Ten # #} else {# #= data.Ten # #}#',
                        valueTemplate: '#if (data.Ma !== undefined) {# <b>#= data.Ma #</b> - #= data.Ten # #} else {# #= data.Ten # #}#'
                    });
                },
                field: 'Loai',
                sortable: false,
                title: 'Loại Vật Tư',
                width: 350,
                template: '<b>#= Loai.Ma #</b> - #= Loai.Ten #'

            },
            //bổ sung
            { field: 'TenTat', title: 'Tên Tắt', width: 150 },
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: {
                            schema: { data: 'd' },
                            transport: {
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetDSDonViTinh'
                                }
                            }
                        },
                        dataTextField: 'Ten',
                        dataValueField: 'Id',
                        optionLabel: 'Chọn đơn vị tính...'
                    });
                },
                field: 'DonViTinh',
                sortable: false,
                title: 'Đơn Vị Tính',
                width: 100,
                template: '#= DonViTinh.Ten #'
            },
            { field: 'GhiChu', title: 'Ghi Chú', width: 200 },
            //bổ sung
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: [
                            { Ten: "0.9 mm", Value_dk: "0.90" },
                            { Ten: "2.0 mm", Value_dk: "2.00" }
                        ],
                        dataTextField: 'Ten',
                        dataValueField: 'Value_dk',
                        optionLabel: 'Không có'
                    });
                },
                field: 'DuongKinh',
                sortable: false,
                title: 'Đường Kính',
                width: 100,
                template: '#= DuongKinh.Ten #'
            },
            //bổ sung
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: {
                            schema: { data: 'd' },
                            transport: {
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetDSDauNoi'
                                }
                            }
                        },
                        dataTextField: 'Ten',
                        dataValueField: 'Id',
                        optionLabel: 'Không có'
                        //optionLabel: {
                        //    Ten: 'Không có',
                        //    Id: 0
                        //}

                    });
                },
                field: 'DauNoi',
                sortable: false,
                title: 'Đầu Nối',
                width: 100,
                template: '#= DauNoi.Ten #'
            }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function (e) {
                if (e.xhr.responseJSON.Message.indexOf('In use') === 0) {
                    gvVatTu.cancelChanges();
                    alert('Vật tư này đang được sử dụng, không xóa được');
                }
                else {
                    if (e.xhr.responseJSON.Message.indexOf('Delete fail') === 0)
                        gvVatTu.cancelChanges();
                    alert(e.xhr.responseJSON.Message);
                }
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                VatTuID: e.response.d.Id,
                                MaVatTu: null,
                                TenVatTu: null,
                                PageSize: this.pageSize(),
                                SortBy: gvVatTu.dataSource._sort[0].field,
                                SortDir: gvVatTu.dataSource._sort[0].dir
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaVatTuMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvVatTu.dataSource.page() !== response.d[0])
                                gvVatTu.dataSource.page(response.d[0]);
                            else
                                gvVatTu.dataSource.read();
                        }).fail(function (jqXHR, textStatus) {

                            alert("Request failed: " + textStatus);
                        });
                    }
                    else if (e.type === 'destroy')
                        this.read();
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        IsNgungSuDung: { defaultValue: false, nullable: false, type: 'boolean' },
                        Ma: { nullable: false, validation: { required: { message: 'Chưa nhập mã vật tư' } } },
                        Ten: { validation: { required: { message: 'Chưa nhập tên vật tư' } } },
                        //bổ sung
                        TenTat: { nullable: true },
                        Loai: {
                            defaultValue: { Id: "-1", Ten: "" },
                            nullable: false,
                            validation: {
                                isSelectLoai: function (input) {
                                    if (input.attr('name') === 'Loai' && input.val() === '') {
                                        input.attr("data-isSelectLoai-msg", "Chưa chọn loại vật tư");
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        DonViTinh: {
                            defaultValue: { Id: -1, Ten: "" },
                            nullable: false,
                            validation: {
                                isSelectDVT: function (input) {
                                    if (input.attr('name') === 'DonViTinh.Ten' && input.val() === 'Chọn đơn vị tính...') {
                                        input.attr("data-isSelectDVT-msg", "Chưa chọn đơn vị tính");
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        GhiChu: { nullable: true },
                        //bổ sung 
                        DuongKinh: { nullable: false },
                        //bổ sung 
                        DauNoi: { nullable: false }
                    }
                },
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
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else if (operation === 'create') {
                        //data.Loai = { ID: data.Loai };
                        //data.DonViTinh = { Id: data.DonViTinh };

                        //bổ sung
                        data.DuongKinh = { Value_dk: data.DuongKinh };
                        //bổ sung

                        //if (data.DauNoi == "")
                        //    data.DauNoi = { Id: 0 };
                        //else {
                            data.DauNoi = { Id: data.DauNoi };
                        //}

                        return JSON.stringify({ VT: data });
                    }
                    else
                        return JSON.stringify({ VT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemVatTu'
                },
                destroy: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/XoaVatTu'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMVatTu'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaVatTu'
                }
            }
        },
        edit: function (e) {
            
            $(".k-edit-form-container").width(600).parent().data("kendoWindow").center();
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(137);
            e.container.find('.k-edit-field').width(415);
            e.container.find('input[type=text]').width(385);
            e.container.find('input[name=Loai]').data('kendoDropDownList').wrapper.width(395);
            e.container.find('input[name=DonViTinh]').data('kendoDropDownList').wrapper.width(395);

            e.container.find('input[name=Ma]').prop('disabled', true);

            if (e.model.isNew()) {
                e.container.find('input[type=checkbox]').prop('disabled', true);
                e.container.find('input[name=Ma]').prop('disabled', false);
            }
        },
        editable: {
            confirmation: 'Bạn chắc chắn muốn xóa?',
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Vật Tư' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20, 50, 100]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var vatTuId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        Ma: e.model.Ma,
                        VatTuId: vatTuId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckVatTuExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input').eq(1);
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Mã vật tư này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvVatTu.saveRow();
                    }
                }).fail(function (jqXHR, textStatus) {
                    
                    alert("Request failed: " + textStatus);
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        sortable: { allowUnsort: false },
        toolbar: kendo.template($('#vatTuToolbarTemplate').html())
    }).data('kendoGrid');

    var cboSearchBy = $('#cboSearchBy').kendoDropDownList({
        dataSource: {
            data: ['Mã vật tư', 'Tên vật tư']
        }
    }).data('kendoDropDownList');

    $('#forCboSearchBy').click(function () {
        cboSearchBy.open();
    });

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        //searchVatTu();
        filterVatTu();
    });

    $('#btnClear').click(function (e) {
        e.preventDefault();
        $('#txtSearchValue').val('');
        //searchVatTu();
        filterVatTu();
    });

    $('#txtSearchValue').keydown(function (e) {
        if (e.which === 13)
            filterVatTu();
        //searchVatTu();
    });

    var gvDVTinh = $('#gvDVTinh').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ten', title: 'Tên' }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 10,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                DonViTinhId: e.response.d.Id,
                                PageSize: this.pageSize()
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaDVTinhMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvDVTinh.dataSource.page() !== response.d[0])
                                gvDVTinh.dataSource.page(response.d[0]);
                            else
                                gvDVTinh.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên đơn vị tính' } } }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else
                        return JSON.stringify({ DVT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemDVTinh'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMDVTinh'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaDVTinh'
                }
            }
        },
        edit: function (e) {
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(60);
            e.container.find('.k-edit-field').width(300);
            e.container.find('input').width(280);
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Đơn Vị Tính' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 10,
            pageSizes: [5, 10, 20]
        },
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var donViTinhId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        DonViTinhId: donViTinhId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckDonViTinhExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input');
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Đơn vị tính này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvDVTinh.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvDonVi = $('#gvDonVi').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'ID', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ten', title: 'Tên', width: 200 },
            { field: 'TenTat', title: 'Tên Viết Tắt', width: 110 },
            { field: 'LoaiDonVi', title: 'Loại Đơn Vị', width: 120 },
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: {
                            schema: { data: 'd' },
                            transport: {
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetDSTinh'
                                }
                            }
                        },
                        dataTextField: 'TenTinh',
                        dataValueField: 'ID',
                        optionLabel: 'Chọn tỉnh thành...'
                    });
                },
                field: 'Tinh',
                title: 'Tỉnh Thành',
                width: 150,
                template: '#= Tinh.TenTinh #'
            },
            { field: 'DiaChiGiaoDich', title: 'Địa Chỉ Giao Dịch', width: 300 },
            { field: 'DiaChiGiaoNhan', title: 'Địa Chỉ Giao Nhận', width: 300 },
            { field: 'MaSoThue', title: 'Mã Số Thuế', width: 160 },
            { field: 'DauMoiLienHe', title: 'Đầu Mối Liên Hệ', width: 170 },
            { field: 'NguoiDaiDien', title: 'Người Đại Diện', width: 160 }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                DonViVTID: e.response.d.ID,
                                PageSize: this.pageSize()
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaDonViVTMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvDonVi.dataSource.page() !== response.d[0])
                                gvDonVi.dataSource.page(response.d[0]);
                            else
                                gvDonVi.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'ID',
                    fields: {
                        ID: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên đơn vị' } } },
                        TenTat: { validation: { required: { message: 'Chưa nhập tên viết tắt' } } },
                        LoaiDonVi: { nullable: true },
                        Tinh: {
                            nullable: false,
                            validation: {
                                isSelectTinh: function (input) {
                                    if (input.attr('name') === 'Tinh' && input.val() === '') {
                                        input.attr('data-isSelectTinh-msg', 'Chưa chọn tỉnh thành');
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        DiaChiGiaoDich: { nullable: true },
                        DiaChiGiaoNhan: { nullable: true },
                        MaSoThue: { nullable: true },
                        DauMoiLienHe: { nullable: true },
                        NguoiDaiDien: { nullable: true }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else if (operation === 'update')
                        return JSON.stringify({ DV: data });
                    else {
                        data.Tinh = { ID: data.Tinh };
                        return JSON.stringify({ DV: data });
                    }
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemDonViVT'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMDonViVT'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaDonViVT'
                }
            }
        },
        edit: function (e) {
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(140);
            e.container.find('.k-edit-field').width(220);
            e.container.find('input').width(200);
            e.container.find('input[name=Tinh]').data('kendoDropDownList').wrapper.width(210);
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Đơn Vị Viễn Thông' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var donViVTId = e.model.id === 0 ? 0 : e.model.ID;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        TenTat: e.model.TenTat,
                        DonViVTId: donViVTId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckDonViVienThongExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input').first();
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Tên hoặc tên viết tắt của đơn vị viễn thông này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvDonVi.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvLoaiDuAn = $('#gvLoaiDuAn').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ten', title: 'Loại Dự Án' }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                LoaiDuAnID: e.response.d.Id,
                                PageSize: this.pageSize()
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaLoaiDuAnMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvLoaiDuAn.dataSource.page() !== response.d[0])
                                gvLoaiDuAn.dataSource.page(response.d[0]);
                            else
                                gvLoaiDuAn.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên loại dự án' } } }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else
                        return JSON.stringify({ LDA: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemLoaiDuAn'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMLoaiDuAn'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaLoaiDuAn'
                }
            }
        },
        edit: function (e) {
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(80);
            e.container.find('.k-edit-field').width(280);
            e.container.find('input').width(260);
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Loại Dự Án' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var loaiDuAnId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        LoaiDuAnId: loaiDuAnId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckLoaiDuAnExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input');
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Loại dự án này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvLoaiDuAn.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvDuAn = $('#gvDuAn').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'MaDuAn', title: 'Mã Dự Án', width: 150 },
            { field: 'TenDuAn', title: 'Tên Dự Án', width: 300 },
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDropDownList({
                        dataSource: {
                            schema: { data: 'd' },
                            transport: {
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetDSLoaiDuAn'
                                }
                            }
                        },
                        dataTextField: 'Ten',
                        dataValueField: 'Id',
                        optionLabel: 'Chọn loại dự án...'
                    });
                },
                field: 'Loai',
                title: 'Loại Dự Án',
                width: 150,
                template: '#= Loai.Ten #'
            },
            { field: 'SoQDDT', title: 'Số quyết định đầu tư', width: 200 },
            {
                editor: function (container, options) {
                    $('<input name="' + options.field + '" />').appendTo(container).kendoDatePicker({
                        min: new Date(2000, 0, 1),
                        value: new Date()
                    });
                },
                field: 'NgayQDDT',
                title: 'Ngày quyết định đầu tư',
                width: 180
            }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                DuAnID: e.response.d.Id,
                                PageSize: this.pageSize()
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaDuAnMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvDuAn.dataSource.page() !== response.d[0])
                                gvDuAn.dataSource.page(response.d[0]);
                            else
                                gvDuAn.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        MaDuAn: { nullable: true },
                        TenDuAn: { validation: { required: { message: 'Chưa nhập tên dự án' } } },
                        Loai: {
                            nullable: false,
                            validation: {
                                isSelectLoai: function (input) {
                                    if (input.attr('name') === 'Loai' && input.val() === '') {
                                        input.attr("data-isSelectLoai-msg", "Chưa chọn loại dự án");
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        },
                        SoQDDT: { nullable: true },
                        NgayQDDT: { nullable: true }
                    }
                },
                total: 'd.Total'
            },
            serverPaging: true,
            transport: {
                parameterMap: function (data, operation) {
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else if (operation === 'create') {
                        data.Loai = { Id: data.Loai };
                        return JSON.stringify({ DA: data });
                    }
                    else {
                        delete data.NgayQDDTData;
                        return JSON.stringify({ DA: data });
                    }
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemDuAn'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMDuAn'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaDuAn'
                }
            }
        },
        edit: function (e) {
            $(".k-edit-form-container").width(600).parent().data("kendoWindow").center();
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(150);
            e.container.find('.k-edit-field').width(402);
            e.container.find('input').width(382);
            e.container.find('input[name=Loai]').data('kendoDropDownList').wrapper.width(392);
            e.container.find('input[name=NgayQDDT]').data('kendoDatePicker').wrapper.width(392);
            e.container.find('input[name=NgayQDDT]').prop('readonly', true);
            e.container.find('input[name=NgayQDDT]').focus(function (e) {
                $(this).data('kendoDatePicker').open();
            });
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Dự Án' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var duAnId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.TenDuAn,
                        Ma: e.model.MaDuAn,
                        DuAnId: duAnId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckDuAnExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input').first();
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="TenDuAn" role="alert"><span class="k-icon k-warning"> </span>Tên hoặc mã dự án này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvDuAn.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else {
                existChecked = false;
                var ngay = e.model.NgayQDDT;
                if (ngay !== null) {
                    var d = ngay.getDate() < 10 ? '0' + ngay.getDate() : ngay.getDate().toString();
                    var m = ngay.getMonth() < 9 ? '0' + (ngay.getMonth() + 1) : (ngay.getMonth() + 1).toString();
                    e.model.NgayQDDT = d + '/' + m + '/' + ngay.getFullYear();
                }
            }
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var gvLoaiTienTrinh = $('#gvLoaiTienTrinh').kendoGrid({
        autoBind: false,
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            { field: 'Ten', title: 'Loại Tiến Trình' }
        ],
        dataBound: function () {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
        },
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            pageSize: 5,
            requestEnd: function (e) {
                if (e.response) {
                    if (e.type === 'create') {
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                LoaiTienTrinhId: e.response.d.Id,
                                PageSize: this.pageSize(),
                                SortBy: gvLoaiTienTrinh.dataSource._sort[0].field,
                                SortDir: gvLoaiTienTrinh.dataSource._sort[0].dir
                            }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaLoaiTienTrinhMoi'
                        }).done(function (response) {
                            selectedRow = response.d[1];
                            if (gvLoaiTienTrinh.dataSource.page() !== response.d[0])
                                gvLoaiTienTrinh.dataSource.page(response.d[0]);
                            else
                                gvLoaiTienTrinh.dataSource.read();
                        }).fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    }
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên loại tiến trình' } } }
                    }
                },
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
                    if (operation === 'read')
                        return JSON.stringify(data);
                    else
                        return JSON.stringify({ LTT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/ThemLoaiTienTrinh'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/GetDMLoaiTienTrinh'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/SuaLoaiTienTrinh'
                }
            }
        },
        edit: function (e) {
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label').width(100);
            e.container.find('.k-edit-field').width(260);
            e.container.find('input').width(240);
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Loại Tiến Trình' }
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,
        save: function (e) {
            if (!existChecked) {
                e.preventDefault();
                var loaiTienTrinhId = e.model.id === 0 ? 0 : e.model.Id;
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        Ten: e.model.Ten,
                        LoaiTienTrinhId: loaiTienTrinhId
                    }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'QuanTriDanhMuc.aspx/CheckLoaiTienTrinhExist'
                }).done(function (response) {
                    if (response.d) {
                        var input = e.container.find('input');
                        $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: block;" data-for="Ten" role="alert"><span class="k-icon k-warning"> </span>Loại tiến trình này đã tồn tại<div class="k-callout k-callout-n"></div></div>').appendTo(input.parent());
                        setTimeout(function () { $('.k-widget.k-tooltip').hide(); }, 4000);
                    }
                    else {
                        existChecked = true;
                        gvLoaiTienTrinh.saveRow();
                    }
                }).fail(function () {
                    alert('Lỗi đường truyền');
                });
            }
            else
                existChecked = false;
        },
        selectable: true,
        sortable: { allowUnsort: false },
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    hideAllGrid();

    function hideAllGrid() {
        gvNhaThau.wrapper.hide();
        gvLoaiVT.wrapper.hide();
        gvVatTu.wrapper.hide();
        gvDVTinh.wrapper.hide();
        gvDonVi.wrapper.hide();
        gvLoaiDuAn.wrapper.hide();
        gvDuAn.wrapper.hide();
        gvLoaiTienTrinh.wrapper.hide();
    }

    //function searchVatTu() {
    //    if (cboSearchBy.text() === 'Mã vật tư') {
    //        if ($('#txtSearchValue').val().trim() !== '') {
    //            var currentIndex = -1;
    //            var row = gvVatTu.select();
    //            if (row.length > 0) {
    //                if (gvVatTu.dataItem(row).Ma.toLowerCase().indexOf($('#txtSearchValue').val().trim().toLowerCase()) >= 0)
    //                    currentIndex = (gvVatTu.dataSource.page() - 1) * gvVatTu.dataSource.pageSize() + row.index() + 1;
    //            }
    //            $.ajax({
    //                contentType: 'application/json; charset=utf-8',
    //                data: JSON.stringify({
    //                    MaVatTu: $('#txtSearchValue').val().trim(),
    //                    CurrentIndex: currentIndex,
    //                    PageSize: gvVatTu.dataSource.pageSize(),
    //                    SortBy: gvVatTu.dataSource._sort[0].field,
    //                    SortDir: gvVatTu.dataSource._sort[0].dir
    //                }),
    //                dataType: 'json',
    //                type: 'POST',
    //                url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaMaVatTu'
    //            }).done(function (response) {
    //                if (response.d.length > 0) {
    //                    if (gvVatTu.dataSource.page() !== response.d[0]) {
    //                        gvVatTu.dataSource.page(response.d[0]);
    //                        selectedRow = response.d[1];
    //                    }
    //                    else
    //                        gvVatTu.select('#gvVatTu tr:eq(' + response.d[1] + ')');
    //                }
    //                else {
    //                    setNotificationPosition(notification, getBottom($('#txtSearchValue')) + 7, getRight($('#btnSearch')), null, null);
    //                    notification.warning('Không tìm thấy mã vật tư <b>' + $('#txtSearchValue').val().trim() + '</b>');
    //                }
    //            }).fail(function () {
    //                alert('Lỗi đường truyền');
    //            });
    //        }
    //        else {
    //            setNotificationPosition(notification, getBottom($('#txtSearchValue')) + 7, getRight($('#btnSearch')), null, null);
    //            notification.warning('Chưa nhập mã vật tư');
    //        }
    //    }
    //    else {
    //        if ($('#txtSearchValue').val().trim() !== '') {
    //            var currentIndex = -1;
    //            var row = gvVatTu.select();
    //            if (row.length > 0) {
    //                if (gvVatTu.dataItem(row).Ten.toLowerCase().indexOf($('#txtSearchValue').val().trim().toLowerCase()) >= 0)
    //                    currentIndex = (gvVatTu.dataSource.page() - 1) * gvVatTu.dataSource.pageSize() + row.index() + 1;
    //            }
    //            $.ajax({
    //                contentType: 'application/json; charset=utf-8',
    //                data: JSON.stringify({
    //                    TenVatTu: $('#txtSearchValue').val().trim(),
    //                    CurrentIndex: currentIndex,
    //                    PageSize: gvVatTu.dataSource.pageSize(),
    //                    SortBy: gvVatTu.dataSource._sort[0].field,
    //                    SortDir: gvVatTu.dataSource._sort[0].dir
    //                }),
    //                dataType: 'json',
    //                type: 'POST',
    //                url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaTenVatTu'
    //            }).done(function (response) {
    //                if (response.d.length > 0) {
    //                    if (gvVatTu.dataSource.page() !== response.d[0]) {
    //                        gvVatTu.dataSource.page(response.d[0]);
    //                        selectedRow = response.d[1];
    //                    }
    //                    else
    //                        gvVatTu.select('#gvVatTu tr:eq(' + response.d[1] + ')');
    //                }
    //                else {
    //                    setNotificationPosition(notification, getBottom($('#txtSearchValue')) + 7, getRight($('#btnSearch')), null, null);
    //                    notification.warning('Không tìm thấy tên vật tư <b>' + $('#txtSearchValue').val().trim() + '</b>');
    //                }
    //            }).fail(function () {
    //                alert('Lỗi đường truyền');
    //            });
    //        }
    //        else {
    //            setNotificationPosition(notification, getBottom($('#txtSearchValue')) + 7, getRight($('#btnSearch')), null, null);
    //            notification.warning('Chưa nhập tên vật tư');
    //        }
    //    }
    //}

    function filterVatTu() {
        var ds, currentPageSize = gvVatTu.dataSource.pageSize();

        if ($('#txtSearchValue').val().trim() !== '') {
            if (cboSearchBy.text() === 'Mã vật tư') {
                ds = new kendo.data.DataSource({
                    error: function (e) {
                        if (e.xhr.responseJSON.Message.indexOf('In use') === 0) {
                            gvVatTu.cancelChanges();
                            alert('Vật tư này đang được sử dụng, không xóa được');
                        }
                        else {
                            if (e.xhr.responseJSON.Message.indexOf('Delete fail') === 0)
                                gvVatTu.cancelChanges();
                            alert('Lỗi đường truyền');
                        }
                    },
                    pageSize: currentPageSize,
                    requestEnd: function (e) {
                        if (e.response) {
                            if (e.type === 'create') {
                                $.ajax({
                                    contentType: 'application/json; charset=utf-8',
                                    data: JSON.stringify({
                                        VatTuID: e.response.d.Id,
                                        MaVatTu: $('#txtSearchValue').val().trim(),
                                        TenVatTu: null,
                                        PageSize: this.pageSize(),
                                        SortBy: gvVatTu.dataSource._sort[0].field,
                                        SortDir: gvVatTu.dataSource._sort[0].dir
                                    }),
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaVatTuMoi'
                                }).done(function (response) {
                                    selectedRow = response.d[1];
                                    if (gvVatTu.dataSource.page() !== response.d[0])
                                        gvVatTu.dataSource.page(response.d[0]);
                                    else
                                        gvVatTu.dataSource.read();
                                }).fail(function () {
                                    alert('Lỗi đường truyền');
                                });
                            }
                            else if (e.type === 'destroy')
                                this.read();
                        }
                    },
                    schema: {
                        data: 'd.Data',
                        model: {
                            id: 'Id',
                            fields: {
                                Id: { editable: false, type: 'number' },
                                IsNgungSuDung: { defaultValue: false, nullable: false, type: 'boolean' },
                                Ma: { nullable: false, validation: { required: { message: 'Chưa nhập mã vật tư' } } },
                                Ten: { validation: { required: { message: 'Chưa nhập tên vật tư' } } },
                                //bổ sung
                                TenTat: { nullable: true },
                                Loai: {
                                    defaultValue: { Id: "-1", Ten: "" },
                                    nullable: false,
                                    validation: {
                                        isSelectLoai: function (input) {
                                            if (input.attr('name') === 'Loai' && input.val() === '') {
                                                input.attr("data-isSelectLoai-msg", "Chưa chọn loại vật tư");
                                                return false;
                                            }
                                            return true;
                                        }
                                    }
                                },
                                DonViTinh: {
                                    defaultValue: { Id: -1, Ten: "" },
                                    nullable: false,
                                    validation: {
                                        isSelectDVT: function (input) {
                                            if (input.attr('name') === 'DonViTinh' && input.val() === 'Chọn đơn vị tính...') {
                                                input.attr("data-isSelectDVT-msg", "Chưa chọn đơn vị tính");
                                                return false;
                                            }
                                            return true;
                                        }
                                    }
                                },
                                GhiChu: { nullable: true },
                                //bổ sung
                                DuongKinh: { nullable: false },
                                DauNoi: { nullable: false }
                            }
                        },
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
                            if (operation === 'read')
                                return JSON.stringify(data);
                            else if (operation === 'create') {
                                //data.Loai = { ID: data.Loai };
                                //data.DonViTinh = { Id: data.DonViTinh };
                                //bổ sung
                                data.DuongKinh = { Value_dk: data.DuongKinh };
                                data.DauNoi = { Id: data.DauNoi };

                                return JSON.stringify({ VT: data });
                            }
                            else
                                return JSON.stringify({ VT: data });
                        },
                        create: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/ThemVatTu'
                        },
                        destroy: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/XoaVatTu'
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            data: { MaVatTu: $('#txtSearchValue').val().trim() },
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetDMVatTuByMaVT'
                        },
                        update: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/SuaVatTu'
                        }
                    }
                });
            }
            else {
                ds = new kendo.data.DataSource({
                    error: function (e) {
                        if (e.xhr.responseJSON.Message.indexOf('In use') === 0) {
                            gvVatTu.cancelChanges();
                            alert('Vật tư này đang được sử dụng, không xóa được');
                        }
                        else {
                            if (e.xhr.responseJSON.Message.indexOf('Delete fail') === 0)
                                gvVatTu.cancelChanges();
                            alert('Lỗi đường truyền');
                        }
                    },
                    pageSize: currentPageSize,
                    requestEnd: function (e) {
                        if (e.response) {
                            if (e.type === 'create') {
                                $.ajax({
                                    contentType: 'application/json; charset=utf-8',
                                    data: JSON.stringify({
                                        VatTuID: e.response.d.Id,
                                        MaVatTu: null,
                                        TenVatTu: $('#txtSearchValue').val().trim(),
                                        PageSize: this.pageSize(),
                                        SortBy: gvVatTu.dataSource._sort[0].field,
                                        SortDir: gvVatTu.dataSource._sort[0].dir
                                    }),
                                    dataType: 'json',
                                    type: 'POST',
                                    url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaVatTuMoi'
                                }).done(function (response) {
                                    selectedRow = response.d[1];
                                    if (gvVatTu.dataSource.page() !== response.d[0])
                                        gvVatTu.dataSource.page(response.d[0]);
                                    else
                                        gvVatTu.dataSource.read();
                                }).fail(function () {
                                    alert('Lỗi đường truyền');
                                });
                            }
                            else if (e.type === 'destroy')
                                this.read();
                        }
                    },
                    schema: {
                        data: 'd.Data',
                        model: {
                            id: 'Id',
                            fields: {
                                Id: { editable: false, type: 'number' },
                                IsNgungSuDung: { defaultValue: false, nullable: false, type: 'boolean' },
                                Ma: { nullable: false, validation: { required: { message: 'Chưa nhập mã vật tư' } } },
                                Ten: { validation: { required: { message: 'Chưa nhập tên vật tư' } } },
                                //bổ sung
                                TenTat: { nullable: true },
                                Loai: {
                                    defaultValue: { Id: "-1", Ten: "" },
                                    nullable: false,
                                    validation: {
                                        isSelectLoai: function (input) {
                                            if (input.attr('name') === 'Loai' && input.val() === '') {
                                                input.attr("data-isSelectLoai-msg", "Chưa chọn loại vật tư");
                                                return false;
                                            }
                                            return true;
                                        }
                                    }
                                },
                                DonViTinh: {
                                    defaultValue: { Id: -1, Ten: "" },
                                    nullable: false,
                                    validation: {
                                        isSelectDVT: function (input) {
                                            if (input.attr('name') === 'DonViTinh' && input.val() === 'Chọn đơn vị tính...') {
                                                input.attr("data-isSelectDVT-msg", "Chưa chọn đơn vị tính");
                                                return false;
                                            }
                                            return true;
                                        }
                                    }
                                },
                                GhiChu: { nullable: true },
                                //bổ sung
                                DuongKinh: { nullable: false },
                                DauNoi: { nullable: false }
                            }
                        },
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
                            if (operation === 'read')
                                return JSON.stringify(data);
                            else if (operation === 'create') {
                                //data.Loai = { ID: data.Loai };
                                //data.DonViTinh = { Id: data.DonViTinh };
                                //bổ sung
                                data.DuongKinh = { Value_dk: data.DuongKinh };
                                data.DauNoi = { Id: data.DauNoi };
                                return JSON.stringify({ VT: data });
                            }
                            else
                                return JSON.stringify({ VT: data });
                        },
                        create: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/ThemVatTu'
                        },
                        destroy: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/XoaVatTu'
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            data: { TenVatTu: $('#txtSearchValue').val().trim() },
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/GetDMVatTuByTenVT'
                        },
                        update: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: 'QuanTriDanhMuc.aspx/SuaVatTu'
                        }
                    }
                });
            }
        }
        else {
            ds = new kendo.data.DataSource({
                error: function (e) {
                    if (e.xhr.responseJSON.Message.indexOf('In use') === 0) {
                        gvVatTu.cancelChanges();
                        alert('Vật tư này đang được sử dụng, không xóa được');
                    }
                    else {
                        if (e.xhr.responseJSON.Message.indexOf('Delete fail') === 0)
                            gvVatTu.cancelChanges();
                        alert('Lỗi đường truyền');
                    }
                },
                pageSize: currentPageSize,
                requestEnd: function (e) {
                    if (e.response) {
                        if (e.type === 'create') {
                            $.ajax({
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify({
                                    VatTuID: e.response.d.Id,
                                    MaVatTu: null,
                                    TenVatTu: null,
                                    PageSize: this.pageSize(),
                                    SortBy: gvVatTu.dataSource._sort[0].field,
                                    SortDir: gvVatTu.dataSource._sort[0].dir
                                }),
                                dataType: 'json',
                                type: 'POST',
                                url: 'QuanTriDanhMuc.aspx/GetPageNumberCuaVatTuMoi'
                            }).done(function (response) {
                                selectedRow = response.d[1];
                                if (gvVatTu.dataSource.page() !== response.d[0])
                                    gvVatTu.dataSource.page(response.d[0]);
                                else
                                    gvVatTu.dataSource.read();
                            }).fail(function () {
                                alert('Lỗi đường truyền');
                            });
                        }
                        else if (e.type === 'destroy')
                            this.read();
                    }
                },
                schema: {
                    data: 'd.Data',
                    model: {
                        id: 'Id',
                        fields: {
                            Id: { editable: false, type: 'number' },
                            IsNgungSuDung: { defaultValue: false, nullable: false, type: 'boolean' },
                            Ma: { nullable: false, validation: { required: { message: 'Chưa nhập mã vật tư' } } },
                            Ten: { validation: { required: { message: 'Chưa nhập tên vật tư' } } },
                            //bổ sung
                            TenTat: { nullable: true },
                            Loai: {
                                defaultValue: { Id: "-1", Ten: "" },
                                nullable: false,
                                validation: {
                                    isSelectLoai: function (input) {
                                        if (input.attr('name') === 'Loai' && input.val() === '') {
                                            input.attr("data-isSelectLoai-msg", "Chưa chọn loại vật tư");
                                            return false;
                                        }
                                        return true;
                                    }
                                }
                            },
                            DonViTinh: {
                                defaultValue: { Id: -1, Ten: "" },
                                nullable: false,
                                validation: {
                                    isSelectDVT: function (input) {
                                        if (input.attr('name') === 'DonViTinh' && input.val() === 'Chọn đơn vị tính...') {
                                            input.attr("data-isSelectDVT-msg", "Chưa chọn đơn vị tính");
                                            return false;
                                        }
                                        return true;
                                    }
                                }
                            },
                            GhiChu: { nullable: true },
                            //bổ sung
                            DuongKinh: { nullable: false },
                            DauNoi: { nullable: false }
                        }
                    },
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
                        if (operation === 'read')
                            return JSON.stringify(data);
                        else if (operation === 'create') {
                            //data.Loai = { ID: data.Loai };
                            //data.DonViTinh = { Id: data.DonViTinh };
                            //bổ sung
                            data.DuongKinh = { Value_dk: data.DuongKinh };
                            data.DauNoi = { Id: data.DauNoi };
                            return JSON.stringify({ VT: data });
                        }
                        else
                            return JSON.stringify({ VT: data });
                    },
                    create: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: 'QuanTriDanhMuc.aspx/ThemVatTu'
                    },
                    destroy: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: 'QuanTriDanhMuc.aspx/XoaVatTu'
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: 'QuanTriDanhMuc.aspx/GetDMVatTu'
                    },
                    update: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: 'QuanTriDanhMuc.aspx/SuaVatTu'
                    }
                }
            });
        }

        gvVatTu.setDataSource(ds);
        ds.read();
    }
});
