
$(document).ready(function () {

    $("#grid_data").kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                        data: {
                            cmd: 'HienThi_NghiemThu',
                            HopDong_ID: 0
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },
        pageable: {
            messages: {
                display: "Tổng số   {2}   mục",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        toolbar: function () {
            
            
            return '<h4 style="color: #2e6e9e !important;font-weight:bold;">Chọn nhân viên</h4><select id="txt_ChuyenVien_TTCW" style="width: 600px"></select><p class="demo-hint">Click vào công cụ để thấy sự xuất hiện tùy chỉnh.</p>';

            
        },
        columns:
            [
                  
                {
                    title: "Ngày nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ngay_NghiemThu_f",
                    //template: '<div style="width:100%;padding:10px;"><div style="float:left;vertical-align:middle!important;padding:15px;font-size:20pt;font-weight:bold;">14</div><div style="float:right;width:60%!important;height:50px;"><div style="float:left;width:100%;"><em class="k-scheduler-agendaweek">Thursday</em></div><div class="k-scheduler-agendadate" style="width:100%;"><span>June, 2013</span></div><div style="height:10px;"></div></div></div>',
                    template : function (data) {
                       
                        //return '<center><strong class="k-scheduler-agendaday">' + Convet_NgayViet(data.Ngay_NghiemThu_f)[1] + '</strong><em class="k-scheduler-agendaweek">' + Convet_NgayViet(data.Ngay_NghiemThu_f)[0] + '</em><span class="k-scheduler-agendadate">' + Convet_NgayViet(data.Ngay_NghiemThu_f)[2] + ', ' + Convet_NgayViet(data.Ngay_NghiemThu_f)[3] + '</span></center>';

                        return '<div style="width:100%;padding:10px;"><div style="float:left;vertical-align:middle!important;padding:15px;font-size:20pt;font-weight:bold;">' + Convet_NgayViet(data.Ngay_NghiemThu_f)[1] + '</div><div style="float:right;width:60%!important;height:50px;"><div style="float:left;width:100%;"><em class="k-scheduler-agendaweek">' + Convet_NgayViet(data.Ngay_NghiemThu_f)[0] + '</em></div><div class="k-scheduler-agendadate" style="width:100%;"><span>Tháng ' + Convet_NgayViet(data.Ngay_NghiemThu_f)[2] + ', ' + Convet_NgayViet(data.Ngay_NghiemThu_f)[3] + '</span></div><div style="height:10px;"></div></div></div>';

                    },
                    attributes: {
                        class: "k-scheduler-datecolumn",
                        style: "font-weight:bold;"
                    },
                    width: 180
                },                
                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TinhTrang",
                    template: function (data) {
                        if (data.TinhTrang == 0) {
                            return '<center><span class="label label-success">Kế hoạch</span></center>';
                        }
                            //else if (data.TinhTrang == 1) {
                            //    return '<center><span class="label label-warning">Theo dõi</span></center>';
                            //}
                        else {
                            return '<center><span class="label label-important">Hoàn tất</span></center>';
                        }

                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 100
                },
                {
                    title: "Phương thức nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PhuongThuc_NghiemThu",
                    template: function (data) {
                        if (data.PhuongThuc_NghiemThu == 0) {
                            return '<b>NGẪU NHIÊN</b>'
                        }
                        else {
                            return '<b>THEO PO</b><br><b style="color:red">' + data.SoPO + '</b>';
                        }
                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: 150
                },
                {
                    title: "Địa điểm nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    columns: [
                        {
                            title: "Kho TTCW",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "Kho_TTCW",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        },
                        {
                            title: "Đơn vị QLSD",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "DVQLSD",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        },
                        {
                            title: "Kho Nhà cung cấp",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "Kho_NT",
                            attributes: {
                                class: "row_css"
                            },
                            width: 150
                        }
                    ]
                },
                {
                    title: "Thanh phần nghiệm thu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    columns: [
                        {
                            title: "Trung tâm Cung ứng",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_TTCW",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_TTCW_Ten",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        },
                        {
                            title: "Nhà thầu",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_NT",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_NT",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        },
                        {
                            title: "Đơn vị QLSD",
                            headerAttributes: {
                                class: "header_css"
                            },
                            columns: [
                                {
                                    title: "Bộ phận",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "BoPhan_DVQLSD",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: 150
                                },
                                 {
                                     title: "Chuyên viên",
                                     headerAttributes: {
                                         class: "header_css"
                                     },
                                     field: "ChuyenVien_DVQLSD",
                                     attributes: {
                                         class: "row_css"
                                     },
                                     width: 150
                                 }
                            ]
                        }
                    ]
                }
            ],
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function (f) {

            
            $("<div style='width:50%;'/>").appendTo(f.detailCell).kendoGrid({
                dataSource: {

                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_Nghiem_Thu.aspx",
                                data: {
                                    cmd: 'HienThi_NghiemThu_ChiTiet',
                                    NghiemThu_Dot_ID: f.data.ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
                                }
                            });
                        }
                    }

                },                
                columns: [                                        
                    {
                        title: "Vật tư nghiệm thu",
                        headerAttributes: { class: "header_css" },
                        field: "VatTu_ID",
                        template: function (data) {
                            return "<div>" + data.VatTu_Ma + "</div><br><div>" + data.VatTu_Ten + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.DonViTinh + "</div>";
                        },
                        attributes: { class: "row_css", style: "font-weight:bold;" },
                        width: 120
                    },
                    {
                        title: "Số lượng nghiệm thu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoLuong_NghiemThu",                        
                        template: function (data) {
                            return '' + OnChangeFormat(data.SoLuong_NghiemThu) + '';
                        },
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:green;"
                        },
                        width: 50
                    },
                    {
                        title: "Tỷ lệ số lượng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TyLe",
                        template: function (data) {
                            return '' + data.TyLe.toFixed(3) + ' %';
                        },
                        attributes: {
                            class: "row_css"
                        },
                        width: 50
                    }
                ]
            });

        }
    });


    $("#txt_ChuyenVien_TTCW").kendoMultiSelect({
        filter: "startswith",
        dataTextField: "TenNguoiDung",
        dataValueField: "MaNguoiDung",

        //headerTemplate: '<div class="dropdown-header">' +
        //        '<span class="k-widget k-header">Photo</span>' +
        //        '<span class="k-widget k-header">Contact info</span>' +
        //    '</div>',

        itemTemplate: '<span class="k-state-default"><img src="#:data.Hinh==null?"Images/user-icon.png":data.Hinh#" alt=\"#:data.MaNguoiDung#\" /></span>' +
                  '<span class="k-state-default"><h3>#: data.TenNguoiDung #</h3><p>#: data.Ho == null ? "" : data.Ho # #: data.Ten == null ? "" : data.Ten #</p></span>',

        tagTemplate: '<span"><img class="tag-image" src="#:data.Hinh==null?"Images/user-icon.png":data.Hinh#" alt=\"#:data.MaNguoiDung #\" />' +
            '<p>#: data.TenNguoiDung #</p></span>',


        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThongTinCaNhan.aspx",
                        data: {
                            cmd: 'HienThi_NguoiDung'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Nghiem_Thu.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        },

        change:function () {

            
            var values = this.value();
            var _flt = { logic: "or", filters: [] };

            for (var i = 0; i < values.length; i++) {

                _flt.filters.push({ field: "ChuyenVien_TTCW", operator: "eq", value: parseInt(values[i]) });
                
            }
            $("#grid_data").data("kendoGrid").dataSource.query({ filter: _flt });
             
        },
        height: 370
    });


    

});

function Convet_NgayViet(Ngay) {

    var d = kendo.parseDate(Ngay, 'dd/MM/yyyy');

    var thu = d.getDay() + 1;
    var ngay = d.getDate();
    var thang = d.getMonth() + 1;
    var nam = d.getFullYear();

    switch (thu) {
        case 1: { thu = "Chủ Nhật"; break; }
        case 2: { thu = "Thứ Hai"; break; }
        case 3: { thu = "Thứ Ba"; break; }
        case 4: { thu = "Thứ Tư"; break; }
        case 5: { thu = "Thứ Năm"; break; }
        case 6: { thu = "Thứ Sáu"; break; }
        case 7: { thu = "Thứ Bảy"; break; }
    }
    
    return [thu,ngay,thang,nam];

}