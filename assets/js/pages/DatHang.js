
var DS_HopDong, DS_PO_Con, DS_ChiTietHD;

var DS_DonVi, DS_DonVi_Xoa;
var DS_PO_Con_CT, DS_PO_Con_CT_Xoa;


var PO_ID_Con = 0;
var PO_ID_Con_Sua;

var PO_ID_CT = 0;
var detailInit_e;
var MaDVT;
$(document).ready(function () {
	document.oncontextmenu = function () { return false; }
    $('#txt_SoHD').prop('disabled', true);
    $('#txt_DVT').prop('disabled', true);
    $('#txt_DonGia').prop('disabled', true);
 
    //////// DataSource\\\\\\\\\\\\    
    DS_DonVi_Xoa = new kendo.data.DataSource({ data: [] });
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
            }
        }
        
    });
    DS_PO_Con = new kendo.data.DataSource({
        schema: {
            model: {
                fields: {
                    PO_ID_Con: { type: "number", editable: false },
                    PO_ID: { type: "number", editable: false },
                    DonVi_ID: { type: "number", editable: false },
                    DonVi_Ten: { type: "string", editable: false },
                    TenDuAn: { type: "string", editable: false },
                    NgayHoanTat: { type: "string", editable: false },
                    TinhTrangTong: { type: "int", editable: false }
                }
            }
        }
    });

    DS_PO_Con_CT_Xoa = new kendo.data.DataSource({ data: [] });
    DS_PO_Con_CT = new kendo.data.DataSource({
        schema: {
            model: {
                fields: {
                    ID: { type: "number", editable: false },
                    PO_ID_Con: { type: "number", editable: false },
                    VatTu_ID: { type: "number", editable: false },
                    VatTu_Ten: { type: "string", editable: false },
                    SoLuong: { type: "number", editable: false },
                    DonGia: { type: "number", editable: false },
                    MaDVT: { type: "number", editable: false },
                    TenDVT: { type: "string", editable: false },
                    ThanhTien: { type: "number", editable: false },
                    VAT: { type: "number", editable: false }
                        
                }
            }
        }
    });
    
    ////////////// Form Show HD/////////////////////
    $("#wd_Show_HD").kendoWindow({
        draggable: false,        
        height: "50%",
        width: "80%",
        modal: true,
        resizable: false,
        title: "Tìm hợp đồng",
        visible: false,
        actions: false

    }).data("kendoWindow");

    ////////////// Form thêm PO con/////////////////////

    $("#wd_them_po").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Thêm PO con",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#cmb_DonVi").kendoDropDownList({
        optionLabel: "--Chọn đơn vị--",
        dataTextField: "TenDonVi",
        dataValueField: "ID",
        dataSource: DS_DonVi
    });
    ////////////// Form sửa PO con/////////////////////

    $("#wd_sua_po").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Sửa PO con",
        visible: false,
        actions: false

    }).data("kendoWindow");

    $("#cmb_DonVi_sua").kendoDropDownList({
        optionLabel: "--Chọn đơn vị--",
        dataTextField: "TenDonVi",
        dataValueField: "ID",
        dataSource: DS_DonVi
    });


    ////////////// Form tạo PO /////////////////////
    $("#txt_SoHD").kendoAutoComplete({        
        dataTextField: "MaHD",        
        dataSource: DS_HopDong
    });

    $("#txt_NgayKy").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayGiaoHang").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#Ngay_PO").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_ngay_kyHD").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayGiaoHangNhaThau").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_NgayNghiemThu").kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    $("#txt_SoNgayGH").kendoNumericTextBox({
        format: "# ngày",
        min: "0"
    });
   
       
    $("#grid_PO").kendoGrid({
        dataSource: DS_PO_Con,
        toolbar: kendo.template($("#Templ_ThemPO").html()),
        detailExpand: function (e) {
            this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
            PO_ID_CT = 0;
        },
        //dataBound: function () {
        //    this.expandRow(this.tbody.find("tr.k-master-row").first());
        //},
        detailInit: detailInit,
        columns:
            [
                {
                    title: "PO_ID_Con",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "PO_ID_Con",
                    attributes: {
                        class: "row_css"
                    }
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
                },               
                {
                    title: "Tên dự án",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "TenDuAn",
                    attributes: {
                        class: "row_css"
                    }
                },
                {
                    template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_SuaPO(#= PO_ID_Con #,#=DonVi_ID#,\'#= TenDuAn #\');"><span class="k-icon k-i-pencil"></span></a></center>',
                    width: "6%"
                },
                {
                    template: '<center><a class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" onclick="func_XoaPO(#= PO_ID_Con #,#=DonVi_ID#);"><span class="k-icon k-i-close"></span></a></center>',
                    width: "6%"
                }
            ]
    });


    ////////////// Form PO chi tiết/////////////////////

    $("#wd_them_po_ct").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        resizable: false,
        title: "Thêm vật tư",
        visible: false,
        actions: false

    }).data("kendoWindow");
    $("#txt_SoLuong").kendoNumericTextBox({
        format: "#",
        min: "0"
    });

});

function Ham_Them_PO() {
    $("#wd_them_po").data("kendoWindow").center().open();    
}
function Ham_Luu_PO() {

    var check = 0;

    if ($("#cmb_DonVi").data("kendoDropDownList").value() == "") {
        check = 1;
        alert("Chưa chọn đơn vị!");
        return;
    }
    if ($("#txt_DuAn").val() == "" ) {
        check = 1;
        alert("Chưa nhập tên dự án!");
        return;
    }
    if (check== 0) {

        PO_ID_Con++;

        DS_PO_Con.add
        (
            {
                PO_ID_Con: PO_ID_Con,
                PO_ID: 0,//Chưa quan tâm
                DonVi_ID: parseInt($("#cmb_DonVi").data("kendoDropDownList").value()),
                DonVi_Ten: $("#cmb_DonVi").data("kendoDropDownList").text(),
                TenDuAn: $("#txt_DuAn").val(),
                NgayHoanTat: '',
                TinhTrangTong: 0

            }
        );


        for (var i = 0; i < DS_DonVi.data().length; i++) {
            if (DS_DonVi.data()[i].ID == parseInt($("#cmb_DonVi").data("kendoDropDownList").value())) {
                var item = DS_DonVi.data()[i];

                DS_DonVi.remove(item);
                DS_DonVi_Xoa.add(item);

                break;
            }
        }

        $("#wd_them_po").data("kendoWindow").close();
        Ham_Clear_Form_PO();
    }    
}
function Ham_Dong_PO() {
    $("#wd_them_po").data("kendoWindow").close();
    Ham_Clear_Form_PO();
}
function Ham_Clear_Form_PO() {
    
    $("#cmb_DonVi").data("kendoDropDownList").select(0);
    $("#txt_DuAn").val("");
}
function func_XoaPO(p_PO_ID_Con,p_DonVi_ID) {

    if (confirm("Bạn có chắc chắn muốn xóa PO con này không?")) {

        var grid_data = $("#grid_PO").data("kendoGrid"),
                    data = grid_data.dataSource.data();
        var res = $.grep(data, function (d) {
            return d.PO_ID_Con == p_PO_ID_Con;
        });
        DS_PO_Con.remove(res[0]);
        /////////////////////////////////////////////////////////////
        
        for (var i = 0; i < DS_DonVi_Xoa.data().length; i++) {
            if (DS_DonVi_Xoa.data()[i].ID == parseInt(p_DonVi_ID)) {
                var item = DS_DonVi_Xoa.data()[i];

                DS_DonVi.add(item);
                DS_DonVi_Xoa.remove(item);

                break;
            }
        }
    }

    
}
function func_SuaPO(PO_ID_Con,DonVi_ID,TenDuAn){

    $("#wd_sua_po").data("kendoWindow").center().open();

    PO_ID_Con_Sua = PO_ID_Con;
    $("#cmb_DonVi_sua").data("kendoDropDownList").select(DonVi_ID);
    $("#txt_DuAn_sua").val(TenDuAn);
}


function Ham_Sua_PO() {

    for (var i = 0; i < DS_PO_Con.data().length; i++) {

        if (DS_PO_Con.data()[i].PO_ID_Con = PO_ID_Con_Sua) {

            var item = DS_PO_Con.data()[i];
            DS_PO_Con.remove(item);
            DS_PO_Con.add
            (
                {
                    PO_ID_Con: PO_ID_Con_Sua,
                    PO_ID: 0,//Chưa quan tâm
                    DonVi_ID: parseInt($("#cmb_DonVi_sua").data("kendoDropDownList").value()),
                    DonVi_Ten: $("#cmb_DonVi_sua").data("kendoDropDownList").text(),
                    TenDuAn: $("#txt_DuAn_sua").val(),
                    NgayHoanTat: '',
                    TinhTrangTong: 0

                }
            );
            break;
        }
    }
    $("#wd_sua_po").data("kendoWindow").close();
}
function Ham_Sua_Dong_PO() {
    $("#wd_sua_po").data("kendoWindow").close();
}
function detailInit(e) {
    
    var filters = {
        logic: "or", filters: [{ field: "PO_ID_Con", operator: "eq", value: e.data.PO_ID_Con }]
    }
    var allData = DS_PO_Con_CT.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;
    detailInit_e = e;

    e.detailCell.empty();
    
    $("<div/>").appendTo(e.detailCell).kendoGrid({        
        dataSource: data,
        toolbar: kendo.template($("#Templ_ThemPO_CT").html()),
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
            
            //{
            //    template: '<center><a onclick="func_SuaHD_CT(#= STT #);" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-pencil"></span></a></center>',
            //    width: "6%"
            //},
            //{
            //    template: '<center><a onclick="func_XoaHD_CT(#= STT #);" class="k-button" style="font-size: 0.85em !important;min-width:8px !important;" ><span class="k-icon k-i-close"></span></a></center>',
            //    width: "6%"
            //}
        ]
    });
}

function Ham_Them_PO_CT() {
    

    var MaHD = $("#txt_SoHD").val();
    ///////////////////////////////////////
    if (MaHD == "") {
        alert("Chưa chọn số hợp đồng!");
        return;
    } else {
        $("#wd_them_po_ct").data("kendoWindow").center().open();
    }
}

function Ham_Tim_HD() {
    
    $("#wd_Show_HD").data("kendoWindow").center().open();
    $("#grid_HD").empty();
    ////////////////////////////
    var grid = $("#grid_HD").kendoGrid({
        dataSource: DS_HopDong,
        pageable: true,        
        selectable: "multiple row",
        toolbar: kendo.template($("#Templ_HD").html()),        
        columns:
            [
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
                    title: "Giá trị HĐ",
                    headerAttributes: {
                        class: "header_css"
                    },
                    field: "GiaTriHopDong",
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
    

    var grid = $("#grid_HD").data("kendoGrid");
    var selectedTopic = grid.dataSource.getByUid(grid.select().data("uid"));    
    if (selectedTopic==undefined) {
        alert("Chưa chọn số hợp đồng!");
        return;
    }
    else {
        $("#txt_SoHD").val(selectedTopic.MaHD);
        $("#wd_Show_HD").data("kendoWindow").close();
        
        //////////////////////////////////////////////

        var MaHD = selectedTopic.MaHD;
        
        DS_ChiTietHD = new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_HopDong_CT.aspx",
                        data: {
                            cmd: 'DS_HD_CT_by_MaHD',
                            MaHD: MaHD
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
       

        DS_ChiTietHD.read();
        $("#cmb_LoaiVatTu").kendoDropDownList({
            optionLabel: "--Chọn loại vật tư--",
            dataTextField: "TenLoaiVT",
            dataValueField: "LoaiVT_ID",
            dataSource: DS_ChiTietHD
        });
        
        $("#cmb_VatTu").kendoDropDownList({
            optionLabel: "--Chọn loại vật tư--",
            cascadeFrom: "cmb_LoaiVatTu",
            dataTextField: "VatTu_Ten",
            dataValueField: "VatTu_ID",
            dataSource: DS_ChiTietHD,
            change: function (e) {
                var value = this.value();
                
                for (var i = 0; i < DS_ChiTietHD.data().length; i++) {
                    if (value == DS_ChiTietHD.data()[i].VatTu_ID) {
                        
                        $("#txt_DVT").val(DS_ChiTietHD.data()[i].TenDVT);

                        MaDVT = DS_ChiTietHD.data()[i].MaDVT;

                        $("#txt_DonGia").val(DS_ChiTietHD.data()[i].DonGia);

                        break;
                    }
                }
            }
        });

    }

}

function Ham_Luu_ThemPO_CT() {
    
    var check = 0;

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
    if (check== 0) {

        PO_ID_CT++;

        var SoLuong = parseInt($("#txt_SoLuong").val());
        var DonGia = parseInt($("#txt_DonGia").val());
        var ThanhTien = SoLuong * DonGia;
        var VAT = ThanhTien * (1 / 10);
        var TongTien = ThanhTien + VAT;
        
        DS_PO_Con_CT.add
        (
            {        
                ID: PO_ID_CT,
                PO_ID_Con: PO_ID_Con,
                VatTu_ID: $("#cmb_VatTu").data("kendoDropDownList").value(),
                VatTu_Ten: $("#cmb_VatTu").data("kendoDropDownList").text(),
                SoLuong: $("#txt_SoLuong").val(),
                DonGia: $("#txt_DonGia").val(),
                MaDVT: MaDVT,
                TenDVT: $("#txt_DVT").val(),
                ThanhTien:TongTien,
                VAT:VAT
            }
        );
        $("#wd_them_po_ct").data("kendoWindow").close();
        Ham_Clear_Form_PO_CT();

        detailInit(detailInit_e);
    }    


}
function Ham_Dong_ThemPO_CT() {
    $("#wd_them_po_ct").data("kendoWindow").close();
}
function Ham_Clear_Form_PO_CT() {
    //$("#txt_SoLuong").val("");
    $("#txt_SoLuong").data("kendoNumericTextBox").value(0);
}


function Ham_Luu() {
    alert(JSON.stringify(DS_PO_Con.data()));
    alert(JSON.stringify(DS_PO_Con_CT.data()));
}