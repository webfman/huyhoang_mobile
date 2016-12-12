

$(document).ready(function () {
document.oncontextmenu = function () { return false; }
        $("#wd_Show_Export").kendoWindow({
            draggable: false,
            height: "auto",
            width: "90%",
            actions: ["Close"],
            modal: true,
            resizable: false,
            title: "Xuất Excel",
            visible: false,

        }).data("kendoWindow");

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
                                alert("session timeout");
                                window.location.href = "index.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        });

        $("#cmb_NhaThau").kendoDropDownList({
            autoBind: true,
            optionLabel: "--Chọn nhà thầu--",
            dataTextField: "TenNhaThau",
            dataValueField: "NhaThau_ID",
            dataSource: DS_NhaThau

        });
        //var radio_value;
        //$('[id*="btn_excel"]').on('click', function () {
        //    if (document.getElementById('rad_sopo').checked) {
        //        radio_value = document.getElementById('rad_sopo').value;
        //        $('[id*="HiddenField"]').val(radio_value);
        //        $('[id*="Hidden_NoiDung"]').val($("#txt_noidung").val());
              
        //    }
        //    else {
        //        radio_value = document.getElementById('rad_sovb').value;
        //        $('[id*="HiddenField"]').val(radio_value);
        //        $('[id*="Hidden_NoiDung"]').val($("#txt_noidung").val());
        //      //  h_noidung = $("#txt_noidung").val()
        //      //  alert(h_noidung);
        //    }
        //}); 
});

    function Ham_HienThi_DonVi(value) {
        if (value != "") {
            return "<b> \ " + value + "\</b>   <input type='button' class='btn btn-primary' value='Xuất Excel Theo Đơn Vị' OnClick='Ham_Show_Export(\"" + value + "\")'/>"
        }
        else {
            return value;
        }
    }
    function Ham_HienThi_NhaThau(value) {
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
    
    function Ham_Show_Export(value) {
        
        $("#wd_Show_Export").data("kendoWindow").center().open();
      //  var noidung = $("#txt_noidung").val();
        
        //var rate_value;
        //if (document.getElementById('rad_sopo').checked) {
        //    rate_value = document.getElementById('rad_sopo').value;
        //}
        //else {
        //    rate_value = document.getElementById('rad_sovb').value;
        //}
      
        DS_ThongKe_TheoDonVi = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongKe.aspx",
                        data: {
                            cmd: 'DS_TK_TheoDonVi',
                            p_po_nhathau_id: pp_PO_NhaThau_ID,
                            p_donvi_id: value

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("session timeout");
                                window.location.href = "index.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            group: [
              { field: "TenDonVi" },
              { field: "Dot_CamKet" }// { field: "TenNhaThau" },

            ]

        });
        $("#grid_excel_donvi").empty();
        $("#grid_excel_donvi").kendoGrid({
             toolbar: ["excel"],
            excel: {
                fileName: "tk_tiendo_nhathau.xlsx",
               // allPages: true,
                filterable: true
            },
            resizable: true,
          
            dataSource: DS_ThongKe_TheoDonVi,            
            pageable: {
                messages: {
                    display: " ",
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
                             }, hidden: true,
                         },
                         {
                               title: "Đơn vị",
                         //    groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",

                             headerAttributes: {
                                 class: "header_css"
                             },
                             field: "TenDonVi",
                             attributes: {
                                 class: "row_css"
                             }
                           , hidden: true,

                         },
                          //{
                          //    title: "Số PO",
                          //    headerAttributes: {
                          //        class: "header_css"
                          //    },
                          //    field: "SoPO",
                          //    attributes: {
                          //        class: "row_css"
                          //    }, width: "20%"
                          //},
                        {
                            title: "Tên vật tư",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "TenVT",
                            attributes: {
                                class: "row_css"
                            }, width: "20%"
                        },
                        {
                            title: "Đơn vị tính",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "DonViTinh",
                            attributes: {
                                class: "row_css"
                            }, width: "10%"
                        },
                        {
                            title: "Số lượng đăt",
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
                             title: "Tổng SL CK",
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
                               title: "SL Còn TT",
                               headerAttributes: {
                                   class: "header_css"
                               },
                               field: "TongSoLuongConLaiTT",
                               attributes: {
                                   class: "row_css",
                                   style: "font-weight:bold;color:green;"
                               }, width: "10%"
                           },
                            {
                                title: "SL Giao KoKH",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "TongSLGiaoKoKH",
                                attributes: {
                                    class: "row_css"
                                },// width: "10%"
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
                           }

                    ]
        });
    }
   
function Ham_Dong_XuatExcel_DonVi() {
        $("#wd_Show_Export").data("kendoWindow").center().close();
    }

    var DS_TienDo_ThucTe;
    var pp_PO_NhaThau_ID;
function Ham_ThongKe() {
  //  var noidung = $("#txt_noidung").val();
    var rate_value;
    //if (document.getElementById('rad_sopo').checked) {
    //    rate_value = document.getElementById('rad_sopo').value;
     
    //}
    //else {
    //    rate_value = document.getElementById('rad_sovb').value;
    //}
    DS_ThongKe = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_QuanLyTienDo.aspx",
                    data: {
                      //  cmd: 'DS_TK_TienDo',
                        cmd: 'DS_PO_TheoNhaThau_ID',
                        p_nhathau: $("#cmb_NhaThau").data("kendoDropDownList").value()
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("session timeout");
                            window.location.href = "index.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        //group: [
        //  { field: "TenNhaThau" }, { field: "TenDonVi" }
        //    , { field: "DotCamKet" }, { field: "TenVT" }
        //]
        //, aggregate: [
        //        { field: "SoLuongThucTe", aggregate: "sum" }
        //]
    });
  
    $("#grid_thongke_tiendo").empty();
    $("#grid_thongke_tiendo").kendoGrid({
        //toolbar: ["excel"],
        excel: {
            fileName: "tk_tiendo_tonghop.xlsx",
            //    allPages: true,
             filterable: true
        },
       
        dataSource: DS_ThongKe,
        pageable: {
            messages: {
                display: " ",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        resizable: true,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        
        detailInit: function (e) {
            pp_PO_NhaThau_ID = e.data.PO_NhaThau_ID;
            DS_PO_NhaThau_ChiTiet = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_ThongKe.aspx",
                            data: {
                                cmd: 'DS_TK_TienDo',
                                p_po_nhathau_id: e.data.PO_NhaThau_ID,

                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("session timeout");
                                    window.location.href = "index.aspx";
                                }
                                else {
                                    options.success(result);
                                }
                            }
                        });
                    }
                },
                group: [
                  { field: "TenDonVi" }, {field : "Dot_CamKet"}// { field: "TenNhaThau" },

                ]

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
                              //  title: "Đơn vị",
                               groupHeaderTemplate: "#= Ham_HienThi_DotCamKet(value) #",

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
                            title: "Tên vật tư",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "TenVT",
                            attributes: {
                                class: "row_css"
                            }, width: "20%"
                        },
                        {
                            title: "Đơn vị tính",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "DonViTinh",
                            attributes: {
                                class: "row_css"
                            }, width: "10%"
                        },
                        {
                            title: "Số lượng ĐH",
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
                             title: "Tổng SL CK",
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
                               title: "SL Còn TT",
                               headerAttributes: {
                                   class: "header_css"
                               },
                               field: "TongSoLuongConLaiTT",
                               attributes: {
                                   class: "row_css",
                                   style: "font-weight:bold;color:green;"
                               }, width: "10%"
                           },
                            {
                                title: "SL Giao KoKH",
                                headerAttributes: {
                                    class: "header_css"
                                },
                                field: "TongSLGiaoKoKH",
                                attributes: {
                                    class: "row_css"
                                },// width: "10%"
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
                          
                        //{
                        //    template: function (data) {

                        //        return '<center><a class="btn btn-info" onclick="func_XemDotCamKet(' + data.PO_NhaThau_ChiTiet_ID + ');"><i class="fa fa-edit "></i>Xem Tiến độ</a></center>';
                        //    }
                        
                    ]
            });

        },
        columns:
            [
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
                    //  groupHeaderTemplate: "#= Ham_HienThi_DonVi(value) #",
                    title: "Số VB",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVB",
                    attributes: {
                        class: "row_css"
                    },
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
                        title: "Ngày xuất phiếu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayTaoDonHang",
                        attributes: {
                            class: "row_css"
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
                        }
                    }
            ]
       
    });
}