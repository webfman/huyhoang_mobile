var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
        KetQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
                KetQua += " mốt ";
            }
            else {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                KetQua += ChuSo[donvi];
            }
            else {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                KetQua += ChuSo[donvi];
            }
            break;
    }
    return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

function DocTienBangChu(SoTien) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var ViTri = new Array();
    if (SoTien < 0) return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng !";
    if (SoTien > 0) {
        so = SoTien;
    }
    else {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    if (isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
    if (isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0) {
        lan = 5;
    }
    else if (ViTri[4] > 0) {
        lan = 4;
    }
    else if (ViTri[3] > 0) {
        lan = 3;
    }
    else if (ViTri[2] > 0) {
        lan = 2;
    }
    else if (ViTri[1] > 0) {
        lan = 1;
    }
    else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = DocSo3ChuSo(ViTri[i]);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += Tien[i];
        if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
        KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

/////////////////////////////

function trim(psValue) {
    if (!psValue) {
        psValue = "";
        return psValue;
    }
    return String(psValue).replace(/^\s*|\s*$/g, "");
}
function IsNumeric(psValue) {
    var ValidChars = "0123456789.,-";
    var IsNumber = true;
    var lcChar;
    psValue = trim(psValue);//doi sang kiểu string
    if (psValue == "")
        IsNumber = false;
    else
        for (i = 0; i < psValue.length && IsNumber == true; i++) {
            lcChar = psValue.charAt(i);
            if (ValidChars.indexOf(lcChar) == -1)
                IsNumber = false;
        }// EndOf For
    return IsNumber;
}// EndOf Function

function CheckAll(pobjForm, psIDChk, pbCheck) {//check all checkbox
    //psIDChk : id checkbox trên grid cần đánh check
    var i, liCount, lsVal;
    psIDChk = psIDChk.toLowerCase();
    liCount = pobjForm.elements.length - 1;
    for (i = 0 ; i <= liCount; i++) {
        if (pobjForm.elements[i].type == "checkbox") {
            lsVal = pobjForm.elements[i].id.toLowerCase();
            if (lsVal.indexOf(psIDChk) >= 0)
                pobjForm.elements[i].checked = pbCheck;
        }//EndOf if
    }//EndOf for
}//EndOf function
function IsCheck(psName) {//Test list radio button has select
    //psName : tên radio button list cần test
    var i, liCount, lsVal, loList, lbCheck = false;
    try {
        loList = document.getElementsByName(psName);
        liCount = (loList ? loList.length : 0);
        for (i = 0 ; i < liCount; i++) {
            if (loList[i].checked) {
                lbCheck = true;
                break;
            }
        }
    } catch (ex) { }
    return lbCheck;
}//EndOf function
function IsEmail(psEmail) {
    var lbRes = false;
    try {
        var lsTest, lrRE;
        lsTest = "^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,8})$";
        lrRE = new RegExp(lsTest);
        lbRes = lrRE.exec(psEmail);
    } catch (ex) { }
    return lbRes;
}
function getCookie(c_name) {
    try {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
    } catch (ex) { }
    return "";
}
function setCookie(c_name, value, expiredays) {//expiredays : số ngày expire
    try {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString());
    } catch (ex) { }
}
function clearCookie(c_name) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    document.cookie = c_name + '=;expires=' + exdate.toGMTString();
}
function LabelForCheckbox(psDiv) {
    try {
        var lDiv, larrChk, larrLbl, lintLen;
        lDiv = document.getElementById(psDiv);
        larrChk = lDiv.getElementsByTagName("input")
        larrLbl = lDiv.getElementsByTagName("label")
        lintLen = larrChk.length;
        for (i = 0; i < lintLen; i++) {
            larrLbl[i].htmlFor = larrChk[i].id;
        }
    } catch (ex) { }
}
//////////////////////////////////////////////////////////
function showFrameDetail(displayBelowThisObject, psIDDetail) {
    try {
        //alert(displayBelowThisObject.style.checked);
        var x = displayBelowThisObject.offsetLeft;
        var y = displayBelowThisObject.offsetTop;//+ displayBelowThisObject.offsetHeight ;
        // deal with elements inside tables and such
        var parent = displayBelowThisObject;
        while (parent.offsetParent) {
            parent = parent.offsetParent;
            x += parent.offsetLeft;
            y += parent.offsetTop;
        }
        // move the datepicker div to the proper x,y coordinate and toggle the visiblity
        var DetailDiv = document.getElementById(psIDDetail);
        DetailDiv.style.position = "absolute";
        //DetailDiv.style.left = x + "px";
        DetailDiv.style.top = y + "px";
        DetailDiv.className = '';
        DetailDiv.style.zIndex = 10000;
    } catch (ex) { }
}
//hiển thị / che control
function ShowMe(psID, pVisible, pClass) {
    try {
        if (!pClass) pClass = '';
        document.getElementById(psID).className = (pVisible == true ? pClass : 'hide');
    } catch (ex) { }
}
/// <summary>
/// focus control
/// </summary>
function Focus(psID) {
    try {
        var lObj = document.getElementById(psID);
        lObj.focus(); lObj.select();
    } catch (ex) { }
}
/// <summary>
/// Alert Message
/// </summary>
function AlertClient(psIDMsg, psMsg) {
    try {
        alert(psMsg);
        document.getElementById(psIDMsg).innerHTML = psMsg;
    } catch (ex) { }
}
/// <summary>
/// Alert & focus control
/// </summary>
function Alert_Focus(psID, psIDMsg, psMsg) {
    try {
        AlertClient(psIDMsg, psMsg);
        Focus(psID);
    } catch (ex) { }
}
/// <summary>
/// không cho PostBack về server
/// </summary>
function NotReturn() {
    try {
        window.event.returnValue = false;
    } catch (ex) { }
}
/// <summary>
/// gán selectedindex cho combobox
/// </summary>
function GetListIndex(psVal, pCbo) {
    var liLen, i;
    liLen = pCbo.length;
    pCbo.selectedIndex = -1;
    for (i = 0; i < liLen; i++) {
        if (psVal == pCbo.options[i].value) {
            pCbo.selectedIndex = i;
            break;
        }
    }//end for
}
/// <summary>
/// Xoá giá trị của control
/// </summary>
function ClearIt(psID) {
    try {
        var lObj;
        lObj = document.getElementById(psID);
        switch (lObj.type) {
            case 'select-one':
                lObj.options.length = 0;
                break;
            case 'checkbox':
                lObj.checked = false;
                break;
            default://hidden,text
                lObj.value = '';
                break;
        }
    } catch (ex) { }
}
function ClearListID(pListID, psPrefix) {
    try {
        var i, liCount, lArrID;
        lArrID = pListID.split(',');
        liCount = lArrID.length;
        if (!psPrefix)
            psPrefix = '';
        for (i = 0; i < liCount; i++) {
            ClearIt(psPrefix + lArrID[i]);
        }
    } catch (ex) { }
}
function DisableIt(psID, pDisable) {
    try {
        document.getElementById(psID).disabled = (pDisable ? true : false);
    } catch (ex) { }
}
/// <summary>
/// Xoá edit row style của grid
/// </summary>
function RestoreStyle(psIDGrid) {
    try {
        var i, lCount, lTab, lRow, lsCss;
        lTab = document.getElementById(psIDGrid);
        if (!lTab) return;
        lCount = lTab.rows.length;
        for (i = 1; i < lCount; i++) {
            lsCss = lTab.rows[i].className;
            if (lsCss == "editem") {
                if (i % 2 == 0)
                    lTab.rows[i].className = 'alitem';
                else
                    lTab.rows[i].className = 'item';
                break;
            }
        }
    } catch (ex) { }
}

/// <summary>
/// Check All trên grid
/// </summary>


function CheckAll(checkAll) {
    var frm = document.forms[0];
    var ChkState = checkAll.checked;
    for (i = 0; i < frm.length; i++) {
        e = frm.elements[i];
        if (e.type == 'checkbox' && e.name.indexOf('check') != -1 && e.disabled == false)
            e.checked = ChkState;
    }
}

function CheckChanged() {
    var frm = document.forms[0];
    var boolAllChecked;
    boolAllChecked = true;
    for (i = 0; i < frm.length; i++) {
        e = frm.elements[i];
        if (e.type == 'checkbox' && e.name.indexOf('check') != -1)
            if (e.checked == false) {
                boolAllChecked = false;
                break;
            }
    }
    for (i = 0; i < frm.length; i++) {
        e = frm.elements[i];
        if (e.type == 'checkbox' && e.name.indexOf('CheckAll') != -1) {
            if (boolAllChecked == false)
                e.checked = false;
            else
                e.checked = true;
            break;
        }
    }
}

///////////////////////////////////////////////////////////////////////////////// 
//SetChecked : dùng để CHECK hoặc UNCHECK dsách checkbox CON thuộc 1 checkbox CHA
//điều kiện sd: dsách checkbox CHA và CON phải thuộc 1 control
function SetChecked(parentServerID, parentClientID, childServerID) {
    var frm = document.form1;
    var parentCheckState = document.getElementById(parentClientID).checked;
    var childClientIDPrefix = parentClientID.replace(parentServerID, childServerID);
    for (i = 0 ; i < frm.elements.length ; i++) {
        if (frm.elements[i].id.indexOf(childClientIDPrefix) > -1) {
            frm.elements[i].checked = parentCheckState;
        }
    }
}
///////////////////////////////////////////////////////////////////////////////// 
//CheckChanged : dùng để CHECK hoặc UNCHECK checkbox CHA khi có 1 checkbox CON thay đổi
//điều kiện sd: dsách checkbox CHA và CON phải thuộc 1 control
function CheckChanged2(parentServerID, parentClientID, childServerID) {
    var frm = document.form1;
    var bAllChecked = true;
    var childClientIDPrefix = parentClientID.replace(parentServerID, childServerID);
    for (i = 0 ; i < frm.elements.length ; i++) {
        if (frm.elements[i].id.indexOf(childClientIDPrefix) > -1) {
            if (!frm.elements[i].checked)
                bAllChecked = false;
        }
    }
    document.getElementById(parentClientID).checked = bAllChecked;
}

// dung trong textbox nhap giai tri tien
function OnChangeFormat(pValue) {
    var x, x1, x2;
    var rgx = /(\d+)(\d{3})/;
    pValue += '';
    if (pValue != "") {
        x = pValue.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? "." + x[1] : "";
        while (x1.indexOf(",") >= 0) { //b? d?u ,
            x1 = x1.replace(",", "");
        }
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1" + "," + "$2");
        }
        //if (pValue != (x1 + x2))
        pValue = x1 + x2;
    }
    return pValue;
}

function ReplaceComma(pValue) {
    return pValue.replace(/,/g, '');
}

function auto_currency(id) {
    var variable = document.getElementById(id);
    var new_value = variable.value.replace(/\,/g, "");
    variable.style.textAlign = "right";
    variable.value = OnChangeFormat(new_value);
}


function isMonYear(field) {
    var re = /^[0-9-'\/']*$/;
    if (!re.test(field.value)) {
        field.value = field.value.replace(/[^0-9-'\/']/g, "");
    }
}

function keys(e) {
    var keyword = null;
    if (window.event) {
        keyword = window.event.keyCode;
    } else {
        keyword = e.which; //NON IE;
    } if (keyword < 48 || keyword > 57) {
        if (keyword == 48 || keyword == 127) {
            return;
        }
        return false;
    }
}