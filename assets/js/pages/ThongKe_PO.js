var DS_DonVi, DS_PO, DS_PO_TD, DS_PO_Loc;
var DS_VatTu, DS_SoHD, DS_TenVT, DS_MaTD, HopDong_ID;
var PO_ID_Sua;
var PO_HD_ID;
var BienChiTietPO, Bien_ChiTiet_VatTu;
var VatTu_ID_PO;
var Path, Path_Sua;
var VatTu_ID, MaDVT;
var DS_VatTu_PO;
var Path_PO, Path_PO_DC;
var GiaTriHopDong_ConLai;
var PO_ChiTiet_ID;
var DS_VT_DayNhay;


$(document).ready(function () {

    //document.oncontextmenu = function () { return false; }

    //#region DataSource
    
    DS_SoHD = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong_CT.aspx",
                    data: {
                        cmd: 'HopDong_CT_SelectAll_MaHD'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    
    DS_PO = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize: 7
    });

    //DS_PO_TD = new kendo.data.DataSource({
    //    transport: {
    //        read: function (options) {
    //            $.ajax({
    //                type: "POST",
    //                url: "assets/ajax/Ajax_PO_Cha.aspx",
    //                data: {
    //                    cmd: 'Lay_DS_PO_TD'
    //                },
    //                dataType: 'json',
    //                success: function (result) {
    //                    options.success(result);
    //                }
    //            });
    //        }
    //    },
    //    pageSize: 7
    //});

    //#endregion
    
    //#region Load Danh sach PO 

    $("#grid_PO").empty();
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
                            //return '<center><a href= "' + value + '" class="k-button" target="_blank" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-seek-s"></span></a></center>';
                            return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i> Tải</a></center>';
                        }
                    },
                    width: "9%"
                }
            ]
    });



    $("#txt_search_soPO").kendoAutoComplete({
        dataTextField: "SoPO",
        dataSource: DS_PO,
        filter: "contains",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.SoPO;

            if (value) {

                $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "SoPO", operator: "eq", value: value });
            }
            else {
                $("#grid_PO").data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_soPO").val('');
        }

    });
    $("#btn_clear_soPO").click(function (e) {
        e.preventDefault();
        $("#txt_search_soPO").val('');
        $("#grid_PO").data("kendoGrid").dataSource.filter({});
    });

    ////////Excel\\\\\\\\\

    $("#grid_PO_ex").empty();
    var grid = $("#grid_PO_ex").kendoGrid({
        excel: {
            allPages: true
        },
        excelExport: function (e) {
            e.preventDefault();

            var workbook = e.workbook;

            detailExportPromises = [];

            var masterData = e.data;

            for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
                exportChiTiet_PO(masterData[rowIndex].PO_ID, rowIndex);
            }

            $.when.apply(null, detailExportPromises)
            .then(function () {

                // get the export results
                var detailExports = $.makeArray(arguments);

                // sort by masterRowIndex
                detailExports.sort(function (a, b) {
                    return a.masterRowIndex - b.masterRowIndex;
                });

                // add an empty column
                workbook.sheets[0].columns.unshift({
                    width: 30
                });

                // prepend an empty cell to each row
                for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                    workbook.sheets[0].rows[i].cells.unshift({});
                }

                // merge the detail export sheet rows with the master sheet rows
                // loop backwards so the masterRowIndex doesn't need to be updated
                for (var i = detailExports.length - 1; i >= 0; i--) {
                    var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

                    var sheet = detailExports[i].sheet;

                    // prepend an empty cell to each row
                    for (var ci = 0; ci < sheet.rows.length; ci++) {
                        if (sheet.rows[ci].cells[0].value) {
                            sheet.rows[ci].cells.unshift({});
                        }
                    }

                    // insert the detail sheet rows after the master row
                    [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                }

                // save the workbook
                kendo.saveAs({
                    dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                    fileName: "Export.xlsx"
                });


            });
        },
        columns:
            [
                { title: "Số PO", field: "SoPO", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày kí PO", field: "NgayKyPO", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số văn bản", field: "SoVanBan", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Người tạo PO", field: "NguoiTaoPO", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Tổng giá trị PO", field: "TongTienPO", template: "#= OnChangeFormat(TongTienPO) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } }

            ]
    });




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
                    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});


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
                    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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
                    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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
                    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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


            if (value == "") {
                $("#grid_PO").data("kendoGrid").dataSource.filter({});
                $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});
            }
            else {
                $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "Check_PO", operator: "eq", value: parseInt(value) });
                $("#grid_PO_ex").data("kendoGrid").dataSource.filter({ field: "Check_PO", operator: "eq", value: parseInt(value) });
            }
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


            if (value == "") {
                $("#grid_PO").data("kendoGrid").dataSource.filter({});
                $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

            }
            else {
                $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "Check_PO_TapDoan", operator: "eq", value: parseInt(value) });
                $("#grid_PO_ex").data("kendoGrid").dataSource.filter({ field: "Check_PO_TapDoan", operator: "eq", value: parseInt(value) });


            }
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

        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);        

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
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
        $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);



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
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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

        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);


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
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
        $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);



    });
    ///////////////////Lọc hợp đồng ///////////////////////

    $("#cmb_Loc_SoHD").kendoComboBox({
        optionLabel: "--Chọn hợp đồng--",
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
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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

        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
        $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);



    });
    $("#btn_loc_hd").click(function () {


        if ($("#cmb_Loc_SoHD").data("kendoComboBox").select() == -1) {
            //alert("Chưa chọn đúng mã hợp đồng!");

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
                                    window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
            $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);
        }
    });
    //#endregion

    $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
    $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);


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
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
                                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
                                                        window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
                    detailRow.find("#tab_PO_Con").empty();
                    detailRow.find("#tab_PO_Con").kendoGrid({

                        dataSource: new kendo.data.DataSource({
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
                                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
                        }),
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
                        columns:
                            [
                                {
                                    title: "Tình trạng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "TinhTrang_ThanhToan",
                                    template: function (data) {

                                        if (data.TinhTrang_ThanhToan == '0') {
                                            return '<center><span class="label label-success">Chưa thanh toán</span></center>';
                                        }
                                        else {
                                            return '<center><span class="label label-important">Đã thanh toán</span></center>';
                                        }
                                    },
                                    width: "12%"
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
                                {
                                    title: "Ngày xuất PO",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "NgayTaoDonHang",
                                    template: "#= NgayTaoDonHang_f #",
                                    attributes: {
                                        class: "row_css"
                                    }
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
                                    width: "20%"
                                },
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
                    url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                    data: {
                        cmd: 'PO_DonVi_SelectbyPO_ID',
                        PO_ID: f.data.PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
                                { field: "ThanhTien_PO", aggregate: "sum" }
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
        //toolbar: $("[id$=_hf_quyen_capnhat]").val() == "true" ? toolbar_vattu : "",
        columns: [

                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    groupHeaderTemplate: "#= Ham_HienThi_MaHD( value ) #",
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
                    width: "20%"
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
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng: #=OnChangeFormat(sum) #</div>"

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

//#region Hiển thị chi tiết vật tư
function Ham_ChiTiet_VatTu(e) {

    Bien_ChiTiet_VatTu = e;

    DS_BangKe_Cap2 = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Con.aspx",
                    data: {
                        cmd: 'BangKe_Cap2',
                        PO_ID: BienChiTietPO.data.PO_ID,
                        VatTu_ID: e.data.VatTu_ID,

                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    e.detailCell.empty();
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: DS_BangKe_Cap2,
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
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",                    
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien",
                    template: "#= OnChangeFormat(ThanhTien) #",
                    attributes: {
                        class: "row_css"
                    }
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

}

function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");

    return "<b>Số hợp đồng: " + arr_dv[1] + "</b>";
}
//#endregion
function Ham_HienThi_Xuat_PO(value) {


    var arr_dv = value.split("*");

    if (arr_dv[0] == "0") {

        return "<b>Số hợp đồng: " + arr_dv[1] + "</b><span class='label label-success' style='margin-left:10px !important;'>Chưa xuất PO con</span>";

    }
    else {
        return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span>';
    }

}
//#endregion 


//#region Xuất ex PO con

function Ham_Xuat_Ex(p_MaHD) {



    $("#tab_VatTu_ex").empty();

    var grid = $("#tab_VatTu_ex").kendoGrid({
        excel: {
            allPages: true
        },
        excelExport: function (e) {

            e.preventDefault();

            var workbook = e.workbook;


            detailExportPromises = [];

            var masterData = e.data;

            for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {

                exportChildData(BienChiTietPO.data.PO_ID, masterData[rowIndex].VatTu_ID, rowIndex);
            }

            $.when.apply(null, detailExportPromises)
            .then(function () {

                // get the export results
                var detailExports = $.makeArray(arguments);

                // sort by masterRowIndex
                detailExports.sort(function (a, b) {
                    return a.masterRowIndex - b.masterRowIndex;
                });

                // add an empty column
                workbook.sheets[0].columns.unshift({
                    width: 30
                });

                // prepend an empty cell to each row
                for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                    workbook.sheets[0].rows[i].cells.unshift({});
                }

                // merge the detail export sheet rows with the master sheet rows
                // loop backwards so the masterRowIndex doesn't need to be updated
                for (var i = detailExports.length - 1; i >= 0; i--) {
                    var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

                    var sheet = detailExports[i].sheet;

                    // prepend an empty cell to each row
                    for (var ci = 0; ci < sheet.rows.length; ci++) {
                        if (sheet.rows[ci].cells[0].value) {
                            sheet.rows[ci].cells.unshift({});
                        }
                    }

                    // insert the detail sheet rows after the master row
                    [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                }

                // save the workbook
                kendo.saveAs({
                    dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                    fileName: "Export.xlsx"
                });


            });
        },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                        data: {
                            cmd: 'PO_DonVi_SelectbyPO_ID',
                            PO_ID: BienChiTietPO.data.PO_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
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
            filter: { field: "MaHD", operator: "eq", value: p_MaHD.trim() },
            aggregate: [
                { field: "ThanhTien_PO", aggregate: "sum" }
            ]
        }),

        columns:
            [
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%"
                },
                {
                    title: "Mã vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%"
                },
                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD_",
                    groupHeaderTemplate: "#= Ham_HienThi_MaHD( value ) #",
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
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    footerTemplate: "Tổng cộng: #=OnChangeFormat(sum) #",
                    width: "12%"
                },
            ],

    });

    $("#tab_VatTu_ex").data("kendoGrid").saveAsExcel();


}
function exportChildData(key_PO_ID, key_VatTu_ID, rowIndex) {


    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{

        cells: [

          { value: "Đơn vị", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Số lượng", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn vị tính", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn giá", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Thành tiền", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "VAT", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" }
        ]
    }];

    var exporter = new kendo.ExcelExporter({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Con.aspx",
                        data: {
                            cmd: 'BangKe_Cap2',
                            PO_ID: key_PO_ID,
                            VatTu_ID: key_VatTu_ID,

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        }),
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
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien",
                    template: "#= OnChangeFormat(ThanhTien) #",
                    attributes: {
                        class: "row_css"
                    }
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
    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });



}
//#endregion 

//#region xuất excel PO lớn

function Ham_PO_Xuat_Ex() {

    $("#grid_PO_ex").data("kendoGrid").saveAsExcel();
}

function exportChiTiet_PO(key_PO_ID, rowIndex) {



    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var exporter = new kendo.ExcelExporter({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                        data: {
                            cmd: 'PO_DonVi_SelectbyPO_ID',
                            PO_ID: key_PO_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=ThongKe_PO.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            group:
                [
                    {
                        field: "MaHD_",
                        aggregates: [
                                { field: "ThanhTien_PO", aggregate: "sum" }
                        ]
                    }

                ]

        }),
        columns:
            [
                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD_",
                    //hidden: true,
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
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Mã vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Số lượng tổng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-weight:bold;"
                    }
                },
                {
                    title: "Đơn giá",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonGia",
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
                    field: "ThanhTien_PO",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    //groupFooterTemplate: "Tổng cộng: #=OnChangeFormat(sum) #"
                    groupFooterTemplate: "#=OnChangeFormat(sum) #"
                }
            ]

    });
    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });



}


//#endregion


