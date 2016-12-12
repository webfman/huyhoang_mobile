<%@ Page Title="Xem Nhật Ký Sử Dụng Hệ Thống Của Người Dùng" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="XemNhatKy.aspx.cs" Inherits="XemNhatKy" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" Runat="Server">
    <link href="Content/Kendo2014/kendo.common-bootstrap.min.css" rel="stylesheet" />
    <link href="Content/Kendo2014/kendo.bootstrap.min.css" rel="stylesheet" />
    <link href="libraries/font-awesome-4.2.0/css/font-awesome.min.css" rel="stylesheet" />

    <style type="text/css">
        table[role=grid] th { text-align: center !important; font-weight: bold !important; }
    </style>

    <script src="Scripts/kendo.2014.2.716/kendo.all.min.js"></script>
    <script src="Scripts/kendo.2014.2.716/cultures/kendo.culture.vi-VN.min.js"></script>
    <script src="Scripts/userslog.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" Runat="Server">
    <span id="notification"></span>
    <div class="modal-backdrop in" style="height: 100%; display: none; z-index: 123456" id="backdrop">
        <div style="height: 100%; display: table; width: 100%">
            <div style="display: table-cell; vertical-align: middle; text-align: center">
                <img src="Images/loading4.gif" alt="Loading..." style="width: 100px" />
            </div>
        </div>
    </div>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">
                <span class="glyphicon glyphicon-calendar"></span>
                Xem nhật ký sử dụng hệ thống của người dùng
            </h3>
        </div>
        <div class="panel-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-1 text-right">
                        <label for="cboUser">Người dùng</label>
                    </div>
                    <div class="col-md-3">
                        <input id="cboUser" />
                        <label for="chkAll">
                            <input type="checkbox" id="chkAll" />Tất cả
                        </label>
                    </div>
                    <div class="col-md-1 text-right">
                        <label for="dpTuNgay">Từ ngày</label>
                    </div>
                    <div class="col-md-2">
                        <input id="dpTuNgay" style="width: 100%" />
                    </div>
                    <div class="col-md-1 text-right">
                        <label for="dpDenNgay">Đến ngày</label>
                    </div>
                    <div class="col-md-2">
                        <input id="dpDenNgay" style="width: 100%" />
                    </div>
                    <div class="col-md-2">
                        <input type="button" id="btnXem" value="Xem" class="btn btn-primary" />
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container -->
            <div class="container-fluid">
                <div class="row" style="margin-top: 15px">
                    <div class="col-md-12">
                        <div id="gvData"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
