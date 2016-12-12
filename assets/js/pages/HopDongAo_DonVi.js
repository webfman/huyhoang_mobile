
var DS_HopDong, DS_HopDong_TD, DS_HopDong_Loc, DS_HopDong_ChiTiet, DS_NhaThau, DS_LoaiHD, DS_HTMS, DS_LoaiVT, DS_VatTu, DS_DVT;
var detailInit_e, v_STT;
var VatTu_ID_Sua;

var HopDong_ID;
var Path, Path_Sua;

var DS_NguonVon;

$(document).ready(function () {

    $("#main-menu-toggle").click();
    //document.oncontextmenu = function () { return false; }

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
                url: "assets/ajax/Ajax_HopDongAo_DonVi.aspx/Lay_DS_HopDong"
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
                    title: "Số HĐ ảo",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    template: function (data) {

                        if (data.TinhTrangChuyen == 0) {
                            return data.MaHD
                        }
                        else {
                            //return data.MaHD_That
                            return "<div  style='font-weight:normal !important;'>" + data.MaHD + "</div><div>~.~</div><div style='color:red;'>" + data.MaHD_That + "</div>";
                        }
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
                    template: "#= NgayKy_f #",
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
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDongAo_DonVi.aspx",
                        data: {
                            cmd: 'Lay_DS_MaHD'
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
                                window.location.href = "DangNhap.aspx?p=Hop_Dong.aspx";
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

   



    //////////////

    DS_VatTu = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_VatTu_by_HD_ID',
                        HopDong_ID: e.data.HopDong_ID
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
                    url: "assets/ajax/Ajax_HopDong_Ao.aspx/Lay_DS_HD_byMaHD",
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
                    url: "assets/ajax/Ajax_HopDongAo_DonVi.aspx/Lay_DS_HopDong"
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
    }


    $("#grid_hopdong").data("kendoGrid").setDataSource(ds);
}
