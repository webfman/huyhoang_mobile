var HopDong_ID, NhaThau_Ten, detailInit_e, BienChiTietPO;
var Path;
var DS_MaHopDong, DS_HopDong, DS_NhaThau;

$(document).ready(function () {


    $("#main-menu-min").click();

    //$('#div_HS_ThanhToan').hide();
    $('#btn_Back').hide();

    //#region DataSource

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
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    //#endregion DataSource

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
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
            e.data = { LoaiFile: 'VBNghiemThu' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                //alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                $("#notification").data("kendoNotification").show({
                    title: "Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                //alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                $("#notification").data("kendoNotification").show({
                    title: "Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
        }
    });

    

    $("#grid_POs").kendoGrid({
        //toolbar: function () {
        //    return '<div class="Toolbar_left"><a class="btn btn-info" onclick="Luu_MaHS();"><i class="fa fa-save"></i> Lưu</a></div>';
        //},
        toolbar: kendo.template($("#Templ_POs").html()),
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
                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                    window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                    window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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

                        }
                ],
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

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
                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                }
                            ]
                    });
                }

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
                    }
                }
            ]
    });

    $("#grid_PO").kendoGrid({
        //toolbar: function () {
        //    return '<div class="Toolbar_left"><a class="btn btn-info" onclick="Luu_MaHS();"><i class="fa fa-save"></i> Lưu</a></div>';
        //},
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
        detailInit: function Ham_ChiTiet_PO(f) {
            

            BienChiTietPO = f;

            var detailRow = f.detailRow;

            detailRow.find("#tabstrip").kendoTabStrip({
                animation: {
                    open: { effects: "fadeIn" }
                },
                select: function (e) {
                    

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
                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                    window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                    window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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

                        }
                ],
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

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
                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                }
                            ]
                    });
                }

            });



            ///////////////////////////////////////


            //#endregion   
        },
        sortable: true,
        selectable: "multiple",
        columns:
            [
                { field: "HopDong_ID", hidden: true },
                { field: "PO_ID", hidden: true },                
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
                    }
                }
            ]
    });

    


    $("#wd_HoanTat").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: "HOÀN TẤT NGHIỆM THU",
        visible: false

    }).data("kendoWindow");

    $("#wd_Chon_PO").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: " ",
        visible: false

    }).data("kendoWindow");

    $("#wd_Chon_POs").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: " ",
        visible: false

    }).data("kendoWindow");

    

    $("#grid_VatTu_HoanTat").kendoGrid({
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
        editable: true,
        columns:
        [

            {
                title: "Vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "VatTu_Ten",
                template: "<div>#= VatTu_Ma #</div><br><div>#= VatTu_Ten #</div>",
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;"
                },
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                width: "40%"
            },
            {
                title: "Số lượng nghiệm thu kế hoạch",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_NghiemThu",
                template: function (data) {
                    return OnChangeFormat(data.SoLuong_NghiemThu);
                },
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:red;"
                }
            },    
            {
                title: "Số lượng nghiệm thu thực tế",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_ThucTe",
                template: function (data) {
                    return OnChangeFormat(data.SoLuong_ThucTe);
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
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;background-color:lightyellow;"
                }
            },
            {
                title: "Chất lượng kỹ thuật",
                headerAttributes: {
                    class: "header_css"
                },
                field: "ChatLuong_KyThuat",
                template: function (data) {
                    if (data.ChatLuong_KyThuat == 0) {
                        return '<b style="color:green;">Đạt</b>'
                    }
                    else {
                        return '<b style="color:red;">Không đạt</b>'
                    }
                },
                editor: function (container, options) {
                    $('<input name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoDropDownList({
                            dataSource: [
                                { id: 0, text: "Đạt" },
                                { id: 1, text: "Không đạt" }
                            ],
                            dataTextField: "text",
                            dataValueField: "id"
                        });
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;background-color:lightyellow;"
                }
            },

        ]
    });



    $("#grid_VatTu").kendoGrid({        
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
        editable: true,
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
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                width: "20%"
            },
            {
                title: "Số lượng hợp đồng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_HopDong",
                template: "#= OnChangeFormat(SoLuong_HopDong) #",
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:green;"
                }
            },
            {
                title: "Số lượng PO",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_PO",
                template: "#= OnChangeFormat(SoLuong_PO) #",
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:green;"
                }
            },
            {
                title: "Số lượng đã nghiệm thu hợp đồng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_Da_NghiemThu_HopDong",
                template: "#= OnChangeFormat(SoLuong_Da_NghiemThu_HopDong) #",
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:red;"
                }
            },
            {
                title: "Số lượng đã nghiệm thu PO",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_Da_NghiemThu_PO",
                template: "#= OnChangeFormat(SoLuong_Da_NghiemThu_PO) #",
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:red;"
                }
            },            
            {
                title: "Số lượng nghiêm thu",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong_NghiemThu",
                template: function (data) {
                    return OnChangeFormat(data.SoLuong_NghiemThu);
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
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;background-color:lightyellow;"
                }
            },
            {
                title: "Đơn giá",
                headerAttributes: {
                    class: "header_css"
                },
                field: "DonGia",
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
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
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
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
                editor: function (container, options) {
                    container.text(options.model[options.field]);
                },
                template: "#= OnChangeFormat(ThanhTien) #",
                attributes: {
                    class: "row_css"
                },                
                width: "15%"

            }
        ]
    });

    $("#txt_ChuyenVien_TTCW").kendoComboBox({
        filter: "startswith",
        dataTextField: "TenNguoiDung",
        dataValueField: "MaNguoiDung",
        //headerTemplate: '<div class="dropdown-header">' +
        //        '<span class="k-widget k-header">Photo</span>' +
        //        '<span class="k-widget k-header">Contact info</span>' +
        //    '</div>',
        template: '<span class="k-state-default"><img src="#:data.Hinh==null?"Images/user-icon.png":data.Hinh#" alt=\"#:data.MaNguoiDung#\" /></span>' +
                  '<span class="k-state-default"><h3>#: data.TenNguoiDung #</h3><p>#: data.Ho == null ? "" : data.Ho # #: data.Ten == null ? "" : data.Ten #</p></span>',
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongTinCaNhan.aspx",
                        data: {
                            cmd: 'HienThi_NguoiDung'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        height: 370
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

    
    

    $("#wd_PhuongThu_NghiemThu").kendoWindow({
        draggable: false,
        height: "auto",
        width: "30%",        
        modal: true,
        resizable: false,
        title: "Chọn phương thức nghiệm thu",
        visible: false

    }).data("kendoWindow");

    $("#wd_NghiemThu").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        modal: true,
        resizable: false,
        title: "Nghiệm thu ngẫu nhiên",
        visible: false

    }).data("kendoWindow");

    

    $("#txt_Ngay_NghiemThu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayThucTe_NghiemThu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#cmb_Kho_TTCW").kendoComboBox({

        optionLabel: "--Chọn kho--",
        dataTextField: "ten_kho",
        dataValueField: "ma_kho",
        dataSource: {

            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                        data: {
                            cmd: 'DanhMuc_Kho'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
    //#endregion control

    //#region event

    
    
    //#endregion event

    
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
        detailInit: detailInit,
        columns:
            [
                {
                    hidden: true,
                    field: "HopDong_ID"
                },                
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
                    template: "#= NgayKy_f #",
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
                    width: 50
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

                //{
                //    title: "File văn bản",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "FileVB",
                //    template: '#= Ham_HienThi_VB(FileVB) #',
                //    width: 100
                //}
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
                                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                                        data: {
                                            cmd: 'ChiTiet_HopDong_NghiemThu',
                                            HopDong_ID: e.data.HopDong_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                title: "Số lượng nghiệm thu",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "Soluong_NghiemThu",
                                template: "#= OnChangeFormat(Soluong_NghiemThu) #",
                                attributes: {
                                    class: "row_css",
                                    style: "font-weight:bold;color:red;"
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
               
                case "Danh sách PO":

                    detailRow.find("#tab_PO").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                                        data: {
                                            cmd: 'ThanhToan_PO_Con_byHD',
                                            HopDong_ID: e.data.HopDong_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                { field: "SoTienDaThanhToan", aggregate: "sum" },
                                { field: "TongTienThanhToan", aggregate: "sum" },
                                { field: "TongTienTamUng", aggregate: "sum" }
                            ]
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
                        columns:
                            [
                                {

                                    template: function (data) {

                                        if (data.Check_XuatPO_HD == '0') {

                                            return '<center><span class="label label-success">Chưa xuất PO con</span></center>';
                                        }
                                        else {
                                            return '<center><span class="label label-important">Đã xuất PO con</span></center>';
                                        }
                                    },
                                    width: 110
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
                                    title: "Số văn bản",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoVanBan_PO",
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
                                    title: "Giá trị PO con",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "TongTienThanhToan",
                                    template: "#= OnChangeFormat(TongTienThanhToan) #",
                                    aggregates: ["sum"],
                                    footerTemplate: "<div class=\"row_css\" style=\"color:red;\">#=OnChangeFormat(sum) #</div>",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"
                                    }
                                }

                            ],
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        detailInit: function (f) {


                            $("<div />").appendTo(f.detailCell).kendoGrid({
                                dataSource: {
                                    transport: {
                                        read: function (options) {
                                            $.ajax({
                                                type: "POST",
                                                url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                                                data: {
                                                    cmd: 'HienThi_NghiemThu_VatTu',
                                                    HopDong_ID: e.data.HopDong_ID,
                                                    PO_ID: f.data.PO_ID
                                                },
                                                dataType: 'json',
                                                success: function (result) {
                                                    if (result == "err401") {
                                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                                columns: [

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
                                        editor: function (container, options) {
                                            container.text(options.model[options.field]);
                                        },
                                        width: "40%"
                                    },
                                    {
                                        title: "Đơn vị tính",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "TenDVT",
                                        editor: function (container, options) {
                                            container.text(options.model[options.field]);
                                        },
                                        attributes: {
                                            class: "row_css"
                                        }
                                    },
                                    {
                                        title: "Số lượng PO",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "SoLuong_PO",
                                        template: "#= OnChangeFormat(SoLuong_PO) #",
                                        editor: function (container, options) {
                                            container.text(options.model[options.field]);
                                        },
                                        attributes: {
                                            class: "row_css",
                                            style: "font-weight:bold;color:green;"
                                        }
                                    },
                                    
                                    {
                                        title: "Số lượng đã nghiệm thu",
                                        headerAttributes: {
                                            class: "header_css"
                                        },
                                        field: "SoLuong_Da_NghiemThu_PO",
                                        template: "#= OnChangeFormat(SoLuong_Da_NghiemThu_PO) #",
                                        editor: function (container, options) {
                                            container.text(options.model[options.field]);
                                        },
                                        attributes: {
                                            class: "row_css",
                                            style: "font-weight:bold;color:red;"
                                        }
                                    }                                   
                                ]
                            });


                        }

                    });

                    break;
            }

        }
    });

    detailRow.find("#tab_NghiemThu").kendoGrid({

        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                        data: {
                            cmd: 'HienThi_NghiemThu',
                            HopDong_ID: e.data.HopDong_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
            //if ($("[id$=_hf_nt]").val().trim() == "") {
            return '<div class="Toolbar_left"><a class="btn btn-info" onclick="Them_NghiemThu(' + e.data.HopDong_ID + ',\'' + e.data.NhaThau_Ten + '\');"><i class="fa fa-plus"></i> Tạo đợt nghiệm thu</a></div>';
            //} else {
            //    return ''
            //}
        },
        columns:
            [
                  {
                      template: function (data) {
                          if (data.TinhTrang == 0) {
                              return '<center><a class="btn btn-warning" onclick="Ham_HoanTat_NT(' + data.ID + ');" ><i class="fa fa-random"></i> Hoàn tất</a></center>';
                          } else {
                              return '';
                          }
                      },
                      width: 100
                  },
                {
                    template: function (data) {
                        if (data.TinhTrang == 0) {
                            return '<center><a class="btn btn-info" onclick="Ham_Sua_NT(' + data.ID + ');" ><i class="fa fa-edit "></i> Sửa</a></center>';
                        } else {
                            return '';
                        }
                    },
                    width: 80
                },
                {

                    template: function (data) {
                        if (data.TinhTrang == 0) {
                            return '<center><a class="btn btn-danger" onclick="Ham_Xoa_NT(' + data.ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                        } else {
                            return '';
                        }
                    },
                    width: 80
                },
                {
                    title: "Ngày nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ngay_NghiemThu_f",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    width: 120
                },
                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TinhTrang",
                    template: function (data) {
                        if (data.TinhTrang == 0) {
                            return '<center><span class="label label-success">Kế hoạch</span></center>';
                        }
                        //else if (data.TinhTrang == 1) {
                        //    return '<center><span class="label label-warning">Theo dõi</span></center>';
                        //}
                        else {
                            return '<center><span class="label label-important">Hoàn tất</span></center>';
                        }

                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 100
                },                            
                {
                    title: "Phương thức nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PhuongThuc_NghiemThu",
                    template:function (data) {
                        if (data.PhuongThuc_NghiemThu == 0) {
                            return '<b>NGẪU NHIÊN</b>'
                        }
                        else {
                            return '<b>THEO PO</b><br><b style="color:red">' + data.SoPO + '</b>';
                        }
                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 150
                },
                {
                    title: "Địa điểm nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    columns:[
                        {
                            title: "Kho TTCW",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "Kho_TTCW",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        },
                        {
                            title: "Đơn vị QLSD",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "DVQLSD",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        },
                        {
                            title: "Kho Nhà cung cấp",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "Kho_NT",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        }
                    ]                   
                },
                {
                    title: "Thanh phần nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    columns: [
                        {
                            title: "Trung tâm Cung ứng",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_TTCW",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_TTCW_Ten",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        },
                        {
                            title: "Nhà thầu",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [                                
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_NT",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_NT",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        },
                        {
                            title: "Đơn vị QLSD",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_DVQLSD",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_DVQLSD",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        }
                    ]
                }              
            ],

        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function (f) {

            
            $("<div style='width:50%;'/>").appendTo(f.detailCell).kendoGrid({
                dataSource: {

                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                                data: {
                                    cmd: 'HienThi_NghiemThu_ChiTiet',
                                    NghiemThu_Dot_ID: f.data.ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
                                }
                            });
                        }
                    }

                },                
                columns: [                                        
                    {
                        title: "Vật tư nghiệm thu",
                        headerAttributes: { class: "header_css" },
                        field: "VatTu_ID",
                        template: function (data) {
                            return "<div>" + data.VatTu_Ma + "</div><br><div>" + data.VatTu_Ten + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.DonViTinh + "</div>";
                        },
                        attributes: { class: "row_css", style: "font-weight:bold;" },
                        width: 120
                    },
                    {
                        title: "Số lượng nghiệm thu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoLuong_NghiemThu",                        
                        template: function (data) {
                            return '' + OnChangeFormat(data.SoLuong_NghiemThu) + '';
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:green;"
                        },
                        width: 50
                    },
                    {
                        title: "Tỷ lệ số lượng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TyLe",
                        template: function (data) {
                            return '' + data.TyLe.toFixed(3) + ' %';
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 50
                    }
                ]
            });

        }
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

//#endregion


//#region NGHIỆM THU NGẪU NHIÊN

//#region Thêm nghiệm thu

function Them_NghiemThu(p_HopDong_ID,p_NhaThau_Ten) {
    
    HopDong_ID = p_HopDong_ID;
    NhaThau_Ten = p_NhaThau_Ten;

    $("#wd_PhuongThu_NghiemThu").data("kendoWindow").center().open();
}
function Ham_Chon_PhuongThuc() {

    if ($('input:radio[name=rdo_phuongthuc]:checked').val() == "1") {
        Ham_NghiemThu_NgauNhien();
    }
    else if ($('input:radio[name=rdo_phuongthuc]:checked').val() == "2") {
        Ham_NghiemThu_PO();
    }
    else {
        Ham_NghiemThu_POs();
    }

    


}


function Ham_NghiemThu_NgauNhien() {

    $("#lb_TenNhaThau").text(NhaThau_Ten.toUpperCase());

    $("#hf_PhuongThu_NghiemThu").val(0);
    $("#hf_PO_ID").val(0);
    $("#txt_SoPO").text("");

    $("#tr_PO").hide();
    $("#tr_POs").hide();


    //clear control
    
    $("#txt_Ngay_NghiemThu").val("");    
    $("#cmb_Kho_TTCW").data("kendoComboBox").value("");    
    $("#txt_DVQLSD").val("");
    $("#txt_Kho_NT").val("");
    $("#txt_BoPhan_TTCW").val("")
    $("#txt_ChuyenVien_TTCW").data("kendoComboBox").value("");
    $("#txt_BoPhan_NT").val("");
    $("#txt_ChuyenVien_NT").val("");
    $("#txt_BoPhan_DVQLSD").val("");
    $("#txt_ChuyenVien_DVQLSD").val("");
    $("#txt_GhiChu").val("");





    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                    data: {
                        cmd: 'HienThi_NghiemThu_VatTu',
                        HopDong_ID: HopDong_ID,
                        PO_ID : 0
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
        schema: {
            model: {
                fields: {
                    SoLuong: { editable: false, type: "number" },
                    SoLuong_Da_NghiemThu: { editable: false, type: "number" },
                    SoLuong_NghiemThu: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            //////////////////////////////////
                            NameValidation: function (input) {

                                var grid = $("#grid_VatTu").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SL_NghiemThu = parseFloat($(input).val());
                                var SL_Da_NghiemThu = dataRow.SoLuong_Da_NghiemThu_HopDong;
                                var SL_HD = dataRow.SoLuong_HopDong;


                                if (input.is("[name='SoLuong_NghiemThu']") && input.val() == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }
                                if (input.is("[name='SoLuong_NghiemThu']") && (SL_NghiemThu + SL_Da_NghiemThu) > SL_HD) {
                                    input.attr("data-NameValidation-msg", "Số lượng vượt quá giới hạn!");
                                    return false;
                                }

                                return true;

                            }                           
                        }
                    }
                }
            }
        }
    });
    
    

   
    
    $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

    var grid_VatTu = $("#grid_VatTu").data("kendoGrid");
    
    grid_VatTu.hideColumn("SoLuong_Da_NghiemThu_PO");    
    grid_VatTu.hideColumn("SoLuong_PO");

    grid_VatTu.showColumn("SoLuong_HopDong");    
    grid_VatTu.showColumn("SoLuong_NghiemThu_HopDong");


    $("#hf_ID_NghiemThu").val("0");

    


    $("#wd_NghiemThu").data("kendoWindow").center().open();

}
function Ham_HienThi_DVQLSD() {

    $("#lb_DVQLSD").text($("#txt_DVQLSD").val().toUpperCase());

}
//#endregion Thêm nghiệm thu

//#region Xóa nghiệm thu

function Ham_Xoa_NT(p_ID) {

    if (confirm("Bạn có chắc muốn xóa đợt nghiệm thu này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
            data: {
                cmd: 'Xoa_NghiemThu',
                NghiemThu_Dot_ID: p_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                
                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công!"
                }, "upload-success");

                
                detailInit_e.detailRow.find("#tab_NghiemThu").data('kendoGrid').dataSource.read();

            }
            else {
                //alert(msg[0].ErrorMessage);
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {

            //alert("Request failed: " + textStatus);
            $("#notification").data("kendoNotification").show({
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");
        });
    }
}

//#endregion Xóa nghiệm thu

function Ham_Sua_NT(p_ID) {

    var grid_data = detailInit_e.detailRow.find("#tab_NghiemThu").data("kendoGrid"),
                data = grid_data.dataSource.data();
    var res = $.grep(data, function (d) {
        return d.ID == p_ID;
    });





    $("#wd_NghiemThu").data("kendoWindow").center().open();

    //Dữ liệu đợt nghiệm thu
    $("#hf_ID_NghiemThu").val(p_ID);
    $("#txt_Ngay_NghiemThu").val(res[0].Ngay_NghiemThu_f);
    $("#cmb_Kho_TTCW").data("kendoComboBox").value(res[0].Kho_TTCW);
    $("#txt_DVQLSD").val(res[0].DVQLSD);
    $("#txt_Kho_NT").val(res[0].Kho_NT);
    $("#txt_BoPhan_TTCW").val(res[0].BoPhan_TTCW)
    $("#txt_ChuyenVien_TTCW").data("kendoComboBox").value(res[0].ChuyenVien_TTCW);
    $("#txt_BoPhan_NT").val(res[0].BoPhan_NT);
    $("#txt_ChuyenVien_NT").val(res[0].ChuyenVien_NT);
    $("#txt_BoPhan_DVQLSD").val(res[0].BoPhan_DVQLSD);
    $("#txt_ChuyenVien_DVQLSD").val(res[0].ChuyenVien_DVQLSD);
    $("#txt_GhiChu").val(res[0].GhiChu);

    HopDong_ID = res[0].HopDong_ID;
    var ds;

    if (res[0].PhuongThuc_NghiemThu == 0) {

        ds = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                        data: {
                            cmd: 'HienThi_NghiemThu_ChiTiet_Sua',
                            HopDong_ID: HopDong_ID,
                            NghiemThu_Dot_ID: res[0].ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
            schema: {
                model: {
                    fields: {
                        SoLuong: { editable: false, type: "number" },
                        SoLuong_Da_NghiemThu: { editable: false, type: "number" },
                        SoLuong_NghiemThu: {
                            type: "number",
                            validation: {
                                //required: { message: "Chưa nhập số lượng!" }
                                //////////////////////////////////
                                NameValidation: function (input) {

                                    var grid = $("#grid_VatTu").data("kendoGrid");
                                    var tr = $(input).closest('tr');
                                    var dataRow = grid.dataItem(tr);

                                    var SL_NghiemThu = parseFloat($(input).val());
                                    var SL_Da_NghiemThu = dataRow.SoLuong_Da_NghiemThu_HopDong;
                                    var SL_HD = dataRow.SoLuong_HopDong;


                                    if (input.is("[name='SoLuong_NghiemThu']") && input.val() == "") {
                                        input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                        return false;
                                    }
                                    if (input.is("[name='SoLuong_NghiemThu']") && (SL_NghiemThu + SL_Da_NghiemThu) > SL_HD) {
                                        input.attr("data-NameValidation-msg", "Số lượng vượt quá giới hạn!");
                                        return false;
                                    }

                                    return true;

                                }
                            }
                        }
                    }
                }
            }
        });

        $("#hf_PhuongThu_NghiemThu").val(0);
        $("#hf_PO_ID").val(0);
        $("#txt_SoPO").text("");
        $("#tr_PO").hide();


        $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

        var grid_VatTu = $("#grid_VatTu").data("kendoGrid");

        grid_VatTu.hideColumn("SoLuong_Da_NghiemThu_PO");
        grid_VatTu.hideColumn("SoLuong_PO");

        grid_VatTu.showColumn("SoLuong_HopDong");
        grid_VatTu.showColumn("SoLuong_NghiemThu_HopDong");

    }
    else {

        ds = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                        data: {
                            cmd: 'HienThi_NghiemThu_ChiTiet_Sua',
                            HopDong_ID: HopDong_ID,
                            NghiemThu_Dot_ID: res[0].ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
            schema: {
                model: {
                    fields: {
                        SoLuong: { editable: false, type: "number" },
                        SoLuong_Da_NghiemThu: { editable: false, type: "number" },
                        SoLuong_NghiemThu: {
                            type: "number",
                            validation: {
                                //required: { message: "Chưa nhập số lượng!" }
                                //////////////////////////////////
                                NameValidation: function (input) {

                                    var grid = $("#grid_VatTu").data("kendoGrid");
                                    var tr = $(input).closest('tr');
                                    var dataRow = grid.dataItem(tr);

                                    var SL_NghiemThu = parseFloat($(input).val());
                                    var SL_Da_NghiemThu = dataRow.SoLuong_Da_NghiemThu_PO;
                                    var SL_PO = dataRow.SoLuong_PO;


                                    if (input.is("[name='SoLuong_NghiemThu']") && input.val() == "") {
                                        input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                        return false;
                                    }
                                    if (input.is("[name='SoLuong_NghiemThu']") && (SL_NghiemThu + SL_Da_NghiemThu) > SL_PO) {
                                        input.attr("data-NameValidation-msg", "Số lượng vượt quá giới hạn!");
                                        return false;
                                    }

                                    return true;

                                }
                            }
                        }
                    }
                }
            }
        });

        $("#hf_PhuongThu_NghiemThu").val(1);
        $("#hf_PO_ID").val(res[0].PO_ID);
        $("#txt_SoPO").text(res[0].SoPO);
        $("#tr_PO").show();

        $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

        var grid_VatTu = $("#grid_VatTu").data("kendoGrid");

        grid_VatTu.showColumn("SoLuong_Da_NghiemThu_PO");
        grid_VatTu.showColumn("SoLuong_PO");

        grid_VatTu.hideColumn("SoLuong_Da_NghiemThu_HopDong");
        grid_VatTu.hideColumn("SoLuong_HopDong");

    }

}


//#endregion NGHIỆM THU NGẪU NHIÊN

//#region NGHIỆM THU PO
function Ham_NghiemThu_PO() {

    $("#wd_Chon_PO").data("kendoWindow").center().open();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_HD',
                        HopDong_ID: HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
function Ham_Chon_PO() {


    var grid_PO = $("#grid_PO").data("kendoGrid");
    var selectedItem = grid_PO.dataItem(grid_PO.select());

    if (selectedItem == null) {
        $("#notification").data("kendoNotification").show({
            title: "Chưa chọn PO!",
            message: "Hãy chọn PO!"
        }, "error");
        return;
    }    
    else {        
        Ham_NghiemThu_PO_HienThi(selectedItem.PO_ID, selectedItem.SoPO);
    }


}
function Ham_NghiemThu_PO_HienThi(p_PO_ID, p_SoPO) {
    

    $("#lb_TenNhaThau").text(NhaThau_Ten.toUpperCase());

    $("#hf_PhuongThu_NghiemThu").val(1);
    $("#hf_PO_ID").val(p_PO_ID);
    $("#txt_SoPO").text(p_SoPO);

    $("#tr_PO").show();
    
    //clear control
       
    $("#txt_Ngay_NghiemThu").val("");
    $("#cmb_Kho_TTCW").data("kendoComboBox").value("");
    $("#txt_DVQLSD").val("");
    $("#txt_Kho_NT").val("");
    $("#txt_BoPhan_TTCW").val("")
    $("#txt_ChuyenVien_TTCW").data("kendoComboBox").value("");
    $("#txt_BoPhan_NT").val("");
    $("#txt_ChuyenVien_NT").val("");
    $("#txt_BoPhan_DVQLSD").val("");
    $("#txt_ChuyenVien_DVQLSD").val("");
    $("#txt_GhiChu").val("");

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                    data: {
                        cmd: 'HienThi_NghiemThu_VatTu',
                        HopDong_ID: HopDong_ID,
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
        schema: {
            model: {
                fields: {
                    SoLuong: { editable: false, type: "number" },
                    SoLuong_Da_NghiemThu: { editable: false, type: "number" },
                    SoLuong_NghiemThu: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            //////////////////////////////////
                            NameValidation: function (input) {

                                var grid = $("#grid_VatTu").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SL_NghiemThu = parseFloat($(input).val());
                                var SL_Da_NghiemThu = dataRow.SoLuong_Da_NghiemThu_PO;
                                var SL_PO = dataRow.SoLuong_PO;


                                if (input.is("[name='SoLuong_NghiemThu']") && input.val() == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }
                                if (input.is("[name='SoLuong_NghiemThu']") && (SL_NghiemThu + SL_Da_NghiemThu) > SL_PO) {
                                    input.attr("data-NameValidation-msg", "Số lượng vượt quá giới hạn!");
                                    return false;
                                }

                                return true;

                            }
                        }
                    }
                }
            }
        }
    });

    $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

    var grid_VatTu = $("#grid_VatTu").data("kendoGrid");

    grid_VatTu.showColumn("SoLuong_Da_NghiemThu_PO");    
    grid_VatTu.showColumn("SoLuong_PO");

    grid_VatTu.hideColumn("SoLuong_Da_NghiemThu_HopDong");  
    grid_VatTu.hideColumn("SoLuong_HopDong");
    
  

    $("#hf_ID_NghiemThu").val("0");
    $("#wd_NghiemThu").data("kendoWindow").center().open();

}

//#endregion NGHIỆM THU PO



//#region LƯU NGHIỆM THU

function Ham_Luu_NghiemThu() {

    if ($("#cmb_Kho_TTCW").data("kendoComboBox").selectedIndex == -1) {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa chọn kho TTCW"
        }, "error");

        return;
    }

    if ($("#txt_Kho_NT").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập kho nhà cung cấp"
        }, "error");
        return;
    }

    if ($("#txt_DVQLSD").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập kho đơn vị quản lý sử dụng"
        }, "error");
        return;
    }
    if ($("#txt_Ngay_NghiemThu").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập thời gian nghiệm thu"
        }, "error");
        return;
    }
    if ($("#txt_BoPhan_TTCW").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập bộ phận TTCW"
        }, "error");
        return;
    }
    if ($("#txt_BoPhan_NT").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập bộ phận nhà thầu"
        }, "error");
        return;
    }
    if ($("#txt_BoPhan_DVQLSD").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập bộ phận đơn vị QLSD"
        }, "error");
        return;
    }
    if ($("#txt_ChuyenVien_NT").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập chuyên viên nhà thầu"
        }, "error");
        return;
    }
    if ($("#txt_ChuyenVien_DVQLSD").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập chuyên viên đơn vị QLSD"
        }, "error");
        return;
    }
    if ($("#txt_ChuyenVien_TTCW").data("kendoComboBox").selectedIndex == -1) {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa chọn chuyên viên TTCW"
        }, "error");

        return;
    }

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
        data: {
            cmd: 'CapNhat_NghiemThu',
            gData: JSON.stringify($("#grid_VatTu").data("kendoGrid").dataSource.view()),
            ID: $("#hf_ID_NghiemThu").val(),
            HopDong_ID: HopDong_ID,
            Ngay_NghiemThu: $("#txt_Ngay_NghiemThu").val(),
            TinhTrang: 0,
            PhuongThuc_NghiemThu: $("#hf_PhuongThu_NghiemThu").val(),
            PO_ID: $("#hf_PO_ID").val(),
            Kho_TTCW: $("#cmb_Kho_TTCW").data("kendoComboBox").value(),
            DVQLSD: $("#txt_DVQLSD").val(),
            Kho_NT: $("#txt_Kho_NT").val(),
            BoPhan_TTCW: $("#txt_BoPhan_TTCW").val(),
            ChuyenVien_TTCW: $("#txt_ChuyenVien_TTCW").val(),
            BoPhan_NT: $("#txt_BoPhan_NT").val(),
            ChuyenVien_NT: $("#txt_ChuyenVien_NT").val(),
            BoPhan_DVQLSD: $("#txt_BoPhan_DVQLSD").val(),
            ChuyenVien_DVQLSD: $("#txt_ChuyenVien_DVQLSD").val(),
            GhiChu: $("#txt_GhiChu").val()
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            detailInit_e.detailRow.find("#tab_NghiemThu").data('kendoGrid').dataSource.read();


            $("#notification").data("kendoNotification").show({
                message: "Đã cập nhật thành công!"
            }, "upload-success");


            $("#wd_NghiemThu").data("kendoWindow").close();
            $("#wd_Chon_PO").data("kendoWindow").close();           
            $("#wd_PhuongThu_NghiemThu").data("kendoWindow").close();


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


function Ham_HoanTat_NT(p_ID) {

    Path = "";
    uploadReset();
    $("#txt_NgayThucTe_NghiemThu").val("");
    $("#txt_GhiChu_HoanTat").val("");

    var grid_data = detailInit_e.detailRow.find("#tab_NghiemThu").data("kendoGrid"),
                data = grid_data.dataSource.data();
    var res = $.grep(data, function (d) {
        return d.ID == p_ID;
    });

    

    
    $("#hf_ID_NghiemThu").val(p_ID);
    $("#lb_NgayKeHoach_NghiemThu").text(res[0].Ngay_NghiemThu_f);


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                    data: {
                        cmd: 'HienThi_NghiemThu_ChiTiet',                        
                        NghiemThu_Dot_ID: p_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
        schema: {
            model: {
                fields: {
                    
                    SoLuong_NghiemThu: { editable: false, type: "number" },
                    SoLuong_ThucTe: {
                        type: "number",
                        validation: {
                            
                            //////////////////////////////////
                            NameValidation: function (input) {

                                var grid = $("#grid_VatTu_HoanTat").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SL_ThucTe = parseFloat($(input).val());
                                var SL_NghiemThu = dataRow.SoLuong_NghiemThu;
                                


                                if (input.is("[name='SoLuong_ThucTe']") && input.val() == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng thực tế!");
                                    return false;
                                }
                                if (input.is("[name='SoLuong_ThucTe']") && SL_ThucTe > SL_NghiemThu) {
                                    input.attr("data-NameValidation-msg", "Số lượng thực tế vượt quá giới hạn kế hoạch!");
                                    return false;
                                }

                                return true;

                            }
                        }
                    }
                }
            }
        }
    });

    $("#grid_VatTu_HoanTat").data("kendoGrid").setDataSource(ds);




    $("#wd_HoanTat").data("kendoWindow").center().open();



}
function Ham_Luu_HoanTat() {

    if ($("#txt_NgayThucTe_NghiemThu").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập thời gian nghiệm thu thực tế"
        }, "error");
        return;
    }
    if (Path == "") {
        check = 1;        
        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa upload tập tin văn bản nghiệm thu"
        }, "error");

        return;
    }
    
    var grid_VatTu_HoanTat = $("#grid_VatTu_HoanTat").data("kendoGrid").dataSource.data();

    for (var j = 0; j < grid_VatTu_HoanTat.length; j++) {

        if (grid_VatTu_HoanTat[0].SoLuong_ThucTe == 0) {

            $("#notification").data("kendoNotification").show({
                title: "Lỗi",
                message: "Chưa nhập số lượng nghiệm thu thực tế"
            }, "error");
            return;
            break;
            
        }
    }


    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
        data: {
            cmd: 'HoanTat_NghiemThu',
            gData: JSON.stringify($("#grid_VatTu_HoanTat").data("kendoGrid").dataSource.view()),
            NghiemThu_Dot_ID: $("#hf_ID_NghiemThu").val(),
            NgayThucTe_NghiemThu: $("#txt_NgayThucTe_NghiemThu").val(),
            GhiChu_HoanTat: $("#txt_GhiChu_HoanTat").val(),
            File_BBNT: Path
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {

            detailInit_e.detailRow.find("#tab_NghiemThu").data('kendoGrid').dataSource.read();

            $("#notification").data("kendoNotification").show({
                message: "Đợt nghiệm thu đã hoàn tất!"
            }, "upload-success");

            $("#wd_HoanTat").data("kendoWindow").close();            
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


function uploadReset(id) {

    if (id) {
        //if an id is passed as a param, only reset the element's child upload controls (in case many upload widgets exist)
        $("#" + id + " .k-upload-files").remove();
        $("#" + id + " .k-upload-status").remove();
        $("#" + id + " .k-upload.k-header").addClass("k-upload-empty");
        $("#" + id + " .k-upload-button").removeClass("k-state-focused");
    } else {
        //reset all the upload things!
        $(".k-upload-files").remove();
        $(".k-upload-status").remove();
        $(".k-upload.k-header").addClass("k-upload-empty");
        $(".k-upload-button").removeClass("k-state-focused");
    }
}



//#region nhiều PO

function Ham_Chon_POs() {


    if ($("#grid_POs").data("kendoGrid").dataSource.data().length > 0) {

        var str_po = '';
        var DS_PO_NghiemThu = [];

        for (var j = 0; j < $("#grid_POs").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row').length; j++) {

            var chb_po = $("#grid_POs").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[3].childNodes[0].childNodes[0];

            var id = $("#grid_POs").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[2].textContent;

            var SoPO = $("#grid_POs").data("kendoGrid").wrapper.children('.k-grid-content').children().children('tbody').children('.k-master-row')[j].cells[5].textContent;

            if (chb_po.checked == true) {
                
                DS_PO_NghiemThu.push({ "PO_ID": id, "SoPO": SoPO });
                str_po += '' + id + ',';
            }
        }
        str_po = str_po.replace(/^,|,$/g, '');

        if (str_po == '') {

            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn PO.",
                message: "Hãy thao tác lại!"
            }, "error");
        }
        else {

            //Ham_NghiemThu_POs_HienThi(DS_PO_NghiemThu, str_po);
            
                        $("#grid_NghiemThu_PO").kendoGrid({
                dataSource: DS_PO_NghiemThu,
                columns: [
                    {
                        title: "Số PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoPO",
                        attributes: {
                            class: "row_css"
                        }
                    }
                ]

            });
            

            $("#lb_TenNhaThau").text(NhaThau_Ten.toUpperCase());
            $("#hf_PhuongThu_NghiemThu").val(2);
            $("#hf_PO_ID").val(str_po);
            $("#txt_SoPO").text('');

            $("#tr_PO").hide();
            $("#tr_POs").show();

            //clear control

            $("#txt_Ngay_NghiemThu").val("");
            $("#cmb_Kho_TTCW").data("kendoComboBox").value("");
            $("#txt_DVQLSD").val("");
            $("#txt_Kho_NT").val("");
            $("#txt_BoPhan_TTCW").val("")
            $("#txt_ChuyenVien_TTCW").data("kendoComboBox").value("");
            $("#txt_BoPhan_NT").val("");
            $("#txt_ChuyenVien_NT").val("");
            $("#txt_BoPhan_DVQLSD").val("");
            $("#txt_ChuyenVien_DVQLSD").val("");
            $("#txt_GhiChu").val("");



            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                            data: {
                                cmd: 'HienThi_NghiemThu_VatTu_POs',
                                HopDong_ID: HopDong_ID,
                                str_PO_ID: str_po
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
                schema: {
                    model: {
                        fields: {
                            SoLuong: { editable: false, type: "number" },
                            SoLuong_Da_NghiemThu: { editable: false, type: "number" },
                            SoLuong_NghiemThu: {
                                type: "number",
                                validation: {
                                    //required: { message: "Chưa nhập số lượng!" }
                                    //////////////////////////////////
                                    NameValidation: function (input) {

                                        var grid = $("#grid_VatTu").data("kendoGrid");
                                        var tr = $(input).closest('tr');
                                        var dataRow = grid.dataItem(tr);

                                        var SL_NghiemThu = parseFloat($(input).val());
                                        var SL_Da_NghiemThu = dataRow.SoLuong_Da_NghiemThu_PO;
                                        var SL_PO = dataRow.SoLuong_PO;


                                        if (input.is("[name='SoLuong_NghiemThu']") && input.val() == "") {
                                            input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                            return false;
                                        }
                                        if (input.is("[name='SoLuong_NghiemThu']") && (SL_NghiemThu + SL_Da_NghiemThu) > SL_PO) {
                                            input.attr("data-NameValidation-msg", "Số lượng vượt quá giới hạn!");
                                            return false;
                                        }

                                        return true;

                                    }
                                }
                            }
                        }
                    }
                }
            });
            

            $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

            var grid_VatTu = $("#grid_VatTu").data("kendoGrid");

            grid_VatTu.showColumn("SoLuong_Da_NghiemThu_PO");
            grid_VatTu.showColumn("SoLuong_PO");

            grid_VatTu.hideColumn("SoLuong_Da_NghiemThu_HopDong");
            grid_VatTu.hideColumn("SoLuong_HopDong");



            $("#hf_ID_NghiemThu").val("0");

            $("#wd_NghiemThu").data("kendoWindow").center().open();


        }
    }
    else {
        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Hợp đồng chưa có PO!"
        }, "error");
    }

}

function Ham_NghiemThu_POs() {

    $("#wd_Chon_POs").data("kendoWindow").center().open();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_HD',
                        HopDong_ID: HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
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
    $("#grid_POs").data("kendoGrid").setDataSource(ds);
}


