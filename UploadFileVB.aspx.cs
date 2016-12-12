using System;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UploadFileVB : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Expires = -1;
        Response.ContentType = "text/plain";

        try
        {
            HttpPostedFile file = Request.Files["fileUpload"];
            string rootPath = Server.MapPath("~/VanBan/"), rootFolder = "";
            string childFolder = DateTime.Now.Year.ToString() + "_" + DateTime.Now.Month.ToString() + "/";
            string fileName = DateTime.Now.Ticks.ToString() + Path.GetExtension(file.FileName);
            string loaiVB = Request.Form["LoaiFile"];

            rootPath += loaiVB + "/";
            rootFolder = loaiVB + "/";

            if (!Directory.Exists(rootPath + childFolder))
                Directory.CreateDirectory(rootPath + childFolder);

            file.SaveAs(rootPath + childFolder + fileName);
            Response.Write("{ \"FilePath\": \"VanBan/" + rootFolder + childFolder + fileName + "\" }");
        }
        catch (Exception)
        {
            throw;
        }
    }
}