


$(document).ready(function () {

    //$("#main-menu-min").click();


    var notification = $("#notification").kendoNotification({
        position: {
            pinned: true,
            top: 50,
            right: 450
        },
        autoHideAfter: 1000,
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

    var WD_Them = $("#WD_Them").kendoWindow({
        draggable: false,
        height: "auto",
        width: "auto",
        actions: ["Close"],
        modal: true,
        resizable: false,
        title: "Tạo mới checklist chứng từ",
        visible: false,

    }).data("kendoWindow");

    var grid_data = $("#grid_data").kendoGrid({
        dataSource:{
            transport: {
                read: function (options) {
                    $.ajax({
                        type: "POST",
                        url: "assets/ajax/Ajax_DM_Checklist.aspx",
                        data: {
                            cmd: 'DanhSach_Checklist'
                        },
                        dataType: 'json',
                        success: function (result) {
                            if (result == "err401") {
                                alert("Phiên đã hết hạn!Vui lòng đăng nhập lại.");
                                window.location.href = "DangNhap.aspx?p=DM_Checklist.aspx";
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
        },
        toolbar: kendo.template($("#Templ_grid").html()),
        pageable: {
            messages: {
                display: "Tổng số   {2}   checklist",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        sortable: true,
        columns: [
            {
                template: function (data) {

                    return '<center><a onclick="Ham_Sua_Grid(' + data.ID + ');" class="btn btn-info"><i class="fa fa-edit "></i> Sửa</a></center>'

                },
                width: 100
            },
            {

                template: function (data) {

                    if (data.Check_Xoa == 0) {
                        return '<center><a onclick="Ham_Xoa_Grid(' + data.ID + ');" class="btn btn-danger" ><i class="fa fa-trash-o "></i> Xóa</a></center>'
                    } else {
                        return ''
                    }

                },
                width: 100
            },           
            {
                field: "MaChungTu",                
                title: "Mã Chứng Từ",
                width: 150,
                headerAttributes: { class: "header_css" },
                attributes: { class: "row_css" }
            },
            {
                field: 'TenChungTu',
                title: 'Tên Chứng Từ',
                width: 350,
                headerAttributes: { class: "header_css" },
                attributes: {
                    class: "row_css",
                    style: "font-weight: bold !important;"
                }
            }            
        ]
    }).data("kendoGrid");


    $("#btn_Them").click(function () {

        //Clear form 

        $("#txt_MaChungTu").val('');
        $("#txt_TenChungTu").val('');


        $("#hf_ID").val('');



        WD_Them.center().open();
    });

    $("#btn_Luu_Them").click(function () {

        

        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_DM_Checklist.aspx",
            data: {
                cmd: 'CapNhat_Checklist',               
                ID: $("#hf_ID").val() == "" ? "0" : $("#hf_ID").val(),
                TenChungTu: $("#txt_TenChungTu").val(),
                MaChungTu: $("#txt_MaChungTu").val()
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                grid_data.dataSource.read();

                notification.show({
                    message: "Cập nhật thành công!"
                }, "upload-success");
                
                WD_Them.close();

            }
            else {

                notification.show({
                    title: "Lỗi",
                    message: msg[0].ErrorMessage
                }, "error");
            }


        });
        request.fail(function (jqXHR, textStatus) {
            notification.show({
                title: "Lỗi",
                message: textStatus
            }, "error");

        });


    });
    


});
function Ham_Sua_Grid(p_ID) {


    var grid_data = $("#grid_data").data("kendoGrid"),
    data = grid_data.dataSource.data();

    var res = $.grep(data, function (d) {
        return d.ID == p_ID;
    });
    
    $("#txt_MaChungTu").val(res[0].MaChungTu);
    $("#txt_TenChungTu").val(res[0].TenChungTu);


    $("#hf_ID").val(res[0].ID);
    $("#WD_Them").data("kendoWindow").center().open();


}
function Ham_Xoa_Grid(p_ID) {
    if (confirm("Bạn có chắc muốn xóa checklist này không?")) {
        var request = $.ajax({
            type: "POST",
            url: "assets/ajax/Ajax_DM_Checklist.aspx",
            data: {
                cmd: 'Xoa_Checklist',
                ID: p_ID
            },
            dataType: 'json'
        });
        request.done(function (msg) {

            if (msg[0].ErrorMessage == null) {

                $("#grid_data").data("kendoGrid").dataSource.read();
                
                $("#notification").data("kendoNotification").show({
                    message: "Xóa thành công!"
                }, "upload-success");
                
            }
            else {

                $("#notification").data("kendoNotification").show({
                    title: "Lỗi",
                    message: msg[0].ErrorMessage
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