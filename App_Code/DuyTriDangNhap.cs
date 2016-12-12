using System;
using System.Configuration;
using System.Data;

using DatabaseHelper;

/// <summary>
/// Summary description for DuyTriDangNhap
/// </summary>
public class DuyTriDangNhap
{
	public static void Do(string SessionId)
	{
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString, "PQ_GetDuyTriDangNhap", 1);
            ssh.DefineParameter("@SessionId", SqlDbType.Int, ParameterDirection.Input, int.Parse(SessionId));
            DataTable dt = ssh.ExecuteDataTable();
            ssh.CommandText = "PQ_DangNhap";
            ssh.ParameterCount = 2;
            ssh.ClearParameters();
            ssh.DefineParameter("@Email", SqlDbType.VarChar, 100, ParameterDirection.Input, (string)dt.Rows[0]["TenNguoiDung"]);
            ssh.DefineParameter("@Password", SqlDbType.Char, 32, ParameterDirection.Input, (string)dt.Rows[0]["MatKhau"]);
            dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            DataRow dr = dt.Rows[0];

            if (!(dr["TenNguoiDung"] is DBNull))
                if ((string)dr["TenNguoiDung"] != "Locked" && (string)dr["TenNguoiDung"] != "Not Locked" && ((bool)dr["KichHoat"]) && !(bool)dr["DaXoa"] && !(bool)dr["Khoa"])
                    Login.CreateLoginData(dr);
        }
        catch (Exception)
        {
        }
    }
}