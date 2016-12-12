var DSDonVi, DSPO_TheoTinh, DS_LoaiVT, DS_VatTu;
var detail_DonVi_ID, po_id_con, loai_vattu_id, po_con_id_chitiet;
var DS_PO_Con_CT, DS_PO_Con_CT_GiaoHang, DS_VatTu_GiaoHang, DS_Loai_VT_GiaoHang;
var detail_PO_Con_e, GiaoHang_ID_Sua;
$(document).ready(function () {

    document.oncontextmenu = function () { return false; }

    //$('#daterange').daterangepicker();

    //$('#txt_maHD').prop('disabled', true);

    //////// DataSource\\\\\\\\\\\\
    //DS_VatTu = new kendo.data.DataSource({
    //    transport: {
    //        read: function (options) {
    //            $.ajax({
    //                type: "POST",
    //                url: "assets/ajax/Ajax_DanhMuc.aspx",
    //                data: {
    //                    cmd: 'DS_VatTu'
    //                },
    //                dataType: 'json',
    //                success: function (result) {
    //                    if (result == "err401") {
    //                        alert("session timeout");
    //                        window.location.href = "index.aspx";
    //                    }
    //                    else {
    //                        options.success(result);
    //                    }
    //                }
    //            });
    //        }
    //    }

    //});
    DS_DonVi = new kendo.data.DataSource({
        sort: { field: "ID", dir: "asc" },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_DonVi'
                       // PO_ID: detail_PO_Con_e.data.PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    $("#cmb_DonVi").kendoDropDownList({
        optionLabel: "--Chọn Đơn vị--",
        dataTextField: "TenDonVi",
        dataValueField: "ID",
        dataSource: DS_DonVi

    });

    $("#wd_GIAOHANG").kendoWindow({
        draggable: true,
        height: "70%",
        width: "80%",
        modal: false,
        resizable: false,
        title: "CẬP NHẬT GIAO HÀNG",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");

    //$("#wd_NHAN_HANG").kendoWindow({
    //    draggable: true,
    //    height: "70%",
    //    width: "80%",
    //    modal: false,
    //    resizable: false,
    //    title: "CẬP NHẬT NHẬN HÀNG",
    //    visible: false,
    //    actions: ["Close"]

    //}).data("kendoWindow"); /// đóng cái này lại để làm cái khóa k cho update - phân nay mở poup cập nhật ngày nhận hàng
    ///////////////// Popup Thêm vật tư GIAO HÀNG\\\\\\\\\\\\\\\\
    $("#wd_them_chitiet_giaohang").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "THÊM VẬT TƯ GIAO HÀNG",
        visible: false,
        actions: false

    }).data("kendoWindow");
      

    $("#txt_NgayGiao").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayGiao_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayNhan_sua").kendoDatePicker({
        format: "dd/MM/yyyy"

    });
    ////$('#txt_maHD').prop('disabled', true);
    $(".k-input").prop('disabled', true);

    $("#txt_SoLuongGiao").kendoNumericTextBox({
        format: "#.##",
        min: "0"
    });
    $("#txt_SoLuongNhan_sua").kendoNumericTextBox({
        format: "#.##",
        min: "0"
    });

    ///////////////// Popup Sửa vật tư GIAO HANG \\\\\\\\\\\\\\\\
    $("#wd_sua_chitiet_giaohang").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "CẬP NHẬT VẬT TƯ NHẬN HÀNG",
        visible: false,
        actions: false

    }).data("kendoWindow");   
   
    $("#txt_SoLuongGiao_sua").kendoNumericTextBox({
        format: "#.##",
        min: "0"
    });

    $("#cmb_VatTu_sua").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu

    }); 

    ///////////////// Popup Sửa vật tư NHẬN HÀNG \\\\\\\\\\\\\\\\
    $("#wd_sua_chitiet_nhanhang").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "SỬA VẬT TƯ GIAO HÀNG",
        visible: false,
        actions: false

    }).data("kendoWindow");
   
   
    $("#cmb_VatTu_nhanhang_sua").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu

    });
});


function detail_PO_Con(e) {

    detail_PO_Con_e = e;

    e.detailCell.empty();
    var DS_PO_Con_CT = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_CT.aspx",
                    data: {
                        cmd: 'PO_CT_SelectByPO_ID_Con',
                        PO_ID_Con: detail_PO_Con_e.data.PO_ID_Con
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            },
            update: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TienDo.aspx",
                    data: {
                        cmd: 'Upadte_NgayCamKetGiaoHang',
                        gData: JSON.stringify(options.data.models)
                        //p_ID: po_id_con,
                        // p_NgayGiao: $("#txt_NgayGiao").val()
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "Success") {
                            alert("Cập nhật thành công");
                            dataSource.read();
                        }
                    }
                });
            },

        },
        batch: true,
        schema: {
            model: {
                id: "ID",
                fields: {
                    MaVatTu_TD: { editable: false },
                    VatTu_Ten: { editable: false }, //, type: "string",  alidation: { required: true, required: { message: "Chưa nhập tên Loại VT!" }
                    SoLuong: { editable: false },
                    DonGia: { editable: false },
                    TenDVT: { editable: false },
                    VAT: { editable: false },
                    ThanhTien: { editable: false },
                    NgayGH_CamKet: { editable: true , type:"date", format: "dd/MM/yyyy"},
                }
            }
        }
    });

    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: DS_PO_Con_CT,
        //  toolbar: kendo.template($("#Templ_PO_Con").html()),
        columns:
           [{
               title: "Mã VT",
               headerAttributes: {
                   class: "header_css"
               },
               field: "MaVatTu_TD",
               attributes: {
                   class: "row_css"
               }, width: "120px"
           },
           {
               title: "Vật tư",
               headerAttributes: {
                   class: "header_css"
               },
               field: "VatTu_Ten",
               attributes: {
                   class: "row_css"
               }, width: "170px"
           },
           {
               title: "Số lượng",
               headerAttributes: {
                   class: "header_css"
               },
               field: "SoLuong",
               attributes: {
                   class: "row_css"
               }, width: "100px"
           },
           //{
           //    title: "Đơn giá",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "DonGia",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},
           {
               title: "Đơn vị tính",
               headerAttributes: {
                   class: "header_css"
               },
               field: "TenDVT",
               attributes: {
                   class: "row_css"
               }, width: "120px"
           },
           //{
           //    title: "Thành tiền",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "ThanhTien",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},
           //{
           //    title: "VAT",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "VAT",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},
           
           {
               title: "Ngày CK GH",
               headerAttributes: {
                   class: "header_css"
               },
               field: "NgayGH_CamKet",
               attributes: {
                   class: "row_css",
                   style: "color:red;"
                 
               },
               format: "{0:dd/MM/yyyy}", width: "120px",
              
           }
           , { command: ["edit"], title: "&nbsp;", width: "170px" }
           ]
        , editable: "inline"
          
    });
}
function Ham_Tim_PO_TheoTinh() {   
    var donvi_id = $("#cmb_DonVi").data("kendoDropDownList").value();

  //  alert(donvi_id);
    DSPO_TheoTinh = new kendo.data.DataSource({
       // sort: { field: "ID", dir: "asc" },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TienDo.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_TheoTinh',
                        p_DonVi_ID: donvi_id,
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
        
    ////////////////////////////
        
    $("#grid_PO_Tinh").empty();
    var grid = $("#grid_PO_Tinh").kendoGrid({
        dataSource: DSPO_TheoTinh,
        pageable: true,
        sortable: true,
        pageSizes: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            },
        },
        detailInit: detail_PO_Con,
        selectable: "multiple row",
        toolbar: kendo.template($("#Templ_PO").html()),
        
        columns:
            [
                 {
                     hidden: true,
                     field: "PO_ID"
                 },
                 {
                     hidden: true,
                     field: "PO_ID_Con"
                 },
                  {
                      hidden: true,
                      field: "TinhTrangTong"
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
                     title: "Số HĐ",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "MaHD",
                     attributes: {
                         class: "row_css"
                     }
                 },
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
                     title: "Tên Dự Án",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TenDuAn",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày Hoàn Tất",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayHoanTat",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "VB gửi ĐVị",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB_DenDV",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày gửi VB đến ĐVị",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayGuiVBDenDV",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "VB ĐVị xác nhận",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB_XacNhan",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày ĐVị xác nhận",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayVB_XacNhan",
                     attributes: {
                         class: "row_css"
                     }
                 } ,
                 {
                     title: "Tình trạng",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TinhTrang",
                     attributes: {
                         class: "row_css"
                     }
                 },
                    {
                        template: kendo.template($("#template_Khoa").html()),
                        //template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_GiaoHang(#= PO_ID #);">Giao Hàng</a></center>',
                        width: "6%"
                    }

            ]
     
    });
    //$("#txt_search_sohd").kendoAutoComplete({
    //    dataTextField: "MaHD",
    //    dataSource: DS_HopDong,
    //    select: function (e) {

    //        var dataItem = this.dataItem(e.item.index());
    //        var value = dataItem.MaHD;

    //        if (value) {

    //            grid.data("kendoGrid").dataSource.filter({ field: "MaHD", operator: "eq", value: value });
    //        }
    //        else {
    //            grid.data("kendoGrid").dataSource.filter({});
    //        }
    //    },
    //    change: function () {

    //        $("#txt_search_sohd").val('');
    //    }

    //});
    //$("#btn_clear_sohd").click(function (e) {
    //    e.preventDefault();
    //    $("#txt_search_sohd").val('');
    //    grid.data("kendoGrid").dataSource.filter({});
    //});
}

///////////////////////////////////////////////////////////FORM GIAO HANG \\\\\\\\\\\\\\\\\\\\\\\\\\\\

function func_GiaoHang() {

    $("#wd_GIAOHANG").data("kendoWindow").center().open();

    var grid = $("#grid_PO_Tinh").data("kendoGrid");
   // alert(grid.dataSource.PO_ID_Con.val())
   var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    po_id_con = selectedTopic.PO_ID_Con;
  
    if (selectedTopic == undefined) {
        alert("Chưa chọn PO!");
        return;
    }
    else {
        // $("#txt_maHD").val(selectedTopic.MaHD);
        //  $("#txt_hopdongID").val(selectedTopic.HopDong_ID);
        po_id_con = selectedTopic.PO_ID_Con;
        DS_PO_Con_CT_GiaoHang = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_TienDo.aspx",
                        data: {
                            cmd: 'Lay_DS_VT_GiaoHang_SelectBy_PO_ID_Con',
                            p_PO_ID_Con: po_id_con,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=TienDo.aspx";
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
        $("#grid_vattu_giaohang").empty();
        var grid = $("#grid_vattu_giaohang").kendoGrid({
            dataSource: DS_PO_Con_CT_GiaoHang,
            toolbar: kendo.template($("#Templ_ThemGiaoHang").html()),
            // detailTemplate: kendo.template($("#Templ_ChiTiet_phuluc_HopDong").html()),
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            detailExpand: function (e) {
                this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
            },
            // detailInit: detailInit,
            columns:
               [
                   {
                       title: "Mã VT",
                       headerAttributes: {
                           class: "header_css"
                       },
                       field: "MaVatTu_TD",
                       attributes: {
                           class: "row_css"
                       }
                   },
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
                   title: "Số lượng Giao",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "SoLuongGiao",
                   attributes: {
                       class: "row_css"
                   }
               },  
               {
                   title: "Ngày Nhà thầu Giao",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "NgayGiaoHang_NT",
                   attributes: {
                       class: "row_css"
                   }
               },
               {
                   title: "Ghi Chú",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "GhiChu",
                   attributes: {
                       class: "row_css"
                   }
               },
               {
                   template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="Ham_Sua_GiaoHang(#= GiaoHang_ID #);"><span class="k-icon k-i-pencil"></span></a></center>',
                   width: "6%"
                  
                  
               },
               {
                   template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="Ham_Xoa_GiaoHang(#= GiaoHang_ID #);"><span class="k-icon k-i-close"></span></a></center>',
                   width: "6%"
               }
               ]
        });
    }
}

function Ham_Dong_GiaoHang() {
    $("#wd_GIAOHANG").data("kendoWindow").close();
}

////////////////////////////////////////// CAP NHAT GIAO HANG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function Ham_Them_GiaoHang() {
    $("#wd_them_chitiet_giaohang").data("kendoWindow").center().open();

    DS_Loai_VT_GiaoHang = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TienDo.aspx",
                    data: {
                        cmd: 'DS_Loai_VT_GiaoHang',
                        p_PO_ID_Con: po_id_con
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    
    DS_VatTu_GiaoHang = new kendo.data.DataSource({
       // group: { field: "LoaiVT_ID" },
        transport: {

            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TienDo.aspx",
                    data: {
                        cmd: 'DS_VatTu_GiaoHang',
                        p_PO_ID_Con: po_id_con
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    $("#cmb_LoaiVatTu").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
        dataSource: DS_Loai_VT_GiaoHang
    });

    $("#cmb_VatTu").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        cascadeFrom: "cmb_LoaiVatTu",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu_GiaoHang       
    });
    $(".k-widget.k-dropdown.k-header").attr("style", "display:inline-block;");
}

function Ham_Dong_Them_GiaoHang() {
    $("#wd_them_chitiet_giaohang").data("kendoWindow").close();
}
function Ham_Luu_GiaoHang() {
    var check = 0;
   
    if ($("#cmb_LoaiVatTu").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại vật tư!");
        return;
    }
    if ($("#cmb_VatTu").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn vật tư!");
        return;
    }
    if ($("#txt_SoLuongGiao").val() == "" || $("#txt_SoLuongGiao").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if ($("#txt_NgayGiao").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kí hợp đồng!");
        return;
    }
    if (check == 0) {
        var SoLuong = parseInt($("#txt_SoLuongGiao").val());

        var PO_ID_Con = po_con_id_chitiet;
       
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_TienDo.aspx",
            data: {
                cmd: 'Luu_GiaoHang',
                p_PO_ID_Con: po_id_con,
                p_VatTu_ID: $("#cmb_VatTu").data("kendoDropDownList").value(),
                p_SoLuongGiao: $("#txt_SoLuongGiao").val(),
                p_NgayGiao: $("#txt_NgayGiao").val(),

                p_GhiChu: $("#txt_GhiChu").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã thêm vật tư thành công!");
                $("#wd_them_chitiet_giaohang").data("kendoWindow").close();
                DS_PO_Con_CT_GiaoHang.read();
                Ham_Clear_Form_VatTu_GiaoHang();
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
function Ham_Clear_Form_VatTu_GiaoHang() {

    $("#cmb_VatTu").data("kendoDropDownList").select(0);
    $("#txt_SoLuongGiao").data("kendoNumericTextBox").value("");
    $("#txt_NgayGiao").val("");
    $("#txt_GhiChu").val("");
}


////////////////////////////////////////// CHINH SUA GIAO HANG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function Ham_Sua_GiaoHang(GiaoHang_ID){ //, SoLuongGiao, NgayGiaoHang_NT, VatTu_ID, GhiChu) {
    $("#wd_sua_chitiet_giaohang").data("kendoWindow").center().open();
    GiaoHang_ID_Sua = GiaoHang_ID;

   var grid_data = $("#grid_vattu_giaohang").data("kendoGrid"),
           data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.GiaoHang_ID == GiaoHang_ID;
    });
        $("#cmb_VatTu_sua").data("kendoDropDownList").value(res[0].VatTu_ID);
        $('#cmb_VatTu_sua').data("kendoDropDownList").enable(false); 

        $("#txt_SoLuongGiao_sua").data("kendoNumericTextBox").value(res[0].SoLuongGiao);
        $("#txt_GhiChu_sua").val(res[0].GhiChu);
        $("#txt_NgayGiao_sua").val(res[0].NgayGiaoHang_NT);
}
function Ham_Luu_Sua_GiaoHang() {

    var check = 0;
   
    if ($("#txt_SoLuongGiao_sua").val() == "" || $("#txt_SoLuongGiao_sua").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng giao!");
        return;
    }
    if ($("#txt_NgayGiao_sua").val() == "") {
        check = 1;
        alert("Chưa chọn ngày giao hàng !");
        return;
    }
    if (check == 0) {
        var GiaoHang_ID = GiaoHang_ID_Sua;
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_TienDo.aspx",
            data: {
                cmd: 'Sua_GiaoHang',
                p_PO_ID_Con: po_id_con,
                p_GiaoHang_ID: GiaoHang_ID,
               
                p_VatTu_ID: $("#cmb_VatTu_sua").data("kendoDropDownList").value(),
                p_SoLuongGiao: $("#txt_SoLuongGiao_sua").val(),
                p_NgayGiao: $("#txt_NgayGiao_sua").val(),

                p_GhiChu: $("#txt_GhiChu_sua").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa vật tư thành công!");
                $("#wd_sua_chitiet_giaohang").data("kendoWindow").close();
                DS_PO_Con_CT_GiaoHang.read();
                Ham_Clear_Form_Sua_VatTu_GiaoHang();
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
function Ham_Dong_Sua_GiaoHang() {

    $("#wd_sua_chitiet_giaohang").data("kendoWindow").close();
}

function Ham_Clear_Form_Sua_VatTu_GiaoHang() {

    $("#cmb_VatTu_sua").data("kendoDropDownList").select(0);
    $("#txt_SoLuongGiao_sua").data("kendoNumericTextBox").value("");
    $("#txt_NgayGiao_sua").val("");
    $("#txt_GhiChu_sua").val("");
}

//////////////////////XOA HOP DONG \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function Ham_Xoa_GiaoHang(GiaoHang_ID) {

    if (confirm("Bạn có chắc chắn muốn xóa vật tư này không?")) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_TienDo.aspx",
            data: {

                cmd: 'Xoa_GiaoHang',
                p_GiaoHang_ID: GiaoHang_ID,

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa vật tư thành công!");
                DS_PO_Con_CT_GiaoHang.read();
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

/////////////////////////////////////////////////////////////////////////////////////                         TIEN DO NHAN HANG

function detail_PO_Con_NHANHANG(e) {

    detail_PO_Con_e = e;

    e.detailCell.empty();
    var DS_PO_Con_CT_NHANHANG = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_CT.aspx",
                    data: {
                        cmd: 'PO_CT_SelectByPO_ID_Con',
                        PO_ID_Con: detail_PO_Con_e.data.PO_ID_Con
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: DS_PO_Con_CT_NHANHANG,
        //  toolbar: kendo.template($("#Templ_PO_Con").html()),
        columns:
           [{
               title: "Mã VT",
               headerAttributes: {
                   class: "header_css"
               },
               field: "MaVatTu_TD",
               attributes: {
                   class: "row_css"
               }, width: "120px"
           },
           {
               title: "Vật tư",
               headerAttributes: {
                   class: "header_css"
               },
               field: "VatTu_Ten",
               attributes: {
                   class: "row_css"
               }, width: "170px"
           },
           {
               title: "Số lượng",
               headerAttributes: {
                   class: "header_css"
               },
               field: "SoLuong",
               attributes: {
                   class: "row_css"
               }, width: "100px"
           },
           //{
           //    title: "Đơn giá",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "DonGia",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},
           {
               title: "Đơn vị tính",
               headerAttributes: {
                   class: "header_css"
               },
               field: "TenDVT",
               attributes: {
                   class: "row_css"
               }, width: "120px"
           },
           //{
           //    title: "Thành tiền",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "ThanhTien",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},
           //{
           //    title: "VAT",
           //    headerAttributes: {
           //        class: "header_css"
           //    },
           //    field: "VAT",
           //    attributes: {
           //        class: "row_css"
           //    }
           //},

           {
               title: "Ngày CK GH",
               headerAttributes: {
                   class: "header_css"
               },
               field: "NgayGH_CamKet",
               attributes: {
                   class: "row_css",
                   style: "color:red;"

               }
               //,format: "{0:dd/MM/yyyy}", width: "120px",

           }
          // , { command: ["edit"], title: "&nbsp;", width: "170px" }

           ]
        // , editable: "inline"

    });
}


function Ham_Tim_PO_TheoTinh_NhanHang() {
    var donvi_id = $("#cmb_DonVi").data("kendoDropDownList").value();

    //  alert(donvi_id);
    DSPO_TheoTinh_NhanHang = new kendo.data.DataSource({
        // sort: { field: "ID", dir: "asc" },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TienDo.aspx",
                    data: {
                        cmd: 'Lay_DS_PO_TheoTinh_NhanHang',
                        p_DonVi_ID: donvi_id
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=TienDo.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    ////////////////////////////

    $("#grid_PO_Tinh_NhanHang").empty();
    var grid = $("#grid_PO_Tinh_NhanHang").kendoGrid({
        dataSource: DSPO_TheoTinh_NhanHang,
        pageable: true,
        sortable: true,
        pageSizes: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            },
        },
        detailInit: detail_PO_Con_NHANHANG,
        selectable: "multiple row",
        toolbar: kendo.template($("#Templ_PO").html()),
        columns:
            [
                 {
                     hidden: true,
                     field: "PO_ID"
                 },
                 {
                     hidden: true,
                     field: "PO_ID_Con"
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
                     title: "Số HĐ",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "MaHD",
                     attributes: {
                         class: "row_css"
                     }
                 },
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
                     title: "Tên Dự Án",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TenDuAn",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày Hoàn Tất",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayHoanTat",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "VB gửi ĐVị",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB_DenDV",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày gửi VB đến ĐVị",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayGuiVBDenDV",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "VB ĐVị xác nhận",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "SoVB_XacNhan",
                     attributes: {
                         class: "row_css"
                     }
                 },
                 {
                     title: "Ngày ĐVị xác nhận",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "NgayVB_XacNhan",
                     attributes: {
                         class: "row_css"
                     }
                 } ,
                 {
                     title: "Tình trạng",
                     headerAttributes: {
                         class: "header_css"
                     },
                     field: "TinhTrangTong",
                     attributes: {
                         class: "row_css"
                     }
                 },
                    {
                        template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_NhanHang(#= PO_ID #);">Khóa/Mở</a></center>'
                       // , width: "4%"
                    }

            ]
    });
    //$("#txt_search_sohd").kendoAutoComplete({
    //    dataTextField: "MaHD",
    //    dataSource: DS_HopDong,
    //    select: function (e) {

    //        var dataItem = this.dataItem(e.item.index());
    //        var value = dataItem.MaHD;

    //        if (value) {

    //            grid.data("kendoGrid").dataSource.filter({ field: "MaHD", operator: "eq", value: value });
    //        }
    //        else {
    //            grid.data("kendoGrid").dataSource.filter({});
    //        }
    //    },
    //    change: function () {

    //        $("#txt_search_sohd").val('');
    //    }

    //});
    //$("#btn_clear_sohd").click(function (e) {
    //    e.preventDefault();
    //    $("#txt_search_sohd").val('');
    //    grid.data("kendoGrid").dataSource.filter({});
    //});
}
///////////////////////////////////////////////////////////FORM NHAN HANG \\\\\\\\\\\\\\\\\\\\\\\\\\\\

function func_NhanHang() {
    ////// chức năng khóa k cho update
    var grid = $("#grid_PO_Tinh_NhanHang").data("kendoGrid");
    var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    po_id_con = selectedTopic.PO_ID_Con;
    var check = 0;

    if (check == 0) {
        // var GiaoHang_ID = GiaoHang_ID_Sua;

        // var soluongnhan = parseInt($("#txt_SoLuongNhan_sua").val());

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_TienDo.aspx",
            data: {
                cmd: 'Sua_NhanHang_Khoa',
                p_PO_ID_Con: po_id_con

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Cập nhật Khóa hoặc Mở khóa thành công!");
                $("#wd_sua_chitiet_nhanhang").data("kendoWindow").close();
                DSPO_TheoTinh_NhanHang.read();
                Ham_Clear_Form_Sua_VatTu_NhanHang();
            }
            else {
                alert(msg[0].ErrorMessage);
            }

        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + textStatus);
        });
    }



    ////////////// phần này là mở poup câp nhật ngày nhận hàng
    // $("#wd_NHAN_HANG").data("kendoWindow").center().open();

    //var grid = $("#grid_PO_Tinh_NhanHang").data("kendoGrid");
    //var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    //if (selectedTopic == undefined) {
    //    alert("Chưa chọn PO!");
    //    return;
    //}
    //else {
    //    // $("#txt_maHD").val(selectedTopic.MaHD);
    //    //  $("#txt_hopdongID").val(selectedTopic.HopDong_ID);
    //    po_id_con = selectedTopic.PO_ID_Con;
    //    po_con_id_chitiet
    //    // loai_vattu_id = selectedTopic.l;
    //    DS_PO_Con_CT_NhanHang = new kendo.data.DataSource({
    //        transport: {
    //            read: function (options) {
    //                $.ajax({
    //                    type: "POST",
    //                    url: "assets/ajax/Ajax_TienDo.aspx",
    //                    data: {
    //                        cmd: 'Lay_DS_VT_GiaoHang_SelectBy_PO_ID_Con',
    //                        p_PO_ID_Con: po_id_con,
    //                    },
    //                    dataType: 'json',
    //                    success: function (result) {
    //                        if (result == "err401") {
    //                            alert("session timeout");
    //                            window.location.href = "index.aspx";
    //                        }
    //                        else {
    //                            options.success(
    //                               // alert($("#txt_hopdongID").val()),
    //                                result
    //                            );
    //                        }
    //                    }
    //                });
    //            },
    //            parameterMap: function (options, operation) {
    //                if (operation !== "read" && options.models) {
    //                    return { models: kendo.stringify(options.models) };
    //                }
    //            }
    //        }

    //    });
    //    $("#grid_vattu_nhanhang").empty();
    //    var grid = $("#grid_vattu_nhanhang").kendoGrid({
    //        dataSource: DS_PO_Con_CT_NhanHang,
    //       // toolbar: kendo.template($("#Templ_ThemGiaoHang").html()),
    //        // detailTemplate: kendo.template($("#Templ_ChiTiet_phuluc_HopDong").html()),
    //        dataBound: function () {
    //            this.expandRow(this.tbody.find("tr.k-master-row").first());
    //        },
    //        detailExpand: function (e) {
    //            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
    //        },
    //        // detailInit: detailInit,
    //        columns:
    //           [
    //               {
    //                   title: "Mã VT",
    //                   headerAttributes: {
    //                       class: "header_css"
    //                   },
    //                   field: "MaVatTu_TD",
    //                   attributes: {
    //                       class: "row_css"
    //                   }
    //               },
    //           {
    //               title: "Vật tư",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "VatTu_Ten",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Đơn vị tính",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "TenDVT",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Số lượng Giao",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "SoLuongGiao",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Số lượng Nhận",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "SoLuongNhan",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //            {
    //                title: "Số lượng Thiếu",
    //                headerAttributes: {
    //                    class: "header_css"
    //                },
    //                field: "SoLuongThieu",
    //                attributes: {
    //                    class: "row_css"
    //                }
    //            },
    //           {
    //               title: "Ngày Nhà thầu Giao",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "NgayGiaoHang_NT",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Ngày NHẬN",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "NgayNhanHang_DV",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Ghi Chú Giao",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "GhiChu",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               title: "Ghi Chú Nhận",
    //               headerAttributes: {
    //                   class: "header_css"
    //               },
    //               field: "GhiChuNhan",
    //               attributes: {
    //                   class: "row_css"
    //               }
    //           },
    //           {
    //               template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="Ham_Sua_NhanHang(#= GiaoHang_ID #);"><span class="k-icon k-i-pencil"></span></a></center>',
    //               width: "6%"
    //           }
    //           ]
    //    });
    //}



    function Ham_Dong_NhanHang() {
        $("#wd_NHAN_HANG").data("kendoWindow").close();
    }
    var soluonggiao;
    function Ham_Sua_NhanHang(GiaoHang_ID) { //, SoLuongGiao, NgayGiaoHang_NT, VatTu_ID, GhiChu) {
        $("#wd_sua_chitiet_nhanhang").data("kendoWindow").center().open();
        GiaoHang_ID_Sua = GiaoHang_ID;

        var grid_data = $("#grid_vattu_nhanhang").data("kendoGrid"),
               data = grid_data.dataSource.data();

        var res = $.grep(data, function (d) {
            return d.GiaoHang_ID == GiaoHang_ID;
        });
        $("#cmb_VatTu_nhanhang_sua").data("kendoDropDownList").value(res[0].VatTu_ID);
        $('#cmb_VatTu_nhanhang_sua').data("kendoDropDownList").enable(false);

        $("#txt_SoLuongNhan_sua").data("kendoNumericTextBox").value(res[0].SoLuongNhan);
        $("#txt_GhiChuNhan_sua").val(res[0].GhiChuNhan);
        $("#txt_NgayNhan_sua").val(res[0].NgayGiaoHang_NT);
        soluonggiao = res[0].SoLuongGiao;


    }

    function Ham_Luu_Sua_NhanHang() {

        var check = 0;

        if ($("#txt_SoLuongNhan_sua").val() == "" || $("#txt_SoLuongNhan_sua").val() == "0") {
            check = 1;
            alert("Chưa nhập số lượng nhận!");
            return;
        }
        if ($("#txt_NgayNhan_sua").val() == "") {
            check = 1;
            alert("Chưa chọn ngày nhận hàng !");
            return;
        }
        if (check == 0) {
            var GiaoHang_ID = GiaoHang_ID_Sua;

            var soluongnhan = parseInt($("#txt_SoLuongNhan_sua").val());
            var soluong_giao = parseInt(soluonggiao);

            var soluongthieu = soluong_giao - soluongnhan;

            var request = $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_TienDo.aspx",
                data: {
                    cmd: 'Sua_NhanHang',
                    p_PO_ID_Con: po_id_con,
                    p_GiaoHang_ID: GiaoHang_ID,

                    p_VatTu_ID: $("#cmb_VatTu_nhanhang_sua").data("kendoDropDownList").value(),
                    p_SoLuongNhan: $("#txt_SoLuongNhan_sua").val(),
                    p_SoLuongThieu: soluongthieu,
                    p_NgayNhan: $("#txt_NgayNhan_sua").val(),

                    p_GhiChuNhan: $("#txt_GhiChuNhan_sua").val()
                },
                dataType: 'json'
            });
            request.done(function (msg) {

                if (msg[0].ErrorMessage == null) {
                    alert("Đã nhận hàng thành công!");
                    $("#wd_sua_chitiet_nhanhang").data("kendoWindow").close();
                    DS_PO_Con_CT_NhanHang.read();
                    Ham_Clear_Form_Sua_VatTu_NhanHang();
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
    function Ham_Dong_Sua_NhanHang() {

        $("#wd_sua_chitiet_nhanhang").data("kendoWindow").close();
    }

    function Ham_Clear_Form_Sua_VatTu_NhanHang() {

        $("#cmb_VatTu_nhanhang_sua").data("kendoDropDownList").select(0);
        $("#txt_SoLuongNhan_sua").data("kendoNumericTextBox").value("");
        $("#txt_NgayNhan_sua").val("");
        $("#txt_GhiChuNhan_sua").val("");
    }

}
