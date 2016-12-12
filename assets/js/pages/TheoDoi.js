var DS_HopDong, DS_HopDong_Loc, DS_VatTu, DS_VatTu_Loc;
$(document).ready(function () {

    //document.oncontextmenu = function () { return false; }


    //$("#Tr_VatTu_1").hide();
    $("#Tr_VatTu_2").hide();
    $("#Tr_VatTu_3").hide();
    $("#Tr_TyLe").hide();
    $("#Tr_TyLe_HD").hide();
    $("#Tr_TyLe_VT").hide();
    
    var ds_VatTu = new kendo.data.DataSource({
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
                            window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    $("#grid_vattu").kendoGrid({
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
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        LoaiVT_Ten: { type: "string" },
                        MaVatTu_TD: { type: "string" },
                        TenVT: { type: "string" }
                    }
                }
            },
            pageSize: 4
        },        
        scrollable: true,
        selectable: "multiple",        
        filterable: {
            extra: false,
            operators: {
                string: {
                    contains: "Chứa",
                    eq: "Bằng",
                    neq: "Khác"
                }
            },
            messages: {
                info: "Chọn kiểu lọc: ",
                filter: "Lọc",
                clear: "Hủy lọc"
            }
        },
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
        columns: [          
            {
                title: "Loại vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "LoaiVT_Ten",                
                filterable: {
                    ui: function (element) {
                        element.kendoDropDownList({
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
                                                    window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        });
                                    }
                                }

                            },
                            dataBound: function (e) {

                                var $dropDown = $(e.sender.element),
                                    dataWidth = $dropDown.data("kendoDropDownList").list.width(),
                                    listWidth = dataWidth + 300,
                                    containerWidth = listWidth + 6;

                                // Set widths to the new values
                                $dropDown.data("kendoDropDownList").list.width(listWidth);
                                $dropDown.closest(".k-widget").width(containerWidth);
                            },
                            optionLabel: "--Tất cả--",
                            dataTextField: "TenLoaiVT",
                            dataValueField: "TenLoaiVT"
                        });
                    }
                }
            },
            {
                title: "Tên vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "TenVT",
                filterable: {
                    ui: function (element) {
                        element.kendoComboBox({
                            dataTextField: "TenVT",
                            dataValueField: "TenVT",
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
                                                    window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        });
                                    }
                                }

                            },
                            dataBound: function (e) {

                                var $dropDown = $(e.sender.element),
                                    dataWidth = $dropDown.data("kendoComboBox").list.width(),
                                    listWidth = dataWidth + 30,
                                    containerWidth = listWidth + 6;

                                // Set widths to the new values
                                $dropDown.data("kendoComboBox").list.width(listWidth);
                                $dropDown.closest(".k-widget").width(containerWidth);
                            },
                            filter: "startswith"

                        });


                    }
                }
                //width: 170
            },
            {
                title: "Mã vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "MaVatTu_TD",
                //width: 170
            }
            
        ]
    });


    

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
                    //$("#Tr_VatTu_1").show();
                    $("#Tr_VatTu_2").show();
                    $("#Tr_VatTu_3").show();
                    $("#Tr_TyLe").hide();
                    $("#Tr_TyLe_HD").hide();
                    $("#Tr_TyLe_VT").hide();

                    break;
                case "2":
                    //$("#Tr_VatTu_1").hide();
                    $("#Tr_VatTu_2").hide();
                    $("#Tr_VatTu_3").hide();
                    $("#Tr_TyLe").show();
                    $("#Tr_TyLe_HD").show();
                    $("#Tr_TyLe_VT").hide();
                    break;
                case "3":
                    //$("#Tr_VatTu_1").hide();
                    $("#Tr_VatTu_2").hide();
                    $("#Tr_VatTu_3").hide();
                    $("#Tr_TyLe").show();
                    $("#Tr_TyLe_HD").hide();
                    $("#Tr_TyLe_VT").show();

                    break;
                default:

                    //$("#Tr_VatTu_1").hide();
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
    
    //var cmb_LoaiVatTu = $("#cmb_LoaiVatTu").kendoComboBox({
    //    placeholder: "--Tất cả--",
    //    dataTextField: "TenLoaiVT",
    //    dataValueField: "LoaiVT_ID",
    //    dataSource: {
    //        transport: {
    //            read: function (options) {
    //                $.ajax({
    //                    type: "POST",
    //                    url: "assets/ajax/Ajax_DanhMuc.aspx",
    //                    data: {
    //                        cmd: 'DS_LoaiVT'
    //                    },
    //                    dataType: 'json',
    //                    success: function (result) {
    //                        options.success(result);
    //                    }
    //                });
    //            }
    //        }

    //    },
    //    change: function () {
    //        var cmb_VatTu = $("#cmb_VatTu").data("kendoComboBox");

    //        if (this.value() == "") {
    //            cmb_VatTu.dataSource.filter({});
    //            cmb_VatTu.text("");
    //        } else {
    //            cmb_VatTu.dataSource.filter({
    //                field: "LoaiVT_ID",
    //                operator: "eq",
    //                value: parseInt(this.value())
    //            });
                
    //            cmb_VatTu.text("");
    //        }
    //    }
    //}).data("kendoComboBox");
    
    //var cbo_SearchBy = $('#cbo_SearchBy').kendoDropDownList({
    //    dataSource: {
    //        data: ['Tên vật tư', 'Mã vật tư']
    //    },
    //    change: function () {

    //        if (cbo_SearchBy.value() === 'Tên vật tư') {

    //            //var mc = $("#cmb_VatTu");
    //            //mc.data("kendoComboBox").destroy();
    //            //// Get the widget wrapper element structure
    //            //var p = mc.closest(".k-widget");
    //            //// Detache the #MainCategory from the wrapper structure
    //            //mc = mc.empty().detach();
    //            //// Remove the wrapper structure
    //            //p.remove();
    //            //// Append the #MainCategory to the body again
    //            //$('body').append(mc);

    //            //create combobox
    //            $("#cmb_VatTu").kendoComboBox({
    //                dataTextField: "TenVT",
    //                dataValueField: "VatTu_ID",
    //                dataSource: {
    //                    transport: {
    //                        read: function (options) {
    //                            $.ajax({
    //                                type: "POST",
    //                                url: "assets/ajax/Ajax_DanhMuc.aspx",
    //                                data: {
    //                                    cmd: 'DS_VatTu'
    //                                },
    //                                dataType: 'json',
    //                                success: function (result) {
    //                                    options.success(result);
    //                                }
    //                            });
    //                        }
    //                    }

    //                },
    //                filter: "startswith",
    //                headerTemplate: '<div class="dropdown-header">' +
    //                                    '<span class="k-widget k-header">Mã vật tư</span>' +
    //                                    '<span class="k-widget k-header">Tên vật tư</span>' +
    //                                '</div>',
    //                template: '<span class="k-state-default" >#= data.MaVatTu_TD # </span>' +
    //                          '<span class="k-state-default"> #= data.TenVT # </span>'

    //            });


    //        }
    //        else {

    //            //var mc = $("#cmb_VatTu");
    //            //mc.data("kendoComboBox").destroy();
    //            //// Get the widget wrapper element structure
    //            //var p = mc.closest(".k-widget");
    //            //// Detache the #MainCategory from the wrapper structure
    //            //mc = mc.empty().detach();
    //            //// Remove the wrapper structure
    //            //p.remove();
    //            //// Append the #MainCategory to the body again
    //            //$('body').append(mc);

    //            //create combobox
    //            $("#cmb_VatTu").kendoComboBox({
    //                dataTextField: "MaVatTu_TD",
    //                dataValueField: "VatTu_ID",
    //                dataSource: {
    //                    transport: {
    //                        read: function (options) {
    //                            $.ajax({
    //                                type: "POST",
    //                                url: "assets/ajax/Ajax_DanhMuc.aspx",
    //                                data: {
    //                                    cmd: 'DS_VatTu'
    //                                },
    //                                dataType: 'json',
    //                                success: function (result) {
    //                                    options.success(result);
    //                                }
    //                            });
    //                        }
    //                    }

    //                },
    //                filter: "startswith",
    //                headerTemplate: '<div class="dropdown-header">' +
    //                                    '<span class="k-widget k-header">Mã vật tư</span>' +
    //                                    '<span class="k-widget k-header">Tên vật tư</span>' +
    //                                '</div>',
    //                template: '<span class="k-state-default" >#= data.MaVatTu_TD # </span>' +
    //                          '<span class="k-state-default"> #= data.TenVT # </span>'

    //            });
    //        }
    //    }

    //}).data('kendoDropDownList');
    
    
    //$("#cmb_VatTu").kendoComboBox({                
    //    dataTextField: "TenVT",
    //    dataValueField: "VatTu_ID",
    //    dataSource: {
    //        transport: {
    //            read: function (options) {
    //                $.ajax({
    //                    type: "POST",
    //                    url: "assets/ajax/Ajax_DanhMuc.aspx",
    //                    data: {
    //                        cmd: 'DS_VatTu'
    //                    },
    //                    dataType: 'json',
    //                    success: function (result) {
    //                        options.success(result);
    //                    }
    //                });
    //            }
    //        }

    //    },
    //    filter: "startswith",
    //    headerTemplate: '<div class="dropdown-header">' +
    //                        '<span class="k-widget k-header">Mã vật tư</span>' +
    //                        '<span class="k-widget k-header">Tên vật tư</span>' +
    //                    '</div>',
    //    template: '<span class="k-state-default" >#= data.MaVatTu_TD # </span>' +
    //              '<span class="k-state-default"> #= data.TenVT # </span>'
        
    //});
    

});
//#region Theo dõi vật tư
function Ham_Tim_VatTu() {

    var grid_vattu = $("#grid_vattu").data("kendoGrid");
    var selectedItem = grid_vattu.dataItem(grid_vattu.select());

    var check = 0;
    if (selectedItem == null) {
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
                            url: "assets/ajax/Ajax_TheoDoi.aspx",
                            data: {
                                cmd: 'TheoDoi_VatTu',
                                //VatTu_ID: $("#cmb_VatTu").data("kendoComboBox").value()                                
                                VatTu_ID:selectedItem.VatTu_ID
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        title: "...",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Row",
                        attributes: {
                            class: "row_css"                            
                        },
                        width: "3%"
                    },
                    {
                        title: "Vật tư",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "VatTu_Ten",
                        //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                        template: function (data) {
                            return "<div>" + data.MaVatTu_TD + "</div><br><div>" + data.VatTu_Ten + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.TenDVT + "</div>";
                        },
                        attributes: {
                            class: "row_css",
                            
                        },
                        width: "20%"
                    },                    
                    {
                        title: "Số HĐ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaHD",
                        template: function (data) {

                            if (data.TinhTrang_HD == 0) {
                                return '<center><div><span class="label label-success">Hiệu lực</span></div><br><div>' + data.MaHD + '</div></center>';
                            }
                            else {
                                return '<center><div><span class="label label-important">Thanh lý</span></div><br><div>' + data.MaHD + '</div></center>';
                            }
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: "15%"
                    },
                    //{
                    //    title: "Tình trạng",
                    //    headerAttributes: {
                    //        class: "header_css"
                    //    },
                    //    field: "TinhTrang_HD",
                    //    template: function (data) {

                    //        if (data.TinhTrang_HD == 0) {
                    //            return '<center><span class="label label-success">Hiệu lực</span><br><div>'+data.MaHD+'</div></center>';
                    //        }
                    //        else {
                    //            return '<center><span class="label label-important">Thanh lý</span><br><div>' + data.MaHD + '</div></center>';
                    //        }
                    //    },
                    //    width: "8%"
                    //},
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
                    //{
                    //    title: "Đơn vị tính",
                    //    headerAttributes: {
                    //        class: "header_css"
                    //    },
                    //    field: "TenDVT",
                    //    attributes: {
                    //        class: "row_css"
                    //    }
                    //},
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
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
        Load_DS_VatTu(DS_VatTu,kendo.template($("#Templ_VatuTu").html()));
        
    }
    else {

        DS_VatTu_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_TheoDoi.aspx",
                        data: {
                            cmd: 'TheoDoi_ConLai_VT',
                            TyLe: $("#cmb_TyLe").data("kendoDropDownList").value()

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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

        //Load_DS_VatTu(DS_VatTu_Loc,"");
        Load_DS_VatTu(DS_VatTu_Loc, kendo.template($("#Templ_VatuTu").html()));
        
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
                        url: "assets/ajax/Ajax_HopDong.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        url: "assets/ajax/Ajax_TheoDoi.aspx",
                        data: {
                            cmd: 'TheoDoi_ConLai_HD',
                            TyLe: $("#cmb_TyLe").data("kendoDropDownList").value()

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
        excel: {
            allPages: true
        },
        sortable: true,
        toolbar: p_toolbar,
        columns:
            [

                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    //template: function (data) {
                    //    return "<div>" + data.MaVatTu_TD + "</div><br><div>" + data.VatTu_Ten + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.TenDVT + "</div>";
                    //},
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    width: "15%"
                },
                {
                    title: "Mã vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
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

    

    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: {
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
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll_TenVT'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'HopDong_CT_SelectAll_MaTD'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                                url: "assets/ajax/Ajax_HopDong_CT.aspx",
                                data: {
                                    cmd: 'Lay_DS_HopDong_CT',
                                    HopDong_ID: e.data.HopDong_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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
                        width: "20%"
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
                    title: "Số HĐ",
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
                        style:"color:red;font-size:bold;"
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


    $("#grid_ex").empty();
    var grid = $("#grid_ex").kendoGrid({

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
                                        window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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

        }
    });
    
}

//#endregion


//#region xuất ex tỷ lệ vật tư

function Ham_Xuat_Ex_TyLe_VT() {
   
    $("#grid").data("kendoGrid").saveAsExcel();
}
//#endregion

function Ham_HD_Xuat_Ex() {
    $("#grid_ex").data("kendoGrid").saveAsExcel();
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
                                window.location.href = "DangNhap.aspx?p=TheoDoi.aspx";
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

function create_cmb_VatTu(usersDiv, textField, valueField, remove,data) {

    var mc = $("#cmb_VatTu");

    if (remove) {
        // Destroys the widget
        mc.data("kendoComboBox").destroy();

        // Get the widget wrapper element structure
        var p = mc.closest(".k-widget");

        // Detache the #MainCategory from the wrapper structure
        mc = mc.empty().detach();

        // Remove the wrapper structure
        p.remove();

        // Append the #MainCategory to the body again
        $('body').append(mc);
    }

    $("#cmb_VatTu").kendoComboBox({
        dataSource: data,
        dataTextField: textField,
        dataValueField: valueField,
        filter: "startswith",
        headerTemplate: '<div class="dropdown-header">' +
                            '<span class="k-widget k-header">Mã vật tư</span>' +
                            '<span class="k-widget k-header">Tên vật tư</span>' +
                        '</div>',
        template: '<span class="k-state-default" >#= data.MaVatTu_TD # </span>' +
                      '<span class="k-state-default"> #= data.TenVT # </span>'

    });
}