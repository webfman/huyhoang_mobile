<%@ Page Title="Quản Trị Quyền Người Dùng" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="PhanQuyen.aspx.cs" Inherits="PhanQuyen" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">
    <link href="Content/Kendo2014/kendo.common-bootstrap.min.css" rel="stylesheet" />
    <link href="Content/Kendo2014/kendo.bootstrap.min.css" rel="stylesheet" />
    <link href="libraries/font-awesome-4.2.0/css/font-awesome.min.css" rel="stylesheet" />
    <link href="assets/css/Style_Grid_Kendo.css" rel="stylesheet" />

    <style type="text/css">
        table[role=grid] th {
            text-align: center !important;
            font-weight: bold !important;
        }

        .nav.nav-tabs {
            background-color: #fff;
            border: 1px solid #ddd;
        }

        .tab-content {
            background-color: #fff;
        }

        .nav-tabs > li.active a {
            font-weight: bold;
        }

        #dlgVaiTro_Quyen .container-fluid,
        #dlgVaiTro_Quyen .row,
        #dlgVaiTro_Quyen .col-md-2,
        #dlgVaiTro_Quyen .col-md-5,
        #dlgVaiTro_Quyen .col-md-12 {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        #lvwDSQuyen, #lvwQuyenDaChon {
            -moz-box-sizing: content-box;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
        }

            #lvwDSQuyen div, #lvwQuyenDaChon div {
                border: 1px solid #fff;
            }

                #lvwDSQuyen div:hover, #lvwQuyenDaChon div:hover {
                    border: 1px solid #ddd;
                }

        #dlgNguoiDung_VaiTro .container-fluid,
        #dlgNguoiDung_VaiTro .row,
        #dlgNguoiDung_VaiTro .col-md-4,
        #dlgNguoiDung_VaiTro .col-md-8,
        #dlgNguoiDung_VaiTro .col-md-12 {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
    </style>

    <script src="Scripts/kendo.2014.2.716/kendo.all.min.js"></script>
    <script src="Scripts/kendo.2014.2.716/cultures/kendo.culture.vi-VN.min.js"></script>
    <script src="Scripts/pq.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="Server">
    <span id="notification"></span>

    <div id="dlgVaiTro_Quyen">
        <div class="container-fluid">
            <div class="row" style="margin-top: 5px">
                <div class="col-md-5">
                    <label>Danh sách quyền</label>
                    <div id="lvwDSQuyen" style="height: 400px; overflow: auto; cursor: default"></div>
                </div>
                <div class="col-md-2 text-center" style="padding-top: 50px">
                    <button type="button" id="btnThemQuyen" class="k-button" style="width: 80px">---&gt;</button><br />
                    <br />
                    <button type="button" id="btnXoaQuyen" class="k-button" style="width: 80px">&lt;---</button>
                </div>
                <div class="col-md-5">
                    <label>Quyền đã chọn</label>
                    <div id="lvwQuyenDaChon" style="height: 400px; overflow: auto; cursor: default"></div>
                </div>
            </div>
            <div class="row" style="margin-top: 15px; border-top: 1px solid #ddd">
                <div class="col-md-12 text-center" style="margin-top: 10px; margin-bottom: 5px">
                    <button type="button" id="btnLuuQuyen" class="k-button k-primary"><span class="k-icon k-update"></span>&nbsp;Cập nhật</button>
                    <button type="button" id="btnHuyQuyen" class="k-button"><span class="k-icon k-cancel"></span>&nbsp;Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div id="dlgNguoiDung_VaiTro">
        <div class="container-fluid">
            <div class="row" style="margin-top: 5px">
                <div class="col-md-4">
                    <label for="txtEmail">Tên người dùng (E-mail)</label>
                </div>
                <div class="col-md-8" style="padding-bottom: 8px">
                    <input type="text" class="form-control input-sm" id="txtEmail" style="-moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;" />
                    <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Chưa nhập tên người dùng<div class="k-callout k-callout-n"></div>
                    </div>
                    <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Tên người dùng không phải địa chỉ e-mail<div class="k-callout k-callout-n"></div>
                    </div>
                </div>
            </div>

            <div class="row" style="margin-top: 5px">
                <div class="col-md-4">
                    <label for="cboVaiTro">Vai trò</label>
                </div>
                <div class="col-md-8" style="padding-bottom: 8px">
                    <input id="cboVaiTro" style="width: 100%" />
                    <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Chưa chọn vai trò<div class="k-callout k-callout-n"></div>
                    </div>
                </div>
            </div>

            <div class="row" style="margin-top: 5px">
                <div class="col-md-4">
                    <label for="cboPhongBan">Phòng ban</label>
                </div>
                <div class="col-md-8" style="padding-bottom: 8px">
                    <input id="cboPhongBan" style="width: 100%" />
                    <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Chưa chọn phòng ban<div class="k-callout k-callout-n"></div>
                    </div>
                </div>
            </div>

            <div class="row" style="margin-top: 15px; border-top: 1px solid #ddd">
                <div class="col-md-12 text-right" style="margin-top: 10px; margin-bottom: 5px">
                    <button type="button" id="btnLuuNguoiDung" class="k-button k-primary"><span class="k-icon k-update"></span>&nbsp;Cập nhật</button>
                    <button type="button" id="btnHuyNguoiDung" class="k-button"><span class="k-icon k-cancel"></span>&nbsp;Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div id="dlgNguoiDung_VaiTro_Sua">
        <div class="modal-body">
            <table class="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td style="width: 35%;">
                            <b>Tên người dùng (E-mail)</b>
                        </td>
                        <td>
                            <label id="lb_email_sua"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>
                                <label for="cboVaiTro_sua">Vai trò</label></b>
                        </td>
                        <td>
                            <input id="cboVaiTro_sua" style="width: 100%" />
                            <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Chưa chọn vai trò<div class="k-callout k-callout-n"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>
                                <label for="cboPhongBan_sua">Phòng ban</label></b>
                        </td>
                        <td>
                            <input id="cboPhongBan_sua" style="width: 100%" />
                            <div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" style="margin: 0.5em; display: none;"><span class="k-icon k-warning"></span>Chưa chọn phòng ban<div class="k-callout k-callout-n"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="modal-footer">
            <button type="button" id="btnSuaNguoiDung" class="k-button k-primary"><span class="k-icon k-update"></span>&nbsp;Cập nhật</button>
            <button type="button" id="btnHuySuaNguoiDung" class="k-button"><span class="k-icon k-cancel"></span>&nbsp;Cancel</button>
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-user"></span>
                Quản trị quyền người dùng
            </h3>
        </div>

        <div class="panel-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs">
                            <li role="presentation" class="active"><a href="#tabVaiTro" aria-controls="tabVaiTro" role="tab" data-toggle="tab" id="tab1" aria-expanded="true">Quản lý vai trò</a></li>
                            <li role="presentation"><a href="#tabNguoiDung" aria-controls="tabNguoiDung" role="tab" data-toggle="tab" id="tab2">Quản lý người dùng</a></li>
                        </ul>

                        <div class="tab-content" id="tabContent">
                            <div role="tabpanel" class="tab-pane active fade in" id="tabVaiTro" aria-labelledby="tab1" style="border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd">
                                <div id="gvVaiTro"></div>
                            </div>

                            <div role="tabpanel" class="tab-pane fade" id="tabNguoiDung" aria-labelledby="tab2" style="border-left: 1px solid #ddd; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd">
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <td>
                                            <div style="float: right; padding-right: 10px;">
                                                <label id="forCboSearchBy">Tìm tên người dùng :</label>
                                                <input type="text" id="txtSearchValue" class="form-control input-sm" style="position: relative; top: 2px; width: 200px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; display: inline-block;" />
                                                <a href="\\#" class="k-button k-button-icontext k-primary" id="btnSearch"><span class="fa fa-search"></span>&nbsp;Tìm</a>
                                                <a href="\\#" class="k-button k-button-icontext" id="btnClear"><span class="fa fa-times"></span>&nbsp;Xem tất cả</a>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <div id="gvNguoiDung"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
