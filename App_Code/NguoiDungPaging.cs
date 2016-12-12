using System;
using System.Collections.Generic;

/// <summary>
/// Summary description for NguoiDungPaging
/// </summary>
public class NguoiDungPaging
{
    private List<NguoiDung> data;
    private int total;

    public List<NguoiDung> Data
    {
        get { return data; }
        set { data = value; }
    }

    public int Total
    {
        get { return total; }
        set { total = value; }
    }

	public NguoiDungPaging(List<NguoiDung> Data, int Total)
	{
        data = Data;
        total = Total;
	}
}