using System;
using System.Collections.Generic;

/// <summary>
/// Summary description for VaiTroPaging
/// </summary>
public class VaiTroPaging
{
    private List<VaiTro> data;
    private int total;

    public List<VaiTro> Data
    {
        get { return data; }
        set { data = value; }
    }

    public int Total
    {
        get { return total; }
        set { total = value; }
    }

    public VaiTroPaging(List<VaiTro> Data, int Total)
    {
        data = Data;
        total = Total;
    }
}
