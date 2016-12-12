


$(document).ready(function () {

    
    $("#main-menu-min").click();

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

    //#region Grid Hợp đồng
    $("#grid_hd").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongKe_TienTrinh.aspx",
                        data: {
                            cmd: 'ThongKe_TienTrinh_HopDong'
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
        },
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   dòng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
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
        groupable: {
            messages: {
                empty: "<b style='color:#fabb3d;'>Kéo một tiêu đề cột và thả nó vào đây để nhóm theo cột đó</b>"
            }
        },
        //toolbar: kendo.template($("#Templ_NguoiDung").html()),
        columns:
            [
                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    filterable: {
                        ui: function (element) {

                            element.kendoComboBox({
                                dataTextField: "MaHD",
                                dataValueField: "MaHD",
                                dataSource: $("#grid_hd").data("kendoGrid").dataSource.data(),
                                filter: "startswith",

                                dataBound: function (e) {

                                    var $dropDown = $(e.sender.element),
                                        dataWidth = $dropDown.data("kendoComboBox").list.width(),
                                        listWidth = dataWidth + 300,
                                        containerWidth = listWidth + 6;

                                    // Set widths to the new values
                                    $dropDown.data("kendoComboBox").list.width(listWidth);
                                    $dropDown.closest(".k-widget").width(containerWidth);
                                }

                            });


                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"

                    },
                    width: 140
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

                    },
                    filterable: {
                        ui: function (element) {

                            element.kendoComboBox({
                                dataTextField: "SoPO",
                                dataValueField: "SoPO",
                                dataSource: $("#grid_hd").data("kendoGrid").dataSource.data(),
                                filter: "startswith",

                                dataBound: function (e) {

                                    var $dropDown = $(e.sender.element),
                                        dataWidth = $dropDown.data("kendoComboBox").list.width(),
                                        listWidth = dataWidth + 300,
                                        containerWidth = listWidth + 6;

                                    // Set widths to the new values
                                    $dropDown.data("kendoComboBox").list.width(listWidth);
                                    $dropDown.closest(".k-widget").width(containerWidth);
                                }

                            });


                        }
                    },
                    width: 100
                },
                
                //{
                //    title: "Tới bước",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "Buoc_TienTrinh_TT",
                //    template: function (data) {

                //        if (data.Buoc_TienTrinh_TT == 1) {
                //            return '<a>Bước 1 :</a><br>CHUYỂN HỒ SƠ THỤ LÝ';
                //        }
                //        else if (data.Buoc_TienTrinh_TT == 2) {
                //            return '<a>Bước 2 :</a><br>TIẾP NHẬN HỒ SƠ';
                //        }
                //        else if (data.Buoc_TienTrinh_TT == 3) {
                //            return '<a>Bước 3 :</a><br>KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ';
                //        }
                //        else {
                //            return '<a>Bước 0 :</a><br>CHƯA CHUYỂN HỒ SƠ THỤ LÝ';
                //        }
    
                //    },
                //    attributes: {
                //        class: "row_css",
                //        style: "font-weight:bold;color:red;"
                //    },
                //    width: 140
                //},
                {
                    title: "Tiến trình",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Buoc_TienTrinh_TT",
                    filterable: false,
                    groupHeaderTemplate:function (data) {
                        
                        if (data.value == 1) {
                            return 'Bước 1 : CHUYỂN HỒ SƠ THỤ LÝ';
                        }
                        else if (data.value == 2) {
                            return 'Bước 2 : TIẾP NHẬN HỒ SƠ';
                        }
                        else if (data.value == 3) {
                            return 'Bước 3 : KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ';
                        }
                        else {
                            return 'Bước 0 : CHƯA CHUYỂN HỒ SƠ THỤ LÝ';
                        }
                    
                    },
                    template: function (data) {

                        if (data.Buoc_TienTrinh_TT == 1) {
                            if (data.TT_TienTrinh_TT == 1) {
                                return '<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>ĐÃ CHUYỂN - CHỜ TIẾP NHẬN';
                            }
                            else if (data.TT_TienTrinh_TT == 2) {
                                return '<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>HOÀN TRẢ HỒ SƠ';
                            }
                            else if (data.TT_TienTrinh_TT == 3) {
                                return '<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>ĐÃ TIẾP NHẬN HỒ SƠ';
                            }
                            else {
                                return '<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>CHỜ NHÀ THẦU CHUYỂN HỒ SƠ';
                            }                            
                        }
                        else if (data.Buoc_TienTrinh_TT == 2) {

                            if (data.TT_TienTrinh_TT == 1) {
                                return '<a>Bước 2 </a><br><a style="font-weight:bold;color:red;">TIẾP NHẬN HỒ SƠ</a><br><a>Tình trạng</a><br>ĐÃ CHUYỂN HỒ SƠ CHO NHÂN VIÊN THỤ LÝ';
                            }                            
                            else {
                                return '<a>Bước 2 </a><br><a style="font-weight:bold;color:red;">TIẾP NHẬN HỒ SƠ</a><br><a>Tình trạng</a><br>ĐANG TIẾP NHẬN HỒ SƠ';
                            }
                        }
                        else if (data.Buoc_TienTrinh_TT == 3) {

                            if (data.TT_TienTrinh_TT == 1) {
                                return '<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br>HỒ SƠ CHƯA HỢP LÝ - HOÀN TRẢ NHÀ THẦU';
                            }
                            else if (data.TT_TienTrinh_TT == 2) {
                                return '<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br>HOÀN TẤT HỒ SƠ THANH TOÁN';
                            }                            
                            else {
                                return '<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br>ĐANG KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ';
                            }
                        }
                        else {
                            if (data.TT_TienTrinh_TT == 1) {
                                return '<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>ĐÃ CHUYỂN - CHỜ TIẾP NHẬN';
                            }
                            else if (data.TT_TienTrinh_TT == 2) {
                                return '<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>HOÀN TRẢ HỒ SƠ';
                            }
                            else if (data.TT_TienTrinh_TT == 3) {
                                return '<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>ĐÃ TIẾP NHẬN HỒ SƠ';
                            }
                            else {
                                return '<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br>CHỜ NHÀ THẦU CHUYỂN HỒ SƠ';
                            }
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;background-color:lightyellow;"
                    },
                    width: 170
                },
                {
                    title: "Người phân công",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Nguoi_PhanCong",
                    attributes: {
                        class: "row_css"
                    },
                    filterable: {
                        ui: function (element) {

                            element.kendoComboBox({
                                dataTextField: "Nguoi_PhanCong",
                                dataValueField: "Nguoi_PhanCong",
                                dataSource: $("#grid_hd").data("kendoGrid").dataSource.data(),
                                filter: "startswith",

                                dataBound: function (e) {

                                    var $dropDown = $(e.sender.element),
                                        dataWidth = $dropDown.data("kendoComboBox").list.width(),
                                        listWidth = dataWidth + 300,
                                        containerWidth = listWidth + 6;

                                    // Set widths to the new values
                                    $dropDown.data("kendoComboBox").list.width(listWidth);
                                    $dropDown.closest(".k-widget").width(containerWidth);
                                }

                            });


                        }
                    },
                    groupHeaderTemplate: function (data) {

                        if (data.value == null) {
                            return 'Chưa phân công';
                        }                      
                        else {
                            return data.value;
                        }

                    },
                    template: $("#photo-template").html(),
                    width: 150
                },
                {
                    title: "Mã hồ sơ thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ma_HS_TT",
                    attributes: {
                        class: "row_css"
                    },
                    template: function (data) {
                        if (data.Ma_HS_TT == null) {
                            return 'Chưa tiếp nhận'
                        } else {
                            return data.Ma_HS_TT
                        }
                    },
                    filterable: {
                        ui: function (element) {

                            element.kendoComboBox({
                                dataTextField: "Ma_HS_TT",
                                dataValueField: "Ma_HS_TT",
                                dataSource: $("#grid_hd").data("kendoGrid").dataSource.data(),
                                filter: "startswith",

                                dataBound: function (e) {

                                    var $dropDown = $(e.sender.element),
                                        dataWidth = $dropDown.data("kendoComboBox").list.width(),
                                        listWidth = dataWidth + 300,
                                        containerWidth = listWidth + 6;

                                    // Set widths to the new values
                                    $dropDown.data("kendoComboBox").list.width(listWidth);
                                    $dropDown.closest(".k-widget").width(containerWidth);
                                }

                            });


                        }
                    },
                    width: 150
                },
                {
                    title: "Ngày thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayDK_ThanhToan",
                    attributes: {
                        class: "row_css"
                    },
                    groupHeaderTemplate: function (data) {

                        if (data.value == null) {
                            return 'Chưa phân công';
                        }
                        else {
                            return data.value;
                        }

                    },
                    template: function (data) {
                        if (data.NgayDK_ThanhToan == null) {
                            return 'Chưa tiếp nhận'
                        } else {
                            return data.NgayDK_ThanhToan
                        }
                    },
                    width: 100
                }
                
                
                
            ]
    });

    //#endregion
});