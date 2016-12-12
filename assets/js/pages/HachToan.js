
var Path;
var DS_ThanhToan;
$(document).ready(function () {

    document.oncontextmenu = function () { return false; }
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
            e.data = { LoaiFile: 'VBHachToan' };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
            if (ext !== ".xls" && ext !== ".xlsx") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng .xls hay xlsx');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });
    

    var grid_VT_TT = $('#grid_VT_TT').kendoGrid({
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
            },
            pageSize: 5,
            pageSizes: [5, 10, 20]
        },
        resizable: true,        
        reorderable: true,
        scrollable: true
        
    }).data('kendoGrid');

    
    $('#div_TieuDe').hide();
    $('#grid_VT_TT').hide();
    $("#btn_XuatEx").hide();

    var cbo_ChungTu_TT = $('#cbo_ChungTu_TT').kendoComboBox({
        dataSource: {
            error: function () {
                alert('Lỗi đường truyền');
            },
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HachToan.aspx",
                        data: {
                            cmd: 'DS_ChungTu_TT'
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
        dataTextField: "SoChungTuThanhToan",
        dataValueField: "SoChungTuThanhToan",
        filter: "contains",
        optionLabel: 'Chọn số chứng từ thanh toán...',
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());

            SoChungTuThanhToan = dataItem.SoChungTuThanhToan;

            DS_ThanhToan = new kendo.data.DataSource({

                error: function () {
                    alert('Lỗi đường truyền');
                },
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_HachToan.aspx",
                            data: {
                                cmd: 'DS_VT_TT',
                                SoChungTuThanhToan: SoChungTuThanhToan

                            },
                            dataType: 'json',
                            success: function (result) {
                                options.success(result);
                            }
                        });
                    }
                }

            });            
            $("#btn_XuatEx").show();
        }


    }).data('kendoComboBox');

    
    $('#btn_XuatEx').click(function (e) {

        var rows = [{
            cells: [
               
              { value: "nid" },
              { value: "mavt" },
              { value: "ngay_chung_tu" },
              { value: "tenvt" },
              { value: "so_po" },
              { value: "nha_cung_cap" },
              { value: "so_hop_dong" },
              { value: "so_luong" },
              { value: "don_gia" },
              { value: "thanh_tien" },
              { value: "dvt" },
              { value: "kt_no" },
              { value: "kte_no" },
              { value: "kt_co" },
              { value: "noi_dung_hach_toan" }
  
            ]
        }];
        
        DS_ThanhToan.fetch(function () {
            var data = this.data();
            for (var i = 0; i < data.length; i++) {                
                rows.push({
                    cells: [
                      { value: data[i].nid },
                      { value: data[i].mavt},
                      { value: data[i].ngay_chung_tu },
                      { value: data[i].tenvt},
                      { value: data[i].so_po },
                      { value: data[i].nha_cung_cap },
                      { value: data[i].so_hop_dong },
                      { value: data[i].so_luong },
                      { value: data[i].don_gia },
                      { value: data[i].thanh_tien },
                      { value: data[i].dvt },
                      { value: data[i].kt_no },
                      { value: data[i].kte_no },
                      { value: data[i].kt_co },
                      { value: data[i].noi_dung_hach_toan }
      
                    ]
                })
            }
            var workbook = new kendo.ooxml.Workbook({
                sheets: [
                  {
                      //columns: [
                      //  // Column settings (width)
                      //  { autoWidth: true },
                      //  { autoWidth: true },
                      //  { autoWidth: true },
                      //  { autoWidth: true },
                      //  { autoWidth: true }
                      //],
                      // Title of the sheet
                      title: "Sheet1",
                      // Rows of the sheet
                      rows: rows
                  }
                ]
            });
            //save the file as Excel file with extension xlsx
            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Test.xlsx" });
        });

    });

    $('#btn_Luu').click(function (e) {
       
        if (Path == "" || Path == undefined || Path == "undefined") {
            check = 1;
            alert("Chưa upload tập tin văn bản!");
            return;
        }
        else {
            
            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_HachToan.aspx",
                            data: {
                                cmd: 'CapNhat_HachToan',
                                p_Path: Path
                            },
                            dataType: 'json',
                            success: function (result) {
                                options.success(result);
                            }
                        });
                    }
                }
            });
            $("#grid_VT_TT").data('kendoGrid').setDataSource(ds);
            $('#grid_VT_TT').show();
            $('#div_TieuDe').show();
            
        }

    });
    

   
});