using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
/// Summary description for Filter
/// </summary>
public class Filter
{
    private string field, @operator, value;

    public string Field
    {
        get { return field; }
        set { field = value; }
    }

    public string Operator
    {
        get { return @operator; }
        set { @operator = value; }
    }

    public string Value
    {
        get { return this.value; }
        set { this.value = value; }
    }

	public Filter()
	{
	}
}