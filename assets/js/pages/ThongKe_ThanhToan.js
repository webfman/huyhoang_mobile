

$(document).ready(function () {

    //$("#main-menu-toggle").click();

    $("#main-menu-min").click();

    $("#btn_loc").click(function () {

        if ($("#cmb_BoLoc").data().kendoDropDownList.value() == "1") {

            
            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_ThanhToan.aspx",
                            data: {
                                cmd: 'TK_TT_CT_byHopDong_ID',
                                HopDong_ID: $("#cmb_so_hd").data().kendoComboBox.value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                options.success(result);
                            }
                        });
                    }
                }
            });
            $("#grid_data").data().kendoGrid.setDataSource(ds);

        }
        else if ($("#cmb_BoLoc").data().kendoDropDownList.value() == "2") {


            var ds = new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            type: "POST",
                            url: "assets/ajax/Ajax_ThanhToan.aspx",
                            data: {
                                cmd: 'TK_TT_CT_byPO_ID',
                                PO_ID: $("#cmb_so_po").data().kendoComboBox.value()
                            },
                            dataType: 'json',
                            success: function (result) {
                                options.success(result);
                            }
                        });
                    }
                }
            });
            $("#grid_data").data().kendoGrid.setDataSource(ds);
        }

    });

    

    $("#Tr_HD").hide();
    $("#Tr_PO").hide();
    $("#Tr_Loc").hide();
    $("#grid_data").hide();

    $("#cmb_BoLoc").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Hợp đồng", value: "1" },
            { text: "PO", value: "2" }
        ],
        optionLabel: "Chọn",
        select: function (e) {

            var dataItem = this.dataItem(e.item.index());
            var value = dataItem.value;

            switch (value) {
                case "1":

                    //$("#grid_data").data("kendoGrid").dataSource.filter({});


                    $("#Tr_HD").show();
                    $("#Tr_PO").hide();
                    $("#Tr_Loc").show();
                    $("#grid_data").show();
                  
                    var ds = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    type: "POST",
                                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                                    data: {
                                        cmd: 'TK_TT_Get_MaHD'
                                    },
                                    dataType: 'json',
                                    success: function (result) {
                                        options.success(result);
                                    }
                                });
                            }
                        }
                    });
                    $("#cmb_so_hd").data().kendoComboBox.setDataSource(ds);

                    break;
                case "2":

                    $("#Tr_HD").hide();
                    $("#Tr_PO").show();
                    $("#Tr_Loc").show();
                    $("#grid_data").show();

                    var ds = new kendo.data.DataSource({
                        transport: {
                            read: function (options) {
                                $.ajax({
                                    type: "POST",
                                    url: "assets/ajax/Ajax_ThanhToan.aspx",
                                    data: {
                                        cmd: 'TK_TT_Get_SoPO'
                                    },
                                    dataType: 'json',
                                    success: function (result) {
                                        options.success(result);
                                    }
                                });
                            }
                        }
                    });
                    $("#cmb_so_po").data().kendoComboBox.setDataSource(ds);

                    break;

                default:

                    $("#Tr_HD").hide();
                    $("#Tr_PO").hide();
                    $("#Tr_Loc").hide();
                    $("#grid_data").hide();

            }
        }
    });    $("#cmb_so_hd").kendoComboBox({
        dataTextField: "MaHD",
        dataValueField: "HopDong_ID"

    }).data("kendoComboBox");    $("#cmb_so_po").kendoComboBox({
        dataTextField: "SoPO",
        dataValueField: "PO_ID"
    }).data("kendoComboBox");
    $("#grid_data").kendoGrid({
        pageable: {
            messages: {
                display: "Tổng số   {2}   dòng",
                empty: "Không có dữ liệu",
                page: "Trang",
                of: "of {0}",
                itemsPerPage: "Số mục trong một trang"

            }
        },
        scrollable: false,
        resizable: true,        toolbar: kendo.template($("#Temp_toolbar").html()),
    });


});
function Ham_Xuat_Ex() {
    $("#grid_data").data("kendoGrid").saveAsExcel();
}
