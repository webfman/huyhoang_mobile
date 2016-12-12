using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

using UsefulTools;

public partial class DoiMatKhau : System.Web.UI.Page
{
    private static string conStr = ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Login.GetEmail() == null) {
            if (Request.Cookies["SessionId"] != null)
                DuyTriDangNhap.Do(Request.Cookies["SessionId"].Value);
            else
                Response.Redirect("DangNhap.aspx?p=" + Page.Request.Url.AbsolutePath.Substring(1));
        }

        hidEmail.Value = Login.GetEmail();
        hidRedirectPage.Value = Request.QueryString["p"] ?? "";
    }

    [WebMethod]
    public static bool CheckPassword(string Email, string Password)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("PQ_CheckPassword", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Email", SqlDbType.VarChar);
                    cmd.Parameters.Add("@Pass", SqlDbType.Char);
                    cmd.Parameters["@Email"].Value = Email;
                    cmd.Parameters["@Pass"].Value = Authentication.GetMD5(Password);
                    SqlParameter ret = cmd.Parameters.Add("@Return", SqlDbType.Int);
                    ret.Direction = ParameterDirection.ReturnValue;
                    con.Open();
                    cmd.ExecuteNonQuery();

                    if ((int)ret.Value == 1)
                        return true;
                    return false;
                }
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static bool ChangePassword(string Email, string Password)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("PQ_ChangePassword", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Email", SqlDbType.VarChar);
                    cmd.Parameters.Add("@NewPass", SqlDbType.Char);
                    cmd.Parameters["@Email"].Value = Email;
                    cmd.Parameters["@NewPass"].Value = Authentication.GetMD5(Password);
                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }

            Logger.WriteChangePass();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}