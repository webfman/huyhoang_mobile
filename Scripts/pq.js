$(function () {
    var selectedRow = null;
    var currentPage = null;
    var mouseX, mouseY;
    var dsIdQuyenBanDau = [];
    var vaiTroId = null;
    var emailPattern = /^[a-zA-Z][a-zA-Z0-9_.-]*@[a-zA-Z][a-zA-Z0-9_-]*\.[a-zA-Z][a-zA-Z0-9]*/;

    $(document).mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    var notification = $('#notification').kendoNotification({
        autoHideAfter: 3000,
        show: function (e) {
            e.element.parent().css('left', mouseX - (e.element.parent().width() / 2) + 10);
            e.element.parent().css('top', mouseY + 25);
        }
    }).data('kendoNotification');

    var gvVaiTro = $('#gvVaiTro').kendoGrid({
        columnResizeHandleWidth: 6,
        columns: [
            { field: 'Id', hidden: true },
            { command: [{ name: 'edit', text: 'Sửa' }], width: 90 },
            {
                command: [{
                    name: 'capQuyen',
                    text: '&nbsp;&nbsp;Cấp quyền',
                    click: function (e) {
                        e.preventDefault();
                        //if (this.dataItem($(e.target).closest('tr')).Ten === 'Administrator') {
                        //    notification.warning('Không được chỉnh sửa vai trò này');
                        //    return;
                        //}
                        dsIdQuyenBanDau = [];
                        var tr = $(e.target).closest("tr");
                        vaiTroId = this.dataItem(tr).Id;
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ 'VaiTroId': vaiTroId }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'PhanQuyen.aspx/GetDSQuyenCuaVaiTro'
                        })
                        .done(function (response) {
                            var ds = new kendo.data.DataSource({ data: response.d });
                            for (var i = 0; i < response.d.length; i++)
                                dsIdQuyenBanDau.push(response.d[i].Id);
                            lvwQuyenDaChon.setDataSource(ds);
                            $.ajax({
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify({ 'VaiTroId': vaiTroId }),
                                dataType: 'json',
                                type: 'POST',
                                url: 'PhanQuyen.aspx/GetQuyenChuaCapChoVaiTro'
                            })
                            .done(function (response2) {
                                var ds = new kendo.data.DataSource({ data: response2.d });
                                lvwDSQuyen.setDataSource(ds);
                                ds.read();
                            })
                            .fail(function () {
                                alert('Lỗi đường truyền');
                            });
                        })
                        .fail(function () {
                            alert('Lỗi đường truyền');
                        });
                    },
                    iconClass: 'fa fa-key'
                }],
                width: 130
            },
            { field: 'Ten', title: 'Tên Vai Trò', width: 110 },
            { field: 'TenDayDu', title: 'Chú Thích', width: 200 },
            {
                attributes: { 'class': 'text-center' },
                field: 'LaNhaThau',
                title: 'Là Nhà Thầu',
                width: 100,
                template: '#if(LaNhaThau){#<input type="checkbox" disabled checked />#}else{#<input type="checkbox" disabled />#}#'
            },
            { field: 'TenDonVi', title: 'Đơn Vị', width: 250 },
            { field: 'DonViId', hidden: true }
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
                if (e.response && e.type === 'create') {
                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({
                            VaiTroID: e.response.d.Id,
                            PageSize: this.pageSize()
                        }),
                        dataType: 'json',
                        type: 'POST',
                        url: 'PhanQuyen.aspx/GetPageNumberCuaVaiTroMoi'
                    }).done(function (response) {
                        gvVaiTro.dataSource.page(response.d[0]);
                        selectedRow = response.d[1];
                    }).fail(function () {
                        alert('Lỗi đường truyền');
                    });
                }
            },
            schema: {
                data: 'd.Data',
                model: {
                    id: 'Id',
                    fields: {
                        Id: { editable: false, type: 'number' },
                        Ten: { validation: { required: { message: 'Chưa nhập tên vai trò' } } },
                        TenDayDu: { validation: { required: { message: 'Chưa nhập chú thích cho vai trò' } } },
                        LaNhaThau: { defaultValue: false, nullable: false, type: 'boolean' },
                        TenDonVi: { nullable: true },
                        DonViId: { nullable: true, type: 'number' }
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
                        return JSON.stringify({ VT: data });
                },
                create: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/ThemVaiTro'
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDSVaiTro'
                },
                update: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/SuaVaiTro'
                }
            }
        },
        edit: function (e) {
            //if (e.container.find('input[name=Ten]').val() === 'Administrator') {
            //    e.container.data('kendoWindow').close();
            //    notification.warning('Không được chỉnh sửa vai trò này');
            //    return;
            //}
            $(".k-edit-form-container").width(600).parent().data("kendoWindow").center();
            e.container.find('.k-edit-label:first,.k-edit-field:first').hide();
            e.container.find('.k-edit-label:last,.k-edit-field:last').hide();
            e.container.find('.k-edit-label').width('17%');
            e.container.find('.k-edit-field').width('75%');
            e.container.find('input[type=text]').width('85%');
            var val = e.container.find('input[name=TenDonVi]').val().trim();
            var parent = e.container.find('input[name=TenDonVi]').parent();
            e.container.find('input[name=TenDonVi]').remove();
            if (e.model.isNew() || e.container.find('input[type=checkbox]').is(':checked')) {
                var cboNhaThau = $('<input id="NhaThau" style="width:95%" />').appendTo(parent).kendoDropDownList({
                    dataBound: function () {
                        if (e.container.find('input[type=checkbox]').is(':checked') && val !== '') {
                            this.select(function (dataItem) {
                                return dataItem.Ten === val;
                            });
                        }
                    },
                    dataSource: {
                        error: function () {
                            alert('Lỗi đường truyền');
                        },
                        schema: { data: 'd' },
                        transport: {
                            read: {
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json',
                                type: 'POST',
                                url: 'PhanQuyen.aspx/GetDSNhaThau'
                            }
                        }
                    },
                    dataTextField: 'Ten',
                    dataValueField: 'Id',
                    optionLabel: 'Chọn nhà thầu...'
                }).data('kendoDropDownList');
                $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;" data-for="NhaThau" role="alert"><span class="k-icon k-warning"> </span>Chưa chọn nhà thầu<div class="k-callout k-callout-n"></div></div>').appendTo(parent);
            }
            if (e.model.isNew() || !e.container.find('input[type=checkbox]').is(':checked')) {
                var cboDonVi = $('<input id="DonVi" style="width:95%" />').appendTo(parent).kendoDropDownList({
                    dataBound: function () {
                        if (!e.container.find('input[type=checkbox]').is(':checked') && val !== '') {
                            this.select(function (dataItem) {
                                return dataItem.Ten === val;
                            });
                        }
                    },
                    dataSource: {
                        error: function () {
                            alert('Lỗi đường truyền');
                        },
                        schema: { data: 'd' },
                        transport: {
                            read: {
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json',
                                type: 'POST',
                                url: 'PhanQuyen.aspx/GetDSDonVi'
                            }
                        }
                    },
                    dataTextField: 'Ten',
                    dataValueField: 'ID',
                    optionLabel: 'Chọn đơn vị...'
                }).data('kendoDropDownList');
                $('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;" data-for="DonVi" role="alert"><span class="k-icon k-warning"> </span>Chưa chọn đơn vị<div class="k-callout k-callout-n"></div></div>').appendTo(parent);
            }
            if (e.model.isNew()) {
                cboNhaThau.wrapper.hide();
                e.container.find('input[type=checkbox]').change(function () {
                    if ($(this).is(':checked')) {
                        $('input#NhaThau').data('kendoDropDownList').wrapper.show();
                        $('input#DonVi').data('kendoDropDownList').wrapper.hide();
                    }
                    else {
                        $('input#NhaThau').data('kendoDropDownList').wrapper.hide();
                        $('input#DonVi').data('kendoDropDownList').wrapper.show();
                    }
                });
            }
            else
                e.container.find('input[type=checkbox]').prop('disabled', true);
        },
        editable: {
            mode: 'popup',
            window: { resizable: false, title: 'Thông Tin Vai Trò' }
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
            var tenDV, donViId;
            if (e.model.LaNhaThau) {
                if (e.container.find('input#NhaThau').data('kendoDropDownList').value() === '') {
                    e.preventDefault();
                    e.container.find('input#NhaThau').data('kendoDropDownList').wrapper.next().show();
                    setTimeout(function () {
                        e.container.find('input#NhaThau').data('kendoDropDownList').wrapper.next().hide();
                    }, 2000);
                    return;
                }
                tenDV = e.container.find('input#NhaThau').data('kendoDropDownList').text();
                donViId = e.container.find('input#NhaThau').data('kendoDropDownList').value();
            }
            else {
                if (e.container.find('input#DonVi').data('kendoDropDownList').value() === '') {
                    e.preventDefault();
                    e.container.find('input#DonVi').data('kendoDropDownList').wrapper.next().show();
                    setTimeout(function () {
                        e.container.find('input#DonVi').data('kendoDropDownList').wrapper.next().hide();
                    }, 2000);
                    return;
                }
                tenDV = e.container.find('input#DonVi').data('kendoDropDownList').text();
                donViId = e.container.find('input#DonVi').data('kendoDropDownList').value();
            }
            e.model.TenDonVi = tenDV;
            e.model.DonViId = donViId;
            e.model.dirty = true;
        },
        selectable: true,
        toolbar: [{ name: 'create', text: 'Thêm mới' }]
    }).data('kendoGrid');

    var dlgVaiTro_Quyen = $('#dlgVaiTro_Quyen').kendoWindow({
        modal: true,
        title: 'Chọn Quyền Cho Vai Trò',
        visible: false,
        width: $(document).width() - 40
    }).data('kendoWindow');

    $('#btnThemQuyen').click(function () {
        var items = lvwDSQuyen.select();
        if (items.length > 0) {
            items.each(function () {
                lvwQuyenDaChon.dataSource.add({ Id: $(this).children().text(), ChuThich: this.innerText });
            });
            items.each(function () {
                lvwDSQuyen.remove($(this));
            });
            lvwQuyenDaChon.dataSource.sort({ field: 'ChuThich', dir: 'asc' });
        }
    });

    $('#btnXoaQuyen').click(function () {
        var items = lvwQuyenDaChon.select();
        if (items.length > 0) {
            items.each(function () {
                lvwDSQuyen.dataSource.add({ Id: $(this).children().text(), ChuThich: this.innerText });
            });
            items.each(function () {
                lvwQuyenDaChon.remove($(this));
            });
            lvwDSQuyen.dataSource.sort({ field: 'ChuThich', dir: 'asc' });
        }
    });

    $('#btnLuuQuyen').click(function () {
        var dsIdQuyenMoiThem = [], dsIdQuyenCanXoa = [], dsIdQuyenNhuCu = [];
        for (var i = 0; i < lvwQuyenDaChon.dataItems().length; i++)
            if ($.inArray(lvwQuyenDaChon.dataItems()[i].toJSON().Id, dsIdQuyenBanDau) < 0)
                dsIdQuyenMoiThem.push(lvwQuyenDaChon.dataItems()[i].toJSON().Id);
            else
                dsIdQuyenNhuCu.push(lvwQuyenDaChon.dataItems()[i].toJSON().Id);
        for (var i = 0; i < dsIdQuyenBanDau.length; i++)
            if ($.inArray(dsIdQuyenBanDau[i], dsIdQuyenNhuCu) < 0)
                dsIdQuyenCanXoa.push(dsIdQuyenBanDau[i]);
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ 'VaiTroId': vaiTroId, DSQuyenId: dsIdQuyenMoiThem }),
            dataType: 'json',
            type: 'POST',
            url: 'PhanQuyen.aspx/ThemQuyenChoVaiTro'
        })
        .done(function () {
            if (dsIdQuyenCanXoa.length > 0) {
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ 'VaiTroId': vaiTroId, DSQuyenId: dsIdQuyenCanXoa }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/XoaQuyenCuaVaiTro'
                })
                .fail(function () {
                    alert('Lỗi đường truyền');
                })
                .always(function () {
                    vaiTroId = null;
                    dlgVaiTro_Quyen.close();
                });
            }
            else {
                vaiTroId = null;
                dlgVaiTro_Quyen.close();
            }
        })
        .fail(function () {
            alert('Lỗi đường truyền');
        });
    });

    $('#btnHuyQuyen').click(function () {
        dlgVaiTro_Quyen.close();
    });

    var lvwDSQuyen = $('#lvwDSQuyen').kendoListView({
        autoBind: false,
        dataBound: function () {
            dlgVaiTro_Quyen.center().open();
        },
        selectable: 'multiple',
        template: '<div style="padding:8px"><span style="display:none">#: Id #</span>#: ChuThich #</div>'
    }).data('kendoListView');

    var lvwQuyenDaChon = $('#lvwQuyenDaChon').kendoListView({
        selectable: 'multiple',
        template: '<div style="padding:8px"><span style="display:none">#: Id #</span>#: ChuThich #</div>'
    }).data('kendoListView');

    var gvNguoiDung = $('#gvNguoiDung').kendoGrid({
        columnResizeHandleWidth: 6,
        columns: [
            {
                attributes: {
                    class: "row_css"
                },
                command: [{
                    name: 'Sua',
                    text: '&nbsp;&nbsp;Sửa',
                    click: function (e) {

                        e.preventDefault();

                        //if (this.dataItem($(e.target).closest('tr')).Ten === 'Administrator') {
                        //    notification.warning('Không được chỉnh sửa vai trò này');
                        //    return;
                        //}
                        var tr = $(e.target).closest("tr");
                        $("#lb_email_sua").text(this.dataItem(tr).Email);
                        cboVaiTro_sua.value(this.dataItem(tr).VaiTroId);
                        cboPhongBan_sua.value(this.dataItem(tr).MaPhongBan);
                        dlgNguoiDung_VaiTro_Sua.center().open();
                    },
                    iconClass: 'k-icon k-edit'
                }],
                width: "10%"
            },
            {
                template: function (data) {

                    if (data.ExitsUserInSys == 0) {
                        //return '<center><a class="btn btn-danger" onclick="func_XoaND(' + data.Email + ');"><i class="fa fa-trash-o"></i> Xóa</a></center>';
                        return '<center><a class="k-button" onclick="func_XoaND(\'' + data.Email + '\');"><span class="k-icon k-delete "></span>&nbsp;Xóa</a></center>';
                    }
                    else {
                        return '';
                    }
                },
                width: "10%"
            },
            { field: 'Id', hidden: true },
            { field: 'Email', title: 'Tên Người Dùng (Email)', width: 170 },
            {
                field: 'TenVaiTro',
                title: 'Vai Trò',
                width: 200,
                template: '<b>#: TenVaiTro #</b> - #: ChuThichVaiTro #'
            },
            {
                field: 'TenPhongBan',
                title: 'Phòng ban',
                width: 100
            },
            {
                attributes: { 'class': 'text-center' },
                field: 'IsKichHoat',
                title: 'Kích Hoạt',
                width: 90,
                template: '#if(IsKichHoat){#<input type="checkbox" class="KichHoat" checked />#}else{#<input type="checkbox" class="KichHoat" />#}#'
            },
            {
                attributes: { 'class': 'text-center' },
                field: 'IsXoa',
                title: 'Xóa',
                width: 50,
                template: '#if(IsXoa){#<input type="checkbox" class="Xoa" checked />#}else{#<input type="checkbox" class="Xoa" />#}#'
            },
            {
                attributes: { 'class': 'text-center' },
                field: 'IsKhoa',
                title: 'Khóa',
                width: 60,
                template: '#if(IsKhoa){#<input type="checkbox" class="Khoa" checked />#}else{#<input type="checkbox" class="Khoa" />#}#'
            }
        ],
        dataBound: function (e) {
            if (selectedRow !== null) {
                this.select(this.wrapper.find('tr:eq(' + selectedRow + ')'));
                selectedRow = null;
            }
            else if (currentPage !== null) {
                e.sender.dataSource.page(currentPage);
                currentPage = null;
            }
            else {
                $(e.sender.wrapper).find('.KichHoat').each(function () {
                    var chk = $(this);
                    chk.click(function () {
                        currentPage = e.sender.dataSource.page();
                        var id = e.sender.dataItem(chk.closest('tr')).Id;
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ NguoiDungId: id, IsKichHoat: chk.is(':checked') }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'PhanQuyen.aspx/KichHoatNguoiDung'
                        })
                        .done(function () {
                            e.sender.dataSource.read();
                        })
                        .fail(function () {
                            notification.error('Lỗi đường truyền');
                        });
                    });
                });
                $(e.sender.wrapper).find('.Xoa').each(function () {
                    var chk = $(this);
                    chk.click(function () {
                        currentPage = e.sender.dataSource.page();
                        var id = e.sender.dataItem(chk.closest('tr')).Id;
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ NguoiDungId: id, IsXoa: chk.is(':checked') }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'PhanQuyen.aspx/XoaNguoiDung'
                        })
                        .done(function () {
                            e.sender.dataSource.read();
                        })
                        .fail(function () {
                            notification.error('Lỗi đường truyền');
                        });
                    });
                });
                $(e.sender.wrapper).find('.Khoa').each(function () {
                    var chk = $(this);
                    chk.click(function () {
                        currentPage = e.sender.dataSource.page();
                        var id = e.sender.dataItem(chk.closest('tr')).Id;
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ NguoiDungId: id, IsKhoa: chk.is(':checked') }),
                            dataType: 'json',
                            type: 'POST',
                            url: 'PhanQuyen.aspx/KhoaNguoiDung'
                        })
                        .done(function () {
                            e.sender.dataSource.read();
                        })
                        .fail(function () {
                            notification.error('Lỗi đường truyền');
                        });
                    });
                });
            }
        },
        dataSource: {
            error: function (e) {
                alert(e.xhr.responseText);
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
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDMNguoiDung'
                }
            }
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
        selectable: true,
        toolbar: [{ name: 'insert', text: 'Thêm mới', iconClass: 'k-icon k-add' }]
        //toolbar: kendo.template($('#nguoiDungToolbarTemplate').html())
    }).data('kendoGrid');

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        filterNguoiDung();
    });

    $('#btnClear').click(function (e) {
        e.preventDefault();
        $('#txtSearchValue').val('');
        filterNguoiDung();
    });

    $(".k-grid-insert").click(function (e) {
        e.preventDefault();
        $('#txtEmail').val('');
        cboVaiTro.select(0);
        dlgNguoiDung_VaiTro.center().open();
    });

    var dlgNguoiDung_VaiTro = $('#dlgNguoiDung_VaiTro').kendoWindow({
        modal: true,
        title: 'Thông Tin Người Dùng',
        visible: false,
        width: 600
    }).data('kendoWindow');

    var dlgNguoiDung_VaiTro_Sua = $('#dlgNguoiDung_VaiTro_Sua').kendoWindow({
        modal: true,
        title: 'Sửa Thông Tin Người Dùng',
        visible: false,
        width: 700
    }).data('kendoWindow');

    var cboVaiTro = $('#cboVaiTro').kendoDropDownList({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            schema: { data: 'd' },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDSVaiTroChoNguoiDung'
                }
            }
        },
        dataTextField: 'TenDayDu',
        dataValueField: 'Id',
        optionLabel: 'Chọn vai trò...',
        template: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#',
        valueTemplate: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#'
    }).data('kendoDropDownList');

    var cboVaiTro_sua = $('#cboVaiTro_sua').kendoDropDownList({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            schema: { data: 'd' },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDSVaiTroChoNguoiDung'
                }
            }
        },
        dataTextField: 'TenDayDu',
        dataValueField: 'Id',
        optionLabel: 'Chọn vai trò...',
        template: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#',
        valueTemplate: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#'
    }).data('kendoDropDownList');

    var cboPhongBan = $('#cboPhongBan').kendoDropDownList({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            schema: { data: 'd' },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDSPhongBanChoNguoiDung'
                }
            }
        },
        dataTextField: 'TenDonVi',
        dataValueField: 'MaDonVi',
        optionLabel: 'Chọn phòng ban...',
        //template: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#',
        //valueTemplate: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#'
    }).data('kendoDropDownList');

    var cboPhongBan_sua = $('#cboPhongBan_sua').kendoDropDownList({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            schema: { data: 'd' },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDSPhongBanChoNguoiDung'
                }
            }
        },
        dataTextField: 'TenDonVi',
        dataValueField: 'MaDonVi',
        optionLabel: 'Chọn phòng ban...',
        //template: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#',
        //valueTemplate: '#if(data.Ten!==undefined){#<b>#: Ten #</b> - #: TenDayDu # #}else{# #: TenDayDu # #}#'
    }).data('kendoDropDownList');

    $('#btnLuuNguoiDung').click(function () {
        if ($('#txtEmail').val().trim() === '') {
            $('#txtEmail').next().show();
            setTimeout(function () {
                $('#txtEmail').next().hide();
            }, 2000);
        }
        else if (!(emailPattern.test($('#txtEmail').val().trim()))) {
            $('#txtEmail').siblings().eq(1).show();
            setTimeout(function () {
                $('#txtEmail').siblings().eq(1).hide();
            }, 2000);
        }
        else if (cboVaiTro.value() === '') {
            cboVaiTro.wrapper.next().show();
            setTimeout(function () {
                cboVaiTro.wrapper.next().hide();
            }, 2000);
        }
        else if (cboPhongBan.value() === '') {
            cboPhongBan.wrapper.next().show();
            setTimeout(function () {
                cboPhongBan.wrapper.next().hide();
            }, 2000);
        }
        else {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ Email: $('#txtEmail').val().trim(), VaiTroId: cboVaiTro.value(), PhongBanId: cboPhongBan.value(), PhongBanTen: cboPhongBan.text() }),
                dataType: 'json',
                type: 'POST',
                url: 'PhanQuyen.aspx/ThemNguoiDung'
            })
            .done(function (response) {
                if (response.d) {
                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ Email: $('#txtEmail').val().trim(), PageSize: gvNguoiDung.dataSource.pageSize() }),
                        dataType: 'json',
                        type: 'POST',
                        url: 'PhanQuyen.aspx/GetPageNumberCuaNguoiDungMoi'
                    }).done(function (response) {
                        gvNguoiDung.dataSource.page(response.d[0]);
                        selectedRow = response.d[1];
                    }).fail(function () {
                        alert('Lỗi đường truyền');
                    });
                    dlgNguoiDung_VaiTro.close();
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                //alert(xhr.responseText);
                alert('Lỗi đường truyền');
            });
        }
    });

    $('#btnHuyNguoiDung').click(function () {
        dlgNguoiDung_VaiTro.close();
    });

    $('#btnHuySuaNguoiDung').click(function () {
        dlgNguoiDung_VaiTro_Sua.close();
    });

    $('#btnSuaNguoiDung').click(function () {

        if (cboVaiTro_sua.value() === '') {
            cboVaiTro_sua.wrapper.next().show();
            setTimeout(function () {
                cboVaiTro_sua.wrapper.next().hide();
            }, 2000);
        }
        else if (cboPhongBan_sua.value() === '') {
            cboPhongBan_sua.wrapper.next().show();
            setTimeout(function () {
                cboPhongBan_sua.wrapper.next().hide();
            }, 2000);
        }
        else {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ Email: $('#lb_email_sua').text().trim(), VaiTroId: cboVaiTro_sua.value(), PhongBanId: cboPhongBan_sua.value(), PhongBanTen: cboPhongBan_sua.text() }),
                dataType: 'json',
                type: 'POST',
                url: 'PhanQuyen.aspx/SuaNguoiDung'
            })
            .done(function (response) {
                if (response.d) {
                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ Email: $('#lb_email_sua').text().trim(), PageSize: gvNguoiDung.dataSource.pageSize() }),
                        dataType: 'json',
                        type: 'POST',
                        url: 'PhanQuyen.aspx/GetPageNumberCuaNguoiDungMoi'
                    }).done(function (response) {
                        gvNguoiDung.dataSource.page(response.d[0]);
                        selectedRow = response.d[1];
                    }).fail(function () {
                        //alert('Lỗi đường truyền');
                    });
                    dlgNguoiDung_VaiTro_Sua.close();
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                //alert(xhr.responseText);
                alert('Lỗi đường truyền');
            });
        }
    });

    $('#tab1').on('show.bs.tab', function (e) {
        gvVaiTro.dataSource.read();
    });

    $('#tab2').on('show.bs.tab', function (e) {
        gvNguoiDung.dataSource.read();
        cboVaiTro.dataSource.read();
    });
});

function func_XoaND(v_TenNguoiDung) {

    if (confirm("Bạn có chắc muốn xóa người dùng này không?")) {

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Email: v_TenNguoiDung }),
            dataType: 'json',
            type: 'POST',
            url: 'PhanQuyen.aspx/XoaLuonNguoiDung'
        })
        .done(function (response) {
            if (response.d) {
                $("#gvNguoiDung").data("kendoGrid").dataSource.read();
            }
        })
        .fail(function (xhr, textStatus, errorThrown) {
            //alert(xhr.responseText);
            alert('Lỗi đường truyền');
        });

    }

}

function filterNguoiDung() {

    var ds;

    if ($('#txtSearchValue').val().trim() !== '') {

        ds = new kendo.data.DataSource({
            error: function (e) {
                alert(e.xhr.responseText);
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
                    data: { TenNguoiDung: $('#txtSearchValue').val().trim() },
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDMNguoiDungFilter'
                }
            }
        });

    } else {
        ds = new kendo.data.DataSource({
            error: function (e) {
                alert(e.xhr.responseText);
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
                    dataType: 'json',
                    type: 'POST',
                    url: 'PhanQuyen.aspx/GetDMNguoiDung'
                }
            }
        });
    }

    $("#gvNguoiDung").data("kendoGrid").setDataSource(ds);
    ds.read();

}