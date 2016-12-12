using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Services;
using System.Web.UI;

using DatabaseHelper;

public partial class PhanQuyen : System.Web.UI.Page
{
    private static string conStr = ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString;

    private static List<VaiTro> getDSVaiTro()
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "GetDSVaiTro", 0);
            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<VaiTro> l = new List<VaiTro>();

            foreach (DataRow dr in dt.Rows)
            {
                VaiTro vt = new VaiTro();
                vt.Id = (short)dr["MaVaiTro"];
                vt.Ten = (string)dr["TenVaiTro"];
                vt.TenDayDu = (string)dr["TenVaiTroDayDu"];

                if (dr["LaNhaThau"] is DBNull)
                    vt.LaNhaThau = null;
                else
                    vt.LaNhaThau = (bool)dr["LaNhaThau"];

                if (dr["MaDonVi"] is DBNull)
                    vt.DonViId = null;
                else
                    vt.DonViId = (int)dr["MaDonVi"];

                vt.TenDonVi = dr["TenDonVi"] is DBNull ? null : (string)dr["TenDonVi"];
                l.Add(vt);
            }

            return l;
        }
        catch (Exception)
        {
            throw;
        }
    }

    private static List<PhongBan> getDSPhongBan()
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "SPS_DM_Donvi", 1);
            ssh.DefineParameter("@nhom", SqlDbType.VarChar, 10, ParameterDirection.Input, "A");

            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<PhongBan> l = new List<PhongBan>();

            foreach (DataRow dr in dt.Rows)
            {
                PhongBan vt = new PhongBan();
                vt.MaDonVi = dr["ma_donvi"] is DBNull ? null : (string)dr["ma_donvi"];
                vt.TenDonVi = dr["ten_donvi"] is DBNull ? null : (string)dr["ten_donvi"];
                l.Add(vt);
            }

            return l;
        }
        catch (Exception)
        {
            throw;
        }
    }

    private static List<NguoiDung> getDMNguoiDung()
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "GetDMNguoiDung", 0);
            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<NguoiDung> l = new List<NguoiDung>();
            return NguoiDung.CreateList(dt);
        }
        catch (Exception)
        {
            throw;
        }
    }
    private static List<NguoiDung> getDMNguoiDungFilter(string TenNguoiDung)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "GetDMNguoiDung;2", 1);
            ssh.DefineParameter("@TenNguoiDung", SqlDbType.VarChar, 100, ParameterDirection.Input, TenNguoiDung);
            

            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<NguoiDung> l = new List<NguoiDung>();
            return NguoiDung.CreateList(dt);
        }
        catch (Exception)
        {
            throw;
        }
    }
    

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!string.IsNullOrEmpty(Login.GetUsername()))
        {
            if (!Login.CoQuyen("QuanTriNguoiDung"))
            {
                string str = "alert('Account đang đăng nhập chưa được cấp quyền sử dụng chức năng này');";
                str += "window.location='/index.aspx';";
                ClientScript.RegisterClientScriptBlock(GetType(), "unauthorize", str, true);
            }
        }
    }

    [WebMethod]
    public static VaiTroPaging GetDSVaiTro(int skip, int take)
    {
        try
        {
            List<VaiTro> l = getDSVaiTro();
            var temp = l.Skip(skip).Take(take);

            return new VaiTroPaging(new List<VaiTro>(temp), l.Count);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static VaiTro ThemVaiTro(VaiTro VT)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "ThemVaiTro", 5);
            ssh.DefineParameter("@Ten", SqlDbType.VarChar, 50, ParameterDirection.Input, VT.Ten);
            ssh.DefineParameter("@TenDayDu", SqlDbType.NVarChar, 250, ParameterDirection.Input, VT.TenDayDu);
            ssh.DefineParameter("@LaNhaThau", SqlDbType.Bit, ParameterDirection.Input, VT.LaNhaThau);
            ssh.DefineParameter("@MaDonVi", SqlDbType.Int, ParameterDirection.Input, VT.DonViId);
            ssh.DefineParameter("@Id", SqlDbType.SmallInt, ParameterDirection.Output, null);
            ssh.ExecuteNonQuery();
            VT.Id = (short)ssh.GetParameterValue("@Id");
            ssh.Dispose();
            return VT;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static List<int> GetPageNumberCuaVaiTroMoi(int VaiTroID, int PageSize)
    {
        try
        {
            List<VaiTro> l = getDSVaiTro();
            int p = 0, r;
            bool stop = false;
            IEnumerable<VaiTro> iVT;

            do
            {
                iVT = l.Skip(PageSize * p).Take(PageSize);
                r = 0;

                foreach (VaiTro vt in iVT)
                {
                    r++;

                    if (vt.Id == VaiTroID)
                    {
                        stop = true;
                        break;
                    }
                }

                p++;
            } while (!stop);

            return new List<int>() { p, r };
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static VaiTro SuaVaiTro(VaiTro VT)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "SuaVaiTro", 5);
            ssh.DefineParameter("@Id", SqlDbType.SmallInt, ParameterDirection.Input, VT.Id);
            ssh.DefineParameter("@Ten", SqlDbType.VarChar, 50, ParameterDirection.Input, VT.Ten);
            ssh.DefineParameter("@TenDayDu", SqlDbType.NVarChar, 250, ParameterDirection.Input, VT.TenDayDu);
            ssh.DefineParameter("@LaNhaThau", SqlDbType.Bit, ParameterDirection.Input, VT.LaNhaThau);
            ssh.DefineParameter("@MaDonVi", SqlDbType.Int, ParameterDirection.Input, VT.DonViId);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
            return VT;
        }
        catch (Exception)
        {
            throw;
        }
    }

    

    [WebMethod]
    public static List<Quyen> GetDSQuyenCuaVaiTro(int VaiTroId)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "GetQuyenCuaVaiTro", 1);
            ssh.DefineParameter("@VaiTroId", SqlDbType.Int, ParameterDirection.Input, VaiTroId);
            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<Quyen> l = new List<Quyen>();

            foreach (DataRow dr in dt.Rows)
            {
                Quyen q = new Quyen();
                q.Id = (int)dr["MaQuyen"];
                q.ChuThich = (string)dr["TenQuyenDayDu"];
                l.Add(q);
            }

            return l;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static List<Quyen> GetQuyenChuaCapChoVaiTro(int VaiTroId)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "GetQuyenChuaCapChoVaiTro", 1);
            ssh.DefineParameter("@VaiTroId", SqlDbType.Int, ParameterDirection.Input, VaiTroId);
            DataTable dt = ssh.ExecuteDataTable();
            ssh.Dispose();
            List<Quyen> l = new List<Quyen>();

            foreach (DataRow dr in dt.Rows)
            {
                Quyen q = new Quyen();
                q.Id = (int)dr["MaQuyen"];
                q.ChuThich = (string)dr["TenQuyenDayDu"];
                l.Add(q);
            }

            return l;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void ThemQuyenChoVaiTro(int VaiTroId, List<int> DSQuyenId)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("ThemQuyenChoVaiTro", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@VaiTroId", VaiTroId);
                    SqlParameter p = cmd.Parameters.Add("@QuyenId", SqlDbType.Int);
                    con.Open();
                    SqlTransaction trans = con.BeginTransaction();
                    cmd.Transaction = trans;

                    try
                    {
                        foreach (int id in DSQuyenId)
                        {
                            p.Value = id;
                            cmd.ExecuteNonQuery();
                        }

                        trans.Commit();
                    }
                    catch (Exception)
                    {
                        try
                        {
                            trans.Rollback();
                        }
                        catch (Exception)
                        {
                            throw;
                        }

                        throw;
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
    public static void XoaQuyenCuaVaiTro(int VaiTroId, List<int> DSQuyenId)
    {
        try
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("XoaQuyenCuaVaiTro", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@VaiTroId", VaiTroId);
                    SqlParameter p = cmd.Parameters.Add("@QuyenId", SqlDbType.Int);
                    con.Open();
                    SqlTransaction trans = con.BeginTransaction();
                    cmd.Transaction = trans;

                    try
                    {
                        foreach (int id in DSQuyenId)
                        {
                            p.Value = id;
                            cmd.ExecuteNonQuery();
                        }

                        trans.Commit();
                    }
                    catch (Exception)
                    {
                        try
                        {
                            trans.Rollback();
                        }
                        catch (Exception)
                        {
                            throw;
                        }

                        throw;
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
    public static NguoiDungPaging GetDMNguoiDung(int skip, int take)
    {
        try
        {
            List<NguoiDung> l = getDMNguoiDung();
            var temp = l.Skip(skip).Take(take);

            return new NguoiDungPaging(new List<NguoiDung>(temp), l.Count);
        }
        catch (Exception)
        {
            throw;
        }
    }
    [WebMethod]
    public static NguoiDungPaging GetDMNguoiDungFilter(int skip, int take, string TenNguoiDung)
    {
        try
        {
            List<NguoiDung> l = getDMNguoiDungFilter(TenNguoiDung);
            var temp = l.Skip(skip).Take(take);

            return new NguoiDungPaging(new List<NguoiDung>(temp), l.Count);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static bool ThemNguoiDung(string Email, int VaiTroId,string PhongBanId,string PhongBanTen)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "ThemNguoiDung", 5);
            ssh.DefineParameter("@Email", SqlDbType.VarChar, 100, ParameterDirection.Input, Email);
            ssh.DefineParameter("@VaiTroId", SqlDbType.Int, ParameterDirection.Input, VaiTroId);
            ssh.DefineParameter("@PhongBan_ID", SqlDbType.VarChar,100, ParameterDirection.Input, PhongBanId);
            ssh.DefineParameter("@PhongBan_Ten", SqlDbType.NVarChar,-1, ParameterDirection.Input, PhongBanTen);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Output, null);
            ssh.ExecuteNonQuery();
            bool insertOK;
            // Id = -1 when email existed
            if ((int)ssh.GetParameterValue("@Id") == -1)
                insertOK = false;
            else
                insertOK = true;
            ssh.Dispose();

            //////////////////////Cập nhật Vật tư online

            int v_Right;
            switch (VaiTroId)
            {
                case 15:
                    v_Right = 2;
                    break;
                case 16:
                    v_Right = 1;
                    break;
                case 17:
                    v_Right = 3;
                    break;
                default:
                    v_Right = 0;
                    break;
            }

            

            SqlServerHelper ssh_vt = new SqlServerHelper(conStr, "SPU_Ws;3", 7);
            ssh_vt.DefineParameter("@Loai_capnhat", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@UserName", SqlDbType.VarChar, 50, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@FullName", SqlDbType.VarChar, 200, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@DepartmentID", SqlDbType.VarChar, 20, ParameterDirection.Input, PhongBanId);
            ssh_vt.DefineParameter("@Right", SqlDbType.VarChar, 20, ParameterDirection.Input, v_Right);
            ssh_vt.DefineParameter("@active", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@Nguoi_CN", SqlDbType.VarChar, 20, ParameterDirection.Input, Login.GetEmail().Split('@')[0].ToString());
            ssh_vt.ExecuteNonQuery();
            ssh_vt.Dispose();



            return insertOK;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static bool SuaNguoiDung(string Email, int VaiTroId, string PhongBanId, string PhongBanTen)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "ThemNguoiDung;2", 4);
            ssh.DefineParameter("@Email", SqlDbType.VarChar, 100, ParameterDirection.Input, Email);
            ssh.DefineParameter("@VaiTroId", SqlDbType.Int, ParameterDirection.Input, VaiTroId);
            ssh.DefineParameter("@PhongBan_ID", SqlDbType.VarChar, 100, ParameterDirection.Input, PhongBanId);
            ssh.DefineParameter("@PhongBan_Ten", SqlDbType.NVarChar, -1, ParameterDirection.Input, PhongBanTen);
            
            ssh.ExecuteNonQuery();
        
            ssh.Dispose();

            //////////////////////Cập nhật Vật tư online

            int v_Right;
            switch (VaiTroId)
            {
                case 15:
                    v_Right = 2;
                    break;
                case 16:
                    v_Right = 1;
                    break;
                case 17:
                    v_Right = 3;
                    break;
                default:
                    v_Right = 0;
                    break;
            }


            SqlServerHelper ssh_vt = new SqlServerHelper(conStr, "SPU_Ws;3", 7);
            ssh_vt.DefineParameter("@Loai_capnhat", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@UserName", SqlDbType.VarChar, 50, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@FullName", SqlDbType.VarChar, 200, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@DepartmentID", SqlDbType.VarChar, 20, ParameterDirection.Input, PhongBanId);
            ssh_vt.DefineParameter("@Right", SqlDbType.VarChar, 20, ParameterDirection.Input, v_Right);
            ssh_vt.DefineParameter("@active", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@Nguoi_CN", SqlDbType.VarChar, 20, ParameterDirection.Input, Login.GetEmail().Split('@')[0].ToString()); ssh_vt.ExecuteNonQuery();
            ssh_vt.Dispose();

       

            return true;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static bool XoaLuonNguoiDung(string Email)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "ThemNguoiDung;3", 1);
            ssh.DefineParameter("@Email", SqlDbType.VarChar, 100, ParameterDirection.Input, Email);
            
            ssh.ExecuteNonQuery();

            ssh.Dispose();

            //////////////////////Cập nhật Vật tư online           


            SqlServerHelper ssh_vt = new SqlServerHelper(conStr, "SPU_Ws;3", 7);
            ssh_vt.DefineParameter("@Loai_capnhat", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@UserName", SqlDbType.VarChar, 50, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@FullName", SqlDbType.VarChar, 200, ParameterDirection.Input, Email.Split('@')[0].ToString());
            ssh_vt.DefineParameter("@DepartmentID", SqlDbType.VarChar, 20, ParameterDirection.Input, -1);
            ssh_vt.DefineParameter("@Right", SqlDbType.VarChar, 20, ParameterDirection.Input, "");
            ssh_vt.DefineParameter("@active", SqlDbType.Int, ParameterDirection.Input, 1);
            ssh_vt.DefineParameter("@Nguoi_CN", SqlDbType.VarChar, 20, ParameterDirection.Input, Login.GetEmail().Split('@')[0].ToString());
            ssh_vt.ExecuteNonQuery();
            ssh_vt.Dispose();



            return true;
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static List<int> GetPageNumberCuaNguoiDungMoi(string Email, int PageSize)
    {
        try
        {
            List<NguoiDung> l = getDMNguoiDung();
            int p = 0, r;
            bool stop = false;
            IEnumerable<NguoiDung> iND;

            do
            {
                iND = l.Skip(PageSize * p).Take(PageSize);
                r = 0;

                foreach (NguoiDung nd in iND)
                {
                    r++;

                    if (nd.Email == Email)
                    {
                        stop = true;
                        break;
                    }
                }

                p++;
            } while (!stop);

            return new List<int>() { p, r };
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void KichHoatNguoiDung(int NguoiDungId, bool IsKichHoat)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "KichHoatNguoiDung", 2);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Input, NguoiDungId);
            ssh.DefineParameter("@IsKichHoat", SqlDbType.Bit, ParameterDirection.Input, IsKichHoat);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void KhoaNguoiDung(int NguoiDungId, bool IsKhoa)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "KhoaNguoiDung", 2);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Input, NguoiDungId);
            ssh.DefineParameter("@IsKhoa", SqlDbType.Bit, ParameterDirection.Input, IsKhoa);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void XoaNguoiDung(int NguoiDungId, bool IsXoa)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "XoaNguoiDung", 2);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Input, NguoiDungId);
            ssh.DefineParameter("@IsXoa", SqlDbType.Bit, ParameterDirection.Input, IsXoa);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void ResetMatKhau(int NguoiDungId)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "ResetMatKhau", 1);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Input, NguoiDungId);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static void DoiVaiTro(int NguoiDungId, int VaiTroId)
    {
        try
        {
            SqlServerHelper ssh = new SqlServerHelper(conStr, "DoiVaiTro", 2);
            ssh.DefineParameter("@Id", SqlDbType.Int, ParameterDirection.Input, NguoiDungId);
            ssh.DefineParameter("@VaiTroId", SqlDbType.Int, ParameterDirection.Input, VaiTroId);
            ssh.ExecuteNonQuery();
            ssh.Dispose();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static List<VaiTro> GetDSVaiTroChoNguoiDung()
    {
        try
        {
            return getDSVaiTro();
        }
        catch (Exception)
        {
            throw;
        }
    }

    [WebMethod]
    public static List<PhongBan> GetDSPhongBanChoNguoiDung()
    {
        try
        {
            return getDSPhongBan();
        }
        catch (Exception)
        {
            throw;
        }
    }
}

public class PhongBan
{
    private string ma_donvi;
    private string tenDonVi;
    

    public string MaDonVi
    {
        get { return ma_donvi; }
        set { ma_donvi = value; }
    }
    

    public string TenDonVi
    {
        get { return tenDonVi; }
        set { tenDonVi = value; }
    }  

    public PhongBan()
    {
    }
}