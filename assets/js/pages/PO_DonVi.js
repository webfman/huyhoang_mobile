var DS_PO, DS_DonVi, DS_PO_Con, DS_BangKe_Cap1, DS_VatTu_PO, DS_VatTu;
var Path, Path_Sua;


$(document).ready(function () {
    //document.oncontextmenu = function () { return false; }

    $("#main-menu-toggle").click();
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
                    //$("#grid_PO_ex").data("kendoGrid").dataSource.filter({});


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
                    //$("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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
                    //$("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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
                    //$("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

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


            //if (value == "") {
            //    $("#grid_PO").data("kendoGrid").dataSource.filter({});
            //    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});
            //}
            //else {
            //    $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "Check_PO", operator: "eq", value: parseInt(value) });
            //    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({ field: "Check_PO", operator: "eq", value: parseInt(value) });
            //}


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

            $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(ds) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
            //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(ds) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);


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


            //if (value == "") {
            //    $("#grid_PO").data("kendoGrid").dataSource.filter({});
            //    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({});

            //}
            //else {
            //    $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "Check_PO_TapDoan", operator: "eq", value: parseInt(value) });
            //    $("#grid_PO_ex").data("kendoGrid").dataSource.filter({ field: "Check_PO_TapDoan", operator: "eq", value: parseInt(value) });
            //}

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

            $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(ds) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
            //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(ds) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);

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
        //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);



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
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
        //$("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);



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
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
        //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);


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
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
        //$("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);



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
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
        //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);



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
                                    window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
            //$("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_Loc);
        }
    });
    //#endregion

    //#region DataSource

    DS_VatTu = new kendo.data.DataSource({
        data: []
    });

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
                url: "assets/ajax/Ajax_PO_DonVi.aspx/Lay_DS_PO"                
            },
            parameterMap: function (options, operation) {
                return kendo.stringify(options);
            }
        }
    });
    DS_DonVi = new kendo.data.DataSource({
        sort: { field: "ID", dir: "asc" },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_DonVi'
                    },
                    dataType: 'json',
                    success: function (result) {
                        //options.success(result);
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
            e.data = { LoaiFile: 'VBPO_Lon' };
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
            e.data = { LoaiFile: 'VBPO_Lon' };
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
    $('#btn_sua_upload').click(function () {

        $("#tr_download").hide();
        $("#tr_upload").show();
        Path_Sua = "";
    });
    //#endregion

    //#region Control
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


    $("#txt_NgayKy").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayKy_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#wd_PO_them").kendoWindow({
        draggable: false,
        height: "100%",
        width: "90%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới PO",
        visible: false

    }).data("kendoWindow");
    $("#wd_PO_Sua").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Sửa PO",
        visible: false

    }).data("kendoWindow");
    $("#wd_List_Option").kendoWindow({
        draggable: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư thường theo:",
        visible: false,
        height: "30%",
        width: "30%",
        actions: false

    }).data("kendoWindow");

    $("#wd_Show_VatTu").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Tìm vật tư",
        visible: false

    }).data("kendoWindow");
    $("#wd_PhanRa").kendoWindow({
        draggable: false,
        height: "60%",
        width: "40%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Phân rã PO",
        visible: false

    }).data("kendoWindow");
    $("#wd_Show_VatTu").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Tìm vật tư",
        visible: false

    }).data("kendoWindow");
    $("#wd_VatTu_PO_Sua").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Sửa vật tư PO lớn",
        visible: false

    }).data("kendoWindow");

    $("#wd_ChonVatTu_Vuot").kendoWindow({
        draggable: false,
        height: "70%",
        width: "90%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư thường PO lớn",
        visible: false

    }).data("kendoWindow");

    $("#txt_SoLuong_PO").kendoNumericTextBox({
        format: 'n3',
        decimals: 3
    });

    $("#txt_SoLuong_PO_Sua").kendoNumericTextBox({        
        format: 'n3',
        decimals: 3,
        min: "0"
    });
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
        detailInit: Ham_ChiTiet_PO,
        sortable: true,
        columns:
            [
                {
                    title: "Khóa PO",
                    headerAttributes: {
                        class: "header_css"
                    },
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
                    //format: '{0:dd/MM/yyyy}'
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
                },

                //{
                //    template: function (data) {
                //        if (data.TinhTrang == '0') {
                //            return '<center><a class="btn btn-info" onclick="Ham_SuaPO(' + data.PO_ID + ');" ><i class="fa fa-edit "></i> Sửa</a></center>'
                //        } else {
                //            return '';
                //        }

                //    },
                //    width: "9%"
                //},
                //{

                //    template: function Ham_HienThi_Xoa_PO(data) {
                //        if (data.TinhTrang == '0') {                            
                //            return '<center><a class="btn btn-danger" onclick="Ham_XoaPO(' + data.PO_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                //        } else {
                //            return '';
                //        }
                //    },
                //    width: "8%"
                //}
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
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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

    //#region Load danh sách đơn vị tạo PO

    $("#grid_DonVi_Sua").empty();
    $("#grid_DonVi_Sua").kendoGrid({
        dataSource: DS_DonVi,
        scrollable: true,
        columns:
            [
                { field: "ID", hidden: true },
                {
                    field: "select_dv",
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
                    title: "Mã đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_ID",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    });
    ///////// Load danh sách đơn vị\\\\\\\\\\\


    $("#grid_DonVi").empty();
    var grid_donvi = $("#grid_DonVi").kendoGrid({
        dataSource: DS_DonVi,
        toolbar: kendo.template($("#Templ_DonVi").html()),
        columns:
            [
                { field: "ID", hidden: true },
                {
                    field: "select_dv",
                    title: "<input id='chk_all' type='checkbox' />",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: '<center><input type=\'checkbox\' /></center>',
                    sortable: false,
                    width: 80,

                },
                {
                    title: "Mã đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_ID",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    });
    var dropDown = grid_donvi.find("#dl_KhuVuc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "--Tất cả--",
        dataSource: [
            { text: "VNPT khu vực phía Bắc", value: "B" },
            { text: "VNPT khu vực phía Nam", value: "N" }
        ],
        change: function () {
            var value = this.value();
            if (value) {
                grid_donvi.data("kendoGrid").dataSource.filter({ field: "KhuVuc", operator: "eq", value: value });
                document.getElementById('chk_all').checked = false;
            } else {
                grid_donvi.data("kendoGrid").dataSource.filter({});
            }
        }
    });

    $("#chk_all").click(function () {

        if (document.getElementById('chk_all').checked) {

            for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

                $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = true;
            }
        }
        else {
            for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

                $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;
            }
        }

    });
    //#endregion

    //#region Hiển thị danh sách Vật tư
    
    var grid_vattu = $("#grid_VatTu").kendoGrid({
        dataSource: DS_VatTu,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        sortable: true,
        dataBound: function (e) {
            var view = this.dataSource.view();
            for (var i = 0; i < view.length; i++) {
                if (ItemChecked[view[i].uid]) {
                    this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".checkbox")
                    .attr("checked", "checked");
                }
            }
        },
        toolbar: kendo.template($("#Templ_VatuTu").html()),
        columns:
            [
                {
                    field: "select",
                    title: "Chọn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: '<center><input type=\'checkbox\' class=\'checkbox\' /></center>',
                    sortable: false,
                    width: 80,
                    attributes: {
                        style: "background-color:lightyellow;"
                    }
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
                    title: "Mã vật tư tập đoàn",
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
                    title: "Số lượng khả dụng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_KhaDung",
                    type: "number",
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
                    title: "Số HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                }
            ]
    }).data("kendoGrid");

    //bind click event to the checkbox
    grid_vattu.table.on("click", ".checkbox", selectRow);

    var cboSearchBy_VT_Thuong = $('#cboSearchBy_VT_Thuong').kendoDropDownList({
        dataSource: {
            data: ['Số hợp đồng', 'Tên vật tư', 'Mã vật tư']
        }
    }).data('kendoDropDownList');

    $('#btn_loc_vt_VT_Thuong').click(function (e) {
        e.preventDefault();
        filterVatTuHopDong();
    });

    $('#btn_clear_VT_Thuong').click(function (e) {
        e.preventDefault();
        $('#txtSearchValue_VT_Thuong').val('');
        filterVatTuHopDong();
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
                                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                                                        window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                                            window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                        columns:
                            [                                                                
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
                                }                     
                            ]
                    });
                    //#endregion
            }




        }
    });

    //#region Hiển thị phân rã vật tư    
    var toolbar_vattu;
    var columns_vattu;


    if (BienChiTietPO.data.TinhTrang == "0") {
        toolbar_vattu = kendo.template($("#Templ_PO_VatTu").html());
        columns_vattu = [
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
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng: #=OnChangeFormat(sum) #</div>",
                    width: "12%"
                },
                //{

                //    template: function (data) {
                //        if (data.Check_XuatPO_HD == "0") {
                //            return '<center><a onclick="Ham_PhanRa(' + data.PO_ID + ',' + data.PO_HD_ID + ',' + data.VatTu_ID + ');" class="btn btn-info"><i class="fa fa-list"></i> Phân rã</a></center>'
                //        } else {
                //            return '';
                //        }
                //    },
                //    width: "12%"
                //},
                //{

                //    template: function (data) {
                //        if (data.Check_XuatPO_HD == "0") {
                //            return '<center><a class="btn btn-info" onclick="Ham_Sua_PO_HD_CT(' + data.PO_HD_ID + ',\'' + data.VatTu_Ten + '\',' + data.SoLuongTongHD + ',' + data.HopDong_ID + ',' + data.VatTu_ID + ',' + data.SoLuong_PO + ');"><i class="fa fa-edit "></i> Sửa</a></center>'
                //        } else {
                //            return ''
                //        }

                //    },
                //    width: "9%"
                //},
                //{

                //    template: function (data) {
                //        if (data.Check_XuatPO_HD == "0") {
                //            return '<center><a class="btn btn-danger" onclick="Ham_Xoa_PO_HD_CT(' + data.PO_HD_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                //        } else {
                //            return ''
                //        }
                //    },
                //    width: "8%"
                //}


        ];
    }
    else {
        toolbar_vattu = "";
        columns_vattu = [

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

                },
        ];
    }

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
                            window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
        toolbar: toolbar_vattu,
        columns: columns_vattu,
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

    if ($("[id$=_hf_quyen_capnhat]").val() == "true") {

        if ($("[id$=_hf_quyen_GoXuatPO]").val() == "true") {

            if (arr_dv[0] == "0") {

                return "<b>Số hợp đồng: " + arr_dv[1] + "</b><span class='label label-success' style='margin-left:10px !important;'>Chưa xuất PO con</span><span style='margin-left:50px !important;margin-right:10px !important;' class='btn btn-info' onclick ='Ham_Xuat_DonHang(\" " + arr_dv[1] + " \");'><i class='fa fa-star-half-o'></i> Xuất PO con</span><span class='btn btn-info' style='margin-right:10px !important;' onclick='Ham_Xuat_Ex(\" " + value + " \");'><i class='fa fa-download'></i> Xuất Excel</span><span class='btn btn-info' onclick='Ham_Xuat_TDH(\" " + arr_dv[1] + " \");'><i class='fa fa-envelope'></i> Xuất thư đặt hàng</span>";

            }
            else {
                return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span><span style="margin-left:160px !important;" class="btn btn-info" onclick ="Ham_Go_DonHang(\' ' + arr_dv[1] + ' \');"><i class="fa fa-mail-reply"></i> Gỡ xuất PO con</span>';

            }
        }
        else {
            if (arr_dv[0] == "0") {

                return "<b>Số hợp đồng: " + arr_dv[1] + "</b><span class='label label-success' style='margin-left:10px !important;'>Chưa xuất PO con</span><span style='margin-left:50px !important;margin-right:10px !important;' class='btn btn-info' onclick ='Ham_Xuat_DonHang(\" " + arr_dv[1] + " \");'><i class='fa fa-star-half-o'></i> Xuất PO con</span><span class='btn btn-info' style='margin-right:10px !important;' onclick='Ham_Xuat_Ex(\" " + value + " \");'><i class='fa fa-download'></i> Xuất Excel</span><span class='btn btn-info' onclick='Ham_Xuat_TDH(\" " + arr_dv[1] + " \");'><i class='fa fa-envelope'></i> Xuất thư đặt hàng</span>";

            }
            else {
                return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span>';
            }
        }

    } else {

        if (arr_dv[0] == "0") {

            return "<b>Số hợp đồng: " + arr_dv[1] + "</b><span class='label label-success' style='margin-left:10px !important;'>Chưa xuất PO con</span>";

        }
        else {
            return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span>';
        }
    }


}
//#endregion 
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

                        //options.success(result);
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                    //template: "#= OnChangeFormat(SoLuong) #",
                    template: function (data) {
                        if (data.TinhTrang_DC == 0) {
                            return '' + OnChangeFormat(data.SoLuong) + '';
                        } else {
                            return '' + OnChangeFormat(data.SoLuong) + '</br><a>(Đã điều chỉnh)</a>';
                        }
                    },
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

//#region Thêm mới PO

function Ham_Them_PO() {
    $("#wd_PO_them").data("kendoWindow").center().open();
}

function Ham_Them_PO_Luu() {

    var str_id_dv = '';

    for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

        var chb_dv = $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0];

        var id = $("#grid_DonVi tr")[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_dv += '' + id + ',';

        }
    }
    str_id_dv = str_id_dv.replace(/^,|,$/g, '');

    var check = 0;
    if ($("#txt_SoPO").val() == "") {
        check = 1;
        alert("Chưa nhập số PO!");
        return;
    }
    if ($("#txt_NgayKy").val() == "") {
        check = 1;
        alert("Chưa nhập ngày ký PO!");
        return;
    }    
    if (str_id_dv == '') {
        check = 1;
        alert("Chưa chọn đơn vị tham gia!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha.aspx",
            data: {
                cmd: 'PO_Create',
                SoPO: $("#txt_SoPO").val(),
                NgayKyPO: $("#txt_NgayKy").val(),
                SoVanBan: $("#txt_VB").val(),
                DonViPO: str_id_dv,                
                SoNgayGH: 0,
                NgayGiaoHang: "",
                NgayXacNhanGH: "",
                NgayKeHoachGH: "",
                FileVB: Path
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                
                $("#notification").data("kendoNotification").show({
                    message: "Đã tạo mới thành công PO!"
                }, "upload-success");

                $("#wd_PO_them").data("kendoWindow").close();
                DS_PO.read();
                Ham_Clear_Form_PO();
                uploadReset();
                $("#txt_search_soPO").data("kendoAutoComplete").dataSource.read();
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
function Ham_Them_PO_Huy() {
    $("#wd_PO_them").data("kendoWindow").close();
    uploadReset();
}
function Ham_Clear_Form_PO() {

    $("#txt_SoPO").val("");
    $("#txt_NgayKy").val("");
    $("#txt_VB").val("");

    for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

        $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;
    }

}

//#endregion
//#region Sửa PO
function Ham_SuaPO(p_PO_ID) {

    $("#wd_PO_Sua").data("kendoWindow").center().open();

    PO_ID_Sua = p_PO_ID;

    var grid_data = $("#grid_PO").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.PO_ID == p_PO_ID;
    });

    $("#txt_SoPO_Sua").val(res[0].SoPO);
    $("#txt_NgayKy_Sua").val(res[0].NgayKyPO_f);
    $("#txt_VB_Sua").val(res[0].SoVanBan);


    //Load check đơn vị

    var arr_dv = res[0].Str_PO_DonVi.split(",");
    for (var j = 1; j < $("#grid_DonVi_Sua tr").length; j++) {

        $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;
        arr_dv.forEach(function (entry) {

            if ($("#grid_DonVi_Sua tr")[j].cells[0].childNodes[0].textContent == entry) {

                $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0].checked = true;

            }
        });

    }

    Path_Sua = res[0].FileVB;

    if (res[0].FileVB == "" || res[0].FileVB == null) {

        $("#tr_download").hide();
        $("#tr_upload").show();


    } else {

        $("#tr_download").show();
        $("#tr_upload").hide();

        $("#btn_download").attr("href", "" + res[0].FileVB + "");



    }

}
function Ham_Sua_PO_Luu() {

    var str_id_dv = '';

    for (var j = 1; j < $("#grid_DonVi_Sua tr").length; j++) {

        var chb_dv = $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0];

        var id = $("#grid_DonVi_Sua tr")[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_dv += '' + id + ',';

        }
    }
    str_id_dv = str_id_dv.replace(/^,|,$/g, '');

    var check = 0;

    if ($("#txt_SoPO_Sua").val() == "") {
        check = 1;
        //alert("Chưa nhập số PO!");
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập số PO!",
            message: "Hãy nhập số PO!"
        }, "error");

        return;
    }
    if ($("#txt_NgayKy_Sua").val() == "") {
        check = 1;
        //alert("Chưa nhập ngày ký PO!");

        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập ngày ký PO",
            message: "Hãy nhập ngày ký PO!"
        }, "error");

        return;
    }
    if ($("#txt_VB_Sua").val() == "") {
        check = 1;
        //alert("Chưa nhập văn bản xác nhận PO!");
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập văn bản xác nhận PO",
            message: "Hãy nhập văn bản xác nhận PO"
        }, "error");

        return;
    }    
    if (str_id_dv == '') {
        check = 1;
        //alert("Chưa chọn đơn vị tham gia!");
        $("#notification").data("kendoNotification").show({
            title: "Chưa chọn đơn vị tham gia",
            message: "Hãy nhập số PO!"
        }, "error");

        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha.aspx",
            data: {
                cmd: 'PO_Update',
                PO_ID: PO_ID_Sua,
                SoPO: $("#txt_SoPO_Sua").val(),
                NgayKyPO: $("#txt_NgayKy_Sua").val(),
                SoVanBan: $("#txt_VB_Sua").val(),
                DonViPO: str_id_dv,                
                SoNgayGH: 0,
                NgayGiaoHang: "",
                NgayXacNhanGH: "",
                NgayKeHoachGH: "",
                FileVB: Path_Sua
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {                
                $("#notification").data("kendoNotification").show({
                    message: "Đã sửa thành công PO!"
                }, "upload-success");
                $("#wd_PO_Sua").data("kendoWindow").close();

                var ds;
                if ($('#txt_search_soPO').val().trim() == '') {
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
                                url: "assets/ajax/Ajax_PO_DonVi.aspx/Lay_DS_PO"
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
                $('#grid_PO').data('kendoGrid').setDataSource(ds);

                uploadReset();
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
function Ham_Sua_PO_Huy() {
    $("#wd_PO_Sua").data("kendoWindow").close();
    uploadReset();
}
//#endregion
//#region Xóa PO
function Ham_XoaPO(PO_ID) {

    if (confirm("Bạn có chắc muốn xóa PO này không? Xóa tất cả từ PO con,PO chi tiết")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha.aspx",
            data: {
                cmd: 'PO_Delete',
                PO_ID: PO_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                
                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công PO!"
                }, "upload-success");

                var ds = new kendo.data.DataSource({

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
                            url: "assets/ajax/Ajax_PO_DonVi.aspx/Lay_DS_PO"
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });

                $("#grid_PO").data("kendoGrid").setDataSource(ds);


                $("#txt_search_soPO").data("kendoAutoComplete").dataSource.read();

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
//#endregion

//#region Hàm reset Upload
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

//#endregion


//#region Tìm và chọn Vật tư

function Ham_TaoMoiVatTu() {
    $("#wd_List_Option").data("kendoWindow").center().open();

}
function Ham_Chon_TaoMoiVatTu() {


    if ($("#rdo_sl").is(":checked")) {
        Ham_TaoMoiVatTu_KhaDung();
    } else {
        Ham_TaoMoiVatTu_HD();
    }
}

function Ham_TaoMoiVatTu_KhaDung() {

    $("#wd_Show_VatTu").data("kendoWindow").center().open();

    $('#grid_VatTu').data('kendoGrid').dataSource.read();



    //#region hiển thị danh sách vật tư được chọn
    DS_VatTu_PO = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                fields: {
                    SoLuong_KhaDung: { editable: false, type: "number" },
                    SoLuong_PO: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            //////////////////////////////////
                            NameValidation: function (input) {

                                var grid = $("#grid_VatTu_PO").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SL_PO = $(input).val();
                                var SL_KhaDung = dataRow.SoLuong_KhaDung;


                                if (input.is("[name='SoLuong_PO']") && input.val() == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }
                                if (input.is("[name='SoLuong_PO']") && SL_PO > SL_KhaDung) {
                                    input.attr("data-NameValidation-msg", "Số lượng PO vượt quá số lượng khả dụng!");
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

    $("#grid_VatTu_PO").empty();
    $("#grid_VatTu_PO").kendoGrid({
        dataSource: DS_VatTu_PO,
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư của PO",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        editable: true,
        edit: function (e) {

            var input = e.container.find(".k-input");
            input.val("");

        },
        toolbar: kendo.template($("#Templ_VatuTu_PO").html()),
        columns:
            [

                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: function (data) {
                        if (data.SoLuong_PO == 0) {
                            return data.SoLuong_PO;
                        } else {
                            return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong_PO) + '</b>';
                        }
                    },
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                         .appendTo(container)
                         .kendoNumericTextBox({
                             format: 'n3',
                             decimals: 3
                         })
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
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
                    title: "Số HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    template: '<center><a class="btn btn-danger" onclick="Ham_Xoa_VatTu_PO(#= STT #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                    width: "8%"
                }
            ]
    });
    //#endregion
}



function Ham_TaoMoiVatTu_HD() {

    $("#wd_ChonVatTu_Vuot").data("kendoWindow").center().open();

    $("#grid_VatTu_Vuot").empty();
    $("#grid_VatTu_Vuot").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư của PO",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        editable: true,
        edit: function (e) {

            var input = e.container.find(".k-input");
            input.val("");

        },
        toolbar: kendo.template($("#Templ_VatTu_Vuot").html()),
        columns:
            [

                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Số lượng hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        //style: "font-weight:bold;color:green;"
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
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    //template: function (data) {
                    //    if (data.SoLuong_PO == 0) {
                    //        return data.SoLuong_PO;
                    //    } else {
                    //        return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong_PO) + '</b>';
                    //    }
                    //},
                    template: function (data) {
                        if (data.SoLuong_PO == "null" || data.SoLuong_PO == null) {
                            return 0;
                        } else {
                            return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong_PO) + '</b>';
                        }
                    },
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                         .appendTo(container)
                         .kendoNumericTextBox({
                             format: 'n3',
                             decimals: 3
                         })
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
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
                }
            ]
    });
    $("#div_GTHD").hide();

    var txt_search_sohd_vuot = $("#txt_search_sohd_vuot").kendoComboBox({
        dataTextField: "MaHD",
        dataValueField: "HopDong_ID",
        filter: "contains",
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_DonVi.aspx",
                        data: {
                            cmd: 'HopDong_By_DonVi'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        }),
        change: function () {

            GiaTriHopDong_ConLai = txt_search_sohd_vuot.dataItem(txt_search_sohd_vuot.select()).GiaTriConLai_HD;

            //$("#lb_GTHD").text(OnChangeFormat(txt_search_sohd_vuot.dataItem(txt_search_sohd_vuot.select()).GiaTriTruocThue));
            $("#lb_GTHD_ConLai").text(OnChangeFormat(txt_search_sohd_vuot.dataItem(txt_search_sohd_vuot.select()).GiaTriConLai_HD));


            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_HopDong_CT.aspx",
                            data: {
                                cmd: 'Lay_DS_HopDong_CT',
                                HopDong_ID: txt_search_sohd_vuot.value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                            SoLuong_KhaDung: { editable: false, type: "number" },
                            SoLuong_PO: { type: "number" }

                        }
                    }
                }
            });

            $("#grid_VatTu_Vuot").data("kendoGrid").setDataSource(ds);
            $("#div_GTHD").show();
        }
    }).data("kendoComboBox");
}



function Ham_Huy_ChonTaoMoiVatTu() {
    $("#wd_List_Option").data("kendoWindow").close();
}
var ItemChecked = {};
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#grid_VatTu").data("kendoGrid"),
    dataItem = grid.dataItem(row);

    ItemChecked[dataItem.uid] = checked;
    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
    } else {
        //-remove selection
        row.removeClass("k-state-selected");
    }
}
//#endregion

//#region Hàm chọn vật tư
function Ham_Chon_VatTu() {

    //http://docs.telerik.com/kendo-ui/web/grid/how-to/Selection/grid-selection-checkbox


    for (var i in ItemChecked) {
        if (ItemChecked[i]) {

            var grid = $("#grid_VatTu").data("kendoGrid");
            var selectedTopic = grid.dataSource.getByUid(i);

            var check = 0;
            for (var i = 0; i < DS_VatTu_PO.data().length; i++) {
                if (DS_VatTu_PO.data()[i].STT == selectedTopic.STT) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                DS_VatTu_PO.add(selectedTopic);
            }
        }
    }


    for (var i = 0; i < $("#grid_VatTu tr").length; i++) {
        var className_ = $("#grid_VatTu tr")[i].className;

        if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

            $($("#grid_VatTu tr")[i]).removeClass("k-state-selected");
            $("#grid_VatTu tr")[i].cells[0].childNodes[0].childNodes[0].checked = false;
        }
    }
    ItemChecked = {};

    //var grid = $("#grid_VatTu").data("kendoGrid");
    //var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    //if (selectedTopic == undefined) {
    //    alert("Chưa chọn vật tư!");
    //    return;
    //}
    //else {

    //    ///////////////////////////////////////////////////////////
    //    var check = 0;
    //    for (var i = 0; i < DS_VatTu_PO.data().length; i++) {
    //        if (DS_VatTu_PO.data()[i].STT == selectedTopic.STT) {
    //            check = 1;
    //            break;
    //        }

    //    }
    //    if (check == 0) {

    //        DS_VatTu_PO.add(selectedTopic);

    //    }
    //    else {
    //        alert("Vật tư đã được chọn!");
    //    }
    //    ////////////////////////////////////////////////////////////

    //    //$("#wd_Show_VatTu").data("kendoWindow").close();        
    //    //$("#txt_VatTu_PO").text(selectedTopic.VatTu_Ten);

    //    //VatTu_ID_PO = selectedTopic.VatTu_ID;

    //    //$("#txt_SoLuong_HD").text(OnChangeFormat(selectedTopic.SoLuong_KhaDung));

    //    //HopDong_ID = selectedTopic.HopDong_ID;

    //    //var request = $.ajax({
    //    //    type: "POST",
    //    //    url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
    //    //    data: {
    //    //        cmd: 'PO_HopDong_CT_SLTong',
    //    //        HopDong_ID: selectedTopic.HopDong_ID,
    //    //        VatTu_ID: selectedTopic.VatTu_ID
    //    //    },
    //    //    dataType: 'json'
    //    //});
    //    //request.done(function (msg) {



    //    //    if (msg[0].SoLuongKhaDung == "0") {

    //    //        alert("Vật tư này đã được đặt hết!");
    //    //        $("#txt_SoLuong_PO").val("");

    //    //    } else {

    //    //        $("#wd_VatTu_PO").data("kendoWindow").center().open();
    //    //        $("#txt_SoLuong_KD").text(OnChangeFormat(msg[0].SoLuongKhaDung));
    //    //    }




    //    //});
    //    //request.fail(function (jqXHR, textStatus) {
    //    //    alert("Request failed: " + textStatus);
    //    //});

    //}


}
//#endregion

//#region Hàm xóa vật tư tạm trong danh sách vật tư PO

function Ham_Xoa_VatTu_PO(p_STT) {

    for (var i = 0; i < DS_VatTu_PO.data().length; i++) {

        var item = DS_VatTu_PO.data()[i];
        if (item.STT == p_STT) {
            DS_VatTu_PO.remove(item);
        }
    }
}
//#endregion

//#region Hàm lưu thiệt vật tư PO theo danh sách chọn
function Ham_Luu_VatTu_PO_Vuot() {

    var DS_Grid_Vuot = $("#grid_VatTu_Vuot").data("kendoGrid").dataSource.data();

    if (DS_Grid_Vuot.length == 0) {

        alert("Chưa chọn hợp đồng!");

    } else {

        var TongSoLuong = 0;
        for (var j = 0; j < DS_Grid_Vuot.length; j++) {

            var p_soluong = DS_Grid_Vuot[j].SoLuong_PO == null ? 0 : DS_Grid_Vuot[j].SoLuong_PO;

            TongSoLuong += DS_Grid_Vuot[j].DonGia * parseFloat(ReplaceComma('' + p_soluong + ''));
        }

        if (parseFloat(TongSoLuong) > parseFloat(GiaTriHopDong_ConLai)) {
            alert("Vượt quá giá trị hợp đồng!");
        } else {


            for (var j = 0; j < DS_Grid_Vuot.length; j++) {


                var p_HopDong_ID = $("#txt_search_sohd_vuot").data("kendoComboBox").value();
                var p_VatTu_ID = DS_Grid_Vuot[j].VatTu_ID;
                var p_SoLuong_PO = DS_Grid_Vuot[j].SoLuong_PO == null ? 0 : DS_Grid_Vuot[j].SoLuong_PO;

                if (p_SoLuong_PO != 0) {

                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                        data: {
                            cmd: 'PO_HopDong_CT_Create',
                            PO_ID: BienChiTietPO.data.PO_ID,
                            HopDong_ID: p_HopDong_ID,
                            VatTu_ID: p_VatTu_ID,
                            SoLuong_PO: p_SoLuong_PO
                        },
                        dataType: 'json'
                    });
                }

            }

            //alert("Đã thêm thành công vật tư!");
            $("#notification").data("kendoNotification").show({
                message: "Đã thêm thành công vật tư!"
            }, "upload-success");

            $("#wd_ChonVatTu_Vuot").data("kendoWindow").close();
            $("#wd_List_Option").data("kendoWindow").close();



            BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
            DS_VatTu.read();
            DS_PO.read();

        }


    }

}
function Ham_Huy_VatTu_PO_Vuot() {
    $("#wd_ChonVatTu_Vuot").data("kendoWindow").close();
}

function Ham_Luu_VatTu_PO() {


    var DS_Grid = $("#grid_VatTu_PO").data("kendoGrid").dataSource.data();

    var check = 0;

    for (var j = 0; j < DS_Grid.length; j++) {


        var p_HopDong_ID = DS_Grid[j].HopDong_ID;
        var p_VatTu_ID = DS_Grid[j].VatTu_ID;
        var p_SoLuong_PO = DS_Grid[j].SoLuong_PO;

        if (p_SoLuong_PO == 0) {
            //alert("Chưa nhập số lượng PO!");
            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập số lượng PO!",
                message: "Hãy nhập số lượng PO!"
            }, "error");

            check = 1;
            break;
        }
        else {

            $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                data: {
                    cmd: 'PO_HopDong_CT_Create',
                    PO_ID: BienChiTietPO.data.PO_ID,
                    HopDong_ID: p_HopDong_ID,
                    VatTu_ID: p_VatTu_ID,
                    SoLuong_PO: p_SoLuong_PO
                },
                dataType: 'json'
            });
        }

    }
    if (check == 0) {
        //alert("Đã thêm thành công vật tư!");

        $("#notification").data("kendoNotification").show({
            message: "Đã thêm thành công vật tư!"
        }, "upload-success");

        $("#wd_Show_VatTu").data("kendoWindow").close();
        $("#wd_List_Option").data("kendoWindow").close();

        DS_PO.read();
        BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
        DS_VatTu.read();
    }
}


//#endregion 


//#region Hàm lưu vật tư PO đơn lẻ (ver cũ)
function Ham_Luu_ThemPO_HD_CT() {


    //var str_id_vattu = '';
    //var hopdong_id;

    //for (var j = 1; j < $("#grid_HD_CT tr").length; j++) {

    //    var chb_dv = $("#grid_HD_CT tr")[j].cells[2].childNodes[0].childNodes[0];

    //    var id = $("#grid_HD_CT tr")[j].cells[1].childNodes[0].textContent;

    //    if (chb_dv.checked == true) {

    //        str_id_vattu += '' + id + ',';
    //        hopdong_id = $("#grid_HD_CT tr")[j].cells[0].childNodes[0].textContent;
    //    }
    //}
    //str_id_vattu = str_id_vattu.replace(/^,|,$/g, '');



    //if (str_id_vattu=='') {
    //    alert("Chưa chọn vật tư!");
    //    check = 1;
    //    return;
    //}
    var check = 0;
    if ($("#txt_SoLuong").val() == "" || $("#txt_SoLuong").val() == "0") {
        check = 1;
        //alert("Chưa nhập số lượng!");
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập số lượng!",
            message: "Hãy nhập số lượng!"
        }, "error");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Create',
                PO_ID: BienChiTietPO.data.PO_ID,
                HopDong_ID: HopDong_ID,
                VatTu_ID: VatTu_ID_PO,
                SoLuong_PO: parseFloat($("#txt_SoLuong_PO").val())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                //alert("Đã thêm thành công vật tư!");
                $("#notification").data("kendoNotification").show({
                    message: "Đã thêm thành công vật tư!"
                }, "upload-success");

                $("#wd_VatTu_PO").data("kendoWindow").close();
                $("#wd_List_Option").data("kendoWindow").close();
                DS_PO.read();
                Ham_ChiTiet_PO(BienChiTietPO);

                //$("#txt_SoLuong_PO").val("");

                $("#txt_SoLuong_PO").data("kendoNumericTextBox").value("");

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
function Ham_Huy_ThemPO_HD_CT() {
    $("#wd_VatTu_PO").data("kendoWindow").close();
}
//#endregion


//#region Sửa vật tư PO
function Ham_Sua_PO_HD_CT(p_PO_HD_ID, VatTu_Ten, SoLuongTongHD, HopDong_ID, VatTu_ID, SoLuong_PO) {

    $("#wd_VatTu_PO_Sua").data("kendoWindow").center().open();


    $("#txt_VatTu_PO_Sua").text(VatTu_Ten);
    $("#txt_SoLuong_HD_Sua").text(OnChangeFormat(SoLuongTongHD));

    $("#txt_SoLuong_PO_Sua").data("kendoNumericTextBox").value(SoLuong_PO);

    PO_HD_ID = p_PO_HD_ID;

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
        data: {
            cmd: 'PO_HopDong_CT_SLTong',
            HopDong_ID: HopDong_ID,
            VatTu_ID: VatTu_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        $("#txt_SoLuong_KD_Sua").text(OnChangeFormat(msg[0].SoLuongKhaDung));
    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });


}
function Ham_Luu_SuaPO_HD_CT() {

    var check = 0;

    var SoLuong_PO = parseFloat(ReplaceComma($("#txt_SoLuong_PO_Sua").val()));
    var SoLuong_HD = parseFloat(ReplaceComma($("#txt_SoLuong_HD_Sua").text()));

    if (SoLuong_PO > SoLuong_HD) {

        check = 1;
        //alert("Số lượng vượt số lượng khả dụng!");
        $("#notification").data("kendoNotification").show({
            title: "Số lượng vượt số lượng khả dụng!",
            message: "Hãy nhập lại!"
        }, "error");
        return;
    }

    if ($("#txt_SoLuong_Sua").val() == "" || $("#txt_SoLuong_Sua").val() == "0") {
        check = 1;
        //alert("Chưa nhập số lượng!");
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập số lượng!",
            message: "Hãy nhập số lượng!"
        }, "error");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Update_SL',
                PO_HD_ID: PO_HD_ID,
                SoLuong_PO: parseFloat($("#txt_SoLuong_PO_Sua").val())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                //alert("Đã sửa thành công vật tư!");
                $("#notification").data("kendoNotification").show({
                    message: "Đã sửa thành công vật tư! Hãy phân rã lại vật tư"
                }, "upload-success");

                $("#wd_VatTu_PO_Sua").data("kendoWindow").close();
                DS_PO.read();
                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
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
function Ham_Huy_SuaPO_HD_CT() {
    $("#wd_VatTu_PO_Sua").data("kendoWindow").close();
}
//#endregion 

//#region Xóa vật tư PO
function Ham_Xoa_PO_HD_CT(p_PO_HD_CT) {

    if (confirm("Bạn có chắc muốn xóa vật tư này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Delete',
                PO_HD_CT: p_PO_HD_CT
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                //alert("Đã xóa thành công vật tư!");                
                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công vật tư!"
                }, "upload-success");
                DS_PO.read();
                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
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

//#endregion



//#region Hiển thị phân rã vật tư PO
function Ham_PhanRa(p_PO_ID, p_PO_HD_ID, p_VatTu_ID) {

    $("#wd_PhanRa").data("kendoWindow").center().open();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                    data: {
                        cmd: 'PO_DonVi_SelectbyPO_ID',
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        //options.success(result);
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        filter: { field: "PO_HD_ID", operator: "eq", value: p_PO_HD_ID }
    });

    ds.fetch(function () {
        var view = ds.view();



        $("#txt_VatTu").text(view[0].VatTu_Ten);
        $("#txt_MaVatTu").text(view[0].MaVatTu_TD);


        VatTu_ID = view[0].VatTu_ID;

        $("#txt_DonGia").text(OnChangeFormat(view[0].DonGia));
        MaDVT = view[0].MaDVT;
        $("#txt_DVT").text(view[0].TenDVT);

        $("#txt_SoLuong_Tong").text(OnChangeFormat(view[0].SoLuong_PO));

    });


    $("#grid_PhanRa").kendoGrid({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'PhanRa_ShowSL',
                            PO_ID: p_PO_ID,
                            VatTu_ID: p_VatTu_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_DonVi.aspx";
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
                        PO_DV_ID: { editable: false, type: "number" },
                        DonVi_Ten: { editable: false, type: "string" },
                        SoLuong_DV: {
                            type: "number",
                            validation: {
                                required: { message: "Chưa nhập số lượng!" }
                            }
                        }

                    }
                }
            }
        }),
        height: 300,
        editable: true,
        edit: function (e) {

            var input = e.container.find(".k-input");
            input.val("");
            //input.keyup(function () {
            //    value = input.val();
            //});

            //$("[name='SoLuong_DV']", e.container).blur(function () {

            //    var input = $(this);                
            //    var grid = $("#grid_PhanRa").data("kendoGrid");
            //    var row = $(this).closest("tr");
            //    var item = grid.dataItem(row);

            //    //alert(item.SoLuong_DV);


            //});


        },
        columns:
            [
                { field: "PO_DV_ID", hidden: true },
                {
                    title: "Đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_Ten",
                    attributes: {
                        class: "row_css"
                    },
                    width: "50%"
                },
                {
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_DV",
                    template: function (data) {

                        if (data.SoLuong_DV == 0) {
                            return data.SoLuong_DV;
                        } else {

                            return '<b style="color:green;">' + OnChangeFormat(data.SoLuong_DV) + '</b>';
                        }
                    },
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                         .appendTo(container)
                         .kendoNumericTextBox({
                             format: 'n3',
                             decimals: 3
                         })
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"

                    },
                    width: "50%"
                }
            ]

    });


}

//#endregion

//#region Lưu phân rã
function Ham_Luu_PhanRa() {

    var TongSL_PO = parseFloat(ReplaceComma($("#txt_SoLuong_Tong").text()));

    var Chuoi_JSON = "";
    var TongSL_DV = 0;

    for (var j = 1; j < $("#grid_PhanRa tr").length; j++) {

        var PO_DV_ID = parseInt($("#grid_PhanRa tr")[j].cells[0].childNodes[0].textContent);
        var ClassName = $("#grid_PhanRa tr")[j].cells[2].className;

        var SoLuong = parseFloat(ReplaceComma($("#grid_PhanRa tr")[j].cells[2].textContent));

        if (ClassName == "row_css k-dirty-cell") {

            Chuoi_JSON += "{'PO_DV_ID':" + PO_DV_ID + ",'VatTu_ID':" + VatTu_ID + ",'SoLuong':" + SoLuong + "},";

        }
        TongSL_DV += SoLuong;
    }

    Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');




    var check = 0;    if ((TongSL_DV).toFixed(3) > (TongSL_PO).toFixed(3)) {
        check = 1;
        //alert("Số lượng phân rã vượt quá số lượng tổng PO!");
        $("#notification").data("kendoNotification").show({
            title: "Số lượng phân rã vượt số lượng tổng PO!",
            message: "Hãy nhập lại!"
        }, "error");

        return;
    }    if (((TongSL_DV).toFixed(3) < (TongSL_PO).toFixed(3)) && ((TongSL_DV).toFixed(3) != (TongSL_PO).toFixed(3))) {
        check = 1;        //alert("Chưa phân rã hết số lượng vật tư");        $("#notification").data("kendoNotification").show({
            title: "Chưa phân rã hết số lượng vật tư!",
            message: "Hãy nhập lại!"
        }, "error");
    }    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha.aspx",
            data: {
                cmd: 'PhanRa_Luu',
                gData: "[" + Chuoi_JSON + "]",
                VatTu_ID: VatTu_ID,
                MaDVT: MaDVT,
                DonGia: ReplaceComma($("#txt_DonGia").text())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg == "OK") {

                //alert("Đã cập nhật phân rã!");
                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật phân rã!"
                }, "upload-success");

                $("#wd_PhanRa").data("kendoWindow").close();

                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
                DS_BangKe_Cap2.read();
            }


        });
        request.fail(function (jqXHR, textStatus) {

            //alert("Request failed: " + textStatus);
        });
    }


}
function Ham_Huy_PhanRa() {
    $("#wd_PhanRa").data("kendoWindow").close();
}
//#endregion



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

    $("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO").data("kendoGrid").setDataSource(ds) : $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_TD);
    //$("[id$=_hf_quyen_capnhat]").val() == "true" ? $("#grid_PO_ex").data("kendoGrid").setDataSource(ds) : $("#grid_PO_ex").data("kendoGrid").setDataSource(DS_PO_TD);
}
function filterVatTuHopDong() {

    var ds;

    if ($('#txtSearchValue_VT_Thuong').val().trim() !== '') {

        var value_cbo = $('#cboSearchBy_VT_Thuong').data('kendoDropDownList').text();

        if (value_cbo === 'Số hợp đồng') {

            ds = new kendo.data.DataSource({
                requestEnd: function (e) {
                    if (e.type) {
                        e.response.d = JSON.parse(e.response.d);
                    }
                },
                schema: {
                    data: 'd.Data',
                    total: 'd.Total[0].Total'
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true,
                sort: {
                    field: 'STT',
                    dir: 'desc'
                },
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: "assets/ajax/Ajax_PO_DonVi.aspx/HopDong_CT_SelectAll_HD",
                        data: {
                            MaHD: $('#txtSearchValue_VT_Thuong').val().trim()
                        }
                    },
                    parameterMap: function (options, operation) {
                        return kendo.stringify(options);
                    }
                }
            });
        }
        else if (value_cbo === 'Tên vật tư') {

            ds = new kendo.data.DataSource({
                requestEnd: function (e) {
                    if (e.type) {
                        e.response.d = JSON.parse(e.response.d);
                    }
                },
                schema: {
                    data: 'd.Data',
                    total: 'd.Total[0].Total'
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true,
                sort: {
                    field: 'STT',
                    dir: 'desc'
                },
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: "assets/ajax/Ajax_PO_DonVi.aspx/HopDong_CT_SelectAll_TenVT",
                        data: {
                            TenVT: $('#txtSearchValue_VT_Thuong').val().trim()
                        }
                    },
                    parameterMap: function (options, operation) {
                        return kendo.stringify(options);
                    }
                }
            });
        }
        else if (value_cbo === 'Mã vật tư') {

            ds = new kendo.data.DataSource({
                requestEnd: function (e) {
                    if (e.type) {
                        e.response.d = JSON.parse(e.response.d);
                    }
                },
                schema: {
                    data: 'd.Data',
                    total: 'd.Total[0].Total'
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true,
                sort: {
                    field: 'STT',
                    dir: 'desc'
                },
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: 'POST',
                        url: "assets/ajax/Ajax_PO_DonVi.aspx/HopDong_CT_SelectAll_MaVT",
                        data: {
                            MaVT: $('#txtSearchValue_VT_Thuong').val().trim()
                        }
                    },
                    parameterMap: function (options, operation) {
                        return kendo.stringify(options);
                    }
                }
            });
        }
    }

    else {        
        ds = new kendo.data.DataSource({
            data: []
        });
    }

    $("#grid_VatTu").data("kendoGrid").setDataSource(ds);

}