<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DoiMatKhau.aspx.cs" Inherits="DoiMatKhau" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />

    <title>Đổi Mật Khẩu</title>

    <link href="assets/ico/favicon.png" rel="icon" type="image/x-icon" />

    <link href="libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="libraries/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="Content/Kendo2014/kendo.common-bootstrap.min.css" rel="stylesheet" />
    <link href="Content/Kendo2014/kendo.bootstrap.min.css" rel="stylesheet" />

    <style type="text/css">
        body { background-color: #EAF0FF; }
        .AppNameLink:hover { text-decoration: none; }
   </style>

    <script src="Scripts/kendo.2014.2.716/jquery.min.js"></script>
    <script src="Scripts/kendo.2014.2.716/kendo.all.min.js"></script>
    <script src="Scripts/dmk.js"></script>
</head>
<body>
    <input type="hidden" runat="server" id="hidRedirectPage" />
    <span id="notification"></span>
    <div style="display: table; width: 100%; min-width: 1024px">
        <div style="border-bottom: 1px solid #aaa; background-color: #006db5; display: table-cell; vertical-align: middle; width: 100%; text-align: center;">
            <img src="Images/banner-left.png" style="float: left;" alt="Left banner" />
            <img src="Images/banner-right.png" style="float: right;" alt="Right banner" />
            <a href="index.aspx" class="AppNameLink"><span class="AppName" style="font-family: Arial, Helvetica, Tahoma, Verdana, sans-serif; font-size: 46px; font-weight: bold; text-shadow: 5px 5px 5px #444; color: #fff; line-height: 80px;">CHƯƠNG TRÌNH QUẢN LÝ HỢP ĐỒNG</span></a>
        </div>
    </div>
    <div style="display: table; width: 100%">
        <div style="display: table-cell; width: 100%; vertical-align: middle; height: 400px">
            <div style="width: 400px; padding: 15px; border-radius: 10px; background-color: #fff; margin: auto; border: 10px solid rgba(200, 200, 220, 0.5)">
                <div class="panel panel-info" style="margin-bottom:0">
                    <div class="panel-heading text-center"><b>Đổi Mật Khẩu</b></div>
                    <div class="panel-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <input type="hidden" runat="server" id="hidEmail" />
                                    <div class="form-group">
                                        <label class="control-label sr-only" for="txtOldPass">Mật khẩu cũ</label>
                                        <input type="password" id="txtOldPass" class="form-control" placeholder="Mật khẩu cũ" title="Mật khẩu cũ" />
                                        <span class="glyphicon glyphicon-ok form-control-feedback" style="display:none"></span>
                                        <span class="glyphicon glyphicon-remove form-control-feedback" style="display: none"></span>
                                        <span class="glyphicon glyphicon-warning-sign form-control-feedback" style="display: none"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="control-label sr-only" for="txtNewPass">Mật khẩu mới</label>
                                        <input type="password" id="txtNewPass" class="form-control" placeholder="Mật khẩu mới" title="Mật khẩu mới" />
                                        <span class="glyphicon glyphicon-ok form-control-feedback" style="display: none"></span>
                                        <span class="glyphicon glyphicon-remove form-control-feedback" style="display: none"></span>
                                        <span class="glyphicon glyphicon-warning-sign form-control-feedback" style="display: none"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="control-label sr-only" for="txtVerifyPass">Nhập lại mật khẩu mới</label>
                                        <input type="password" id="txtVerifyPass" class="form-control" placeholder="Nhập lại mật khẩu mới" title="Nhập lại mật khẩu mới" />
                                        <span class="glyphicon glyphicon-ok form-control-feedback" style="display: none"></span>
                                        <span class="glyphicon glyphicon-remove form-control-feedback" style="display: none"></span>
                                        <span class="glyphicon glyphicon-warning-sign form-control-feedback" style="display: none"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 text-center">
                                    <input type="button" id="btnDoiMK" class="btn btn-primary" value="Đổi mật khẩu" />
                                    <input type="button" id="btnCancel" class="btn btn-default" value="Hủy" />
                                </div>
                            </div>
                        </div>
                        <!-- /.container-fluid -->
                    </div>
                </div>
            </div>
        </div>
        <!-- /.text-center -->
    </div>
</body>
</html>
