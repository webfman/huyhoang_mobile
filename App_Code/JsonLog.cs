using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for JsonLog
/// </summary>
public class JsonLog
{
    string email, noiDung, thoiDiem;

    public string Email
    {
        get { return email; }
        set { email = value; }
    }

    public string NoiDung
    {
        get { return noiDung; }
        set { noiDung = value; }
    }

    public string ThoiDiem
    {
        get { return thoiDiem; }
        set { thoiDiem = value; }
    }

    public JsonLog(string Email, string ThoiDiem, string NoiDung)
    {
        email = Email;
        thoiDiem = ThoiDiem;
        noiDung = NoiDung;
    }
}