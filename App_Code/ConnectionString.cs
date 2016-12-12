using System.Configuration;

public static class ConnectionString
{
    public static string WebFMan_HuyHoang = ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString;
}