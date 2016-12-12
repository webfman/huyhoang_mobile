using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Web;

using DatabaseHelper;
using UsefulTools;

public partial class DangNhap : System.Web.UI.Page
{
    private string generateToken(int Length)
    {
        string token = string.Empty;
        Random rand = new Random();
        List<byte> b = new List<byte>();

        for (byte i = 48; i <= 57; i++)
            b.Add(i);

        for (byte i = 65; i <= 90; i++)
            b.Add(i);

        for (byte i = 97; i <= 122; i++)
            b.Add(i);

        for (int i = 0; i < Length; i++)
            token += Convert.ToChar(b[rand.Next(b.Count)]);

        return token;
    }
    
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string redirectPage = Request.QueryString["p"];

            if (!string.IsNullOrEmpty(Login.GetUsername()))
            {
                if (!string.IsNullOrEmpty(redirectPage))
                    Response.Redirect(redirectPage);
                else
                    Response.Redirect("index.aspx");
            }
            else
            {               
                hidRedirectPage.Value = string.IsNullOrEmpty(redirectPage) ? string.Empty : redirectPage;
            }
        }
    }

    protected void btnDangNhap_ServerClick(object sender, EventArgs e)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(ConnectionString.WebFMan_HuyHoang, "PQ_DangNhap", 2);
            ssh.DefineParameter("@Username", SqlDbType.VarChar, 100, ParameterDirection.Input, txtUsername.Value.Trim());
            ssh.DefineParameter("@Password", SqlDbType.Char, 32, ParameterDirection.Input, Authentication.GetMD5(txtPassword.Value));
            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            string username = Convert.ToString(dt.Rows[0]["Username"]);

            switch (username)
            {
                case "Locked":
                    ClientScript.RegisterStartupScript(
                        GetType(),
                        "5Times",
                        "alert('Tài khoản đã bị khóa, vui lòng liên hệ nhân viên quản trị để mở khóa');",
                        true
                    );
                    break;
                case "Not Locked":
                case "Deleted":
                    ClientScript.RegisterStartupScript(
                        GetType(),
                        "LoginFailed",
                        "alert('Username hoặc mật khẩu không chính xác, vui lòng đăng nhập lại');",
                        true
                    );
                    break;
                case "Inactive":
                    ClientScript.RegisterStartupScript(
                        GetType(),
                        "Inactive",
                        "alert('Tài khoản này chưa được kích hoạt, vui lòng liên hệ nhân viên quản trị');",
                        true
                    );
                    break;
                default:
                    Login.CreateLoginData(dt.Rows[0]);
                    Logger.WriteLogin();

                    //if (chkRemember.Checked)
                    //{
                    //    ssh = new SqlServerHelper(ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString, "PQ_TaoDuyTriDangNhap", 2);
                    //    ssh.DefineParameter("@Email", SqlDbType.VarChar, 100, ParameterDirection.Input, txtUsername.Value.Trim());
                    //    ssh.DefineParameter("@SessionId", SqlDbType.Int, ParameterDirection.Output, null);
                    //    ssh.ExecuteNonQuery();
                    //    int sessionId = (int)ssh.GetParameterValue("@SessionId");
                    //    ssh.Dispose();
                    //    Response.Cookies.Add(new HttpCookie("SessionId", sessionId.ToString()));
                    //    Response.Cookies["SessionId"].Expires = DateTime.Now.AddDays(30);
                    //}

                    if (!string.IsNullOrEmpty(hidRedirectPage.Value))
                        Response.Redirect(hidRedirectPage.Value);
                    else
                        Response.Redirect("index.aspx");

                    break;
            }
        }
        catch
        {
            ClientScript.RegisterStartupScript(GetType(), "Error", "alert('Không đăng nhập được, vui lòng thử lại hoặc liên hệ nhân viên quản trị');", true);
        }
    }
}