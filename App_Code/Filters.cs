using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Filters
/// </summary>
public class Filters
{
    private List<Filter> filter;
    private string logic;

    public string Logic
    {
        get { return logic; }
        set { logic = value; }
    }

    public List<Filter> Filter
    {
        get { return filter; }
        set { filter = value; }
    }

	public Filters()
	{
	}
}