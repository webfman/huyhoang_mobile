var DS_PO, DS_PO_Loc, ds_tt_vattu, DS_BangKe_Cap1, DS_BangKe_Cap2;
var BienChiTietPO, Bien_ChiTiet_VatTu;
var Bien_ChiTiet_grid_TT_PO;

var HopDong_ID, PO_ID, KiemTra_ID;




$(document).ready(function () {


    
    
    //$("#main-menu-toggle").click();
    $("#main-menu-min").click();

    //document.oncontextmenu = function () { return false; }
    
    
    $('#div_HS_ThanhToan').hide();
    $('#btn_Back').hide();


    //#region DataSource
    DS_PO = new kendo.data.DataSource({

        requestEnd: function (e) {
            e.response.d = JSON.parse(e.response.d);
        },
        schema: {
            data: 'd.Data',
            total: 'd.Total[0].Total'
        },
        pageSize: 5,
        serverPaging: true,
        serverSorting: true,
        sort: {
            field: 'PO_ID',
            dir: 'desc'
        },
        transport: {
            read: {
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: 'POST',
                url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
            },
            parameterMap: function (options, operation) {
                return kendo.stringify(options);
            }
        }
    });



    //DS_PO = new kendo.data.DataSource({

    //    requestEnd: function (e) {
    //        if (e.type)
    //            e.response.d = JSON.parse(e.response.d);
    //    },
    //    schema: {
    //        data: 'd.Data',
    //        total: 'd.Total[0].Total'
    //    },
    //    pageSize: 5,
    //    serverPaging: true,
    //    serverSorting: true,
    //    sort: {
    //        field: 'PO_ID',
    //        dir: 'desc'
    //    },
    //    transport: {
    //        read: {
    //            contentType: "application/json; charset=utf-8",
    //            dataType: 'json',
    //            type: 'POST',
    //            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_bySoPO",
    //            data: {
    //                SoPO: 'PO5 HĐ 070-16'
    //            }
    //        },
    //        parameterMap: function (options, operation) {
    //            return kendo.stringify(options);
    //        }
    //    }
    //});

    //#endregion

    //#region Hiển thị phân quyền
    var Col_grid_kiemtra;        
    var Col_grid_checklist;

    //TTCW
    if ($("[id$=_hf_nt]").val().trim() == "") {

        
        
        $('#btn_HoanTat_HS').show();
        

        Col_grid_kiemtra = [
                    { field: "TiepNhan_ID", hidden: true },
                    { field: "Checklist_ID", hidden: true },                    
                    {
                        title: "Chứng từ sai sót",
                        field: "TinhTrang_CL",
                        headerAttributes: {
                            class: "header_css"
                        },
                        template: kendo.template($("#Templ_check").html()),
                        sortable: false,
                        width: 80,
                        attributes: {
                            class: "row_css",
                            style: "background-color:lightyellow;"
                        }
                    },
                    {
                        title: "Trung tâm Cung Ứng",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_CW",
                                template: "#= NgayTra_CW == null || NgayTra_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {

                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoDatePicker({
                                           format: "dd/MM/yyyy"
                                       });


                                },
                                attributes: {
                                    "class": "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            },
                            {
                                title: "Lý do",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_CW",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                            .appendTo(container)
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_CW",
                                template: "#= NgayNhan_CW == null || NgayNhan_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {

                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoDatePicker({
                                           format: "dd/MM/yyyy"
                                       });


                                },
                                attributes: {
                                    "class": "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Nhà thầu",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_NT",
                                template: "#= NgayTra_NT == null || NgayTra_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            },
                            {
                                title: "Ghi chú",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_NT",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_NT",
                                template: "#= NgayNhan_NT == null || NgayNhan_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },

                    {
                        title: "Ngày tiếp nhận chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayTiepNhan_ChungTu",
                        template: "#= NgayTiepNhan_ChungTu == null || NgayTiepNhan_ChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayTiepNhan_ChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            "class": "row_css"
                        },
                        width: 100
                    }

        ]



        Col_grid_checklist = [
                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },                        
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ngày chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayChungTu",
                        template: "#= NgayChungTu == null || NgayChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ghi chú của nhà thầu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GhiChu_NhaThau",
                        editor: function nonEditor(container, options) {

                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 200
                    },
                    {
                        title: "Ghi chú của TTCW",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GhiChu_CW",
                        attributes: {
                            class: "row_css",
                            style: "background-color:lightyellow;"
                        },
                        editor: function nonEditor(container, options) {
                            $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                    .appendTo(container)
                        },
                        width: 200
                    }
        ];

    }
    else {

        
        $('#btn_HoanTat_HS').hide();

        $('#txt_NgayDK_HoanTat').attr("disabled", "true");
        

        Col_grid_kiemtra = [
                    { field: "TiepNhan_ID", hidden: true },
                    { field: "Checklist_ID", hidden: true },
                    {
                        title: "Chứng từ sai sót",
                        field: "TinhTrang_CL",
                        headerAttributes: {
                            class: "header_css"
                        },
                        template: function (data) {
                            if (data.TinhTrang_CL == 0) {
                               
                                return '<center><span class="label label-important">Lỗi</span></center>'
                            }
                            else if (data.TinhTrang_CL == 1) {
                                return '<center><span class="label label-success">Ok</span></center>';
                            }    
                        },
                        sortable: false,
                        width: 80,
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Trung tâm Cung Ứng",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_CW",
                                template: "#= NgayTra_CW == null || NgayTra_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            },
                            {
                                title: "Lý do",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_CW",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_CW",
                                template: "#= NgayNhan_CW == null || NgayNhan_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Nhà thầu",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_NT",
                                template: "#= NgayTra_NT == null || NgayTra_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                      .appendTo(container)
                                      .kendoDatePicker({
                                          format: "dd/MM/yyyy"
                                      });
                                },
                                attributes: {
                                    "class": "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            },
                            {
                                title: "Ghi chú",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_NT",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                            .appendTo(container)
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_NT",
                                template: "#= NgayNhan_NT == null || NgayNhan_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoDatePicker({
                                           format: "dd/MM/yyyy"
                                       });
                                },
                                attributes: {
                                    "class": "row_css",                                    
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },

                    {
                        title: "Ngày tiếp nhận chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayTiepNhan_ChungTu",
                        template: "#= NgayTiepNhan_ChungTu == null || NgayTiepNhan_ChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayTiepNhan_ChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {

                            container.text(options.model[options.field]);

                        },
                        attributes: {
                            "class": "row_css"
                        },
                        width: 100
                    }

        ]


        Col_grid_checklist = [
                {
                    title: "Mã chứng từ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaChungTu",
                    editor: function nonEditor(container, options) {
                        container.text(options.model[options.field]);
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    width: 70
                },
                {
                    title: "Chứng từ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenChungTu",
                    editor: function nonEditor(container, options) {
                        container.text(options.model[options.field]);
                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 150
                },
                {
                    title: "Số chứng từ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoChungTu",
                    editor: function nonEditor(container, options) {
                        $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                            .appendTo(container)
                    },
                    attributes: {
                        "class": "row_css",
                        "style": "background-color:lightyellow;"
                    },
                    width: 100
                },
                {
                    title: "Ngày chứng từ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayChungTu",
                    template: "#= NgayChungTu == null || NgayChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                    editor: function (container, options) {

                        $('<input name="' + options.field + '"/>')
                           .appendTo(container)
                           .kendoDatePicker({
                               format: "dd/MM/yyyy"
                           });


                    },
                    attributes: {
                        "class": "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 100
                },
                {
                    title: "Ghi chú của nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GhiChu_NhaThau",
                    editor: function nonEditor(container, options) {
                        $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                            .appendTo(container)
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 200
                },
                {
                    title: "Ghi chú của TTCW",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GhiChu_CW",
                    editor: function nonEditor(container, options) {
                        container.text(options.model[options.field]);
                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 200
                }

        ]
    }

    //#endregion

    //#region Control
        
    $("#grid_NguoiDung").kendoGrid({
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   nhân viên",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        selectable: "multiple",
        sortable: true,
        toolbar: kendo.template($("#Templ_NguoiDung").html()),
        columns:
            [

                {
                    title: "Tên",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ten",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    template: $("#photo-template").html(),
                    width: 150
                },
                {
                    title: "Username",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenNguoiDung",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },

                    width: 150
                },
                {
                    title: "Số điện thoại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoDienThoai",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },

                    width: 100
                },
                {
                    title: "Mã nhân viên",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaNhanVien",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },

                    width: 80
                }
            ]
    });

    $("#txt_search_u").kendoAutoComplete({
        dataTextField: "TenNguoiDung",
        filter: "contains",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.TenNguoiDung;

            if (value) {

                $("#grid_NguoiDung").data("kendoGrid").dataSource.filter({ field: "TenNguoiDung", operator: "eq", value: value });
            }
            else {
                $("#grid_NguoiDung").data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_u").val('');
        }

    });

    $("#btn_clear_u").click(function (e) {
        e.preventDefault();
        $("#txt_search_u").val('');
        $("#grid_NguoiDung").data("kendoGrid").dataSource.filter({});
    });


    $("#wd_PhanCong").kendoWindow({
        draggable: false,
        height: "50%",
        width: "70%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Phân công thụ lý hồ sơ",
        visible: false

    }).data("kendoWindow");


    $("#tabstrip_ThanhToan").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        },
        select: function (e) {

            var content_tab = $(e.item).find("> .k-link").text().trim();
            switch (content_tab) {
                
                case "Tiến trình chuyển hồ sơ":

                    HienThi_Tab_ChuyenHS();
                    $("#tabstrip_ThanhToan-1").css('height', 'auto');
                    break;
                case "Tiếp nhận hồ sơ":

                    HienThi_Tab_TiepNhanHS();
                    $("#tabstrip_ThanhToan-2").css('height', 'auto');
                    break;

                case "Kiểm tra tính hợp lý của chứng từ":

                    HienThi_Tab_KiemTraHS();
                    $("#tabstrip_ThanhToan-3").css('height', 'auto');
                    break;
            }
        }
    });
    

    $("#grid_kiemtra").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        toolbar: function () {
            if ($("[id$=_hf_nt]").val().trim() == "") {
                return kendo.template($("#Templ_KiemTra_CW").html())
            } else {
                return kendo.template($("#Templ_KiemTra_NT").html())
            }
        },
        editable: true,
        navigatable: true,        
        columns: Col_grid_kiemtra
    });    
    
    

    $("#grid_tiepnhan").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        toolbar: kendo.template($("#Templ_TiepNhan").html()),
        editable: true,
        navigatable: true,
        columns: [
                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ngày chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayChungTu",
                        template: "#= NgayChungTu == null || NgayChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ngày nhận chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayNhan_ChungTu",
                        template: "#= NgayNhan_ChungTu == null || NgayNhan_ChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_ChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {

                            $('<input name="' + options.field + '"/>')
                               .appendTo(container)
                               .kendoDatePicker({
                                   format: "dd/MM/yyyy"
                               });


                        },
                        attributes: {
                            "class": "row_css",
                            style: "background-color:lightyellow;"
                        },
                        width: 100
                    },
                    {
                        title: "Ghi chú",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GhiChu",
                        attributes: {
                            class: "row_css",
                            style: "background-color:lightyellow;"
                        },
                        editor: function nonEditor(container, options) {
                            $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                    .appendTo(container)
                        },
                        width: 200
                    }
                    
        ]
    });

    $("#txt_NgayPhanCong").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayDK_HoanTat").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_Ngay_ThanhToan").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    
    $("#wd_HoanTat").kendoWindow({
        draggable: false,
        height: "auto",
        width: "40%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Cập nhật thông tin hoàn tất",
        visible: false

    }).data("kendoWindow");

    $("#grid_logs_kiemtra").kendoGrid({        
        pageable: {
            messages: {
                display: "Tổng số   {2}   dòng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },        
        columns:
            [

                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TinhTrang",
                    template: function (data) {
                        
                        if (data.TinhTrang == 0) {
                            return '<center><span class="label label-info">Đang kiểm tra tính hợp lý của chứng từ</span></center>';
                        }
                        else if (data.TinhTrang == 1) {
                            return '<center><span class="label label-important">Hồ sơ chưa hợp lý-hoàn trả nhà thầu</span></center>';
                        }
                        else if (data.TinhTrang == 2) {
                            return '<center><span class="label label-success">Hoàn tất hồ sơ thanh toán</span></center>';
                        }                        

                    }
                },
                {
                    title: "Thời gian thực hiện",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ngay_TH",
                    attributes: {
                        class: "row_css"
                    }
                },
                
                {
                    title: "Người thực hiện",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Nguoi_TH",
                    attributes: {
                        class: "row_css"
                    }
                }
            ],
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },        
        detailInit: function (e) {
            
            $("<div />").appendTo(e.detailCell).kendoGrid({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                                data: {
                                    cmd: 'Logs_KiemTra_Cap_2',
                                    KiemTra_ID: e.data.KiemTra_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
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
                    {
                        title: "Chứng từ sai sót",
                        field: "TinhTrang_CL",
                        headerAttributes: {
                            class: "header_css"
                        },
                        template: function (data) {
                            if (data.TinhTrang_CL == 0) {

                                return '<center><span class="label label-important">Lỗi</span></center>'
                            }
                            else if (data.TinhTrang_CL == 1) {
                                return '<center><span class="label label-success">Ok</span></center>';
                            }
                        },
                        sortable: false,
                        width: 80,
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Trung tâm Cung Ứng",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_CW",
                                template: "#= NgayTra_CW == null || NgayTra_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            },
                            {
                                title: "Lý do",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_CW",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_CW",
                                template: "#= NgayNhan_CW == null || NgayNhan_CW == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_CW, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Nhà thầu",
                        headerAttributes: {
                            class: "header_css",
                            style: "color:red !important;"
                        },
                        columns: [
                            {
                                title: "Ngày hoàn trả",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayTra_NT",
                                template: "#= NgayTra_NT == null || NgayTra_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayTra_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                      .appendTo(container)
                                      .kendoDatePicker({
                                          format: "dd/MM/yyyy"
                                      });
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            },
                            {
                                title: "Ghi chú",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu_NT",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                            .appendTo(container)
                                },
                                width: 200
                            },
                            {
                                title: "Ngày nhận chứng từ",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "NgayNhan_NT",
                                template: "#= NgayNhan_NT == null || NgayNhan_NT == '' ?  '' : kendo.toString(kendo.parseDate(NgayNhan_NT, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                editor: function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoDatePicker({
                                           format: "dd/MM/yyyy"
                                       });
                                },
                                attributes: {
                                    "class": "row_css"
                                },
                                width: 100
                            }
                        ]
                    },
                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },

                    {
                        title: "Ngày tiếp nhận chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayTiepNhan_ChungTu",
                        template: "#= NgayTiepNhan_ChungTu == null || NgayTiepNhan_ChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayTiepNhan_ChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                        editor: function (container, options) {

                            container.text(options.model[options.field]);

                        },
                        attributes: {
                            "class": "row_css"
                        },
                        width: 100
                    }
                  
                ]
            });
        }
    });


    $("#wd_logs_kiemtra").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",        
        modal: true,
        resizable: false,
        title: "",
        visible: false

    });
    $("#grid_logs").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   dòng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        columns:
            [

                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TinhTrang",
                    template: function (data) {

                        if (data.TinhTrang == 1) {
                            return '<center><span class="label label-info">Chuyển hồ sơ</span></center>';
                        }
                        else if (data.TinhTrang == 2) {
                            return '<center><span class="label label-important">Hoàn trả hồ sơ</span></center>';
                        }
                        else if (data.TinhTrang == 3) {
                            return '<center><span class="label label-success">Hồ sơ được tiếp nhận</span></center>';
                        }

                    }
                },
                {
                    title: "Thời gian thực hiện",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ngay_TH",
                    attributes: {
                        class: "row_css"
                    }
                },                
                {
                    title: "Người thực hiện",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Nguoi_TH",
                    attributes: {
                        class: "row_css"
                    }
                }
            ],
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function (e) {

            $("<div />").appendTo(e.detailCell).kendoGrid({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                                data: {
                                    cmd: 'Logs_Cap_2',
                                    PO_HD_Checklist_ID: e.data.PO_HD_Checklist_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
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

                    {
                        title: "Mã chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaChungTu",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 70
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TenChungTu",
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ngày chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayChungTu",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Ghi chú của nhà thầu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GhiChu_NhaThau",
                        attributes: {
                            class: "row_css"
                        },
                        width: 200
                    },
                    {
                        title: "Ghi chú của TTCW",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GhiChu_CW",
                        attributes: {
                            class: "row_css"
                        },
                        width: 200
                    }
                ]
            });
        }
    });


    $("#wd_logs").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: "",
        visible: false

    });
    

    $("#grid_checklist").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        toolbar: function () {
            if ($("[id$=_hf_nt]").val().trim() == "") {
                return kendo.template($("#Templ_Checklist_CW").html())
            } else {
                return kendo.template($("#Templ_Checklist_NT").html())
            }
        },
        editable: true,
        navigatable: true,
        columns: Col_grid_checklist
    });
  

    var notification = $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: 50,
            right: 450
        },
        autoHideAfter: 2000,
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
   
    //#endregion

    //#region bộ lọc


    $("#Tr_Loc_TinhTrang").hide();
    $("#Tr_Loc_Loai_PO").hide();
    $("#Tr_Loc_NgayKi_PO_1").hide();
    $("#Tr_Loc_NgayKi_PO_2").hide();
    $("#Tr_Loc_NhaThau_1").hide();
    $("#Tr_Loc_NhaThau_2").hide();
    $("#Tr_Loc_SoHD_1").hide();
    $("#Tr_Loc_SoHD_2").hide();

    $("#cmb_BoLoc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Tình trạng PO", value: "1" },
            { text: "Loại PO", value: "2" },
            { text: "Ngày kí PO", value: "3" },
            { text: "Nhà thầu", value: "4" },
            { text: "Số hợp đồng", value: "5" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            switch (value) {
                case "1":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});

                    $("#Tr_Loc_TinhTrang").show();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "2":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});


                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").show();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "3":

                    $("#txt_TuNgay").val("");
                    $("#txt_DenNgay").val("");


                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").show();
                    $("#Tr_Loc_NgayKi_PO_2").show();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "4":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").show();
                    $("#Tr_Loc_NhaThau_2").show();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "5":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});


                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").show();
                    $("#Tr_Loc_SoHD_2").show();


                    break;
                default:

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();
            }
        }
    });

    ////Lọc tình trang/////////////

    $("#cmb_Loc_TinhTrang").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Chưa xuất PO lớn", value: "0" },
            { text: "Đã xuất PO lớn", value: "1" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            var ds;

            if (value == "") {
                ds = new kendo.data.DataSource({

                    requestEnd: function (e) {
                        e.response.d = JSON.parse(e.response.d);
                    },
                    schema: {
                        data: 'd.Data',
                        total: 'd.Total[0].Total'
                    },
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true,
                    sort: {
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });

            }
            else {

                ds = new kendo.data.DataSource({

                    requestEnd: function (e) {
                        if (e.type)
                            e.response.d = JSON.parse(e.response.d);
                    },
                    schema: {
                        data: 'd.Data',
                        total: 'd.Total[0].Total'
                    },
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true,
                    sort: {
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_byTinhTrang",
                            data: {
                                TinhTrang: parseInt(value)
                            }
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_PO").data("kendoGrid").setDataSource(ds);



        }

    });
    ///////////////Lọc loại PO////////////////
    $("#cmb_Loc_Loai_PO").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "PO VTTP", value: "0" },
            { text: "PO Tập đoàn", value: "1" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;



            var ds;

            if (value == "") {
                ds = new kendo.data.DataSource({

                    requestEnd: function (e) {
                        e.response.d = JSON.parse(e.response.d);
                    },
                    schema: {
                        data: 'd.Data',
                        total: 'd.Total[0].Total'
                    },
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true,
                    sort: {
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });

            }
            else {

                ds = new kendo.data.DataSource({

                    requestEnd: function (e) {
                        if (e.type)
                            e.response.d = JSON.parse(e.response.d);
                    },
                    schema: {
                        data: 'd.Data',
                        total: 'd.Total[0].Total'
                    },
                    pageSize: 5,
                    serverPaging: true,
                    serverSorting: true,
                    sort: {
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_byLoaiPO",
                            data: {
                                LoaiPO: parseInt(value)
                            }
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_PO").data("kendoGrid").setDataSource(ds);


        }

    });

    ////////////Lọc ngày kí//////////////

    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#btn_huy_loc_ngay").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);


    });


    $("#btn_loc_ngay").click(function () {

        DS_PO_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_Ngay',
                            TuNgay: $("#txt_TuNgay").val(),
                            DenNgay: $("#txt_DenNgay").val()
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
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

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);




    });

    ///////////////Lọc theo nhà thầu///////////////////////////////

    $("#cmb_Loc_NhaThau").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DanhMuc.aspx",
                        data: {
                            cmd: 'DS_NhaThau'
                        },
                        dataType: 'json',
                        success: function (result) {
                            //options.success(result);
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        })
    });

    $("#btn_huy_loc_nt").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);

    });


    $("#btn_loc_nt").click(function () {


        DS_PO_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_NT',
                            NhaThau_ID: $("#cmb_Loc_NhaThau").data("kendoDropDownList").value()
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
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

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);


    });
    ///////////////////Lọc hợp đồng ///////////////////////

    $("#cmb_Loc_SoHD").kendoComboBox({
        placeholder: "--Chọn hợp đồng--",
        dataTextField: "MaHD",
        dataValueField: "HopDong_ID",
        filter: "startswith",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_HD_Ctr'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
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
        }

    });
    $("#btn_huy_loc_hd").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);



    });
    $("#btn_loc_hd").click(function () {


        if ($("#cmb_Loc_SoHD").data("kendoComboBox").select() == -1) {

            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn đúng mã hợp đồng!",
                message: "Hãy chọn hợp đồng!"
            }, "error");
        }
        else {
            DS_PO_Loc = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_PO_Cha.aspx",
                            data: {
                                cmd: 'Lay_DS_PO_HD',
                                HopDong_ID: $("#cmb_Loc_SoHD").data("kendoComboBox").value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
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
            $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);
        }
    });
    //#endregion

    //#region Load Danh sach PO 

    var gvData = $("#grid_PO").kendoGrid({

        toolbar: kendo.template($("#Templ_PO").html()),
        detailTemplate: kendo.template($("#Templ_ChiTiet_PO").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));

        },
        pageable: {
            messages: {
                display: "Tổng số   {2}   PO",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        detailInit: Ham_ChiTiet_PO,
        sortable: true,
        columns:
            [
                {
                    template: function (data) {
                        if (data.TinhTrang == '0') {

                            return '<center><input type="button" style="cursor: text;" class="button_mokhoa" /></center>';
                        }
                        else {
                            return '<center><input type="button" style="cursor: text;" class="button_khoa" /></center>';
                        }

                    },
                    width: "7%"
                },
                {

                    template: function (data) {

                        if (data.Check_PO == '0') {

                            return '<center><span class="label label-success">Chưa xuất</span></center>';
                        }
                        else {
                            return '<center><span class="label label-important">Đã xuất</span></center>';
                        }
                    },
                    width: "8%"
                },
                {
                    title: "Số PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoPO",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày ký PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKyPO",
                    attributes: {
                        class: "row_css"
                    },
                    template: "#= NgayKyPO_f #"
                },
                {
                    title: "Số văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVanBan",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Người lập PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NguoiTaoPO",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: function (data) {
                        if (data.FileVB == "" || data.FileVB == null) {
                            return '';
                        } else {
                            return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i> Tải</a></center>';
                        }
                    },
                    width: "9%"
                }
            ]
    });
    $("#txt_search_soPO").kendoAutoComplete({
        dataTextField: "SoPO",
        filter: "contains",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_SoPO'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        }
    });
    $("#txt_search_soPO").data("kendoAutoComplete").dataSource.read();

    $('#txt_search_soPO').keydown(function (e) {
        if (e.which === 13)
            filterPO();
    });

    $('#btn_tim_soPO').click(function (e) {
        e.preventDefault();
        filterPO();
    });

    $('#btn_clear_soPO').click(function (e) {
        e.preventDefault();
        $('#txt_search_soPO').val('');
        filterPO();
    });

    //#endregion


    //#region event
    
    $("#btn_PhanCong").click(function () {
        Ham_PhanCong();        
    });
    $("#btn_CapNhat_TiepNhan").click(function () {
        Ham_CapNhat_TiepNhan();
    });
    $("#btn_Chuyen_NV").click(function () {
        Ham_Chuyen_NV();        
    });
 
    $("#btn_HoanTat_HS").click(function () {
        Ham_HoanTat();
    });
    $("#btn_HoanTat_Luu").click(function () {
        Ham_HoanTat_Luu();
    });
    



    //#endregion



    $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);



});
//#region Hiển thị chi tiết PO
function Ham_ChiTiet_PO(f) {

    BienChiTietPO = f;

    var detailRow = f.detailRow;


    detailRow.find("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        },
        select: function (e) {

            //alert($("#tabstrip").data("kendoTabStrip").select().index());
            //$(e.item).find("> .k-link").text().trim()
            //alert(this.select().index());

            var content_tab = $(e.item).find("> .k-link").text().trim();
            switch (content_tab) {
                case "Danh sách đơn vị tham gia PO":
                    //#region Hiển thị danh sách đơn vị tham gia PO

                    detailRow.find("#tab_DonVi").empty();
                    detailRow.find("#tab_DonVi").kendoGrid({

                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                                        data: {
                                            cmd: 'PO_DonVi_SelectbyPO_ID',
                                            PO_ID: f.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            //options.success(result);
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    });
                                }
                            },
                            pageSize: 8
                        }),
                        sortable: true,
                        pageable: {
                            messages: {
                                display: "Tổng số   {2}   đơn vị",
                                empty: "Không có dữ liệu",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"

                            }
                        },
                        columns:
                            [
                                {
                                    title: "STT",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "STT",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: "30%"
                                },
                                {
                                    title: "Đơn vị",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "DonVi_Ten",
                                    attributes: {
                                        class: "row_css"
                                    }
                                }
                            ]
                    });
                    //#endregion
                    break;
                case "Hiển thị phân rã đơn vị":
                    //#region Hiển thị Phân rã đơn vị
                    detailRow.find("#tab_PhanRa_DV").empty();
                    detailRow.find("#tab_PhanRa_DV").kendoGrid({

                        dataSource: new kendo.data.DataSource({

                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Con.aspx",
                                        data: {
                                            cmd: 'Lay_DS_PO_Con',
                                            PO_ID: f.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    });
                                }
                            }

                        }),
                        pageable: {
                            messages: {
                                display: "Tổng số   {2}   đơn vị",
                                empty: "Không có dữ liệu",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"
                            }
                        },
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        detailInit: function (e) {
                            e.detailCell.empty();
                            $("<div/>").appendTo(e.detailCell).kendoGrid({
                                dataSource: new kendo.data.DataSource({
                                    transport: {
                                        read: function (options) {
                                            $.ajax({
                                                type: "POST",
                                                url: "assets/ajax/Ajax_PO_CT.aspx",
                                                data: {
                                                    cmd: 'PO_CT_SelectByPO_ID_Con',
                                                    PO_ID_Con: e.data.PO_ID_Con
                                                },
                                                dataType: 'json',
                                                success: function (result) {
                                                    if (result == "err401") {
                                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                        window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                                    }
                                                    else {
                                                        options.success(result);
                                                    }
                                                }
                                            });
                                        }
                                    },
                                    aggregate: [
                                            { field: "ThanhTien", aggregate: "sum" }
                                    ]
                                }),
                                columns:
                                    [
                                    {
                                        title: "Vật tư",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "VatTu_Ten",
                                        attributes: {
                                            class: "row_css"
                                        }
                                    },
                                    {
                                        title: "Số lượng",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "SoLuong",
                                        template: "#= OnChangeFormat(SoLuong) #",
                                        attributes: {
                                            class: "row_css"
                                        }
                                    },
                                    {
                                        title: "Đơn giá",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "DonGia",
                                        template: "#= OnChangeFormat(DonGia) #",
                                        attributes: {
                                            class: "row_css"
                                        }
                                    },
                                    {
                                        title: "Đơn vị tính",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "TenDVT",
                                        attributes: {
                                            class: "row_css"
                                        }
                                    },
                                    {
                                        title: "Thành tiền",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "ThanhTien",
                                        template: "#= OnChangeFormat(ThanhTien) #",
                                        attributes: {
                                            class: "row_css"
                                        },
                                        aggregates: ["sum"],
                                        footerTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                                        groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                                    },
                                    {
                                        title: "VAT",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "VAT",
                                        template: "#= OnChangeFormat(VAT) #",
                                        attributes: {
                                            class: "row_css"
                                        }
                                    }
                                    ]
                            });
                        },
                        columns:
                            [
                                {
                                    title: "Đơn vị",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "DonVi_Ten",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight: bold !important;text-align: left !important;"
                                    }
                                }
                            ]


                    });

                    //#endregion
                case "Danh sách PO con đã xuất":

                    //#region Hiển thị Danh sách PO con đã xuất


                    DS_PO_Con = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    type: "POST",
                                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                                    data: {
                                        cmd: 'PONT_Select_By_PO',
                                        PO_ID: f.data.PO_ID
                                    },
                                    dataType: 'json',
                                    success: function (result) {
                                        if (result == "err401") {
                                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                            window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                        }
                                        else {

                                            if (result.length == 0) {
                                                $("#tab_PO_Con .k-grid-header").css('display', 'none');
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        //pageSize: 8
                    });

                    detailRow.find("#tab_PO_Con").empty();
                    detailRow.find("#tab_PO_Con").kendoGrid({

                        dataSource: DS_PO_Con,
                        sortable: true,
                        pageable: {
                            messages: {
                                display: "Tổng số   {2}   PO con",
                                empty: "Chưa xuất PO con ",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"

                            }
                        },
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        detailInit: function (e) {


                            DS_TamUng = new kendo.data.DataSource({
                                transport: {
                                    read: function (options) {
                                        $.ajax({
                                            type: "POST",
                                            url: "assets/ajax/Ajax_TamUng.aspx",
                                            data: {
                                                cmd: 'HienThi_TamUng_byPO_NhaThau_ID',
                                                PO_NhaThau_ID: e.data.PO_NhaThau_ID
                                            },
                                            dataType: 'json',
                                            success: function (result) {
                                                if (result == "err401") {
                                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                    window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        });
                                    }
                                },
                                aggregate: [
                                    { field: "GiaTri_DeNghi", aggregate: "sum" }
                                ]
                            });


                            $("<div/>").appendTo(e.detailCell).kendoGrid({

                                dataSource: DS_TamUng,
                                pageable: {
                                    messages: {
                                        display: "Tổng số   {2}   lần tạm ứng",
                                        empty: "Chưa có tạm ứng ",
                                        page: "Trang",
                                        of: "of {0}",
                                        itemsPerPage: "Số mục trong một trang"

                                    }
                                },
                                dataBound: function () {
                                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                                },
                                detailExpand: function (e) {
                                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                                },
                                detailInit: function (g) {

                                    $("<div/>").appendTo(g.detailCell).kendoGrid({
                                        dataSource: {
                                            transport: {
                                                read: function (options) {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "assets/ajax/Ajax_TamUng.aspx",
                                                        data: {
                                                            cmd: 'HienThi_TamUng_ThanhVien',
                                                            TamUng_ID: g.data.TamUng_ID
                                                        },
                                                        dataType: 'json',
                                                        success: function (result) {
                                                            if (result == "err401") {
                                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                                                            }
                                                            else {
                                                                options.success(result);
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        pageable: {
                                            messages: {
                                                display: "Tổng số   {2}   thành viên",
                                                empty: "Chưa có tạm ứng ",
                                                page: "Trang",
                                                of: "of {0}",
                                                itemsPerPage: "Số mục trong một trang"

                                            }
                                        },
                                        columns:
                                            [

                                                {
                                                    title: "Thành viên",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "Ten_ThanhVien",
                                                    attributes: {
                                                        class: "row_css",
                                                        style: "font-weight:bold;"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Giá trị đề nghị",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "GiaTri_DeNghi",
                                                    template: "#= GiaTri_DeNghi== null ? 0 : OnChangeFormat(GiaTri_DeNghi) #",
                                                    attributes: {
                                                        class: "row_css",
                                                        style: "font-weight:bold;"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Số VB đề nghị",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "SoVB_DeNghi",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
		                                       {
		                                           title: "Ngày VB đề nghị",
		                                           headerAttributes: {
		                                               class: "header_css"
		                                           },
		                                           field: "NgayVB_DeNghi",
		                                           attributes: {
		                                               class: "row_css"
		                                           },
		                                           width: 150
		                                       },
                                               {
                                                   title: "Tài khoản thụ hưởng",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "TaiKhoanThuHuong",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
                                               {
                                                   title: "Tại ngân hàng",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "TaiNganHang",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
                                                {
                                                    title: "Số VB bão lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "SoVB_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Ngày VB bão lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NgayVB_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 150
                                                },
                                                {
                                                    title: "Ngân hàng phát hành",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NganHang_PhatHanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Ngày hiệu lực bảo lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NgayHieuLuc_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 150
                                                },


                                               {
                                                   title: "Số VB chuyển HS đề nghị",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "SoVB_ChuyenHS_DeNghi",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
		                                        {
		                                            title: "Ngày VB chuyển HS đề nghị",
		                                            headerAttributes: {
		                                                class: "header_css"
		                                            },
		                                            field: "NgayVB_ChuyenHS_DeNghi",
		                                            attributes: {
		                                                class: "row_css"
		                                            },
		                                            width: 200
		                                        }
                                            ]
                                    });
                                },
                                columns:
                                    [
                                        {
                                            template: function (data) {
                                                if (data.TinhTrang_TamUng == '0') {
                                                    return '<center><a class="btn btn-info" onclick="Ham_Sua_TamUng(' + data.TamUng_ID + ',\'' + data.SoVB_TamUng + '\',\'' + data.NgayVB_TamUng_f + '\',\'' + data.GiaTri_DeNghi + '\',\'' + data.GiaTri_PO + '\',\'' + data.SoVB_XacNhan_HieuLuc_PO + '\',\'' + data.NgayVB_XacNhan_HieuLuc_PO_f + '\');"><i class="fa fa-edit "></i> Sửa</a></center>'
                                                }
                                                else {
                                                    return ''
                                                }
                                            },
                                            width: 80
                                        },
                                        {

                                            template: function (data) {
                                                if (data.TinhTrang_TamUng == '0') {
                                                    return '<center><a class="btn btn-danger" onclick="Ham_Xoa_TamUng(' + data.TamUng_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                                                } else {
                                                    return ''
                                                }
                                            },
                                            width: 80
                                        },
                                        {
                                            title: "Lần",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "STT",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 80
                                        },
                                        {
                                            title: "Giá trị tạm ứng",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "GiaTri_DeNghi",
                                            template: "#= OnChangeFormat(GiaTri_DeNghi) #",
                                            aggregates: ["sum"],
                                            footerTemplate: "<div class=\"row_css\" >Tổng tạm ứng:<br><div style=\"color:red;\"> #=OnChangeFormat(sum) # </div></div>",
                                            attributes: {
                                                class: "row_css",
                                                style: "font-weight:bold;"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Số VB xác nhận hiệu lực PO",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "SoVB_XacNhan_HieuLuc_PO",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Ngày VB xác nhận hiệu lực PO",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "NgayVB_XacNhan_HieuLuc_PO_f",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Số VB bảo lãnh",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "SoVB_TamUng",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Ngày VB bảo lãnh",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "NgayVB_TamUng_f",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        }
                                    ]
                            });
                        },


                        columns:
                            [
                                //{
                                //    title: "Tình trạng",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "TinhTrang_ThanhToan",
                                //    template: function (data) {

                                //        if (data.TinhTrang_ThanhToan == '0') {
                                //            return '<center><span class="label label-success">Chưa thanh toán</span></center>';
                                //        }
                                //        else {
                                //            return '<center><span class="label label-important">Đã thanh toán</span></center>';
                                //        }
                                //    },
                                //    width: "12%"
                                //},
                                {
                                    title: "Khóa Tạm Ứng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    template: function (data) {
                                        if (data.TinhTrang_TamUng == '0') {

                                            return '<center><input type="button" style="cursor: text;" class="button_mokhoa" /></center>';
                                        }
                                        else {
                                            return '<center><input type="button" class="button_khoa" /><div style="color:green;font-weight:bold;">Chuyển kế toán</div><div style="font-weight:bold;">' + data.TW_HS + '</div><div style="font-weight:bold;">' + data.TW_NgayChuyen_KeToan_f + '</div></center>';
                                        }
                                    },
                                    width: 200
                                },
                                {
                                    title: "Số hợp đồng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "MaHD",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },
                                {
                                    title: "Nhà thầu",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "NhaThau_Ten",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },

                                {
                                    title: "Số VB gửi nhà thầu",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoVB",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },
                                //{
                                //    title: "Ngày VB",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayVB",
                                //    template: "#= NgayVB_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }                                    
                                //},
                                {
                                    title: "File VB",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "FileVB",
                                    template: function (data) {
                                        if (data.FileVB == "" || data.FileVB == null) {
                                            return '';
                                        } else {
                                            return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i> Tải</a></center>';
                                        }
                                    },
                                    width: "9%"
                                },
                                //{
                                //    title: "Ngày xuất PO",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayTaoDonHang",
                                //    template: "#= NgayTaoDonHang_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
                                {
                                    title: "Tổng thanh toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "TongTienThanhToan",
                                    template: "#= OnChangeFormat(TongTienThanhToan) #",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"

                                    },
                                    width: "15%"
                                },
                                {

                                    template: function (data) {
                                        if (data.TinhTrang_TamUng == '0') {
                                            return '<center><a class="btn btn-info" onclick="Ham_TamUng(' + data.PO_NhaThau_ID + ',' + data.NhaThau_ID + ',' + data.TongTienThanhToan + ');"><i class="fa fa-money"></i> Tạm ứng</a></center>'
                                        }
                                        else {
                                            return ''
                                        }
                                    },
                                    width: "15%"
                                }
                                //{
                                //    title: "Ngày bắt đầu",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayBatDau",
                                //    template: "#= NgayBatDau_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
                                //{
                                //    title: "Ngày kết thúc",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayKetThuc",
                                //    template: "#= NgayKetThuc_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
                            ]
                    });
                    //#endregion
            }
        }
    });

    //#region Hiển thị phân rã vật tư    



    DS_BangKe_Cap1 = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'DS_BangKe_Cap1_ThanhToan',
                        PO_ID: f.data.PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize: 8,
        group:
                [
                    {
                        field: "MaHD",
                        aggregates: [
                                { field: "ThanhTien_PO", aggregate: "sum" },
                                { field: "ThanhTien_ThanhToan", aggregate: "sum" }
                        ]
                    }

                ]
    });

    ///////////////////////////////////////
    detailRow.find("#tab_VatTu").empty();
    detailRow.find("#tab_VatTu").kendoGrid({

        dataSource: DS_BangKe_Cap1,
        sortable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        columns: [

                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    groupHeaderTemplate: "#= Ham_HienThi_Xuat_PO( value ) #",
                    hidden: true,
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenNhaThau",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:blue;"
                    },
                    hidden: true
                },
                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%",
                    groupFooterTemplate: function (data) {

                        if (data.ThanhTien_ThanhToan.sum == null) {
                            return "<div class=\"row_css\">Tỷ lệ thực hiện PO: </div></br><div style=\"color:red;\" class=\"row_css\">0 %</div>";
                        } else {
                            return "<div class=\"row_css\">Tỷ lệ thực hiện PO:</div></br><div style=\"color:red;\" class=\"row_css\">" + OnChangeFormat(((data.ThanhTien_ThanhToan.sum / data.ThanhTien_PO.sum) * 100).toFixed(3)) + " %</div>";
                        }

                    }
                },
                {
                    title: "Số lượng tổng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: "#= OnChangeFormat(SoLuong_PO) #",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-weight:bold;"
                    }
                },
                {
                    title: "Số lượng tổng thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan",
                    template: function (data) {
                        if (data.SoLuong_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.SoLuong_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "color:green;font-weight:bold;background-color:lightyellow;"
                    }
                },
                {
                    title: "Đơn giá PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonGia",
                    template: "#= OnChangeFormat(DonGia) #",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Đơn giá thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonGia_ThanhToan",
                    template: function (data) {
                        if (data.DonGia_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.DonGia_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    }
                },
                {
                    title: "Đơn vị tính",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDVT",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Thành tiền PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    width: "15%",
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng PO:</div></br><div style=\"color:green;\" class=\"row_css\">#=OnChangeFormat(sum) #</div>"

                },
                {
                    title: "Thành tiền thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_ThanhToan",
                    template: function (data) {
                        if (data.ThanhTien_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.ThanhTien_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: "15%",
                    aggregates: ["sum"],
                    groupFooterTemplate: function (data) {

                        if (data.ThanhTien_ThanhToan.sum == null) {
                            return "<div class=\"row_css\">Tổng thanh toán: </div></br><div style=\"color:green;\" class=\"row_css\">0</div>";
                        } else {
                            return "<div class=\"row_css\">Tổng thanh toán:</div></br><div style=\"color:green;\" class=\"row_css\">" + OnChangeFormat(data.ThanhTien_ThanhToan.sum) + "</div>";
                        }

                    }
                }
        ],
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: Ham_ChiTiet_VatTu

    });



    ///////////////////////////////////////


    //#endregion   
}


function Ham_HienThi_Xuat_PO(value) {


    var arr_dv = value.split("*");

    if (arr_dv[0] == "0") {

        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-success" style="margin-left:10px !important;">Chưa xuất PO con</span><span style="margin-left:50px !important;margin-right:10px !important;" class="btn btn-info" onclick ="Ham_Chuyen_HS_TT(\'' + arr_dv[3] + ' \', ' + arr_dv[1] + ');"><i class="fa fa-money"></i> Chuyển hồ sơ thanh toán</span>';

    }
    else {

        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span><span style="margin-left:50px !important;margin-right:10px !important;" class="btn btn-info" onclick ="Ham_Chuyen_HS_TT(\'' + arr_dv[3] + ' \', ' + arr_dv[1] + ');"><i class="fa fa-money"></i> Chuyển hồ sơ thanh toán</span>';
    }


}
function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");

    return "<b>Số hợp đồng: " + arr_dv[2] + "</b>";
}
//#endregion 

//#region Hiển thị chi tiết vật tư
function Ham_ChiTiet_VatTu(e) {

    Bien_ChiTiet_VatTu = e;

    $("<div style='width:50%;' />").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                        data: {
                            cmd: 'DS_BangKe_Cap2',
                            PO_ID: BienChiTietPO.data.PO_ID,
                            VatTu_ID: e.data.VatTu_ID,
                            HopDong_ID: e.data.HopDong_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan_PO.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        pageable: {
            messages: {
                display: "Tổng số   {2}   đơn vị",
                empty: "Chưa phân rã",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        columns:
            [
                {
                    title: "Đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: function (data) {
                        if (data.TinhTrang_DC == 0) {
                            return '' + OnChangeFormat(data.SoLuong) + '';
                        } else {
                            return '' + OnChangeFormat(data.SoLuong) + '</br><a>(Đã điều chỉnh)</a>';
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;"
                    }
                },
                {
                    title: "Số lượng thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan",
                    template: function (data) {
                        if (data.SoLuong_ThanhToan == null) {
                            return 0;
                        } else {
                            return '' + OnChangeFormat(data.SoLuong_ThanhToan) + '';
                        }


                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
                    }
                }
            ]
    });

}

//#endregion

//#region bộ lọc PO
function filterPO() {

    var ds;

    if ($('#txt_search_soPO').val().trim() !== '') {

        ds = new kendo.data.DataSource({

            requestEnd: function (e) {
                if (e.type)
                    e.response.d = JSON.parse(e.response.d);
            },
            schema: {
                data: 'd.Data',
                total: 'd.Total[0].Total'
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            sort: {
                field: 'PO_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_bySoPO",
                    data: {
                        SoPO: $('#txt_search_soPO').val().trim()
                    }
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
    }
    else {

        ds = new kendo.data.DataSource({

            requestEnd: function (e) {
                e.response.d = JSON.parse(e.response.d);
            },
            schema: {
                data: 'd.Data',
                total: 'd.Total[0].Total'
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true,
            sort: {
                field: 'PO_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
    }

    $("#grid_PO").data("kendoGrid").setDataSource(ds);
}//#endregion


//#region Hiển thị chuyển hồ sơ thanh toán

function Ham_Chuyen_HS_TT(p_HopDong_ID, p_PO_ID) {

    $('#div_HS_ThanhToan').show();
    $('#btn_Back').show();
    $('#div_po').hide();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'Get_Buoc_TienTrinh',
                        HopDong_ID: p_HopDong_ID,
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });


    ds.fetch(function () {


        var view = ds.view();


        $('#lb_SoPO').text(view[0].SoPO);
        $('#lb_MaHD').text(view[0].MaHD);

        var tabstrip_ThanhToan = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");

        switch (view[0].Buoc) {         
            case 1:
                $('#lb_Buoc').text('Tiến trình thanh toán tới bước : CHUYỂN HỒ SƠ THỤ LÝ');
                tabstrip_ThanhToan.select(0);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(0), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(1), false);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(2), false);

                HienThi_Tab_ChuyenHS();
                
                break;
            case 2:
                $('#lb_Buoc').text('Tiến trình thanh toán tới bước : TIẾP NHẬN HỒ SƠ');

                tabstrip_ThanhToan.select(1);                                               
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(0), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(1), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(2), false);
                
                HienThi_Tab_TiepNhanHS();

                break;
            case 3:
                $('#lb_Buoc').text('Tiến trình thanh toán tới bước : KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ');
                $("#tabstrip_ThanhToan").data("kendoTabStrip").select(2);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(0), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(1), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(2), true);
                HienThi_Tab_KiemTraHS();

                
                break;
            default:
                $('#lb_Buoc').text('CHƯA CHUYỂN HỒ SƠ THỤ LÝ');
                
                tabstrip_ThanhToan.select(0);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(0), true);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(1), false);
                tabstrip_ThanhToan.enable(tabstrip_ThanhToan.tabGroup.children().eq(2), false);

                HienThi_Tab_ChuyenHS();

        }

    });


    HopDong_ID = p_HopDong_ID;
    PO_ID = p_PO_ID;

}

function Ham_TroLai() {

    $('#div_HS_ThanhToan').hide();
    $('#btn_Back').hide();
    $('#div_po').show();

  
}

//#endregion
//#region Tiến trình chuyển hồ sơ

function Ham_Chuyen_Checklist_CW() {

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'CapNhat_Checklist',
            gData: JSON.stringify($("#grid_checklist").data("kendoGrid").dataSource.view()),
            HopDong_ID: HopDong_ID,
            PO_ID: PO_ID,
            TinhTrang: 1
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(HopDong_ID, PO_ID);

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

function Ham_Chuyen_Checklist_NT() {

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'CapNhat_Checklist',
            gData: JSON.stringify($("#grid_checklist").data("kendoGrid").dataSource.view()),
            HopDong_ID: HopDong_ID,
            PO_ID: PO_ID,
            TinhTrang: 2
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(HopDong_ID, PO_ID);

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

function Ham_TiepNhan_Checklist() {

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'TiepNhan_HS',
            gData: JSON.stringify($("#grid_checklist").data("kendoGrid").dataSource.view()),
            HopDong_ID: HopDong_ID,
            PO_ID: PO_ID,
            TinhTrang: 3
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(HopDong_ID, PO_ID);

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

function Ham_Xem_Logs() {


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'Logs_Cap_1',
                        HopDong_ID: HopDong_ID,
                        PO_ID: PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });


    $("#grid_logs").data("kendoGrid").setDataSource(ds);

    $("#wd_logs").data("kendoWindow").center().open();
}
//#endregion

//#region phân công người nhận hồ sơ

function Ham_CapNhat_PhanCong() {

    
    $("#wd_PhanCong").data().kendoWindow.close();


    var grid = $("#grid_NguoiDung").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());


    if (selectedItem.Hinh == null) {
        $(".employee-photo").attr("style", "background-image: url(Images/user-icon.png);");
    }
    else {
        $(".employee-photo").attr("style", "background-image: url(" + selectedItem.Hinh + ");");
    }
    $(".employee-name").text(selectedItem.TenNguoiDung);
    
}

//#endregion


//#region Hiển thị tab chuyển hồ sơ
function HienThi_Tab_ChuyenHS() {

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'HienThi_Checklist_HopDong_PO',
                        HopDong_ID: HopDong_ID,
                        PO_ID: PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);

                            if (result.length > 0) {
                                $('#lb_SoLan').text(result[0].Lan);

                                $('#lb_Nguoi_TH_CW').text(result[0].Nguoi_TH_CW);
                                $('#lb_Nguoi_TH_NT').text(result[0].Nguoi_TH_NT);

                                $('#lb_Ngay_TH_CW').text(result[0].Ngay_TH_CW);
                                $('#lb_Ngay_TH_NT').text(result[0].Ngay_TH_NT);


                                if (result[0].TinhTrang == 1) {

                                    $('#lb_TinhTrang').text('ĐÃ CHUYỂN - CHỜ TIẾP NHẬN').attr('style', 'color:red;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").addClass('disabled');
                                    $("#btn_Chuyen_CL_CW").removeClass('disabled');
                                    $("#btn_TiepNhan_CL").removeClass('disabled');

                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), false);

                                }
                                else if (result[0].TinhTrang == 2) {

                                    $('#lb_TinhTrang').text('HOÀN TRẢ HỒ SƠ').attr('style', 'color:red;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").removeClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');


                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), false);
                                }
                                else if (result[0].TinhTrang == 3) {

                                    $('#lb_TinhTrang').text('ĐÃ TIẾP NHẬN HỒ SƠ').attr('style', 'color:green;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").addClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');

                                    //$($("#tabstrip_ThanhToan").data("kendoTabStrip").items()[1]).attr("style", "display:inline;");

                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), true);

                                }
                                else {
                                    $('#lb_TinhTrang').text('CHỜ NHÀ THẦU CHUYỂN HỒ SƠ').attr('style', 'color:red;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").removeClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');

                                    //$($("#tabstrip_ThanhToan").data("kendoTabStrip").items()[1]).attr("style", "display:none");

                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), false);
                                }
                            }
                            else {
                                $('#lb_SoLan').text(0);
                                alert("Hợp đồng chưa tạo checklist!");

                            }                            
                        }
                    }
                });
            }
        }
    });

    $("#grid_checklist").data("kendoGrid").setDataSource(ds);
}


//#endregion

//#region Hiển thị tab tiếp nhận hồ sơ
function HienThi_Tab_TiepNhanHS() {

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'HienThi_TiepNhan',
                        HopDong_ID: HopDong_ID,
                        PO_ID: PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);

                            if (result.length > 0) {
                                $("#txt_Ma_HS").val(result[0].Ma_HS);
                                $("#txt_NgayPhanCong").val(result[0].Ngay_PhanCong);

                                //-- xử lý nhân viên thụ lý --\\
                                if (result[0].Nguoi_PhanCong == null) {
                                    $(".employee-photo").attr("style", "background-image: url(Images/user-none-icon.jpg);");
                                    $(".employee-name").text('Chưa phân công');
                                }
                                else {
                                    $("#lb_Nguoi_PhanCong").text(result[0].Nguoi_PhanCong);

                                    if (result[0].Hinh_Nguoi_PhanCong == null) {
                                        $(".employee-photo").attr("style", "background-image: url(Images/user-icon.png);");
                                    }
                                    else {
                                        $(".employee-photo").attr("style", "background-image: url(" + result[0].Hinh_Nguoi_PhanCong + ");");
                                    }
                                }

                                //-- xử lý tình trạng xử lý --\\
                                if (result[0].TinhTrang == 0) {
                                    $("#lb_TinhTrang_TiepNhan").text("ĐANG TIẾP NHẬN HỒ SƠ").attr("style", "color:red;font-weight:bold;");


                                    $("#btn_CapNhat_TiepNhan").removeClass('disabled');
                                    $("#btn_Chuyen_NV").removeClass('disabled');
                                    $("#btn_PhanCong").removeClass('disabled');

                                }
                                else if (result[0].TinhTrang == 1) {
                                    $("#lb_TinhTrang_TiepNhan").text("ĐÃ CHUYỂN HỒ SƠ CHO NHÂN VIÊN THỤ LÝ").attr("style", "color:green;font-weight:bold;");

                                    $("#btn_CapNhat_TiepNhan").addClass('disabled');
                                    $("#btn_Chuyen_NV").addClass('disabled');
                                    $("#btn_PhanCong").addClass('disabled');


                                }
                            }

                        }
                    }
                });
            }
        }
    }); 
    $("#grid_tiepnhan").data("kendoGrid").setDataSource(ds);

    
    
  



}

//#endregion

//#region Các chức năng của bước tiếp nhận hồ sơ

function Ham_PhanCong() {

    $("#wd_PhanCong").data().kendoWindow.center().open();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_HopDong.aspx",
                    data: {
                        cmd: 'Get_Users_KeToan'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize: 5
    });

    $("#grid_NguoiDung").data("kendoGrid").setDataSource(ds);
    $("#txt_search_u").data("kendoAutoComplete").setDataSource(ds);
}

function Ham_CapNhat_TiepNhan() {
    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'CapNhat_TiepNhan_HS',
            gData: JSON.stringify($("#grid_tiepnhan").data("kendoGrid").dataSource.view()),
            MaHoSo: $("#txt_Ma_HS").val(),
            Ngay_PhanCong: $("#txt_NgayPhanCong").val(),
            Nguoi_PhanCong: $("#lb_Nguoi_PhanCong").text()
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã cập nhật thành công!"
            }, "upload-success");


            HienThi_Tab_TiepNhanHS();

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

function Ham_Chuyen_NV() {

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'Chuyen_KT_HS',
            TiepNhan_ID: $("#grid_tiepnhan").data("kendoGrid").dataSource.view()[0].TiepNhan_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");

            Ham_Chuyen_HS_TT(HopDong_ID,PO_ID);

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

//#endregion



function HienThi_Tab_KiemTraHS() {


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'HienThi_KiemTra',
                        HopDong_ID: HopDong_ID,
                        PO_ID: PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);
                            

                            if (result.length > 0) {

                                
                                $("#lb_SoLan_KiemTra").text(result[0].Lan);
                                $("#txt_NgayDK_HoanTat").val(result[0].Ngay_HoanTat_Xem);
                                $("#lb_NgayThanhToan").text(result[0].Ngay_ThanhToan);
                                
                                KiemTra_ID = result[0].KiemTra_ID;
                                //-- xử lý tình trạng xử lý --\\

                                
                                if (result[0].TinhTrang == 0) {
                                    $("#lb_TinhTrang_KiemTra").text("ĐANG KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ").attr("style", "color:#fabb3d;font-weight:bold;");

                                    
                                    $("#btn_Chuyen_KiemTra_CW").removeClass('disabled');
                                    $("#btn_HoanTat_HS").removeClass('disabled');

                                    $("#btn_Chuyen_KiemTra_NT").addClass('disabled');

                                    
                                }
                                else if (result[0].TinhTrang == 1) {
                                    $("#lb_TinhTrang_KiemTra").text("HỒ SƠ CHƯA HỢP LÝ - HOÀN TRẢ NHÀ THẦU").attr("style", "color:red;font-weight:bold;");

                                    $("#btn_Chuyen_KiemTra_CW").addClass('disabled');
                                    $("#btn_HoanTat_HS").addClass('disabled');

                                }

                                else if (result[0].TinhTrang == 2) {

                                    $("#grid_kiemtra").data("kendoGrid").setOptions({
                                        columns: [

                                            {
                                                title: "Chứng từ sai sót",
                                                field: "TinhTrang_CL",
                                                headerAttributes: {
                                                    class: "header_css"
                                                },
                                                template: function (data) {
                                                    if (data.TinhTrang_CL == 0) {

                                                        return '<center><span class="label label-important">Lỗi</span></center>'
                                                    }
                                                    else if (data.TinhTrang_CL == 1) {
                                                        return '<center><span class="label label-success">Ok</span></center>';
                                                    }
                                                },
                                                sortable: false,
                                                width: 80,
                                                attributes: {
                                                    class: "row_css"
                                                }
                                            },
                                            {
                                                title: "Mã chứng từ",
                                                headerAttributes: {
                                                    class: "header_css"
                                                },
                                                field: "MaChungTu",
                                                editor: function nonEditor(container, options) {
                                                    container.text(options.model[options.field]);
                                                },
                                                attributes: {
                                                    class: "row_css",
                                                    style: "font-weight:bold;"
                                                },
                                                width: 70
                                            },
                                            {
                                                title: "Chứng từ",
                                                headerAttributes: {
                                                    class: "header_css"
                                                },
                                                field: "TenChungTu",
                                                editor: function nonEditor(container, options) {
                                                    container.text(options.model[options.field]);
                                                },
                                                attributes: {
                                                    class: "row_css"
                                                },
                                                width: 150
                                            },
                                            {
                                                title: "Số chứng từ",
                                                headerAttributes: {
                                                    class: "header_css"
                                                },
                                                field: "SoChungTu",
                                                editor: function nonEditor(container, options) {
                                                    container.text(options.model[options.field]);
                                                },
                                                attributes: {
                                                    class: "row_css"
                                                },
                                                width: 100
                                            },

                                            {
                                                title: "Ngày tiếp nhận chứng từ",
                                                headerAttributes: {
                                                    class: "header_css"
                                                },
                                                field: "NgayTiepNhan_ChungTu",
                                                template: "#= NgayTiepNhan_ChungTu == null || NgayTiepNhan_ChungTu == '' ?  '' : kendo.toString(kendo.parseDate(NgayTiepNhan_ChungTu, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                                                editor: function (container, options) {

                                                    container.text(options.model[options.field]);

                                                },
                                                attributes: {
                                                    "class": "row_css"
                                                },
                                                width: 100
                                            }
                                        ]
                                    });
                                    //////////////////////////

                                    $("#lb_TinhTrang_KiemTra").text("HOÀN TẤT HỒ SƠ THANH TOÁN").attr("style", "color:green;font-weight:bold;");

                                    $("#btn_Chuyen_KiemTra_CW").addClass('disabled');
                                    $("#btn_HoanTat_HS").addClass('disabled');
                                    $("#btn_Chuyen_KiemTra_NT").addClass('disabled');                                    
                                    $('#txt_NgayDK_HoanTat').attr("disabled", "true");

                                    
                                    

                                }
                            }
                        }
                    }
                });
            }
        },
        schema: {
            model: {
                fields: {
                    TinhTrang_CL: { editable: false, type: "number" }
                }
            }
        }
    });
    $("#grid_kiemtra").data("kendoGrid").setDataSource(ds);


}

function Ham_Chuyen_KiemTra_CW() {

    var v_check = 0;
    for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {

        var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].textContent;
        var NgayTra_NT = $("#grid_kiemtra tr")[i].cells[6].textContent;
        


        if (TinhTrang_CL != "Ok" && NgayTra_CW == '') {
            v_check = 1;
            break;
        }        
    }

    if (v_check == 1) {

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập ngày hoàn trả!"
        }, "error");
    }
    
    else if (v_check == 0) {

        var Chuoi_JSON = "";
        for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {


            var TiepNhan_ID = parseInt($("#grid_kiemtra tr")[i].cells[0].textContent);
            var Checklist_ID = parseInt($("#grid_kiemtra tr")[i].cells[1].textContent);

            var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].textContent;
            var NgayTra_CW = $("#grid_kiemtra tr")[i].cells[3].textContent;
            var GhiChu_CW = $("#grid_kiemtra tr")[i].cells[4].textContent;
            var NgayNhan_CW = $("#grid_kiemtra tr")[i].cells[5].textContent;

            var NgayTra_NT = $("#grid_kiemtra tr")[i].cells[6].textContent;
            var GhiChu_NT = $("#grid_kiemtra tr")[i].cells[7].textContent;
            var NgayNhan_NT = $("#grid_kiemtra tr")[i].cells[8].textContent;


            var SoChungTu = $("#grid_kiemtra tr")[i].cells[11].textContent;
            var NgayTiepNhan_ChungTu = $("#grid_kiemtra tr")[i].cells[12].textContent;



            if (TinhTrang_CL == "Ok") {

                Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'','NgayNhan_CW':'','GhiChu_CW':'','TinhTrang_CL':" + 1 + ",'NgayTra_NT':'','NgayNhan_NT':'','GhiChu_NT':''},";
            }
            else {

                Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'" + NgayTra_CW + "','NgayNhan_CW':'" + NgayNhan_CW + "','GhiChu_CW':'" + GhiChu_CW + "','TinhTrang_CL':" + 0 + ",'NgayTra_NT':'" + NgayTra_NT + "','NgayNhan_NT':'" + NgayNhan_NT + "','GhiChu_NT':'" + NgayNhan_NT + "'},";
            }

        }
        Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');

        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
            data: {
                cmd: 'CapNhat_KiemTra_HS',
                gData: "[" + Chuoi_JSON + "]",
                TinhTrang_HS: 0,
                Ngay_HoanTat_Xem: $("#txt_NgayDK_HoanTat").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");


                HienThi_Tab_KiemTraHS();

            }
            else {

                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
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
function Ham_Chuyen_KiemTra_NT() {

    var v_check = 0;
    for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {

        var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
        var NgayTra_CW = $("#grid_kiemtra tr")[i].cells[3].textContent;
        var GhiChu_CW = $("#grid_kiemtra tr")[i].cells[4].textContent;
        

        if (TinhTrang_CL == false && NgayTra_CW == '') {
            v_check = 1;
            break;
        }
        else if (TinhTrang_CL == false && GhiChu_CW == '') {
            v_check = 2;
            break;
        }
    }

    if (v_check == 1) {

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập ngày hoàn trả!"
        }, "error");
    }
    else if (v_check == 2) {

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập lý do hoàn trả!"
        }, "error");

    }
    else if (v_check == 0) {

        var Chuoi_JSON = "";
        for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {


            var TiepNhan_ID = parseInt($("#grid_kiemtra tr")[i].cells[0].textContent);
            var Checklist_ID= parseInt($("#grid_kiemtra tr")[i].cells[1].textContent);

            var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
            var NgayTra_CW = $("#grid_kiemtra tr")[i].cells[3].textContent;
            var GhiChu_CW = $("#grid_kiemtra tr")[i].cells[4].textContent;
            var NgayNhan_CW = $("#grid_kiemtra tr")[i].cells[5].textContent;

            var NgayTra_NT = $("#grid_kiemtra tr")[i].cells[6].textContent;
            var GhiChu_NT = $("#grid_kiemtra tr")[i].cells[7].textContent;
            var NgayNhan_NT = $("#grid_kiemtra tr")[i].cells[8].textContent;


            var SoChungTu = $("#grid_kiemtra tr")[i].cells[11].textContent;
            var NgayTiepNhan_ChungTu = $("#grid_kiemtra tr")[i].cells[12].textContent;


            
            if (TinhTrang_CL) {
                
                Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'','NgayNhan_CW':'','GhiChu_CW':'','TinhTrang_CL':" + 1 + ",'NgayTra_NT':'','NgayNhan_NT':'','GhiChu_NT':''},";
            }
            else {                
                
                Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'" + NgayTra_CW + "','NgayNhan_CW':'" + NgayNhan_CW + "','GhiChu_CW':'" + GhiChu_CW + "','TinhTrang_CL':" + 0 + ",'NgayTra_NT':'" + NgayTra_NT + "','NgayNhan_NT':'" + NgayNhan_NT + "','GhiChu_NT':'" + NgayNhan_NT + "'},";
            }

        }
        Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');

        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
            data: {
                cmd: 'CapNhat_KiemTra_HS',
                gData: "[" + Chuoi_JSON + "]",
                TinhTrang_HS: 1,
                Ngay_HoanTat_Xem: $("#txt_NgayDK_HoanTat").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");


                HienThi_Tab_KiemTraHS();

            }
            else {

                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
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


function Ham_HoanTat() {

    v_check = 0;
    for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {

        var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;

        if (!TinhTrang_CL) {
            v_check = 1;
            break;
        }
    }

    if (v_check == 1) {
        $("#notification").data("kendoNotification").show({
            title: "Lỗi! Còn chứng từ sai sót!",
            message: ""
        }, "error");
    }
    else {

        $("#wd_HoanTat").data("kendoWindow").center().open();
        
    }


}
function Ham_HoanTat_Luu() {

    var Chuoi_JSON = "";
    for (var i = 2; i < $("#grid_kiemtra tr").length; i++) {


        var TiepNhan_ID = parseInt($("#grid_kiemtra tr")[i].cells[0].textContent);
        var Checklist_ID = parseInt($("#grid_kiemtra tr")[i].cells[1].textContent);

        var TinhTrang_CL = $("#grid_kiemtra tr")[i].cells[2].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
        var NgayTra_CW = $("#grid_kiemtra tr")[i].cells[3].textContent;
        var GhiChu_CW = $("#grid_kiemtra tr")[i].cells[4].textContent;
        var NgayNhan_CW = $("#grid_kiemtra tr")[i].cells[5].textContent;

        var NgayTra_NT = $("#grid_kiemtra tr")[i].cells[6].textContent;
        var GhiChu_NT = $("#grid_kiemtra tr")[i].cells[7].textContent;
        var NgayNhan_NT = $("#grid_kiemtra tr")[i].cells[8].textContent;


        var SoChungTu = $("#grid_kiemtra tr")[i].cells[11].textContent;
        var NgayTiepNhan_ChungTu = $("#grid_kiemtra tr")[i].cells[12].textContent;



        if (TinhTrang_CL) {

            Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'','NgayNhan_CW':'','GhiChu_CW':'','TinhTrang_CL':" + 1 + ",'NgayTra_NT':'','NgayNhan_NT':'','GhiChu_NT':''},";
        }
        else {

            Chuoi_JSON += "{'TiepNhan_ID':" + TiepNhan_ID + ",'Checklist_ID':" + Checklist_ID + ",'SoChungTu':'" + SoChungTu + "','NgayTiepNhan_ChungTu':'" + NgayTiepNhan_ChungTu + "','NgayTra_CW':'" + NgayTra_CW + "','NgayNhan_CW':'" + NgayNhan_CW + "','GhiChu_CW':'" + GhiChu_CW + "','TinhTrang_CL':" + 0 + ",'NgayTra_NT':'" + NgayTra_NT + "','NgayNhan_NT':'" + NgayNhan_NT + "','GhiChu_NT':'" + NgayNhan_NT + "'},";
        }

    }
    Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'HoanTat_KiemTra_HS',
            gData: "[" + Chuoi_JSON + "]",
            TinhTrang_HS: 2,
            Ngay_ThanhToan: $("#txt_Ngay_ThanhToan").val(),
            Ngay_HoanTat_Xem: $("#txt_NgayDK_HoanTat").val()

        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Hồ sơ đã hoàn tất!"
            }, "upload-success");

            
            $("#wd_HoanTat").data("kendoWindow").close();


            HienThi_Tab_KiemTraHS();

        }
        else {

            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
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

function Ham_Xem_Logs_KiemTra() {


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'Logs_KiemTra_Cap_1',
                        HopDong_ID: HopDong_ID,
                        PO_ID: PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThanhToan_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });


    $("#grid_logs_kiemtra").data("kendoGrid").setDataSource(ds);

    $("#wd_logs_kiemtra").data("kendoWindow").center().open();

}
