using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web;

using UsefulTools;

/// <summary>
/// Tạo và lưu giữ thông tin đăng nhập
/// </summary>
public class Login
{
    public static void CreateLoginData(DataRow UserInfo)
    {
        string username = Convert.ToString(UserInfo["Username"]);

        HttpContext.Current.Session["Username"] = username;
        HttpContext.Current.Session["HoTen"] = (string)UserInfo["HoTen"];
        HttpContext.Current.Session["SoDienThoai"] = UserInfo["SoDienThoai"] is DBNull ? "" : (string)UserInfo["SoDienThoai"];
        HttpContext.Current.Session["Hinh"] = UserInfo["Hinh"] is DBNull ? "assets/img/user-icon.png" : (string)UserInfo["Hinh"];

        // Liệt kê danh sách quyền của người dùng
        using (SqlConnection con = new SqlConnection(ConnectionString.WebFMan_HuyHoang))
        using (SqlCommand cmd = new SqlCommand("webfman_hh.PQ_LKeQuyenCuaNguoiDung", con))
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Username", username);

            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
            {
                DataTable dt = new DataTable();
                List<string> dsQuyen = new List<string>();

                da.Fill(dt);

                foreach (DataRow dr in dt.Rows)
                {
                    dsQuyen.Add(Convert.ToString(dr["MaHeThong"]));
                }

                HttpContext.Current.Session["DanhSachQuyen"] = dsQuyen;
            }
        }
    }

    public static string GetUsername()
    {
        return (string)HttpContext.Current.Session["Username"];
    }

    public static string GetHoTen()
    {
        return (string)HttpContext.Current.Session["HoTen"];
    }

    public static string GetSoDienThoai()
    {
        return (string)HttpContext.Current.Session["SoDienThoai"];
    }

    public static string GetHinh()
    {
        return (string)HttpContext.Current.Session["Hinh"];
    }

    public static bool CoQuyen(string MaQuyen)
    {
        return ((List<string>)HttpContext.Current.Session["DanhSachQuyen"]).Contains(MaQuyen);
    }
}