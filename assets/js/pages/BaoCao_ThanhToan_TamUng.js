
$(document).ready(function () {

    $("#main-menu-toggle").click();

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


    $("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });
    $("#tabstrip").hide();
    

    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: "01/01/2015"
    });
    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy')
    });



    $("#grid_thanhtoan").kendoGrid({
        //pageable: {
        //    messages: {
        //        display: "Tổng số   {2}   dòng",
        //        empty: "Không có dữ liệu",
        //        page: "Trang",
        //        of: "of {0}",
        //        itemsPerPage: "Số mục trong một trang"
        //    }
        //},
        scrollable: false,
        resizable: true,
        //toolbar: function () {
        //    return kendo.template($("#tlb_thanhtoan").html())
        //},
        columns: [
                    {
                        title: "Số hợp đồng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "HopDong_So",
                        hidden: true,
                        groupHeaderTemplate: function (data) {
                            return 'Số hợp đồng : ' + data.value + '';
                        },
                        hidden: true,
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Số PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "PO_So",
                        hidden: true,
                        groupHeaderTemplate: function (data) {
                            return 'Số PO : ' + data.value + ''
                        },
                        hidden: true,
                        attributes: {
                            class: "row_css"
                        }
                    },                    
                    {
                        title: "STT",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "STT_DV_IN_PO",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Mã",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Tinh_Ma",
                        attributes: {
                            class: "row_css"                            
                        }
                    },
                    {
                        title: "VNPT TỈNH/TP",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Tinh_Ten",
                        attributes: {
                            class: "row_css",
                            style: "text-align: left !important;"
                        },                        
                        footerTemplate: function (data) {
                            if (data.GiaTri_ThanhToan_Ki == undefined) {
                                return 0;
                            } else {
                                return "<center><div style='color:red;'>TỔNG CỘNG </div></center>";
                            }

                        }
                    },
                    {
                        title: "Giá trị PO( trước VAT )",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GiaTri_Truoc_VAT_PO",
                        template: "#= OnChangeFormat(GiaTri_Truoc_VAT_PO) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_Truoc_VAT_PO.sum.toFixed(1)) + "</div>";
                        },                        
                        //footerTemplate: function (data) {
                        //    if (data.GiaTri_Truoc_VAT_PO == undefined) {
                        //        return 0;
                        //    } else {
                        //        return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_Truoc_VAT_PO.sum.toFixed(1)) + "</div>";
                        //    }
                            
                        //}
                    },
                    {
                        title: "VAT",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "VAT_PO",
                        template: "#= OnChangeFormat(VAT_PO) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.VAT_PO.sum.toFixed(1)) + "</div>";
                        },
                        //footerTemplate: function (data) {
                        //    if (data.VAT_PO == undefined) {
                        //        return 0;
                        //    } else {
                        //        return "<div style='float: right'>" + OnChangeFormat(data.VAT_PO.sum.toFixed(1)) + "</div>";
                        //    }

                        //}
                    },
                    {
                        title: "Giá trị tập đoàn đã cấp",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GiaTri_TapDoan",
                        template: "#= OnChangeFormat(GiaTri_TapDoan) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_TapDoan.sum.toFixed(1)) + "</div>";
                        },
                        //footerTemplate: function (data) {
                        //    if (data.GiaTri_TapDoan == undefined) {
                        //        return 0;
                        //    } else {
                        //        return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_TapDoan.sum.toFixed(1)) + "</div>";
                        //    }

                        //}
                    },                    
                    {
                        title: "Thanh toán kỳ này",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GiaTri_ThanhToan_Ki",
                        template: "#= OnChangeFormat(GiaTri_ThanhToan_Ki) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_ThanhToan_Ki.sum.toFixed(1)) + "</div>";
                        },
                        footerTemplate: function (data) {
                            if (data.GiaTri_ThanhToan_Ki == undefined) {
                                return 0;
                            } else {
                                return "<div style='float: right;color:red;'>" + OnChangeFormat(data.GiaTri_ThanhToan_Ki.sum.toFixed(1)) + "</div>";
                            }

                        }
                    },
                    {
                        title: "Thanh toán lũy kế (+ VAT)",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "ThanhToan_LuyKe",
                        template: "#= OnChangeFormat(ThanhToan_LuyKe) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.ThanhToan_LuyKe.sum.toFixed(1)) + "</div>";
                        },
                        footerTemplate: function (data) {
                            if (data.ThanhToan_LuyKe == undefined) {
                                return 0;
                            } else {
                                return "<div style='float: right;color:red;'>" + OnChangeFormat(data.ThanhToan_LuyKe.sum.toFixed(1)) + "</div>";


                            }

                        }
                    }
                    

        ]

    });
    $("#grid_tamung").kendoGrid({
        //pageable: {
        //    messages: {
        //        display: "Tổng số   {2}   dòng",
        //        empty: "Không có dữ liệu",
        //        page: "Trang",
        //        of: "of {0}",
        //        itemsPerPage: "Số mục trong một trang"

        //    }
        //},
        scrollable: false,
        resizable: true,
        //toolbar: function () {
        //    return kendo.template($("#tlb_tamung").html())
        //},       
        columns:[
                    {
                        title: "Số hợp đồng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "HopDong_So",
                        hidden: true,
                        groupHeaderTemplate: function (data) {
                            return 'Số hợp đồng : ' + data.value + '';
                        },
                        hidden: true,
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Số PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "PO_So",
                        hidden: true,
                        groupHeaderTemplate: function (data) {
                            return 'Số PO : ' + data.value + ''
                        },
                        hidden: true,
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "STT",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "STT_DV_IN_PO",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Mã",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Tinh_Ma",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "VNPT TỈNH/TP",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Tinh_Ten",
                        attributes: {
                            class: "row_css",
                            style: "text-align: left !important;"
                        },
                        footerTemplate: function (data) {
                            return "<center><div style='color:red;'>TỔNG CỘNG </div></center>";

                        }
                    },                   
                    {
                        title: "Giá trị tạm ứng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "GiaTri_TamUng",
                        template: "#= OnChangeFormat(GiaTri_TamUng) #",
                        attributes: {
                            class: "row_css",
                            style: "text-align: right !important;"
                        },
                        aggregates: ["sum"],
                        groupFooterTemplate: function (data) {
                            return "<div style='float: right'>" + OnChangeFormat(data.GiaTri_TamUng.sum.toFixed(1)) + "</div>";
                        },
                        footerTemplate: function (data) {
                            if (data.GiaTri_TamUng == undefined) {
                                return 0;
                            } else {
                                return "<div style='float: right;color:red;'>" + OnChangeFormat(data.GiaTri_TamUng.sum.toFixed(1)) + "</div>";
                            }

                        }
                    }
                    
                ]

    });



    $("#btn_thongke").click(function () {
        
        var ds_ThanhToan = new kendo.data.DataSource({
            schema: {
                model: {
                    fields: {                        
                        Tinh_Ma: { type: "string" }
                    }
                }
            },
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongKe.aspx",
                        data: {
                            cmd: 'Report_ThanhToan',
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

                                if (result.length == 0) {
                                    
                                    $("#notification").data("kendoNotification").show({
                                        title: "Không có dữ liệu thanh toán!",
                                        message: ""
                                    }, "error");
                                }
                                else {
                                    
                                    options.success(result);
                                }
                                
                            }
                        }
                    });
                }
            },           
            group:
                [
                    {
                        field: "HopDong_So",
                        aggregates: [
                                { field: "GiaTri_Truoc_VAT_PO", aggregate: "sum" },
                                { field: "VAT_PO", aggregate: "sum" },
                                { field: "GiaTri_TapDoan", aggregate: "sum" },
                                { field: "GiaTri_ThanhToan_Ki", aggregate: "sum" },
                                { field: "ThanhToan_LuyKe", aggregate: "sum" }
                        ]
                    },
                    {
                        field: "PO_So",
                        aggregates: [
                                { field: "GiaTri_Truoc_VAT_PO", aggregate: "sum" },
                                { field: "VAT_PO", aggregate: "sum" },
                                { field: "GiaTri_TapDoan", aggregate: "sum" },
                                { field: "GiaTri_ThanhToan_Ki", aggregate: "sum" },
                                { field: "ThanhToan_LuyKe", aggregate: "sum" }
                        ]
                    }
                ],
            aggregate: [                  
                    { field: "GiaTri_ThanhToan_Ki", aggregate: "sum" },
                    { field: "ThanhToan_LuyKe", aggregate: "sum" }
            ],
            sort:
                [
                    { field: "STT_HD", dir: "asc" },
                    { field: "STT_PO_IN_HD", dir: "asc" },
                    { field: "STT_DV_IN_PO", dir: "asc" }

                ]
        });

        $("#grid_thanhtoan").data("kendoGrid").setDataSource(ds_ThanhToan);

        var ds_TamUng = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongKe.aspx",
                        data: {
                            cmd: 'Report_TamUng',
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

                                if (result.length == 0) {                                    
                                    $("#notification").data("kendoNotification").show({
                                        title: "Không có dữ liệu tạm ứng!",
                                        message: ""
                                    }, "error");
                                }
                                else {
                                    
                                    options.success(result);
                                }

                            }
                        }
                    });
                }
            },            
            group:
                [
                    {
                        field: "HopDong_So",
                        aggregates: [
                                { field: "GiaTri_TamUng", aggregate: "sum" }
                        ]
                    },
                    {
                        field: "PO_So",
                        aggregates: [
                                { field: "GiaTri_TamUng", aggregate: "sum" }
                        ]
                    }
                ],
            aggregate: [                    
                    { field: "GiaTri_TamUng", aggregate: "sum" }
            ],
            sort:
                [
                    { field: "STT_HD", dir: "asc" },
                    { field: "STT_PO_IN_HD", dir: "asc" },
                    { field: "STT_DV_IN_PO", dir: "asc" }

                ]

        });
        
        $("#grid_tamung").data("kendoGrid").setDataSource(ds_TamUng);


        $("#tabstrip").show();
    });

    $("#btn_ex_thanhtoan").click(function (e) {

        //$("#grid_thanhtoan").data("kendoGrid").saveAsExcel();

        var htmltable = document.getElementById('grid_thanhtoan');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

        

    });
    $("#btn_ex_tamung").click(function (e) {

        //$("#grid_tamung").data("kendoGrid").saveAsExcel();

        var htmltable = document.getElementById('grid_tamung');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

    });
        
    
    
    


});
