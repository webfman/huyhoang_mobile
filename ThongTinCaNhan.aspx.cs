using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ThongTinCaNhan : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Login.GetEmail() == null)
        {
            if (Request.Cookies["SessionId"] != null)
                DuyTriDangNhap.Do(Request.Cookies["SessionId"].Value);
            else
                Response.Redirect("DangNhap.aspx?p=" + Page.Request.Url.AbsolutePath.Substring(1));
        }

        

        hidEmail.Value = Login.GetEmail();        
        imgUser.ImageUrl = Login.GetHinh();

        txt_ho.Text = Login.GetHo();
        txt_ten.Text = Login.GetTen();
        txt_sdt.Text = Login.GetSoDienThoai();
        txt_msnv.Text = Login.GetMaNhanVien();
    }
}