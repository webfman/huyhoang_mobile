using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using DataProvider;

/// <summary>
/// Summary description for Data_ThongTinCaNhan
/// </summary>
public class Data_ThongTinCaNhan
{
	public Data_ThongTinCaNhan()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public static DataSet ThayDoiHinhDaiDien
        (
            string username,
	        string FilePath
        )
    {
        DataSet ds = new DataSet();

        object[] p = new object[2];

        p[0] = username;
        p[1] = FilePath;
        

        CEnterpriceLibrary.ExecuteDataset(ref ds, "CapNhatThongTinCaNhan", p);
        return ds;

    }

    public static DataSet CapNhatThongTinCaNhan
        (
            string Ho,
            string Ten,
            string MaNhanVien,
            string SDT,
            string username
                     
        )
    {
        DataSet ds = new DataSet();

        object[] p = new object[5];

        p[0] = Ho;
        p[1] = Ten;
        p[2] = MaNhanVien;
        p[3] = SDT;
        p[4] = username;


        CEnterpriceLibrary.ExecuteDataset(ref ds, "CapNhatThongTinCaNhan;2", p);
        return ds;

    }

    public static DataSet HienThi_NguoiDung
        (

        )
    {
        DataSet ds = new DataSet();

        object[] p = new object[0];
        

        CEnterpriceLibrary.ExecuteDataset(ref ds, "NguoiDung_SP", p);
        return ds;

    }

}