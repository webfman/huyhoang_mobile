var PO_NhauThau_ChiTiet_ID;
var ds;

$(document).ready(function () {
	document.oncontextmenu = function () { return false; }
    $("#wd_nghiemthu").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Thông tin nghiệm thu",
        visible: false,
        actions: false

    }).data("kendoWindow");


    $("#txt_NgayNghiemThu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    //$(".k-input").prop('disabled', true);
   



    var cboNhaThau = $('#cboNhaThau').kendoComboBox({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
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
        },
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        filter: "contains",
        optionLabel: 'Chọn nhà thầu...',
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            NhaThau_ID = dataItem.NhaThau_ID;

            DS_PO_Con = new kendo.data.DataSource({

                error: function () {
                    alert('Lỗi đường truyền');
                },
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_ThanhToan.aspx",
                            data: {
                                cmd: 'PO_NhaThau_byNT',
                                NhaThau_ID: dataItem.NhaThau_ID

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

            $("#grid_NT").empty();
            var grid = $("#grid_NT").kendoGrid({

                dataSource: DS_PO_Con,
                sortable: true,
                pageable: {
                    messages: {
                        display: "Tổng số   {2}   PO con",
                        empty: "Không có dữ liệu",
                        page: "Trang",
                        of: "of {0}",
                        itemsPerPage: "Số mục trong một trang"

                    }
                },
                toolbar: kendo.template($("#Templ_PO_Con").html()),
                columns:
                [                    
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
                        title: "Số văn bản",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoVB",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Ngày VB",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayVB",
                        template: "#= NgayVB_f #",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Ngày xuất PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayTaoDonHang",
                        template: "#= NgayTaoDonHang_f #",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Người xuất PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NguoiXuatDonHang",
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
                        },
                        width: "9%"
                    }
                ],
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

                    $("<div/>").appendTo(e.detailCell).kendoGrid({
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_NghiemThu.aspx",
                                        data: {
                                            cmd: 'PONT_GetDSDonVi',
                                            PONhaThauID: e.data.PO_NhaThau_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            options.success(result);
                                        }
                                    });
                                }
                            }
                        }),                        
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        columns:
                            [
                                    {
                                        title: "Đơn vị",
                                        headerAttributes: {
                                            class: "header_css",
                                            style: "text-align: left !important;"
                                        },
                                        field: "TenDonVi",
                                        attributes: {
                                            class: "row_css",
                                            style: "font-weight: bold !important;text-align: left !important;"
                                        }
                                    }
                            ],
                        detailInit: function (e) {

                            ds = new kendo.data.DataSource({
                                transport: {
                                    read: function (options) {
                                        $.ajax({
                                            type: "POST",
                                            url: "assets/ajax/Ajax_NghiemThu.aspx",
                                            data: {
                                                cmd: 'PONT_GetDSVatTu',
                                                PONhaThauID: $('#grid_NT').data('kendoGrid').dataItem(e.sender.wrapper.closest('tr').prev()).PO_NhaThau_ID,
                                                DonVi_ID:e.data.DonVi_ID
                                            },
                                            dataType: 'json',
                                            success: function (result) {
                                                options.success(result);
                                            }
                                        });
                                    }
                                }
                            });
                            $("<div/>").appendTo(e.detailCell).kendoGrid({
                                dataSource: ds,
                                columns: [
                                    
                                    {
                                        template: '<center><a class="btn btn-info" onclick="Ham_NghiemThu(#= PO_NhaThau_ChiTiet_ID #,\'#= NgayNghiemThu_f #\',\'#= ThongBaoNT #\');"><i class="fa fa-clock-o"></i> Nghiệm Thu</a></center>',
                                        width: 100
                                    },
                                    {
                                        title: "Tên Vật Tư",
                                        headerAttributes: {
                                            class: "header_css",                                            
                                        },
                                        field: "TenVT",
                                        attributes: {
                                            class: "row_css"                                            
                                        },
                                        width: 200
                                    },
                                    {
                                        title: "Đơn Vị Tính",
                                        headerAttributes: {
                                            class: "header_css",                                            
                                        },
                                        field: "DonViTinh_ID",
                                        attributes: {
                                            class: "row_css"                                            
                                        },
                                        width: 100
                                    },
                                    {
                                        title: "Ngày nghiệm thu",
                                        headerAttributes: {
                                            class: "header_css",                                            
                                        },
                                        field: "NgayNghiemThu_f",
                                        attributes: {
                                            class: "row_css"                                            
                                        },
                                        width: 140
                                    },
                                    {
                                        title: "Thông báo nghiệm thu",
                                        headerAttributes: {
                                            class: "header_css",                                            
                                        },
                                        field: "ThongBaoNT",
                                        attributes: {
                                            class: "row_css"                                            
                                        },
                                        width: 140
                                    }
                                                                       
                                ]

                            });
                        }

                    });
                }
            }).data("kendoGrid");;


            $("#txt_search").kendoAutoComplete({
                dataTextField: "SoVB",
                dataSource: DS_PO_Con,
                select: function (e) {

                    var dataItem = this.dataItem(e.item.index());
                    var value = dataItem.SoVB;

                    if (value) {

                        grid.dataSource.filter({ field: "SoVB", operator: "eq", value: value });
                    }
                    else {
                        grid.dataSource.filter({});
                    }
                },
                change: function () {

                    $("#txt_search").val('');
                }

            });
            $("#btn_clear").click(function (e) {
                e.preventDefault();
                $("#txt_search").val('');

                grid.dataSource.filter({});
            });
        }
    }).data('kendoComboBox');

    
});
function Ham_NghiemThu(id,ngaynghiemthu,noidungnt) {

    PO_NhauThau_ChiTiet_ID = id;
    $("#wd_nghiemthu").data("kendoWindow").center().open();
    
    $("#txt_NgayNghiemThu").val(ngaynghiemthu);
    $("#txt_ThongBao").val(noidungnt);
    


}
function Ham_Luu_NghiemThu() {


    var request = $.ajax({
        url: 'NghiemThu.aspx/Ham_NghiemThu',
        type: "POST",
        data: JSON.stringify({

            PO_NhauThau_ChiTiet_ID: PO_NhauThau_ChiTiet_ID,
            NgayNghiemThu: $("#txt_NgayNghiemThu").val(),
            ThongBaoNghiemThu: $("#txt_ThongBao").val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'

    });
    request.done(function (msg) {
        $("#wd_nghiemthu").data("kendoWindow").close();
        ds.read();
       
    });
    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}
function Ham_Dong_NghiemThu() {
    $("#wd_nghiemthu").data("kendoWindow").close();
}