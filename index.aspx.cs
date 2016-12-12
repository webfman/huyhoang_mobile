using System;

public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(Login.GetUsername()))
        {
            Response.Redirect("DangNhap.aspx");
        }
    }
}