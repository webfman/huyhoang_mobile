﻿
var DS_HopDong, DS_HopDong_TD, DS_HopDong_Loc, DS_HopDong_ChiTiet, DS_NhaThau, DS_LoaiHD, DS_HTMS, DS_LoaiVT, DS_VatTu, DS_DVT;
var detailInit_e, v_STT;
var VatTu_ID_Sua;

var HopDong_ID;
var Path, Path_Sua;

var DS_NguonVon;

$(document).ready(function () {


    document.oncontextmenu = function () { return false; }
    $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#tb_BoLoc").show() : $("#tb_BoLoc").hide();

    //////// DataSource\\\\\\\\\\\\

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
                            window.location.href = "DangNhap.aspx?p=Hop_Dong.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
   
    DS_HopDong = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong.aspx",
                    data: {
                        cmd: 'Lay_DS_HopDong'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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
    DS_HopDong_TD = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong.aspx",
                    data: {
                        cmd: 'Lay_DS_HopDong_TD'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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
    //Bộ lọc  

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
    });    $("#cmb_Loc_ConLai").kendoDropDownList({
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
                                        window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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
    $("#cmb_Loc_TinhTrang").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Hiệu lực", value: "0" },
            { text: "Thanh lý", value: "1" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;


            if (value == "") {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            }
            else {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "TinhTrang_HD", operator: "eq", value: parseInt(value) });
            }
        }

    });

    $("#cmb_Loc_HTMS").kendoDropDownList({
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
                                window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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


            if (value == "") {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            }
            else if (value == null) {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "HinhThucMS_ID", operator: "eq", value: value });
            } else {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "HinhThucMS_ID", operator: "eq", value: parseInt(value) });
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
                                window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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


            if (value == "") {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            }
            else if (value == null) {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "LoaiHD_ID", operator: "eq", value: value });
            } else {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "LoaiHD_ID", operator: "eq", value: parseInt(value) });
            }
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


            if (value == "") {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({});
            }
            else {
                $("#grid_hopdong").data("kendoGrid").dataSource.filter({ field: "NhaThau_ID", operator: "eq", value: parseInt(value) });
            }
        }
    });

    $("#btn_huy_loc").click(function () {
        Load_DS_HopDong(DS_HopDong);
        

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
                                window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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
                Load_DS_HopDong(DS_HopDong);
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
                                        window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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



    //#region Upload   
    $('#files_upload').kendoUpload({
        async: {
            autoUpload: false,
            saveUrl: 'UploadFileVB.aspx'
        },
        error: function (e) {

            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Upload không thành công!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-success').toggleClass('text-danger');
        },
        localization: {
            dropFilesHere: 'Kéo thả file vào đây để upload',
            headerStatusUploaded: 'Đã upload xong',
            headerStatusUploading: 'Đang upload',
            select: 'Chọn file...',
            statusFailed: 'Upload không thành công',
            statusUploaded: 'Đã upload xong',
            statusUploading: 'Đang upload',
            uploadSelectedFiles: 'Upload'

        },
        multiple: false,
        success: function (e) {
            Path = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            e.data = { LoaiFile: 'VBHopDong' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });

    $('#files_upload_sua').kendoUpload({
        async: {
            autoUpload: false,
            saveUrl: 'UploadFileVB.aspx'
        },
        error: function (e) {

            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Upload không thành công!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-success').toggleClass('text-danger');
        },
        localization: {
            dropFilesHere: 'Kéo thả file vào đây để upload',
            headerStatusUploaded: 'Đã upload xong',
            headerStatusUploading: 'Đang upload',
            select: 'Chọn file...',
            statusFailed: 'Upload không thành công',
            statusUploaded: 'Đã upload xong',
            statusUploading: 'Đang upload',
            uploadSelectedFiles: 'Upload'

        },
        multiple: false,
        success: function (e) {

            Path_Sua = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            e.data = { LoaiFile: 'VBHopDong' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });

    //#endregion


   
    $("[id$=_hf_quyen_capnhat]").val() == "true" ? Load_DS_HopDong(DS_HopDong) : Load_DS_HopDong(DS_HopDong_TD);

});

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
        detailInit: detailInit,
        columns:
            [
                {
                    hidden: true,
                    field: "HopDong_ID"
                },
                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TinhTrang_HD",
                    template: "#= HienThi_TinhTrang(TinhTrang_HD) #",
                    width: "6%"
                },
                {
                    title: "Số HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    template: function (data) {
                        //if (data.SoNgayConLai <= 30) {
                        //    return '<img src="Images/alarm_2.gif" height="40" width="40" /><br><b>' + data.MaHD + '</b>';
                        //}
                        //else {
                        return '<b>' + data.MaHD + '</b>';
                        //}

                    },
                    attributes: {
                        class: "row_css"
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
                    },
                    width: "12%"
                },
                {
                    title: "Ngày ký HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKy",
                    template: "#= NgayKy_f #",
                    attributes: {
                        class: "row_css"
                    },
                    width: "8%"
                },

                {
                    title: "HTMS",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "HinhThucMS_Ten",
                    attributes: {
                        class: "row_css"
                    }
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
                    width: "12%"
                },
                {
                    title: "Ngày còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoNgayConLai",
                    template: "#= HienThi_SoNgayConLai(data) #"
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
                        class: "row_css"
                    },
                    width: "8%"
                },

                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: '#= Ham_HienThi_VB(FileVB) #',
                    width: "8%"
                }

            ]
    });



    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: DS_HopDong,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaHD;

            if (value) {

                grid.data("kendoGrid").dataSource.filter({ field: "MaHD", operator: "eq", value: value });
            }
            else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_sohd").val('');
        }

    });
    $("#btn_clear_sohd").click(function (e) {
        e.preventDefault();
        $("#txt_search_sohd").val('');
        grid.data("kendoGrid").dataSource.filter({});
    });

    //////////////////////////////////////////////////

    $("#grid_hopdong_ex").empty();
    var grid = $("#grid_hopdong_ex").kendoGrid({

        excel: {
            allPages: true
        },
        excelExport: function (e) {
            e.preventDefault();

            var workbook = e.workbook;

            detailExportPromises = [];

            var masterData = e.data;

            for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
                exportChildData(masterData[rowIndex].HopDong_ID, rowIndex);
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
        dataSource: d,
        columns:
            [

                { title: "Tên nhà thầu", field: "NhaThau_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày kí hợp đồng", field: "NgayKy", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số hợp đồng", field: "MaHD", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị trước thuế", field: "GiaTriTruocThue", template: "#= OnChangeFormat(GiaTriTruocThue) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị VAT", field: "VAT_HD", template: "#= OnChangeFormat(VAT_HD) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị trước thuế", field: "GiaTriTruocThue", template: "#= OnChangeFormat(GiaTriTruocThue) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số tiền bằng chữ", field: "SoTienBangChu", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày hết hạn", field: "NgayHetHan", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày kế hoạch", field: "NgayKeHoach_NT", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày hiệu lực", field: "NgayHieuLuc", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Nội dung", field: "NoiDung", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Người tạo hợp đồng", field: "NguoiTaoHD", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày tạo hợp đồng", field: "NgayTao", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Loại hợp đồng", field: "LoaiHD_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Hình thức mua sắm", field: "HinhThucMS_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày thanh lý", field: "NgayThanhLy", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số ngày thực hiện", field: "SoNgayThucHien", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số ngày còn lại", field: "SoNgayConLai", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị còn lại", field: "GiaTriConLai_HD", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Tỷ lệ còn lại", field: "TyLeGiaTriConLai", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } }

            ],
        detailInit: function (e) {


            $("<div/>").appendTo(e.detailCell).kendoGrid({
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
                                        window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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
            });

        },
    });
}

function Ham_HD_Xuat_Ex() {

    $("#grid_hopdong_ex").data("kendoGrid").saveAsExcel();

    //var ds = $('#grid_hopdong').data("kendoGrid").dataSource;    
    //var rows = [{

    //    cells: [

    //      { value: "Tên nhà thầu", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày kí hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị trước thuế", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị VAT", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị sau thuế", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số tiền bằng chữ", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày hết hạn", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày kế hoạch", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày hiệu lực", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Nội dung", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Người tạo hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày tạo hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Loại hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Hình thức mua sắm", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày thanh lý", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số ngày thực hiện", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" }

    //    ]
    //}];
    //var workbook;
    ////using fetch, so we can process the data when the request is successfully completed
    //ds.fetch(function () {
    //    var data = this.data();
    //    for (var i = 0; i < data.length; i++) {
    //        //push single row for every record
    //        rows.push({
    //            cells: [
    //              {
    //                  value: data[i].NhaThau_Ten
    //                  ,vAlign: "center" // sets the vertical text alignment.
    //                  ,hAlign: "center" // sets the horizontal text alignment.
    //                  //,background:"#0000ff" //sets the background color of the cell.
    //                  ,bold:true //the cell value is displayed in bold.
    //                  //,color:"#ff0000"// sets the cell text color.
    //                  ,fontName:"Arial" // sets the font used to display the cell value.
    //                  //,fontSize // sets the font size of the cell value.                        
    //                  //,italic // the cell value is displayed in italic.                                                
    //                  //,underline // the cell value is underlined.
    //              },
    //              { value: data[i].NgayKy },
    //              { value: data[i].MaHD },
    //              { value: OnChangeFormat(data[i].GiaTriTruocThue) },
    //              { value: OnChangeFormat(data[i].VAT_HD) },
    //              { value: OnChangeFormat(data[i].GiaTriSauThue) },
    //              { value: data[i].SoTienBangChu },
    //              { value: data[i].NgayHetHan},
    //              { value: data[i].NgayKeHoach_NT },
    //              { value: data[i].NgayHieuLuc},
    //              { value: data[i].NoiDung },
    //              { value: data[i].NguoiTaoHD },
    //              { value: data[i].NgayTao },
    //              { value: data[i].LoaiHD_Ten},
    //              { value: data[i].HinhThucMS_Ten},
    //              { value: data[i].NgayThanhLy},
    //              { value: data[i].SoNgayThucHien}

    //            ]
    //        })
    //    }
    //    workbook = new kendo.ooxml.Workbook({
    //        sheets: [
    //          {
    //              freezePane: {
    //                  rowSplit: 1,
    //                  colSplit: 1
    //              },
    //              columns: [
    //                // Column settings (width)
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true }
    //              ],
    //              // Title of the sheet
    //              title: "Danh sách hợp đồng",
    //              // Rows of the sheet
    //              rows: rows
    //          }
    //        ]

    //    });

    //    //save the file as Excel file with extension xlsx
    //    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "DanhSachHopDong.xlsx" });
    //});



}
function exportChildData(key_id, rowIndex) {

    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{

        cells: [

          { value: "Vật tư", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số lượng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số lượng khả dụng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Đơn giá", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Đơn vị tính", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Thành tiền", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "VAT", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Ghi chú", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" }
        ]
    }];

    var exporter = new kendo.ExcelExporter({
        columns: [
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
                title: "Mã tập đoàn",
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
                title: "Số lượng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong",
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
        ],
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong_CT',
                            HopDong_ID: key_id
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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

    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
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
        }
    });

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
                                window.location.href = "DangNhap.aspx?p=ThongKe_HopDong.aspx";
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



    
}

