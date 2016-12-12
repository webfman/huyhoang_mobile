using System;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UploadFileImg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Expires = -1;
        Response.ContentType = "text/plain";

        try
        {
            HttpPostedFile file = Request.Files["fileUpload"];
            string rootPath = Server.MapPath("~/UsersImages/");
            
            string fileName = Request.Form["username"] + Path.GetExtension(file.FileName);


            file.SaveAs(rootPath + fileName);
            Response.Write("{ \"FilePath\": \"UsersImages/" + fileName + "\" }");
        }
        catch (Exception)
        {
            throw;
        }
    }
}