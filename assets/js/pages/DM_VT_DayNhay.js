
var DS_VT_DayNhay, DS_VT, DS_DVT;


$(document).ready(function () {

    document.oncontextmenu = function () { return false; }

    //#region DaTaSource

    DS_VT_DayNhay = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                    data: {
                        cmd: 'LayDanhSach_DayNhay'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        },
        pageSize: 7
    });





    DS_DVT = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_DVT'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });



    //#endregion



    //#region Control

    var notification = $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: 50,
            right: 450
        },
        autoHideAfter: 1000,
        stacking: "down",
        templates: [
            {
                type: "error",
                template: $("#errorTemplate").html()
            },
            {
                type: "upload-success",
                template: $("#successTemplate").html()
            }
        ],
        show: function (e) {
            e.element.parent().css('z-index', 22222);
        }

    }).data("kendoNotification");

    var WD_VT_Them = $("#WD_VT_Them").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư dây nhảy",
        visible: false,

    }).data("kendoWindow");




    var cmb_LoaiVatTu_DayNhay = $("#cmb_LoaiVatTu_DayNhay").kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DanhMuc.aspx",
                        data: {
                            cmd: 'DS_LoaiVT'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        placeholder: "--Chọn loại vật tư--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
        change: function () {

            Ham_Get_DS_DauNoi();
        }
    }).data("kendoComboBox");



    var cmb_LoaiVatTu_Day = $("#cmb_LoaiVatTu_Day").kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DanhMuc.aspx",
                        data: {
                            cmd: 'DS_LoaiVT'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        placeholder: "--Tất cả--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
        change: function () {

            Ham_Get_DS_DayQuang();



        }
    }).data("kendoComboBox");

    var cmb_TenVatTu_Day = $("#cmb_TenVatTu_Day").kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                        data: {
                            cmd: 'LayDanhSach_VT'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            }
        },
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        filter: "startswith",
        placeholder: "--Chọn tên dây quang--",
        template: kendo.template("${ data.MaVatTu_TD } || ${ data.TenVT } ")
    }).data("kendoComboBox");



    var cmb_TenVatTu_1 = $("#cmb_TenVatTu_1").kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                        data: {
                            cmd: 'LayDanhSach_DauNoi'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            }
        },
        dataTextField: "TenDauNoi",
        dataValueField: "VatTu_ID",
        filter: "startswith",
        placeholder: "--Chọn tên đấu nối--",
        template: kendo.template("<b>${ data.TenDauNoi } </b> - ${ data.DuongKinh } mm "),
        change: function () {
            
            if (this.select() != -1) {

                cmb_TenVatTu_2.text('');
                var DS = new kendo.data.DataSource({
                    transport: {
                        parameterMap: function (data, operation) {
                            return JSON.stringify(data);
                        },
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                                data: {
                                    cmd: 'GetDauNoi2',
                                    DuongKinh: cmb_DuongKinh.value(),
                                    DauNoi1_ID: cmb_TenVatTu_1.dataItem().DauNoi_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
                                }
                            });
                        }
                    }
                });
                cmb_TenVatTu_2.setDataSource(DS);
            }
        }
    }).data("kendoComboBox");


    var cmb_TenVatTu_2 = $("#cmb_TenVatTu_2").kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                        data: {
                            cmd: 'LayDanhSach_DauNoi'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                }
            }
        },
        dataTextField: "TenDauNoi",
        dataValueField: "VatTu_ID",
        filter: "startswith",
        placeholder: "--Chọn tên đấu nối--",
        template: kendo.template("<b>${ data.TenDauNoi } </b> - ${ data.DuongKinh } mm ")
    }).data("kendoComboBox");

    var cmb_TinhChat = $("#cmb_TinhChat").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "--Chọn tính chất--",
        dataSource: [
            { text: "đơn", value: "1" },
            { text: "đôi", value: "2" }
        ]
    }).data("kendoDropDownList");        

    var cmb_DonViTinh = $("#cmb_DonViTinh").kendoDropDownList({
        dataSource: DS_DVT,
        optionLabel: "--Chọn đợn vị tính--",
        dataTextField: "TenDVT",
        dataValueField: "MaDVT"
    }).data("kendoDropDownList");

    var cmb_DuongKinh = $("#cmb_DuongKinh").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "--Chọn đường kính--",
        dataSource: [
            { text: "0.9mm", value: "0.90" },
            { text: "2.0mm", value: "2.00" }
        ],
        change: function () {
            Ham_Get_DS_DayQuang();
            Ham_Get_DS_DauNoi();
        }
    }).data("kendoDropDownList");

    var txt_SoMet = $("#txt_SoMet").kendoNumericTextBox({
        format: 'n2',
        decimals: 2,
        min:0,
        max: 99
    }).data("kendoNumericTextBox");





    var grid_daynhay = $("#grid_daynhay").kendoGrid({

        toolbar: kendo.template($("#Templ_grid_daynhay").html()),
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư dây nhảy",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        sortable: true,
        columns: [
            {
                template: function (data) {

                    return '<center><a onclick="Ham_Sua_Grid(' + data.VatTu_ID + ');" class="btn btn-info"><i class="fa fa-edit "></i> Sửa</a></center>'

                },
                width: 100
            },
            {

                template: function (data) {

                    if (data.Check_VatTu == 0) {
                        return '<center><a onclick="Ham_Xoa_Grid(' + data.VatTu_ID + ');" class="btn btn-danger" ><i class="fa fa-trash-o "></i> Xóa</a></center>'
                    } else {
                        return ''
                    }

                },
                width: 100
            },
            {
                field: 'NgungSuDung', title: 'Không còn sử dụng', width: 120, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" },
                template: function (data) {
                    if (data.NgungSuDung == 0) {

                        return '<input type="checkbox" disabled />'

                    } else {

                        return '<input type="checkbox" disabled checked />'
                    }

                }
            },
            { title: "Mã Vật Tư", field: "MaVatTu_TD", width: 150, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
            { field: 'TenVT', title: 'Tên Vật Tư', width: 350, headerAttributes: { class: "header_css" }, attributes: { class: "row_css", style: "font-weight: bold !important;" } },
            { field: 'LoaiVT_Ten', title: 'Loại Vật Tư', width: 250, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
            { field: 'DonViTinh_Ten', title: 'Đơn Vị tính', width: 100, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
            { field: 'SoMet', title: 'Số mét', width: 100, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
            {
                field: 'LoaiDay', title: 'Loại Dây', width: 120, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" },
                template: function (data) {
                    if (data.LoaiDay == 1) {

                        return 'Dây nối'

                    } else {

                        return 'Dây nhảy'
                    }

                }
            },
            {
                field: 'TinhChat', title: 'Tính chất', width: 120, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" },
                template: function (data) {
                    if (data.TinhChat == 1) {

                        return 'Đơn'

                    } else {

                        return 'Đôi'
                    }

                }
            },
            { field: 'GhiChu', title: 'Ghi Chú', width: 200, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } }

        ],
        detailTemplate: kendo.template($("#Templ_CT_DayNhay").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function (e) {


            var detailRow = e.detailRow;

            detailRow.find("#tabstrip").kendoTabStrip({
                animation: {
                    open: { effects: "fadeIn" }
                }
            });


            detailRow.find("#tab_CT_DayNhay").empty();
            detailRow.find("#tab_CT_DayNhay").kendoGrid({

                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                                data: {
                                    cmd: 'LayDanhSach_VT_DayNhay_CT',
                                    VatTu_ID: e.data.VatTu_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=DM_VT_DayNhay.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
                                }
                            });
                        }
                    }
                }),
                columns: [
                    { title: "Nguyên Liệu", field: "NguyenLieu", width: 150, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                    {
                        field: 'NgungSuDung', title: 'Không còn sử dụng', width: 120, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" },
                        template: function (data) {
                            if (data.NgungSuDung == 0) {

                                return '<input type="checkbox" disabled />'

                            } else {

                                return '<input type="checkbox" disabled checked />'
                            }

                        }
                    },
                    { title: "Mã Vật Tư", field: "MaVatTu_TD", width: 150, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                    { field: 'TenVT', title: 'Tên Vật Tư', width: 350, headerAttributes: { class: "header_css" }, attributes: { class: "row_css", style: "font-weight: bold !important;" } },
                    { field: 'LoaiVT_Ten', title: 'Loại Vật Tư', width: 250, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                    { field: 'DonViTinh_Ten', title: 'Đơn Vị tính', width: 100, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                    { field: 'GhiChu', title: 'Ghi Chú', width: 200, headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } }

                ]
            });
        }
    }).data("kendoGrid");

   
    $("#txt_tim").kendoAutoComplete({
        dataTextField: "MaVatTu_TD",
        dataSource: DS_VT_DayNhay,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.VatTu_ID;
            
            if (value) {

                grid_daynhay.dataSource.filter({
                    field: "VatTu_ID",
                    operator: "eq",
                    value: parseInt(value)
                });
            }
            else {
                grid_daynhay.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_tim").val('');
        }

    });
    $("#btn_clear_tim").click(function (e) {
        e.preventDefault();
        $("#txt_tim").val('');
        grid_daynhay.dataSource.filter({});
    });

    //#endregion


    //#region Hiển thị 

    //Hiển thị grid danh sách danh mục dây nhảy
    grid_daynhay.setDataSource(DS_VT_DayNhay);    

    //#endregion

    //#region event

    $("#btn_Them_VT").click(function () {

        //Clear form 

        cmb_TenVatTu_Day.enable(false);
        cmb_TenVatTu_1.enable(false);
        cmb_TenVatTu_2.enable(false);

        cmb_LoaiVatTu_DayNhay.dataSource.filter(
            {
                logic: "or",
                filters: [
                  { field: "LoaiVT_ID", operator: "eq", value: 22 },
                  { field: "LoaiVT_ID", operator: "eq", value: 24 }
                ]
            }
        );

        cmb_LoaiVatTu_DayNhay.text('');
        $("#chk_SuDung").prop("checked", false);

        cmb_LoaiVatTu_Day.text('');
        cmb_LoaiVatTu_Day.dataSource.filter({
            logic: "or",
            filters: [
              { field: "LoaiVT_ID", operator: "eq", value: 7 },
              { field: "LoaiVT_ID", operator: "eq", value: 21 }
            ]
        });

        cmb_TenVatTu_Day.enable(false);
       

        cmb_TinhChat.value('');
        cmb_DuongKinh.value('');

        txt_SoMet.value('');
        cmb_DonViTinh.value(14);

        cmb_TenVatTu_1.dataSource.filter({ field: "LoaiVT_ID", operator: "eq", value: 8 });
        cmb_TenVatTu_1.text('');

        //cmb_TenVatTu_2.dataSource.filter({ field: "LoaiVT_ID", operator: "eq", value: 8 });
        cmb_TenVatTu_2.text('');

        $("#txt_GhiChu").val('');
        $("#txt_TenDayNhay").val('');
        $("#txt_MaDayNhay").val('');
        $("#hf_VatTu_ID").val('');



        WD_VT_Them.center().open();
    });


    $("#btn_GhepTen").click(function () {        
        var check = 0;

        if (cmb_LoaiVatTu_DayNhay.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn loại thành phẩm",
                message: "Hãy chọn loại thành phẩm!"
            }, "error");
            return;
        }
        if (cmb_LoaiVatTu_Day.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn vỏ bọc",
                message: "Hãy chọn vỏ bọc!"
            }, "error");
            return;
        }
        if (cmb_TinhChat.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn tính chất",
                message: "Hãy chọn tính chất!"
            }, "error");
            return;
        }
        if (cmb_DuongKinh.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn đường kính",
                message: "Hãy chọn đường kính!"
            }, "error");
            return;
        }
        if (txt_SoMet.value() == null) {
            check = 1;
            notification.show({
                title: "Chưa nhập số mét!",
                message: "Hãy nhập số mét cho dây nhảy!"
            }, "error");
            return;
        }
        if (
                (cmb_LoaiVatTu_DayNhay.value() == "22" && cmb_TenVatTu_1.select() == -1)
            ||
                (cmb_LoaiVatTu_DayNhay.value() == "22" && cmb_TenVatTu_2.select() == -1)
           ) {
            check = 1;
            notification.show({
                title: "Chưa chọn đủ 2 đầu nối!",
                message: "Hãy chọn đủ 2 đầu nối!"
            }, "error");
            return;
        }
        if (cmb_LoaiVatTu_DayNhay.value() == "24" && cmb_TenVatTu_1.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn đầu nối!",
                message: "Hãy chọn đầu nối!"
            }, "error");
            return;
        }

        if (check == 0) {

            


            var request = $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                data: {
                    cmd: 'GhepMaVatTuDayNhay',
                    LoaiThanhPham: cmb_LoaiVatTu_DayNhay.value(),
                    VoBoc: cmb_LoaiVatTu_Day.value(),
                    TinhChat: cmb_TinhChat.value(),
                    DuongKinh: cmb_DuongKinh.value(),
                    DauNoi1_ID: cmb_TenVatTu_1.dataItem().DauNoi_ID,
                    DauNoi2_ID: cmb_TenVatTu_2.select()!= -1 ? cmb_TenVatTu_2.dataItem().DauNoi_ID : 0,
                    SoMet: txt_SoMet.value()
                    
                },
                dataType: 'json'
            });
            request.done(function (msg) {
                
                $("#txt_MaDayNhay").val(msg[0].MaThanhPham);

                /////////////////////////////////////////
                var TenThanhPham = '';
                var LoaiThanhPham = '';
                var VoBoc = '';

                switch (cmb_LoaiVatTu_Day.value()) {
                    case "7":
                        VoBoc = 'LSZH';
                        break;
                    case "21":
                        VoBoc = 'PVC';
                        break;
                    default:
                        VoBoc = '';
                }
                switch (cmb_LoaiVatTu_DayNhay.value()) {
                    case "22":
                        LoaiThanhPham = 'Dây nhảy quang';
                        TenDayNhay = LoaiThanhPham + ' ' + VoBoc + ' ' + cmb_TinhChat.text() + ' '  + 'đường kính ' + cmb_DuongKinh.text() + ' ' + cmb_TenVatTu_1.text() + '-' + cmb_TenVatTu_2.text() + ' ' + txt_SoMet.value() + 'm';
                        break;
                    case "24":
                        LoaiThanhPham = 'Dây nối quang';
                        TenDayNhay = LoaiThanhPham + ' ' + VoBoc + ' ' + cmb_TinhChat.text() + ' '  + 'đường kính ' + cmb_DuongKinh.text() + ' ' + cmb_TenVatTu_1.text() + ' ' + txt_SoMet.value() + 'm';
                        break;
                    default:
                        LoaiThanhPham = '';
                }

                $("#txt_TenDayNhay").val(TenDayNhay);


            });
            request.fail(function (jqXHR, textStatus) {
                notification.show({
                    title: "Lỗi",
                    message: textStatus
                }, "error");

            });



        }

    });

    $("#btn_Luu_Them_VT").click(function () {



        var check = 0;

        if (cmb_LoaiVatTu_DayNhay.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn loại vật tư",
                message: "Hãy chọn loại vật tư dây nhảy quang!"
            }, "error");
            return;
        }
        if (cmb_TenVatTu_Day.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn dây quang",
                message: "Hãy chọn dây quang!"
            }, "error");
            return;
        }

        if (cmb_TinhChat.value() == "") {
            check = 1;
            notification.show({
                title: "Chưa chọn tính chất",
                message: "Hãy chọn tính chất dây nhảy!"
            }, "error");
            return;
        }
        if (cmb_DuongKinh.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn đường kính",
                message: "Hãy chọn đường kính!"
            }, "error");
            return;
        }
        if (txt_SoMet.value() == null) {
            check = 1;
            notification.show({
                title: "Chưa nhập số mét!",
                message: "Hãy nhập số mét cho dây nhảy!"
            }, "error");
            return;
        }
        if (cmb_TenVatTu_1.select() == -1) {
            check = 1;
            notification.show({
                title: "Chưa chọn đấu nối 1",
                message: "Hãy chọn đấu nối 1!"
            }, "error");
            return;
        }


        if (cmb_DonViTinh.value() == "") {
            check = 1;
            notification.show({
                title: "Chưa chọn đơn vị tính",
                message: "Hãy chọn đơn vị tính cho dây nhảy!"
            }, "error");
            return;
        }
        if ($("#txt_TenDayNhay").val() == "") {
            check = 1;
            notification.show({
                title: "Chưa ghép tên vật tư dây nhảy",
                message: "Hãy ghép tên cho dây nhảy!"
            }, "error");
            return;
        }        
        if (check == 0) {

            if ($("#hf_VatTu_ID").val() == '') {

                var request = $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                    data: {
                        cmd: 'Them_VTDN',
                        LoaiDayNhayQuang: cmb_LoaiVatTu_DayNhay.value(),
                        DayQuang: cmb_TenVatTu_Day.value(),
                        TinhChat: cmb_TinhChat.value(),
                        //LoaiDay: cmb_LoaiDay.value(),
                        SoMet: txt_SoMet.value(),
                        DauNoi_1: cmb_TenVatTu_1.value(),
                        DauNoi_2: cmb_TenVatTu_2.value(),
                        DonViTinh: cmb_DonViTinh.value() == "" ? null : cmb_DonViTinh.value(),
                        TenDayNhay: $("#txt_TenDayNhay").val(),
                        SuDung: $('#chk_SuDung').prop('checked') == true ? 1 : 0,
                        GhiChu: $("#txt_GhiChu").val(),
                        MaDayNhay: $("#txt_MaDayNhay").val(),
                        DuongKinh: cmb_DuongKinh.value()
                    },
                    dataType: 'json'
                });
                request.done(function (msg) {

                    if (msg[0].ErrorMessage == null) {

                        DS_VT_DayNhay.read();

                        notification.show({
                            message: "Thêm mới thành công!"
                        }, "upload-success");

                        notification.bind('hide', function () {
                            WD_VT_Them.close();
                        });

                    }
                    else {

                        notification.show({
                            title: "Lỗi",
                            message: msg[0].ErrorMessage
                        }, "error");
                    }


                });
                request.fail(function (jqXHR, textStatus) {
                    notification.show({
                        title: "Lỗi",
                        message: textStatus
                    }, "error");

                });
            } else {

                var request = $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
                    data: {
                        cmd: 'Sua_VTDN',
                        LoaiDayNhayQuang: cmb_LoaiVatTu_DayNhay.value(),
                        DayQuang: cmb_TenVatTu_Day.value(),
                        TinhChat: cmb_TinhChat.value(),
                        //LoaiDay: cmb_LoaiDay.value(),
                        SoMet: txt_SoMet.value(),
                        DauNoi_1: cmb_TenVatTu_1.value(),
                        DauNoi_2: cmb_TenVatTu_2.value(),
                        DonViTinh: cmb_DonViTinh.value() == "" ? null : cmb_DonViTinh.value(),
                        TenDayNhay: $("#txt_TenDayNhay").val(),
                        SuDung: $('#chk_SuDung').prop('checked') == true ? 1 : 0,
                        GhiChu: $("#txt_GhiChu").val(),
                        MaDayNhay: $("#txt_MaDayNhay").val(),
                        DuongKinh: cmb_DuongKinh.value(),
                        VatTu_ID: $("#hf_VatTu_ID").val()

                    },
                    dataType: 'json'
                });
                request.done(function (msg) {

                    if (msg[0].ErrorMessage == null) {

                        DS_VT_DayNhay.read();

                        notification.show({
                            message: "Cập nhật thành công!"
                        }, "upload-success");

                        notification.bind('hide', function () {
                            WD_VT_Them.close();
                        });

                    }
                    else {

                        notification.show({
                            title: "Lỗi",
                            message: msg[0].ErrorMessage
                        }, "error");
                    }


                });
                request.fail(function (jqXHR, textStatus) {
                    notification.show({
                        title: "Lỗi",
                        message: textStatus
                    }, "error");

                });
            }
        }

    });

    $("#btn_Huy_Luu_Them_VT").click(function () {
        WD_VT_Them.close();
    });
    //#endregion
});

function Ham_Sua_Grid(p_VatTu_ID) {

    $("#cmb_LoaiVatTu_DayNhay").data("kendoComboBox").dataSource.filter(
            {
                logic: "or",
                filters: [
                  { field: "LoaiVT_ID", operator: "eq", value: 22 },
                  { field: "LoaiVT_ID", operator: "eq", value: 24 }
                ]
            }
        );
    
    $("#cmb_LoaiVatTu_Day").data("kendoComboBox").dataSource.filter({
        logic: "or",
        filters: [
          { field: "LoaiVT_ID", operator: "eq", value: 7 },
          { field: "LoaiVT_ID", operator: "eq", value: 21 }
        ]
    });

    //////////////////////////////////////////////

    var grid_data = $("#grid_daynhay").data("kendoGrid"),
    data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.VatTu_ID == p_VatTu_ID;
    });

    

    $("#cmb_LoaiVatTu_DayNhay").data("kendoComboBox").value(res[0].LoaiVT_ID);

    $("#cmb_LoaiVatTu_Day").data("kendoComboBox").value(res[0].LoaiVT_DayQuang_ID);
    $("#cmb_DuongKinh").data("kendoDropDownList").value(res[0].DuongKinh_str);
    

    $("#chk_SuDung").prop("checked", res[0].NgungSuDung == 0 ? false : true);
    $("#cmb_TenVatTu_Day").data("kendoComboBox").value(res[0].DayQuang_ID);
    $("#cmb_TinhChat").data("kendoDropDownList").value(res[0].TinhChat);
    $("#txt_SoMet").data("kendoNumericTextBox").value(res[0].SoMet);
    $("#cmb_DonViTinh").data("kendoDropDownList").value(res[0].DonViTinh_ID);
    $("#cmb_TenVatTu_1").data("kendoComboBox").value(res[0].DauNoi1_ID);
    $("#cmb_TenVatTu_2").data("kendoComboBox").value(res[0].DauNoi2_ID);
    $("#txt_GhiChu").val(res[0].GhiChu);
    $("#txt_TenDayNhay").val(res[0].TenVT);
    $("#txt_MaDayNhay").val(res[0].MaVatTu_TD);


    $("#hf_VatTu_ID").val(res[0].VatTu_ID)
    $("#WD_VT_Them").data("kendoWindow").center().open();



}
function Ham_Xoa_Grid(p_VatTu_ID) {


    if (confirm("Bạn có chắc muốn xóa vật tư này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_DM_VT_DayNhay.aspx",
            data: {
                cmd: 'Xoa_VTDN',
                VatTu_ID: p_VatTu_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                DS_VT_DayNhay.read();

                $("#notification").data("kendoNotification").show({
                    message: "Xóa thành công!"
                }, "upload-success");



            }
            else {

                $("#notification").data("kendoNotification").show({
                    title: "Lỗi",
                    message: msg[0].ErrorMessage
                }, "error");
            }


        });
        request.fail(function (jqXHR, textStatus) {
            $("#notification").data("kendoNotification").show({
                title: "Lỗi",
                message: textStatus
            }, "error");

        });
    }

}
function Ham_Get_DS_DauNoi() {

    var cmb_LoaiVatTu_DayNhay = $("#cmb_LoaiVatTu_DayNhay").data("kendoComboBox");
    var cmb_DuongKinh = $("#cmb_DuongKinh").data("kendoDropDownList");

    var cmb_TenVatTu_1 = $("#cmb_TenVatTu_1").data("kendoComboBox");
    var cmb_TenVatTu_2 = $("#cmb_TenVatTu_2").data("kendoComboBox");

    if (cmb_LoaiVatTu_DayNhay.value() != "" && cmb_DuongKinh.value() != "") {

        cmb_TenVatTu_1.enable(true);
        cmb_TenVatTu_1.dataSource.filter({
            field: "DuongKinh",
            operator: "eq",
            value: cmb_DuongKinh.value()
        });
        cmb_TenVatTu_1.text("");

        switch (cmb_LoaiVatTu_DayNhay.value()) {
            case "24"://Dây nối 
                cmb_TenVatTu_2.text("");
                cmb_TenVatTu_2.enable(false);

                break;
            case "22"://Dây nhảy                 

                cmb_TenVatTu_2.enable(true);
                cmb_TenVatTu_2.dataSource.filter({
                    field: "DuongKinh",
                    operator: "eq",
                    value: cmb_DuongKinh.value()
                });
                cmb_TenVatTu_2.text("");
                break;
        }


    }
    else {
        cmb_TenVatTu_1.enable(false);
        cmb_TenVatTu_2.enable(false);

    }
    $("#txt_TenDayNhay").val("");
    $("#txt_MaDayNhay").val("");
}
function Ham_Get_DS_DayQuang() {


    var cmb_LoaiVatTu_Day = $("#cmb_LoaiVatTu_Day").data("kendoComboBox");
    var cmb_DuongKinh = $("#cmb_DuongKinh").data("kendoDropDownList");
    var cmb_TenVatTu_Day = $("#cmb_TenVatTu_Day").data("kendoComboBox");
    

    if (cmb_LoaiVatTu_Day.value() != "" && cmb_DuongKinh.value() != "") {

        cmb_TenVatTu_Day.enable(true);

        cmb_TenVatTu_Day.dataSource.filter({
            logic: "and",
            filters: [
                { field: "LoaiVT_ID", operator: "eq", value: parseInt(cmb_LoaiVatTu_Day.value()) },
                { field: "DuongKinh", operator: "eq", value: cmb_DuongKinh.value() }
            ]
        });

        cmb_TenVatTu_Day.text("");
    }
    else {
        cmb_TenVatTu_Day.enable(false);
        cmb_TenVatTu_Day.text("");
    }

    $("#txt_TenDayNhay").val("");
    $("#txt_MaDayNhay").val("");


}