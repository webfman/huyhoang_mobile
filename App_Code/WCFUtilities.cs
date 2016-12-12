using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

/// <summary>
/// Summary description for WCFUtilities
/// </summary>
public class WCFUtilities
{
    public WCFUtilities()
    {

    }
    public static string GetData(string URL, string ResponseType)
    {
        WebClient client = new WebClient();
        client.Headers["Content-type"] = @"application/" + ResponseType;
        Stream data = client.OpenRead(URL);
        StreamReader reader = new StreamReader(data);
        string str = "";
        string returnVal = "";
        str = reader.ReadLine();
        while (str != null)
        {
            //Console.WriteLine(str);
            returnVal += str;
            str = reader.ReadLine();
        }
        data.Close();
        return returnVal;
    }

}