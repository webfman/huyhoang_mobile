using System;
using System.Web;

/// <summary>
/// Summary description for LichSuNhap
/// </summary>
public class LichSuNhap
{
    private decimal soLuong;
    private string ngayCapNhat, ngay;

    public decimal SoLuong
    {
        get { return soLuong; }
        set { soLuong = value; }
    }

    public string NgayCapNhat
    {
        get { return ngayCapNhat; }
        set { ngayCapNhat = value; }
    }

    public string Ngay
    {
        get { return ngay; }
        set { ngay = value; }
    }

    public LichSuNhap()
	{
	}
}