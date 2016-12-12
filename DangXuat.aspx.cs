using System;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using DatabaseHelper;

public partial class DangXuat : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string redirectPage = Request.QueryString["p"];
        Session.Clear();

        if (Request.Cookies["SessionId"] != null)
        {
            Response.Cookies["SessionId"].Expires = DateTime.Now.AddDays(-1);

            try
            {
                SqlServerHelper ssh = new SqlServerHelper(ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString, "PQ_XoaDuyTriDangNhap", 1);
                ssh.DefineParameter("@SessionId", System.Data.SqlDbType.Int, ParameterDirection.Input, int.Parse(Request.Cookies["SessionId"].Value));
                ssh.ExecuteNonQuery();
                ssh.Dispose();
            }
            catch (Exception)
            {
            }
        }

        if (redirectPage != null)
            Response.Redirect("DangNhap.aspx?p=" + redirectPage);
        else
            Response.Redirect("DangNhap.aspx");
    }
}