using System;
using System.Collections.Generic;
using System.Data;

/// <summary>
/// Summary description for NguoiDung
/// </summary>
public class NguoiDung
{
    private int id, vaiTroId, exitsUserInSys;
    private string email, tenVaiTro, chuThichVaiTro,maPhongBan,tenPhongBan;
    private bool isKichHoat, isXoa, isKhoa;

    public int Id
    {
        get { return id; }
        set { id = value; }
    }

    public int VaiTroId
    {
        get { return vaiTroId; }
        set { vaiTroId = value; }
    }
    public int ExitsUserInSys
    {
        get { return exitsUserInSys; }
        set { exitsUserInSys = value; }
    }
    

    public string Email
    {
        get { return email; }
        set { email = value; }
    }

    public string TenVaiTro
    {
        get { return tenVaiTro; }
        set { tenVaiTro = value; }
    }

    public string ChuThichVaiTro
    {
        get { return chuThichVaiTro; }
        set { chuThichVaiTro = value; }
    }

    public bool IsKichHoat
    {
        get { return isKichHoat; }
        set { isKichHoat = value; }
    }

    public bool IsXoa
    {
        get { return isXoa; }
        set { isXoa = value; }
    }

    public bool IsKhoa
    {
        get { return isKhoa; }
        set { isKhoa = value; }
    }

    public string MaPhongBan
    {
        get { return maPhongBan; }
        set { maPhongBan = value; }
    }
    public string TenPhongBan
    {
        get { return tenPhongBan; }
        set { tenPhongBan = value; }
    }
    
	public NguoiDung()
	{

	}

    public static List<NguoiDung> CreateList(DataTable Table)
    {
        List<string> colNameList = new List<string>();
        List<NguoiDung> l = new List<NguoiDung>();

        for (int i = 0; i < Table.Columns.Count; i++)
            colNameList.Add(Table.Columns[i].ColumnName);

        foreach (DataRow dr in Table.Rows)
        {
            NguoiDung nd = new NguoiDung();

            if (colNameList.Contains("MaNguoiDung"))
                nd.Id = (int)dr["MaNguoiDung"];


            if (colNameList.Contains("MaVaiTro"))
                nd.VaiTroId = (short)dr["MaVaiTro"];

            if (colNameList.Contains("TenNguoiDung"))
                nd.Email = (string)dr["TenNguoiDung"];

            if (colNameList.Contains("TenVaiTro"))
                nd.TenVaiTro = (string)dr["TenVaiTro"];

            if (colNameList.Contains("TenVaiTroDayDu"))
                nd.ChuThichVaiTro = (string)dr["TenVaiTroDayDu"];

            if (colNameList.Contains("DaXoa"))
                nd.IsXoa = (bool)dr["DaXoa"];

            if (colNameList.Contains("Khoa"))
                nd.IsKhoa = (bool)dr["Khoa"];

            if (colNameList.Contains("KichHoat"))
                nd.IsKichHoat = (bool)dr["KichHoat"];

            if (colNameList.Contains("MaPhongBan"))
                nd.MaPhongBan = (string)dr["MaPhongBan"];

            if (colNameList.Contains("TenPhongBan"))
                nd.TenPhongBan = (string)dr["TenPhongBan"];

            if (colNameList.Contains("ExitsUserInSys"))
                nd.ExitsUserInSys = (int)dr["ExitsUserInSys"];


            l.Add(nd);
        }

        return l;
    }
}