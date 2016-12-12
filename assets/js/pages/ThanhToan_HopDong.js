
var DS_HopDong, DS_NhaThau,DS_MaHopDong;
var detailInit_e, v_STT;
var HopDong_ID;


$(document).ready(function () {

    //$("#main-menu-toggle").click();
    $("#main-menu-min").click();

    //document.oncontextmenu = function () { return false; }

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
                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                window.location.href = "DangNhap.aspx?p=Hop_Dong.aspx";
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
    });

    $("#cmb_Loc_ConLai").kendoDropDownList({
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
                                        window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                        window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
        selectable:"multiple",
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

    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
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
    
    Load_DS_HopDong(DS_HopDong);
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
                                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                case "Thông tin thanh toán - tạm ứng":
                    detailRow.find("#tab_ThanhToan").kendoGrid({
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
                                                window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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
                                },
                                {
                                    title: "Đã tạm ứng",
                                    headerAttributes: {
                                        class: "header_css",
                                        style: "font-weight:bold;color:red;"
                                    },
                                    field: "TongTienTamUng",
                                    template: "#= OnChangeFormat(TongTienTamUng) #",
                                    aggregates: ["sum"],
                                    footerTemplate: "<div class=\"row_css\" ><div style=\"color:green;\"> #=OnChangeFormat(sum) # </div></div>",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"

                                    }
                                },
                                {
                                    title: "Đã thanh toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoTienDaThanhToan",
                                    template: "#= OnChangeFormat(SoTienDaThanhToan) #",
                                    aggregates: ["sum"],
                                    footerTemplate: "<div class=\"row_css\" style=\"color:green;\">#=OnChangeFormat(sum) #</div>",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"
                                    }
                                }


                            ]


                    });
                    break;
            }

        }
    });

    Ham_HienThi_PhanCong();
   
    detailRow.find("#grid_checklist").kendoGrid({
        //pageable: true,
        dataSource:{            
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
                                window.location.href = "DangNhap.aspx?p=PO.aspx";
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
        //toolbar: kendo.template($("#Templ_Checklist").html()),
        toolbar: function () {

            if ($("[id$=_hf_email]").val().trim() == e.data.NguoiPhanCong  ) {
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
                            window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize:5
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
                            window.location.href = "DangNhap.aspx?p=ThanhToan_HopDong.aspx";
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