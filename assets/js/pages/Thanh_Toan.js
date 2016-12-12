var DS_PO, DS_PO_Loc, ds_tt_vattu, DS_BangKe_Cap1, DS_BangKe_Cap2;
var BienChiTietPO, Bien_ChiTiet_VatTu;
var Bien_ChiTiet_grid_TT_PO;

var Dot_ThanhToan_ID, MaHD, HopDong_ID, PO_ID,VatTu_ID;
var Path, Path_Sua;
var Dot_ThanhToan_ID, Dot_ThanhToan_TienTrinh_ID;


$(document).ready(function () {

 
    //$("#main-menu-toggle").click();
    $("#main-menu-min").click();

    //document.oncontextmenu = function () { return false; }

    $('#div_thanhtoan').hide();
    $('#btn_Back').hide();

    //#region Upload   

    
    $('#files_upload_TD').kendoUpload({
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

    //#region DataSource PO7 HĐ 091-16

    //DS_PO = new kendo.data.DataSource({

    //    requestEnd: function (e) {
    //        if (e.type)
    //            e.response.d = JSON.parse(e.response.d);
    //    },
    //    schema: {
    //        data: 'd.Data',
    //        total: 'd.Total[0].Total'
    //    },
    //    pageSize: 5,
    //    serverPaging: true,
    //    serverSorting: true,
    //    sort: {
    //        field: 'PO_ID',
    //        dir: 'desc'
    //    },
    //    transport: {
    //        read: {
    //            contentType: "application/json; charset=utf-8",
    //            dataType: 'json',
    //            type: 'POST',
    //            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_bySoPO",
    //            data: {
    //                SoPO: 'PO7 HĐ 091-16'
    //            }
    //        },
    //        parameterMap: function (options, operation) {
    //            return kendo.stringify(options);
    //        }
    //    }
    //});

    DS_PO = new kendo.data.DataSource({

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
            field: 'PO_ID',
            dir: 'desc'
        },
        transport: {
            read: {
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: 'POST',
                url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
            },
            parameterMap: function (options, operation) {
                return kendo.stringify(options);
            }
        }
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
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

    $("#grid_thanhvien").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   thành viên",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"
            }
        },
        editable: true,
        navigatable: true,
        //edit: function (e) {

        //    var input = e.container.find(".k-input");
        //    input.val("");

        //},        
        columns:
            [

                {
                    title: "Thành viên",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "Ten_ThanhVien",
                    editor: function nonEditor(container, options) {
                        container.text(options.model[options.field]);
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    width: 200
                },
                {
                    title: "Giá trị đề nghị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GiaTri_DeNghi",
                    template: "#= GiaTri_DeNghi== null ? 0 : OnChangeFormat(GiaTri_DeNghi) #",
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoNumericTextBox({
                                format: '#',
                                decimals: 0,
                                min: 0
                            });
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;background-color:lightyellow;"
                    },
                    width: 200
                },
                {
                    title: "Số VB đề nghị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVB_DeNghi",
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 200
                },
		       {
		           title: "Ngày VB đề nghị",
		           headerAttributes: {
		               class: "header_css"
		           },
		           field: "NgayVB_DeNghi",
		           template: "#= NgayVB_DeNghi == null || NgayVB_DeNghi == '' ?  '' : kendo.toString(kendo.parseDate(NgayVB_DeNghi, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
		           editor: function (container, options) {
		               $('<input name="' + options.field + '"/>')
                           .appendTo(container)
                           .kendoDatePicker({
                               format: "dd/MM/yyyy"
                           });
		           },
		           attributes: {
		               class: "row_css",
		               style: "background-color:lightyellow;"
		           },
		           width: 150
		       },
               {
                   title: "Tài khoản thụ hưởng",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "TaiKhoanThuHuong",
                   attributes: {
                       class: "row_css",
                       style: "background-color:lightyellow;"
                   },
                   width: 200
               },
               {
                   title: "Tại ngân hàng",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "TaiNganHang",
                   attributes: {
                       class: "row_css",
                       style: "background-color:lightyellow;"
                   },
                   width: 200
               },
                {
                    title: "Số VB bão lãnh",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVB_BaoLanh",
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 200
                },
                {
                    title: "Ngày VB bão lãnh",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayVB_BaoLanh",
                    template: "#= NgayVB_BaoLanh == null || NgayVB_BaoLanh == '' ?  '' : kendo.toString(kendo.parseDate(NgayVB_BaoLanh, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDatePicker({
                                format: "dd/MM/yyyy"
                            });
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 150
                },
                {
                    title: "Ngân hàng phát hành",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NganHang_PhatHanh",
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 200
                },
                {
                    title: "Ngày hiệu lực bảo lãnh",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHieuLuc_BaoLanh",
                    template: "#= NgayHieuLuc_BaoLanh == null || NgayHieuLuc_BaoLanh == '' ?  '' : kendo.toString(kendo.parseDate(NgayHieuLuc_BaoLanh, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
                    editor: function (container, options) {
                        $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDatePicker({
                                format: "dd/MM/yyyy"
                            });
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: 150
                },


               {
                   title: "Số VB chuyển HS đề nghị",
                   headerAttributes: {
                       class: "header_css"
                   },
                   field: "SoVB_ChuyenHS_DeNghi",
                   attributes: {
                       class: "row_css",
                       style: "background-color:lightyellow;"
                   },
                   width: 200
               },
		        {
		            title: "Ngày VB chuyển HS đề nghị",
		            headerAttributes: {
		                class: "header_css"
		            },
		            field: "NgayVB_ChuyenHS_DeNghi",
		            template: "#= NgayVB_ChuyenHS_DeNghi == null || NgayVB_ChuyenHS_DeNghi == '' ?  '' : kendo.toString(kendo.parseDate(NgayVB_ChuyenHS_DeNghi, 'dd/MM/yyyy'), 'dd/MM/yyyy') #",
		            editor: function (container, options) {
		                $('<input name="' + options.field + '"/>')
                            .appendTo(container)
                            .kendoDatePicker({
                                format: "dd/MM/yyyy"
                            });
		            },
		            attributes: {
		                class: "row_css",
		                style: "background-color:lightyellow;"
		            },
		            width: 200
		        }

            ]
    });

    $("#grid_thanhvien").data("kendoGrid").table.bind("keypress", function (e) {
        if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey) {

            //get currently navigated cell, this id follows user's navigation
            var activeCell = $("#grid_thanhvien");

            //don't do anything if already editing cell        
            if (activeCell.hasClass("k-edit-cell")) return;

            grid.editCell(activeCell);
            var input = activeCell.find("input");

            //number datatype editor loses key press character when entering edit
            if (input.last().attr('data-type') === 'number') {
                input.val(String.fromCharCode(e.keyCode | e.charCode));
            } else {
                input.val("");
            }
        }
    });

    //Kendo "Enter" key input is captured through this binding
    $("#grid_thanhvien table").on("keydown", "tr", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) { //If key is ENTER
            //find index of the td element
            var tdIndex = $(e.target).closest('td').index();

            //get the next row's cell
            var nextRow = $(e.target).closest('tr').next();
            var nextRowCell = $(nextRow).find('td:eq(' + tdIndex + ')');

            //focus the next cell on a different context
            setTimeout(function () {
                var grid = $("#grid_thanhvien").data("kendoGrid");
                grid.current(nextRowCell);
            }, 0);
        }
    });


    $("#wd_TamUng").kendoWindow({
        draggable: false,
        height: "auto",
        width: "95%",
        //actions: false,        
        modal: true,
        resizable: false,
        title: "Cập nhật thông tin tạm ứng",
        visible: false

    }).data("kendoWindow");

    $("#wd_Khoa_TamUng").kendoWindow({
        draggable: false,
        height: "20%",
        width: "40%",
        modal: true,
        resizable: false,
        title: "Khóa tạm ứng",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");
    $("#wd_UNC_TamUng").kendoWindow({
        draggable: false,
        height: "20%",
        width: "40%",
        modal: true,
        resizable: false,
        title: "Nhập Ủy nhiệm chi",
        visible: false,
        actions: ["Close"]

    }).data("kendoWindow");

    $("#txt_NgayUNC").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayVB_XN_PO").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayChuyen_KT").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_NgayVB_BaoLanh").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_TyLe_TamUng").kendoNumericTextBox({
        format: 'n3',
        //decimals: 3,
        min: 0,
        max: 100,
        change: function () {

            var TyLe = parseFloat(this.value()) / 100;

            var TienTamUng = ReplaceComma($("#lb_TamUng_GT_PO").text()) * TyLe;

            //$("#txt_GT_TamUng").val(OnChangeFormat(TienTamUng.toFixed(3)));
            $("#txt_GT_TamUng").val(OnChangeFormat(TienTamUng));
        }
    });

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

    $("#txt_TyLe").kendoNumericTextBox({
        format: 'n3',
        decimals: 3,
        min: 1,
        max: 100,
        change: function () {
            var TyLe = parseFloat(this.value()) / 100;
            var TienVatTuThanhToan = parseFloat($("#grid_tt_vattu .k-footer-template").text().replace(/\,/g, "").trim());
            var TienThanhToan = TienVatTuThanhToan * TyLe;
            
            $("#txt_SoTien").val(OnChangeFormat(TienThanhToan));           
        }
    });

    $("#txt_TyLe_TD").kendoNumericTextBox({
        format: 'n3',
        decimals: 3,
        min: 1,
        max: 100,
        change: function () {

            var TienVatTuThanhToan = 0;
            for (var i = 0; i < $("#grid_TT_PO").data().kendoGrid.dataSource.data().length; i++) {
                TienVatTuThanhToan += $("#grid_TT_PO").data().kendoGrid.dataSource.data()[i].ThanhTien_ThanhToan_Dot;
            }
            
            var TyLe = parseFloat(this.value()) / 100;
            
            var TienThanhToan = TienVatTuThanhToan * TyLe;

            $("#txt_SoTien_TD").val(OnChangeFormat(TienThanhToan));
        }
    });
    $("#chk_TamUng").change(function () {
        if ($("#chk_TamUng")[0].checked) {

            var TienVatTuThanhToan = 0;
            for (var i = 0; i < $("#grid_TT_PO").data().kendoGrid.dataSource.data().length; i++) {
                TienVatTuThanhToan += $("#grid_TT_PO").data().kendoGrid.dataSource.data()[i].ThanhTien_ThanhToan_Dot;
            }

            var TyLe = parseFloat($("#txt_TyLe_TD").data().kendoNumericTextBox.value()) / 100;

            var TienThanhToan = TienVatTuThanhToan * TyLe;

            $("#txt_SoTien_TD").val(OnChangeFormat(TienThanhToan - ReplaceComma($("#lb_TamUng").text())));

        }
        else {

            var TienVatTuThanhToan = 0;
            for (var i = 0; i < $("#grid_TT_PO").data().kendoGrid.dataSource.data().length; i++) {
                TienVatTuThanhToan += $("#grid_TT_PO").data().kendoGrid.dataSource.data()[i].ThanhTien_ThanhToan_Dot;
            }

            var TyLe = parseFloat($("#txt_TyLe_TD").data().kendoNumericTextBox.value()) / 100;

            var TienThanhToan = TienVatTuThanhToan * TyLe;

            $("#txt_SoTien_TD").val(OnChangeFormat(TienThanhToan));
        }

    });
    

    $("#txt_NgayChungTu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayChungTu_TD").kendoDatePicker({
        format: "dd/MM/yyyy"
    });    
    $("#txt_NgayChungTu_Sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayChungTu_CT").kendoDatePicker({
        format: "dd/MM/yyyy"
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
    $("#cmb_LoaiTienTrinh_TD").kendoDropDownList({
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

    var wd_DotThanhToan_TD = $("#wd_DotThanhToan_TD").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        modal: true,
        resizable: false,
        title: "Tạo mới đợt thanh toán",
        visible: false,
        //actions: false
        actions: ["Close"],
        close: function (e) {            
            //Ham_Xoa_ThanhToan_Tam(Dot_ThanhToan_ID, Dot_ThanhToan_TienTrinh_ID);
            Ham_Check_ThanhToan_Tam();
        }

    }).data("kendoWindow");
        

    var wd_ChiTietTT = $("#wd_ChiTietTT").kendoWindow({
        draggable: false,
        height: "40%",
        width: "50%",
        modal: true,
        resizable: false,
        title: "Chi tiết thanh toán",
        visible: false,
        //actions: false
        actions: ["Close"]

    }).data("kendoWindow");

    var wd_ThanhToan_DV = $("#wd_ThanhToan_DV").kendoWindow({
        draggable: false,
        height: "60%",
        width: "50%",
        actions: false,
        modal: true,
        resizable: false,
        title: "Số lượng thanh toán thực tế",
        visible: false,
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


    //#endregion

    

    //#region Grid Đợt thanh toán VTTP

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
                        },
                        width:"12%"
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
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                                    }
                                    else {
                                        options.success(result);
                                    }
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
                ],
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (f) {
                    
                    $("<div style='width:20%;' />").appendTo(f.detailCell).kendoGrid({
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                                        data: {
                                            cmd: 'Select_ThanhToan_CT_DonVi',
                                            ThanhToan_CT_ID: f.data.ThanhToan_CT_ID,
                                            VatTu_TD: f.data.mavt
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                    field: "DonVi_Ten",                                    
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
                                }
                            ]
                    });
                }


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
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                        title: "Số chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoVB",
                        attributes: {
                            class: "row_css"
                        }                        
                    },
                    {
                        title: "Ngày chứng từ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayVB",
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
                                return '<center><a class="btn btn-info" onclick="Ham_Sua_ThanhToanCT(' + data.Dot_ThanhToan_ID + ',' + data.Dot_ThanhToan_TienTrinh_ID + ',' + data.SoTien_TienTrinh + ',\'' + data.SoVB + '\',\'' + data.NgayVB + '\',\'' + data.GhiChu + '\');"><i class="fa fa-edit "></i> Sửa</a></center>'
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

    //#endregion

    //#region Grid chi tiết vật tư link QLVTOL VTTP
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
                title: "Mã vật tư",
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

    $("#chk_all_vt").click(function () {

        if (document.getElementById('chk_all_vt').checked) {

            for (var j = 1; j < $("#grid_ds_vattu tr").length; j++) {

                $("#grid_ds_vattu tr")[j].cells[0].childNodes[0].childNodes[0].checked = true;
            }
        }
        else {
            for (var j = 1; j < $("#grid_ds_vattu tr").length; j++) {

                $("#grid_ds_vattu tr")[j].cells[0].childNodes[0].childNodes[0].checked = false;
            }
        }

    });

    



    //#endregion

    //#region Grid Chi tiết vật tư đã chọn để thanh toán VTTP
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

    //#region Các button chức năng Đợt thanh toán

    $('#btn_Them_TT_TD').click(function (e) {

        //Clear form

        $("#txt_TyLe_TD").data("kendoNumericTextBox").value("");
        $("#txt_SoTien_TD").val("");
        $("#txt_SoChungTu_TD").val("");
        $("#txt_NgayChungTu_TD").val("");
        $("#txt_NoiDung_TD").val("");
        $("#cmb_LoaiTienTrinh_TD").data("kendoDropDownList").value("");
        $("#chk_TamUng").prop("checked", false);

        //Khởi tạo đợt thanh toán tạm
        Ham_Tao_ThanhToan_Tam(PO_ID, HopDong_ID);

        wd_DotThanhToan_TD.center().open();
    });

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
                            MaHD: MaHD
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
        //////////////////////////////

        gvData.bind('dataBound', function () {

            var ds_HD = new kendo.data.DataSource({
                data: ds.data(),
                group: { field: "so_hop_dong" }
            });
            cmb_search_HD.setDataSource(ds_HD);

            var ds_NT = new kendo.data.DataSource({
                data: ds.data(),
                group: { field: "nha_cung_cap" }
            });
            cmb_search_NT.setDataSource(ds_NT);

            var ds_PO = new kendo.data.DataSource({
                data: ds.data(),
                group: { field: "so_po" }
            });
            cmb_search_PO.setDataSource(ds_PO);

        });

        ///////////////////////////////////////////////
        wd_DotThanhToan.center().open();
        $("#txt_TyLe").data("kendoNumericTextBox").value("");
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
        if (parseFloat($("#txt_SoTien").val().replace(/\,/g, "").trim()) > TienVatTuThanhToan) {
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
                    PO_ID: PO_ID,
                    HopDong_ID:HopDong_ID,
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


    $('#btn_Luu_TT_TD').click(function (e) {
       

        var check = 0;
        if ($("#txt_SoTien_TD").val() == "") {
            check = 1;

            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập số tiền thanh toán!",
                message: ""
            }, "error");
            return;
        }
        if (ReplaceComma($("#txt_SoTien_TD").val()) < 0) {
            check = 1;

            $("#notification").data("kendoNotification").show({
                title: "Số tiền thanh toán thực tế âm!",
                message: ""
            }, "error");
            return;
        }

        if ($("#txt_SoChungTu_TD").val() == "") {
            check = 1;

            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập số chứng từ!",
                message: ""
            }, "error");
            return;
        }
        if ($("#txt_NgayChungTu_TD").val() == "") {
            check = 1;

            $("#notification").data("kendoNotification").show({
                title: "Chưa nhập ngày chứng từ!",
                message: ""
            }, "error");
            return;
        }
        if ($("#cmb_LoaiTienTrinh_TD").data("kendoDropDownList").value() == "") {
            check = 1;

            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn loại tiến trình!",
                message: ""
            }, "error");
            return;
        }
        if (check == 0) {

            var TienVatTuThanhToan = 0;
            for (var i = 0; i < $("#grid_TT_PO").data().kendoGrid.dataSource.data().length; i++) {
                TienVatTuThanhToan += $("#grid_TT_PO").data().kendoGrid.dataSource.data()[i].ThanhTien_ThanhToan_Dot;
            }

            var request = $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_ThanhToan.aspx",
                data: {
                    cmd: 'Dot_ThanhToan_Create_TD',
                    Dot_ThanhToan_ID: Dot_ThanhToan_ID,
                    Dot_ThanhToan_TienTrinh_ID: Dot_ThanhToan_TienTrinh_ID,
                    SoTienThucTe: $("#txt_SoTien_TD").val().replace(/\,/g, "").trim(),
                    HopDong_ID: HopDong_ID,
                    PO_ID: PO_ID,                    
                    SoTien: TienVatTuThanhToan,
                    SoChungTu: $("#txt_SoChungTu_TD").val().trim(),
                    NgayChungTu: $("#txt_NgayChungTu_TD").val().trim(),                    
                    LoaiTienTrinh: $("#cmb_LoaiTienTrinh_TD").data("kendoDropDownList").value(),
                    NoiDung: $("#txt_NoiDung_TD").val().trim(),
                    Path: Path                    
                },
                dataType: 'json'
            });
            request.done(function (msg) {

                if (msg[0].ErrorMessage == null) {

                    $("#notification").data("kendoNotification").show({
                        message: "Đã tạo mới đợt thanh toán!"
                    }, "upload-success");

                    wd_DotThanhToan_TD.close();

                    /////////////////////
                    Ham_Reload_ThanhToan_TD();
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
    

    

    $('#btn_chon_tatca_vt').click(function (e) {

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
                            MaHD: MaHD
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                        ngay_nhap: { type: "date" },
                        so_luong: { type: "number" },
                        don_gia: { type: "number" },
                        thanh_tien: { type: "number" }

                    }
                }
            },
            aggregate: [
                { field: "thanh_tien", aggregate: "sum" }
            ]
        });
        

        grid_tt_vattu.setDataSource(ds);
        grid_tt_vattu.refresh();

    });

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
                                PO_ID: PO_ID,
                                HopDong_ID: HopDong_ID
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

    //#region bộ lọc


    $("#Tr_Loc_TinhTrang").hide();
    $("#Tr_Loc_Loai_PO").hide();
    $("#Tr_Loc_NgayKi_PO_1").hide();
    $("#Tr_Loc_NgayKi_PO_2").hide();
    $("#Tr_Loc_NhaThau_1").hide();
    $("#Tr_Loc_NhaThau_2").hide();
    $("#Tr_Loc_SoHD_1").hide();
    $("#Tr_Loc_SoHD_2").hide();

    $("#cmb_BoLoc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Tình trạng PO", value: "1" },
            { text: "Loại PO", value: "2" },
            { text: "Ngày kí PO", value: "3" },
            { text: "Nhà thầu", value: "4" },
            { text: "Số hợp đồng", value: "5" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            switch (value) {
                case "1":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});
                    
                    $("#Tr_Loc_TinhTrang").show();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "2":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});
                    

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").show();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "3":

                    $("#txt_TuNgay").val("");
                    $("#txt_DenNgay").val("");


                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").show();
                    $("#Tr_Loc_NgayKi_PO_2").show();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "4":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});                    

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").show();
                    $("#Tr_Loc_NhaThau_2").show();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();


                    break;
                case "5":
                    $("#grid_PO").data("kendoGrid").dataSource.filter({});
                    

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").show();
                    $("#Tr_Loc_SoHD_2").show();


                    break;
                default:

                    $("#Tr_Loc_TinhTrang").hide();
                    $("#Tr_Loc_Loai_PO").hide();
                    $("#Tr_Loc_NgayKi_PO_1").hide();
                    $("#Tr_Loc_NgayKi_PO_2").hide();
                    $("#Tr_Loc_NhaThau_1").hide();
                    $("#Tr_Loc_NhaThau_2").hide();
                    $("#Tr_Loc_SoHD_1").hide();
                    $("#Tr_Loc_SoHD_2").hide();
            }
        }
    });

    ////Lọc tình trang/////////////

    $("#cmb_Loc_TinhTrang").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Chưa xuất PO lớn", value: "0" },
            { text: "Đã xuất PO lớn", value: "1" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            var ds;

            if (value == "") {
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
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
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
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_byTinhTrang",
                            data: {
                                TinhTrang: parseInt(value)
                            }
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_PO").data("kendoGrid").setDataSource(ds);
            


        }

    });
    ///////////////Lọc loại PO////////////////
    $("#cmb_Loc_Loai_PO").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "PO VTTP", value: "0" },
            { text: "PO Tập đoàn", value: "1" }
        ],
        optionLabel: "--Tất cả--",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;



            var ds;

            if (value == "") {
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
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
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
                        field: 'PO_ID',
                        dir: 'desc'
                    },
                    transport: {
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: 'POST',
                            url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_byLoaiPO",
                            data: {
                                LoaiPO: parseInt(value)
                            }
                        },
                        parameterMap: function (options, operation) {
                            return kendo.stringify(options);
                        }
                    }
                });
            }

            $("#grid_PO").data("kendoGrid").setDataSource(ds);
            

        }

    });

    ////////////Lọc ngày kí//////////////

    $("#txt_TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });

    $("#txt_DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy"
    });


    $("#btn_huy_loc_ngay").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);


    });


    $("#btn_loc_ngay").click(function () {

        DS_PO_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_Ngay',
                            TuNgay: $("#txt_TuNgay").val(),
                            DenNgay: $("#txt_DenNgay").val()
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);
        



    });

    ///////////////Lọc theo nhà thầu///////////////////////////////

    $("#cmb_Loc_NhaThau").kendoDropDownList({
        autoBind: true,
        optionLabel: "--Chọn nhà thầu--",
        dataTextField: "TenNhaThau",
        dataValueField: "NhaThau_ID",
        dataSource: new kendo.data.DataSource({
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
                            //options.success(result);
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            }

        })
    });

    $("#btn_huy_loc_nt").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);

    });


    $("#btn_loc_nt").click(function () {


        DS_PO_Loc = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_NT',
                            NhaThau_ID: $("#cmb_Loc_NhaThau").data("kendoDropDownList").value()
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);
        

    });
    ///////////////////Lọc hợp đồng ///////////////////////

    $("#cmb_Loc_SoHD").kendoComboBox({
        placeholder: "--Chọn hợp đồng--",
        dataTextField: "MaHD",
        dataValueField: "HopDong_ID",
        filter: "startswith",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_PO_HD_Ctr'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
    $("#btn_huy_loc_hd").click(function () {

        $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);



    });
    $("#btn_loc_hd").click(function () {


        if ($("#cmb_Loc_SoHD").data("kendoComboBox").select() == -1) {
            
            $("#notification").data("kendoNotification").show({
                title: "Chưa chọn đúng mã hợp đồng!",
                message: "Hãy chọn hợp đồng!"
            }, "error");
        }
        else {
            DS_PO_Loc = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_PO_Cha.aspx",
                            data: {
                                cmd: 'Lay_DS_PO_HD',
                                HopDong_ID: $("#cmb_Loc_SoHD").data("kendoComboBox").value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result == "err401") {
                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                    window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
            $("#grid_PO").data("kendoGrid").setDataSource(DS_PO_Loc);            
        }
    });
    //#endregion

    //#region Load Danh sach PO 

    var gvData = $("#grid_PO").kendoGrid({
        
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
        //sortable: true,
        columns:
            [
                {
                    template: function (data) {
                        if (data.TinhTrang == '0') {

                            return '<center><input type="button" style="cursor: text;" class="button_mokhoa" /></center>';
                        }
                        else {
                            return '<center><input type="button" style="cursor: text;" class="button_khoa" /></center>';
                        }

                    },
                    width: "7%"
                },
                {

                    template: function (data) {

                        if (data.Check_ThanhToan == 0) {

                            return '<center><span class="label label-success">Chưa thanh toán</span></center>';
                        }
                        else {
                            return '<center><span class="label label-important">Đã nhập thanh toán</span></center>';
                        }
                    },
                    width: "10%"
                },
                {
                    title: "Số PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoPO",
                    template: function (data) {

                        if (data.Check_PO == '0') {

                            return '<center>' + data.SoPO + '<br><span class="label label-success">Chưa xuất</span></center>';
                        }
                        else {
                            return '<center>' + data.SoPO + '<br><span class="label label-important">Đã xuất</span></center>';
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Ngày ký PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKyPO",
                    attributes: {
                        class: "row_css"
                    },
                    template: "#= NgayKyPO_f #"                    
                },
                {
                    title: "Số văn bản",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoVanBan",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    }
                },
                {
                    title: "Người lập PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NguoiTaoPO",
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
            ]
    });
    $("#txt_search_soPO").kendoAutoComplete({
        dataTextField: "SoPO",
        filter: "contains",
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                        data: {
                            cmd: 'Lay_DS_SoPO'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
    $("#txt_search_soPO").data("kendoAutoComplete").dataSource.read();

    $('#txt_search_soPO').keydown(function (e) {
        if (e.which === 13)
            filterPO();
    });

    $('#btn_tim_soPO').click(function (e) {
        e.preventDefault();
        filterPO();
    });

    $('#btn_clear_soPO').click(function (e) {
        e.preventDefault();
        $('#txt_search_soPO').val('');
        filterPO();
    });

    //#endregion

    $("#grid_PO").data("kendoGrid").setDataSource(DS_PO);    
});
//#region Hiển thị chi tiết PO
function Ham_ChiTiet_PO(f) {

    BienChiTietPO = f;

    var detailRow = f.detailRow;


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
                case "Danh sách đơn vị tham gia PO":
                    //#region Hiển thị danh sách đơn vị tham gia PO

                    detailRow.find("#tab_DonVi").empty();
                    detailRow.find("#tab_DonVi").kendoGrid({

                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_PO_Cha.aspx",
                                        data: {
                                            cmd: 'PO_DonVi_SelectbyPO_ID',
                                            PO_ID: f.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            //options.success(result);
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                        url: "assets/ajax/Ajax_PO_Con.aspx",
                                        data: {
                                            cmd: 'Lay_DS_PO_Con',
                                            PO_ID: f.data.PO_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                                url: "assets/ajax/Ajax_PO_CT.aspx",
                                                data: {
                                                    cmd: 'PO_CT_SelectByPO_ID_Con',
                                                    PO_ID_Con: e.data.PO_ID_Con
                                                },
                                                dataType: 'json',
                                                success: function (result) {
                                                    if (result == "err401") {
                                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                        window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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


                    DS_PO_Con = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    type: "POST",
                                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                                    data: {
                                        cmd: 'PONT_Select_By_PO',
                                        PO_ID: f.data.PO_ID
                                    },
                                    dataType: 'json',
                                    success: function (result) {
                                        if (result == "err401") {
                                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                    });

                    detailRow.find("#tab_PO_Con").empty();
                    detailRow.find("#tab_PO_Con").kendoGrid({

                        dataSource: DS_PO_Con,
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
                        dataBound: function () {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        detailExpand: function (e) {
                            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                        },
                        detailInit: function (e) {


                            DS_TamUng = new kendo.data.DataSource({
                                transport: {
                                    read: function (options) {
                                        $.ajax({
                                            type: "POST",
                                            url: "assets/ajax/Ajax_TamUng.aspx",
                                            data: {
                                                cmd: 'HienThi_TamUng_byPO_NhaThau_ID',
                                                PO_NhaThau_ID: e.data.PO_NhaThau_ID
                                            },
                                            dataType: 'json',
                                            success: function (result) {
                                                if (result == "err401") {
                                                    alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                    window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                                                }
                                                else {
                                                    options.success(result);
                                                }
                                            }
                                        });
                                    }
                                },
                                aggregate: [
                                    { field: "GiaTri_DeNghi", aggregate: "sum" }
                                ]
                            });


                            $("<div/>").appendTo(e.detailCell).kendoGrid({

                                dataSource: DS_TamUng,
                                pageable: {
                                    messages: {
                                        display: "Tổng số   {2}   lần tạm ứng",
                                        empty: "Chưa có tạm ứng ",
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
                                detailInit: function (g) {

                                    $("<div/>").appendTo(g.detailCell).kendoGrid({
                                        dataSource: {
                                            transport: {
                                                read: function (options) {
                                                    $.ajax({
                                                        type: "POST",
                                                        url: "assets/ajax/Ajax_TamUng.aspx",
                                                        data: {
                                                            cmd: 'HienThi_TamUng_ThanhVien',
                                                            TamUng_ID: g.data.TamUng_ID
                                                        },
                                                        dataType: 'json',
                                                        success: function (result) {
                                                            if (result == "err401") {
                                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                                display: "Tổng số   {2}   thành viên",
                                                empty: "Chưa có tạm ứng ",
                                                page: "Trang",
                                                of: "of {0}",
                                                itemsPerPage: "Số mục trong một trang"

                                            }
                                        },

                                        columns:
                                            [

                                                {
                                                    title: "Thành viên",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "Ten_ThanhVien",
                                                    attributes: {
                                                        class: "row_css",
                                                        style: "font-weight:bold;"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Giá trị đề nghị",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "GiaTri_DeNghi",
                                                    template: "#= GiaTri_DeNghi== null ? 0 : OnChangeFormat(GiaTri_DeNghi) #",
                                                    attributes: {
                                                        class: "row_css",
                                                        style: "font-weight:bold;"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Số VB đề nghị",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "SoVB_DeNghi",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
		                                       {
		                                           title: "Ngày VB đề nghị",
		                                           headerAttributes: {
		                                               class: "header_css"
		                                           },
		                                           field: "NgayVB_DeNghi",
		                                           attributes: {
		                                               class: "row_css"
		                                           },
		                                           width: 150
		                                       },
                                               {
                                                   title: "Tài khoản thụ hưởng",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "TaiKhoanThuHuong",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
                                               {
                                                   title: "Tại ngân hàng",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "TaiNganHang",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
                                                {
                                                    title: "Số VB bão lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "SoVB_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Ngày VB bão lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NgayVB_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 150
                                                },
                                                {
                                                    title: "Ngân hàng phát hành",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NganHang_PhatHanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 200
                                                },
                                                {
                                                    title: "Ngày hiệu lực bảo lãnh",
                                                    headerAttributes: {
                                                        class: "header_css"
                                                    },
                                                    field: "NgayHieuLuc_BaoLanh",
                                                    attributes: {
                                                        class: "row_css"
                                                    },
                                                    width: 150
                                                },


                                               {
                                                   title: "Số VB chuyển HS đề nghị",
                                                   headerAttributes: {
                                                       class: "header_css"
                                                   },
                                                   field: "SoVB_ChuyenHS_DeNghi",
                                                   attributes: {
                                                       class: "row_css"
                                                   },
                                                   width: 200
                                               },
		                                        {
		                                            title: "Ngày VB chuyển HS đề nghị",
		                                            headerAttributes: {
		                                                class: "header_css"
		                                            },
		                                            field: "NgayVB_ChuyenHS_DeNghi",
		                                            attributes: {
		                                                class: "row_css"
		                                            },
		                                            width: 200
		                                        }
                                            ]
                                    });
                                },


                                columns:
                                    [
                                        {
                                            template: function (data) {
                                                if (data.TinhTrang_TamUng == '0') {
                                                    return '<center><a class="btn btn-info" onclick="Ham_Sua_TamUng(' + data.TamUng_ID + ',\'' + data.SoVB_TamUng + '\',\'' + data.NgayVB_TamUng_f + '\',\'' + data.GiaTri_DeNghi + '\',\'' + data.GiaTri_PO + '\',\'' + data.SoVB_XacNhan_HieuLuc_PO + '\',\'' + data.NgayVB_XacNhan_HieuLuc_PO_f + '\');"><i class="fa fa-edit "></i> Sửa</a></center>'
                                                }
                                                else {
                                                    return ''
                                                }
                                            },
                                            width: 80
                                        },
                                        {

                                            template: function (data) {
                                                if (data.TinhTrang_TamUng == '0') {
                                                    return '<center><a class="btn btn-danger" onclick="Ham_Xoa_TamUng(' + data.TamUng_ID + ');"><i class="fa fa-trash-o "></i> Xóa</a></center>'
                                                } else {
                                                    return ''
                                                }
                                            },
                                            width: 80
                                        },
                                        {

                                            template: function (data) {
                                                return '<center><a class="btn btn-info" onclick="Ham_Ex_TamUng(' + data.TamUng_ID + ');"><i class="fa fa-download"></i> Report</a></center>'
                                            },
                                            width: 90
                                        },
                                        {
                                            title: "Lần",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "STT",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 80
                                        },
                                        {
                                            title: "Giá trị tạm ứng",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "GiaTri_DeNghi",
                                            template: "#= OnChangeFormat(GiaTri_DeNghi) #",
                                            aggregates: ["sum"],
                                            footerTemplate: "<div class=\"row_css\" >Tổng tạm ứng:<br><div style=\"color:red;\"> #=OnChangeFormat(sum) # </div></div>",
                                            attributes: {
                                                class: "row_css",
                                                style: "font-weight:bold;"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Số VB xác nhận hiệu lực PO",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "SoVB_XacNhan_HieuLuc_PO",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Ngày VB xác nhận hiệu lực PO",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "NgayVB_XacNhan_HieuLuc_PO_f",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Số VB bảo lãnh",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "SoVB_TamUng",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        },
                                        {
                                            title: "Ngày VB bảo lãnh",
                                            headerAttributes: {
                                                class: "header_css"
                                            },
                                            field: "NgayVB_TamUng_f",
                                            attributes: {
                                                class: "row_css"
                                            },
                                            width: 150
                                        }
                                    ]
                            });
                        },


                        columns:
                            [
                                //{
                                //    title: "Tình trạng",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "TinhTrang_ThanhToan",
                                //    template: function (data) {

                                //        if (data.TinhTrang_ThanhToan == '0') {
                                //            return '<center><span class="label label-success">Chưa thanh toán</span></center>';
                                //        }
                                //        else {
                                //            return '<center><span class="label label-important">Đã thanh toán</span></center>';
                                //        }
                                //    },
                                //    width: "12%"
                                //},
                                {
                                    title: "Kế Toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    template: function (data) {                                        
                                        if (data.TinhTrang_TamUng == '0') {                                            
                                            return '<center><span class="label label-important">Chưa chuyển kế toán</span></center>';
                                        } else {
                                            if (data.TamUng_So_UNC == null) {
                                                return '<center><a class="btn btn-info" onclick="Ham_TamUng_UNC(' + data.PO_NhaThau_ID + ');"><i class="fa fa-edit "></i> Nhập UNC</a></center>';
                                            }
                                            else {
                                                return '<center><div style="color:green;font-weight:bold;">Ủy Nhiệm Chi</div><div style="font-weight:bold;">' + data.TamUng_So_UNC + '</div><div style="font-weight:bold;">' + data.TamUng_Ngay_UNC_f + '</div></center>';
                                            }
                                        }                                        
                                    },
                                    width: 150
                                },
                                {
                                    title: "Khóa Tạm Ứng",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    template: function (data) {
                                        if ($("[id$=_hf_quyen_KhoaTamUng]").val() == "true") {

                                            if (data.TinhTrang_TamUng == '0') {

                                                return '<center><input type="button" class="button_mokhoa" onclick="Ham_DongKhoa_TamUng(\'' + data.PO_NhaThau_ID + '\');"/></center>';
                                            }
                                            else {
                                                return '<center><input type="button" class="button_khoa" onclick="Ham_MoKhoa_TamUng(\'' + data.PO_NhaThau_ID + '\');"/><div style="color:green;font-weight:bold;">Chuyển kế toán</div><div style="font-weight:bold;">' + data.TW_HS + '</div><div style="font-weight:bold;">' + data.TW_NgayChuyen_KeToan_f + '</div></center>';
                                            }
                                        }
                                        else {


                                            if (data.TinhTrang_TamUng == '0') {

                                                return '<center><input type="button" style="cursor: text;" class="button_mokhoa" /></center>';
                                            }
                                            else {
                                                return '<center><input type="button" class="button_khoa" /><div style="color:green;font-weight:bold;">Chuyển kế toán</div><div style="font-weight:bold;">' + data.TW_HS + '</div><div style="font-weight:bold;">' + data.TW_NgayChuyen_KeToan_f + '</div></center>';
                                            }
                                        }

                                    },
                                    width: 200
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
                                    title: "Số VB gửi nhà thầu",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoVB",
                                    attributes: {
                                        class: "row_css"
                                    }
                                },
                                //{
                                //    title: "Ngày VB",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayVB",
                                //    template: "#= NgayVB_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }                                    
                                //},
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
                                //{
                                //    title: "Ngày xuất PO",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayTaoDonHang",
                                //    template: "#= NgayTaoDonHang_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
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
                                    width: "15%"
                                },
                                {

                                    template: function (data) {
                                        if (data.TinhTrang_TamUng == '0') {
                                            return '<center><a class="btn btn-info" onclick="Ham_TamUng(' + data.PO_NhaThau_ID + ',' + data.NhaThau_ID + ',' + data.TongTienThanhToan + ');"><i class="fa fa-money"></i> Tạm ứng</a></center>'
                                        }
                                        else {
                                            return ''
                                        }
                                    },
                                    width: "15%"
                                }
                                //{
                                //    title: "Ngày bắt đầu",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayBatDau",
                                //    template: "#= NgayBatDau_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
                                //{
                                //    title: "Ngày kết thúc",
                                //    headerAttributes: {
                                //        class: "header_css"
                                //    },
                                //    field: "NgayKetThuc",
                                //    template: "#= NgayKetThuc_f #",
                                //    attributes: {
                                //        class: "row_css"
                                //    }
                                //},
                            ]
                    });
                    //#endregion
            }
        }
    });

    //#region Hiển thị phân rã vật tư    



    DS_BangKe_Cap1 = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'DS_BangKe_Cap1_ThanhToan',
                        PO_ID: f.data.PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                { field: "ThanhTien_PO", aggregate: "sum" },
                                { field: "ThanhTien_ThanhToan", aggregate: "sum" }
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
        columns: [

                {
                    title: "Số hợp đồng",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "MaHD",
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
                        class: "row_css"
                    },
                    width: "20%",
                    groupFooterTemplate: function (data) {

                        if (data.ThanhTien_ThanhToan.sum == null) {
                            return "<div class=\"row_css\">Tỷ lệ thực hiện PO: </div></br><div style=\"color:red;\" class=\"row_css\">0 %</div>";
                        } else {
                            return "<div class=\"row_css\">Tỷ lệ thực hiện PO:</div></br><div style=\"color:red;\" class=\"row_css\">" + OnChangeFormat(((data.ThanhTien_ThanhToan.sum / data.ThanhTien_PO.sum) * 100).toFixed(3)) + " %</div>";
                        }

                    }
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
                    title: "Số lượng tổng thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan",
                    template: function (data) {
                        if (data.SoLuong_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.SoLuong_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "color:green;font-weight:bold;background-color:lightyellow;"
                    }
                },
                {
                    title: "Đơn giá PO",
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
                    title: "Đơn giá thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "DonGia_ThanhToan",
                    template: function (data) {
                        if (data.DonGia_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.DonGia_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
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
                    title: "Thành tiền PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_PO",
                    template: "#= OnChangeFormat(ThanhTien_PO) #",
                    attributes: {
                        class: "row_css"
                    },
                    width: "15%",
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div class=\"row_css\">Tổng cộng PO:</div></br><div style=\"color:green;\" class=\"row_css\">#=OnChangeFormat(sum) #</div>"

                },
                {
                    title: "Thành tiền thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "ThanhTien_ThanhToan",
                    template: function (data) {
                        if (data.ThanhTien_ThanhToan == null) {
                            return 0;
                        } else {
                            return OnChangeFormat(data.ThanhTien_ThanhToan);
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "background-color:lightyellow;"
                    },
                    width: "15%",
                    aggregates: ["sum"],
                    groupFooterTemplate: function (data) {

                        if (data.ThanhTien_ThanhToan.sum == null) {
                            return "<div class=\"row_css\">Tổng thanh toán: </div></br><div style=\"color:green;\" class=\"row_css\">0</div>";
                        } else {
                            return "<div class=\"row_css\">Tổng thanh toán:</div></br><div style=\"color:green;\" class=\"row_css\">" + OnChangeFormat(data.ThanhTien_ThanhToan.sum) + "</div>";
                        }

                    }
                }
        ],
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

    if (arr_dv[0] == "0") {

        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-success" style="margin-left:10px !important;">Chưa xuất PO con</span><span style="margin-left:50px !important;margin-right:10px !important;" class="btn btn-info" onclick ="Ham_ThanhToan(\'' + arr_dv[2] + ' \', '+ arr_dv[1] + ');"><i class="fa fa-money"></i> Thanh toán</span>';
        
    }
    else {
        
        return '<b>Số hợp đồng: ' + arr_dv[2] + '</b><span class="label label-important" style="margin-left:10px !important;">Đã xuất PO con</span><span style="margin-left:50px !important;margin-right:10px !important;" class="btn btn-info" onclick ="Ham_ThanhToan(\'' + arr_dv[2] + ' \', ' + arr_dv[1] + ');"><i class="fa fa-money"></i> Thanh toán</span>';
    }


}
function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");

    return "<b>Số hợp đồng: " + arr_dv[2] + "</b>";
}
//#endregion 

//#region Hiển thị chi tiết vật tư
function Ham_ChiTiet_VatTu(e) {

    Bien_ChiTiet_VatTu = e;
        
    $("<div style='width:50%;' />").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                        data: {
                            cmd: 'DS_BangKe_Cap2',
                            PO_ID: BienChiTietPO.data.PO_ID,
                            VatTu_ID: e.data.VatTu_ID,
                            HopDong_ID: e.data.HopDong_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",                    
                    template: function (data) {
                        if (data.TinhTrang_DC == 0) {
                            return '' + OnChangeFormat(data.SoLuong) + '';
                        } else {
                            return '' + OnChangeFormat(data.SoLuong) + '</br><a>(Đã điều chỉnh)</a>';
                        }
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:red;"
                    }
                },
                {
                    title: "Số lượng thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan",
                    template: function (data) {
                        if (data.SoLuong_ThanhToan == null) {
                            return 0;
                        } else {
                            return '' + OnChangeFormat(data.SoLuong_ThanhToan) + '';
                        }

                        
                    },
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;color:green;"
                    }
                }
            ]
    });

}

//#endregion

//#region bộ lọc PO
function filterPO() {

    var ds;

    if ($('#txt_search_soPO').val().trim() !== '') {

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
                field: 'PO_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO_bySoPO",
                    data: {
                        SoPO: $('#txt_search_soPO').val().trim()
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
                field: 'PO_ID',
                dir: 'desc'
            },
            transport: {
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: 'POST',
                    url: "assets/ajax/Ajax_PO_Cha.aspx/Lay_DS_PO"
                },
                parameterMap: function (options, operation) {
                    return kendo.stringify(options);
                }
            }
        });
    }

    $("#grid_PO").data("kendoGrid").setDataSource(ds);    
}//#endregion

//#region Hiển thị thanh toán
function Ham_ThanhToan(p_MaHD,p_PO_ID) {

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'ThanhToan_PO_Con',
                        PO_ID: p_PO_ID,
                        MaHD: p_MaHD
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });

    ds.fetch(function () {
        var view = ds.view();

        HienThi_ThanhToan
            (
                view[0].PO_ID,
                view[0].HopDong_ID,
                view[0].Check_PO_TapDoan,
                view[0].NhaThau_Ten,
                view[0].MaHD,
                view[0].TongTienThanhToan,
                view[0].SoTienDaThanhToan,
                view[0].TyLeDaThanhToan,
                view[0].SoTienChuaThanhToan,
                view[0].TyLeChuaThanhToan,
                view[0].TinhTrang_ThanhToan,
                view[0].GiaTriTruocThue,
                view[0].SoTienChuaThanhToan_HD,
                view[0].SoPO,
                view[0].TongTienTamUng,
                view[0].Buoc_TienTrinh_TT,
                view[0].Ma_HS_TT,
                view[0].NgayDK_ThanhToan,
                view[0].TT_Buoc_TienTrinh_ThanhToan

                
             );
    });
}
function HienThi_ThanhToan(p_PO_ID, p_HopDong_ID, p_Check_PO_TapDoan, p_NhaThau_Ten, p_MaHD, p_TongTienThanhToan, p_SoTienDaThanhToan, p_TyLeDaThanhToan, p_SoTienChuaThanhToan, p_TyLeChuaThanhToan, p_TinhTrang_ThanhToan, p_GiaTriTruocThue, p_SoTienChuaThanhToan_HD, p_SoPO, p_TongTienTamUng, p_Buoc_TienTrinh_TT, p_Ma_HS_TT, p_NgayDK_ThanhToan, p_TT_Buoc_TienTrinh_ThanhToan) {

    $('#div_thanhtoan').show();
    $('#btn_Back').show();
    $('#div_po').hide();
    
    MaHD = p_MaHD;
    HopDong_ID = p_HopDong_ID;
    PO_ID = p_PO_ID;


    $("#lb_Buoc_TienTrinh_TT").children().remove();
    if (p_Buoc_TienTrinh_TT == 1) {

        if (p_TT_Buoc_TienTrinh_ThanhToan == 1) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>ĐÃ CHUYỂN - CHỜ TIẾP NHẬN</b>');
        }
        else if (p_TT_Buoc_TienTrinh_ThanhToan == 2) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>HOÀN TRẢ HỒ SƠ</b>');
        }
        else if (p_TT_Buoc_TienTrinh_ThanhToan == 3) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>ĐÃ TIẾP NHẬN HỒ SƠ</b>');
        }
        else {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 1 </a><br><a style="font-weight:bold;color:red;">CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>CHỜ NHÀ THẦU CHUYỂN HỒ SƠ</b>');
        }
    }
    else if (p_Buoc_TienTrinh_TT == 2) {

        if (p_TT_Buoc_TienTrinh_ThanhToan == 1) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 2 </a><br><a style="font-weight:bold;color:red;">TIẾP NHẬN HỒ SƠ</a><br><a>Tình trạng</a><br><b>ĐÃ CHUYỂN HỒ SƠ CHO NHÂN VIÊN THỤ LÝ</b>');
        }
        else {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 2 </a><br><a style="font-weight:bold;color:red;">TIẾP NHẬN HỒ SƠ</a><br><a>Tình trạng</a><br><b>ĐANG TIẾP NHẬN HỒ SƠ</b>');
        }
    }
    else if (p_Buoc_TienTrinh_TT == 3) {

        if (p_TT_Buoc_TienTrinh_ThanhToan == 1) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br><b>HỒ SƠ CHƯA HỢP LÝ - HOÀN TRẢ NHÀ THẦU</b>');
        }
        else if (p_TT_Buoc_TienTrinh_ThanhToan == 2) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br><b>HOÀN TẤT HỒ SƠ THANH TOÁN</b>');
        }
        else {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 3 </a><br><a style="font-weight:bold;color:red;">KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</a><br><a>Tình trạng</a><br><b>ĐANG KIỂM TRA TÍNH HỢP LÝ CỦA CHỨNG TỪ</b>');
        }
    }
    else {
        if (p_Buoc_TienTrinh_TT == 1) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>ĐÃ CHUYỂN - CHỜ TIẾP NHẬN</b>');
        }
        else if (p_TT_Buoc_TienTrinh_ThanhToan == 2) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>HOÀN TRẢ HỒ SƠ</b>');
        }
        else if (p_TT_Buoc_TienTrinh_ThanhToan == 3) {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>ĐÃ TIẾP NHẬN HỒ SƠ</b>');
        }
        else {
            $("#lb_Buoc_TienTrinh_TT").append('<a>Bước 0 </a><br><a style="font-weight:bold;color:red;">CHƯA CHUYỂN HỒ SƠ THỤ LÝ</a><br><a>Tình trạng</a><br><b>CHỜ NHÀ THẦU CHUYỂN HỒ SƠ</b>');
        }
    }
    
    
    
    $('#lb_MaHS_TT').text(p_Ma_HS_TT == null ? 'Chưa đăng kí' : p_Ma_HS_TT);
    $('#lb_Ngay_DK_TT').text(p_NgayDK_ThanhToan == null ? 'Chưa đăng kí' : p_NgayDK_ThanhToan);

    $('#lb_NhaThau').text(p_NhaThau_Ten);
    $('#lb_MaHD').text(p_MaHD);
    $('#lb_SoPO').text(p_SoPO);

    $('#lb_TongTienThanhToan').text(p_TongTienThanhToan == null ? 0 : OnChangeFormat(p_TongTienThanhToan));

    $('#lb_TongHD').text(OnChangeFormat(p_GiaTriTruocThue));
    $('#lb_ConLaiHD').text(p_SoTienChuaThanhToan_HD == null ? 0 : OnChangeFormat(p_SoTienChuaThanhToan_HD));
    $('#lb_TyLeConLaiHD').text('( ' + ((p_SoTienChuaThanhToan_HD / p_GiaTriTruocThue) * 100).toFixed(3) + '% )');


    $('#lb_TongTienThanhToan').text(p_TongTienThanhToan == null ? 0 : OnChangeFormat(p_TongTienThanhToan));
    
    $('#lb_TongTamUng').text(OnChangeFormat(p_TongTienTamUng));
    

    

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


    if (p_TinhTrang_ThanhToan == 0 && p_Check_PO_TapDoan == "0") { //Chưa hoàn tất - VTTP

        $('#lb_TT_TT').text('CHƯA HOÀN TẤT THANH TOÁN').css('color', 'red');
        $('#btn_Them_TT').show();
        $('#btn_Them_TT_TD').hide();
    }
    else if (p_TinhTrang_ThanhToan == 0 && p_Check_PO_TapDoan == "1") { //Chưa hoàn tất - TĐ

        $('#lb_TT_TT').text('CHƯA HOÀN TẤT THANH TOÁN').css('color', 'red');
        $('#btn_Them_TT').hide();
        $('#btn_Them_TT_TD').show();

    }
    else if (p_TinhTrang_ThanhToan == 1 && p_Check_PO_TapDoan == "0") { //Hoàn tất - VTTP

        $('#lb_TT_TT').text('ĐÃ HOÀN TẤT THANH TOÁN').css('color', 'green');
        $('#btn_Them_TT').hide();
        $('#btn_Them_TT_TD').hide();

    }
    else if (p_TinhTrang_ThanhToan == 1 && p_Check_PO_TapDoan == "1") { //Hoàn tất - TĐ

        $('#lb_TT_TT').text('ĐÃ HOÀN TẤT THANH TOÁN').css('color', 'green');
        $('#btn_Them_TT').hide();
        $('#btn_Them_TT_TD').hide();

    }

    

    /////////////////////////////////////////////////////

    var DS_DotThanhToan = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'Dot_ThanhToan_selectByPO_HD',
                        HopDong_ID: p_HopDong_ID,
                        PO_ID: p_PO_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                        }
                        else {
                            options.success(result);
                        }
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
    $('#div_po').show();
    
    DS_BangKe_Cap1.read();

}

//#endregion

//#region Hàm xóa vật tư tạm Grid vật tư thanh toán
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
                //PO_NhaThau_ID: PO_NhaThau_ID,
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
                Ham_Reload_ThanhToan_TD();

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

    if (confirm("Bạn có chắc muốn xóa đợt thanh toán này không?")) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'Dot_ThanhToan_Delete',
                Dot_ThanhToan_ID: p_Dot_ThanhToan_ID
                //PO_NhaThau_ID: PO_NhaThau_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã xóa thành công đợt thanh toán!"
                }, "upload-success");

                Ham_Reload_ThanhToan_TD();
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

//#region Refresh Form Đợt thanh toán

function Ham_Reload_ThanhToan() {

   
    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'ThanhToan_PO_Con',
                        PO_ID: PO_ID,
                        MaHD: MaHD
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    ds.fetch(function () {
        var view = ds.view();

        HienThi_ThanhToan
            (
                view[0].PO_ID,
                view[0].HopDong_ID,
                view[0].Check_PO_TapDoan,
                view[0].NhaThau_Ten,
                view[0].MaHD,
                view[0].TongTienThanhToan,
                view[0].SoTienDaThanhToan,
                view[0].TyLeDaThanhToan,
                view[0].SoTienChuaThanhToan,
                view[0].TyLeChuaThanhToan,
                view[0].TinhTrang_ThanhToan,
                view[0].GiaTriTruocThue,
                view[0].SoTienChuaThanhToan_HD,
                view[0].SoPO,
                view[0].TongTienTamUng
             );
    });
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

//#region Refresh Form Đợt thanh toán Tập đoàn

function Ham_Reload_ThanhToan_TD() {

    var ds = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                    data: {
                        cmd: 'ThanhToan_PO_Con_TD',
                        PO_ID: PO_ID,
                        HopDong_ID: HopDong_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                        }
                        else {
                            options.success(result);
                        }
                    }
                });
            }
        }
    });
    ds.fetch(function () {
        var view = ds.view();
        
        HienThi_ThanhToan
            (
                view[0].PO_ID,
                view[0].HopDong_ID,
                view[0].Check_PO_TapDoan,
                view[0].NhaThau_Ten,
                view[0].MaHD,
                view[0].TongTienThanhToan,
                view[0].SoTienDaThanhToan,
                view[0].TyLeDaThanhToan,
                view[0].SoTienChuaThanhToan,
                view[0].TyLeChuaThanhToan,
                view[0].TinhTrang_ThanhToan,
                view[0].GiaTriTruocThue,
                view[0].SoTienChuaThanhToan_HD,
                view[0].SoPO,
                view[0].TongTienTamUng
             );
    });
}

function GetPriceText(id) {

    var variable = document.getElementById(id);
    var new_value = variable.value.replace(/\,/g, "");
    variable.value = OnChangeFormat(new_value);
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
                Ham_Reload_ThanhToan_TD();
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
function Ham_Sua_ThanhToanCT(p_Dot_ThanhToan_ID, p_Dot_ThanhToan_TienTrinh_ID, p_SoTien_TienTrinh, p_SoVB, p_NgayVB, p_GhiChu) {


    $("#wd_ChiTietTT").data("kendoWindow").center().open();

    $("#hf_Dot_ThanhToan_TienTrinh_ID").val(p_Dot_ThanhToan_TienTrinh_ID);


    Dot_ThanhToan_ID = p_Dot_ThanhToan_ID;
    $("#txt_SoTien_CT").val(OnChangeFormat(p_SoTien_TienTrinh));

    $("#txt_SoChungTu_CT").val(p_SoVB);
    $("#txt_NgayChungTu_CT").val(p_NgayVB);
    $("#txt_GhiChu_CT").val(p_GhiChu);



    $("#tr_SoTienConLai").hide();


}

function Ham_ThanhToan_TienTrinh(p_Dot_ThanhToan_ID, p_SoTienConLai) {

    $("#wd_ChiTietTT").data("kendoWindow").center().open();
    $("#hf_Dot_ThanhToan_TienTrinh_ID").val("");
    $("#lb_TienConLai").text(OnChangeFormat(p_SoTienConLai));
    $("#txt_SoTien_CT").val("");
    $("#txt_SoChungTu_CT").val("");
    $("#txt_NgayChungTu_CT").val("");
    $("#txt_GhiChu_CT").val("");

    
    
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
    if ($("#txt_SoChungTu_CT").val() == "") {
        
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập số chứng từ!",
            message: ""
        }, "error");
        return;
    }
    if ($("#txt_NgayChungTu_CT").val() == "") {

        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập ngày chứng từ!",
            message: ""
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
            SoVB_TienTrinh: $("#txt_SoChungTu_CT").val(),
            NgayVB_TienTrinh: $("#txt_NgayChungTu_CT").val(),
            GhiChu_TienTrinh: $("#txt_GhiChu_CT").val(),
            Dot_ThanhToan_ID: Dot_ThanhToan_ID,
            Dot_ThanhToan_TienTrinh_ID: $("#hf_Dot_ThanhToan_TienTrinh_ID").val()
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
            Ham_Reload_ThanhToan_TD();
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

//#region Khóa mở đợt thanh toán
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
//#endregion


//#region Tạo đợt thanh toán tạm
function Ham_Tao_ThanhToan_Tam(p_PO_ID,p_HopDong_ID) {
    
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'Dot_TT_Tam',
            PO_ID: p_PO_ID,
            HopDong_ID: p_HopDong_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {
            
            Dot_ThanhToan_ID = msg[0].Dot_ThanhToan_ID;
            Dot_ThanhToan_TienTrinh_ID = msg[0].Dot_ThanhToan_TienTrinh_ID;

            $("#lb_TamUng").text(OnChangeFormat(msg[0].TongTienTamUng));
            
            

            //#region Grid Đợt thanh toán Tập Đoàn

            $("#grid_TT_PO").empty();
            var grid_TT_PO = $("#grid_TT_PO").kendoGrid({
                dataSource: {
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_ThanhToan.aspx",
                                data: {
                                    cmd: 'DS_BangKe_Cap1_PO_HD',
                                    PO_ID: PO_ID,
                                    HopDong_ID: HopDong_ID,
                                    Dot_ThanhToan_ID: Dot_ThanhToan_ID
                                },
                                dataType: 'json',
                                success: function (result) {
                                    if (result == "err401") {
                                        alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                        window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                            { field: "ThanhTien_PO", aggregate: "sum" },
                                            { field: "ThanhTien_ThanhToan", aggregate: "sum" },
                                            { field: "ThanhTien_ThanhToan_Dot", aggregate: "sum" }
                                    ]
                                }

                            ]
                },
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
                columns: [

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
                            width: "20%",
                            groupFooterTemplate: function (data) {

                                if (data.ThanhTien_ThanhToan.sum == null) {
                                    return "<div class=\"row_css\">Tỷ lệ thực hiện PO: </div></br><div style=\"color:red;\" class=\"row_css\">0 %</div>";
                                } else {
                                    return "<div class=\"row_css\">Tỷ lệ thực hiện PO:</div></br><div style=\"color:red;\" class=\"row_css\">" + OnChangeFormat(((data.ThanhTien_ThanhToan.sum / data.ThanhTien_PO.sum) * 100).toFixed(3)) + " %</div>";
                                }

                            }
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
                            title: "Số lượng đã thanh toán",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "SoLuong_ThanhToan",
                            template: function (data) {
                                if (data.SoLuong_ThanhToan == null) {
                                    return 0;
                                } else {
                                    return OnChangeFormat(data.SoLuong_ThanhToan);
                                }
                            },
                            attributes: {
                                class: "row_css",
                                style: "font-weight:bold;"
                            }
                        },
                        {
                            title: "Số lượng thanh toán",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "SoLuong_ThanhToan_Dot",
                            template: function (data) {
                                if (data.SoLuong_ThanhToan_Dot == null) {
                                    return 0;
                                } else {
                                    return OnChangeFormat(data.SoLuong_ThanhToan_Dot);
                                }
                            },
                            attributes: {
                                class: "row_css",
                                style: "color:Green;font-weight:bold;"
                            }
                        },
                        {
                            //title: "Đơn giá PO",
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
                        //{
                        //    title: "Đơn giá thanh toán",
                        //    headerAttributes: {
                        //        class: "header_css"
                        //    },
                        //    field: "DonGia_ThanhToan",
                        //    template: function (data) {
                        //        if (data.DonGia_ThanhToan == null) {
                        //            return 0;
                        //        } else {
                        //            return OnChangeFormat(data.DonGia_ThanhToan);
                        //        }
                        //    },
                        //    attributes: {
                        //        class: "row_css",
                        //        style: "color:Green;font-weight:bold;"
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
                            }
                        },
                        {
                            title: "Thành tiền PO",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "ThanhTien_PO",
                            template: "#= OnChangeFormat(ThanhTien_PO) #",
                            attributes: {
                                class: "row_css"
                            },
                            width: "14%",
                            aggregates: ["sum"],
                            groupFooterTemplate: "<div class=\"row_css\">Tổng cộng PO:</div></br><div style=\"color:green;\" class=\"row_css\">#=OnChangeFormat(sum) #</div>"

                        },
                        {
                            title: "Thành tiền thanh toán",
                            headerAttributes: {
                                class: "header_css"
                            },
                            field: "ThanhTien_ThanhToan_Dot",
                            template: function (data) {
                                if (data.ThanhTien_ThanhToan_Dot == null) {
                                    return 0;
                                } else {
                                    return OnChangeFormat(data.ThanhTien_ThanhToan_Dot);
                                }
                            },
                            attributes: {
                                class: "row_css",
                                style: "color:Green;font-weight:bold;"
                            },
                            width: "14%",
                            aggregates: ["sum"],
                            groupFooterTemplate: function (data) {

                                if (data.ThanhTien_ThanhToan_Dot.sum == null) {
                                    return "<div class=\"row_css\">Tổng thanh toán: </div></br><div style=\"color:green;\" class=\"row_css\">0</div>";
                                } else {
                                    return "<div class=\"row_css\">Tổng thanh toán:</div></br><div style=\"color:green;\" class=\"row_css\">" + OnChangeFormat(data.ThanhTien_ThanhToan_Dot.sum) + "</div>";
                                }

                            }
                        },
                        {
                            template: function (data) {
                                return '<center><a onclick="Ham_SoLuong_TT(' + data.VatTu_ID + ');" class="btn btn-info"><i class="fa fa-list"></i> Số lượng thực</a></center>'
                            },
                            width: "14%"
                        }
                ],
                dataBound: function () {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailTemplate: kendo.template($("#Templ_grid_TT_PO").html()),
                detailInit: function (e) {

                    Bien_ChiTiet_grid_TT_PO = e;

                    e.detailRow.find("#grid_detail_donvi").kendoGrid({
                        dataSource: {
                            transport: {
                                read: function (options) {
                                    $.ajax({
                                        type: "POST",
                                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                                        data: {
                                            cmd: 'DS_BangKe_Cap2_ThanhToan_ThucTe',
                                            PO_ID: PO_ID,
                                            VatTu_ID: e.data.VatTu_ID,
                                            HopDong_ID: HopDong_ID,
                                            DotThanhToan_ID: Dot_ThanhToan_ID
                                        },
                                        dataType: 'json',
                                        success: function (result) {
                                            if (result == "err401") {
                                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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
                                    title: "Số lượng PO",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoLuong",
                                    template: "#= OnChangeFormat(SoLuong) #",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;color:red;"
                                    }
                                },
                                {
                                    title: "Số lượng đã thanh toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoLuong_ThanhToan",
                                    template: "#= OnChangeFormat(SoLuong_ThanhToan) #",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;"
                                    }
                                },
                                {
                                    title: "Số lượng thanh toán",
                                    headerAttributes: {
                                        class: "header_css"
                                    },
                                    field: "SoLuong_ThanhToan_Dot",
                                    template: "#= OnChangeFormat(SoLuong_ThanhToan_Dot) #",
                                    attributes: {
                                        class: "row_css",
                                        style: "font-weight:bold;color:Green;background-color:lightyellow;"
                                    }
                                }

                            ]
                    });

                }

            });


            //#endregion
            
        } else {
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

//#region Xóa đợt thanh toán tạm
function Ham_Xoa_ThanhToan_Tam(p_Dot_ThanhToan_ID,p_Dot_ThanhToan_TienTrinh_ID) {

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'Xoa_Dot_TT_Tam',
            Dot_ThanhToan_ID: p_Dot_ThanhToan_ID,
            Dot_ThanhToan_TienTrinh_ID: p_Dot_ThanhToan_TienTrinh_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {

         
        } else {
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
//#region Kiểm tra đợt thanh toán
function Ham_Check_ThanhToan_Tam() {

    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThanhToan.aspx",
        data: {
            cmd: 'KiemTraThanhToan'
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {


        } else {
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


//#region Thanh toán thực tế đơn vị
function Ham_SoLuong_TT(p_VatTu_ID) {

    VatTu_ID = p_VatTu_ID;
    $("#wd_ThanhToan_DV").data("kendoWindow").center().open();
    $("#grid_TT_DV").kendoGrid({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_ThanhToan.aspx",
                        data: {                            
                            cmd: 'DS_BangKe_Cap2_ThanhToan_ThucTe',
                            PO_ID: PO_ID,
                            VatTu_ID: p_VatTu_ID,
                            HopDong_ID: HopDong_ID,
                            DotThanhToan_ID: Dot_ThanhToan_ID
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
                            }
                            else {
                                options.success(result);
                            }
                        }
                    });
                }
            },
            aggregate: [
                { field: "SoLuong", aggregate: "sum" },
                { field: "SoLuong_ThanhToan", aggregate: "sum" }
                
            ],
            schema: {
                model: {
                    fields: {
                        DonVi_ID: { editable: false, type: "number" },
                        TenDonVi: { editable: false, type: "string" },
                        SoLuong: { editable: false, type: "number" },
                        SoLuong_ThanhToan: { editable: false, type: "number" },                        
                        SoLuong_ThanhToan_Dot: {
                            type: "number",
                            validation: {
                                NameValidation: function (input) {
                                    
                                    var grid = $("#grid_TT_DV").data("kendoGrid");
                                    var tr = $(input).closest('tr');
                                    var dataRow = grid.dataItem(tr);

                                    var SL_TT = parseFloat(ReplaceComma($(input).val()));
                                    var SL_KhaDung = parseFloat(dataRow.SoLuong) - parseFloat(dataRow.SoLuong_ThanhToan);


                                    if (input.is("[name='SoLuong_ThanhToan_Dot']") && input.val() == "") {

                                        input.attr("data-NameValidation-msg", "Chưa nhập số lượng!");

                                        return false;
                                    }
                                    if (input.is("[name='SoLuong_ThanhToan_Dot']") && SL_TT > SL_KhaDung) {

                                        input.attr("data-NameValidation-msg", "Số lượng vượt!");

                                     

                                        return false;
                                    }

                                    return true;

                                }
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
     
        },
        columns:
            [
                { field: "DonVi_ID", hidden: true },
                {
                    title: "Đơn vị",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDonVi",
                    attributes: {
                        class: "row_css"
                    },
                    width: "30%"
                },
                {
                    title: "Số lượng PO",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong",
                    template: function (data) {
                        return OnChangeFormat(data.SoLuong);                        
                    },
                    attributes: {
                        class: "row_css",
                        style:"color:red;font-weight:bold;"
                    },
                    aggregates: ["sum"],
                    footerTemplate: "<div class=\"row_css\" style=\"color:red;\">#=OnChangeFormat(sum) #</div>"
                    //width: "20%"
                },
                {
                    title: "Số lượng đã thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan",
                    template: "#= OnChangeFormat(SoLuong_ThanhToan) #",
                    attributes: {
                        class: "row_css",
                        style: "font-weight:bold;"
                    },
                    aggregates: ["sum"],
                    footerTemplate: "<div class=\"row_css\" style=\"color:green;\">#=OnChangeFormat(sum) #</div>"
                    //width: "20%"
                },
                {
                    title: "Số lượng thanh toán",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoLuong_ThanhToan_Dot",
                    template: function (data) {

                        if (data.SoLuong_ThanhToan_Dot == 0) {
                            return data.SoLuong_ThanhToan_Dot;
                        } else {

                            return '<b style="color:green;">' + OnChangeFormat(data.SoLuong_ThanhToan_Dot) + '</b>';
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
                    footerTemplate: '<center><button type="button" onclick="func_ThanhToan_TatCa();" class="btn btn-warning" style="margin-left: 5px"><i class="fa fa-check-square-o"></i>&nbsp;Thanh toán tất cả</button></center>',
                    width: "30%"
                }

            ]

    });

}

//#endregion

//#region Lưu thanh toán thực tế đơn vị

function Ham_Luu_TT_DV() {
    
    var TongSL_PO = parseFloat($("#grid_TT_DV .k-footer-template").text().replace(/\,/g, "").trim());;

    var Chuoi_JSON = "";
    var TongSL_DV = 0;
    for (var j = 1; j < $("#grid_TT_DV tr").length - 1; j++) {    

        var DonVi_ID = parseInt($("#grid_TT_DV tr")[j].cells[0].childNodes[0].textContent);

        var ClassName = $("#grid_TT_DV tr")[j].cells[4].className;

        var SoLuong_ThanhToan = parseFloat(ReplaceComma($("#grid_TT_DV tr")[j].cells[4].textContent));

        //if (ClassName == "row_css k-dirty-cell" && isNaN(SoLuong_ThanhToan) == false) {
        if (isNaN(SoLuong_ThanhToan) == false) {

            Chuoi_JSON += "{'DonVi_ID':" + DonVi_ID + ",'VatTu_ID':" + VatTu_ID + ",'SoLuong_ThanhToan':" + SoLuong_ThanhToan + "},";

            TongSL_DV += SoLuong_ThanhToan;
        }
        
    }
    
    Chuoi_JSON = Chuoi_JSON.replace(/^,|,$/g, '');
    

    var check = 0;    if (parseFloat((TongSL_DV).toFixed(3)) > parseFloat((TongSL_PO).toFixed(3))) {
        check = 1;
        
        $("#notification").data("kendoNotification").show({
            title: "Số lượng thanh toán vượt số lượng tổng PO!",
            message: "Hãy nhập lại!"
        }, "error");

        return;
    }        if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_ThanhToan.aspx",
            data: {
                cmd: 'ThanhToan_TT_DV',
                gData: "[" + Chuoi_JSON + "]",
                Dot_ThanhToan_ID: Dot_ThanhToan_ID,
                SoLuong_ThanhToan: TongSL_DV,
                VatTu_ID: VatTu_ID
                
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                
                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thanh toán!"
                }, "upload-success");

                $("#wd_ThanhToan_DV").data("kendoWindow").close();

                $('#grid_TT_PO').data('kendoGrid').dataSource.read();

                Bien_ChiTiet_grid_TT_PO.detailRow.find("#grid_detail_donvi").data('kendoGrid').dataSource.read();
                
            }
            else {
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + textStatus);
        });
    }
}

//#endregion

function func_ThanhToan_TatCa() {

    var grid_TT_DV = $("#grid_TT_DV").data('kendoGrid');

    for (var i = 0; i < grid_TT_DV.dataSource.data().length; i++) {

        grid_TT_DV.dataSource.data()[i].SoLuong_ThanhToan_Dot = grid_TT_DV.dataSource.data()[i].SoLuong - grid_TT_DV.dataSource.data()[i].SoLuong_ThanhToan;

    }
    grid_TT_DV.refresh();
}





//#region Tạm ứng

function Ham_TamUng(p_PO_NhaThau_ID, p_NhaThau_ID, p_TongTienThanhToan) {

    var ds_abc = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TamUng.aspx",
                    data: {
                        cmd: 'Get_NhaThau_LienDanh',
                        NhaThau_ID: p_NhaThau_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

    $("#grid_thanhvien").data("kendoGrid").setDataSource(ds_abc);

    $("#hf_PO_NhaThau_ID").val(p_PO_NhaThau_ID);
    $("#hf_TamUng_ID").val("");

    $("#txt_TyLe_TamUng").data("kendoNumericTextBox").value("");
    $("#txt_SoVB_BaoLanh").val("");
    $("#txt_NgayVB_BaoLanh").val("");
    $("#txt_GT_TamUng").val("");
    $("#txt_SoVB_XN_PO").val("");
    $("#txt_NgayVB_XN_PO").val("");
    $("#lb_TamUng_GT_PO").text(OnChangeFormat(p_TongTienThanhToan));


    $("#wd_TamUng").data("kendoWindow").center().open();






}
function Ham_Luu_TamUng() {

    if ($("#txt_GT_TamUng").val().trim() != "" && $("#txt_GT_TamUng").val().trim() != "0") {

        var TongTienThanhVien = 0;

        for (var i = 0; i < $("#grid_thanhvien").data("kendoGrid").dataSource.view().length; i++) {
            TongTienThanhVien += $("#grid_thanhvien").data("kendoGrid").dataSource.view()[i].GiaTri_DeNghi;
        }

        if (TongTienThanhVien != ReplaceComma($("#txt_GT_TamUng").val().trim())) {

            $("#notification").data("kendoNotification").show({
                title: "Giá trị tạm ứng thành viên chưa đúng!",
                message: ""
            }, "error");
            return;
        }




        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_TamUng.aspx",
            data: {
                cmd: 'CapNhat_TamUng',
                TamUng_ID: $("#hf_TamUng_ID").val(),
                PO_NhaThau_ID: $("#hf_PO_NhaThau_ID").val(),
                SoVB_BaoLanh: $("#txt_SoVB_BaoLanh").val().trim(),
                NgayVB_BaoLanh: $("#txt_NgayVB_BaoLanh").val().trim(),
                gData: JSON.stringify($("#grid_thanhvien").data("kendoGrid").dataSource.view()),
                GiaTri_PO: ReplaceComma($("#lb_TamUng_GT_PO").text().trim()),
                GiaTri_DeNghi: ReplaceComma($("#txt_GT_TamUng").val().trim()),
                SoVB_XacNhan_PO: $("#txt_SoVB_XN_PO").val().trim(),
                NgayVB_XacNhan_PO: $("#txt_NgayVB_XN_PO").val().trim()

            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");

                $("#wd_TamUng").data("kendoWindow").close();

                DS_TamUng.read();



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
                title: "Lỗi",
                message: textStatus
            }, "error");

        });


    }
}


function Ham_Sua_TamUng(p_TamUng_ID, p_SoVB_BaoLanh, p_NgayVB_BaoLanh_f, p_GiaTri_DeNghi, p_GiaTri_PO, p_SoVB_XacNhan_HieuLuc_PO, p_NgayVB_XacNhan_HieuLuc_PO) {

    $("#txt_SoVB_BaoLanh").val(p_SoVB_BaoLanh);
    $("#txt_NgayVB_BaoLanh").val(p_NgayVB_BaoLanh_f == "null" ? "" : p_NgayVB_BaoLanh_f);


    $("#lb_TamUng_GT_PO").text(OnChangeFormat(p_GiaTri_PO));
    $("#txt_GT_TamUng").val(OnChangeFormat(p_GiaTri_DeNghi));

    $("#txt_SoVB_XN_PO").val(OnChangeFormat(p_SoVB_XacNhan_HieuLuc_PO));
    $("#txt_NgayVB_XN_PO").val(p_NgayVB_XacNhan_HieuLuc_PO);





    $("#hf_TamUng_ID").val(p_TamUng_ID);

    var ds_abc = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_TamUng.aspx",
                    data: {
                        cmd: 'HienThi_TamUng_ThanhVien',
                        TamUng_ID: p_TamUng_ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        if (result == "err401") {
                            alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                            window.location.href = "DangNhap.aspx?p=Thanh_Toan.aspx";
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

    $("#grid_thanhvien").data("kendoGrid").setDataSource(ds_abc);

    $("#wd_TamUng").data("kendoWindow").center().open();
}

function Ham_Xoa_TamUng(p_TamUng_ID) {

    if (confirm("Bạn có chắc muốn xóa lần tạm ứng này không?")) {

        var request = $.ajax({

            type: "POST",
            url: "assets/ajax/Ajax_TamUng.aspx",
            data: {
                cmd: 'Xoa_TamUng',
                TamUng_ID: p_TamUng_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {

                $("#notification").data("kendoNotification").show({
                    message: "Đã cập nhật thành công!"
                }, "upload-success");

                DS_TamUng.read();

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
                title: "Lỗi",
                message: textStatus
            }, "error");

        });

    }

}

//#region đóng khóa mở khóa Tạm ứng

function Ham_DongKhoa_TamUng(p_PO_NhaThau_ID) {



    $("#hf_PO_NhaThau_ID_khoa").val(p_PO_NhaThau_ID);

    $("#txt_NgayChuyen_KT").val("");
    $("#txt_HS_TW").val("");



    $("#wd_Khoa_TamUng").data().kendoWindow.center().open();

}
function Ham_Luu_KhoaTamUng() {

    if ($("#txt_HS_TW").val() == "") {
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập hồ sơ tạm ứng!",
            message: "Hãy nhập hồ sơ tạm ứng!"
        }, "error");
        return;
    }
    if ($("#txt_NgayChuyen_KT").val() == "") {
        $("#notification").data("kendoNotification").show({
            title: "Chưa nhập ngày chuyển kế toán!",
            message: ""
        }, "error");
        return;
    }
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_TamUng.aspx",
        data: {
            cmd: 'DongKhoa_TamUng',
            PO_NhaThau_ID: $("#hf_PO_NhaThau_ID_khoa").val(),
            HS_TW: $("#txt_HS_TW").val().trim(),
            NgayChuyen_KeToan: $("#txt_NgayChuyen_KT").val()
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#wd_Khoa_TamUng").data().kendoWindow.close();

            DS_TamUng.read();
            DS_PO_Con.read();

        }
        else {
            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
            }, "error");
        }

    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });

}

function Ham_MoKhoa_TamUng(p_PO_NhaThau_ID) {

    if (confirm("Bạn có chắc mở khóa? Chương trình sẽ xóa số hồ sơ tạm ứng và ngày chuyển kế toán!")) {
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_TamUng.aspx",
            data: {
                cmd: 'MoKhoa_TamUng',
                PO_NhaThau_ID: p_PO_NhaThau_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {
            if (msg[0].ErrorMessage == null) {
                DS_TamUng.read();
                DS_PO_Con.read();

            }
            else {
                $("#notification").data("kendoNotification").show({
                    title: msg[0].ErrorMessage,
                    message: "Hãy thao tác lại!"
                }, "error");
            }

        });
        request.fail(function (jqXHR, textStatus) {
            //alert("Request failed: " + textStatus);

            $("#notification").data("kendoNotification").show({
                title: "Request failed: " + textStatus,
                message: "Hãy thao tác lại!"
            }, "error");

        });
    }


}

//#endregion

function Ham_Ex_TamUng(p_TamUng_ID) {

    var request = $.ajax({
        type: "POST",
        url: "ExportEx.aspx",
        data: {
            cmd: 'TamUng',
            TamUng_ID: p_TamUng_ID
        },
        dataType: 'json'
    });
    request.done(function (msg) {


        $('#id_xuat_ex').attr("href", msg.FilePath);
        ($('#id_xuat_ex')[0]).click();

    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);

        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");

    });
}

//#endregion

function Ham_TamUng_UNC(p_PO_NhaThau_ID) {

    

    $("#hf_PO_NhaThau_ID_UNC").val(p_PO_NhaThau_ID);

    $("#txt_NgayUNC").val("");
    $("#txt_SoUNC").val("");



    $("#wd_UNC_TamUng").data().kendoWindow.center().open();

}

function Ham_Luu_UNC_TamUng() {

    if ($("#txt_SoUNC").val() == "") {
        $("#notification").data("kendoNotification").show({
            title: "Lỗi",
            message: "Chưa nhập số Ủy nhiệm chi!"
        }, "error");
        return;
    }
    if ($("#txt_NgayUNC").val() == "") {
        $("#notification").data("kendoNotification").show({
            title: "Lỗi!",
            message: "Chưa nhập ngày Ủy nhiêm chi!"
        }, "error");
        return;
    }
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_TamUng.aspx",
        data: {
            cmd: 'UNC_TamUng',
            PO_NhaThau_ID: $("#hf_PO_NhaThau_ID_UNC").val(),
            So_UNC: $("#txt_SoUNC").val().trim(),
            Ngay_UNC: $("#txt_NgayUNC").val()
        },
        dataType: 'json'
    });
    request.done(function (msg) {
        if (msg[0].ErrorMessage == null) {

            $("#notification").data("kendoNotification").show({
                message: "Đã cập nhật thành công!"
            }, "upload-success");

            $("#wd_UNC_TamUng").data().kendoWindow.close();

            DS_TamUng.read();
            DS_PO_Con.read();

        }
        else {
            $("#notification").data("kendoNotification").show({
                title: msg[0].ErrorMessage,
                message: "Hãy thao tác lại!"
            }, "error");
        }

    });
    request.fail(function (jqXHR, textStatus) {
        //alert("Request failed: " + textStatus);
        $("#notification").data("kendoNotification").show({
            title: "Request failed: " + textStatus,
            message: "Hãy thao tác lại!"
        }, "error");
    });
}