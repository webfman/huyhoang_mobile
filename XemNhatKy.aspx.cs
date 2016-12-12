using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

using UsefulTools;

public partial class XemNhatKy : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Login.GetEmail() == null)
        {
            if (Request.Cookies["SessionId"] != null)
                DuyTriDangNhap.Do(Request.Cookies["SessionId"].Value);
            else
                Response.Redirect("DangNhap.aspx?p=" + Page.Request.Url.AbsolutePath.Substring(1));
        }

        if (!Login.GetDanhSachQuyen().Contains("XemNhatKy"))
        {
            Response.Clear();
            Response.Write("<html><body><script>alert('Bạn không có quyền truy cập chức năng này');window.location.replace('index.aspx');</script></body></html>");
            Response.End();
        }
    }

    [WebMethod]
    public static List<string> GetDSNguoiDung()
    {
        try
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetDSNguoiDung", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        List<string> l = new List<string>();

                        foreach (DataRow dr in dt.Rows)
                            l.Add((string)dr[0]);

                        return l;
                    }
                }
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static JsonLogPaging GetLog(string Email, DateTime TuNgay, DateTime DenNgay, int skip, int take)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetLog", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@From", TuNgay);
                    cmd.Parameters.AddWithValue("@To", DenNgay);

                    if (Email != "")
                        cmd.Parameters.AddWithValue("@Email", Email);
                    else
                        cmd.Parameters.AddWithValue("@Email", DBNull.Value);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        List<JsonLog> l = new List<JsonLog>();

                        foreach (DataRow dr in dt.Rows)
                            l.Add(new JsonLog((string)dr["TenNguoiDung"], DateTimeTools.ToVietnameseFormat((DateTime)dr["ThoiDiem"]), (string)dr["NoiDung"]));

                        var temp = l.Skip(skip).Take(take);

                        return new JsonLogPaging(new List<JsonLog>(temp), l.Count);
                    }
                }
            }
        }
        catch (Exception)
        {
            throw;
        }
    }
}