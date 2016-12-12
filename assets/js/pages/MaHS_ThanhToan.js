var DS_HopDong, DS_HopDong_TD, DS_HopDong_Loc, DS_HopDong_ChiTiet, DS_NhaThau, DS_LoaiHD, DS_HTMS, DS_LoaiVT, DS_VatTu, DS_DVT;
var detailInit_e, v_STT;
var VatTu_ID_Sua;

var MaHS_ThanhToan;
var Path, Path_Sua;

var DS_NguonVon;

$(document).ready(function () {

    $("#main-menu-min").click();

    $('#div_HS_ThanhToan').hide();
    $('#btn_Back').hide();

    //#region Hiển thị phân quyền
    var Col_grid_kiemtra;
    var Col_grid_checklist_PO;

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



        Col_grid_checklist_PO = [
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
                        title: "Tên hồ sơ,văn bản",
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
                        title: "Bộ phận/Đơn vị thực hiện",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "BoPhanThucHien",
                        attributes: {
                            class: "row_css",
                            style: "background-color:lightyellow;"
                        },
                        editor: function nonEditor(container, options) {
                            $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                    .appendTo(container)
                        },                        
                        width: 150
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        columns: [

                            {
                                title: "Bản chính",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanChinh",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    class: "row_css"
                                },
                                width: 80
                            },
                            {
                                title: "Bản thị thực",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanThiThuc",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    class: "row_css"
                                },
                                width: 80
                            },
                            {
                                title: "Bản bản sao",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanSao",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    class: "row_css"
                                },
                                width: 80
                            },
                            {
                                title: "Bản Photo",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanPhoto",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    class: "row_css"
                                },
                                width: 80
                            }
                        ]
                    },
                    {
                        title: "Trình tự thời gian",
                        headerAttributes: {
                            class: "header_css"
                        },
                        columns: [

                            {
                                title: "Số",
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
                                title: "Kí hiệu",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "KiHieu",
                                editor: function nonEditor(container, options) {
                                    container.text(options.model[options.field]);
                                },
                                attributes: {
                                    class: "row_css"
                                },
                                width: 100
                            },
                            {
                                title: "Ngày",
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
                                title: "Thời gian thực hiện thực tế (Số ngày)",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "ThoiGianThucHienThucTe",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function (container, options) {


                                    $('<input name="' + options.field + '"/>')
                                        .appendTo(container)
                                        .kendoNumericTextBox({
                                            format: '#',
                                            decimals: 0,
                                            min: 0
                                    });
                                },                                
                                width: 80
                            },
                            {
                                title: "Không hợp lý về trình tự thời gian",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "KhongHopLyVeTrinhTuThoiGian",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function (container, options) {

                                    $('<input type="checkbox" name="' + options.field + '" />')
                                    .appendTo(container)
                                },                                
                                template: '<input type="checkbox" onclick="checkboxClicked(this)" #= KhongHopLyVeTrinhTuThoiGian? checked="checked" : "" #  />',
                                width: 80
                            },
                            {
                                title: "Thời gian thực hiện theo quy định (Số ngày)",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "ThoiGianThucHienTheoQuyDinh",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function (container, options) {

                                    $('<input name="' + options.field + '"/>')
                                        .appendTo(container)
                                        .kendoNumericTextBox({
                                            format: '#',
                                            decimals: 0,
                                            min: 0
                                        });
                                },                                
                                width: 80
                            }
                        ]
                    },                            
                    {
                        title: "Ghi chú",
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


        Col_grid_checklist_PO = [
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
                        title: "Tên hồ sơ,văn bản",
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
                        title: "Bộ phận/Đơn vị thực hiện",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "BoPhanThucHien",
                        attributes: {
                            class: "row_css"
                        },
                        editor: function nonEditor(container, options) {
                            container.text(options.model[options.field]);
                        },
                        width: 150
                    },
                    {
                        title: "Chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        columns: [

                            {
                                title: "Bản chính",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanChinh",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoNumericTextBox({
                                           format: '#',
                                           decimals: 0,
                                           min: 0
                                       });
                                },                                
                                width: 80
                            },
                            {
                                title: "Bản thị thực",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanThiThuc",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoNumericTextBox({
                                           format: '#',
                                           decimals: 0,
                                           min: 0
                                       });
                                },                                
                                width: 80
                            },
                            {
                                title: "Bản bản sao",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanSao",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoNumericTextBox({
                                           format: '#',
                                           decimals: 0,
                                           min: 0
                                       });
                                },                                
                                width: 80
                            },
                            {
                                title: "Bản Photo",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "CT_BanPhoto",
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '"/>')
                                       .appendTo(container)
                                       .kendoNumericTextBox({
                                           format: '#',
                                           decimals: 0,
                                           min: 0
                                       });
                                },                                
                                width: 80
                            }
                        ]
                    },
                    {
                        title: "Trình tự thời gian",
                        headerAttributes: {
                            class: "header_css"
                        },
                        columns: [

                            {
                                title: "Số",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "SoChungTu",
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                    .appendTo(container)
                                },
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            },
                            {
                                title: "Kí hiệu",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "KiHieu",
                                editor: function nonEditor(container, options) {
                                    $('<input name="' + options.field + '" class="k-input k-textbox"/>')
                                    .appendTo(container)
                                },
                                attributes: {
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            },
                            {
                                title: "Ngày",
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
                                    class: "row_css",
                                    style: "background-color:lightyellow;"
                                },
                                width: 100
                            },
                            {
                                title: "Thời gian thực hiện thực tế (Số ngày)",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "ThoiGianThucHienThucTe",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                width: 80
                            },
                            {
                                title: "Không hợp lý về trình tự thời gian",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "KhongHopLyVeTrinhTuThoiGian",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function (container, options) {
                                    container.text(options.model[options.field]);
                                },
                                template: function (data) {
                                    if (data.KhongHopLyVeTrinhTuThoiGian) {
                                        return 'X'
                                    } else {
                                        return ''
                                    }
                                },
                                width: 80
                            },
                            {
                                title: "Thời gian thực hiện theo quy định (Số ngày)",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "ThoiGianThucHienTheoQuyDinh",
                                attributes: {
                                    class: "row_css"
                                },
                                editor: function (container, options) {

                                    container.text(options.model[options.field]);
                                },
                                width: 80
                            }
                        ]
                    },
                    {
                        title: "Ghi chú",
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
                    }

        ]
    }

    //#endregion

    //#region DataSource

    if ($("[id$=_hf_nt]").val() == "") {

        DS_HopDong = new kendo.data.DataSource({

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
                field: 'HopDong_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
        DS_NhaThau = new kendo.data.DataSource({
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
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        });

        DS_MaHopDong = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_MaHD'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        });
    }
    else {//Là nhà thầu

        $("#tb_BoLoc").hide();

        DS_HopDong = new kendo.data.DataSource({

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
                field: 'HopDong_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byNhaThau",
                    data: {
                        NhaThau: $("[id$=_hf_nt]").val()
                    }
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
        DS_MaHopDong = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_MaHD'                            
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            filter: { field: "NhaThau_ID", operator: "eq", value: parseInt($("[id$=_hf_nt]").val()) }
        });
    }

    //#endregion

    //#region Bộ lọc  

    $("#Tr_Loc_TinhTrang").hide();
    $("#Tr_Loc_LoaiHD").hide();
    $("#Tr_Loc_HTMS").hide();
    $("#Tr_Loc_NgayKi_HD").hide();
    $("#Tr_Loc_NhaThau").hide();
    $("#Tr_Loc_NgayConLai").hide();
    $("#Tr_btn_loc").hide();
    $("#Tr_GiaTriConLaiHD").hide();


    $("#cmb_BoLoc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Tình trạng hợp đồng", value: "1" },
            { text: "Hình thức mua sắm", value: "2" },
            { text: "Ngày kí hợp đồng", value: "3" },
            { text: "Nhà thầu", value: "4" },
            { text: "Ngày còn lại của hợp đồng", value: "5" },
            { text: "Loại hợp đồng", value: "6" },
            { text: "Tỷ lệ còn lại của hợp đồng", value: "7" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            switch (value) {
                case "1":
                    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});

                    $("#Tr_Loc_TinhTrang").show();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();

                    break;
                case "2":
                    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").show();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();

                    break;
                case "3":

                    $("#txt_TuNgay").val("");
                    $("#txt_DenNgay").val("");

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").show();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").show();
                    $("#Tr_GiaTriConLaiHD").hide();

                    break;
                case "4":

                    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").show();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();

                    break;
                case "5":

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").show();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();


                    break;
                case "6":

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").show();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();

                    break;
                case "7":

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_Loc_NgayConLai").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").show();

                    break;

                default:

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_HTMS").hide();
                    $("#Tr_Loc_LoaiHD").hide();
                    $("#Tr_Loc_NgayKi_HD").hide();
                    $("#Tr_Loc_NhaThau").hide();
                    $("#Tr_btn_loc").hide();
                    $("#Tr_GiaTriConLaiHD").hide();

            }
        }
    });    $("#cmb_Loc_TinhTrang").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
			{ text: "Hiệu lực", value: "0" },
            { text: "Hết hiệu lực", value: "1" },
            { text: "Thanh lý", value: "2" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;


            //if (value == "") {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            //}
            //else {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "TinhTrang_HD", operator: "eq", value: parseInt(value) });
            //}
            var ds;

            if (value !== '') {

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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byTinhTrang",
                            data: {
                                TinhTrang: value
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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_hopdong").data("kendoGrid").setDataSource(ds);


        }

    });    $("#cmb_Loc_HTMS").kendoDropDownList({
        optionLabel: "--Tất cả--",
        dataTextField: "HinhThucMS_Ten",
        dataValueField: "HinhThucMS_ID",
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong_HTMS'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        }),
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.HinhThucMS_ID;


            //if (value == "") {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            //}
            //else if (value == null) {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "HinhThucMS_ID", operator: "eq", value: value });
            //} else {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "HinhThucMS_ID", operator: "eq", value: parseInt(value) });
            //}


            var ds;

            if (value !== '') {

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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byHinhThucMS",
                            data: {
                                HinhThucMS: value
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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_hopdong").data("kendoGrid").setDataSource(ds);

        }
    });    $("#cmb_Loc_ConLai").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "60 ngày", value: "60" },
            { text: "45 ngày", value: "45" },
            { text: "30 ngày", value: "30" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            if (value == "") {
                Load_DS_HopDong(DS_HopDong);
            }
            else {
                DS_HopDong_Loc = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_HopDong.aspx",
                                data: {
                                    cmd: 'Lay_DS_HopDong_NgayConLai',
                                    NgayConLai: value

                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

                Load_DS_HopDong(DS_HopDong_Loc);
            }
        }
    });
    $("#cmb_Loc_LoaiHD").kendoDropDownList({
        optionLabel: "--Tất cả--",
        dataTextField: "LoaiHD_Ten",
        dataValueField: "LoaiHD_ID",
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong_LoaiHD'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        }),
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.LoaiHD_ID;


            //if (value == "") {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            //}
            //else if (value == null) {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "LoaiHD_ID", operator: "eq", value: value });
            //} else {
            //    $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "LoaiHD_ID", operator: "eq", value: parseInt(value) });
            //}

            var ds;

            if (value !== '') {

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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byLoaiHD",
                            data: {
                                LoaiHD: value
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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_hopdong").data("kendoGrid").setDataSource(ds);

        }
    });

    $("#cmb_Loc_NhaThau").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Tất cả--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.NhaThau_ID;
            var ds;

            if (value !== '') {

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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byNhaThau",
                            data: {
                                NhaThau: value
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
                        field: 'HopDong_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_hopdong").data("kendoGrid").setDataSource(ds);
        }
    });

    $("#btn_huy_loc").click(function () {

        $("#grid_hopdong").data("kendoGrid").setDataSource(DS_HopDong);

    });
    $("#btn_loc").click(function () {
        DS_HopDong_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong_Ngay',
                            TuNgay: $("#txt_TuNgay").val(),
                            DenNgay: $("#txt_DenNgay").val()
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
        $("#grid_hopdong").data("kendoGrid").setDataSource(DS_HopDong_Loc);


    });

    $("#cmb_Loc_TyLeConLai").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "60 %", value: "60" },
            { text: "50 %", value: "50" },
            { text: "40 %", value: "40" },
            { text: "30 %", value: "30" },
            { text: "20 %", value: "20" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            if (value == "") {

                $("#grid_hopdong").data("kendoGrid").setDataSource(DS_HopDong);
            }
            else {
                DS_HopDong_Loc = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_TheoDoi.aspx",
                                data: {
                                    cmd: 'TheoDoi_ConLai_HD',
                                    TyLe: value

                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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


                $("#grid_hopdong").data("kendoGrid").setDataSource(DS_HopDong_Loc);


            }
        }
    });

    //#endregion

    //#region control
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

    
   
    $("#wd_Ma_HS_TT").kendoWindow({
        draggable: false,
        height: "auto",
        width: "90%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Tạo mã hồ sơ",
        visible: false

    }).data("kendoWindow");
    
    $("#grid_PO").kendoGrid({
        //toolbar: function () {
        //    return '<div class="Toolbar_left"><a class="btn btn-info" onclick="Luu_MaHS();"><i class="fa fa-save"></i> Lưu</a></div>';
        //},
        toolbar: kendo.template($("#Templ_Them_MaHS").html()),
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
        detailInit: function Ham_ChiTiet_PO(f) {

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
                                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                                    window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                    window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
        },
        sortable: true,
        columns:
            [
                { field: "HopDong_ID", hidden: true },
                { field: "PO_ID", hidden: true },
                {
                    field: "chon_po",
                    title: "Chọn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: '<center><input type=\'checkbox\' /></center>',
                    sortable: false,
                    width: 80,
                    attributes: {
                        style: "background-color:lightyellow;"
                    }
                },                
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

    $("#txt_dot").kendoNumericTextBox({
        format: "#",        
        min: "0"
    });
    //#endregion


    //#region control tiếp nhận HS hợp đồng

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
        title: "Phân công thụ lý hợp đồng",
        visible: false

    }).data("kendoWindow");



    //#endregion

    //#region Control tiến trình thanh toán

    $("#grid_NguoiDung_PO").kendoGrid({
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
        toolbar: kendo.template($("#Templ_NguoiDung_PO").html()),
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

    $("#txt_search_u_PO").kendoAutoComplete({
        dataTextField: "TenNguoiDung",
        filter: "contains",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.TenNguoiDung;

            if (value) {

                $("#grid_NguoiDung_PO").data("kendoGrid").dataSource.filter({ field: "TenNguoiDung", operator: "eq", value: value });
            }
            else {
                $("#grid_NguoiDung_PO").data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_u_PO").val('');
        }

    });

    $("#btn_clear_u_PO").click(function (e) {
        e.preventDefault();
        $("#txt_search_u_PO").val('');
        $("#grid_NguoiDung_PO").data("kendoGrid").dataSource.filter({});
    });






    $("#wd_PhanCong_PO").kendoWindow({
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
                    break;
                case "Tiếp nhận hồ sơ":

                    HienThi_Tab_TiepNhanHS();                    
                    break;

                case "Kiểm tra tính hợp lý của chứng từ":

                    HienThi_Tab_KiemTraHS();                    
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
                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                        window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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


    $("#grid_checklist_PO").kendoGrid({
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
        columns: Col_grid_checklist_PO
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

    Load_DS_HopDong(DS_HopDong);

});
//#region Hiển thị danh sách Hợp đồng
function Load_DS_HopDong(d) {


    $("#grid_hopdong").empty();
    var grid = $("#grid_hopdong").kendoGrid({
        dataSource: d,
        toolbar: kendo.template($("#Templ_ThemHD").html()),
        detailTemplate: kendo.template($("#Templ_ChiTiet_HopDong").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        sortable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   hợp đồng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        //columnMenu: {
        //    messages: {
        //        columns: "Chọn cột",
        //        filter: "Bộ lọc",
        //        sortAscending: "Tăng dần",
        //        sortDescending: "Giảm dần"

        //    }
        //},
        detailInit: detailInit,
        columns:
            [
                {
                    hidden: true,
                    field: "HopDong_ID"
                },
                //{
                //    title: "Tình trạng",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "TinhTrang_HD",
                //    template: "#= HienThi_TinhTrang(TinhTrang_HD) #",
                //    width: 60
                //},
                {
                    title: "Số HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    template: function (data) {

                        if (data.TinhTrang_HD == 0) {
                            return '<b>' + data.MaHD + '</b><center><span class="label label-success">Hiệu lực</span></center>';
                        }
                        else if (data.TinhTrang_HD == 1) {
                            return '<b>' + data.MaHD + '</b><center><span class="label label-warning">Hết hiệu lực</span></center>';
                        }
                        else {
                            return '<b>' + data.MaHD + '</b><center><span class="label label-important">Thanh lý</span></center>';
                        }

                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 140
                },
                {
                    title: "Nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },

                    field: "NhaThau_Ten",
                    attributes: {
                        class: "row_css",
                        style: "font-size:11px;"
                    },
                    width: 110
                },
                {
                    title: "Ngày ký HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKy",
                    //template: "#= NgayKy_f #",//SoNgayTiepNhan
                    template: function (data) {

                        if (data.TinhTrang_PhanCong == 0) {
                            if (Math.abs(data.SoNgayTiepNhan) > 6) {
                                return '' + data.NgayKy_f + '<center><span class="label label-important">Chưa tiếp nhận</span></center>';
                            } else {
                                return data.NgayKy_f
                            }
                        }
                        else {
                            return '' + data.NgayKy_f + '<center><span class="label label-success">Đã tiếp nhận</span></center>';
                        }



                    },
                    attributes: {
                        class: "row_css",
                        style: "font-size:11px;"
                    },
                    width: 90
                },

                {
                    title: "HTMS",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "HinhThucMS_Ten",
                    attributes: {
                        class: "row_css",
                        style: "font-size:11px;"
                    },
                    width: 120
                },

                {
                    title: "Giá trị HĐ trước thuế",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GiaTriTruocThue",
                    template: "#= OnChangeFormat(GiaTriTruocThue) #",
                    attributes: {
                        class: "row_css"
                    },
                    width: 120
                },
                {
                    title: "Ngày còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoNgayConLai",
                    template: "#= HienThi_SoNgayConLai(data) #",
                    width: 100
                },
                {
                    title: "Ngày hết hạn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHetHan",
                    //template: "#= NgayHetHan_f #",
                    template: function (data) {
                        if (data.SoNgayConLai <= 30) {
                            return '<img src="Images/alarm_2.gif" height="40" width="40" /><br><b>' + data.NgayHetHan_f + '</b>';
                        }
                        else {
                            return '<b>' + data.NgayHetHan_f + '</b>';
                        }

                    },
                    attributes: {
                        class: "row_css",
                        style: "font-size:11px;"
                    },
                    width: 100
                },

                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: '#= Ham_HienThi_VB(FileVB) #',
                    width: 100
                }
            ]
    });

    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        filter: "contains",
        dataSource: DS_MaHopDong
    });




    $('#txt_search_sohd').keydown(function (e) {
        if (e.which === 13)
            filterHD();
    });

    $('#btn_tim_soHD').click(function (e) {
        e.preventDefault();
        filterHD();
    });

    $('#btn_clear_sohd').click(function (e) {
        e.preventDefault();
        $('#txt_search_sohd').val('');

        filterHD();

    });

}
function HienThi_SoNgayConLai(model) {
    if (model.TinhTrang_HD == 0) {
        return '<center style="color:red;"><b>' + model.SoNgayConLai + '</b></center>';
    } else {
        return '';
    }
}
function HienThi_TinhTrang(TinhTrang_HD) {
     if (TinhTrang_HD == 0) {
        return '<center><span class="label label-success">Hiệu lực</span></center>';
    }
    else if (TinhTrang_HD == 1) {
        return '<center><span class="label label-warning">Hết hiệu lực</span></center>';
    }
    else {
        return '<center><span class="label label-important">Thanh lý</span></center>';
    }
}
function Ham_HienThi_VB(value) {
    if (value == "" || value == null) {
        return '<center>Chưa upload </center>';
    } else {
        //return '<center><a href= "' + value + '" class="k-button" target="_blank" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-seek-s"></span></a></center>';
        return '<center><a href= "' + value + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
    }
}
function detailInit(e) {


    detailInit_e = e;
    var detailRow = e.detailRow;

    detailRow.find("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        },
        select: function (f) {
            var content_tab = $(f.item).find("> .k-link").text().trim();
            switch (content_tab) {

                case "Danh sách vật tư":
                    detailRow.find("#tab_VatTu").kendoGrid({

                        dataSource: {
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                                        data: {
                                            cmd: 'Lay_DS_HopDong_CT',
                                            HopDong_ID: e.data.HopDong_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                            aggregate: [
                                { field: "ThanhTien", aggregate: "sum" }
                            ]

                        },
                        sortable: true,
                        pageable: {
                            messages: {
                                display: "Tổng số   {2}   Vật tư",
                                empty: "Chưa có vật tư ",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"

                            }
                        },
                        columns:
                        [

                            {
                                title: "Vật tư",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "VatTu_Ten",
                                template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                                attributes: {
                                    class: "row_css",
                                    style: "font-weight:bold;"
                                },
                                width: "15%"
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
                                title: "Số lượng khả dụng",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "SoLuong_KhaDung",
                                template: "#= OnChangeFormat(SoLuong_KhaDung) #",
                                attributes: {
                                    class: "row_css",
                                    style: "font-weight:bold;color:green;"
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
                                title: "Thành tiền trước thuế",
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
                                width: "15%"

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
                                },
                                width: "14%"
                            },
                            {
                                title: "Ghi chú",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "GhiChu",
                                attributes: {
                                    class: "row_css"
                                }
                            }
                        ]
                    });
                    break;
                case "Tiếp nhận Hợp Đồng":
                    Ham_HienThi_PhanCong();

                    detailRow.find("#grid_checklist").kendoGrid({
                        //pageable: true,
                        dataSource: {
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_ThanhToan_HopDong.aspx",
                                        data: {
                                            cmd: 'HienThi_Checklist_HopDong',
                                            HopDong_ID: e.data.HopDong_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                display: "Tổng số   {2}   mục",
                                empty: "Không có dữ liệu",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"

                            }
                        },                        
                        toolbar: function () {

                            if ($("[id$=_hf_email]").val().trim() == e.data.NguoiPhanCong) {
                                return kendo.template($("#Templ_Checklist").html())
                            } else {
                                return null;
                            }


                        },
                        columns:
                            [
                                { field: "ID", hidden: true },
                                {
                                    title: "Chọn",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    template: function (data) {
                                        if ($("[id$=_hf_checklist]").val() == "true") {

                                            if ($("[id$=_hf_email]").val().trim() == e.data.NguoiPhanCong) {
                                                if (data.check_exits == 1) {
                                                    return "<center><input type='checkbox' checked /></center>"
                                                } else {
                                                    return "<center><input type='checkbox' /></center>"
                                                }
                                            } else {


                                                if (data.check_exits == 1) {
                                                    return "<center><input type='checkbox' disabled checked /></center>"
                                                } else {
                                                    return "<center><input type='checkbox' disabled /></center>"
                                                }
                                            }
                                        }
                                        else {
                                            if (data.check_exits == 1) {
                                                return "<center><input type='checkbox' disabled checked /></center>"
                                            } else {
                                                return "<center><input type='checkbox' disabled /></center>"
                                            }

                                        }


                                    },
                                    sortable: false,
                                    width: 80,
                                    attributes: {
                                        style: "background-color:lightyellow;"
                                    }
                                },
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
                                    width: 150
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
                                }

                            ]
                    });
                    break;
            }

        }
    });

    detailRow.find("#grid_MaHS").kendoGrid({

        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                        data: {
                            cmd: 'HienThi_MaHS_TT',
                            HopDong_ID: e.data.HopDong_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            schema: {
                model: {
                    fields: {                        
                        Dot: { type: "number" },
                        Ma_HS_TT: { type: "string" }

                    }
                }
            },            
            group:
                [
                    {
                        field: "Ma_HS_TT"
                    }

                ]
            
          
        },
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
                return '<div class="Toolbar_left"><a class="btn btn-info" onclick="Them_MaHS(' + e.data.HopDong_ID + ');"><i class="fa fa-plus"></i> Tạo đợt thanh toán</a></div>';
            } else {
                return ''
            }

            
        },
        width: 200,
        columns:
            [
                { field: "ID", hidden: true },
                {
                    title: "Mã hồ sơ thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    hidden: true,
                    field: "Ma_HS_TT",
                    groupHeaderTemplate: function (Items) {
                        
                        var Mang = Items.value.split("*");

                        if ($("[id$=_hf_nt]").val().trim() == "") {
                            if (Mang[1] == '1') {

                                return '<input type="button" class="button_khoa" onclick="Ham_MoKhoa_TinhTrang_Dot(\'' + Mang[2] + '\');"/> Mã hồ sơ thanh toán: ' + Mang[2] + '(Đợt ' + Mang[0] + ')<span style="margin-left:50px !important;" class="btn btn-info" onclick ="Ham_Chuyen_HS_TT(\'' + Mang[2] + '\');"><i class="fa fa-exchange"></i> Tiến trình</span>';
                            }
                            else {

                                return '<input type="button" class="button_mokhoa" onclick="Ham_DongKhoa_TinhTrang_Dot(\'' + Mang[2] + '\');"/> Mã hồ sơ thanh toán: ' + Mang[2] + '(Đợt ' + Mang[0] + ')<span style="margin-left:50px !important;" class="btn btn-info" onclick ="Ham_Sua_Ma(\'' + Mang[2] + '\',' + e.data.HopDong_ID + ');"><i class="fa fa-edit"></i> Sửa</span><span style="margin-left:10px !important;" class="btn btn-danger" onclick ="Ham_Xoa_Ma(\'' + Mang[2] + '\',' + e.data.HopDong_ID + ');"><i class="fa fa-trash-o"></i> Xóa</span>';

                            }
                        } else {

                            if (Mang[1] == '1') {

                                return '<input type="button" class="button_khoa"/> Mã hồ sơ thanh toán: ' + Mang[2] + '(Đợt ' + Mang[0] + ')<span style="margin-left:50px !important;" class="btn btn-info" onclick ="Ham_Chuyen_HS_TT(\'' + Mang[2] + '\');"><i class="fa fa-exchange"></i> Tiến trình</span>';
                            }
                            else {

                                return '<input type="button" class="button_mokhoa" /> Mã hồ sơ thanh toán: ' + Mang[2] + '(Đợt ' + Mang[0] + ')';

                            }
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },                
                {
                    title: "STT",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "rownum",
                    attributes: {
                        class: "row_css"
                    },
                    width:50
                },            
                {
                    title: "Số PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoPO",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },                

            ]        
    });
        

}
function filterHD() {

    var ds;

    if ($('#txt_search_sohd').val().trim() !== '') {
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
                field: 'HopDong_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byMaHD",
                    data: {
                        MaHD: $('#txt_search_sohd').val().trim()
                    }
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
    }
    else {

        if ($("[id$=_hf_nt]").val() == "") {

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
                    field: 'HopDong_ID',
                    dir: 'desc'
                },
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HopDong"
                    },
                    parameterMap: function (options, operation) {
                        return kendo.stringify(options);
                    }
                }
            });

        } else {

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
                    field: 'HopDong_ID',
                    dir: 'desc'
                },
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: "assets/ajax/Ajax_HopDong.aspx/Lay_DS_HD_byNhaThau",
                        data: {
                            NhaThau: $("[id$=_hf_nt]").val()
                        }
                    },
                    parameterMap: function (options, operation) {
                        return kendo.stringify(options);
                    }
                }
            });
        }
    }
    $("#grid_hopdong").data("kendoGrid").setDataSource(ds);
}
//#endregion Hiển thị Hợp đồng


//#region Hiển thị chi tiết vật tư
function Ham_HienThi_Xuat_PO(value) {


    var arr_dv = value.split("*");

    if (arr_dv[0] == "0") {
        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-success" style="margin-left:10px !important;">Chưa xuất PO con</span>';
    }
    else {
        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span>';
    }
}
function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");

    return "<b>Số hợp đồng: " + arr_dv[2] + "</b>";
}
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
                                window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

//#region Mã thanh toán

function Them_MaHS(p_HopDong_ID) {

    $("#wd_Ma_HS_TT").data("kendoWindow").open().center();
   
    $("#hf_HopDong_ID_PO").val(p_HopDong_ID);
    $("#hf_Ma_HS_TT").val('');

    $("#txt_dot").data("kendoNumericTextBox").value('');
    $("#txt_dot").data("kendoNumericTextBox").enable(true);
    

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_HD',
                        HopDong_ID: p_HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
    });
    $("#grid_PO").data("kendoGrid").setDataSource(ds);

}
function Luu_MaHS() {

    if ($("#grid_PO").data("kendoGrid").dataSource.data().length > 0) {
        var str_po = '';
        
        for (var j = 0; j < $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row').length; j++) {

            var chb_po = $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[3].childNodes[0].childNodes[0];

            var id = $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[2].textContent;

            if (chb_po.checked == true) {
                str_po += '' + id + ',';
            }
        }
        str_po = str_po.replace(/^,|,$/g, '');
       
        if ($("#txt_dot").data("kendoNumericTextBox").value() == '') {

            

            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập đợt thanh toán!",
                message: "Hãy thao tác lại!"
            }, "error");
        }
        else if (str_po == '') {
            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn PO.",
                message: "Hãy thao tác lại!"
            }, "error");
            
        }
        else {
            var request = $.ajax({

                type: "POST",
                url: "assets/ajax/Ajax_ThanhToan.aspx",
                data: {
                    cmd: 'Tao_MaHS_TT',
                    str_po: str_po,
                    HopDong_ID: $("#hf_HopDong_ID_PO").val(),
                    Ma_HS_TT: $("#hf_Ma_HS_TT").val(),
                    Dot: $("#txt_dot").data("kendoNumericTextBox").value()
                },
                dataType: 'json'
            });
            request.done(function (msg) {

                if (msg[0].ErrorMessage == null) {

                    $("#notification").data("kendoNotification").show({
                        message: "Đã thêm mã hồ sơ thanh toán!"
                    }, "upload-success");

                    $("#wd_Ma_HS_TT").data("kendoWindow").close();
                    detailInit_e.detailRow.find("#grid_MaHS").data("kendoGrid").dataSource.read();

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

    else {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Không có dữ liệu để lưu!"
        }, "error");
    }
}

function Ham_Sua_Ma(p_MaHS,p_HopDong_ID) {

    $("#wd_Ma_HS_TT").data("kendoWindow").open().center();

    $("#hf_HopDong_ID_PO").val(p_HopDong_ID);
    $("#hf_Ma_HS_TT").val(p_MaHS);

    var Mang = p_MaHS.split(".");

    $("#txt_dot").data("kendoNumericTextBox").value(Mang[1]);
    $("#txt_dot").data("kendoNumericTextBox").enable(false);    


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_HD',
                        HopDong_ID: p_HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
    });
    $("#grid_PO").data("kendoGrid").setDataSource(ds);


    var res = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'HienThi_PO_byMa',
                        MaHS_ThanhToan: p_MaHS
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
    });

    res.fetch(function () {

        var view = this.view();

        for (var i = 0; i < view.length; i++) {

            for (var j = 0; j < $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row').length; j++) {

                var chb_po = $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[3].childNodes[0].childNodes[0];

                var id = $("#grid_PO").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[2].textContent;

                if (view[i].PO_ID == id) {
                    chb_po.checked = true;
                }
            }
        }
    });


}

function Ham_Xoa_Ma(p_MaHS, p_HopDong_ID) {


    if (confirm("Bạn có chắc xóa mã hồ sơ thanh toán?")) {

        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'Xoa_MaHS_TT',                
                Ma_HS_TT: p_MaHS
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa mã hồ sơ thanh toán!"
                }, "upload-success");

                $("#wd_Ma_HS_TT").data("kendoWindow").close();
                detailInit_e.detailRow.find("#grid_MaHS").data("kendoGrid").dataSource.read();

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

function Ham_DongKhoa_TinhTrang_Dot(p_MaHS) {

    if (confirm("Bạn có chắc đóng khóa mã hồ sơ thanh toán?")) {

        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'CapNhat_TinhTrang_MaHSTT',
                TinhTrang: 1,
                MaHS_ThanhToan: p_MaHS
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã đóng khóa mã hồ sơ thanh toán!"
                }, "upload-success");

                $("#wd_Ma_HS_TT").data("kendoWindow").close();
                detailInit_e.detailRow.find("#grid_MaHS").data("kendoGrid").dataSource.read();

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
function Ham_MoKhoa_TinhTrang_Dot(p_MaHS) {
    alert("Nếu mở khóa mã thanh toán phải xóa tất cả tiến trình thanh toán của đợt thanh toán này!")
}

//#endregion Mã thanh toán



//#region Tiếp nhận hợp đồng


function func_PhanCong(p_HopDong_ID) {

    $("#wd_PhanCong").data().kendoWindow.center().open();
    $("#hf_HopDong_ID").val(p_HopDong_ID);


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
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
function Ham_CapNhat_PhanCong() {

    var grid = $("#grid_NguoiDung").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());

    if (selectedItem == null) {
        alert("Chưa chọn người dùng cần phân công!");
    } else {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan_HopDong.aspx",
            data: {
                cmd: 'CapNhat_PhanCong_HopDong',
                HopDong_ID: $("#hf_HopDong_ID").val(),
                MaNguoiDung: selectedItem.MaNguoiDung

            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");



                $('#grid_hopdong').data('kendoGrid').dataSource.read();
                $('#grid_hopdong').data('kendoGrid').refresh();

                Ham_HienThi_PhanCong();
                $("#wd_PhanCong").data().kendoWindow.close();

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
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");

        });

    }




}

function Ham_HienThi_PhanCong() {

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_HopDong.aspx",
                    data: {
                        cmd: 'HienThi_PhanCong_HopDong',
                        HopDong_ID: detailInit_e.data.HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

        if (view.length > 0) {

            if (view[0].Hinh == null) {
                detailInit_e.detailRow.find(".employee-photo").attr("style", "background-image: url(Images/user-icon.png);");
            }
            else {
                detailInit_e.detailRow.find(".employee-photo").attr("style", "background-image: url(" + view[0].Hinh + ");");
            }
            detailInit_e.detailRow.find(".employee-name").text(view[0].TenNguoiDung);
        }

    });


}
function Ham_Luu_Checklist() {

    var grid_tr = detailInit_e.detailRow.find("#grid_checklist tr");

    var str_id_chckl = '';

    for (var j = 1; j < grid_tr.length; j++) {

        var chb_dv = grid_tr[j].cells[1].childNodes[0].childNodes[0];

        var id = grid_tr[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_chckl += '' + id + ',';

        }
    }

    if (str_id_chckl) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan_HopDong.aspx",
            data: {
                cmd: 'CapNhat_Checklist_HopDong',
                HopDong_ID: detailInit_e.data.HopDong_ID,
                str_id_chckl: str_id_chckl.replace(/^,|,$/g, '')

            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");

                detailInit_e.detailRow.find("#grid_checklist").data('kendoGrid').dataSource.read();
                detailInit_e.detailRow.find("#grid_checklist").data('kendoGrid').refresh();

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
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");

        });

    }


}


//#endregion




//#region tiến trình thanh toán

//#region Hiển thị chuyển hồ sơ thanh toán

function Ham_Chuyen_HS_TT(p_MaHS_ThanhToan) {

    $('#div_HS_ThanhToan').show();
    $('#btn_Back').show();
    $('#div_HD').hide();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'Get_Buoc_TienTrinh',
                        MaHS_ThanhToan: p_MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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


        //$('#lb_SoPO').text(view[0].SoPO);
        $('#lb_MaHD').text(view[0].MaHD);
        $('#lb_MaHS').text(p_MaHS_ThanhToan);
        

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


    MaHS_ThanhToan = p_MaHS_ThanhToan

}

function Ham_TroLai() {

    $('#div_HS_ThanhToan').hide();
    $('#btn_Back').hide();
    $('#div_HD').show();


}

//#endregion
//#region Tiến trình chuyển hồ sơ

function Ham_Chuyen_Checklist_CW() {

    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'CapNhat_Checklist',
            gData: JSON.stringify($("#grid_checklist_PO").data("kendoGrid").dataSource.view()),
            MaHS_ThanhToan: MaHS_ThanhToan,
            TinhTrang: 1
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(MaHS_ThanhToan);

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
            gData: JSON.stringify($("#grid_checklist_PO").data("kendoGrid").dataSource.view()),
            MaHS_ThanhToan: MaHS_ThanhToan,            
            TinhTrang: 2
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(MaHS_ThanhToan);

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
            gData: JSON.stringify($("#grid_checklist_PO").data("kendoGrid").dataSource.view()),
            MaHS_ThanhToan: MaHS_ThanhToan,
            TinhTrang: 3
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã chuyển thành công!"
            }, "upload-success");


            Ham_Chuyen_HS_TT(MaHS_ThanhToan);

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
                        MaHS_ThanhToan: MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

function Ham_CapNhat_PhanCong_PO() {


    $("#wd_PhanCong_PO").data().kendoWindow.close();


    var grid = $("#grid_NguoiDung_PO").data("kendoGrid");
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
        schema: {
            model: {                
                fields: {
                    KhongHopLyVeTrinhTuThoiGian: { type: "boolean" }
                }
            }
        },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
                    data: {
                        cmd: 'HienThi_Checklist_HopDong_PO',
                        MaHS_ThanhToan: MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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
                                    $("#btn_Ex_Checklist").addClass('disabled');
                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), false);

                                }
                                else if (result[0].TinhTrang == 2) {

                                    $('#lb_TinhTrang').text('HOÀN TRẢ HỒ SƠ').attr('style', 'color:red;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").removeClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');

                                    $("#btn_Ex_Checklist").removeClass('disabled');
                                    

                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), false);
                                }
                                else if (result[0].TinhTrang == 3) {

                                    $('#lb_TinhTrang').text('ĐÃ TIẾP NHẬN HỒ SƠ').attr('style', 'color:green;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").addClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');
                                    $("#btn_Ex_Checklist").removeClass('disabled');
                                    //$($("#tabstrip_ThanhToan").data("kendoTabStrip").items()[1]).attr("style", "display:inline;");

                                    //var tabStrip = $("#tabstrip_ThanhToan").kendoTabStrip().data("kendoTabStrip");
                                    //tabStrip.enable(tabStrip.tabGroup.children().eq(1), true);

                                }
                                else {
                                    $('#lb_TinhTrang').text('CHỜ NHÀ THẦU CHUYỂN HỒ SƠ').attr('style', 'color:red;font-weight:bold;');


                                    $("#btn_Chuyen_CL_NT").removeClass('disabled');
                                    $("#btn_Chuyen_CL_CW").addClass('disabled');
                                    $("#btn_TiepNhan_CL").addClass('disabled');
                                    $("#btn_Ex_Checklist").removeClass('disabled');
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

    $("#grid_checklist_PO").data("kendoGrid").setDataSource(ds);
    $("#tabstrip_ThanhToan-1").css('height', 'auto');
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
                        MaHS_ThanhToan: MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
                        }
                        else {
                            options.success(result);

                            
                            if (result.length > 0) {

                                var v_check = 0;
                                for (var i = 0; i < result.length; i++) {
                                    if
                                        (                                            
                                        result[i].NgayNhan_ChungTu == null
                                        ||
                                        result[i].NgayNhan_ChungTu == ''
                                        ) {

                                        v_check = 1;
                                        break;
                                    }
                                }
                                if (v_check == 0) {
                                    $("#btn_Chuyen_NV").removeClass('disabled');
                                }
                                else {
                                    $("#btn_Chuyen_NV").addClass('disabled');
                                }



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
    $("#tabstrip_ThanhToan-2").css('height', 'auto');





}

//#endregion

//#region Các chức năng của bước tiếp nhận hồ sơ

function Ham_PhanCong() {

    $("#wd_PhanCong_PO").data().kendoWindow.center().open();

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
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

    $("#grid_NguoiDung_PO").data("kendoGrid").setDataSource(ds);
    $("#txt_search_u_PO").data("kendoAutoComplete").setDataSource(ds);
}

function Ham_CapNhat_TiepNhan() {
    var request = $.ajax({

        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan_PO.aspx",
        data: {
            cmd: 'CapNhat_TiepNhan_HS',
            gData: JSON.stringify($("#grid_tiepnhan").data("kendoGrid").dataSource.view()),            
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


    var v_check = 0;

    if ($("#lb_Nguoi_PhanCong.employee-name").text() == 'Chưa phân công') {
        v_check = 1;

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa phân công nhân viên thụ lý PO!"
        }, "error");

        return;
    }

    if ($("#txt_NgayPhanCong").val() == "") {

        v_check = 1;

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập ngày phân công!"
        }, "error");
        return;
    }

    

    for (var i = 0; i < $("#grid_tiepnhan").data("kendoGrid").dataSource.data().length; i++) {

        if (
                $("#grid_tiepnhan").data("kendoGrid").dataSource.data()[i].NgayNhan_ChungTu == null
                ||
                $("#grid_tiepnhan").data("kendoGrid").dataSource.data()[i].NgayNhan_ChungTu == ''
           ) {

            v_check = 1;
            

            $("#notification").data("kendoNotification").show({
                title: "",
                message: "Chưa nhập ngày nhận chứng từ trong checklist!"
            }, "error");
            return;

            break;
        }

    }


    if (v_check == 0) {
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

                Ham_Chuyen_HS_TT(MaHS_ThanhToan);

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
                        MaHS_ThanhToan: MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

    $("#tabstrip_ThanhToan-1").css('height', 'auto');
    $("#tabstrip_ThanhToan-2").css('height', 'auto');
    $("#tabstrip_ThanhToan-3").css('height', 'auto');

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
                        MaHS_ThanhToan: MaHS_ThanhToan
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=MaHS_ThanhToan.aspx";
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

function Ham_Ex_Checklist() {

    $("#grid_checklist_PO").data("kendoGrid").saveAsExcel();

}


function checkboxClicked(element) {

    var isChecked = element.checked,
    cell = $(element).parent(), /* you have to find cell containing check box*/
    grid = $("#grid_checklist_PO").data("kendoGrid");
    grid.editCell(cell);
}
//#endregion tiến trình thanh toán




