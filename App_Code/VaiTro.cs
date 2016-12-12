using System;

/// <summary>
/// Summary description for VaiTro
/// </summary>
public class VaiTro
{
    private short id;
    private string ten, tenDayDu, tenDonVi;
    private bool? laNhaThau;
    private int? donViId;

    public short Id
    {
        get { return id; }
        set { id = value; }
    }

    public string Ten
    {
        get { return ten; }
        set { ten = value; }
    }

    public string TenDayDu
    {
        get { return tenDayDu; }
        set { tenDayDu = value; }
    }

    public string TenDonVi
    {
        get { return tenDonVi; }
        set { tenDonVi = value; }
    }

    public bool? LaNhaThau
    {
        get { return laNhaThau; }
        set { laNhaThau = value; }
    }

    public int? DonViId
    {
        get { return donViId; }
        set { donViId = value; }
    }

	public VaiTro()
    {
    }
}
