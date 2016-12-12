using System;

public partial class AdminTemplate_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(Login.GetUsername()))
        {
            string pagePath = Request.Url.AbsolutePath.Replace("/", "%2f");

            Session.Clear();
            Response.Redirect("/DangNhap.aspx?p=" + pagePath);
        }
        else
        {
            if (!string.IsNullOrWhiteSpace(Login.GetHoTen()))
                spanName.InnerText = Login.GetHoTen();
            else
                spanName.InnerText = "Bạn";

            imgUser.ImageUrl = Login.GetHinh();
        }
    }
}
