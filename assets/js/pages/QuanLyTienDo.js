var DS_PO_TheoNhaThau, DS_PO_NhaThau_ChiTiet, DS_TienDo_CamKet, DS_PO_TheoNhaThau_SoVB, DS_TienDo_ThucTe, DS_NhaThau;

var pp_PO_NhaThau_ChiTiet_ID, pp_PO_NhaThau_ID;

$(document).ready(function () {

    //////// DataSource\\\\\\\\\\\\
    DS_NhaThau = new kendo.data.DataSource({
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
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
   
    DS_PO_TheoNhaThau_SoVB = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_PO_TheoNhaThau'
                      //  p_sovanban: $("#txt_noidung").val()
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }, pageSize : 10
    });
   

    //#region control
    $("#wd_XemCamKet").kendoWindow({
        draggable: false,
        height: "auto",
        width: "90%",
        modal: true,
        resizable: false,
        title: "Xem Tiến độ thực hiện",
        visible: false,
        actions: [  "Close"  ]

    }).data("kendoWindow");
    $("#wd_CapNhatCamKet").kendoWindow({
        draggable: false,
        //height: "auto",
        //width: "90%",
        height: "100%",
        width: "100%",
        modal: true,
        resizable: false,
        title: "Cập nhật Kế hoạch Giao hàng",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");

    $("#wd_CapNhatThucTe_KoKH").kendoWindow({
        draggable: false,
        //height: "auto",
        //width: "90%",
        height: "100%",
        width: "100%",
        modal: true,
        resizable: false,
        title: "Cập nhật Thực tế Giao hàng - Không có Kế hoạch Giao Hàng",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");
    

    $("#wd_CapNhatThucTe").kendoWindow({
        draggable: false,
        height: "auto",
        width: "90%",
        modal: true,
        resizable: false,
        title: "Cập nhật Cam kết Tiến độ Thực Tế Giao hàng",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");
    $("#wd_KhoaThucTe").kendoWindow({
        draggable: false,
        height: "auto",
        width: "90%",
        modal: true,
        resizable: false,
        title: "Khóa Tiến độ Thực Tế Giao hàng",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");

    
    $("#cmb_NhaThau_TTCU").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau        
    });
    $("#cmb_NhaThau").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.NhaThau_ID;

            if (value) {

                DS_PO_TheoNhaThau = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                                data: {
                                    cmd: 'DS_PO_TheoNhaThau_ID',
                                    p_nhathau: value
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
                                }
                            });
                        }
                    },
                    pageSize: 10
                });
                                
                $("#grid_ponhathau").data("kendoGrid").setDataSource(DS_PO_TheoNhaThau);
            }
            else {                
                $("#grid_ponhathau").data("kendoGrid").setDataSource(
                            new kendo.data.DataSource({
                                data: []
                            })
                        );
            }
        }
    });



    $("#txt_SoLuong").kendoNumericTextBox({
        //format: "#.###",
        //format: "#.0000"
        format: 'n3',
        decimals: 3
    });
    $("#txt_soluong_TT").kendoNumericTextBox({
        //format: "#.###",
        //format: "#.0000"
        format: 'n3',
        decimals: 3
    });
    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_ngaygiaohang").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_ngaygiaohang_koKH").kendoDatePicker({
        format: "dd/MM/yyyy"
    }); 
    //$('#btn_Load_PO_NhaThau').click(function (e) {
    //    //alert('sdkfghasdljhgadsg');
      
    //});
    //#endregion
    Ham_Load_PO_NhaThau_BYNhaThauID(); 
});

function Ham_HienThi_VB(value) {
    if (value == "" || value == null) {
        return '<center>Chưa upload </center>';
    } else {
        //return '<center><a href= "' + value + '" class="k-button" target="_blank" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-seek-s"></span></a></center>';
        return '<center><a href= "' + value + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
    }
}

function Ham_HienThi_DonVi(value) {
    if (value != "") {

        return "<b> \ " + value + "\</b>"
    }
    else {
        return value;
    }
}
function Ham_HienThi_DotCamKet(value) {
    if (value != "") {
        return "<b style='font-weight:bold;color:red;'> \ " + value + "\</b>"


    }
    else {
        return value;
    }
}

//#region 'TTCU KHOA CAM KET - KHOA THUC TE'
function Ham_Load_PO_NhaThau1() {
  
     DS_PO_TheoNhaThau = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_PO_TheoNhaThau_ID',
                        p_nhathau: $("#cmb_NhaThau_TTCU").data("kendoDropDownList").value()
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }, pageSize: 10
       

    });
   
    $("#grid_danhsach").empty();
    $("#grid_danhsach").kendoGrid({
        //  toolbar: ["excel"],
        //excel: {
        //    fileName: "tk_tiendo.xlsx"
        //    //    allPages: true,
        //    // filterable: true
        //},
        //  toolbar: kendo.template($("#Templ_NhaThau").html()),
        dataSource: DS_PO_TheoNhaThau,
        pageable: {
            messages: {
                display: "Tổng số   {2}   văn bản",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        //detailTemplate: kendo.template($("#Templ_ChiTiet_PO").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },

        detailInit: function (e) {

            DS_PO_NhaThau_ChiTiet = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                            data: {
                                cmd: 'DS_PO_NhaThau_ChiTiet',
                                p_po_nhathau_id: e.data.PO_NhaThau_ID,
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                                }
                                else {
                                    options.success(result);
                                }
                            }
                        });
                    }
                },
                group: [
                           { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
                ], pageSize: 10
            });
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: DS_PO_NhaThau_ChiTiet,
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
                            title: "PO_NhaThau_ChiTiet_ID",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "PO_NhaThau_ChiTiet_ID",
                            attributes: {
                                class: "row_css"
                            }, hidden: true
                        },
            {
                title: "Đơn vị",
                groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                headerAttributes: {
                    class: "header_css"
                },
                field: "TenDonVi",
                attributes: {
                    class: "row_css"
                }
               , hidden: true

            },
            {
                title: "MaVatTu_TD",
                headerAttributes: {
                    class: "header_css"
                },
                field: "MaVatTu_TD",
                attributes: {
                    class: "row_css"
                }, hidden: true,
            },
            {
                title: "Tên vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "TenVT",
                attributes: {
                    class: "row_css"
                }, width: "40%"
            },
            {
                title: "Đơn vị tính",
                headerAttributes: {
                    class: "header_css"
                },
                field: "DonViTinh_Ten",
                attributes: {
                    class: "row_css"
                }
            },
            {
                title: "Số lượng đặt hàng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuongGiaoHang",
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:green;"
                }
            },
            {
                title: "Tổng SL Cam kết",
                headerAttributes: {
                    class: "header_css"
                },
                field: "TongSoLuongCK",
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:green;"
                }
            },

             {
                 title: "Tổng SL giao TT",
                 headerAttributes: {
                     class: "header_css"
                 },
                 field: "TongSoLuongDaGiaoTT",
                 attributes: {
                     class: "row_css",
                     style: "font-weight:bold;color:green;"
                 }
             },
             {
                 title: "Tổng SL giao KoKH",
                 headerAttributes: {
                     class: "header_css"
                 },
                 field: "TongSLGiaoKoKH",
                 attributes: {
                     class: "row_css",
                     style: "font-weight:bold;color:green;"
                 }
             },
            {
                title: "SL Còn TT",
                headerAttributes: {
                    class: "header_css"
                },
                field: "TongSoLuongConLaiTT",
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;color:green;"
                }
            },
             {
                 title: "Ngày Thực Tế",
                 headerAttributes: {
                     class: "header_css"
                 },
                 field: "NgayThucTe",
                 attributes: {
                     class: "row_css"
                 }, //width: "10%"
             },
                    ]
            });
        },

        columns:
            [
                 //{
                 //    template: function (data) {
                 //        //   return '<center><a class="btn btn-info" onclick="Ham_Sua_PO_HD_CT('  + data.PO_NhaThau_ChiTiet_ID + ',\'' + data.TenVT + '\',' + data.VatTu_ID + ',\'' + data.MaVatTu_TD + '\',' + data.SoLuongGiaoHang + ');"><i class="fa fa-edit "></i> Sửa</a></center>'
                 //        return '<center><a class="btn btn-info" onclick="func_CapNhatCamKet(' + data.PO_NhaThau_ID + ',\'' + data.SoPO + '\',\'' + data.SoVB + '\');"><i class="fa fa-edit "></i>Kế Hoạch</a></center>';
                 //    }, width: "9%"
                 //},
                 //{
                 //    template: function (data) {
                 //        return '<center><a class="btn btn-info" onclick="func_CapNhatThucTe_KoKH(' + data.PO_NhaThau_ID + ',\'' + data.SoPO + '\',\'' + data.SoVB + '\');"><i class="fa fa-edit "></i>Thực Tế</a></center>';
                 //    }, width: "9%"
                 //},
                 {
                     title: "Số PO",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoPO",
                     attributes: {
                         class: "row_css"
                     }, width: "10%"
                 },
                 {
                     //  groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",
                     title: "Số VB",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB",
                     attributes: {
                         class: "row_css",
                         style: "font-weight:bold;"
                     }, width: "14%"
                     //   template: "#= OnChangeFormat(SoLuongThucTe) #",
                     //aggregates: ["sum"],
                     //footerTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                     //groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>"
                 },
                 {
                     title: "Ngày văn bản",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayVB",
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
                     attributes: {
                         class: "row_css"
                     }, width: "5%",
                     template: '#= Ham_HienThi_VB(FileVB) #'
                     //  template: '#if(FileVB!==""){#<a href="#=FileVB#" class="Xem">Xem</a>#}else{#<span>Chưa upload</span>#}#',
                 },
                 {
                     title: "Số VB Nhà thầu",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB_NhaThau",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "File VB Nhà thầu",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "FileVB_NhaThau",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày xuất ĐH",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayTaoDonHang",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày Cam Kết ",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayVB_NhaThau",
                     attributes: {
                         class: "row_css",
                         style: "font-weight:bold;color:red;"
                     }
                 },
                 {
                     title: "Ngày bắt đầu",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayBatDau",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày kết thúc",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayKetThuc",
                     attributes: {
                         class: "row_css",
                         style: "font-weight:bold;color:red;"
                     }, width: "8%"
                 }
            ]
    });

   
}


//#endregion

//#region 'NHA THAU CAP NHAT CAM KET'
function Ham_Load_PO_NhaThau_BYNhaThauID() {
  
    $("#grid_ponhathau").empty();
    $("#grid_ponhathau").kendoGrid({
        //  toolbar: ["excel"],
        //excel: {
        //    fileName: "tk_tiendo.xlsx"
        //    //    allPages: true,
        //    // filterable: true
        //},
      //  toolbar: kendo.template($("#Templ_NhaThau").html()),
        dataSource: DS_PO_TheoNhaThau_SoVB,
        pageable: {
            messages: {
                display: "Tổng số   {2}   văn bản",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        detailTemplate: kendo.template($("#Templ_ChiTiet_PO").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },

        detailInit: Ham_TabKeHoach,
      
        columns:
            [
                 {
                    template: function (data) {
                        //   return '<center><a class="btn btn-info" onclick="Ham_Sua_PO_HD_CT('  + data.PO_NhaThau_ChiTiet_ID + ',\'' + data.TenVT + '\',' + data.VatTu_ID + ',\'' + data.MaVatTu_TD + '\',' + data.SoLuongGiaoHang + ');"><i class="fa fa-edit "></i> Sửa</a></center>'
                        return '<center><a class="btn btn-info" onclick="func_CapNhatCamKet(' + data.PO_NhaThau_ID + ',\'' + data.SoPO + '\',\''  + data.SoVB +'\');"><i class="fa fa-edit "></i>Kế Hoạch</a></center>';
                    }, width: "10%"
                 },
                 {
                     template: function (data) {
                         return '<center><a class="btn btn-info" onclick="func_CapNhatThucTe_KoKH(' + data.PO_NhaThau_ID + ',\'' + data.SoPO + '\',\'' + data.SoVB + '\');"><i class="fa fa-edit "></i>Thực Tế</a></center>';
                     }, width: "10%"
                 },
                 {
                    title: "Số PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoPO",
                    attributes: {
                        class: "row_css"
                    }, width: "10%"
                },
                 {
                    //  groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",
                    title: "Số VB",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVB",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }, width : "14%"
                    //   template: "#= OnChangeFormat(SoLuongThucTe) #",
                    //aggregates: ["sum"],
                    //footerTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                    //groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>"
                },
                 {
                    title: "Ngày văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayVB",
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
                     attributes: {
                         class: "row_css"
                     }, width : "5%", 
                     template: '#= Ham_HienThi_VB(FileVB) #'
                   //  template: '#if(FileVB!==""){#<a href="#=FileVB#" class="Xem">Xem</a>#}else{#<span>Chưa upload</span>#}#',
                 },
                 {
                      title: "Số VB Nhà thầu",
                      headerAttributes: {
                          class: "header_css"
                      },
                      field: "SoVB_NhaThau",
                      attributes: {
                          class: "row_css"
                      }
                  },
                 {
                    title: "File VB Nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB_NhaThau",
                    attributes: {
                        class: "row_css"
                    }
                },
                 {
                    title: "Ngày xuất ĐH",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayTaoDonHang",
                    attributes: {
                        class: "row_css"
                    }
                },
                 {
                    title: "Ngày Cam Kết ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayVB_NhaThau",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;"
                    }
                },
                 {
                    title: "Ngày bắt đầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayBatDau",
                    attributes: {
                        class: "row_css"
                    }
                },
                 {
                    title: "Ngày kết thúc",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKetThuc",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;"
                    }, width: "8%"
                }
            ]
    });
    
}


function Ham_TabKeHoach(f) {
    pp_PO_NhaThau_ID = f
    var detailRow = f.detailRow;
   
    detailRow.find("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        },
        select: function (e) {

            //alert($("#tabstrip").data("kendoTabStrip").select().index());
            //$(e.item).find("> .k-link").text().trim()
            //alert(this.select().index());
            //alert(detailRow.data.PO_NhaThau_ID);
            var content_tab = $(e.item).find("> .k-link").text().trim();
            switch (content_tab) {
                case "Kế hoạch Giao hàng":
                    detailRow.find("#tab_KeHoach").empty();
                    detailRow.find("#tab_KeHoach").kendoGrid({
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                                        data: {
                                            cmd: 'DS_DotCamKet',
                                            p_po_nhathau_id: f.data.PO_NhaThau_ID,
                                           // cmd: 'DS_PO_Theo_PO_NhaThau_ID',
                                          //  p_po_nhathau_id: f.data.PO_NhaThau_ID,
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    });
                                }
                            }
                           // ,group: [
                              //        { field: "Dot_CamKet" }, {field : "TenDonVi"}// { field: "TenNhaThau" },
                              //      ]
                        }),
                       
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        detailInit: function (e) {

                            DS_PO_NhaThau_ChiTiet = new kendo.data.DataSource({
                                transport: {
                                    read: function (options) {
                                        $.ajax({
                                            type: "POST",
                                            url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                                            data: {
                                                cmd: 'DS_PO_Theo_PO_NhaThau_ID',
                                                p_po_nhathau_id: f.data.PO_NhaThau_ID,
                                                p_dotcamket : e.data.DotCamKet

                                            },
                                            dataType: 'json',
                                            success: function (result) {
                                                if (result == "err401") {
                                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                    window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        });
                                    }
                                }
                                ,group: [
                                  { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
                                ]
                                , pageSize: 10
                            });

                            $("<div/>").appendTo(e.detailCell).kendoGrid({
                                dataSource: DS_PO_NhaThau_ChiTiet,
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
                                             title: "ID",
                                             headerAttributes: {
                                                 class: "header_css"
                                             },
                                             field: "ID",
                                             attributes: {
                                                 class: "row_css"
                                             }, hidden: true,
                                        },
                                         {
                                             title: "PO_NhaThau_ChiTiet_ID",
                                             headerAttributes: {
                                                 class: "header_css"
                                             },
                                             field: "PO_NhaThau_ChiTiet_ID",
                                             attributes: {
                                                 class: "row_css"
                                             }, hidden: true,
                                         },
                                        {
                                             //  title: "Đơn vị",
                                             groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                                             headerAttributes: {
                                                 class: "header_css"
                                             },
                                             field: "TenDonVi",
                                             attributes: {
                                                 class: "row_css"
                                             }
                                           , hidden: true,
                                         },
                                        {
                                            title: "MaVatTu_TD",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "MaVatTu_TD",
                                            attributes: {
                                                class: "row_css"
                                            }, hidden: true,
                                        },
                                        {
                                            title: "Tên vật tư",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "TenVT",
                                            attributes: {
                                                class: "row_css"
                                            }, width: "40%"
                                        },
                                        {
                                            title: "Đơn vị tính",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "DonViTinh_Ten",
                                            attributes: {
                                                class: "row_css"
                                            }
                                        },
                                        {
                                            title: "Số lượng kế hoạch",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "SoLuong",
                                            attributes: {
                                                class: "row_css",
                                                style: "font-weight:bold;color:green;"
                                            }//, width: "9%"
                                        },
                                        {
                                            template: '<center><a class="btn btn-danger" onclick="func_Ham_XoaCapNhat(#= ID #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                                            //width: "8%"
                                        }
                                    ]
                            });
                        },

                        columns:
                        [
                             {
                                 // title: "Đợt Kế hoạch",
                                 groupHeaderTemplate: "#= Ham_HienThi_DotCamKet(value) #",
                                 headerAttributes: {
                                     class: "header_css"
                                 },
                                 field: "Dot_CamKet",
                                 attributes: {
                                     class: "row_css",
                                     style: "font-weight:bold;color:red;"
                                 } //, width: "90%"
                             },
                             {
                                 template: function (data) {
                                     return '<center><a class="btn btn-info" onclick="func_CapNhatThucTe(' + data.PO_NhaThau_ID + ',\'' + data.DotCamKet + '\');"><i class="fa fa-edit "></i>Thực tế Giao Hàng</a></center>';
                                 }//, width: "10%"
                             },
                             {
                                 title: "PO_NhaThau_ID",
                                 headerAttributes: {
                                     class: "header_css"
                                 },
                                 field: "PO_NhaThau_ID",
                                 attributes: {
                                     class: "row_css"
                                 }, hidden: true,
                             },
                              {
                                 title: "DotCamKet",
                                 headerAttributes: {
                                     class: "header_css"
                                 },
                                 field: "DotCamKet",
                                 attributes: {
                                     class: "row_css"
                                 }, hidden: true,
                             }
                            
                        ]
                    });
                  
                    break;
            }

        }
    });
    DS_PO_NhaThau_ChiTiet = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_PO_NhaThau_ChiTiet',
                        p_po_nhathau_id: f.data.PO_NhaThau_ID,
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        group: [
                   { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
        ], pageSize: 10
      });
    
        detailRow.find("#tab_ThucTe").empty();
        detailRow.find("#tab_ThucTe").kendoGrid({
            dataSource: DS_PO_NhaThau_ChiTiet,
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
            columns:
            [
                {
                    title: "PO_NhaThau_ChiTiet_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ChiTiet_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true
                },
                {
                      title: "Đơn vị",
                    groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                   , hidden: true

                },
                {
                    title: "MaVatTu_TD",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    attributes: {
                        class: "row_css"
                    }, hidden: true,
                },
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenVT",
                    attributes: {
                        class: "row_css"
                    }, width: "40%"
                },
                {
                    title: "Đơn vị tính",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonViTinh_Ten",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Số lượng đặt hàng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuongGiaoHang",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
                    }
                },
                {
                    title: "Tổng SL Cam kết",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TongSoLuongCK",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
                    }
                },
                
                 {
                     title: "Tổng SL giao TT",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TongSoLuongDaGiaoTT",
                     attributes: {
                         class: "row_css",
                         style: "font-weight:bold;color:green;"
                     }
                 },
                 {
                     title: "Tổng SL giao KoKH",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TongSLGiaoKoKH",
                     attributes: {
                         class: "row_css",
                         style: "font-weight:bold;color:green;"
                     }
                 },
                {
                    title: "SL Còn TT",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TongSoLuongConLaiTT",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
                    }
                },
                 {
                     title: "Ngày Thực Tế",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayThucTe",
                     attributes: {
                         class: "row_css"
                     }, //width: "10%"
                 },
             ]
        });
}
var DS_VatTu_DaChon;

var DS_VatTu_DaChon_Thucte;

var p_PO_NhaThau_ID_luu;

var ItemChecked = {};
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#grid_dotcamket").data("kendoGrid"),
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
function selectRow_TT() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#grid_thucte_kokh").data("kendoGrid"),
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
function func_CapNhatCamKet(PO_NhaThau_ID, soPO, SoVB) {//func_CapNhatCamKet(PO_NhaThau_ChiTiet_ID, TenVT, VatTu_ID, MaVatTu_TD, SoLuongGiaoHang) {
    $("#wd_CapNhatCamKet").data("kendoWindow").center().open();
    $("#txt_soPO").text(soPO);
    $("#txt_soVB").text(SoVB);
    //$("#txt_VatTu").text(OnChangeFormat(TenVT));
    //$("#txt_VatTu_ID").text(VatTu_ID);
    //$("#txt_SoLuong").data("kendoNumericTextBox").value(SoLuongGiaoHang);
    p_PO_NhaThau_ID_luu = PO_NhaThau_ID;
       
    DS_TienDo_CamKet = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_PO_NhaThau_ChiTiet',
                        p_po_nhathau_id: PO_NhaThau_ID,
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        group: [
              { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
        ]
       , pageSize: 10
    });

    $("#grid_dotcamket").empty();
    var grid_dotcamket =  $("#grid_dotcamket").kendoGrid({
        dataSource: DS_TienDo_CamKet,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   đơn vị",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                 itemsPerPage: "Số mục trong một trang"
            }
        },
        
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
        
        toolbar: kendo.template($("#Templ_ChonVatTu").html()),
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
                },
                {
                    title: "PO_NhaThau_ChiTiet_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ChiTiet_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true,
                },
                {
                    title: "PO_NhaThau_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true,
                },
                {
                    title: "Đơn vị",
                    groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }                   
                   , hidden: true
                },
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenVT",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "ĐVT",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonViTinh_Ten",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuongGiaoHang",
                    attributes: {
                        class: "row_css"
                    }
                }
               
            ]
    }).data("kendoGrid"); 


    //bind click event to the checkbox
    grid_dotcamket.table.on("click", ".checkbox", selectRow);
    //#region hiển thị danh sách vật tư được chọn
    DS_VatTu_DaChon = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                fields: {
                    
                    SoLuongGiaoHang: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            NameValidation: function (input) {

                                var grid = $("#grid_DS_CamKet").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SoLuong_GiaoHang = $(input).val();
                             
                                if (SoLuong_GiaoHang == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }
                               
                                return true;

                            }
                        }
                    },
                    GhiChuCK: { editable: true}
                }
            }
        },
        group: [
              { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
        ]
    });

    $("#grid_DS_CamKet").empty();
    $("#grid_DS_CamKet").kendoGrid({
        dataSource: DS_VatTu_DaChon,
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
         toolbar: kendo.template($("#Templ_VatTu_DaChon").html()),
        columns:
          [
              {
                  title: "PO_NhaThau_ChiTiet_ID",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "PO_NhaThau_ChiTiet_ID",
                  attributes: {
                      class: "row_css"
                  }, hidden: true,
              },
              {
                  title: "PO_NhaThau_ID",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "PO_NhaThau_ID",
                  attributes: {
                      class: "row_css"
                  }, hidden: true,
              },
               {
                   title: "Đơn vị",
                  groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "TenDonVi",
                   attributes: {
                       class: "row_css"
                   }
                   , hidden: true
               },
              {
                  title: "Tên vật tư",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "TenVT",
                  attributes: {
                      class: "row_css"
                  }
              },
              {
                  title: "ĐVT",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "DonViTinh_Ten",
                  attributes: {
                      class: "row_css"
                  }
              },
              {
                  title: "Số lượng sẽ giao",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "SoLuongGiaoHang",                    
                  template:function (data) {
                      if (data.SoLuongGiaoHang == 0) {
                          return data.SoLuongGiaoHang;
                      } else {
                          return '<b style="color:blue;">' + OnChangeFormat(data.SoLuongGiaoHang) + '</b>';
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
                  title: "Ghi chú",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "GhiChuCK",
                  editable: true,
                  attributes: {
                      class: "row_css",
                      style: "background-color:lightyellow;"
                  }
              },
               {
                   template: '<center><a class="btn btn-danger" onclick="Ham_Xoa_VatTu_DaChon(#= PO_NhaThau_ChiTiet_ID #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                   width: "8%"
               }
              
          ]
    });

}

//#region Hàm chọn vật tư 
function Ham_Chon_VatTu() {

    for (var i in ItemChecked) {
        if (ItemChecked[i]) {

            var grid = $("#grid_dotcamket").data("kendoGrid");
            var selectedTopic = grid.dataSource.getByUid(i);

            var check = 0;
            for (var i = 0; i < DS_VatTu_DaChon.data().length; i++) {
                if (DS_VatTu_DaChon.data()[i].PO_NhaThau_ChiTiet_ID == selectedTopic.PO_NhaThau_ChiTiet_ID) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                DS_VatTu_DaChon.add(selectedTopic);
            }
        }
    }
    for (var i = 0; i < $("#grid_dotcamket tr").length; i++) {
        var className_ = $("#grid_dotcamket tr")[i].className;

        if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

            $($("#grid_dotcamket tr")[i]).removeClass("k-state-selected");
            $("#grid_dotcamket tr")[i].cells[1].childNodes[0].childNodes[0].checked = false;
        }
    }
    ItemChecked = {};
}

function Ham_Chon_VatTu_TT_KoKH() {

    for (var i in ItemChecked) {
        if (ItemChecked[i]) {

            var grid = $("#grid_thucte_kokh").data("kendoGrid");
            var selectedTopic = grid.dataSource.getByUid(i);

            var check = 0;
            for (var i = 0; i < DS_VatTu_DaChon_Thucte.data().length; i++) {
                if (DS_VatTu_DaChon_Thucte.data()[i].PO_NhaThau_ChiTiet_ID == selectedTopic.PO_NhaThau_ChiTiet_ID) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                DS_VatTu_DaChon_Thucte.add(selectedTopic);
            }
        }
    }
    for (var i = 0; i < $("#grid_thucte_kokh tr").length; i++) {
        var className_ = $("#grid_thucte_kokh tr")[i].className;

        if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

            $($("#grid_thucte_kokh tr")[i]).removeClass("k-state-selected");
            $("#grid_thucte_kokh tr")[i].cells[1].childNodes[0].childNodes[0].checked = false;
        }
    }
    ItemChecked = {};
}
function Ham_Xoa_VatTu_DaChon(p_PO_NhaThau_ChiTiet_ID) {

    for (var i = 0; i < DS_VatTu_DaChon.data().length; i++) {

        var item = DS_VatTu_DaChon.data()[i];
        if (item.PO_NhaThau_ChiTiet_ID == p_PO_NhaThau_ChiTiet_ID) {
            DS_VatTu_DaChon.remove(item);
        }
    }
}

function Ham_Xoa_VatTu_DaChon_TT_koKH(p_PO_NhaThau_ChiTiet_ID) {

    for (var i = 0; i < DS_VatTu_DaChon_Thucte.data().length; i++) {

        var item = DS_VatTu_DaChon_Thucte.data()[i];
        if (item.PO_NhaThau_ChiTiet_ID == p_PO_NhaThau_ChiTiet_ID) {
            DS_VatTu_DaChon_Thucte.remove(item);
        }
    }
}

function func_Ham_Close_XemCamKet() {
    $("#wd_CapNhatCamKet").data("kendoWindow").center().close();
}
var max_dotcamket;

function func_Ham_Luu_CapNhatCamKet() {
    var check = 0;   
    //alert(p_PO_NhaThau_ID_luu);
    if ($("#txt_TuNgay").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kế hoạch giao hàng!");
        return;
    }
    if ($("#txt_DenNgay").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kế hoạch giao hàng!");
        return;
    }

    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
            data: {
                cmd: 'Luu_CapNhatCamKet',
                p_PO_NhaThau_ID: p_PO_NhaThau_ID_luu,
                p_tungay: $("#txt_TuNgay").val(),
                p_denngay: $("#txt_DenNgay").val(),
                //p_PO_NhaThau_ChiTiet_ID: p_PO_NhaThau_ChiTiet_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                var grid_DS_CamKet = $("#grid_DS_CamKet").data("kendoGrid").dataSource.data();

                var check = 0;

                for (var j = 0; j < grid_DS_CamKet.length; j++) {

                    var _PO_NhaThau_ChiTiet_ID = grid_DS_CamKet[j].PO_NhaThau_ChiTiet_ID;
                    //var _PO_NhaThau_ID = grid_DS_CamKet[j].PO_NhaThau_ID;
                    var p_SoLuongGiaoHang = grid_DS_CamKet[j].SoLuongGiaoHang;
                    var p_GhiChuCK = grid_DS_CamKet[j].GhiChuCK;

                    if (p_SoLuongGiaoHang == 0) {
                        alert("Chưa nhập số lượng!");
                        check = 1;
                        break;
                    }
                    else {

                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                            data: {
                                cmd: 'Luu_CapNhatCamKet_CT',
                                p_PO_NhaThau_ChiTiet_ID: _PO_NhaThau_ChiTiet_ID,
                                p_SoLuongGiaoHang: p_SoLuongGiaoHang,                               
                                p_GhiChuCK: p_GhiChuCK                              
                                
                            },
                            dataType: 'json'
                        });
                    }

                }
                if (check == 0) {
                    alert("Đã cập nhật Kế hoạch Giao hàng thành công!");
                    $("#wd_CapNhatCamKet").data("kendoWindow").close();

                    // BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
                    //DS_VatTu_DaChon.read();
                }

            }
            else {
                if (msg[0].ErrorMessage == 'slnhap>slgiaohang') {
                    alert('Số lượng nhập lớn hơn số lượng đặt hàng hoặc đã nhập kế hoạch rồi');
                }
                if (msg[0].ErrorMessage == 'slnhap>slconlai') {
                    alert('Số lượng nhập lớn hơn số lượng còn lại');
                }
                if (msg[0].ErrorMessage == 'slnhap>slgiaohangSUM') {
                    alert('Tổng số lượng nhập lớn hơn số lượng tổng của các đợt giao hàng');
                }
                if (msg[0].ErrorMessage == 'slnhap>slgiaohangSUM_TheoDot') {
                    alert('Tổng số lượng nhập lớn hơn số lượng giao theo đợt');
                }
            }
        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + textStatus);
        });

    }







   
}

function func_Ham_XoaCapNhat(ID) {

//    alert(PO_NhaThau_ChiTiet_ID + "jjjj" + ID)
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
        data: {
            cmd: 'Xoa_CapNhatCamKet',
            p_ID: ID
           
           
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {
            alert("Đã xóa cam kết!");
            $("#wd_CapNhatCamKet").data("kendoWindow").close();
            DS_PO_NhaThau_ChiTiet.read();
        }
        else {
            alert("Đã cập nhật thực tế không xóa được!");
           // alert(msg[0].ErrorMessage);
        }
    });
    request.fail(function (jqXHR, textStatus) {

        alert("Request failed: " + textStatus);
    });

}
//#endregion

//#region 'NHÀ THẦU NHẬP THỰC TẾ'
var Dot_CamKet;


function func_CapNhatThucTe_KoKH(PO_NhaThau_ID, soPO, SoVB) {
    $("#wd_CapNhatThucTe_KoKH").data("kendoWindow").center().open();
    $("#txt_soPO_tt").text(soPO);
    $("#txt_soVB_tt").text(SoVB);
    DS_TienDo_CamKet = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_PO_NhaThau_ChiTiet',
                        p_po_nhathau_id: PO_NhaThau_ID,
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        group: [
              { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
        ]
       , pageSize: 10
    });

    $("#grid_thucte_kokh").empty();
    var grid_thucte_kokh = $("#grid_thucte_kokh").kendoGrid({
        dataSource: DS_TienDo_CamKet,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   đơn vị",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },

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

        toolbar: kendo.template($("#Templ_ChonVatTu_TT_KoKH").html()),
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
                },
                {
                    title: "PO_NhaThau_ChiTiet_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ChiTiet_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true,
                },
                {
                    title: "PO_NhaThau_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true,
                },
                {
                    title: "Đơn vị",
                    groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                   , hidden: true
                },
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenVT",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "ĐVT",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonViTinh_Ten",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuongGiaoHang",
                    attributes: {
                        class: "row_css"
                    }
                }

            ]
    }).data("kendoGrid");


    //bind click event to the checkbox
    grid_thucte_kokh.table.on("click", ".checkbox", selectRow_TT);
    //#region hiển thị danh sách vật tư được chọn
    DS_VatTu_DaChon_Thucte = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                fields: {

                    SoLuongGiaoHang: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            NameValidation: function (input) {

                                var grid = $("#grid_chon_thucte_koKH").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SoLuong_GiaoHang = $(input).val();

                                if (SoLuong_GiaoHang == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }

                                return true;

                            }
                        }
                    },
                    GhiChuTT: { editable: true }
                }
            }
        },
        group: [
              { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
        ]
    });

    $("#grid_chon_thucte_koKH").empty();
    $("#grid_chon_thucte_koKH").kendoGrid({
        dataSource: DS_VatTu_DaChon_Thucte,
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
        toolbar: kendo.template($("#Templ_VatTu_DaChon_TT_KoKH").html()),
        columns:
          [
              {
                  title: "PO_NhaThau_ChiTiet_ID",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "PO_NhaThau_ChiTiet_ID",
                  attributes: {
                      class: "row_css"
                  }, hidden: true,
              },
              {
                  title: "PO_NhaThau_ID",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "PO_NhaThau_ID",
                  attributes: {
                      class: "row_css"
                  }, hidden: true,
              },
               {
                   title: "Đơn vị",
                   groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "TenDonVi",
                   attributes: {
                       class: "row_css"
                   }
                   , hidden: true
               },
              {
                  title: "Tên vật tư",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "TenVT",
                  attributes: {
                      class: "row_css"
                  }
              },
              {
                  title: "ĐVT",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "DonViTinh_Ten",
                  attributes: {
                      class: "row_css"
                  }
              },
              {
                  title: "Số lượng giao",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "SoLuongGiaoHang",
                  template: function (data) {
                      if (data.SoLuongGiaoHang == 0) {
                          return data.SoLuongGiaoHang;
                      } else {
                          return '<b style="color:blue;">' + OnChangeFormat(data.SoLuongGiaoHang) + '</b>';
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
                  title: "Ghi chú",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "GhiChuTT",
                  editable: true,
                  attributes: {
                      class: "row_css",
                      style: "background-color:lightyellow;"
                  }
              },
               {
                   template: '<center><a class="btn btn-danger" onclick="Ham_Xoa_VatTu_DaChon_TT_koKH(#= PO_NhaThau_ChiTiet_ID #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                   width: "8%"
               }

          ]
    });
}
function func_CapNhatThucTe(PO_NhaThau_ID, DotCamKet) {
    $("#wd_CapNhatThucTe").data("kendoWindow").center().open();    
   
    Dot_CamKet = DotCamKet;
    p_PO_NhaThau_ID_luu = PO_NhaThau_ID;

    DS_TienDo_ThucTe = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                        cmd: 'DS_TienDo_NhaThau_ThucTe',
                        p_PO_NhaThau_ID: PO_NhaThau_ID,
                        p_DotCamKet: DotCamKet
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=QuanLyTienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }, pageSize: 10
        ,group: [
             { field: "TenDonVi" }//, {field : "TenVT"} { field: "TenNhaThau" },
             ]

    });

   
    $("#grid_dotthucte").empty();
    var grid_dotthucte = $("#grid_dotthucte").kendoGrid({
        dataSource: DS_TienDo_ThucTe,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   đơn vị",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        }, editable: true,

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

        toolbar: kendo.template($("#Templ_VatTu_DaChon_ThucTe").html()),
        columns:
            [
                {
                    title: "ID_ChiTietCK",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ID_ChiTietCK",
                    attributes: {
                        class: "row_css"
                    }, hidden: true
                },
                {
                    title: "PO_NhaThau_ChiTiet_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ChiTiet_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true
                },
                {
                    title: "PO_NhaThau_ID",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_NhaThau_ID",
                    attributes: {
                        class: "row_css"
                    }, hidden: true
                },
                {
                    title: "Đơn vị",
                    groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                   , hidden: true
                },
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenVT",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "ĐVT",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonViTinh_Ten",
                    attributes: {
                        class: "row_css"
                    }
                },
                //{
                //    title: "Số lượng Kế hoạch",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "SoLuong",
                //    attributes: {
                //        class: "row_css"
                //    }
                //},
                {
                    title: "Số lượng Giao",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    attributes: {
                        class: "row_css"
                    },

                    template: function (data) {
                        if (data.SoLuong == 0) {
                            return data.SoLuong;
                        } else {
                            return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong) + '</b>';
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
                },
                {
                  title: "Ghi chú",
                  headerAttributes: {
                      class: "header_css"
                  },
                  field: "GhiChuTT",
                  
                  attributes: {
                      class: "row_css",
                      style: "background-color:lightyellow;"
                  }
               }
              
            ]
    }).data("kendoGrid");
 
}
function func_Ham_Close_XemThucTe() {
    $("#wd_CapNhatThucTe").data("kendoWindow").center().close();
}

function func_Ham_Luu_CapNhatThucTe() {
    var check = 0;    
    if ($("#txt_ngaygiaohang").val() == "") {
        check = 1;
        alert("Chưa chọn ngày thực tế giao hàng!");
        return;
    }
    var grid_dotthucte = $("#grid_dotthucte").data("kendoGrid").dataSource.data();

    var check = 0;

    for (var j = 0; j < grid_dotthucte.length; j++) {

        var _ID_ChiTietCK = grid_dotthucte[j].ID_ChiTietCK;
        var _PO_NhaThau_ChiTiet_ID = grid_dotthucte[j].PO_NhaThau_ChiTiet_ID;
        
        var p_SoLuongGiaoHang = grid_dotthucte[j].SoLuong;
        var p_GhiChuTT = grid_dotthucte[j].GhiChuTT;
      //  alert(p_SoLuongGiaoHang +" - "+_ID_ChiTietCK );
        if (p_SoLuongGiaoHang == 0) {
            alert("Chưa nhập số lượng!");
            check = 1;
            break;
        }
        else {

            $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                data: {
                    cmd: 'Luu_CapNhatThucTe',
                    p_ID_ChiTietCK :_ID_ChiTietCK,
                    p_PO_NhaThau_ChiTiet_ID: _PO_NhaThau_ChiTiet_ID,
                    p_soluong: p_SoLuongGiaoHang,
                    p_ngaythucte: $("#txt_ngaygiaohang").val(),
                    p_ghichu: p_GhiChuTT

                },
                dataType: 'json'
            });
        }

    }
    if (check == 0) {
        alert("Đã cập nhật Thực tế Giao hàng thành công!");
        $("#wd_CapNhatThucTe").data("kendoWindow").close();

        // BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
        //DS_VatTu_DaChon.read();
    }
}


function func_Ham_Luu_CapNhatThucTe_TT_KoKH() {
    var check = 0;


    var grid_dotthucte = $("#grid_chon_thucte_koKH").data("kendoGrid").dataSource.data();

    var check = 0;

    for (var j = 0; j < grid_dotthucte.length; j++) {

     //   var _ID_ChiTietCK = grid_dotthucte[j].ID_ChiTietCK;
        var _PO_NhaThau_ChiTiet_ID = grid_dotthucte[j].PO_NhaThau_ChiTiet_ID;

        var p_SoLuongGiaoHang = grid_dotthucte[j].SoLuongGiaoHang;
        var p_GhiChuTT = grid_dotthucte[j].GhiChuTT;
        //alert(p_SoLuongGiaoHang + " - " + " - " + _PO_NhaThau_ChiTiet_ID);
        if (p_SoLuongGiaoHang == 0) {
            alert("Chưa nhập số lượng!");
            check = 1;
            break;
        }
        else {

            $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                data: {
                    cmd: 'Luu_CapNhatThucTe',
                    p_ID_ChiTietCK: 0,
                    p_PO_NhaThau_ChiTiet_ID: _PO_NhaThau_ChiTiet_ID,
                    p_soluong: p_SoLuongGiaoHang,
                    p_ngaythucte: $("#txt_ngaygiaohang_koKH").val(),
                    p_ghichu: p_GhiChuTT

                },
                dataType: 'json'
            });
        }

    }
    if (check == 0) {
        alert("Đã cập nhật Thực tế Giao hàng thành công!");
        $("#wd_CapNhatThucTe_KoKH").data("kendoWindow").close();

        // BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
        //DS_VatTu_DaChon.read();
    }
}
function func_Ham_XoaCapNhat_ThucTe(ID) {
    if (confirm("Bạn có chắc chắn muốn xóa dòng dữ liệu này không?")) {
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
            data: {
                cmd: 'Xoa_CapNhatThucTe',
                p_ID: ID

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa giao hàng thực tế!");
                DS_TienDo_ThucTe.read();
               // $("#wd_CapNhatThucTe").data("kendoWindow").close();
            }
            else {
                alert(msg[0].ErrorMessage);
            }
        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + textStatus);
        });
    }
}
//#endregion