var DS_HopDong, DS_HopDong_Loc, DS_VatTu, DS_VatTu_Loc;
$(document).ready(function () {

document.oncontextmenu = function () { return false; }
    $("#Tr_VatTu_1").hide();
    $("#Tr_VatTu_2").hide();
    $("#Tr_VatTu_3").hide();
    $("#Tr_TyLe").hide();
    $("#Tr_TyLe_HD").hide();
    $("#Tr_TyLe_VT").hide();


    $("#cmb_TheoDoi").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Vật tư", value: "1" },
            { text: "Tỷ lệ còn lại của hợp đồng", value: "2" },
            { text: "Tỷ lệ còn lại của vật tư", value: "3" }
        ],
        optionLabel: "--Chọn--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            switch (value) {

                case "1":
                    $("#Tr_VatTu_1").show();
                    $("#Tr_VatTu_2").show();
                    $("#Tr_VatTu_3").show();
                    $("#Tr_TyLe").hide();
                    $("#Tr_TyLe_HD").hide();
                    $("#Tr_TyLe_VT").hide();

                    break;
                case "2":
                    $("#Tr_VatTu_1").hide();
                    $("#Tr_VatTu_2").hide();
                    $("#Tr_VatTu_3").hide();
                    $("#Tr_TyLe").show();
                    $("#Tr_TyLe_HD").show();
                    $("#Tr_TyLe_VT").hide();
                    break;
                case "3":
                    $("#Tr_VatTu_1").hide();
                    $("#Tr_VatTu_2").hide();
                    $("#Tr_VatTu_3").hide();
                    $("#Tr_TyLe").show();
                    $("#Tr_TyLe_HD").hide();
                    $("#Tr_TyLe_VT").show();

                    break;
                default:

                    $("#Tr_VatTu_1").hide();
                    $("#Tr_VatTu_2").hide();
                    $("#Tr_VatTu_3").hide();
                    $("#Tr_TyLe").hide();
                    $("#Tr_TyLe_HD").hide();
                    $("#Tr_TyLe_VT").hide();
            }
        }
    });


    $("#cmb_TyLe").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "40%", value: "40" },
            { text: "30%", value: "30" },
            { text: "20%", value: "20" },
            { text: "10%", value: "10" }

        ],
        optionLabel: "--Tất cả--"

    });

    $("#cmb_LoaiVatTu").kendoComboBox({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
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
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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

    $("#cmb_VatTu").kendoComboBox({
        cascadeFrom: "cmb_LoaiVatTu",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DanhMuc.aspx",
                        data: {
                            cmd: 'DS_VatTu'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        },
        filter: "startswith",
        headerTemplate: '<div class="dropdown-header">' +
                                '<span class="k-widget k-header">Mã vật tư</span>' +
                                '<span class="k-widget k-header">Tên vật tư</span>' +
                        '</div>',
        template: '<span class="k-state-default" >#= data.MaVatTu_TD # </span>' +
                  '<span class="k-state-default"> #= data.TenVT # </span>'

    });


});
//#region Theo dõi vật tư
function Ham_Tim_VatTu() {
    var check = 0;
    if ($("#cmb_VatTu").data("kendoComboBox").value() == "") {
        check = 1;
        alert("Chưa chọn vật tư!");
        return;
    }
    if (check == 0) {

        $("#grid").empty();
        var grid = $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_TheoDoi_Ao.aspx",
                            data: {
                                cmd: 'TheoDoi_VatTu',
                                VatTu_ID: $("#cmb_VatTu").data("kendoComboBox").value()
                                //VatTu_ID: 263
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
                                }
                                else {
                                    options.success(result);
                                }
                            }
                        });
                    }
                }
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
            columns:
                [
                    {
                        title: "STT",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Row",
                        attributes: {
                            class: "row_css"
                        },
                        width: "4%"
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
                            //style: "font-weight:bold;"
                        },
                        width: "15%"
                    },
                    {
                        title: "Số HĐ ảo",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaHD",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: "12%"
                    },
                    {
                        title: "Tình trạng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TinhTrang_HD",
                        template: function (data) {

                            if (data.TinhTrang_HD == 0) {
                                return '<center><span class="label label-success">Hiệu lực</span></center>';
                            }
                            else {
                                return '<center><span class="label label-important">Thanh lý</span></center>';
                            }
                        },
                        width: "8%"
                    },
                    {
                        title: "Ngày còn lại",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoNgayConLai",
                        template: function (data) {

                            if (data.TinhTrang_HD == 0) {
                                return '<center style="color:red;"><b>' + data.SoNgayConLai + '</b></center>';
                            } else {
                                return '';
                            }

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
                        },
                        width: "12%"
                    },
                    {
                        title: "Số lượng hợp đồng",
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
                        title: "Số lượng thực hiện",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoLuong_ThucHien",
                        template: "#= OnChangeFormat(SoLuong_ThucHien) #",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:blue;"
                        }
                    },
                    {
                        title: "Số lượng còn lại",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoLuong_ConLai",
                        template: "#= OnChangeFormat(SoLuong_ConLai) #",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:green;"
                        }
                    },
                    {
                        title: "Tỷ lệ số lượng còn lại",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TyLeSoLuongConLai",
                        template: "#= TyLeSoLuongConLai #%",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:red;"
                        }
                    }

                ]
        });
    }


}

//#endregion

function Ham_TyLeConLai_VT() {

    if ($("#cmb_TyLe").data("kendoDropDownList").value() == "") {

        DS_VatTu = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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
        Load_DS_VatTu(DS_VatTu, kendo.template($("#Templ_VatuTu").html()));

    }
    else {

        DS_VatTu_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_TheoDoi_Ao.aspx",
                        data: {
                            cmd: 'TheoDoi_ConLai_VT',
                            TyLe: $("#cmb_TyLe").data("kendoDropDownList").value()

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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
            pageSize: 5
        });

        Load_DS_VatTu(DS_VatTu_Loc, "");
    }
}

//#region Theo dõi giá trị còn lại của hợp đồng

function Ham_TyLeConLai_HD() {


    if ($("#cmb_TyLe").data("kendoDropDownList").value() == "") {


        DS_HopDong = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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

        Load_DS_HopDong(DS_HopDong);


    }
    else {

        DS_HopDong_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_TheoDoi_Ao.aspx",
                        data: {
                            cmd: 'TheoDoi_ConLai_HD',
                            TyLe: $("#cmb_TyLe").data("kendoDropDownList").value()

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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


//#endregion

//#region Show DS Vật tư
function Load_DS_VatTu(d, p_toolbar) {

    $("#grid").empty();
    var grid_vattu = $("#grid").kendoGrid({
        dataSource: d,
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
        toolbar: p_toolbar,
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
                    title: "Số lượng hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;"
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
                    title: "Tỷ lệ khả dụng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TyLeKhaDung",
                    template: "#= TyLeKhaDung #%",
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
                    title: "Số HĐ ảo",
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



    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll_MaHD'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaHD;

            if (value) {

                grid_vattu.dataSource.filter({ field: "MaHD", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_sohd").val('');
        }

    });



    $("#txt_search_tenvt").kendoAutoComplete({
        dataTextField: "VatTu_Ten",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll_TenVT'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.VatTu_Ten;

            if (value) {

                grid_vattu.dataSource.filter({ field: "VatTu_Ten", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_tenvt").val('');
        }

    });


    $("#txt_search_mavttd").kendoAutoComplete({
        dataTextField: "MaVatTu_TD",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll_MaTD'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaVatTu_TD;

            if (value) {

                grid_vattu.dataSource.filter({ field: "MaVatTu_TD", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_mavttd").val('');
        }

    });
    $("#btn_clear").click(function (e) {
        e.preventDefault();
        $("#txt_search_sohd").val('');
        $("#txt_search_tenvt").val('');
        $("#txt_search_mavttd").val('');
        grid_vattu.dataSource.filter({});
    });
}
//#endregion

//#region Show DS HopDong

function Load_DS_HopDong(d) {


    $("#grid").empty();
    var grid = $("#grid").kendoGrid({
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
        detailInit: function (e) {

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
                                url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                                data: {
                                    cmd: 'Lay_DS_HopDong_CT',
                                    HopDong_ID: e.data.HopDong_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=TheoDoi_Ao.aspx";
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


        },
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
                    template: function (data) {

                        if (data.TinhTrang_HD == 0) {
                            return '<center><span class="label label-success">Hiệu lực</span></center>';
                        }
                        else {
                            return '<center><span class="label label-important">Thanh lý</span></center>';
                        }
                    },
                    width: "6%"
                },
                {
                    title: "Số HĐ ảo",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    field: "GiaTriSauThue",
                    template: "#= OnChangeFormat(GiaTriTruocThue) #",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-size:bold;"
                    },
                    width: "12%"
                },
                {
                    title: "Giá trị còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GiaTriConLai_HD",
                    template: "#= OnChangeFormat(GiaTriConLai_HD) #",
                    attributes: {
                        class: "row_css",
                        style: "color:green;font-weight:bold;"
                    },
                    width: "12%"
                },
                {
                    title: "Tỷ lệ giá trị còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TyLeGiaTriConLai",
                    template: "#= TyLeGiaTriConLai #%",
                    attributes: {
                        class: "row_css",
                        style: "color:green;font-weight:bold;"
                    },
                    width: "8%"
                },
                {
                    title: "Ngày còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoNgayConLai",
                    template: function (data) {

                        if (data.TinhTrang_HD == 0) {
                            return '<center><b>' + data.SoNgayConLai + '</b></center>';
                        } else {
                            return '';
                        }
                    },
                    width: "5%"
                },

                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: function (data) {

                        if (data.FileVB == "" || data.FileVB == null) {
                            return '<center>Chưa upload </center>';
                        } else {
                            return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
                        }
                    },
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


}

//#endregion