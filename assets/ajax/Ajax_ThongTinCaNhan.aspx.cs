using System;
using System.Data;
using System.Data.OleDb;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.IO;
using System.Security.Cryptography;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Data.SqlClient;

public partial class assets_ajax_Ajax_ThongTinCaNhan : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Login.GetEmail() == null)
        {
            if (Request.Cookies["SessionId"] != null)
                DuyTriDangNhap.Do(Request.Cookies["SessionId"].Value);
            else
                //Response.Redirect("DangNhap.aspx?p=" + Page.Request.Url.AbsolutePath.Substring(1));

                Response.Write(JsonConvert.SerializeObject("err401"));
            return;

        }

        DataTable tb=new DataTable();
        string cmd = Request.Form.Get("cmd");
        switch (cmd)
        {
            case "ThayDoiHinhDaiDien":

                tb = Data_ThongTinCaNhan.ThayDoiHinhDaiDien
                   (
                        
                        Request.Form.Get("username").Trim(),
                        Request.Form.Get("filepath").Trim()

                   ).Tables[0];

                Response.Write(JsonConvert.SerializeObject(tb, Formatting.Indented));

                break;
            case "CapNhatThongTinCaNhan":

                tb = Data_ThongTinCaNhan.CapNhatThongTinCaNhan
                   (
                        
                        Request.Form.Get("Ho").Trim(),
                        Request.Form.Get("Ten").Trim(),
                        Request.Form.Get("MaNhanVien").Trim(),
                        Request.Form.Get("SDT").Trim(),
                        Request.Form.Get("username").Trim()

                   ).Tables[0];

                Response.Write(JsonConvert.SerializeObject(tb, Formatting.Indented));

                break;
            case "HienThi_NguoiDung":

                tb = Data_ThongTinCaNhan.HienThi_NguoiDung().Tables[0];

                Response.Write(JsonConvert.SerializeObject(tb, Formatting.Indented));

                break;      

        }
    }
}

