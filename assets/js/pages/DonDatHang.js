var DS_PO, DS_PO_Con, DS_PO_ChiTiet, DS_BangKe, DS_BangKe_Cap2;;
var PO_ID;
var detail_PO_Con_e;
var Path;

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

    $("#wd_Show_PO").kendoWindow({
        draggable: false,
        height: "100%",
        width: "100%",
        actions: ["Maximize", "Close"],
        modal: true,
        resizable: false,
        title: "Tìm PO lớn",
        visible: false,

    }).data("kendoWindow");

   

    $("#wd_DatHang").kendoWindow({
        draggable: false,
        modal: true,
        resizable: false,
        title: "Xuất đơn hàng",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#txt_NgayVB").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayBatDau").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    
    $(".k-input").prop('disabled', true);

    $("#txt_SoNgayTH").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
});

function Ham_Tim_PO() {

    $("#wd_Show_PO").data("kendoWindow").center().open();

    DS_PO = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_PO_Cha.aspx",
                    data: {
                        cmd: 'Lay_DS_PO'
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
    $("#grid_PO").empty();
    var grid = $("#grid_PO").kendoGrid({

        dataSource: DS_PO,
        selectable: "multiple row",
        toolbar: kendo.template($("#Templ_PO").html()),
        detailTemplate: kendo.template($("#Templ_ChiTiet_PO").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function detailInit(e) {

            detailInit_e = e;
            PO_ID_Them_VatTu = e.data.PO_ID;

            var detailRow = e.detailRow;
            detailRow.find("#tabstrip").kendoTabStrip({
                animation: {
                    open: { effects: "fadeIn" }
                }
            });

            //Load dm đơn vị
            detailRow.find("#tab_DonVi").kendoGrid({

                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_PO_Cha.aspx",
                                data: {
                                    cmd: 'PO_DonVi_SelectbyPO_ID',
                                    PO_ID: e.data.PO_ID
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
                    pageSize: 8
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

            //Load dm vật tư
            detailRow.find("#tab_VatTu").kendoGrid({

                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                                data: {
                                    cmd: 'PO_DonVi_SelectbyPO_ID',
                                    PO_ID: e.data.PO_ID
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
                    pageSize: 8
                }),
                pageable: {
                    messages: {
                        display: "Tổng số   {2}   vật tư",
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
                            }
                        },
                        {
                            title: "Số hợp đồng",
                            headerAttributes: {
                                class: "header_css"
                            },
                            //field: "MaHD",                            
                            template: "#= Ham_HienThi_MaHD(MaHD) #",
                            attributes: {
                                class: "row_css"
                            }
                        },
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
                            title: "Số lượng tổng PO",
                            headerAttributes: {
                                class: "header_css"
                            },
                            //field: "SoLuong_PO",
                            template: "#= OnChangeFormat(SoLuong_PO) #",
                            attributes: {
                                class: "row_css"
                            }
                        },
                        {
                            title: "Đơn giá",
                            headerAttributes: {
                                class: "header_css"
                            },
                            //field: "DonGia",
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
                    title: "Số ngày GH",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "SoNgayGH",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày GH",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayGiaoHang",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày xác nhận GH",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayXacNhanGH",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày kế hoạch GH",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKeHoachGH",
                    attributes: {
                        class: "row_css"
                    }
                }
            ]
    });
    $("#txt_search_sopo").kendoAutoComplete({
        dataTextField: "SoPO",
        dataSource: DS_PO,
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.PO_ID

            if (value) {

                grid.data("kendoGrid").dataSource.filter({ field: "PO_ID", operator: "eq", value: value });
            }
            else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        },
        change: function () {

            $("#txt_search_sohd").val('');
        }

    });
    $("#btn_clear_sopo").click(function (e) {
        e.preventDefault();
        $("#txt_search_sopo").val('');
        grid.data("kendoGrid").dataSource.filter({});
    });
}


function Ham_Chon_PO() {

    var grid = $("#grid_PO").data("kendoGrid");
    var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));
    if (selectedTopic == undefined) {
        alert("Chưa chọn số PO!");
        return;
    }
    else {

        $("#wd_Show_PO").data("kendoWindow").close();

        $("#txt_SoPO").val(selectedTopic.SoPO);

        PO_ID = selectedTopic.PO_ID;

        $("#div_TieuDe").css("display", "block");

        DS_BangKe = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PO_HopDong_CT.aspx",
                        data: {
                            cmd: 'PO_DonVi_SelectbyPO_ID',
                            PO_ID: selectedTopic.PO_ID
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
            group:
                    [
                        //{
                        //    field: "TenNhaThau"                            
                        //},
                        {
                            field: "MaHD",
                            aggregates: [
                                { field: "ThanhTien_PO", aggregate: "sum" }
                            ]
                        }
                    ]
            
        });

        $("#grid_BangKe").empty();
        $("#grid_BangKe").kendoGrid({       
            dataSource: DS_BangKe,
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
            detailInit: function (e) {

                DS_BangKe_Cap2 = new kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            $.ajax({
                                type: "POST",
                                url: "assets/ajax/Ajax_PO_Con.aspx",
                                data: {
                                    cmd: 'BangKe_Cap2',
                                    PO_ID: PO_ID,
                                    VatTu_ID: e.data.VatTu_ID,

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

                $("<div/>").appendTo(e.detailCell).kendoGrid({
                    dataSource: DS_BangKe_Cap2,
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
                                //field: "SoLuong",
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
                                //field: "DonGia",
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
                                //field: "ThanhTien",
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
                                //field: "VAT",
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
                        title: "Số hợp đồng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaHD",                        
                        groupHeaderTemplate: "#= Ham_HienThi_Xuat_PO( value ) #",
                        hidden:true

                    },                    
                    //{
                    //    title: "Tên nhà thầu",
                    //    headerAttributes: {
                    //        class: "header_css"
                    //    },
                    //    field: "TenNhaThau",
                    //    attributes: {
                    //        class: "row_css",
                    //        style: "font-weight:bold;color:blue;"
                    //    },
                    //    groupHeaderTemplate: "<b style:'color:blue;'>Nhà thầu: #= value # </b>",
                    //    hidden: true
                    //},
                    {
                        title: "Số lượng",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "SoLuong_PO",
                        template: "#= OnChangeFormat(SoLuong_PO) #",
                        attributes: {
                            class: "row_css",
                            style: "font-weight:bold;color:red;"
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
                        field: "ThanhTien_PO",
                        template: "#= OnChangeFormat(ThanhTien_PO) #",
                        attributes: {
                            class: "row_css"
                        },                    
                        aggregates: ["sum"],                                                
                        groupFooterTemplate: "<div class=\"row_css\">Tổng cộng trước thuế: #=OnChangeFormat(sum) #</div>",
                    }

                ]
        });

    }

}
//http://docs.telerik.com/kendo-ui/web/grid/how-to/excel/detail-grid-export
//http://docs.telerik.com/kendo-ui/framework/excel/extract-datasoruce
function exportChildData(VatTu_ID, rowIndex) {
    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{
        cells: [
          // First cell
          { value: "OrderID" },
          //// Second cell
          //{ value: "Freight" },
          //// Third cell
          //{ value: "ShipName" },
          //// Fourth cell
          //{ value: "OrderDate" },
          //// Fifth cell
          //{ value: "ShipCity" }
        ]
    }];

    //DS_BangKe.filter({ field: "VatTu_ID", operator: "eq", value: VatTu_ID });

    var exporter = new kendo.ExcelExporter({
        columns: [{
            field: "TenDonVi"
        },
        //{
        //    field: "Freight"
        //}, {
        //    field: "ShipName"
        //}, {
        //    field: "ShipCity"
        //}
        ],
        dataSource: DS_BangKe_Cap2
    });

    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });
}

function Ham_HienThi_VAT(value) {
    return '';
}
function Ham_HienThi_MaHD(value) {

    var arr_dv = value.split("*");
    return "<b>" + arr_dv[1] + "</b>";    
}
function Ham_HienThi_Xuat_PO(value) {

    var arr_dv = value.split("*");
    if (arr_dv[0] == "0") {
        return "<b>Số hợp đồng: " + arr_dv[1] + "</b><button style='margin-right:10px;' onclick='Ham_Xuat_DonHang( \" " + arr_dv[1] + " \");' type='button' class='btn btn-primary'>Xuất đơn hàng</button><button onclick='Ham_Xuat_Ex( \" " + value + " \");' type='button' class='btn btn-inverse'>Xuất Excel</button>";
    } else {
        return '<b>Số hợp đồng: ' + arr_dv[1] + '</b><span class="btn btn-danger">Đã xuất đơn hàng</span>';
    }
}
function Ham_Xuat_Ex(MaHD) {    

    var ds = new kendo.data.DataSource({
        data: DS_BangKe.data(),
        filter: { field: "MaHD", operator: "eq", value: MaHD }
    });
       
    var rows = [{
        cells: [
           
          { value: "STT", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Mã vật tư", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Tên vật tư", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn vị tính", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Đơn giá", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Số lượng", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" },
          { value: "Thành tiền", bold: true, vAlign: "center", hAlign: "center", background: "#DDDDDD" }
        ]
    }];
    
    
    var TongThanhTien = 0;
    
    ds.fetch(function () {
        var data = this.data();
        for (var i = 0; i < data.length; i++) {
            var ThanhTien=parseFloat(data[i].SoLuong_PO) * parseFloat(data[i].DonGia);
            rows.push({
                cells: [
                  { value: i + 1 },
                  { value: data[i].MaVatTu_TD },
                  { value: data[i].VatTu_Ten },
                  { value: data[i].TenDVT },
                  { value: OnChangeFormat(data[i].DonGia) },
                  { value: OnChangeFormat(data[i].SoLuong_PO) },
                  { value: OnChangeFormat(ThanhTien) }
                ]
            })
            TongThanhTien += ThanhTien;
        }
        rows.push({
            cells: [
              { value: "" },
              { value: "Tổng cộng trước thuế GTGT" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: OnChangeFormat(TongThanhTien), bold: true }
            ]
        })
        var VAT = (TongThanhTien * 10) / 100;
        rows.push({
            cells: [
              { value: "" },
              { value: "Thuế GTGT" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: OnChangeFormat(VAT), bold: true, }
            ]
        })
        var TongCong = TongThanhTien + VAT;
        rows.push({
            cells: [
              { value: "" },
              { value: "Tổng cộng sau thuế GTGT" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: "" },
              { value: OnChangeFormat(TongCong), bold: true, color: "#CC0000" }
            ]
        })
        var workbook = new kendo.ooxml.Workbook({
            sheets: [
              {
                  columns: [
                    // Column settings (width)
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true },
                    { autoWidth: true }
                  ],
                  // Title of the sheet
                  title: "DanhSachVatTu",
                  // Rows of the sheet
                  rows: rows
              }
            ]
        });
        //save the file as Excel file with extension xlsx
        kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "DanhSachVatTu.xlsx" });
    });

}
function Ham_Xuat_DonHang(MaHD) {
    
    
    $("#lb_MaHD").text(MaHD);
    $("#wd_DatHang").data("kendoWindow").center().open();

    uploadReset();
    Path = "";

    
}
function Ham_Huy_DonHang() {

    $("#wd_DatHang").data("kendoWindow").close();
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
    if (Path == "") {
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
            url: "assets/ajax/Ajax_DonDatHang.aspx",
            data: {
                cmd: 'Xuat_DonHang',
                PO_ID: PO_ID,
                SoVB: $("#txt_vb_DatHang").val(),
                NgayVB: $("#txt_NgayVB").val(),
                MaHD: $("#lb_MaHD").text().trim(),
                FileVB: Path,
                NgayBatDau: $("#txt_NgayBatDau").val(),
                SoNgayThucHien: $("#txt_SoNgayTH").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                alert("Đã xuất các đơn hàng thành công!");
                DS_BangKe.read();
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