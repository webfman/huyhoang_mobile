var PO_NhaThau_ID, Dot_ThanhToan_ID, NhaThau_ID, MaHD;
var Path, Path_Sua;

$(document).ready(function () {
    //document.oncontextmenu = function () { return false; }

    $('#div_thanhtoan').hide();
    $('#btn_Back').hide();
    

    //#region Upload   

    $('#files_upload').kendoUpload({
        async: {
            autoUpload: false,
            saveUrl: 'UploadFileVB.aspx'
        },
        error: function (e) {

            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Upload không thành công!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-success').toggleClass('text-danger');
        },
        localization: {
            dropFilesHere: 'Kéo thả file vào đây để upload',
            headerStatusUploaded: 'Đã upload xong',
            headerStatusUploading: 'Đang upload',
            select: 'Chọn file...',
            statusFailed: 'Upload không thành công',
            statusUploaded: 'Đã upload xong',
            statusUploading: 'Đang upload',
            uploadSelectedFiles: 'Upload'

        },
        multiple: false,
        success: function (e) {
            Path = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            e.data = { LoaiFile: 'VBThanhToan' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                $("#notification").data("kendoNotification").show({
                    title: "Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                $("#notification").data("kendoNotification").show({
                    title: "Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
        }
    });

    $('#files_upload_sua').kendoUpload({
        async: {
            autoUpload: false,
            saveUrl: 'UploadFileVB.aspx'
        },
        error: function (e) {

            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Upload không thành công!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-success').toggleClass('text-danger');
        },
        localization: {
            dropFilesHere: 'Kéo thả file vào đây để upload',
            headerStatusUploaded: 'Đã upload xong',
            headerStatusUploading: 'Đang upload',
            select: 'Chọn file...',
            statusFailed: 'Upload không thành công',
            statusUploaded: 'Đã upload xong',
            statusUploading: 'Đang upload',
            uploadSelectedFiles: 'Upload'

        },
        multiple: false,
        success: function (e) {

            Path_Sua = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            e.data = { LoaiFile: 'VBThanhToan' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                $("#notification").data("kendoNotification").show({
                    title: "Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                $("#notification").data("kendoNotification").show({
                    title: "Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!",
                    message: "Hãy upload lại!"
                }, "error");
                return;
            }
        }
    });

    $('#btn_sua_upload').click(function () {

        $("#tr_download").hide();
        $("#tr_upload").show();
        Path_Sua = "";
    });

    //#endregion
    
    //#region control


    //var now = new Date();
    //$("#txt_TuNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy"
    //});
    //$("#txt_TuNgay").data("kendoDatePicker").value(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30));

    //$("#txt_DenNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy"
    //});
    //$("#txt_DenNgay").data("kendoDatePicker").value(now);

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

    $("#txt_NgayChungTu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayChungTu_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    var DS_LoaiTienTrinh = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DMLoaiTienTrinh_SelectAll'
                    },
                    dataType: 'json',
                    success: function (result) {
                        options.success(result);
                    }
                });
            }
        }
    });
    $("#cmb_LoaiTienTrinh").kendoDropDownList({
        optionLabel: "--Chọn loại tiến trình--",
        dataTextField: "Ten",
        dataValueField: "Id",
        dataSource: DS_LoaiTienTrinh
    });
    $("#cmb_LoaiTienTrinh_Sua").kendoDropDownList({
        optionLabel: "--Chọn loại tiến trình--",
        dataTextField: "Ten",
        dataValueField: "Id",
        dataSource: DS_LoaiTienTrinh
    });

    var wd_DotThanhToan = $("#wd_DotThanhToan").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        modal: true,
        resizable: false,
        title: "Tạo mới đợt thanh toán",
        visible: false,
        //actions: false
        actions: ["Close"]

    }).data("kendoWindow");

    var wd_ChiTietTT = $("#wd_ChiTietTT").kendoWindow({
        draggable: false,
        height: "20%",
        width: "50%",
        modal: true,
        resizable: false,
        title: "Chi tiết thanh toán",
        visible: false,
        //actions: false
        actions: ["Close"]

    }).data("kendoWindow");

    

    var wd_DotThanhToan_Sua = $("#wd_DotThanhToan_Sua").kendoWindow({
        draggable: false,
        height: "auto",
        width: "50%",
        modal: true,
        resizable: false,
        title: "Sửa đợt thanh toán",
        visible: false,
        actions: false

    }).data("kendoWindow");

   
   /////////////////////////////////////////////////////////////////////

    var cboNhaThau = $('#cboNhaThau').kendoComboBox({
            dataSource: {
                error: function () {
                    

                    $("#notification").data("kendoNotification").show({
                        title: "Lỗi!",
                        message: "Lỗi đường truyền"
                    }, "error");
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
                                options.success(result);
                            }
                        });
                    }
                }
            },
            dataTextField: "TenNhaThau",
            dataValueField: "NhaThau_ID",
            filter: "contains",
            placeholder: 'Chọn nhà thầu...',
            select: function (e) {

                var dataItem = this.dataItem(e.item.index());
                NhaThau_ID = dataItem.NhaThau_ID;

                var DS_PO_Con = new kendo.data.DataSource({
                    error: function () {
                        $("#notification").data("kendoNotification").show({
                            title: "Lỗi!",
                            message: "Lỗi đường truyền"
                        }, "error");
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
                                    options.success(result);
                                }
                            });
                        }
                    },
                    schema: {
                        model: {
                            fields: {                                
                                NgayVB: { type: "date" }, NgayTaoDonHang: { type: "date" }
                            }
                        }
                    }

                });

                $("#grid_PO_Con").empty();
                var grid_PO_Con = $("#grid_PO_Con").kendoGrid({

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
                    //toolbar: kendo.template($("#Templ_PO_Con").html()),
                    filterable: {
                        extra: false,
                        operators: {
                            string: {                                
                                contains: "Chứa",
                                eq: "Bằng",
                                neq: "Khác"
                            },
                            date: {
                                eq: "Bằng",
                                neq: "Khác",
                                gt: "Sau ngày",
                                lte: "Trước ngày"
                            }
                        },
                        messages: {
                            info: "Chọn kiểu lọc: ",
                            filter: "Lọc",
                            clear: "Hủy lọc"
                        }
                    },
                    columns:
                    [
                        {

                            template: function (data) {

                                return '<center><a onclick="HienThi_ThanhToan(' + data.PO_NhaThau_ID + ',\'' + data.NhaThau_Ten + '\',\'' + data.MaHD + '\',' + data.TongTienThanhToan + ',' + data.SoTienDaThanhToan + ',' + data.TyLeDaThanhToan + ',' + data.SoTienChuaThanhToan + ',' + data.TyLeChuaThanhToan + ',' + data.TinhTrang_ThanhToan + ',' + data.GiaTriTruocThue + ',' + data.SoTienChuaThanhToan_HD  + ',\'' + data.SoPO + '\');" class="btn btn-info"><i class="fa fa-money"></i> Thanh toán</a></center>'
                            },
                            width: "15%"
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
                            title: "Số PO",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "SoPO",
                            attributes: {
                                class: "row_css",
                                style: "font-weight:bold;"
                            }
                        },                        

                        {
                            //title: "Số văn bản PO",
                            title: "Thông báo giao hàng",
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
                            filterable: {
                                ui: "datepicker"
                            },
                            format: "{0:dd/MM/yyyy}",
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
                            filterable: {
                                ui: "datepicker"
                            },
                            format: "{0:dd/MM/yyyy}",
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
                            filterable: false,
                            template: function (data) {
                                if (data.FileVB == "" || data.FileVB == null) {
                                    return '';
                                } else {
                                    return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i> Tải</a></center>';
                                }
                            },
                            width: "9%"
                        }
                    ]
                }).data("kendoGrid");


                $("#txt_search").kendoAutoComplete({
                    dataTextField: "SoVB",
                    dataSource: DS_PO_Con,
                    select: function (e) {

                        var dataItem = this.dataItem(e.item.index());
                        var value = dataItem.SoVB;

                        if (value) {

                            grid_PO_Con.dataSource.filter({ field: "SoVB", operator: "eq", value: value });
                        }
                        else {
                            grid_PO_Con.dataSource.filter({});
                        }
                    },
                    change: function () {

                        $("#txt_search").val('');
                    }

                });
                $("#btn_clear").click(function (e) {
                    e.preventDefault();
                    $("#txt_search").val('');

                    grid_PO_Con.dataSource.filter({});
                });
            }
        }).data('kendoComboBox');


    /////////////////////////////////////////////////////////////////////
    var grid_ds_vattu = $('#grid_ds_vattu').kendoGrid({

        columnResizeHandleWidth: 6,       
        pageable: {
            buttonCount: 2,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        //resizable: true,
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
        toolbar: kendo.template($("#Templ_VatTu").html()),
        filterable: {
            extra: false,
            operators: {
                string: {
                    contains: "Chứa",
                    eq: "Bằng",
                    neq: "Khác"
                },
                date: {
                    eq: "Bằng",
                    neq: "Khác",
                    gt: "Sau ngày",
                    lte: "Trước ngày"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn hoặc bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn hoặc bằng",
                    lt: "Nhỏ hơn"
                }
            },
            messages: {
                info: "Chọn kiểu lọc: ",
                filter: "Lọc",
                clear: "Hủy lọc"
            }
        },
        columns: [
            {
                field: "select_vt",
                title: "Chọn",
                headerAttributes: {
                    class: "header_css"
                },
                filterable: false,
                template: '<center><input type=\'checkbox\' class=\'checkbox\' /></center>',
                sortable: false,
                width: 80

            },
            {
                title: "nid",
                headerAttributes: {
                    class: "header_css"
                },
                field: "nid",
                attributes: {
                    class: "row_css"
                },
                width: 70
            },               
            {
                title: "Vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "mavt",
                //template: "<div>#= mavt #</div><br><div>#= tenvt #</div><div>#= dvt #</div>",
                template: function (data) {
                    return "<div>" + data.mavt + "</div><br><div>" + data.tenvt + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.dvt + "</div>";
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;"
                },
                width: 170
            },
            //{
            //    title: "Số hợp đồng",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "so_hop_dong",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 150
            //},
            //{
            //    title: "Nhà thầu",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "nha_cung_cap",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 120
            //},
            {
                title: "Số PO",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_po",
                attributes: {
                    class: "row_css"
                },
                width: 100
            },
            {
                title: "Số lượng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_luong",
                template: "#= OnChangeFormat(so_luong) #",
                attributes: {
                    class: "row_css"
                },
                width: 70
            },
            
            {
                title: "Đơn giá",
                headerAttributes: {
                    class: "header_css"
                },
                field: "don_gia",
                template: "#= OnChangeFormat(don_gia) #",
                attributes: {
                    class: "row_css"
                },
                width: 120
            },
            {
                title: "Giá điều chỉnh",
                headerAttributes: {
                    class: "header_css"
                },
                field: "gia_dieu_chinh",
                template: "#= OnChangeFormat(gia_dieu_chinh) #",
                attributes: {
                    class: "row_css"
                },
                width: 50
            },
            {
                title: "Thành tiền",
                headerAttributes: {
                    class: "header_css"
                },
                field: "thanh_tien",
                template: "#= OnChangeFormat(thanh_tien) #",
                attributes: {
                    class: "row_css"
                },
                width: 130
            },
            {
                title: "Tiền điều chỉnh",
                headerAttributes: {
                    class: "header_css"
                },
                field: "tien_dieu_chinh",
                template: "#= OnChangeFormat(tien_dieu_chinh) #",
                attributes: {
                    class: "row_css"
                },
                width: 50
            },
            //{
            //    title: "Đơn vị tính",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "dvt",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            {
                title: "Số phiếu nhập",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_phieu",
                attributes: {
                    class: "row_css"
                },
                width: 120
            },
            {
                title: "Ngày nhập",
                headerAttributes: {
                    class: "header_css"
                },
                field: "ngay_nhap",
                filterable: {
                    ui: "datepicker"
                },
                format: "{0:dd/MM/yyyy}",
                attributes: {
                    class: "row_css"
                },
                width: 120
            }

            //{
            //    title: "TK_NO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TK_NO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            //{
            //    title: "TKE_NO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TKE_NO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            //{
            //    title: "TK_CO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TK_CO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //}
        ]
    }).data('kendoGrid');
    grid_ds_vattu.table.on("click", ".checkbox", selectRow);

      
    //#region che mờ

    //var cmb_search_HD = $("#cmb_search_HD").kendoComboBox({        
    //    placeholder: "Chọn dữ liệu lọc",
    //    dataTextField: "items[0].so_hop_dong",
    //    select: function (e) {

    //        var dataItem = this.dataItem(e.item.index());
    //        var value = dataItem.value;
    //        if (value) {
                
    //            grid_ds_vattu.dataSource.filter({ field: "so_hop_dong", operator: "eq", value: value });
    //        }
    //        else {
    //            grid_ds_vattu.dataSource.filter({});
    //        }
    //    },
    //    change: function () {

    //        $("#cmb_search_HD").val('');
    //    }

    //}).data("kendoComboBox");

    //var cmb_search_NT = $("#cmb_search_NT").kendoComboBox({
    //    placeholder: "Chọn dữ liệu lọc",
    //    dataTextField: "items[0].nha_cung_cap",
    //    select: function (e) {

    //        var dataItem = this.dataItem(e.item.index());
    //        var value = dataItem.value;
    //        if (value) {

    //            grid_ds_vattu.dataSource.filter({ field: "nha_cung_cap", operator: "eq", value: value });
    //        }
    //        else {
    //            grid_ds_vattu.dataSource.filter({});
    //        }
    //    },
    //    change: function () {

    //        $("#cmb_search_NT").val('');
    //    }

    //}).data("kendoComboBox");

    //var cmb_search_PO = $("#cmb_search_PO").kendoComboBox({
    //    placeholder: "Chọn dữ liệu lọc",
    //    dataTextField: "items[0].so_po",
    //    select: function (e) {

    //        var dataItem = this.dataItem(e.item.index());
    //        var value = dataItem.value;
    //        if (value) {

    //            grid_ds_vattu.dataSource.filter({ field: "so_po", operator: "eq", value: value });
    //        }
    //        else {
    //            grid_ds_vattu.dataSource.filter({});
    //        }
    //    },
    //    change: function () {

    //        $("#cmb_search_PO").val('');
    //    }

    //}).data("kendoComboBox");

    //#endregion

    var grid_ThanhToan = $("#grid_ThanhToan").kendoGrid({
        sortable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   đợt thanh toán",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        toolbar: kendo.template($("#Templ_DotThanhToan").html()),
        columns:
            [
                    {
                        template: function (data) {
                            if ($("[id$=_hf_MoThanhToan]").val() == "true") {

                                if (data.TinhTrang == '0') {

                                    return '<center><input type="button" class="button_mokhoa" onclick="Ham_DongKhoa(\'' + data.Dot_ThanhToan_ID + '\');"/></center>';
                                }
                                else {
                                    return '<center><input type="button" class="button_khoa" onclick="Ham_MoKhoa(\'' + data.Dot_ThanhToan_ID + '\');"/></center>';
                                }
                            }
                            else {


                                if (data.TinhTrang == '0') {

                                    return '<center><input type="button" style="cursor: text;" class="button_mokhoa" /></center>';
                                }
                                else {
                                    return '<center><input type="button" style="cursor: text;" class="button_khoa" /></center>';
                                }
                            }

                        },
                        width: "7%"
                    },
                    {
                        title: "Đợt",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Dot",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        }
                    },
                    {
                        title: "Số tiền thanh toán",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoTien",
                        template: "#= OnChangeFormat(SoTien) #",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoChungTu",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Ngày chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayChungTu",
                        template: "#= NgayChungTu_f #",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Tiến trình",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "LoaiTienTrinh",
                        template: "#= LoaiTienTrinh_Ten #",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Nội dung",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NoiDung",
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

                            if (data.FileVB == "" || data.FileVB == null || data.FileVB == "null") {

                                return '<center>Chưa upload</center>';

                            } else {

                                return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
                            }
                        },
                        width: "8%"
                    },
                    {

                        template: function (data) {
                            if (data.TinhTrang == "0") {
                                if (data.TinhTrang_ThanhToanHet == "0") {
                                    return '<center><a class="btn btn-warning" onclick="Ham_ThanhToan_TienTrinh(' + data.Dot_ThanhToan_ID + ',' + data.SoTienConLai + ');"><i class="fa fa-bars"></i> Thực tế TT</a></center>'
                                }
                                else {
                                    return ''
                                }
                            } else {
                                return ''
                            }
                        },
                        width: "12%"
                    },
                    {

                        template: function (data) {
                            if (data.TinhTrang == "0") {
                                return '<center><a class="btn btn-info" onclick="Ham_Sua_ThanhToan(' + data.Dot_ThanhToan_ID + ',' + data.SoTien + ',\'' + data.SoChungTu + '\',\'' + data.NgayChungTu_f + '\',' + data.LoaiTienTrinh + ',\'' + data.NoiDung + '\',\'' + data.FileVB + '\');"><i class="fa fa-edit "></i> Sửa</a></center>'
                            } else {
                                return ''
                            }
                        },
                        width: "9%"
                    },
                    {

                        template: function (data) {
                            if (data.TinhTrang == "0") {
                                return '<center><a class="btn btn-danger" onclick="Ham_Xoa_ThanhToan(' + data.Dot_ThanhToan_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                            } else {
                                return ''
                            }
                        },
                        width: "8%"
                    }
            ],
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailTemplate: kendo.template($("#Templ_ChiTiet").html()),
        detailInit: function (e) {

            var detailRow = e.detailRow;

            detailRow.find("#tabstrip").kendoTabStrip({
                animation: {
                    open: { effects: "fadeIn" }
                }
            });
            /////////////////////////////////////////////////////////////////
            detailRow.find("#tab_VatTu").kendoGrid({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_ThanhToan.aspx",
                                data: {
                                    cmd: 'SP_ThanhToan_CT_SelectAll',
                                    Dot_ThanhToan_ID: e.data.Dot_ThanhToan_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    options.success(result);
                                }
                            });
                        }
                    }
                }),
                columns: [
                    {
                        title: "nid",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "nid",
                        attributes: {
                            class: "row_css"
                        },
                        width: 70
                    },
                    {
                        title: "Vật tư",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tenvt",
                        template: "<div>#= mavt #</div><br><div>#= tenvt #</div>",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 170
                    },
                    {
                        title: "Số hợp đồng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_hop_dong",
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Nhà thầu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "nha_cung_cap",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Số PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_po",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Số lượng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_luong",
                        template: "#= OnChangeFormat(so_luong) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Đơn giá",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "don_gia",
                        template: "#= OnChangeFormat(don_gia) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Giá điều chỉnh",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "gia_dieu_chinh",
                        template: "#= OnChangeFormat(gia_dieu_chinh) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Thành tiền",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "thanh_tien",
                        template: "#= OnChangeFormat(thanh_tien) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 130
                    },
                    {
                        title: "Tiền điều chỉnh",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tien_dieu_chinh",
                        template: "#= OnChangeFormat(tien_dieu_chinh) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Đơn vị tính",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "dvt",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Số phiếu nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_phieu",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Ngày nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "ngay_nhap",
                        //type: "date",
                        //format: "{0:dd/MM/yyyy}",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },

                    {
                        title: "TK_NO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tk_no",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "TKE_NO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tke_no",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "TK_CO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tk_co",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    }
                ]


            });

            /////////////////////////////////////////////////////////////////
            detailRow.find("#tab_ThanhToan").kendoGrid({
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_ThanhToan.aspx",
                                data: {
                                    cmd: 'Dot_ThanhToan_ChiTiet',
                                    Dot_ThanhToan_ID: e.data.Dot_ThanhToan_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    options.success(result);
                                }
                            });
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                                Ngay_Nhap: { type: "date" }
                            }
                        }
                    },
                    aggregate: [
                        { field: "SoTien_TienTrinh", aggregate: "sum" },
                        { field: "TyLe", aggregate: "sum" }
                    ]
                }),
                columns: [
                    
                    {
                        title: "Lần thanh toán",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "LanThanhToan",
                        attributes: {
                            class: "row_css"
                        },
                        //width: 100
                    },
                    {
                        title: "Số tiền",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoTien_TienTrinh",
                        template: "#= OnChangeFormat(SoTien_TienTrinh) #",
                        attributes: {
                            class: "row_css"
                        },
                        aggregates: ["sum"],
                        footerTemplate: "<div class=\"row_css\">#= OnChangeFormat(sum) #</div>",
                        //groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                        //width: 100
                    },
                    {
                        title: "Tỷ lệ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "TyLe",
                        template: "#= TyLe # %",
                        attributes: {
                            class: "row_css"
                        },
                        aggregates: ["sum"],
                        footerTemplate: "<div class=\"row_css\">#= OnChangeFormat(sum.toFixed(3)) # %</div>",
                        //groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                        //width: 100
                    },
                    {
                        title: "Người nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Nguoi_Nhap",
                        attributes: {
                            class: "row_css"
                        },
                        //width: 100
                    },
                    {
                        title: "Ngày nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "Ngay_Nhap",                        
                        format: "{0:dd/MM/yyyy}",
                        attributes: {
                            class: "row_css"
                        },
                        //width: 100
                    },
                    {
                        template: function (data) {
                            if (data.TinhTrang_Dot == "0") {
                                return '<center><a class="btn btn-info" onclick="Ham_Sua_ThanhToanCT(' + data.Dot_ThanhToan_ID + ',' + data.Dot_ThanhToan_TienTrinh_ID + ',' + data.SoTien_TienTrinh + ');"><i class="fa fa-edit "></i> Sửa</a></center>'
                            }
                            else {
                                return ''
                            }
                            
                        },
                        width: "9%"
                    },
                    {

                        template: function (data) {
                            if (data.TinhTrang_Dot == "0") {
                                return '<center><a class="btn btn-danger" onclick="Ham_Xoa_ThanhToanCT(' + data.Dot_ThanhToan_TienTrinh_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                            } else {
                                return '';
                            }
                            
                        },
                        width: "8%"
                    }
                ]


            });

        }

    }).data('kendoGrid');


    var ds_tt_vattu = new kendo.data.DataSource({
        data: [],
        aggregate: [
            { field: "thanh_tien", aggregate: "sum" }
        ]
    });
    var grid_tt_vattu = $('#grid_tt_vattu').kendoGrid({
        columnResizeHandleWidth: 6,        
        pageable: {
            buttonCount: 2,
            messages: {
                display: '{2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
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
        dataSource: ds_tt_vattu,
        columns: [            
            {
                title: "nid",
                headerAttributes: {
                    class: "header_css"
                },
                field: "nid",
                attributes: {
                    class: "row_css"
                },
                width: 70
            },               
            {
                title: "Vật tư",
                headerAttributes: {
                    class: "header_css"
                },
                field: "mavt",
                //template: "<div>#= mavt #</div><br><div>#= tenvt #</div><div>#= dvt #</div>",
                template: function (data) {
                    return "<div>" + data.mavt + "</div><br><div>" + data.tenvt + "</div><div>~.~</div><div  style='font-weight:normal !important;'>" + data.dvt + "</div>";
                },
                attributes: {
                    class: "row_css",
                    style: "font-weight:bold;"
                },
                width: 170
            },
            //{
            //    title: "Số hợp đồng",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "so_hop_dong",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 150
            //},
            //{
            //    title: "Nhà thầu",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "nha_cung_cap",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 120
            //},
            {
                title: "Số PO",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_po",
                attributes: {
                    class: "row_css"
                },
                width: 100
            },
            {
                title: "Số lượng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_luong",
                template: "#= OnChangeFormat(so_luong) #",
                attributes: {
                    class: "row_css"
                },
                width: 70
            },
            
            {
                title: "Đơn giá",
                headerAttributes: {
                    class: "header_css"
                },
                field: "don_gia",
                template: "#= OnChangeFormat(don_gia) #",
                attributes: {
                    class: "row_css"
                },
                width: 120
            },
            {
                title: "Giá điều chỉnh",
                headerAttributes: {
                    class: "header_css"
                },
                field: "gia_dieu_chinh",
                template: "#= OnChangeFormat(gia_dieu_chinh) #",
                attributes: {
                    class: "row_css"
                },
                width: 50
            },
            {
                title: "Thành tiền",
                headerAttributes: {
                    class: "header_css"
                },
                field: "thanh_tien",
                template: "#= OnChangeFormat(thanh_tien) #",
                attributes: {
                    class: "row_css"
                },
                aggregates: ["sum"],
                footerTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                groupFooterTemplate: "<div class=\"row_css\">#=OnChangeFormat(sum) #</div>",
                width: 130
            },
            {
                title: "Tiền điều chỉnh",
                headerAttributes: {
                    class: "header_css"
                },
                field: "tien_dieu_chinh",
                template: "#= OnChangeFormat(tien_dieu_chinh) #",
                attributes: {
                    class: "row_css"
                },
                width: 50
            },
            //{
            //    title: "Đơn vị tính",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "dvt",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            {
                title: "Số phiếu nhập",
                headerAttributes: {
                    class: "header_css"
                },
                field: "so_phieu",
                attributes: {
                    class: "row_css"
                },
                width: 120
            },
            {
                title: "Ngày nhập",
                headerAttributes: {
                    class: "header_css"
                },
                field: "ngay_nhap",
                filterable: {
                    ui: "datepicker"
                },
                format: "{0:dd/MM/yyyy}",
                attributes: {
                    class: "row_css"
                },
                width: 120
            },
            //{
            //    title: "TK_NO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TK_NO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            //{
            //    title: "TKE_NO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TKE_NO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //},
            //{
            //    title: "TK_CO",
            //    headerAttributes: {
            //        class: "header_css"
            //    },
            //    field: "TK_CO",
            //    attributes: {
            //        class: "row_css"
            //    },
            //    width: 100
            //}
            {
                template: '<center><a class="btn btn-danger" onclick="Ham_Xoa_VatTu_TT(#= nid #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                width: "8%"
            }
        ]
    }).data('kendoGrid');
    
    //#endregion

    //#region event
    $('#btn_chon_vt').click(function (e) {
               
        for (var i in ItemChecked) {
            if (ItemChecked[i]) {

                var grid = $("#grid_ds_vattu").data("kendoGrid");
                var selectedTopic = grid.dataSource.getByUid(i);

                var check = 0;
                for (var i = 0; i < ds_tt_vattu.data().length; i++) {
                    if (ds_tt_vattu.data()[i].nid == selectedTopic.nid) {
                        check = 1;
                        break;
                    }
                }
                if (check == 0) {
                    ds_tt_vattu.add(selectedTopic);
                }
            }
        }

        for (var i = 0; i < $("#grid_ds_vattu tr").length; i++) {
            var className_ = $("#grid_ds_vattu tr")[i].className;

            if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

                $($("#grid_ds_vattu tr")[i]).removeClass("k-state-selected");
                $("#grid_ds_vattu tr")[i].cells[0].childNodes[0].childNodes[0].checked = false;
            }
        }
        ItemChecked = {};
                grid_tt_vattu.setDataSource(ds_tt_vattu);

        for (var i = 0; i < $("#grid_tt_vattu tr").length; i++) {

            var className_ = $("#grid_tt_vattu tr")[i].className;

            if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

                $($("#grid_tt_vattu tr")[i]).removeClass("k-state-selected");
            }
        }

    });
    //#region Xuất Ex
    $('#btn_ex').click(function (e) {

       
        $("#grid_Ex").kendoGrid({           
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_ThanhToan.aspx",
                            data: {
                                cmd: 'Xuat_Ex',
                                PO_NhaThau_ID: PO_NhaThau_ID
                            },
                            dataType: 'json',
                            success: function (result) {
                                options.success(result);
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
                    { field: "thanh_tien", aggregate: "sum" }
                ]
            }),          
            columns:
                [
                   {
                       title: "nid",
                       headerAttributes: {
                           class: "header_css"
                       },
                       field: "nid",
                       attributes: {
                           class: "row_css"
                       },
                       width: 70
                   },
                   {
                       title: "Mã vật tư",
                       headerAttributes: {
                           class: "header_css"
                       },
                       field: "mavt",
                       attributes: {
                           class: "row_css"
                       },
                       width: 70
                   },
                    {
                        title: "Vật tư",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tenvt",                        
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;"
                        },
                        width: 170
                    },
                    {
                        title: "Số hợp đồng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_hop_dong",
                        attributes: {
                            class: "row_css"
                        },
                        width: 150
                    },
                    {
                        title: "Nhà thầu",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "nha_cung_cap",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Số PO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_po",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Số lượng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_luong",
                        template: "#= OnChangeFormat(so_luong) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Đơn giá",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "don_gia",
                        template: "#= OnChangeFormat(don_gia) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Giá điều chỉnh",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "gia_dieu_chinh",
                        template: "#= OnChangeFormat(gia_dieu_chinh) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Thành tiền",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "thanh_tien",
                        template: "#= OnChangeFormat(thanh_tien) #",
                        attributes: {
                            class: "row_css"
                        },
                        aggregates: ["sum"],
                        footerTemplate: "Tổng cộng: #=OnChangeFormat(sum) #",
                        width: 130
                    },
                    {
                        title: "Tiền điều chỉnh",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tien_dieu_chinh",
                        template: "#= OnChangeFormat(tien_dieu_chinh) #",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Đơn vị tính",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "dvt",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "Số phiếu nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "so_phieu",
                        attributes: {
                            class: "row_css"
                        },
                        width: 120
                    },
                    {
                        title: "Ngày nhập",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "ngay_nhap",
                        type: "date",
                        format: "{0:dd/MM/yyyy}",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },

                    {
                        title: "TK_NO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tk_no",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "TKE_NO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tke_no",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    },
                    {
                        title: "TK_CO",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "tk_co",
                        attributes: {
                            class: "row_css"
                        },
                        width: 100
                    }

                ],
            excelExport: function (e) {

                e.workbook.sheets[0].rows.unshift({
                    cells: [
                        { value: "Số PO:" + $("#lb_SoPO").text() }
                    ]
                });

                e.workbook.sheets[0].rows.unshift({
                    cells: [
                        { value: "Mã hợp đồng:" + $("#lb_MaHD").text() }
                    ]
                });
                
                

            }

        });
        
        $("#grid_Ex").data("kendoGrid").saveAsExcel();
    });


    //#endregion

    //#region Thêm mới đợt thanh toán
    
    $('#btn_Them_TT').click(function (e) {

        //Làm sạch DS lưới vật tư thanh toán        
        ds_tt_vattu = new kendo.data.DataSource({
            data: [],
            aggregate: [
                { field: "thanh_tien", aggregate: "sum" }
            ]
        });
        grid_tt_vattu.setDataSource(ds_tt_vattu);

        // bỏ DS vào grid ds vật tư
        var ds = new kendo.data.DataSource({
            transport: {
                parameterMap: function (data, operation) {
                    return JSON.stringify(data);
                },
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                        data: {
                            cmd: 'Get_VT_ChuaTT_MaHD',                         
                            MaHD:MaHD
                        },
                        dataType: 'json',
                        success: function (result) {
                            options.success(result);
                        }
                    });
                }
            },
            schema: {
                model: {
                    fields: {                                
                        ngay_nhap: { type: "date" },
                        so_luong: { type: "number" },
                        don_gia: { type: "number" },
                        thanh_tien: { type: "number" }
                          
                    }
                }
            },
            pageSize: 5
        });
        grid_ds_vattu.setDataSource(ds);
        ////////////////////////////////

        //gvData.bind('dataBound', function () {

        //    var ds_HD = new kendo.data.DataSource({
        //        data: ds.data(),
        //        group: { field: "so_hop_dong" }
        //    });
        //    cmb_search_HD.setDataSource(ds_HD);

        //    var ds_NT = new kendo.data.DataSource({
        //        data: ds.data(),
        //        group: { field: "nha_cung_cap" }
        //    });
        //    cmb_search_NT.setDataSource(ds_NT);

        //    var ds_PO = new kendo.data.DataSource({
        //        data: ds.data(),
        //        group: { field: "so_po" }
        //    });
        //    cmb_search_PO.setDataSource(ds_PO);

        //});

        ///////////////////////////////////////////////
        wd_DotThanhToan.center().open();

        $("#txt_SoTien").val("");
        $("#txt_SoChungTu").val("");
        $("#txt_NgayChungTu").val("");
        $("#txt_NoiDung").val("");
        $("#cmb_LoaiTienTrinh").data("kendoDropDownList").value("");

    });
    $('#btn_Luu_TT').click(function (e) {
        
        

        var check = 0;
        var TienChuaThanhToan = parseFloat($("#lb_TongTienChuaThanhToan").text().replace(/\,/g, "").trim());
        var TienVatTuThanhToan = parseFloat($("#grid_tt_vattu .k-footer-template").text().replace(/\,/g, "").trim());

        if (TienVatTuThanhToan == 0) {
            check = 1;
            
            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn vật tư cần thanh toán!",
                message: ""
            }, "error");

            return;
        }
        if (TienVatTuThanhToan > TienChuaThanhToan) {
            check = 1;           
            $("#notification").data("kendoNotification").show({
                title: "Số tiền thanh toán vượt!",
                message: ""
            }, "error");
            return;
        }
        if ($("#txt_SoTien").val() == "") {
            check = 1;            
            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập số tiền thanh toán thực tế!",
                message: ""
            }, "error");
            return;
        }
        if ( parseFloat($("#txt_SoTien").val().replace(/\,/g, "").trim()) > TienVatTuThanhToan) {
            check = 1;
            $("#notification").data("kendoNotification").show({
                title: "Số tiền thanh toán thực tế lớn hơn số tiền phải thanh toán!",
                message: ""
            }, "error");
            return;
        }
        if ($("#txt_SoChungTu").val() == "") {
            check = 1;
            
            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập số chứng từ!",
                message: ""
            }, "error");
            return;
        }
        if ($("#txt_NgayChungTu").val() == "") {
            check = 1;
            
            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập ngày chứng từ!",
                message: ""
            }, "error");
            return;
        }
        if ($("#cmb_LoaiTienTrinh").data("kendoDropDownList").value() == "") {
            check = 1;
            
            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn loại tiến trình!",
                message: ""
            }, "error");
            return;
        }
        if (check == 0) {

            var request = $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_ThanhToan.aspx",
                data: {
                    cmd: 'Dot_ThanhToan_Create',
                    SoTien: $("#grid_tt_vattu .k-footer-template").text().replace(/\,/g, "").trim(),                                    
                    SoChungTu: $("#txt_SoChungTu").val().trim(),
                    NgayChungTu: $("#txt_NgayChungTu").val().trim(),
                    PO_NhaThau_ID: PO_NhaThau_ID,
                    LoaiTienTrinh: $("#cmb_LoaiTienTrinh").data("kendoDropDownList").value(),
                    NoiDung: $("#txt_NoiDung").val().trim(),
                    Path: Path,
                    ChiTiet_VT: JSON.stringify(ds_tt_vattu.data()),
                    SoPO: $("#lb_SoPO").text().trim(),
                    SoTienThucTe: $("#txt_SoTien").val().replace(/\,/g, "").trim()
                },
                dataType: 'json'
            });
            request.done(function (msg) {

                if (msg[0].ErrorMessage == null) {

                    $("#notification").data("kendoNotification").show({
                        message: "Đã tạo mới đợt thanh toán!"
                    }, "upload-success");

                    wd_DotThanhToan.close();

                    /////////////////////
                    Ham_Reload_ThanhToan();
                    uploadReset();
                }
                else {
                    $("#notification").data("kendoNotification").show({
                        title: msg[0].ErrorMessage,
                        message: "Hãy thao tác lại!"
                    }, "error");
                }

            });
            request.fail(function (jqXHR, textStatus) {

                
                $("#notification").data("kendoNotification").show({
                    title: "Request failed: " + textStatus,
                    message: "Hãy thao tác lại!"
                }, "error");
            });
        }
    });
    $('#btn_Huy_TT').click(function (e) {
        wd_DotThanhToan.close();
    });
    //#endregion
    
    //#endregion
});

function Ham_Xoa_VatTu_TT(p_NID) {
    
    for (var i = 0; i < $('#grid_tt_vattu').data('kendoGrid').dataSource.data().length; i++) {

        var item = $('#grid_tt_vattu').data('kendoGrid').dataSource.data()[i];
        if (item.nid == p_NID) {
            $('#grid_tt_vattu').data('kendoGrid').dataSource.remove(item);
        }
    }

    for (var i = 0; i < $("#grid_tt_vattu tr").length; i++) {
        var className_ = $("#grid_tt_vattu tr")[i].className;

        if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

            $($("#grid_tt_vattu tr")[i]).removeClass("k-state-selected");
            $("#grid_tt_vattu tr")[i].cells[0].childNodes[0].childNodes[0].checked = false;
        }
    }

}


//#region Hiển thị
function HienThi_ThanhToan(p_PO_NhaThau_ID, p_NhaThau_Ten, p_MaHD, p_TongTienThanhToan, p_SoTienDaThanhToan, p_TyLeDaThanhToan, p_SoTienChuaThanhToan, p_TyLeChuaThanhToan, p_TinhTrang_ThanhToan, p_GiaTriTruocThue, p_SoTienChuaThanhToan_HD,p_SoPO) {

    $('#div_thanhtoan').show();
    $('#btn_Back').show();
    $('#div_timkiem').hide();

    PO_NhaThau_ID = p_PO_NhaThau_ID;
    MaHD = p_MaHD;

    $('#lb_NhaThau').text(p_NhaThau_Ten);
    $('#lb_MaHD').text(p_MaHD);
    $('#lb_SoPO').text(p_SoPO);

    $('#lb_TongTienThanhToan').text(OnChangeFormat(p_TongTienThanhToan));

    $('#lb_TongHD').text(OnChangeFormat(p_GiaTriTruocThue));
    $('#lb_ConLaiHD').text(p_SoTienChuaThanhToan_HD == null ? 0 : OnChangeFormat(p_SoTienChuaThanhToan_HD));
    $('#lb_TyLeConLaiHD').text('( ' + ((p_SoTienChuaThanhToan_HD / p_GiaTriTruocThue) * 100).toFixed(3) + '% )');
    

    if (p_SoTienDaThanhToan == null) {

        $('#lb_TongTienDaThanhToan').text("0");
        $('#lb_TyLeThanhToan').text('( 0 % )');
    }
    else {
        $('#lb_TongTienDaThanhToan').text(OnChangeFormat(p_SoTienDaThanhToan));
        $('#lb_TyLeThanhToan').text('( ' + p_TyLeDaThanhToan.toFixed(3) + '% )');
    }

    if (p_SoTienChuaThanhToan == null) {

        $('#lb_TongTienChuaThanhToan').text(OnChangeFormat(p_TongTienThanhToan));
        $('#lb_TyLeChuaThanhToan').text('( 100 % )');
    }
    else {

        $('#lb_TongTienChuaThanhToan').text(OnChangeFormat(p_SoTienChuaThanhToan));
        $('#lb_TyLeChuaThanhToan').text('( ' + p_TyLeChuaThanhToan.toFixed(3) + '% )');
    }


    if (p_TinhTrang_ThanhToan==0) {

        $('#lb_TT_TT').text('CHƯA HOÀN TẤT THANH TOÁN').css('color','red');
        $('#btn_Them_TT').show();
        

    } else {
        $('#lb_TT_TT').text('ĐÃ HOÀN TẤT THANH TOÁN').css('color', 'green');
        $('#btn_Them_TT').hide();
    }


    /////////////////////////////////////////////////////

    var DS_DotThanhToan = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'Dot_ThanhToan_selectByPONT',
                        PO_NhaThau: p_PO_NhaThau_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        options.success(result);
                    }
                });
            }
        }               
    });
    $("#grid_ThanhToan").data('kendoGrid').setDataSource(DS_DotThanhToan);
    
    
    
}


var ItemChecked = {};
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#grid_ds_vattu").data("kendoGrid"),
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

function Ham_TroLai() {

    $('#div_thanhtoan').hide();
    $('#btn_Back').hide();
    $('#div_timkiem').show();
}

//#endregion

//#region Sửa đợt thanh toán

function Ham_Sua_ThanhToan(p_Dot_ThanhToan_ID, p_SoTien, p_SoChungTu, p_NgayChungTu_f, p_LoaiTienTrinh, p_NoiDung, p_FileVB) {
    
    $("#wd_DotThanhToan_Sua").data("kendoWindow").center().open();
    Dot_ThanhToan_ID = p_Dot_ThanhToan_ID;

    $("#lb_SoTien_TT_Sua").text(OnChangeFormat(p_SoTien));

    $("#txt_SoChungTu_Sua").val(p_SoChungTu);
    $("#txt_NgayChungTu_Sua").val(p_NgayChungTu_f);

    $("#cmb_LoaiTienTrinh_Sua").data("kendoDropDownList").value(p_LoaiTienTrinh)
    $("#txt_NoiDung_Sua").val(p_NoiDung);
    
    Path_Sua = p_FileVB;
    
    
    if (p_FileVB == "" || p_FileVB == "null") {

        $("#tr_download").hide();
        $("#tr_upload").show();

    
    } else {
    

        $("#tr_download").show();
        $("#tr_upload").hide();

        $("#btn_download").attr("href", "" + p_FileVB + "");



    }
    
}
function Ham_Luu_Sua_DotThanhToan() {

    var check = 0;

    
    if ($("#txt_SoChungTu_Sua").val() == "") {
        check = 1;
        
        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập số chứng từ!"
        }, "error");
        return;
    }
    if ($("#txt_NgayChungTu_Sua").val() == "") {
        check = 1;
        
        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập ngày chứng từ!"
        }, "error");
        return;
    }
    if ($("#cmb_LoaiTienTrinh_Sua").data("kendoDropDownList").value() == "") {
        check = 1;
        
        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa chọn loại tiến trình!"
        }, "error");
        return;
    }
    if (check == 0) {
        
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'Dot_ThanhToan_Update',
                SoTien: $("#lb_SoTien_TT_Sua").text().replace(/\,/g, "").trim(),
                SoChungTu: $("#txt_SoChungTu_Sua").val().trim(),
                NgayChungTu: $("#txt_NgayChungTu_Sua").val().trim(),
                Dot_ThanhToan_ID: Dot_ThanhToan_ID,
                PO_NhaThau_ID: PO_NhaThau_ID,
                LoaiTienTrinh: $("#cmb_LoaiTienTrinh_Sua").data("kendoDropDownList").value(),
                NoiDung: $("#txt_NoiDung_Sua").val().trim(),
                Path: Path_Sua
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                
                $("#notification").data("kendoNotification").show({
                    message: "Đã sửa đợt thanh toán thành công!"
                }, "upload-success");
                $("#wd_DotThanhToan_Sua").data("kendoWindow").close();
                Ham_Reload_ThanhToan();

            }
            else {
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {

            $("#notification").data("kendoNotification").show({
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");
        });
    }
}
function Ham_Huy_Sua_DotThanhToan() {
    $("#wd_DotThanhToan_Sua").data("kendoWindow").close();
}

//#endregion

//#region Xóa đợt thanh toán
function Ham_Xoa_ThanhToan(p_Dot_ThanhToan_ID) {

    if (confirm("Bạn có chắc muốn xóa vật tư này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'Dot_ThanhToan_Delete',
                Dot_ThanhToan_ID: p_Dot_ThanhToan_ID,
                PO_NhaThau_ID: PO_NhaThau_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
               
                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công đợt thanh toán!"
                }, "upload-success");

                Ham_Reload_ThanhToan();
            }
            else {
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {

            $("#notification").data("kendoNotification").show({
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");
        });
    }
}
//#endregion 

//#region Refresh

function Ham_Reload_ThanhToan() {

    var ds = new kendo.data.DataSource({

        error: function () {
            $("#notification").data("kendoNotification").show({
                title: "Lỗi đường truyền!",
                message: "Hãy thao tác lại!"
            }, "error");
        },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'PO_NhaThau_byNT',
                        NhaThau_ID: NhaThau_ID

                    },
                    dataType: 'json',
                    success: function (result) {
                        options.success(result);
                    }
                });
            }
        }

    });
    ds.fetch(function () {
        var dataSource = ds.data();

        var filters = {
            logic: "or", filters: [{ field: "PO_NhaThau_ID", operator: "eq", value: PO_NhaThau_ID }]
        }
        var query = new kendo.data.Query(dataSource);
        var data = query.filter(filters).data;

        HienThi_ThanhToan(PO_NhaThau_ID, data[0].NhaThau_Ten, data[0].MaHD, data[0].TongTienThanhToan, data[0].SoTienDaThanhToan, data[0].TyLeDaThanhToan, data[0].SoTienChuaThanhToan, data[0].TyLeChuaThanhToan, data[0].TinhTrang_ThanhToan, data[0].GiaTriTruocThue, data[0].SoTienChuaThanhToan_HD, data[0].SoPO);

    });
}
function GetPriceText(id) {

    var variable = document.getElementById(id);
    var new_value = variable.value.replace(/\,/g, "");
    variable.value = OnChangeFormat(new_value);    
}

function uploadReset(id) {

    if (id) {
        //if an id is passed as a param, only reset the element's child upload controls (in case many upload widgets exist)
        $("#" + id + " .k-upload-files").remove();
        $("#" + id + " .k-upload-status").remove();
        $("#" + id + " .k-upload.k-header").addClass("k-upload-empty");
        $("#" + id + " .k-upload-button").removeClass("k-state-focused");
    } else {
        //reset all the upload things!
        $(".k-upload-files").remove();
        $(".k-upload-status").remove();
        $(".k-upload.k-header").addClass("k-upload-empty");
        $(".k-upload-button").removeClass("k-state-focused");
    }
}

//#endregion Refresh

//#region Thanh toán chi tiết
function Ham_Xoa_ThanhToanCT(p_Dot_ThanhToan_TienTrinh_ID) {

    if (confirm("Bạn có chắc muốn xóa lần thanh toán này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'ThanhToan_ChiTiet_Xoa',
                Dot_ThanhToan_TienTrinh_ID: p_Dot_ThanhToan_TienTrinh_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công lần thanh toán!"
                }, "upload-success");
                $("#grid_ThanhToan").data("kendoGrid").dataSource.read();
                $("#tab_ThanhToan").data("kendoGrid").dataSource.read();
                Ham_Reload_ThanhToan();
            }
            else {
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {

            $("#notification").data("kendoNotification").show({
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");
        });
    }
}
function Ham_Sua_ThanhToanCT(p_Dot_ThanhToan_ID, p_Dot_ThanhToan_TienTrinh_ID, p_SoTien_TienTrinh) {
    
    $("#wd_ChiTietTT").data("kendoWindow").center().open();
    $("#hf_Dot_ThanhToan_TienTrinh_ID").val(p_Dot_ThanhToan_TienTrinh_ID);
    Dot_ThanhToan_ID = p_Dot_ThanhToan_ID;
    $("#txt_SoTien_CT").val(OnChangeFormat(p_SoTien_TienTrinh));
    
    $("#tr_SoTienConLai").hide();
    
    
}

function Ham_ThanhToan_TienTrinh(p_Dot_ThanhToan_ID, p_SoTienConLai) {

    $("#wd_ChiTietTT").data("kendoWindow").center().open();
    $("#hf_Dot_ThanhToan_TienTrinh_ID").val("");
    $("#lb_TienConLai").text(OnChangeFormat(p_SoTienConLai));
    $("#txt_SoTien_CT").val("");
    
    $("#tr_SoTienConLai").show();

    Dot_ThanhToan_ID = p_Dot_ThanhToan_ID;
}
function Ham_Luu_CTTT() {


    if ($("#txt_SoTien_CT").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Chưa nhập tiền thanh toán thực tế!"
        }, "error");
        return;
    }
    if (parseFloat($("#txt_SoTien_CT").val().replace(/\,/g, "")) > parseFloat($("#lb_TienConLai").text().replace(/\,/g, ""))) {

        $("#notification").data("kendoNotification").show({
            title: "",
            message: "Số tiền vượt số tiền cần thanh toán!"
        }, "error");
        return;
    }
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'ThanhToan_ChiTiet_CapNhat',
            SoTien_TienTrinh: $("#txt_SoTien_CT").val(),
            Dot_ThanhToan_ID:Dot_ThanhToan_ID,
            Dot_ThanhToan_TienTrinh_ID: $("#hf_DangKy_ID").val()            
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã cập nhật thành công!"
            }, "upload-success");

            $("#grid_ThanhToan").data("kendoGrid").dataSource.read();
            $("#tab_ThanhToan").data("kendoGrid").dataSource.read();
            Ham_Reload_ThanhToan();
            $("#wd_ChiTietTT").data("kendoWindow").close();
        }
        else {
            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
            }, "error");
        }

    });
    request.fail(function (jqXHR, textStatus) {

        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });  
}
//#endregion

function Ham_DongKhoa(p_Dot_ThanhToan_ID) {

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'DongKhoa_ThanhToan',
            Dot_ThanhToan_ID: p_Dot_ThanhToan_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        $("#grid_ThanhToan").data("kendoGrid").dataSource.read();
        $("#tab_ThanhToan").data("kendoGrid").dataSource.read();

    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });
}
function Ham_MoKhoa(p_Dot_ThanhToan_ID) {
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'MoKhoa_ThanhToan',
            Dot_ThanhToan_ID: p_Dot_ThanhToan_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        $("#grid_ThanhToan").data("kendoGrid").dataSource.read();
        $("#tab_ThanhToan").data("kendoGrid").dataSource.read();

    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });
}