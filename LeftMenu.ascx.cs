using System;
using System.Linq;
using System.Web.UI;

public partial class LeftMenu : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!string.IsNullOrEmpty(Login.GetUsername()) && !IsPostBack)
        {
            mnuPhanQuyen.Visible = Login.CoQuyen("QuanTriNguoiDung");
        }
    }

    protected void mnuPhanQuyen_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("PhanQuyen.aspx");
    }
}