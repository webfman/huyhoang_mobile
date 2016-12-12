 
var  DS_HopDong, DS_PhuLucHD_SelectByHD_ID;
var detailInit_e, v_STT, hopdong_id;

$(document).ready(function () {
    
    $('#txt_maHD').prop('disabled', true);

  
    //////// DataSource\\\\\\\\\\\\

    
    DS_DVT = new kendo.data.DataSource({
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
    DS_VatTu = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_DanhMuc.aspx",
                    data: {
                        cmd: 'DS_VatTu'
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
    DS_HopDong = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: "assets/ajax/Ajax_HopDong.aspx",
                    data: {
                        cmd: 'Lay_DS_HopDong'
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
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        }

    });
      
    $("#txt_maHD").kendoAutoComplete({
        dataTextField: "MaHD",
        dataSource: DS_HopDong
    });
    /////////// Popup Thêm mới phụ lục hợp đồng \\\\\\\\\\\\\
    $("#txt_ngay_kyHD").kendoDatePicker({
        format: "dd/MM/yyyy"
    });    

    $("#txt_ngay_hieuluc").kendoDatePicker({
        format: "dd/MM/yyyy"
    });    

    $("#txt_ngay_kehoach").kendoDatePicker({
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

    $("#txt_SoNgayThucHien").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_gthd").kendoNumericTextBox({
        format: "# triệu",
        min: "0"
    });

    $("#wd_them_plhd").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Tạo mới Phụ Lục Hợp Đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");
    

    ///////////////// Popup Thêm vật tư cho phụ lục hợp đồng\\\\\\\\\\\\\\\\
    $("#wd_them_phuluc_hd_ct").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Thêm mới vật tư",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#cmb_LoaiVatTu").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        dataTextField: "TenLoaiVT",
        dataValueField: "LoaiVT_ID",
        dataSource: DS_LoaiVT
    });

    $("#cmb_VatTu").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        cascadeFrom: "cmb_LoaiVatTu",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu
    });
    $("#cmb_DVT").kendoDropDownList({
        optionLabel: "--Chọn đơn vị tính--",
        dataTextField: "TenDVT",
        dataValueField: "MaDVT",
        dataSource: DS_DVT
    });


    $("#txt_SoLuong").kendoNumericTextBox({
        format: "#",
        min: "0"
    });
    $("#txt_DonGia").kendoNumericTextBox({
        format: "# đồng",
        min: "0"
    });

    ////////////////////popup show danh sach hop dong\\\\\\\\\\\\\\\\\\\\\
    $("#wd_Show_HD").kendoWindow({        
        draggable: false,
        height: "100%",
        width: "100%",
        actions: ["Maximize", "Close"],
        modal: true,
        resizable: false,
        title: "Tìm hợp đồng",
        visible: false

    }).data("kendoWindow");

    /////////// Popup Sửa phụ lục hợp đồng \\\\\\\\\\\\\
    $("#txt_ngay_kyHD_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    

    $("#txt_ngay_hieuluc_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    

    $("#txt_ngay_kehoach_sua").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    

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

    $("#txt_SoNgayThucHien_sua").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
    $("#txt_gthd_sua").kendoNumericTextBox({
        format: "# triệu",
        min: "0"
    });


    $("#wd_sua_plhd").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Chỉnh sửa phụ lục hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");
    ///////////////// Popup Sửa vật tư phụ lục hợp đồng \\\\\\\\\\\\\\\\
    $("#wd_sua_plhd_ct").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Sửa vật tư",
        visible: false,
        actions: false

    }).data("kendoWindow");
    

    $("#cmb_VatTu_sua").kendoDropDownList({
        optionLabel: "--Chọn loại vật tư--",
        cascadeFrom: "cmb_LoaiVatTu",
        dataTextField: "TenVT",
        dataValueField: "VatTu_ID",
        dataSource: DS_VatTu
    });
    $("#cmb_DVT_sua").kendoDropDownList({
        optionLabel: "--Chọn đơn vị tính--",
        dataTextField: "TenDVT",
        dataValueField: "MaDVT",
        dataSource: DS_DVT
    });


    $("#txt_SoLuong_sua").kendoNumericTextBox({
        format: "#",
        min: "0"
    });
    $("#txt_DonGia_sua").kendoNumericTextBox({
        format: "# đồng",
        min: "0"
    });
});


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
                                alert("session timeout");
                                window.location.href = "index.aspx";
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
        },
        toolbar: kendo.template($("#Templ_Them_PHULUC_HD_CT").html()),
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
                attributes: {
                    class: "row_css"
                }
            },
            {
                title: "Đơn vị tính",
                headerAttributes: {
                    class: "header_css"
                },
                field: "MaDVT",
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
                template: '<center><a onclick="func_Sua_PHULUC_HD_CT(#= STT #);" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-pencil"></span></a></center>',
                width: "6%"
            },
            {
                template: '<center><a onclick="func_Xoa_PHULUC_HD_CT(#= STT #);" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-close"></span></a></center>',
                width: "6%"
            }
        ]
    });


}

//////////////////////THÊM PHỤ LỤC HỢP ĐỒNG\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function Ham_Them_PLHD() {

    $("#wd_them_plhd").data("kendoWindow").center().open();
    var grid = $("#grid_HD").data("kendoGrid");
    var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));    
    if (selectedTopic == undefined) {
        alert("Chưa chọn số hợp đồng!");
        return;
    }
    else {
        $("#txt_sohd").val(selectedTopic.MaHD);
    }

}
function Ham_Dong_ThemPLHD() {
    $("#wd_them_plhd").data("kendoWindow").close();
}
function Ham_Luu_ThemPLHD() {

    var check = 0;
    if ($("#txt_sophuluchd").val() == "") {
        check = 1;
        alert("Chưa nhập số phụ lục hợp đồng!");
        return;
    }

    if ($("#txt_sohd").val() == "") {
        check = 1;
        alert("Chưa nhập số hợp đồng!");
        return;
    }
    if ($("#cmb_NhaThau").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn nhà thầu!");
        return;
    }
    if ($("#txt_ngay_kyHD").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kí hợp đồng!");
        return;
    }
    if ($("#txt_gthd").val() == "") {
        check = 1;
        alert("Chưa nhập giá trị hợp đồng!");
        return;
    }
    if ($("#txt_ngay_kehoach").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kế hoạch!");
        return;
    }
    if ($("#txt_ngay_hieuluc").val() == "") {
        check = 1;
        alert("Chưa chọn ngày hiệu lực!");
        return;
    }
    if ($("#txt_NoiDung").val() == "") {
        check = 1;
        alert("Chưa nhập nội dung hợp đồng!");
        return;
    }
    if ($("#cmb_LoaiHD").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại hợp đồng!");
        return;
    }
    if ($("#cmb_HTMS").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn hình thức mua sắm!");
        return;
    }
    if ($("#txt_SoNgayThucHien").val() == "") {
        check = 1;
        alert("Chưa nhập số ngày thực hiện!");
        return;
    }
    if (check == 0) {

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PhuLucHD.aspx",
            data: {
                cmd: 'Luu_PhuLucHD',
                p_MaHopDong: $("#txt_sophuluchd").val(),
                p_NhaThau: $("#cmb_NhaThau").data("kendoDropDownList").value(),
                p_NgayKi: $("#txt_ngay_kyHD").val(),
                p_GTHD_so: $("#txt_gthd").val(),
                p_GTHD_chu: document.getElementById("txt_gthd_chu").innerHTML,
                p_NgayKeHoach: $("#txt_ngay_kehoach").val(),
                p_NgayHieuLuc: $("#txt_ngay_hieuluc").val(),
                p_NoiDung: $("#txt_NoiDung").val(),
                p_LoaiHD: $("#cmb_LoaiHD").data("kendoDropDownList").value(),
                p_HinhThucMS: $("#cmb_HTMS").data("kendoDropDownList").value(),
                p_SoNgayThucHien: $("#txt_SoNgayThucHien").val(),
                p_MaHD_Cha: $("#txt_sohd").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã tạo mới phụ lục hợp đồng thành công!");
                $("#wd_them_plhd").data("kendoWindow").close();
                DS_PhuLucHD_SelectByHD_ID.read();
                Ham_Clear_Form_PhuLucHopDong();
            }
            else {
               alert(msg[0].ErrorMessage);
                //alert($("#txt_ngay_kyHD").val());
            }

        });
        request.fail(function (jqXHR, textStatus) {

            alert("Request failed: " + Session["user_id"].ToString());
        });
    }
}
function Ham_Clear_Form_PhuLucHopDong() {

    $("#txt_sohd").val("");
    $("#cmb_NhaThau").data("kendoDropDownList").select(0),
    $("#txt_ngay_kyHD").val("");
    $("#txt_gthd").data("kendoNumericTextBox").value("");
    document.getElementById("txt_gthd_chu").innerHTML = "";
    $("#txt_ngay_kehoach").val("");
    $("#txt_ngay_hieuluc").val("");
    $("#txt_NoiDung").val("");
    $("#cmb_LoaiHD").data("kendoDropDownList").select(0);
    $("#cmb_HTMS").data("kendoDropDownList").select(0);
    $("#txt_SoNgayThucHien").data("kendoNumericTextBox").value("");

}


/////////////////////THEM CHI TIET PHU LUC HOP DONG\\\\\\\\\\\\\\\\\\\\\\
function Ham_Them_PHULUC_HD_CT() {

    $("#wd_them_phuluc_hd_ct").data("kendoWindow").center().open();

}
function Ham_Dong_Them_PHULUC_HD_CT() {

    $("#wd_them_phuluc_hd_ct").data("kendoWindow").close();
}

function Ham_Clear_Form_PHULUC_CT_HD() {

    $("#cmb_VatTu").data("kendoDropDownList").select(0);

    $("#txt_SoLuong").data("kendoNumericTextBox").value("");
    $("#txt_DonGia").data("kendoNumericTextBox").value("");

    $("#cmb_DVT").data("kendoDropDownList").select(0);
    $("#txt_GhiChu").val("");
}
function Ham_Luu_Them_PHULUC_HD_CT() {

    var check = 0;

    if ($("#cmb_LoaiVatTu").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại vật tư!");
        return;
    }
    if ($("#cmb_VatTu").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn vật tư!");
        return;
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
    if ($("#cmb_DVT").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn đơn vị tính!");
        return;
    }
    if (check == 0) {
        var SoLuong = parseInt($("#txt_SoLuong").val());
        var DonGia = parseInt($("#txt_DonGia").val());
        var ThanhTien = SoLuong * DonGia;
        var VAT = ThanhTien * (1 / 10);
        var TongTien = ThanhTien + VAT;
        var HopDong_ID = detailInit_e.data.HopDong_ID;


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_CT.aspx",
            data: {
                cmd: 'Luu_CT_HopDong',
                p_HopDong_ID: HopDong_ID,
                p_VatTu_ID: $("#cmb_VatTu").data("kendoDropDownList").value(),
                p_SoLuong: $("#txt_SoLuong").val(),
                p_DonGia: $("#txt_DonGia").val(),
                p_ThanhTien: parseInt(TongTien),
                p_VAT: parseInt(VAT),
                p_DVT: $("#cmb_DVT").data("kendoDropDownList").value(),
                p_GhiChu: $("#txt_GhiChu").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã thêm vật tư thành công!");
                $("#wd_them_phuluc_hd_ct").data("kendoWindow").close();
                detailInit(detailInit_e);
                Ham_Clear_Form_PHULUC_CT_HD();
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
function Ham_Clear_Form_PHULUC_CT_HD() {
    
    $("#cmb_VatTu").data("kendoDropDownList").select(0);

    $("#txt_SoLuong").data("kendoNumericTextBox").value("");
    $("#txt_DonGia").data("kendoNumericTextBox").value("");

    $("#cmb_DVT").data("kendoDropDownList").select(0);
    $("#txt_GhiChu").val("");
}

//////////////////SỬA PHỤ LỤC HỢP ĐỒNG\\\\\\\\\\\\\\\\\\\\\\\\\\
function func_Sua_PHULUC_HD(p_HopDong_ID) {

    $("#wd_sua_plhd").data("kendoWindow").center().open();

    var grid_data = $("#grid_phulucHD").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.HopDong_ID == p_HopDong_ID;
    });

    ////////////////////////////////////

    $("#txt_HopDong_ID").val(p_HopDong_ID);
   
    $("#txt_sohd_sua").prop('disabled', true); $("#txt_sohd_sua").val(res[0].MaHD);
    $("#txt_sohd_cha_sua").val(res[0].MaHD_Cha);
    $("#txt_ngay_kyHD_sua").val(res[0].NgayKy);
    $("#txt_ngay_kehoach_sua").val(res[0].NgayKeHoach_NT);
    $("#txt_ngay_hieuluc_sua").val(res[0].NgayHieuLuc);
    $("#txt_NoiDung_sua").text(res[0].NoiDung);
    $("#txt_gthd_chu_sua").text(res[0].SoTienBangChu);

    //$("#txt_gthd_sua").data("kendoNumericTextBox").value(res[0].GiaTriHopDong);
    $("#txt_SoNgayThucHien_sua").data("kendoNumericTextBox").value(res[0].SoNgayThucHien);

    $("#cmb_LoaiHD_sua").data("kendoDropDownList").value(res[0].LoaiHD_ID);
    $("#cmb_HTMS_sua").data("kendoDropDownList").value(res[0].HinhThucMS_ID);
    $("#cmb_NhaThau_sua").data("kendoDropDownList").value(res[0].NhaThau_ID);
}

function Ham_Dong_Sua_PHULUC_HD() {
    $("#wd_sua_plhd").data("kendoWindow").close();

}

function Ham_Luu_Sua_PHULUC_HD() {

    var check = 0;

    if ($("#cmb_NhaThau_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn nhà thầu!");
        return;
    }
    if ($("#txt_ngay_kyHD_sua").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kí hợp đồng!");
        return;
    }
    if ($("#txt_gthd_sua").val() == "") {
        check = 1;
        alert("Chưa nhập giá trị hợp đồng!");
        return;
    }
    if ($("#txt_ngay_kehoach_sua").val() == "") {
        check = 1;
        alert("Chưa chọn ngày kế hoạch!");
        return;
    }
    if ($("#txt_ngay_hieuluc_sua").val() == "") {
        check = 1;
        alert("Chưa chọn ngày hiệu lực!");
        return;
    }
    if ($("#txt_NoiDung_sua").val() == "") {
        check = 1;
        alert("Chưa nhập nội dung hợp đồng!");
        return;
    }
    if ($("#cmb_LoaiHD_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn loại hợp đồng!");
        return;
    }
    if ($("#cmb_HTMS_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn hình thức mua sắm!");
        return;
    }
    if ($("#txt_SoNgayThucHien_sua").val() == "") {
        check = 1;
        alert("Chưa nhập số ngày thực hiện!");
        return;
    }
    var trong = 0;
    if (check == 0) {
      
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_PhuLucHD.aspx",
            data: {
                cmd: 'Sua_PhuLucHopDong',
                p_HopDong_ID: $("#txt_HopDong_ID").val(),
                p_HopDong_ID_Cha: $("txt_HopDong_ID_Cha").val(),

                p_MaHopDong: $("#txt_sohd_sua").val(), // mã phụ lục hợp đồng = mã hợp đồng 
                p_MaHopDong_Cha: $("#txt_sohd_cha_sua").val(), // mã hợp đồng gốc
               
                p_NhaThau: $("#cmb_NhaThau_sua").data("kendoDropDownList").value(),
                p_NgayKi: $("#txt_ngay_kyHD_sua").val(),
                p_GTHD_so: $("#txt_gthd_sua").val(),
                p_GTHD_chu: document.getElementById("txt_gthd_chu_sua").innerHTML,
                p_NgayKeHoach: $("#txt_ngay_kehoach_sua").val(),
                p_NgayHieuLuc: $("#txt_ngay_hieuluc_sua").val(),
                p_NoiDung: $("#txt_NoiDung_sua").val(),
                p_LoaiHD: $("#cmb_LoaiHD_sua").data("kendoDropDownList").value(),
                p_HinhThucMS: $("#cmb_HTMS_sua").data("kendoDropDownList").value(),
                p_SoNgayThucHien: $("#txt_SoNgayThucHien_sua").val()
                
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa hợp đồng thành công!");
                $("#wd_sua_plhd").data("kendoWindow").close();
                DS_PhuLucHD_SelectByHD_ID.read();
              //  location.reload(true);
            }
            else {
                  alert(msg[0].ErrorMessage);
             //   alert();
            }

        });
        request.fail(function (jqXHR, textStatus) {
          alert("Request failed: " + textStatus);
        });
    }

}


////////////////SỬA CHI TIẾT PHỤ LỤC HỢP ĐỒNG \\\\\\\\\\\\\\\\\\\\
function func_Sua_PHULUC_HD_CT(p_STT) {

    $("#wd_sua_plhd_ct").data("kendoWindow").center().open();

    v_STT = p_STT;

    var grid_data = $("#tab_VatTu").data("kendoGrid"),
            data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.STT == p_STT;
    });

    ////////////////////////////////////

    //$("#cmb_LoaiVatTu_sua").data("kendoDropDownList").value(res[0].LoaiVT_ID);
    $("#cmb_VatTu_sua").data("kendoDropDownList").value(res[0].VatTu_ID);


    $("#txt_SoLuong_sua").data("kendoNumericTextBox").value(res[0].SoLuong);
    $("#txt_DonGia_sua").data("kendoNumericTextBox").value(res[0].DonGia);

    $("#cmb_DVT_sua").data("kendoDropDownList").value(res[0].MaDVT);
    $("#txt_GhiChu_sua").val(res[0].GhiChu);

}
function Ham_Luu_Sua_PHULUC_HD_CT() {

    var check = 0;

    if ($("#txt_SoLuong_sua").val() == "" || $("#txt_SoLuong_sua").val() == "0") {
        check = 1;
        alert("Chưa nhập số lượng!");
        return;
    }
    if ($("#txt_DonGia_sua").val() == "" || $("#txt_DonGia_sua").val() == "0") {
        check = 1;
        alert("Chưa đơn giá!");
        return;
    }
    if ($("#cmb_DVT_sua").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn đơn vị tính!");
        return;
    }
    if (check == 0) {


        var SoLuong = parseInt($("#txt_SoLuong_sua").val());
        var DonGia = parseInt($("#txt_DonGia_sua").val());
        var ThanhTien = SoLuong * DonGia;
        var VAT = ThanhTien * (1 / 10);
        var TongTien = ThanhTien + VAT;
        var HopDong_ID = detailInit_e.data.HopDong_ID;


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_CT.aspx",
            data: {
                cmd: 'Sua_CT_HopDong',
                p_STT: v_STT,
                p_VatTu_ID: $("#cmb_VatTu_sua").data("kendoDropDownList").value(),
                p_SoLuong: $("#txt_SoLuong_sua").val(),
                p_DonGia: $("#txt_DonGia_sua").val(),
                p_ThanhTien: parseInt(TongTien),
                p_VAT: parseInt(VAT),
                p_DVT: $("#cmb_DVT_sua").data("kendoDropDownList").value(),
                p_GhiChu: $("#txt_GhiChu_sua").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã sửa vật tư thành công!");
                $("#wd_sua_plhd_ct").data("kendoWindow").close();
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
function Ham_Dong_Sua_PHULUC_HD_CT() {

    $("#wd_sua_plhd_ct").data("kendoWindow").close();
}

////////////////// XÓA CHI TIẾT PHỤ LỤC HỢP ĐỒNG\\\\\\\\\\\\\\\

function func_Xoa_PHULUC_HD_CT(STT) {

    if (confirm("Bạn có chắc chắn muốn xóa vật tư này không?")) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong_CT.aspx",
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

///////////////////XÓA PHỤ LỤC HỢP ĐỒNG \\\\\\\\\\\\\\\\\\\\
function func_Xoa_PHULUC_HD(HopDong_ID) {

    if (confirm("Bạn có chắc chắn muốn xóa phụ lục hợp đồng này không?")) {


        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_HopDong.aspx",
            data: {
                cmd: 'Xoa_HopDong',
                p_HopDong_ID: HopDong_ID

            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {
                alert("Đã xóa phụ lục hợp đồng thành công!");
                DS_PhuLucHD_SelectByHD_ID.read();
            }
            else {
                alert('Không thể xóa! Phụ lục HĐ này đã có chi tiết vật tư!');
            }

        });
        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    }
}

//////////////////TÌM HỢP ĐỒNG\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


function Ham_Tim_HD() {

    $("#wd_Show_HD").data("kendoWindow").center().open();
    
    ////////////////////////////
    $("#grid_HD").empty();
    ////////////////////////////
    var grid = $("#grid_HD").kendoGrid({
        dataSource: DS_HopDong,
        pageable: true,
        pageable: {
            messages: {
                display: "Tổng số   {2}   hợp đồng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        sortable: true,
        selectable: "multiple row",
        toolbar: kendo.template($("#Templ_HD").html()),
        detailTemplate: kendo.template($("#Templ_ChiTiet_HopDong").html()),
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
        },
        detailInit: function (e) {

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
                                        alert("session timeout");
                                        window.location.href = "index.aspx";
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
                        title: "Đơn giá",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "DonGia",
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
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Đơn vị tính",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaDVT",
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
        },
        columns:
            [
                {
                    hidden: true,
                    field: "HopDong_ID"
                },
                {
                    title: "Số HĐ",
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
                    title: "Ngày ký HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayKy",
                    attributes: {
                        class: "row_css"
                    }
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
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày hiệu lực",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHieuLuc",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    title: "Ngày hết hạn",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "NgayHetHan",
                    attributes: {
                        class: "row_css"
                    }
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
}

function Ham_Chon_HD() {

    $("#wd_Show_HD").data("kendoWindow").close();

    var grid = $("#grid_HD").data("kendoGrid");
    var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));    
    if (selectedTopic == undefined) {
        alert("Chưa chọn số hợp đồng!");
        return;
    }
    else {

        $("#txt_maHD").val(selectedTopic.MaHD);
      
        hopdong_id = selectedTopic.HopDong_ID;
        
        DS_PhuLucHD_SelectByHD_ID = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_PhuLucHD.aspx",
                        data: {
                            cmd: 'Lay_DS_PhuLucHD_SelectByHD_ID',
                            p_HopDong_ID: hopdong_id,
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("session timeout");
                                window.location.href = "index.aspx";
                            }
                            else {
                                options.success(
                                   // alert($("#txt_hopdongID").val()),
                                    result
                                );
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
        $("#grid_phulucHD").empty();
        var grid = $("#grid_phulucHD").kendoGrid({
            dataSource: DS_PhuLucHD_SelectByHD_ID,
            toolbar: kendo.template($("#Templ_ThemPLHD").html()),
            detailTemplate: kendo.template($("#Templ_ChiTiet_phuluc_HopDong").html()),
            dataBound: function () {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            detailExpand: function (e) {
                this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
            },
            detailInit: detailInit,
            columns:
                [
                    {
                        hidden: true,
                        field: "HopDong_ID"
                    },
                     {
                         hidden: true,
                         field: "HopDong_ID_Cha"
                     },
                    {
                        title: "Số PLHĐ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaHD",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Số HĐ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "MaHD_Cha",
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
                        title: "Ngày ký HĐ",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayKy",
                        attributes: {
                            class: "row_css"
                        }
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
                        title: "Ngày hiệu lực",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayHieuLuc",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        title: "Ngày hết hạn",
                        headerAttributes: {
                            class: "header_css"
                        },
                        field: "NgayHetHan",
                        attributes: {
                            class: "row_css"
                        }
                    },
                    {
                        template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_Sua_PHULUC_HD(#= HopDong_ID #);"><span class="k-icon k-i-pencil"></span></a></center>',
                        width: "6%"
                    },
                    {
                        template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_Xoa_PHULUC_HD(#= HopDong_ID #);"><span class="k-icon k-i-close"></span></a></center>',
                        width: "6%"
                    }

                ]
        });

        $("#txt_search_so_plhd").kendoAutoComplete({
            dataTextField: "MaHD",
            dataSource: DS_PhuLucHD_SelectByHD_ID,
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
    }   

}
function GetPriceText(val, id) {

    if (val < 1000)
        document.getElementById(id).innerHTML = val + " triệu";
    else {
        document.getElementById(id).innerHTML = Math.round((val / 1000) * 100) / 100 + " tỷ";
    }

}


