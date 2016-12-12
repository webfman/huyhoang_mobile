var DS_DonVi, DS_PO;
var DS_VatTu, DS_SoHD, DS_TenVT, DS_MaTD, HopDong_ID;
var PO_ID_Sua, PO_ID_Chuyen;
var PO_HD_ID;
var BienChiTietPO, Bien_ChiTiet_VatTu;
var VatTu_ID_PO;
var Path, Path_Sua, Path_cd;
var VatTu_ID, MaDVT;
var DS_VatTu_PO;
var Path_PO;

$(document).ready(function () {
    //document.oncontextmenu = function () { return false; }

    //$("#main-menu-toggle").click();

    $("#main-menu-min").click();

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
            e.data = { LoaiFile: 'VBPO_Lon' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
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
            e.data = { LoaiFile: 'VBPO_Lon' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });

    $('#btn_sua_upload').click(function () {

        $("#tr_download").hide();
        $("#tr_upload").show();
        Path_Sua = "";
    });



    $('#files_upload_cd').kendoUpload({
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
            e.data = { LoaiFile: 'VBPO_Lon' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });

    $('#btn_cd_upload').click(function () {

        $("#tr_download_cd").hide();
        $("#tr_upload_cd").show();
        Path_cd = "";
    });



    $('#fileUpload_PO').kendoUpload({
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

            Path_PO = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            var c = confirm('Vui lòng xác nhận file đã chọn là chính xác');
            if (!c) {
                e.preventDefault();
                return;
            }
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng <b>.pdf</b>, <b>.doc</b> hoặc <b>.docx</b>');
                return;
            }
            e.data = { LoaiFile: 'VBPO_Con' };
        }
    });


    //#endregion
    //#region DataSource

    DS_MaTD = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                    data: {
                        cmd: 'HopDong_CT_SelectAll_MaTD'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    DS_TenVT = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                    data: {
                        cmd: 'HopDong_CT_SelectAll_TenVT'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    DS_SoHD = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                    data: {
                        cmd: 'HopDong_CT_SelectAll_MaHD'
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
    DS_DonVi = new kendo.data.DataSource({
        sort: { field: "ID", dir: "asc" },
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_DonVi'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    DS_VatTu = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                    data: {
                        cmd: 'HopDong_CT_SelectAll'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize: 5

    });
    DS_PO = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
                    data: {
                        cmd: 'Lay_DS_PO'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    //#endregion
    //#region Control
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

    $("#wd_ChonVatTu_Vuot").kendoWindow({
        draggable: false,
        height: "70%",
        width: "90%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư thường PO lớn",
        visible: false

    }).data("kendoWindow");

    $("#wd_List_Option").kendoWindow({
        draggable: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư thường theo:",
        visible: false,
        height: "auto",
        width: "30%",
        actions: false

    }).data("kendoWindow");

    $("#wd_DatHang").kendoWindow({
        draggable: false,
        modal: true,
        resizable: false,
        title: "Xuất đơn hàng Ảo",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#wd_VatTu_PO").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới vật tư PO lớn Ảo",
        visible: false,

    }).data("kendoWindow");
    $("#wd_VatTu_PO_Sua").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Sửa vật tư PO lớn Ảo",
        visible: false,

    }).data("kendoWindow");

    $("#wd_Show_VatTu").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Tìm vật tư",
        visible: false,

    }).data("kendoWindow");


    $("#wd_PO_them").kendoWindow({
        draggable: false,
        height: "100%",
        width: "90%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Tạo mới PO Ảo",
        visible: false,

    }).data("kendoWindow");

    $("#wd_PhanRa").kendoWindow({
        draggable: false,
        height: "60%",
        width: "40%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Phân rã PO Ảo",
        visible: false,

    }).data("kendoWindow");

    $("#wd_PO_Sua").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: false,
        modal: true,
        resizable: false,
        title: "Sửa PO Ảo",
        visible: false,

    }).data("kendoWindow");

    
    $("#wd_Chuyen").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Chuyển sang PO thật",
        visible: false,

    }).data("kendoWindow");
    $("#txt_NgayVB").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayBatDau").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayKy").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayGiaoHang").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#Ngay_GH").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#Ngay_KHGH").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayKy_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayKy_cd").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayGiaoHang_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#Ngay_GH_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#Ngay_KHGH_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $(".k-input").prop('disabled', true);
    $("#txt_SoNgayTH").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_SoNgayGH").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_SoNgayGH_Sua").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_SoLuong_PO").kendoNumericTextBox({
        format: 'n3',
        decimals: 3
    });

    $("#txt_SoLuong_PO_Sua").kendoNumericTextBox({
        //format: "#.###",
        //format: "#.0000"
        format: 'n3',
        decimals: 3
    });

    //#endregion
    //#region Load danh sách đơn vị tạo PO

    $("#grid_DonVi_Sua").empty();
    $("#grid_DonVi_Sua").kendoGrid({
        dataSource: DS_DonVi,
        scrollable: true,
        columns:
            [
                { field: "ID", hidden: true },
                {
                    field: "select_dv",
                    title: "Chọn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: '<center><input type=\'checkbox\' /></center>',
                    sortable: false,
                    width: 80,

                },
                {
                    title: "Mã đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_ID",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    });
    ///////// Load danh sách đơn vị\\\\\\\\\\\


    $("#grid_DonVi").empty();
    var grid_donvi = $("#grid_DonVi").kendoGrid({
        dataSource: DS_DonVi,
        toolbar: kendo.template($("#Templ_DonVi").html()),
        columns:
            [
                { field: "ID", hidden: true },
                {
                    field: "select_dv",
                    title: "<input id='chk_all' type='checkbox' />",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: '<center><input type=\'checkbox\' /></center>',
                    sortable: false,
                    width: 80,

                },
                {
                    title: "Mã đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_ID",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    });
    var dropDown = grid_donvi.find("#dl_KhuVuc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "--Tất cả--",
        dataSource: [
            { text: "VNPT khu vực phía Bắc", value: "B" },
            { text: "VNPT khu vực phía Nam", value: "N" }
        ],
        change: function () {
            var value = this.value();
            if (value) {
                grid_donvi.data("kendoGrid").dataSource.filter({ field: "KhuVuc", operator: "eq", value: value });
                document.getElementById('chk_all').checked = false;
            } else {
                grid_donvi.data("kendoGrid").dataSource.filter({});
            }
        }
    });

    $("#chk_all").click(function () {

        if (document.getElementById('chk_all').checked) {

            for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

                $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = true;
            }
        }
        else {
            for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

                $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;
            }
        }

    });
    //#endregion

    //#region Load Danh sach PO 
    $("#grid_PO").empty();
    $("#grid_PO").kendoGrid({
        dataSource: DS_PO,
        toolbar: kendo.template($("#Templ_PO").html()),
        detailTemplate: kendo.template($("#Templ_ChiTiet_PO").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        pageable: {
            messages: {
                display: "Tổng số   {2}   PO",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        detailInit: Ham_ChiTiet_PO,
        sortable: true,
        columns:
            [
                {
                    title: "Tình trạng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Check_PO",
                    template: function (data) {

                        if (data.Check_PO == '0') {
                            return '<center><span class="label label-success">Chưa xuất</span></center>';
                        }
                        else {
                            return '<center><span class="label label-important">Đã xuất</span></center>';
                        }
                    },
                    width: "8%"
                },
                {
                    title: "Số PO Ảo",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoPO",
                    attributes: {
                        class: "row_css",
						style: "font-weight:bold;"
                    },
                    template: function (data) {

                        if (data.TinhTrangChuyen == 0) {
                            return data.SoPO
                        }
                        else {
                            
                            return "<div  style='font-weight:normal !important;'>" + data.SoPO + "</div><div>~.~</div><div style='color:red;'>" + data.SoPO_That + "</div>";
                        }
                    },
                },
                {
                    title: "Ngày ký PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKyPO",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Số văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVanBan",
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
                },
                {
                    template: function (data) {

                        if (data.Check_PO == 1 || data.TinhTrangChuyen == 1) {
                            return '';

                        } else {
                            
                            return '<center><a class="btn btn-info" onclick="Ham_SuaPO(' + data.PO_ID + ');" ><i class="fa fa-edit "></i> Sửa</a></center>'
                        }
                    },
                    width: "9%"
                },
                {

                    template: function Ham_HienThi_Xoa_PO(data) {
                        //if (data.Check_PO == 1 || data.TinhTrangChuyen == 1) {
                        //    return '';
                        //} else {                            
                            return '<center><a class="btn btn-danger" onclick="Ham_XoaPO(' + data.PO_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                        //}
                    },
                    width: "8%"
                },
                {
                    template: function (data) {

                        if (data.TinhTrangChuyen == 0) {
                            return '<center><a class="btn btn-success" onclick="Ham_ChuyenDoi(' + data.PO_ID + ');"><i class="fa fa-repeat"></i> Chuyển</a></center>';
                        }
                        else {
                            return '<center><a class="btn btn-warning" ><i class="fa fa-check"></i> Đã Chuyển</a></center>';
                        }
                    },
                    width: "11%"
                }
            ]
    });

    $("#txt_search_soPO").kendoAutoComplete({
        dataTextField: "SoPO",
        dataSource: DS_PO,
        filter: "contains",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.SoPO;

            if (value) {

                $("#grid_PO").data("kendoGrid").dataSource.filter({ field: "SoPO", operator: "eq", value: value });
            }
            else {
                $("#grid_PO").data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_soPO").val('');
        }

    });
    $("#btn_clear_soPO").click(function (e) {
        e.preventDefault();
        $("#txt_search_soPO").val('');
        $("#grid_PO").data("kendoGrid").dataSource.filter({});
    });


    //#endregion


});
//#region Sửa PO
function Ham_SuaPO(p_PO_ID) {

    $("#wd_PO_Sua").data("kendoWindow").center().open();

    PO_ID_Sua = p_PO_ID;

    var grid_data = $("#grid_PO").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.PO_ID == p_PO_ID;
    });

    $("#txt_SoPO_Sua").val(res[0].SoPO);
    $("#txt_NgayKy_Sua").val(res[0].NgayKyPO);
    $("#txt_VB_Sua").val(res[0].SoVanBan);


    //Load check đơn vị

    var arr_dv = res[0].Str_PO_DonVi.split(",");    

    for (var j = 1; j < $("#grid_DonVi_Sua tr").length; j++) {

        $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;

        arr_dv.forEach(function (entry) {

            if ($("#grid_DonVi_Sua tr")[j].cells[0].childNodes[0].textContent == entry) {

                $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0].checked = true;

            }
        });

    }

    Path_Sua = res[0].FileVB;

    if (res[0].FileVB == "" || res[0].FileVB == null) {

        $("#tr_download").hide();
        $("#tr_upload").show();


    } else {

        $("#tr_download").show();
        $("#tr_upload").hide();

        $("#btn_download").attr("href", "" + res[0].FileVB + "");



    }

}
function Ham_Sua_PO_Luu() {

    var str_id_dv = '';

    for (var j = 1; j < $("#grid_DonVi_Sua tr").length; j++) {

        var chb_dv = $("#grid_DonVi_Sua tr")[j].cells[1].childNodes[0].childNodes[0];

        var id = $("#grid_DonVi_Sua tr")[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_dv += '' + id + ',';

        }
    }
    str_id_dv = str_id_dv.replace(/^,|,$/g, '');

    var check = 0;

    if ($("#txt_SoPO_Sua").val() == "") {
        check = 1;
        alert("Chưa nhập số PO!");
        return;
    }
    //if ($("#txt_NgayKy_Sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày ký PO!");
    //    return;
    //}
    //if ($("#txt_VB_Sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập văn bản xác nhận PO!");
    //    return;
    //}
    //if ($("#txt_NgayGiaoHang_Sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày giao hàng!");
    //    return;
    //}
    //if ($("#txt_SoNgayGH_Sua").data("kendoNumericTextBox").value() == "" || $("#txt_SoNgayGH_Sua").data("kendoNumericTextBox").value() == "0") {
    //    check = 1;
    //    alert("Chưa nhập số ngày giao hàng!");
    //    return;
    //}
    //if ($("#Ngay_GH_Sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày xác nhận giao hàng!");
    //    return;
    //}
    //if ($("#Ngay_KHGH_Sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày kế hoạch giao hàng!");
    //    return;
    //}
    if (str_id_dv == '') {
        check = 1;
        alert("Chưa chọn đơn vị tham gia!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
            data: {
                cmd: 'PO_Update',
                PO_ID: PO_ID_Sua,
                SoPO: $("#txt_SoPO_Sua").val(),
                NgayKyPO: $("#txt_NgayKy_Sua").val(),
                SoVanBan: $("#txt_VB_Sua").val(),
                DonViPO: str_id_dv,

                //SoNgayGH: $("#txt_SoNgayGH_Sua").data("kendoNumericTextBox").value(),
                //NgayGiaoHang: $("#txt_NgayGiaoHang_Sua").val(),
                //NgayXacNhanGH: $("#Ngay_GH_Sua").val(),
                //NgayKeHoachGH: $("#Ngay_KHGH_Sua").val(),

                SoNgayGH: 0,
                NgayGiaoHang: "",
                NgayXacNhanGH: "",
                NgayKeHoachGH: "",
                FileVB: Path_Sua
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa thành công PO!");
                $("#wd_PO_Sua").data("kendoWindow").close();
                DS_PO.read();
                uploadReset();
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
function Ham_Sua_PO_Huy() {
    $("#wd_PO_Sua").data("kendoWindow").close();
    uploadReset();
}
//#endregion
//#region Xóa PO
function Ham_XoaPO(PO_ID) {

    if (confirm("Bạn có chắc muốn xóa PO này không? Xóa tất cả từ PO con,PO chi tiết")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
            data: {
                cmd: 'PO_Delete',
                PO_ID: PO_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                alert("Đã xóa thành công PO!");
                DS_PO.read();

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
//#region Thêm mới PO

function Ham_Them_PO() {
    $("#wd_PO_them").data("kendoWindow").center().open();
}
function Ham_Them_PO_Luu() {

    var str_id_dv = '';

    for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

        var chb_dv = $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0];

        var id = $("#grid_DonVi tr")[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_dv += '' + id + ',';

        }
    }
    str_id_dv = str_id_dv.replace(/^,|,$/g, '');

    var check = 0;
    if ($("#txt_SoPO").val() == "") {
        check = 1;
        alert("Chưa nhập số PO!");
        return;
    }
    //if ($("#txt_NgayKy").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày ký PO!");
    //    return;
    //}
    //if ($("#txt_VB").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập văn bản xác nhận PO!");
    //    return;
    //}
    //if ($("#txt_NgayGiaoHang").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày giao hàng!");
    //    return;
    //}
    //if ($("#txt_SoNgayGH").data("kendoNumericTextBox").value() == "" || $("#txt_SoNgayGH").data("kendoNumericTextBox").value() == "0") {
    //    check = 1;
    //    alert("Chưa nhập số ngày giao hàng!");
    //    return;
    //}
    //if ($("#Ngay_GH").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày xác nhận giao hàng!");
    //    return;
    //}
    //if ($("#Ngay_KHGH").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập ngày kế hoạch giao hàng!");
    //    return;
    //}
    if (str_id_dv == '') {
        check = 1;
        alert("Chưa chọn đơn vị tham gia!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
            data: {
                cmd: 'PO_Create',
                SoPO: $("#txt_SoPO").val(),
                NgayKyPO: $("#txt_NgayKy").val(),
                SoVanBan: $("#txt_VB").val(),
                DonViPO: str_id_dv,
                //SoNgayGH: $("#txt_SoNgayGH").data("kendoNumericTextBox").value(),
                //NgayGiaoHang: $("#txt_NgayGiaoHang").val(),
                //NgayXacNhanGH: $("#Ngay_GH").val(),
                //NgayKeHoachGH: $("#Ngay_KHGH").val(),
                SoNgayGH: 0,
                NgayGiaoHang: "",
                NgayXacNhanGH: "",
                NgayKeHoachGH: "",
                FileVB: Path

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã tạo mới thành công PO!");
                $("#wd_PO_them").data("kendoWindow").close();
                DS_PO.read();
                Ham_Clear_Form_PO();
                uploadReset();
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
function Ham_Them_PO_Huy() {
    $("#wd_PO_them").data("kendoWindow").close();
    uploadReset();
}
function Ham_Clear_Form_PO() {

    $("#txt_SoPO").val("");
    $("#txt_NgayKy").val("");
    $("#txt_VB").val("");

    for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

        $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0].checked = false;
    }

}

//#endregion

//#region Hiển thị chi tiết PO
function Ham_ChiTiet_PO(e) {

    BienChiTietPO = e;

    var detailRow = e.detailRow;


    detailRow.find("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        },
        select: function (e) {

            //alert($("#tabstrip").data("kendoTabStrip").select().index());
            //$(e.item).find("> .k-link").text().trim()
            //alert(this.select().index());

            var content_tab = $(e.item).find("> .k-link").text().trim();
            switch (content_tab) {
                case "Danh sách đơn vị tham gia PO Ảo":
                    //#region Hiển thị danh sách đơn vị tham gia PO
                    detailRow.find("#tab_DonVi").empty();
                    detailRow.find("#tab_DonVi").kendoGrid({

                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
                                        data: {
                                            cmd: 'PO_DonVi_SelectbyPO_ID',
                                            PO_ID: BienChiTietPO.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    });
                                }
                            },
                            pageSize: 8
                        }),
                        sortable: true,
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
                                    title: "STT",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "STT",
                                    attributes: {
                                        class: "row_css"
                                    },
                                    width: "30%"
                                },
                                {
                                    title: "Đơn vị",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "DonVi_Ten",
                                    attributes: {
                                        class: "row_css"
                                    }
                                }
                            ]
                    });
                    //#endregion
                    break;
                case "Hiển thị phân rã đơn vị":
                    //#region Hiển thị Phân rã đơn vị
                    detailRow.find("#tab_PhanRa_DV").empty();
                    detailRow.find("#tab_PhanRa_DV").kendoGrid({

                        dataSource: new kendo.data.DataSource({

                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Con_Ao.aspx",
                                        data: {
                                            cmd: 'Lay_DS_PO_Con',
                                            PO_ID: BienChiTietPO.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                                            }
                                            else {
                                                options.success(result);
                                            }
                                        }
                                    });
                                }
                            }

                        }),
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
                        detailInit: function (e) {
                            e.detailCell.empty();
                            $("<div/>").appendTo(e.detailCell).kendoGrid({
                                dataSource: new kendo.data.DataSource({
                                    transport: {
                                        read: function (options) {
                                            $.ajax({
                                                type: "POST",
                                                url: "assets/ajax/Ajax_PO_CT_Ao.aspx",
                                                data: {
                                                    cmd: 'PO_CT_SelectByPO_ID_Con',
                                                    PO_ID_Con: e.data.PO_ID_Con
                                                },
                                                dataType: 'json',
                                                success: function (result) {
                                                    if (result == "err401") {
                                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                        window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                                                    }
                                                    else {
                                                        options.success(result);
                                                    }
                                                }
                                            });
                                        }
                                    },
                                    aggregate: [
                                            { field: "ThanhTien", aggregate: "sum" }
                                    ]
                                }),
                                columns:
                                    [
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
                                        title: "Thành tiền",
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
                                        }
                                    }
                                    ]
                            });
                        },
                        columns:
                            [
                                {
                                    title: "Đơn vị",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "DonVi_Ten",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight: bold !important;text-align: left !important;"
                                    }
                                }
                            ]


                    });

                    //#endregion
                case "Danh sách PO con đã xuất":

                    //#region Hiển thị Danh sách PO con đã xuất
                    detailRow.find("#tab_PO_Con").empty();
                    detailRow.find("#tab_PO_Con").kendoGrid({

                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
                                        data: {
                                            cmd: 'PONT_Select_By_PO',
                                            PO_ID: BienChiTietPO.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                                            }                                           
                                            else {

                                                if (result.length == 0) {
                                                    $("#tab_PO_Con .k-grid-header").css('display', 'none');
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                            //pageSize: 8
                        }),
                        sortable: true,
                        pageable: {
                            messages: {
                                display: "Tổng số   {2}   PO con",
                                empty: "Chưa xuất PO con ",
                                page: "Trang",
                                of: "of {0}",
                                itemsPerPage: "Số mục trong một trang"

                            }
                        },
                        columns:
                            [
                                {
                                    title: "Tình trạng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "TinhTrang_ThanhToan",
                                    template: function (data) {

                                        if (data.TinhTrang_ThanhToan == '0') {
                                            return '<center><span class="label label-success">Chưa thanh toán</span></center>';
                                        }
                                        else {
                                            return '<center><span class="label label-important">Đã thanh toán</span></center>';
                                        }
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
                                    }
                                },
                                {
                                    title: "Số hợp đồng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "MaHD",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },
                                {
                                    title: "Số VB gửi nhà thầu",
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
                                    title: "File VB",
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
                                    title: "Tổng thanh toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "TongTienThanhToan",
                                    template: "#= OnChangeFormat(TongTienThanhToan) #",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"

                                    },
                                    width: "10%"
                                },
                                {
                                    title: "Ngày bắt đầu",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "NgayBatDau",
                                    template: "#= NgayBatDau_f #",
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
                                    template: "#= NgayKetThuc_f #",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },
                            ]
                    });
                    //#endregion
            }




        }
    });

    //#region Hiển thị phân rã vật tư    
    var toolbar_vattu;
    var columns_vattu;
    if (BienChiTietPO.data.Check_PO == "0") {
        toolbar_vattu = BienChiTietPO.data.TinhTrangChuyen == "1" ? "" : kendo.template($("#Templ_PO_VatTu").html());
        columns_vattu = [
                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    //groupHeaderTemplate: BienChiTietPO.data.TinhTrangChuyen == "1" ? "#=  value.split(' * ')[1] #" : "#= Ham_HienThi_Xuat_PO( value ) #",                    
                    groupHeaderTemplate: "#= Ham_HienThi_Xuat_PO( value ) #",
                    hidden: true,
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenNhaThau",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:blue;"
                    },
                    hidden: true
                },
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
                //{
                //    title: "Số lượng đã phân rã",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "abc",
                //    template: "#= OnChangeFormat(SoLuong_PO - SoLuongConLai_PO) #",
                //    attributes: {
                //        class: "row_css",
                //        style: "font-weight:bold;color:green;"
                //    }
                //},
                //    {
                //        title: "Số lượng còn lại",
                //        headerAttributes: {
                //            class: "header_css"
                //        },
                //        field: "SoLuongConLai_PO",
                //        template: "#= OnChangeFormat(SoLuongConLai_PO) #",
                //        attributes: {
                //            class: "row_css",
                //            style: "font-weight:bold;color:blue;"
                //        }
                //    },
                {
                    title: "Số lượng tổng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: "#= OnChangeFormat(SoLuong_PO) #",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-weight:bold;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng: #=OnChangeFormat(sum) #</div>",
                    width: "12%"
                },
                {

                    template: function (data) {
                        if (data.Check_XuatPO_HD == "0") {
                            return BienChiTietPO.data.TinhTrangChuyen == "1" ? '' : '<center><a onclick="Ham_PhanRa(' + data.PO_ID + ',' + data.PO_HD_ID + ',' + data.VatTu_ID + ');" class="btn btn-info"><i class="fa fa-list"></i> Phân rã</a></center>'
                            
                        } else {
                            return ''
                        }
                    },
                    width: "12%"
                },
                //{

                //    template: function (data) {
                //        if (data.Check_XuatPO_HD == "0") {
                //            return BienChiTietPO.data.TinhTrangChuyen == "1" ? '' : '<center><a class="btn btn-info" onclick="Ham_Sua_PO_HD_CT(' + data.PO_HD_ID + ',\'' + data.VatTu_Ten + '\',' + data.SoLuongTongHD + ',' + data.HopDong_ID + ',' + data.VatTu_ID + ',' + data.SoLuong_PO + ');"><i class="fa fa-edit "></i> Sửa</a></center>'
                //        } else {
                //            return ''
                //        }
                //    },
                //    width: "9%"
                //},
                {

                    template: function (data) {
                        //if (data.Check_XuatPO_HD == "0") {
                        //    return BienChiTietPO.data.TinhTrangChuyen == "1" ? '' : '<center><a class="btn btn-danger" onclick="Ham_Xoa_PO_HD_CT(' + data.PO_HD_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                        //} else {
                        //    return ''
                        //}
                        return '<center><a class="btn btn-danger" onclick="Ham_Xoa_PO_HD_CT(' + data.PO_HD_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                    },
                    width: "8%"
                }


        ];
    }
    else {
        toolbar_vattu = "";
        columns_vattu = [

                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
                    groupHeaderTemplate: "#= Ham_HienThi_MaHD( value ) #",
                    hidden: true,
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenNhaThau",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:blue;"
                    },
                    hidden: true
                },
                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%"
                },
                //{
                //    title: "Số lượng đã phân rã",
                //    headerAttributes: {
                //        class: "header_css"
                //    },
                //    field: "abc",
                //    template: "#= OnChangeFormat(SoLuong_PO - SoLuongConLai_PO) #",
                //    attributes: {
                //        class: "row_css",
                //        style: "font-weight:bold;color:green;"
                //    }
                //},
                //    {
                //        title: "Số lượng còn lại",
                //        headerAttributes: {
                //            class: "header_css"
                //        },
                //        field: "SoLuongConLai_PO",
                //        template: "#= OnChangeFormat(SoLuongConLai_PO) #",
                //        attributes: {
                //            class: "row_css",
                //            style: "font-weight:bold;color:blue;"
                //        }
                //    },
                {
                    title: "Số lượng tổng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: "#= OnChangeFormat(SoLuong_PO) #",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-weight:bold;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng: #=OnChangeFormat(sum) #</div>"

                }
        ];
    }

    DS_BangKe_Cap1 = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
                    data: {
                        cmd: 'PO_DonVi_SelectbyPO_ID',
                        PO_ID: BienChiTietPO.data.PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        pageSize: 8,
        group:
                [
                    {
                        field: "MaHD",
                        aggregates: [
                                { field: "ThanhTien_PO", aggregate: "sum" }
                        ]
                    }

                ]
    });


    ///////////////////////////////////////
    detailRow.find("#tab_VatTu").empty();
    detailRow.find("#tab_VatTu").kendoGrid({

        dataSource: DS_BangKe_Cap1,
        sortable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        toolbar: toolbar_vattu,
        columns: columns_vattu,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: Ham_ChiTiet_VatTu

    });
    ///////////////////////////////////////
    //#endregion   
}


function Ham_HienThi_Xuat_PO(value) {

    var arr_dv = value.split("*");
    
    if (BienChiTietPO.data.TinhTrangChuyen == "1") {
        return '<b>Số hợp đồng: ' + arr_dv[1] + '</b>';
    }
    else {
        if (arr_dv[0] == "0") {
            //return "<b>Số hợp đồng: " + arr_dv[1] + "</b><a style='margin-left:30px !important;margin-right:10px;' class='btn btn-info' onclick='Ham_Xuat_DonHang(\" " + arr_dv[1] + " \");'><i class='fa fa-envelope'></i> Xuất thư yêu cầu</a><a class='btn btn-info' onclick='Ham_Xuat_Ex(\" " + value + " \");'><i class='fa fa-download'></i> Xuất Excel</a>";
            return "<b>Số hợp đồng: " + arr_dv[1] + "</b><span class='label label-success' style='margin-left:10px !important;'>Chưa xuất PO con</span><span style='margin-left:150px !important;margin-right:10px !important;' class='btn btn-info' onclick ='Ham_Xuat_DonHang(\" " + arr_dv[1] + " \");'><i class='fa fa-star-half-o'></i> Xuất PO con</span><span class='btn btn-info' style='margin-right:10px !important;' onclick='Ham_Xuat_Ex(\" " + value + " \");'><i class='fa fa-download'></i> Xuất Excel</span><span class='btn btn-info' onclick='Ham_Xuat_TDH(\" " + arr_dv[1] + " \");'><i class='fa fa-envelope'></i> Xuất thông báo đặt hàng</span>";

        }
        else {
            return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span style="margin-left:30px !important;" class="btn btn-danger">Đã xuất PO con</span>';
        }
    }
    
    
}
//#endregion 

//#region Xuất đơn hàng
function Ham_Xuat_DonHang(p_MaHD) {


    $("#lb_MaHD").text(p_MaHD);
    $("#wd_DatHang").data("kendoWindow").center().open();


    uploadReset();
    Path_PO = "";


}
function Ham_Huy_DonHang() {

    $("#wd_DatHang").data("kendoWindow").close();
    $("#txt_SoNgayTH").data("kendoNumericTextBox").value("");
    $("#txt_NgayBatDau").val("");
    $("#txt_vb_DatHang").val("");
    $("#txt_NgayVB").val("");
}
function Ham_Luu_Xuat_DonHang() {



    var check = 0;

    if ($("#txt_vb_DatHang").val() == "") {
        check = 1;
        alert("Chưa nhập số văn bản đặt hàng!");
        return;
    }
    if ($("#txt_NgayVB").val() == "") {
        check = 1;
        alert("Chưa nhập ngày kí văn bản đặt hàng!");
        return;
    }
    if (Path_PO == "") {
        check = 1;
        alert("Chưa upload tập tin văn bản!");
        return;
    }
    if ($("#txt_NgayBatDau").val() == "") {
        check = 1;
        alert("Chưa chọn ngày thực hiện!");
        return;
    }
    if ($("#txt_SoNgayTH").val() == "") {
        check = 1;
        alert("Chưa nhập số ngày thực hiện!");
        return;
    }

    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_DonDatHang_Ao.aspx",
            data: {
                cmd: 'Xuat_DonHang',
                PO_ID: BienChiTietPO.data.PO_ID,
                SoVB: $("#txt_vb_DatHang").val(),
                NgayVB: $("#txt_NgayVB").val(),
                MaHD: $("#lb_MaHD").text().trim(),
                FileVB: Path_PO,
                NgayBatDau: $("#txt_NgayBatDau").val(),
                SoNgayThucHien: $("#txt_SoNgayTH").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                alert("Đã xuất các đơn hàng ảo thành công!");
                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();

                $("#wd_DatHang").data("kendoWindow").close();

                $("#txt_SoNgayTH").data("kendoNumericTextBox").value("");
                $("#txt_NgayBatDau").val("");
                $("#txt_vb_DatHang").val("");
                $("#txt_NgayVB").val("");


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


//#region Hiển thị chi tiết vật tư
function Ham_ChiTiet_VatTu(e) {

    Bien_ChiTiet_VatTu = e;

    DS_BangKe_Cap2 = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Con_Ao.aspx",
                    data: {
                        cmd: 'BangKe_Cap2',
                        PO_ID: BienChiTietPO.data.PO_ID,
                        VatTu_ID: e.data.VatTu_ID,

                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    e.detailCell.empty();
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: DS_BangKe_Cap2,
        pageable: {
            messages: {
                display: "Tổng số   {2}   đơn vị",
                empty: "Chưa phân rã",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        columns:
            [
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
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien",
                    template: "#= OnChangeFormat(ThanhTien) #",
                    attributes: {
                        class: "row_css"
                    }
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
                    }
                }
            ]
    });

}

function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");

    return "<b>Số hợp đồng: " + arr_dv[1] + "</b>";
}
//#endregion


//#region Tìm và chọn Vật tư


function Ham_TaoMoiVatTu_KhaDung() {

    $("#wd_Show_VatTu").data("kendoWindow").center().open();

    //#region Hiển thị danh sách Vật tư
    $("#grid_VatTu").empty();
    var grid_vattu = $("#grid_VatTu").kendoGrid({
        dataSource: DS_VatTu,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   vật tư",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        sortable: true,
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
        toolbar: kendo.template($("#Templ_VatuTu").html()),
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
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Mã vật tư tập đoàn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    title: "Nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NhaThau_Ten",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    }).data("kendoGrid");

    //bind click event to the checkbox
    grid_vattu.table.on("click", ".checkbox", selectRow);


    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: DS_SoHD,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaHD;

            if (value) {

                grid_vattu.dataSource.filter({ field: "MaHD", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_sohd").val('');
        }

    });



    $("#txt_search_tenvt").kendoAutoComplete({
        dataTextField: "VatTu_Ten",
        dataSource: DS_TenVT,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.VatTu_Ten;

            if (value) {

                grid_vattu.dataSource.filter({ field: "VatTu_Ten", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_tenvt").val('');
        }

    });


    $("#txt_search_mavttd").kendoAutoComplete({
        dataTextField: "MaVatTu_TD",
        dataSource: DS_MaTD,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaVatTu_TD;

            if (value) {

                grid_vattu.dataSource.filter({ field: "MaVatTu_TD", operator: "eq", value: value });
            }
            else {
                grid_vattu.dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_mavttd").val('');
        }

    });
    $("#btn_clear").click(function (e) {
        e.preventDefault();
        $("#txt_search_sohd").val('');
        $("#txt_search_tenvt").val('');
        $("#txt_search_mavttd").val('');
        grid_vattu.dataSource.filter({});
    });


    //#endregion

    //#region hiển thị danh sách vật tư được chọn
    DS_VatTu_PO = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                fields: {
                    SoLuong_KhaDung: { editable: false, type: "number" },
                    SoLuong_PO: {
                        type: "number",
                        validation: {
                            //required: { message: "Chưa nhập số lượng!" }
                            //////////////////////////////////
                            NameValidation: function (input) {

                                var grid = $("#grid_VatTu_PO").data("kendoGrid");
                                var tr = $(input).closest('tr');
                                var dataRow = grid.dataItem(tr);

                                var SL_PO = $(input).val();
                                var SL_KhaDung = dataRow.SoLuong_KhaDung;


                                if (input.is("[name='SoLuong_PO']") && input.val() == "") {
                                    input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");
                                    return false;
                                }
                                if (input.is("[name='SoLuong_PO']") && SL_PO > SL_KhaDung) {
                                    input.attr("data-NameValidation-msg", "Số lượng PO vượt quá số lượng khả dụng!");
                                    return false;
                                }
                                return true;


                            }

                            /////////////////////////////////////
                            ////Hàm ràng buộc http://jsfiddle.net/psu8umLn/1/
                            //required: false,
                            //validationMessage: "Số lượng PO vượt quá số lượng khả dụng!",
                            //custom: function (element) {

                            //    var grid = $("#grid_VatTu_PO").data("kendoGrid");                                                                
                            //    var tr = $(element).closest('tr');
                            //    var dataRow = grid.dataItem(tr);

                            //    var SL_PO = $(element).val();
                            //    var SL_KhaDung = dataRow.SoLuong_KhaDung;

                            //    return (SL_PO <= SL_KhaDung);


                            //}
                            ////////////////////////
                        }

                    }

                }
            }
        }
    });
    $("#grid_VatTu_PO").empty();
    $("#grid_VatTu_PO").kendoGrid({
        dataSource: DS_VatTu_PO,
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
        toolbar: kendo.template($("#Templ_VatuTu_PO").html()),
        columns:
            [

                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    //template: "<div>#= MaVatTu_TD #</div><br><div>#= VatTu_Ten #</div>",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
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
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: function (data) {
                        if (data.SoLuong_PO == 0) {
                            return data.SoLuong_PO;
                        } else {
                            return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong_PO) + '</b>';
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
                    title: "Nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NhaThau_Ten",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    template: '<center><a class="btn btn-danger" onclick="Ham_Xoa_VatTu_PO(#= STT #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                    width: "8%"
                }
            ]
    });
    //#endregion
}

var ItemChecked = {};
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#grid_VatTu").data("kendoGrid"),
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
//#endregion

//#region Hàm chọn vật tư
function Ham_Chon_VatTu() {

    //http://docs.telerik.com/kendo-ui/web/grid/how-to/Selection/grid-selection-checkbox


    for (var i in ItemChecked) {
        if (ItemChecked[i]) {

            var grid = $("#grid_VatTu").data("kendoGrid");
            var selectedTopic = grid.dataSource.getByUid(i);

            var check = 0;
            for (var i = 0; i < DS_VatTu_PO.data().length; i++) {
                if (DS_VatTu_PO.data()[i].STT == selectedTopic.STT) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                DS_VatTu_PO.add(selectedTopic);
            }
        }
    }


    for (var i = 0; i < $("#grid_VatTu tr").length; i++) {
        var className_ = $("#grid_VatTu tr")[i].className;

        if (className_ == 'k-state-selected' || className_ == 'k-alt k-state-selected') {

            $($("#grid_VatTu tr")[i]).removeClass("k-state-selected");
            $("#grid_VatTu tr")[i].cells[0].childNodes[0].childNodes[0].checked = false;
        }
    }


    //var grid = $("#grid_VatTu").data("kendoGrid");
    //var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    //if (selectedTopic == undefined) {
    //    alert("Chưa chọn vật tư!");
    //    return;
    //}
    //else {

    //    ///////////////////////////////////////////////////////////
    //    var check = 0;
    //    for (var i = 0; i < DS_VatTu_PO.data().length; i++) {
    //        if (DS_VatTu_PO.data()[i].STT == selectedTopic.STT) {
    //            check = 1;
    //            break;
    //        }

    //    }
    //    if (check == 0) {

    //        DS_VatTu_PO.add(selectedTopic);

    //    }
    //    else {
    //        alert("Vật tư đã được chọn!");
    //    }
    //    ////////////////////////////////////////////////////////////

    //    //$("#wd_Show_VatTu").data("kendoWindow").close();        
    //    //$("#txt_VatTu_PO").text(selectedTopic.VatTu_Ten);

    //    //VatTu_ID_PO = selectedTopic.VatTu_ID;

    //    //$("#txt_SoLuong_HD").text(OnChangeFormat(selectedTopic.SoLuong_KhaDung));

    //    //HopDong_ID = selectedTopic.HopDong_ID;

    //    //var request = $.ajax({
    //    //    type: "POST",
    //    //    url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
    //    //    data: {
    //    //        cmd: 'PO_HopDong_CT_SLTong',
    //    //        HopDong_ID: selectedTopic.HopDong_ID,
    //    //        VatTu_ID: selectedTopic.VatTu_ID
    //    //    },
    //    //    dataType: 'json'
    //    //});
    //    //request.done(function (msg) {



    //    //    if (msg[0].SoLuongKhaDung == "0") {

    //    //        alert("Vật tư này đã được đặt hết!");
    //    //        $("#txt_SoLuong_PO").val("");

    //    //    } else {

    //    //        $("#wd_VatTu_PO").data("kendoWindow").center().open();
    //    //        $("#txt_SoLuong_KD").text(OnChangeFormat(msg[0].SoLuongKhaDung));
    //    //    }




    //    //});
    //    //request.fail(function (jqXHR, textStatus) {
    //    //    alert("Request failed: " + textStatus);
    //    //});

    //}


}
//#endregion

//#region Hàm xóa vật tư tạm trong danh sách vật tư PO

function Ham_Xoa_VatTu_PO(p_STT) {

    for (var i = 0; i < DS_VatTu_PO.data().length; i++) {

        var item = DS_VatTu_PO.data()[i];
        if (item.STT == p_STT) {
            DS_VatTu_PO.remove(item);
        }
    }
}
//#endregion

//#region Hàm lưu thiệt vật tư PO theo danh sách chọn

function Ham_Luu_VatTu_PO() {


    var DS_Grid = $("#grid_VatTu_PO").data("kendoGrid").dataSource.data();

    var check = 0;

    for (var j = 0; j < DS_Grid.length; j++) {


        var p_HopDong_ID = DS_Grid[j].HopDong_ID;
        var p_VatTu_ID = DS_Grid[j].VatTu_ID;
        var p_SoLuong_PO = DS_Grid[j].SoLuong_PO;

        if (p_SoLuong_PO == 0) {
            alert("Chưa nhập số lượng PO!");
            check = 1;
            break;
        }
        else {

            $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
                data: {
                    cmd: 'PO_HopDong_CT_Create',
                    PO_ID: BienChiTietPO.data.PO_ID,
                    HopDong_ID: p_HopDong_ID,
                    VatTu_ID: p_VatTu_ID,
                    SoLuong_PO: p_SoLuong_PO
                },
                dataType: 'json'
            });
        }

    }
    if (check == 0) {
        alert("Đã thêm thành công vật tư!");
        

        $("#wd_Show_VatTu").data("kendoWindow").close();
        $("#wd_List_Option").data("kendoWindow").close();

        BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();



    }
}


//#endregion 


//#region Hàm lưu vật tư PO đơn lẻ (ver cũ)
function Ham_Luu_ThemPO_HD_CT() {


    //var str_id_vattu = '';
    //var hopdong_id;

    //for (var j = 1; j < $("#grid_HD_CT tr").length; j++) {

    //    var chb_dv = $("#grid_HD_CT tr")[j].cells[2].childNodes[0].childNodes[0];

    //    var id = $("#grid_HD_CT tr")[j].cells[1].childNodes[0].textContent;

    //    if (chb_dv.checked == true) {

    //        str_id_vattu += '' + id + ',';
    //        hopdong_id = $("#grid_HD_CT tr")[j].cells[0].childNodes[0].textContent;
    //    }
    //}
    //str_id_vattu = str_id_vattu.replace(/^,|,$/g, '');



    //if (str_id_vattu=='') {
    //    alert("Chưa chọn vật tư!");
    //    check = 1;
    //    return;
    //}
    var check = 0;
    if ($("#txt_SoLuong").val() == "" || $("#txt_SoLuong").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Create',
                PO_ID: BienChiTietPO.data.PO_ID,
                HopDong_ID: HopDong_ID,
                VatTu_ID: VatTu_ID_PO,
                SoLuong_PO: parseFloat($("#txt_SoLuong_PO").val())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã thêm thành công vật tư!");
                $("#wd_VatTu_PO").data("kendoWindow").close();
                Ham_ChiTiet_PO(BienChiTietPO);

                //$("#txt_SoLuong_PO").val("");

                $("#txt_SoLuong_PO").data("kendoNumericTextBox").value("");

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
function Ham_Huy_ThemPO_HD_CT() {
    $("#wd_VatTu_PO").data("kendoWindow").close();
}
//#endregion


//#region Sửa vật tư PO
function Ham_Sua_PO_HD_CT(p_PO_HD_ID, VatTu_Ten, SoLuongTongHD, HopDong_ID, VatTu_ID, SoLuong_PO) {

    $("#wd_VatTu_PO_Sua").data("kendoWindow").center().open();


    $("#txt_VatTu_PO_Sua").text(VatTu_Ten);
    $("#txt_SoLuong_HD_Sua").text(OnChangeFormat(SoLuongTongHD));

    $("#txt_SoLuong_PO_Sua").data("kendoNumericTextBox").value(SoLuong_PO);

    PO_HD_ID = p_PO_HD_ID;

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
        data: {
            cmd: 'PO_HopDong_CT_SLTong',
            HopDong_ID: HopDong_ID,
            VatTu_ID: VatTu_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        $("#txt_SoLuong_KD_Sua").text(OnChangeFormat(msg[0].SoLuongKhaDung));
    });
    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


}
function Ham_Luu_SuaPO_HD_CT() {

    var check = 0;

    var SoLuong_PO = parseFloat(ReplaceComma($("#txt_SoLuong_PO_Sua").val()));
    var SoLuong_HD = parseFloat(ReplaceComma($("#txt_SoLuong_HD_Sua").text()));

    if (SoLuong_PO > SoLuong_HD) {

        check = 1;
        alert("Số lượng vượt số lượng khả dụng!");
        return;
    }

    if ($("#txt_SoLuong_Sua").val() == "" || $("#txt_SoLuong_Sua").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Update_SL',
                PO_HD_ID: PO_HD_ID,
                SoLuong_PO: parseFloat($("#txt_SoLuong_PO_Sua").val())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa thành công vật tư!");
                $("#wd_VatTu_PO_Sua").data("kendoWindow").close();
                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
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
function Ham_Huy_SuaPO_HD_CT() {
    $("#wd_VatTu_PO_Sua").data("kendoWindow").close();
}
//#endregion 

//#region Xóa vật tư PO
function Ham_Xoa_PO_HD_CT(p_PO_HD_CT) {

    if (confirm("Bạn có chắc muốn xóa vật tư này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
            data: {
                cmd: 'PO_HopDong_CT_Delete',
                PO_HD_CT: p_PO_HD_CT
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa thành công vật tư!");

                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
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



//#region Hiển thị phân rã vật tư PO
function Ham_PhanRa(p_PO_ID, p_PO_HD_ID, p_VatTu_ID) {

    $("#wd_PhanRa").data("kendoWindow").center().open();

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
                    data: {
                        cmd: 'PO_DonVi_SelectbyPO_ID',
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        },
        filter: { field: "PO_HD_ID", operator: "eq", value: p_PO_HD_ID }
    });

    ds.fetch(function () {
        var view = ds.view();



        $("#txt_VatTu").text(view[0].VatTu_Ten);
        $("#txt_MaVatTu").text(view[0].MaVatTu_TD);


        VatTu_ID = view[0].VatTu_ID;

        $("#txt_DonGia").text(OnChangeFormat(view[0].DonGia));
        MaDVT = view[0].MaDVT;
        $("#txt_DVT").text(view[0].TenDVT);

        $("#txt_SoLuong_Tong").text(OnChangeFormat(view[0].SoLuong_PO));

    });


    $("#grid_PhanRa").kendoGrid({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
                        data: {
                            cmd: 'PhanRa_ShowSL',
                            PO_ID: p_PO_ID,
                            VatTu_ID: p_VatTu_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            schema: {
                model: {
                    fields: {
                        PO_DV_ID: { editable: false, type: "number" },
                        DonVi_Ten: { editable: false, type: "string" },
                        SoLuong_DV: {
                            type: "number",
                            validation: {
                                required: { message: "Chưa nhập số lượng!" }
                            }
                        }

                    }
                }
            }
        }),
        height: 300,
        editable: true,
        edit: function (e) {

            var input = e.container.find(".k-input");
            input.val("");
            //input.keyup(function () {
            //    value = input.val();
            //});

            //$("[name='SoLuong_DV']", e.container).blur(function () {

            //    var input = $(this);                
            //    var grid = $("#grid_PhanRa").data("kendoGrid");
            //    var row = $(this).closest("tr");
            //    var item = grid.dataItem(row);

            //    //alert(item.SoLuong_DV);


            //});


        },
        columns:
            [
                { field: "PO_DV_ID", hidden: true },
                {
                    title: "Đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonVi_Ten",
                    attributes: {
                        class: "row_css"
                    },
                    width: "50%"
                },
                {
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_DV",
                    template: function (data) {

                        if (data.SoLuong_DV == 0) {
                            return data.SoLuong_DV;
                        } else {

                            return '<b style="color:green;">' + OnChangeFormat(data.SoLuong_DV) + '</b>';
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

                    },
                    width: "50%"
                }
            ]

    });


}

//#endregion

//#region Lưu phân rã
function Ham_Luu_PhanRa() {

    var TongSL_PO = parseFloat(ReplaceComma($("#txt_SoLuong_Tong").text()));

    var Chuoi_JSON = "";
    var TongSL_DV = 0;

    for (var j = 1; j < $("#grid_PhanRa tr").length; j++) {

        var PO_DV_ID = parseInt($("#grid_PhanRa tr")[j].cells[0].childNodes[0].textContent);
        var ClassName = $("#grid_PhanRa tr")[j].cells[2].className;

        var SoLuong = parseFloat(ReplaceComma($("#grid_PhanRa tr")[j].cells[2].textContent));

        if (ClassName == "row_css k-dirty-cell") {

            Chuoi_JSON += "{'PO_DV_ID':" + PO_DV_ID + ",'VatTu_ID':" + VatTu_ID + ",'SoLuong':" + SoLuong + "},";

        }
        TongSL_DV += SoLuong;
    }

    Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');




    var check = 0;

    if ((TongSL_DV).toFixed(2) > (TongSL_PO).toFixed(2)) {
        check = 1;
        alert("Số lượng phân rã vượt quá số lượng tổng PO!");
        return;
    }
    if ((TongSL_DV < TongSL_PO) && (TongSL_DV != TongSL_PO)) {
        check = 1;
        alert("Chưa phân rã hết số lượng vật tư");
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
            data: {
                cmd: 'PhanRa_Luu',
                gData: "[" + Chuoi_JSON + "]",
                VatTu_ID: VatTu_ID,
                MaDVT: MaDVT,
                DonGia: ReplaceComma($("#txt_DonGia").text())
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg == "OK") {
                alert("Đã cập nhật phân rã!");
                $("#wd_PhanRa").data("kendoWindow").close();

                BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
                DS_BangKe_Cap2.read();
            }


        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + textStatus);
        });
    }


}
function Ham_Huy_PhanRa() {
    $("#wd_PhanRa").data("kendoWindow").close();
}
//#endregion
//#region Hàm reset Upload
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

//#endregion


//#region Xuất ex PO


function Ham_Xuat_Ex(p_MaHD) {



    $("#tab_VatTu_ex").empty();

    var grid = $("#tab_VatTu_ex").kendoGrid({
        excel: {
            allPages: true
        },
        excelExport: function (e) {

            e.preventDefault();

            var workbook = e.workbook;


            detailExportPromises = [];

            var masterData = e.data;

            for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {

                exportChildData(BienChiTietPO.data.PO_ID, masterData[rowIndex].VatTu_ID, rowIndex);
            }

            $.when.apply(null, detailExportPromises)
            .then(function () {

                // get the export results
                var detailExports = $.makeArray(arguments);

                // sort by masterRowIndex
                detailExports.sort(function (a, b) {
                    return a.masterRowIndex - b.masterRowIndex;
                });

                // add an empty column
                workbook.sheets[0].columns.unshift({
                    width: 30
                });

                // prepend an empty cell to each row
                for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                    workbook.sheets[0].rows[i].cells.unshift({});
                }

                // merge the detail export sheet rows with the master sheet rows
                // loop backwards so the masterRowIndex doesn't need to be updated
                for (var i = detailExports.length - 1; i >= 0; i--) {
                    var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

                    var sheet = detailExports[i].sheet;

                    // prepend an empty cell to each row
                    for (var ci = 0; ci < sheet.rows.length; ci++) {
                        if (sheet.rows[ci].cells[0].value) {
                            sheet.rows[ci].cells.unshift({});
                        }
                    }

                    // insert the detail sheet rows after the master row
                    [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                }

                // save the workbook
                kendo.saveAs({
                    dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                    fileName: "Export.xlsx"
                });


            });
        },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
                        data: {
                            cmd: 'PO_DonVi_SelectbyPO_ID',
                            PO_ID: BienChiTietPO.data.PO_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
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
            filter: { field: "MaHD", operator: "eq", value: p_MaHD.trim() },
            aggregate: [
                { field: "ThanhTien_PO", aggregate: "sum" }
            ]
        }),

        columns:
            [
                {
                    title: "Tên vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%"
                },
                {
                    title: "Mã vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaVatTu_TD",
                    attributes: {
                        class: "row_css"
                    },
                    width: "20%"
                },
                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD_",
                    groupHeaderTemplate: "#= Ham_HienThi_MaHD( value ) #",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Tên nhà thầu",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenNhaThau",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:blue;"
                    },

                },

                {
                    title: "Số lượng tổng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",
                    template: "#= OnChangeFormat(SoLuong_PO) #",
                    attributes: {
                        class: "row_css",
                        style: "color:red;font-weight:bold;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    aggregates: ["sum"],
                    footerTemplate: "Tổng cộng: #=OnChangeFormat(sum) #",
                    width: "12%"
                },
            ],

    });

    $("#tab_VatTu_ex").data("kendoGrid").saveAsExcel();


}
function exportChildData(key_PO_ID, key_VatTu_ID, rowIndex) {


    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{

        cells: [

          { value: "Đơn vị", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Số lượng", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn vị tính", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn giá", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Thành tiền", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "VAT", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" }
        ]
    }];

    var exporter = new kendo.ExcelExporter({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Con_Ao.aspx",
                        data: {
                            cmd: 'BangKe_Cap2',
                            PO_ID: key_PO_ID,
                            VatTu_ID: key_VatTu_ID,

                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        }),
        columns:
            [
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
                    title: "Số lượng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
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
                    title: "Thành tiền",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien",
                    template: "#= OnChangeFormat(ThanhTien) #",
                    attributes: {
                        class: "row_css"
                    }
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
                    }
                }
            ]

    });
    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });
}
//#endregion 


//#region Chuyển PO
function Ham_ChuyenDoi(p_PO_ID) {

    $("#wd_Chuyen").data("kendoWindow").center().open();

    var d = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
                    data: {
                        cmd: 'DS_HD_By_PO_ID',
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
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

    Load_DS_HopDong(d);

    PO_ID_Chuyen = p_PO_ID;


    var grid_data = $("#grid_PO").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.PO_ID == p_PO_ID;
    });

    $("#txt_SoPO_cd").val(res[0].SoPO);
    $("#txt_NgayKy_cd").val(res[0].NgayKyPO);
    $("#txt_VB_cd").val(res[0].SoVanBan);

    Path_cd = res[0].FileVB;

    if (Path_cd == "" || Path_cd == null) {

        $("#tr_download_cd").hide();
        $("#tr_upload_cd").show();

    } else {

        $("#tr_download_cd").show();
        $("#tr_upload_cd").hide();

        $("#btn_download_cd").attr("href", "" + Path_cd + "");

    }
}

function Ham_Luu_CD_PO() {
   

    var check = 0;

    if ($("#txt_SoPO_cd").val() == "") {
        check = 1;
        alert("Chưa nhập số PO!");
        return;
    }
    if ($("#txt_NgayKy_cd").val() == "") {
        check = 1;
        alert("Chưa nhập ngày ký PO!");
        return;
    }

    for (var i = 0; i < $("#grid_hopdong").data("kendoGrid").dataSource.data().length; i++) {

        if ($("#grid_hopdong").data("kendoGrid").dataSource.data()[i].TinhTrangChuyen == 0 ) {
            check = 1;
            alert("Chưa chuyển hết các hợp đồng ảo tham gia PO sang hợp đồng thật!");
            break;
        }
    }
    
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PO_Cha_Ao.aspx",
            data: {
                cmd: 'Chuyen_PO_That',
                PO_ID: PO_ID_Chuyen,
                SoPO: $("#txt_SoPO_cd").val(),
                NgayKyPO: $("#txt_NgayKy_cd").val(),
                SoVanBan: $("#txt_VB_cd").val(),
                FileVB:Path_cd
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã tạo chuyển đổi thành công!");
                $("#wd_Chuyen").data("kendoWindow").close();
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


function Ham_Huy_CD_PO() {

    $("#wd_Chuyen").data("kendoWindow").close();

}

//#endregion


//#region Grid dữ liệu hợp đồng
function Load_DS_HopDong(d) {

    $("#grid_hopdong").empty();
    var grid = $("#grid_hopdong").kendoGrid({
        dataSource: d,        
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
                    template: function (data) {

                        if (data.TinhTrangChuyen == 0) {
                            return '<center><span class="label label-important">Chưa chuyển</span></center>';
                        }
                        else {                            
                            return '<center><span class="label label-success">Đã chuyển</span></center>';
                        }
                    },
                    width: "7%"
                },
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
                    template: function (data) {

                        if (data.NgayKy_f == null) {
                            return '';
                        }
                        else {
                            return data.NgayKy_f;
                        }
                    },
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
                    title: "Giá trị HĐ sau thuế",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GiaTriSauThue",
                    template: function (data) {

                        if (data.GiaTriSauThue == null) {
                            return '';
                        }
                        else {
                            return OnChangeFormat(data.GiaTriSauThue);
                        }
                    },
                    attributes: {
                        class: "row_css"
                    },
                    width: "12%"
                },
                {
                    title: "File văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "FileVB",
                    template: function (data) {

                        if (data.FileVB == "" || data.FileVB == null) {
                            return '<center>Chưa upload</center>';
                        } else {
                            return '<center><a href= "' + data.FileVB + '" target="_blank" class="btn btn-inverse" ><i class="fa fa-download"></i></a></center>';
                        }
                    },
                    width: "8%"
                }
                
            ]
    });        
}

function detailInit(e) {

    detailInit_e = e;

    var detailRow = e.detailRow;
    detailRow.find("#tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });

    var grid_tab = detailRow.find("#tab_VatTu").kendoGrid({

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
                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
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
    }).data("kendoGrid");



    
}



//#endregion


//#region xuất thư đặt hàng

function Ham_Xuat_TDH(p_MaHD) {

    window.open('rp_thudathangb.aspx?PO_ID=' + BienChiTietPO.data.PO_ID + '&MaHD=' + p_MaHD + '', '_blank');

}

//#endregion



function Ham_TaoMoiVatTu() {
    $("#wd_List_Option").data("kendoWindow").center().open();

}
function Ham_Huy_ChonTaoMoiVatTu() {
    $("#wd_List_Option").data("kendoWindow").close();
}
function Ham_Chon_TaoMoiVatTu() {


    if ($("#rdo_sl").is(":checked")) {
        Ham_TaoMoiVatTu_KhaDung();
    } else {
        Ham_TaoMoiVatTu_HD();
    }
}

function Ham_TaoMoiVatTu_HD() {

    $("#wd_ChonVatTu_Vuot").data("kendoWindow").center().open();
    $("#grid_VatTu_Vuot").empty();
    $("#grid_VatTu_Vuot").kendoGrid({
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
        toolbar: kendo.template($("#Templ_VatTu_Vuot").html()),
        columns:
            [

                {
                    title: "Vật tư",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "VatTu_Ten",                    
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Số lượng hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: "#= OnChangeFormat(SoLuong) #",
                    attributes: {
                        class: "row_css",
                        //style: "font-weight:bold;color:green;"
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
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_PO",                    
                    template: function (data) {
                        if (data.SoLuong_PO == "null" || data.SoLuong_PO == null) {
                            return 0;
                        } else {
                            return '<b style="color:blue;">' + OnChangeFormat(data.SoLuong_PO) + '</b>';
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
                }
            ]
    });
    $("#div_GTHD").hide();

    var txt_search_sohd_vuot = $("#txt_search_sohd_vuot").kendoComboBox({
        dataTextField: "MaHD",
        dataValueField: "HopDong_ID",
        filter: "contains",
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }
        }),
        change: function () {

            GiaTriHopDong_ConLai = txt_search_sohd_vuot.dataItem(txt_search_sohd_vuot.select()).GiaTriConLai_HD;

            $("#lb_GTHD_ConLai").text(OnChangeFormat(txt_search_sohd_vuot.dataItem(txt_search_sohd_vuot.select()).GiaTriConLai_HD));


            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
                            data: {
                                cmd: 'Lay_DS_HopDong_CT',
                                HopDong_ID: txt_search_sohd_vuot.value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=PO_Cha_Ao.aspx";
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
                schema: {
                    model: {
                        fields: {
                            SoLuong_KhaDung: { editable: false, type: "number" },
                            SoLuong_PO: { type: "number" }

                        }
                    }
                }
            });

            $("#grid_VatTu_Vuot").data("kendoGrid").setDataSource(ds);
            $("#div_GTHD").show();
        }
    }).data("kendoComboBox");
}
function Ham_Luu_VatTu_PO_Vuot() {

    var DS_Grid_Vuot = $("#grid_VatTu_Vuot").data("kendoGrid").dataSource.data();

    if (DS_Grid_Vuot.length == 0) {

        alert("Chưa chọn hợp đồng!");

    } else {

        var TongSoLuong = 0;
        for (var j = 0; j < DS_Grid_Vuot.length; j++) {

            var p_soluong = DS_Grid_Vuot[j].SoLuong_PO == null ? 0 : DS_Grid_Vuot[j].SoLuong_PO;

            TongSoLuong += DS_Grid_Vuot[j].DonGia * parseFloat(ReplaceComma('' + p_soluong + ''));
        }

        if (parseFloat(TongSoLuong) > parseFloat(GiaTriHopDong_ConLai)) {
            alert("Vượt quá giá trị hợp đồng!");
        } else {


            for (var j = 0; j < DS_Grid_Vuot.length; j++) {


                var p_HopDong_ID = $("#txt_search_sohd_vuot").data("kendoComboBox").value();
                var p_VatTu_ID = DS_Grid_Vuot[j].VatTu_ID;
                var p_SoLuong_PO = DS_Grid_Vuot[j].SoLuong_PO == null ? 0 : DS_Grid_Vuot[j].SoLuong_PO;

                if (p_SoLuong_PO != 0) {

                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT_Ao.aspx",
                        data: {
                            cmd: 'PO_HopDong_CT_Create',
                            PO_ID: BienChiTietPO.data.PO_ID,
                            HopDong_ID: p_HopDong_ID,
                            VatTu_ID: p_VatTu_ID,
                            SoLuong_PO: p_SoLuong_PO
                        },
                        dataType: 'json'
                    });
                }

            }

            alert("Đã thêm thành công vật tư!");            

            $("#wd_ChonVatTu_Vuot").data("kendoWindow").close();
            $("#wd_List_Option").data("kendoWindow").close();



            BienChiTietPO.detailRow.find("#tab_VatTu").data('kendoGrid').dataSource.read();
            DS_VatTu.read();
            DS_PO.read();

        }


    }

}
function Ham_Huy_VatTu_PO_Vuot() {
    $("#wd_ChonVatTu_Vuot").data("kendoWindow").close();
}