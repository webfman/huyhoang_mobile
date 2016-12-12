
var DS_HopDong;
var detailInit_e;
var HopDong_ID;


$(document).ready(function () {

    //document.oncontextmenu = function () { return false; }
    $("#main-menu-min").click();

    $("#wd_giahan").kendoWindow({
        draggable: false,
        height: "auto",
        width: "60%",
        modal: true,
        resizable: false,
        title: "Gia hạn hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#wd_thanhly").kendoWindow({
        draggable: false,
        height: "auto",
        width: "60%",
        modal: true,
        resizable: false,
        title: "Thanh lý hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#txt_ngay_hethan").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_ngay_thanhly").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    
    
    $("#grid_GiaHan").kendoGrid({
        sortable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   dòng dữ liệu",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },        
        columns:
            [
                
                {
                    title: "Ngày hết hạn cũ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHetHan_Cu",
                    attributes: {
                        class: "row_css"                        
                    },
                    template: "#= NgayHetHan_Cu_f #"                    
                },
                {
                    title: "Người gia hạn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    attributes: {
                        class: "row_css"
                    },
                    field: "NguoiGiaHan"
                },
                {
                    title: "Ngày gia hạn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    attributes: {
                        class: "row_css"
                    },
                    field: "NgayGiaHan",
                    template: "#= NgayGiaHan_f #"
                },
            ]
    });

    //    DS_HopDong = new kendo.data.DataSource({
    //        transport: {
    //            read: function (options) {
    //                $.ajax({
    //                    type: "POST",
    //                    url: "assets/ajax/Ajax_HopDong.aspx",
    //                    data: {
    //                        cmd: 'Lay_DS_HopDong'
    //                    },
    //                    dataType: 'json',
    //                    success: function (result) {
    //                        if (result == "err401") {
    //                            alert("session timeout");
    //                            window.location.href = "index.aspx";
    //                        }
    //                        else {
    //                            options.success(result);
    //                        }
    //                    }
    //                });
    //            },
    //            parameterMap: function (options, operation) {
    //                if (operation !== "read" && options.models) {
    //                    return { models: kendo.stringify(options.models) };
    //                }
    //            }
    //        },
    //        pageSize: 7
    //});

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
        detailInit: detailInit,
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
                    template: "#= HienThi_TinhTrang(TinhTrang_HD,NgayThanhLy_f) #",
                    width: "10%"
                },
                {
                    title: "Số HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    template: function (data) {
                        if (data.SoNgayConLai <= 30) {
                            return '<img src="Images/alarm_2.gif" height="40" width="40" /><br><b>' + data.MaHD + '</b>';
                        }
                        else {
                            return '<b>' + data.MaHD + '</b>';
                        }

                    },
                    attributes: {
                        class: "row_css"
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
                    field: "GiaTriTruocThue",
                    template: "#= OnChangeFormat(GiaTriTruocThue) #",
                    attributes: {
                        class: "row_css"
                    },
                    width: "12%"
                },
                {
                    title: "Ngày còn lại",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoNgayConLai",
                    template: "#= HienThi_SoNgayConLai(data) #"
                },
                {
                    title: "Ngày hết hạn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHetHan",
                    template: "#= NgayHetHan_f #",
                    attributes: {
                        class: "row_css"
                    },
                    width: "8%"
                },

                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: '#= Ham_HienThi_VB(FileVB) #',
                    width: "8%"
                },
                {                    
                    template: function (data) {

                        return '<center><a class="btn btn-info" onclick="Ham_GiaHan(' + data.HopDong_ID + ');"><i class="fa fa-edit "></i> Gia hạn</a></center>';
                    },
                    width: "10%"
                },
                {
                    template: function (data) {

                        return '<center><a class="btn btn-info" onclick="Ham_ThanhLy(' + data.HopDong_ID + ');"><i class="fa fa-edit "></i> Thanh lý</a></center>';
                    },
                    width: "10%"
                }

            ]
    });

    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        filter: "contains",
        dataSource: {
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
                                window.location.href = "DangNhap.aspx?p=GiaHanHopDong.aspx";
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
    $("#txt_search_sohd").data("kendoAutoComplete").dataSource.read();

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



function HienThi_SoNgayConLai(model) {
    if (model.TinhTrang_HD == 0) {
        return '<center style="color:red;"><b>' + model.SoNgayConLai + '</b></center>';
    } else {
        return '';
    }
}
function HienThi_TinhTrang(TinhTrang_HD,NgayThanhLy_f) {
    if (TinhTrang_HD == 0) {
        return '<center><span class="label label-success">Hiệu lực</span></center>';
    }
    else if (TinhTrang_HD == 1) {
        return '<center><span class="label label-warning">Hết hiệu lực</span></center>';
    }
    else {
        return '<center><span class="label label-important">Thanh lý</span><br><b>' + NgayThanhLy_f + '<b></center>';
    }
}
function Ham_HienThi_VB(value) {
    if (value == "" || value == null) {
        return '<center>Chưa upload </center>';
    } else {        
        return '<center><a href= "' + value + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
    }
}
function detailInit(e) {

    detailInit_e = e;


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
                                window.location.href = "DangNhap.aspx?p=GiaHanHopDong.aspx";
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
        //toolbar: kendo.template($("#Templ_ThemHD_CT").html()),
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

}
function Ham_ThanhLy(p_HopDong_ID) {

    var grid_data = $("#grid_hopdong").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.HopDong_ID == p_HopDong_ID;
    });
    HopDong_ID = p_HopDong_ID;
    $("#wd_thanhly").data("kendoWindow").center().open();

}

function Ham_Dong_TL() {
    $("#wd_thanhly").data("kendoWindow").close();
}

function Ham_Luu_TL() {

    var check = 0;

    if ($("#txt_ngay_thanhly").val() == "") {
        check = 1;
        alert("Chưa nhập ngày thanh lý!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong.aspx",
            data: {

                cmd: 'ThanhLy_HopDong',
                NgayThanhLy: $("#txt_ngay_thanhly").val().trim(),
                p_HopDong_ID: HopDong_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã thanh lý thành công!");
                DS_HopDong.read();
                $("#wd_thanhly").data("kendoWindow").close();
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


function Ham_GiaHan(p_HopDong_ID) {
    
    var grid_data = $("#grid_hopdong").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.HopDong_ID == p_HopDong_ID;
    });

    ////////////////////////////////////
    HopDong_ID = p_HopDong_ID;
    
    $("#txt_ngay_hethan").val(res[0].NgayHetHan_f);


    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong.aspx",
                    data: {
                        cmd: 'GiaHanHopDong_SelectAll',
                        p_HopDong_ID: p_HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=GiaHanHopDong.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    $("#grid_GiaHan").data('kendoGrid').setDataSource(ds);

    $("#wd_giahan").data("kendoWindow").center().open();

}


function Ham_Luu_GH() {

    var check = 0;

    if ($("#txt_ngay_hethan").val() == "" ) {
        check = 1;
        alert("Chưa nhập ngày hết hạn!");
        return;
    }
    if (check == 0) {
        
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong.aspx",
            data: {

                cmd: 'GiaHan_HopDong',
                NgayGiaHan: $("#txt_ngay_hethan").val().trim(),
                p_HopDong_ID:HopDong_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã gia hạn thành công!");
                DS_HopDong.read();
                $("#wd_giahan").data("kendoWindow").close();
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

function Ham_Dong_GH() {
    $("#wd_giahan").data("kendoWindow").close();
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


