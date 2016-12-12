using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;

/// <summary>
/// Write log for user action.
/// </summary>
public class Logger
{
    private static string conStr = ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString;

    /// <summary>
    /// Ghi log khi người dùng đăng nhập hệ thống
    /// </summary>
    public static void WriteLogin()
    {
        Write("Đăng nhập");
    }

    /// <summary>
    /// Ghi log khi người dùng đổi mật khẩu
    /// </summary>
    public static void WriteChangePass()
    {
        Write("Đổi mật khẩu");
    }

    /// <summary>
    /// Ghi log về một hoạt động bất kỳ của người dùng
    /// </summary>
    /// <param name="NoiDung"></param>
    public static void Write(string NoiDung)
    {
        string email = Login.GetUsername();

        if (email != null)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    using (SqlCommand cmd = new SqlCommand("WriteLog", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Email", email);
                        cmd.Parameters.AddWithValue("@NoiDung", NoiDung);
                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (SqlException)
            {
            } 
        }
    }
}