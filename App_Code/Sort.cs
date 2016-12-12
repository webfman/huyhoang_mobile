using System;
using System.Web;

/// <summary>
/// Summary description for Sort
/// </summary>
public class Sort
{
    private string field, dir;

    public string Field
    {
        get { return field; }
        set { field = value; }
    }

    public string Dir
    {
        get { return dir; }
        set { dir = value; }
    }

	public Sort()
	{
	}

    public Sort(string Field, string Dir)
    {
        field = Field;
        dir = Dir;
    }
}