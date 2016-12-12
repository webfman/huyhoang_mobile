<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DangNhap.aspx.cs" Inherits="DangNhap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />

    <title>Đăng Nhập</title>

    <link href="assets/ico/favicon.ico" rel="icon" type="image/x-icon" />

    <link href="assets/css/font-awesome.min.css" rel="stylesheet" />
    <link href="assets_dn/css/reset.css" rel="stylesheet" />
    <link href="assets_dn/css/style.css" rel="stylesheet" />

    <script src="Scripts/kendo.2014.2.716/jquery.min.js"></script>

    <style type="text/css">
        .ddl {
            width: 100%;
            zoom: 150%;
            height: 40px;
        }
    </style>
</head>

<body>
    <input type="hidden" id="hidRedirectPage" value="" runat="server" />

    <div class="pen-title" style="padding: 10px 0;"></div>

    <div class="container" style="zoom: 85%;">
        <div class="card"></div>

        <div class="card">
            <img src="./assets_dn/img/banner_dangnhap.png" style="padding-left: 7px;" />

            <h2 class="title">Đăng nhập</h2>

            <form id="Form1" runat="server">
                <div class="input-container">
                    <input type="text" runat="server" id="txtUsername" required="required" maxlength="100" />
                    <label style="padding-bottom: 40px;">Tên đăng nhập</label>
                    <div class="bar"></div>
                </div>

                <div class="input-container">
                    <input type="password" id="txtPassword" required="required" runat="server" />
                    <label style="padding-bottom: 40px;">Mật khẩu</label>
                    <div class="bar"></div>
                </div>

                <div class="button-container">
                    <%--<div class="col-md-12 text-center" style="padding-bottom: 10px;">
                        <input type="checkbox" id="chkRemember" style="zoom: 135%;" runat="server" />
                        <label for="chkRemember" style="font-size: 20px;">&nbsp;Duy trì đăng nhập</label>
                    </div>--%>

                    <button type="submit" id="btnDangNhap" onserverclick="btnDangNhap_ServerClick" runat="server"><span>Đăng nhập</span></button>
                </div>

                <div class="footer" style="margin-top: 20px;">
                    <a href="#">Quên mật khẩu?</a>
                </div>
            </form>
        </div>

        <div class="card alt">
            <div class="toggle"></div>

            <h1 class="title">Quên mật khẩu     
                <div class="close"></div>
            </h1>

            <form>
                <div class="input-container">
                    <div style="color: #ffffff;">
                        <a style="font-size: 20px;">
                            <i class="fa fa-phone"></i>
                            Liên hệ Administrator:
                        </a>

                        <p style="padding: 10px 0 5px 0;">
                            Nguyễn Trung Nam - 0935.210.327
                        </p>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script>
        $('#txtUsername').focus();
    </script>

    <script src="assets_dn/js/index.js"></script>
</body>
</html>
