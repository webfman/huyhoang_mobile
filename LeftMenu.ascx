<%@ Control Language="C#" AutoEventWireup="true" CodeFile="LeftMenu.ascx.cs" Inherits="LeftMenu" %>

<div id="sidebar-left" class="col-lg-2 col-sm-1">
    <div class="sidebar-nav nav-collapse collapse navbar-collapse">
        <ul class="nav main-menu">
            <li><a href="/index.aspx"><i class="fa fa-home"></i><span class="hidden-sm text">Trang chủ</span></a></li>
            <li>
                <a class="dropmenu" href="#"><i class="fa fa-cog"></i><span class="hidden-sm text">Quản trị</span><span class="chevron closed"></span></a>
                <ul>
                    <li><a href="#" runat="server" id="mnuPhanQuyen" onserverclick="mnuPhanQuyen_ServerClick"><i class="fa fa-user"></i><span class="hidden-sm text">Phân quyền</span></a></li>
                    <%--<li><a href="#" runat="server" id="mnuXemNhatKy" onserverclick="mnuXemNhatKy_ServerClick"><i class="fa fa-calendar"></i><span class="hidden-sm text">Xem nhật ký người dùng</span></a></li>--%>
                </ul>
            </li>
        </ul>
    </div>

    <a href="#" id="main-menu-min" class="full visible-md visible-lg"><i class="fa fa-angle-double-left"></i></a>
</div>
