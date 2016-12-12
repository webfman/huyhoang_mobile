var DS_HopDong, DS_HopDong_Loc, DS_HopDong_ChiTiet, DS_NhaThau, DS_LoaiHD, DS_HTMS, DS_LoaiVT, DS_VatTu, DS_DVT;
var detailInit_e, v_STT;
var VatTu_ID_Sua;

var HopDong_ID;
var Path, Path_Sua, Path_Cd;

var TongGiaTri_VT;

var DS_NguonVon;
$(document).ready(function () {

    
    //document.oncontextmenu = function () { return false; }
    $("#main-menu-toggle").click();

    //#region DataSource
    DS_NguonVon = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'GetDMNguonVon'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    DS_LoaiVT = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_LoaiVT'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });

    


    DS_HopDong = new kendo.data.DataSource({
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
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
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
        pageSize: 7
    });

    DS_NhaThau = new kendo.data.DataSource({
        serverFiltering: true,
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
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    DS_LoaiHD = new kendo.data.DataSource({
        serverFiltering: true,
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_LoaiHopDong'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    DS_HTMS = new kendo.data.DataSource({
        serverFiltering: true,
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_HTMS'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    DS_DVT = new kendo.data.DataSource({
        serverFiltering: true,
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_DVT'
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
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

    //#region upload 
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
            e.data = { LoaiFile: 'VBHopDong' };
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
            e.data = { LoaiFile: 'VBHopDong' };
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

            Path_Cd = e.response.FilePath;

            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');
        },
        upload: function (e) {
            e.data = { LoaiFile: 'VBHopDong' };
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

    //#endregion

    //#region control
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

    $("#wd_share").kendoWindow({
        draggable: false,
        height: "20%",
        width: "40%",
        modal: true,
        resizable: false,
        title: "",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");
    $("#txt_ngay_kyHD").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#txt_ngay_hieuluc").kendoDatePicker({
        format: "dd/MM/yyyy"
    });



    $("#cmb_NhaThau").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau

    });
    $("#cmb_LoaiHD").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn loại hợp đồng--",
        dataTextField: "TenLoaiHD",
        dataValueField: "LoaiHD_ID",
        dataSource: DS_LoaiHD
    });

    $("#cmb_HTMS").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn hình thức mua sắm--",
        dataTextField: "HinhThucMuaSam",
        dataValueField: "HTMS_ID",
        dataSource: DS_HTMS
    });
    
    $("#cmb_DVT").kendoDropDownList({
        optionLabel: "--Chọn đợn vị tính--",
        dataTextField: "TenDVT",
        dataValueField: "MaDVT",
        dataSource: DS_DVT
    });

    $("#wd_them_hd").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: "Tạo mới hợp đồng ảo",
        visible: false,
        actions: false

    }).data("kendoWindow");
    //$('#wd_them_hd').parent().addClass("myTitleWindow");


    /////////// Popup Sửa hợp đồng \\\\\\\\\\\\\
    $("#txt_ngay_kyHD_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#txt_ngay_hieuluc_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    //$("#txt_ngay_kehoach_sua").kendoDatePicker({
    //    format: "dd/MM/yyyy"
    //});



    $("#cmb_NhaThau_sua").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau
    }).data("kendoDropDownList");



    $("#cmb_LoaiHD_sua").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn loại hợp đồng--",
        dataTextField: "TenLoaiHD",
        dataValueField: "LoaiHD_ID",
        dataSource: DS_LoaiHD
    });

    $("#cmb_HTMS_sua").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn hình thức mua sắm--",
        dataTextField: "HinhThucMuaSam",
        dataValueField: "HTMS_ID",
        dataSource: DS_HTMS
    });
    

    $("#wd_sua_hd").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: "Sửa hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");
    ////////Chuyển đổi\\\\\\\\\\\\\\\

    $("#wd_ChuyenDoi_hd").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        modal: true,
        resizable: false,
        title: "Chuyển đổi hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");
    $("#txt_ngay_kyHD_cd").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#txt_ngay_hieuluc_cd").kendoDatePicker({
        format: "dd/MM/yyyy"
    });



    $("#cmb_NhaThau_cd").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: DS_NhaThau
    }).data("kendoDropDownList");



    $("#cmb_LoaiHD_cd").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn loại hợp đồng--",
        dataTextField: "TenLoaiHD",
        dataValueField: "LoaiHD_ID",
        dataSource: DS_LoaiHD
    });

    $("#cmb_HTMS_cd").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn hình thức mua sắm--",
        dataTextField: "HinhThucMuaSam",
        dataValueField: "HTMS_ID",
        dataSource: DS_HTMS
    });


    ///////////////// Popup Thêm vật tư \\\\\\\\\\\\\\\\
    $("#wd_them_hd_ct").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Thêm mới vật tư",
        visible: false,
        actions: false

    }).data("kendoWindow");


    
    

    ///////////////// Popup Sửa vật tư \\\\\\\\\\\\\\\\
    $("#wd_sua_hd_ct").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Sửa vật tư",
        visible: false,
        actions: false

    }).data("kendoWindow");

    

    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $(".k-input").prop('disabled', true);

    $("#txt_SoLuong_sua").kendoNumericTextBox({
        format: "#.##",
        min: "0"
    });
    $("#txt_SoLuong").kendoNumericTextBox({
        format: "#.##",
        min: "0"
    });
    $("#txt_SoNgayThucHien").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_SoNgayThucHien_sua").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_SoNgayThucHien_cd").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });

    $("#cmb_NguonVon_cd").kendoDropDownList({
        autoBind: true,
        optionLabel: {
            Ten: "--Chọn nguồn vốn--",
            ID: 0
        },
        dataTextField: "Ten",
        dataValueField: "ID",
        dataSource: DS_NguonVon
    });
    $("#cmb_NguonVon").kendoDropDownList({
        autoBind: true,
        optionLabel: {
            Ten: "--Chọn nguồn vốn--",
            ID: 0
        },
        dataTextField: "Ten",
        dataValueField: "ID",
        dataSource: DS_NguonVon
    });
    $("#cmb_NguonVon_sua").kendoDropDownList({
        autoBind: true,
        optionLabel: {
            Ten: "--Chọn nguồn vốn--",
            ID: 0
        },
        dataTextField: "Ten",
        dataValueField: "ID",
        dataSource: DS_NguonVon
    });
    //#endregion
    

    Load_DS_HopDong(DS_HopDong);

});

//#region Grid dữ liệu
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
                        class: "row_css"
                    },
                    width: 100
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
                    width: 100
                },

                {
                    title: "HTMS",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "HinhThucMS_Ten",
                    attributes: {
                        class: "row_css"
                    },
                    width: 100
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
                    width: 120
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
                    width: 100
                },                
                {                    
                    template: function (data) {
                     
                        if ($("[id$=_hf_quyen_capnhat]").val() == "true") {
                            if (data.Check_PO == '0') {
                                return '<center><a class="btn btn-info" onclick="func_SuaHD(' + data.HopDong_ID + ');"><i class="fa fa-edit "></i> Sửa</a></center>';
                            }
                            else {                                
                                return '';
                            }
                        } else {
                            return '';
                        }

                    },
                    width: 80
                },
                {                    
                    template: function (data) {

                        if ($("[id$=_hf_quyen_capnhat]").val() == "true") {

                            if (data.Check_PO == '0') {
                                return '<center><a class="btn btn-danger" onclick="func_XoaHD(' + data.HopDong_ID + ');"><i class="fa fa-trash-o"></i> Xóa</a></center>';
                            }
                            else {
                                //return '<center><a class="btn btn-danger" onclick="alert(\'Hợp đồng đã xuất có trong PO nên không được xóa!\');"><i class="fa fa-trash-o"></i> Xóa</a></center>';
                                return '';
                            }
                        } else {
                            return '';
                        }
                    },
                    width: 90
                },
                {                                       
                    template: function (data) {
                                          
                        if ($("[id$=_hf_quyen_capnhat]").val() == "true") {
                            if (data.TinhTrangChuyen == 0) {
                                return '<center><a class="btn btn-success" onclick="Ham_ChuyenDoi(' + data.HopDong_ID + ');"><i class="fa fa-repeat"></i> Chuyển</a></center>';
                            }
                            else {
                                return '<center><a class="btn btn-warning" ><i class="fa fa-check"></i> Đã Chuyển</a></center>';
                            }
                        } else {
                            return '';
                        }
                    },
                    width: 110
                },
                {
                    template: function (data) {

                        if ($("[id$=_hf_quyen_phanquyen]").val() == "true") {

                            return '<center><a class="btn btn-inverse" onclick="func_PhanQuyenHD(' + data.HopDong_ID + ');"><i class="fa fa-share-alt"></i> Quyền</a></center>';

                        } else {
                            return '';
                        }

                    },
                    width: 100
                }
            ]
    });
    
    $("#txt_search_sohd").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: DS_HopDong,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.MaHD;

            if (value) {

                grid.data("kendoGrid").dataSource.filter({ field: "MaHD", operator: "eq", value: value });
            }
            else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_sohd").val('');
        }

    });
    $("#btn_clear_sohd").click(function (e) {
        e.preventDefault();
        $("#txt_search_sohd").val('');
        grid.data("kendoGrid").dataSource.filter({});
    });

    //////////////////////////////////////////////////

    $("#grid_hopdong_ex").empty();
    var grid = $("#grid_hopdong_ex").kendoGrid({

        excel: {
            allPages: true
        },
        excelExport: function (e) {
            e.preventDefault();

            var workbook = e.workbook;

            detailExportPromises = [];

            var masterData = e.data;

            for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
                exportChildData(masterData[rowIndex].HopDong_ID, rowIndex);
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
        dataSource: d,
        columns:
            [

                { title: "Tên nhà thầu", field: "NhaThau_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày kí hợp đồng", field: "NgayKy", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số hợp đồng", field: "MaHD", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị trước thuế", field: "GiaTriTruocThue", template: "#= OnChangeFormat(GiaTriTruocThue) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị VAT", field: "VAT_HD", template: "#= OnChangeFormat(VAT_HD) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Giá trị sau thuế", field: "GiaTriSauThue", template: "#= OnChangeFormat(GiaTriSauThue) #", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số tiền bằng chữ", field: "SoTienBangChu", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày hết hạn", field: "NgayHetHan", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày kế hoạch", field: "NgayKeHoach_NT", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày hiệu lực", field: "NgayHieuLuc", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Nội dung", field: "NoiDung", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Người tạo hợp đồng", field: "NguoiTaoHD", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày tạo hợp đồng", field: "NgayTao", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Loại hợp đồng", field: "LoaiHD_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Hình thức mua sắm", field: "HinhThucMS_Ten", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Ngày thanh lý", field: "NgayThanhLy", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } },
                { title: "Số ngày thực hiện", field: "SoNgayThucHien", headerAttributes: { class: "header_css" }, attributes: { class: "row_css" } }

            ],
        detailInit: function (e) {


            $("<div/>").appendTo(e.detailCell).kendoGrid({
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
                                        window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
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
            });

        },
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

    var TinhTrangChuyen = e.data.TinhTrangChuyen;
    

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
                                window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
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
        toolbar: TinhTrangChuyen == 1 ? "" : kendo.template($("#Templ_ThemHD_CT").html()),
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
            },
            {
                //template: '<center><a onclick="func_SuaHD_CT(#= STT #,#= VatTu_ID #,\' #= VatTu_Ten # \',\' #= SoLuong #\',\'  #= DonGia #\', #= MaDVT #,\'  #= GhiChu # \');" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-pencil"></span></a></center>',
                template: TinhTrangChuyen == 1 ? '' : '<center><a class="btn btn-info" onclick="func_SuaHD_CT(#= STT #,#= VatTu_ID #,\' #= VatTu_Ten # \',\' #= SoLuong #\',\'  #= DonGia #\', #= MaDVT #,\'  #= GhiChu # \');"><i class="fa fa-edit "></i> Sửa</a></center>',
                width: "9%"


            },
            {
                //template: '<center><a onclick="func_XoaHD_CT(#= STT #);" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-close"></span></a></center>',
                template: TinhTrangChuyen == 1 ? '' : '<center><a class="btn btn-danger" onclick="func_XoaHD_CT(#= STT #);"><i class="fa fa-trash-o "></i> Xóa</a></center>',
                
                width: "9%"
            }

        ],
        dataBound: function (e) {
                       
            if (this.dataSource.total()>0) {                
                TongGiaTri_VT = this.dataSource.aggregates().ThanhTien.sum;
            }
            else {
                TongGiaTri_VT = 0;
            }            
        }
    }).data("kendoGrid");

    
    
    //////////////

    DS_VatTu = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_VatTu_by_HD_ID_Ao',
                        HopDong_ID: e.data.HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }

    });
    

    $('#btn_Chon_DVT_Khac').hide();
    $('#tr_dvt_khac').hide();
    $("#cmb_LoaiVatTu").kendoComboBox({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
        dataSource: DS_LoaiVT,
        change: function () {
            $('#lb_DVT').text('');
            $('#btn_Chon_DVT_Khac').hide();
            $('#tr_dvt_khac').hide();
        }
    });

    $("#cmb_VatTu").kendoComboBox({
        cascadeFrom: "cmb_LoaiVatTu",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu,
        filter: "startswith",
        template: kendo.template("${ data.MaVatTu_TD } || ${ data.TenVT } "),
        change: function () {

            var object = this.dataItem(this.select());
            $('#lb_DVT').text(object.DonViTinh_Ten);
            $('#btn_Chon_DVT_Khac').show();
            $('#tr_dvt_khac').hide();
        }
    });
    $('#btn_Chon_DVT_Khac').click(function () {
        $("#tr_dvt_khac").show();
    });

    $('#btn_sua_upload').click(function () {

        $("#tr_download").hide();
        $("#tr_upload").show();
        Path_Sua = "";
    });

    $('#btn_cd_upload').click(function () {

        $("#tr_download_cd").hide();
        $("#tr_upload_cd").show();
        Path_Cd = "";
    });

}

function Ham_HD_Xuat_Ex() {

    $("#grid_hopdong_ex").data("kendoGrid").saveAsExcel();

    //var ds = $('#grid_hopdong').data("kendoGrid").dataSource;    
    //var rows = [{

    //    cells: [

    //      { value: "Tên nhà thầu", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày kí hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị trước thuế", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị VAT", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Giá trị sau thuế", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số tiền bằng chữ", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày hết hạn", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày kế hoạch", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày hiệu lực", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Nội dung", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Người tạo hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày tạo hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Loại hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Hình thức mua sắm", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Ngày thanh lý", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
    //      { value: "Số ngày thực hiện", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" }

    //    ]
    //}];
    //var workbook;
    ////using fetch, so we can process the data when the request is successfully completed
    //ds.fetch(function () {
    //    var data = this.data();
    //    for (var i = 0; i < data.length; i++) {
    //        //push single row for every record
    //        rows.push({
    //            cells: [
    //              {
    //                  value: data[i].NhaThau_Ten
    //                  ,vAlign: "center" // sets the vertical text alignment.
    //                  ,hAlign: "center" // sets the horizontal text alignment.
    //                  //,background:"#0000ff" //sets the background color of the cell.
    //                  ,bold:true //the cell value is displayed in bold.
    //                  //,color:"#ff0000"// sets the cell text color.
    //                  ,fontName:"Arial" // sets the font used to display the cell value.
    //                  //,fontSize // sets the font size of the cell value.                        
    //                  //,italic // the cell value is displayed in italic.                                                
    //                  //,underline // the cell value is underlined.
    //              },
    //              { value: data[i].NgayKy },
    //              { value: data[i].MaHD },
    //              { value: OnChangeFormat(data[i].GiaTriTruocThue) },
    //              { value: OnChangeFormat(data[i].VAT_HD) },
    //              { value: OnChangeFormat(data[i].GiaTriSauThue) },
    //              { value: data[i].SoTienBangChu },
    //              { value: data[i].NgayHetHan},
    //              { value: data[i].NgayKeHoach_NT },
    //              { value: data[i].NgayHieuLuc},
    //              { value: data[i].NoiDung },
    //              { value: data[i].NguoiTaoHD },
    //              { value: data[i].NgayTao },
    //              { value: data[i].LoaiHD_Ten},
    //              { value: data[i].HinhThucMS_Ten},
    //              { value: data[i].NgayThanhLy},
    //              { value: data[i].SoNgayThucHien}

    //            ]
    //        })
    //    }
    //    workbook = new kendo.ooxml.Workbook({
    //        sheets: [
    //          {
    //              freezePane: {
    //                  rowSplit: 1,
    //                  colSplit: 1
    //              },
    //              columns: [
    //                // Column settings (width)
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true },
    //                { autoWidth: true }
    //              ],
    //              // Title of the sheet
    //              title: "Danh sách hợp đồng",
    //              // Rows of the sheet
    //              rows: rows
    //          }
    //        ]

    //    });

    //    //save the file as Excel file with extension xlsx
    //    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "DanhSachHopDong.xlsx" });
    //});



}
function exportChildData(key_id, rowIndex) {

    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{

        cells: [

          { value: "Vật tư", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số lượng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số hợp đồng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Số lượng khả dụng", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Đơn giá", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Đơn vị tính", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Thành tiền", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "VAT", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" },
          { value: "Ghi chú", hAlign: "center", bold: true, background: "#e9ebec", fontName: "Arial" }
        ]
    }];

    var exporter = new kendo.ExcelExporter({
        columns: [
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
                title: "Mã tập đoàn",
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
                title: "Số lượng",
                headerAttributes: {
                    class: "header_css"
                },
                field: "SoLuong",
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
        ],
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'Lay_DS_HopDong_CT',
                            HopDong_ID: key_id
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=HopDong_Ao.aspx";
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

        }
    });

    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });
}
//#endregion

//#region Them HD
function Ham_Them_HD() {

    $("#wd_them_hd").data("kendoWindow").center().open();
    //$(".k-widget.k-dropdown.k-header").attr("style", "display:inline-block;width: auto;");

}
function Ham_Dong_ThemHD() {
    $("#wd_them_hd").data("kendoWindow").close();
}
function Ham_Luu_ThemHD() {

    var check = 0;

    if ($("#txt_sohd").val() == "") {
        check = 1;
        alert("Chưa nhập số hợp đồng ảo!");
        return;
    }
    //if ($("#cmb_LoaiHD").data("kendoDropDownList").value() == "") {
    //    check = 1;
    //    alert("Chưa chọn loại hợp đồng!");
    //    return;
    //}
    if ($("#cmb_NhaThau").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn nhà thầu!");
        return;
    }
    //if ($("#txt_ngay_kyHD").val() == "") {
    //    check = 1;
    //    alert("Chưa chọn ngày kí hợp đồng!");
    //    return;
    //}
    //if ($("#txt_gthd").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập giá trị hợp đồng!");
    //    return;
    //}
    //if ($("#txt_gthd_chu").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập giá trị hợp đồng dạng chữ!");
    //    return;
    //}
   
    //if ($("#txt_ngay_hieuluc").val() == "") {
    //    check = 1;
    //    alert("Chưa chọn ngày hiệu lực!");
    //    return;
    //}
    //if ($("#txt_NoiDung").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập nội dung hợp đồng!");
    //    return;
    //}
    
    if ($("#cmb_HTMS").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn hình thức mua sắm!");
        return;
    }
    //if ($("#txt_SoNgayThucHien").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập số ngày thực hiện!");
    //    return;
    //}
    //if (Path == "") {
    //    check = 1;
    //    alert("Chưa upload tập tin văn bản!");
    //    return;
    //}
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao.aspx",
            data: {
                cmd: 'Luu_HopDong',
                p_MaHopDong: $("#txt_sohd").val(),
                p_NhaThau: $("#cmb_NhaThau").data("kendoDropDownList").value(),
                p_NgayKi: $("#txt_ngay_kyHD").val(),
                p_GTHD_TT: $("#txt_gthd").val().replace(/\,/g, ""),
                p_VAT: $("#txt_vat").val().replace(/\,/g, ""),
                p_GTHD_ST: $("#txt_gthd_vat").val().replace(/\,/g, ""),
                p_GTHD_chu: $("#txt_gthd_chu").val(),
                p_NgayKeHoach: "",//Ngày kế hoạch
                p_NgayHieuLuc: $("#txt_ngay_hieuluc").val(),
                p_NoiDung: $("#txt_NoiDung").val(),
                p_LoaiHD: $("#cmb_LoaiHD").data("kendoDropDownList").value(),
                p_HinhThucMS: $("#cmb_HTMS").data("kendoDropDownList").value(),
                p_SoNgayThucHien: $("#txt_SoNgayThucHien").val(),
                p_Path: Path,
                p_NguonVon: $("#cmb_NguonVon").data("kendoDropDownList").value()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã tạo mới hợp đồng ảo thành công!");
                $("#wd_them_hd").data("kendoWindow").close();
                DS_HopDong.read();
                Ham_Clear_Form_HopDong();
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
function Ham_Clear_Form_HopDong() {

    $("#txt_sohd").val("");
    $("#cmb_NhaThau").data("kendoDropDownList").select(0),
    $("#txt_ngay_kyHD").val("");

    $("#txt_gthd").val("");
    $("#txt_gthd_chu").val("");
    $("#txt_vat").val("");
    $("#txt_gthd_vat").val("");


    //$("#txt_ngay_kehoach").val("");
    $("#txt_ngay_hieuluc").val("");
    $("#txt_NoiDung").val("");
    $("#cmb_LoaiHD").data("kendoDropDownList").select(0);
    $("#cmb_HTMS").data("kendoDropDownList").select(0);
    $("#txt_SoNgayThucHien").data("kendoNumericTextBox").value("");

}

//#endregion

//#region Sửa HD
function func_SuaHD(p_HopDong_ID) {

    $("#wd_sua_hd").data("kendoWindow").center().open();

    var grid_data = $("#grid_hopdong").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.HopDong_ID == p_HopDong_ID;
    });

    ////////////////////////////////////
    HopDong_ID = p_HopDong_ID;

    
    $("#txt_sohd_sua").val(res[0].MaHD);

    $("#txt_ngay_kyHD_sua").val(res[0].NgayKy_f);
  
    $("#txt_ngay_hieuluc_sua").val(res[0].NgayHieuLuc_f);
    $("#txt_NoiDung_sua").text(res[0].NoiDung);
    $("#txt_gthd_chu_sua").text(res[0].SoTienBangChu);

    $("#txt_gthd_sua").val(OnChangeFormat(res[0].GiaTriTruocThue));
    $("#txt_vat_sua").val(OnChangeFormat(res[0].VAT_HD));
    $("#txt_gthd_vat_sua").val(OnChangeFormat(res[0].GiaTriSauThue));
    $("#txt_gthd_chu_sua").val(res[0].SoTienBangChu);


    $("#txt_SoNgayThucHien_sua").data("kendoNumericTextBox").value(res[0].SoNgayThucHien);
    $("#cmb_LoaiHD_sua").data("kendoDropDownList").value(res[0].LoaiHD_ID);
    $("#cmb_HTMS_sua").data("kendoDropDownList").value(res[0].HinhThucMS_ID);
    $("#cmb_NhaThau_sua").data("kendoDropDownList").value(res[0].NhaThau_ID);
    $("#cmb_NguonVon_sua").data("kendoDropDownList").value(res[0].NguonVon_ID);

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
function Ham_Dong_SuaHD() {
    $("#wd_sua_hd").data("kendoWindow").close();;
}

function Ham_Luu_SuaHD() {

    var check = 0;
    if ($("#txt_sohd_sua").val() == "") {
        check = 1;
        alert("Chưa nhập số hợp đồng!");
        return;
    }
    if ($("#cmb_LoaiHD_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại hợp đồng!");
        return;
    }
    if ($("#cmb_NhaThau_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn nhà thầu!");
        return;
    }
    //if ($("#txt_ngay_kyHD_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa chọn ngày kí hợp đồng!");
    //    return;
    //}
    //if ($("#txt_gthd_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập giá trị hợp đồng!");
    //    return;
    //}
    //if ($("#txt_gthd_chu_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập giá trị hợp đồng dạng chữ!");
    //    return;
    //}
 
    //if ($("#txt_ngay_hieuluc_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa chọn ngày hiệu lực!");
    //    return;
    //}
    //if ($("#txt_NoiDung_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập nội dung hợp đồng!");
    //    return;
    //}
    
    if ($("#cmb_HTMS_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn hình thức mua sắm!");
        return;
    }
    //if ($("#txt_SoNgayThucHien_sua").val() == "") {
    //    check = 1;
    //    alert("Chưa nhập số ngày thực hiện!");
    //    return;
    //}
    if (check == 0) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao.aspx",
            data: {
                cmd: 'Sua_HopDong',
                p_HopDong_ID: HopDong_ID,
                p_MaHopDong: $("#txt_sohd_sua").val(),
                p_NhaThau: $("#cmb_NhaThau_sua").data("kendoDropDownList").value(),
                p_NgayKi: $("#txt_ngay_kyHD_sua").val(),
                p_GTHD_TT: $("#txt_gthd_sua").val().replace(/\,/g, ""),
                p_VAT: $("#txt_vat_sua").val().replace(/\,/g, ""),
                p_GTHD_ST: $("#txt_gthd_vat_sua").val().replace(/\,/g, ""),
                p_GTHD_chu: $("#txt_gthd_chu_sua").val(),
                p_NgayKeHoach: "",//Ngày kế hoạch
                p_NgayHieuLuc: $("#txt_ngay_hieuluc_sua").val(),
                p_NoiDung: $("#txt_NoiDung_sua").val(),
                p_LoaiHD: $("#cmb_LoaiHD_sua").data("kendoDropDownList").value(),
                p_HinhThucMS: $("#cmb_HTMS_sua").data("kendoDropDownList").value(),
                p_SoNgayThucHien: $("#txt_SoNgayThucHien_sua").val(),
                p_Path: Path_Sua,
                p_NguonVon: $("#cmb_NguonVon_sua").data("kendoDropDownList").value()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa hợp đồng ảo thành công!");
                $("#wd_sua_hd").data("kendoWindow").close();
                DS_HopDong.read();
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


//#endregion

//#region Xóa HD

function func_XoaHD(HopDong_ID) {

    if (confirm("Bạn có chắc chắn muốn xóa hợp đồng này không?")) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao.aspx",
            data: {
                cmd: 'Xoa_HopDong',
                p_HopDong_ID: HopDong_ID

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa hợp đồng thành công!");
                DS_HopDong.read();
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



//#region thêm ct HĐ
function Ham_Them_HD_CT() {

    $("#wd_them_hd_ct").data("kendoWindow").center().open();
    $("#cmb_LoaiVatTu .k-widget.k-dropdown.k-header").attr("style", "display:inline-block;width: 600px;");

}
function Ham_Dong_ThemHD_CT() {

    $("#wd_them_hd_ct").data("kendoWindow").close();
}
function Ham_Luu_ThemHD_CT() {

    var check = 0;

    if ($("#cmb_LoaiVatTu").data("kendoComboBox").value() == "") {
        check = 1;
        alert("Chưa chọn loại vật tư!");
        return;
    }
    if ($("#cmb_VatTu").data("kendoComboBox").value() == "") {
        check = 1;
        alert("Chưa chọn vật tư!");
        return;
    }
    if ($("#tr_dvt_khac").is(":visible") == true) {

        if ($("#cmb_DVT").data("kendoDropDownList").value() == "") {
            check = 1;
            alert("Chưa chọn đơn vị tính khác!");
            return;
        }
    }
    if ($("#txt_SoLuong").val() == "" || $("#txt_SoLuong").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if ($("#txt_DonGia").val() == "" || $("#txt_DonGia").val() == "0") {
        check = 1;
        alert("Chưa đơn giá!");
        return;
    }
    
    if (check == 0) {

        var SoLuong = parseFloat($("#txt_SoLuong").val());
        var DonGia = parseFloat($("#txt_DonGia").val().replace(/\,/g, ""));
        var ThanhTien = SoLuong * DonGia;
        var VAT = ThanhTien * (1 / 10);
        var TongTien = ThanhTien + VAT;
        var HopDong_ID = detailInit_e.data.HopDong_ID;

        var DonViTinh;
        if ($("#tr_dvt_khac").is(":visible") == true) {

            DonViTinh = $("#cmb_DVT").data("kendoDropDownList").value();
        } else {
            DonViTinh = null;
        }

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
            data: {
                cmd: 'Luu_CT_HopDong',
                p_HopDong_ID: HopDong_ID,
                p_VatTu_ID: $("#cmb_VatTu").data("kendoComboBox").value(),
                p_SoLuong: SoLuong,
                p_DonGia: DonGia,
                p_ThanhTien: ThanhTien,
                p_VAT: VAT,                
                p_GhiChu: $("#txt_GhiChu").val(),
                p_DVT: DonViTinh
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã thêm vật tư thành công!");
                $("#wd_them_hd_ct").data("kendoWindow").close();
                detailInit(detailInit_e);
                Ham_Clear_Form_CT_HD();
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
function Ham_Clear_Form_CT_HD() {

    $("#cmb_LoaiVatTu").data("kendoComboBox").text("");
    $("#cmb_VatTu").data("kendoComboBox").select(0);

    $("#txt_SoLuong").data("kendoNumericTextBox").value("");
    $("#txt_DonGia").val("");
    
    $("#txt_GhiChu").val("");
}
//#endregion 

//#region sửa ct HĐ
function func_SuaHD_CT(STT, VatTu_ID, VatTu_Ten, SoLuong, DonGia, MaDVT, GhiChu) {

    $("#wd_sua_hd_ct").data("kendoWindow").center().open();

    v_STT = STT;

    //var grid_data = $("#tab_VatTu").data("kendoGrid"),
    //        data = grid_data.dataSource.data();

    //var res = $.grep(data, function (d) {
    //    return d.STT == p_STT;
    //});

    ////////////////////////////////////

    $("#cmb_VatTu_sua").text(VatTu_Ten);

    VatTu_ID_Sua = VatTu_ID;

    $("#txt_SoLuong_sua").data("kendoNumericTextBox").value(SoLuong);
    $("#txt_DonGia_sua").val(OnChangeFormat(DonGia));
    
    $("#txt_GhiChu_sua").val(GhiChu);

}
function Ham_Luu_SuaHD_CT() {

    var check = 0;

    if ($("#txt_SoLuong_sua").val() == "" || $("#txt_SoLuong_sua").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if ($("#txt_DonGia_sua").val() == "" || $("#txt_DonGia_sua").val() == "0") {
        check = 1;
        alert("Chưa nhập đơn giá!");
        return;
    }
    
    if (check == 0) {

        var SoLuong = parseFloat($("#txt_SoLuong_sua").val());
        var DonGia = parseFloat($("#txt_DonGia_sua").val().replace(/\,/g, ""));
        var ThanhTien = SoLuong * DonGia;
        var VAT = ThanhTien * (1 / 10);
        var TongTien = ThanhTien + VAT;
        var HopDong_ID = detailInit_e.data.HopDong_ID;        

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
            data: {
                cmd: 'Sua_CT_HopDong',
                p_STT: v_STT,
                p_VatTu_ID: VatTu_ID_Sua,
                p_SoLuong: $("#txt_SoLuong_sua").val(),
                p_DonGia: $("#txt_DonGia_sua").val().replace(/\,/g, ""),
                p_ThanhTien: ThanhTien,
                p_VAT: VAT,                
                p_GhiChu: $("#txt_GhiChu_sua").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa vật tư thành công!");
                $("#wd_sua_hd_ct").data("kendoWindow").close();

                //var grid = $('#grid_hopdong').data('kendoGrid');
                //var allMasterRows = grid.tbody.find('>tr.k-master-row');

                //for (var i = 0; i < allMasterRows.length; i++) {
                //    grid.collapseRow(allMasterRows.eq(i));
                //}

                //$('#grid_hopdong').data('kendoGrid').refresh();

                //var grid = $("#grid").data("kendoGrid");
                //var dataView = grid.dataSource.view();

                //for (var i = 0; i < dataView.length; i++) {
                //    for (var j = 0; j < dataView[i].items.length; j++) {
                //        if (dataView[i].items[j].status == "Closed") {
                //            var uid = dataView[i].items[j].uid;
                //            grid.collapseGroup($("#grid").find("tr[data-uid=" + uid + "]").prev("tr.k-grouping-row"));
                //        }
                //    }
                //}

                detailInit(detailInit_e);
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
function Ham_Dong_SuaHD_CT() {

    $("#wd_sua_hd_ct").data("kendoWindow").close();
}
//#endregion

//#region xóa ct HĐ

function func_XoaHD_CT(STT) {

    if (confirm("Bạn có chắc chắn muốn xóa vật tư này không?")) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao_CT.aspx",
            data: {

                cmd: 'Xoa_CT_HopDong',
                p_STT: STT

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa vật tư thành công!");
                detailInit(detailInit_e);
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


//#region tiện ích
function GetPriceText(id_1, id_2, id_3, id_4) {

    var variable = document.getElementById(id_1);
    var new_value = variable.value.replace(/\,/g, "");
    //variable.style.textAlign = "right";
    variable.value = OnChangeFormat(new_value);

    var GiaTriTruocThue = parseFloat(variable.value.replace(/\,/g, ""));
    var VAT = GiaTriTruocThue * 10 / 100;
    var GiaTriSauThue = GiaTriTruocThue + VAT;

    if (variable.value == "") {
        $("#" + id_2 + "").val("");
        $("#" + id_3 + "").val("");
        $("#" + id_4 + "").val("");
    }
    else {
        $("#" + id_2 + "").val(OnChangeFormat(VAT));
        $("#" + id_3 + "").val(OnChangeFormat(GiaTriSauThue));
        $("#" + id_4 + "").val(DocTienBangChu(parseFloat(GiaTriSauThue)) + " đồng");
    }
}
function Ham_onkeyup(id) {
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

//#endregion


//#region Chuyển đổi
function Ham_Huy_CD_HD() {
    $("#wd_ChuyenDoi_hd").data("kendoWindow").close();
}

function Ham_ChuyenDoi(p_HopDong_ID) {

    $("#wd_ChuyenDoi_hd").data("kendoWindow").center().open();

    var grid_data = $("#grid_hopdong").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.HopDong_ID == p_HopDong_ID;
    });

    ////////////////////////////////////
    HopDong_ID = p_HopDong_ID;


    $("#txt_sohd_cd").val(res[0].MaHD);

    $("#txt_ngay_kyHD_cd").val(res[0].NgayKy_f);

    $("#txt_ngay_hieuluc_cd").val(res[0].NgayHieuLuc_f);
    $("#txt_NoiDung_cd").text(res[0].NoiDung);
    $("#txt_gthd_chu_cd").text(res[0].SoTienBangChu);

    $("#txt_gthd_cd").val(OnChangeFormat(TongGiaTri_VT));
    $("#txt_vat_cd").val(OnChangeFormat(TongGiaTri_VT/10));
    $("#txt_gthd_vat_cd").val(OnChangeFormat(TongGiaTri_VT+(TongGiaTri_VT/10)));
    $("#txt_gthd_chu_cd").val(DocTienBangChu(parseFloat(TongGiaTri_VT + (TongGiaTri_VT / 10))) + " đồng");
    

    $("#txt_SoNgayThucHien_cd").data("kendoNumericTextBox").value(res[0].SoNgayThucHien);
    $("#cmb_LoaiHD_cd").data("kendoDropDownList").value(res[0].LoaiHD_ID);
    $("#cmb_HTMS_cd").data("kendoDropDownList").value(res[0].HinhThucMS_ID);
    $("#cmb_NhaThau_cd").data("kendoDropDownList").value(res[0].NhaThau_ID);


    Path_Cd = res[0].FileVB;

    if (res[0].FileVB == "" || res[0].FileVB == null) {

        $("#tr_download_cd").hide();
        $("#tr_upload_cd").show();


    } else {

        $("#tr_download_cd").show();
        $("#tr_upload_cd").hide();

        $("#btn_download_cd").attr("href", "" + res[0].FileVB + "");



    }
}


function Ham_Luu_CD_HD() {

    
    var check = 0;

    if ($("#txt_sohd_cd").val() == "") {
        check = 1;
        alert("Chưa nhập số hợp đồng!");
        return;
    }
    if ($("#cmb_LoaiHD_cd").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại hợp đồng!");
        return;
    }
    if ($("#cmb_NhaThau_cd").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn nhà thầu!");
        return;
    }
    if ($("#txt_ngay_kyHD_cd").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kí hợp đồng!");
        return;
    }
    if ($("#txt_gthd_cd").val() == "") {
        check = 1;
        alert("Chưa nhập giá trị hợp đồng!");
        return;
    }
    if ($("#txt_gthd_chu_cd").val() == "") {
        check = 1;
        alert("Chưa nhập giá trị hợp đồng dạng chữ!");
        return;
    }
    if ($("#cmb_HTMS_cd").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn hình thức mua sắm!");
        return;
    }
          
    if ($("#txt_SoNgayThucHien_cd").val() == "") {
        check = 1;
        alert("Chưa nhập số ngày thực hiện!");
        return;
    }
    if ($("#txt_ngay_hieuluc_cd").val() == "") {
        check = 1;
        alert("Chưa chọn ngày hiệu lực!");
        return;
    }
    if ($("#txt_NoiDung_cd").val() == "") {
        check = 1;
        alert("Chưa nhập nội dung hợp đồng!");
        return;
    }
        
    //if (Path == "") {
    //    check = 1;
    //    alert("Chưa upload tập tin văn bản!");
    //    return;
    //}
    if (check == 0) {
        
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_Ao.aspx",
            data: {
                cmd: 'Chuyen_HopDong_That',
                p_MaHopDong: $("#txt_sohd_cd").val(),
                p_NhaThau: $("#cmb_NhaThau_cd").data("kendoDropDownList").value(),
                p_NgayKi: $("#txt_ngay_kyHD_cd").val(),
                p_GTHD_TT: $("#txt_gthd_cd").val().replace(/\,/g, ""),
                p_VAT: $("#txt_vat_cd").val().replace(/\,/g, ""),
                p_GTHD_ST: $("#txt_gthd_vat_cd").val().replace(/\,/g, ""),
                p_GTHD_chu: $("#txt_gthd_chu_cd").val(),
                p_NgayKeHoach: "",
                p_NgayHieuLuc: $("#txt_ngay_hieuluc_cd").val(),
                p_NoiDung: $("#txt_NoiDung_cd").val(),
                p_LoaiHD: $("#cmb_LoaiHD_cd").data("kendoDropDownList").value(),
                p_HinhThucMS: $("#cmb_HTMS_cd").data("kendoDropDownList").value(),
                p_SoNgayThucHien: $("#txt_SoNgayThucHien_cd").val(),
                p_Path: Path,
                HopDong_ID_Ao: HopDong_ID,
                p_NguonVon: $("#cmb_NguonVon").data("kendoDropDownList").value()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã tạo chuyển đổi thành công!");
                $("#wd_ChuyenDoi_hd").data("kendoWindow").close();
                DS_HopDong.read();
                Ham_Clear_Form_HopDong();
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
//#endregion



//#region Phân quyền Hợp đồng
function func_PhanQuyenHD(p_HopDong_ID) {

    var grid_donvi = $("#grid_DonVi").kendoGrid({
        dataSource: {
            sort: { field: "ID", dir: "asc" },
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_Ao.aspx",
                        data: {
                            cmd: 'Show_Quyen_HD',
                            HopDong_ID: p_HopDong_ID
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
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "ID", operator: "eq", value: 65 },
                    { field: "ID", operator: "eq", value: 66 }
                ]
            }
        },
        columns:
            [
                { field: "ID", hidden: true },
                {
                    field: "select_dv",
                    title: "<input id='chk_all' type='checkbox' />",
                    headerAttributes: {
                        class: "header_css"
                    },
                    template: function (data) {
                        if (data.Quyen_HD == 0) {
                            return '<center><input type=\'checkbox\' /></center>'
                        }
                        else {
                            return '<center><input type=\'checkbox\' checked=\'true\' /></center>'
                        }
                    },
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
    document.getElementById('chk_all').checked = false;
    $("#hf_HopDong_ID").val(p_HopDong_ID);
    $("#wd_share").data().kendoWindow.center().open();




}
function Ham_Luu_Share() {

    var str_id_dv = '';

    for (var j = 1; j < $("#grid_DonVi tr").length; j++) {

        var chb_dv = $("#grid_DonVi tr")[j].cells[1].childNodes[0].childNodes[0];

        var id = $("#grid_DonVi tr")[j].cells[0].childNodes[0].textContent;

        if (chb_dv.checked == true) {

            str_id_dv += '' + id + ',';

        }
    }
    str_id_dv = str_id_dv.replace(/^,|,$/g, '');

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_HopDong_Ao.aspx",
        data: {

            cmd: 'Luu_PhanQuyen_HD',
            str_DonVi: str_id_dv,
            HopDong_ID: $("#hf_HopDong_ID").val()

        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Hợp đồng đã chia sẽ !"
            }, "upload-success");

            $("#wd_share").data().kendoWindow.close();
            $("#grid_DonVi").data().kendoGrid.dataSource.read();
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