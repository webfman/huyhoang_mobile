<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ThongTinCaNhan.aspx.cs" Inherits="ThongTinCaNhan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="Server">

    <!-- start: CSS -->
    
       
    <link href="Content/Kendo2014/kendo.common-bootstrap.min.css" rel="stylesheet" />    
    <link href="Content/Kendo2014/kendo.silver.min.css" rel="stylesheet" />

    <script src="assets/js/Utilitiles.js"></script>
    <%--<script src="Scripts/loading.js"></script>--%>
    <script src="Scripts/kendo.2014.2.716/kendo.all.min.js"></script>
    <script src="Scripts/kendo.2014.2.716/jszip.min.js"></script>

    <script src="assets/js/pages/ThongTinCaNhan.js"></script>
    
    <style>
        .row label
        {
            padding:8px!important;
        }
        .k-upload-empty {
            border-width: 1px !important;            
            background-color: #f6f6f6 !important;            
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="Server">

    <div class="container">
        <h1 class="page-header">Thay đổi thông tin</h1>
        <div class="row">
            
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="text-center">
                                                           
                    <asp:Image ID="imgUser" class="avatar img-circle img-thumbnail" alt="avatar" runat="server" />
                    
                    <h6>Upload ảnh đại diện khác...</h6>
                    <%--<input type="file" class="text-center center-block well well-sm">--%>
                    <input name="fileUpload" id="files_upload" type="file" />
                </div>
            </div>

            <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
                <h2 style="text-decoration: underline;">Thông tin cá nhân</h2>
                <div class="panel-body">
                    <div class="container-fluid">
                        <div class="row">                                                            
                            <label class="col-lg-2 control-label">Họ:</label>
                            <div class="col-lg-5">
                                
                                <%--<input id="txt_ho" class="form-control" runat="server" type="text">--%>
                                
                                <asp:TextBox ID="txt_ho" class="form-control" runat="server"></asp:TextBox>
                            </div>
                            
                        </div>
                        <div class="row" style="margin-top:10px;">                            
                            <label class="col-lg-2 control-label">Tên:</label>
                            <div class="col-lg-5">
                                <%--<input id="txt_ten" class="form-control" runat="server" type="text">--%>
                                
                                <asp:TextBox ID="txt_ten" class="form-control" runat="server"></asp:TextBox>
                            </div>
                            
                        </div>
                        <div class="row" style="margin-top:10px;">                            
                            <label class="col-lg-2 control-label">Mã nhân viên:</label>
                            <div class="col-lg-5">
                                                               
                                <asp:TextBox ID="txt_msnv" class="form-control" runat="server"></asp:TextBox>
                            </div>
                            
                        </div>
                        <div class="row" style="margin-top:10px;">                            
                            <label class="col-lg-2 control-label">Số điện thoại:</label>
                            <div class="col-lg-5">
                                                               
                                <asp:TextBox ID="txt_sdt" class="form-control" runat="server" onkeypress="return isNumber(event)"></asp:TextBox>
                            </div>
                            
                        </div>
                        <div class="row" style="margin-top:10px;">
                            <div class="modal-footer">
                                <label class="col-md-3 control-label"></label>
                                <div class="col-md-8">
                                    <a class="btn btn-info" onclick="Ham_Luu();"><i class="fa fa-save"></i>
                                       Lưu
                                    </a>                                                   
                                </div>
                            </div>                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

<input type="hidden" runat="server" id="hidEmail" />

</asp:Content>

