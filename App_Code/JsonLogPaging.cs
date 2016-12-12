using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for JsonLog
/// </summary>
public class JsonLogPaging
{
    List<JsonLog> list;
    int total;

    public List<JsonLog> List
    {
        get { return list; }
        set { list = value; }
    }

    public int Total
    {
        get { return total; }
        set { total = value; }
    }

	public JsonLogPaging(List<JsonLog> List, int Total)
	{
        list = List;
        total = Total;
	}
}