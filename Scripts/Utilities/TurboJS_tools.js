    var clientWidth;
    var clientHeight;
    
    //window.onload = GetClientSize();
    
        function GetClientSize() {	
	        var w, h, sl, st;
	        if (window.innerWidth){
	            w = window.innerWidth;
	            h = window.innerHeight;
	            sl = window.pageXOffset;
	            st = window.pageYOffset;
	        }
	        else if (document.body){
	            w = document.body.clientWidth;
	            h = document.body.clientHeight;
	            sl = document.body.scrollLeft;
	            st = document.body.scrollTop;
	        }	
	        else if (document.documentElement){
	            w = document.documentElement.clientWidth;
	            h = document.documentElement.clientHeight;
	            sl = document.documentElement.scrollLeft;
	            st = document.documentElement.scrollTop;
	        }
	        else{
	            w = screen.width;
	            h = screen.height;
	        }
	        clientWidth = w+sl;
	        clientHeight = h+st;
        }
        
    function openWindow(width, height, url, name)
    {
        var t = ((screen.height/2)-(height/2))-50;
        var l = (screen.width/2)-(width/2);
        var w = window.open(url,name,'toolbar=no,location=no,directories=no,status=no, menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,top='+t+',width='+width+',height='+height+',left='+l);
    }        
    
    function Upper(id)
    {
        //var obj getControl(id);
        if (document.getElementById)
        {
            var txt = document.getElementById(id);
		    var tmp = txt.value;
		//    var tmp = obj.value;
		    var str = tmp.toUpperCase()
		    txt.value = str;
		}
    }

    function copyListBox(sourceList, desList, removeSourceList)
    {
	    var dList = document.getElementById(desList);
	    var sList = document.getElementById(sourceList); 	
	    for(var i = 0; i < sList.length; i++)
        {
		    dList.options[i] = new Option(sList.options[i].text); 
		    dList.options[i].value = sList.options[i].value; 
        }
    }
    
    function copySelectedItemListBox(sourceList, desList, removeSourceList)
    {
	    var dList = document.getElementById(desList);
	    var sList = document.getElementById(sourceList); 		    
	    
	    var len = dList.length;
	    for(var i = 0; i < sList.length; i++)
	    {
		    if ((sList.options[i] != null) && (sList.options[i].selected))
		    {
			    var found = false;
			    for(var count = 0; count < len; count++)
			    {
				    if (dList.options[count] != null)
				    {
					    if (sList.options[i].text == dList.options[count].text)
					    {
						    found = true;
						    break;
					    }
				    }
			    }
			    if (found != true)
			    {
				    dList.options[len] = new Option(sList.options[i].text); 
				    len++;
			    }
		    }
	    }
	    //deleteItem(str,false);
    }    

    function deleteItem(destList,all)
    {
	    var dList = document.getElementById(destList);
	    var len = dList.options.length;
	    for(var i = (len-1); i >= 0; i--)
	    {
		    if ((dList.options[i] != null) && (dList.options[i].selected == true || all))
		    {
			    dList.options[i] = null;
		    }
	    }
    }    
    
	function moveListBoxItem(obj,dir)
	{
		if(!document.getElementById(obj)) return "";
		var lst = document.getElementById(obj);
		var len = lst.options.length;
		for(var i = (len-1); i >= 0; i--)
		{
			if (lst.options[i] != null && lst.options[i].value == itm)
			{
				lst.options[i].selected=true;
			}
		}
	}		       
	
    function listbox_move(listID, direction) {  
      
        var listbox = document.getElementById(listID);  
        var selIndex = listbox.selectedIndex;  
      
        if(-1 == selIndex) {  
            alert("Please select an option to move.");  
            return;  
        }  
     
       var increment = -1;  
       if(direction == 'up')  
           increment = -1;  
       else  
           increment = 1;  
     
       if((selIndex + increment) < 0 ||  
           (selIndex + increment) > (listbox.options.length-1)) {  
           return;  
       }  
     
       var selValue = listbox.options[selIndex].value;  
       var selText = listbox.options[selIndex].text;  
       listbox.options[selIndex].value = listbox.options[selIndex + increment].value  
       listbox.options[selIndex].text = listbox.options[selIndex + increment].text  
     
       listbox.options[selIndex + increment].value = selValue;  
       listbox.options[selIndex + increment].text = selText;  
     
       listbox.selectedIndex = selIndex + increment;  
   }  	
    
	function getSelectedValue(obj,val)
	{
		if(!document.getElementById(obj)) return "";
        var ctl = document.getElementById(obj);
        if(val)
            return ctl.options[ctl.selectedIndex].value;
        else
            return ctl.options[ctl.selectedIndex].text;
	}
	    
	function selectItem(obj,itm)
	{
		//alert(itm);
		if(!document.getElementById(obj)) return "";
		var lst = document.getElementById(obj);
		var len = lst.options.length;
		for(var i = (len-1); i >= 0; i--)
		{
			if (lst.options[i] != null && lst.options[i].value == itm)
			{
				lst.options[i].selected=true;
			}
		}
	}		   
	
	
    function clearForm(formIdent) 
    { 
      var form, elements, i, elm; 
      form = document.getElementById 
        ? document.getElementById(formIdent) 
        : document.forms[formIdent]; 

	    if (document.getElementsByTagName)
	    {
		    try{
		        elements = form.getElementsByTagName('input');
		        for( i=0, elm; elm=elements.item(i++); )
		        {
			        if (elm.getAttribute('type') == "text")
			        {
				        elm.value = '';
			        }
		        }
		    }catch(err){}
		    try{
                elements = form.getElementsByTagName('select');
		        for( i=0, elm; elm=elements.item(i++); )
		        {
			        elm.options.selectedIndex=0;
		        }
            }catch(err){}
	    }
	    else
	    {
		    elements = form.elements;
		    for( i=0, elm; elm=elements[i++]; )
		    {
			    if (elm.type == "text")
			    {
				    elm.value ='';
			    }
		    }
	    }
    }	
    
    function disableBackGround(popup,status)
    {
        GetClientSize();
        if (document.getElementById('disabedBG'))
        {
		    document.getElementById('disabedBG').style.display = status?'inline':'none';
		    document.getElementById('disabedBG').style.zIndex = status?'1000':'0';
        }
        else
        {
            //var elm = "<div id=\"disabedBG\" class=\"modalBackground\" style=\"display:inline; z-index:1000; position:absolute; left:0; top:0; width:100%; height:100%\"></div>";
            var elm = "<div id=\"disabedBG\" class=\"modalBackground\" style=\"display:inline; z-index:1000; position:absolute; left:0; top:0; width:"+clientWidth+"; height:"+clientHeight+"\"></div>";
		    var divelm = document.createElement(elm);
		    document.body.insertBefore(divelm);
		}
		document.getElementById(popup).style.display = status?'inline':'none';
		document.getElementById(popup).style.zIndex = status?'1001':'0';
    }
    
    function disableCombobox(formIdent, status) 
    { 
        var form, elements, i, elm; 
        form = document.getElementById(formIdent);
	    if (document.getElementsByTagName)
	    {
            try{
                elements = form.getElementsByTagName('select') ;
		        for( i=0, elm; elm=elements.item(i++); )
		        {
    	            elm.style.visibility = status?'hidden':'';
		        }		
		    }catch(err){}
	    }
	    else
	    {
		    elements = form.elements;
		    for( i=0, elm; elm=elements[i++]; )
		    {
			    if (elm.type == "select")
			    {
				    elm.style.visibility = status?'hidden':'';
			    }
		    }
	    }
    } 
    
    function disableBackGroundAll(status)
    {
        GetClientSize();
        //alert(document.getElementById('disabedBG'));
        //if (document.getElementById('disabedBG')+'' == '[object]')
        //{
		//    document.getElementById('disabedBG').style.display = status?'inline':'none';
		//    document.getElementById('disabedBG').style.zIndex = status?'1111':'0';

        //}
        //else
        //{
            //var elm = "<div id=\"disabedBG\" class=\"modalBackground\" style=\"display:inline; z-index:1000; position:absolute; left:0; top:0; width:100%; height:100%\"></div>";
            var elm = "<div id=\"disabedBG\" class=\"modalBackground\" style=\"display:inline; z-index:1000; position:absolute; left:0; top:0; width:"+clientWidth+"; height:"+clientHeight+"\"></div>";
		    var divelm = document.createElement(elm);
		    document.body.insertBefore(divelm);
		//}
		return true;
    }        
    
    
    //Waiting messge
	var pro = false;
	var default_message = "<b>Đang thực hiện... Vui lòng chờ trong giây lát!</b>";
	var path = "http://10.70.105.2"+"/images/";
	
	function createTooltipBox(msg, waiting, mousepos)
	{
		if (msg == "") msg = default_message;
		if(waiting)
		{
			msg = "<img alt=\"EHTC\" align=\"absmiddle\" src=\""+path+"loading.gif\" width=\"35\" height=\"35\">"+msg;
			document.body.style.zIndex = "2222";
			document.body.style.cursor = path + "/images/aero_busy.ani";
		}
		if (document.getElementById("mtooltip"))
		{
			turnToolTip('inline',msg);
			return true;
		}
		var tbl;
		tbl = "<table id=\"tblToolTip\" width=\""+(screen.width/3)+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		tbl += "  <tr>";
		tbl += "    <td width=\"18\" height=\"18\" background=\""+path+"top_left_corner.GIF\"></td>";
		tbl += "    <td style=\"background-repeat:repeat-x; background-image:url("+path+"top_border.GIF)\"></td>";
		tbl += "    <td width=\"18\" height=\"18\" background=\""+path+"top_right_corner.GIF\"></td>";
		tbl += "  </tr>";
		tbl += "  <tr bgcolor=\"#FFFFFF\">";
		tbl += "    <td style=\"background-repeat:repeat-y;background-image:url("+path+"left_border.GIF)\"></td>";
		tbl += "    <td valign=\"top\"><div id=\"mToolTipMsg\"><font style=\"font-family:Tahoma,Arial;font-size:11px;color:#ff00ff;\">"+msg+"</font></div><br></td>";
		tbl += "    <td style=\"background-repeat:repeat-y;background-image:url("+path+"right_border.GIF)\"></td>";
		tbl += "  </tr>";
		tbl += "  <tr>";
		tbl += "    <td height=\"37\" style=\"background-position:bottom; background-repeat:no-repeat;background-image:url("+path+"bottom_left_corner.GIF)\"></td>";
		tbl += "    <td height=\"37\" style=\"background-position:bottom;background-repeat:repeat-x;background-image:url("+path+"bottom_border.GIF)\"></td>";
		tbl += "    <td height=\"37\" style=\"background-position:bottom;background-repeat:no-repeat; background-image:url("+path+"bottom_right_corner.GIF)\"></td>";		
		tbl += "  </tr>";
		tbl += "</table>";				
		
		var y = 0;
		var x = 0;
   		var winH = (document.body.clientHeight/2)-80;
    	y = winH+document.body.scrollTop;
	    x = ((document.body.clientWidth/2)-(screen.width/6))+document.body.scrollLeft;		
		var tooltip = document.createElement("<div id=\"mtooltip\" style=\"DISPLAY: inline;POSITION: absolute; Z-INDEX: 2222; LEFT:"+x+"; TOP:"+y+"\">");
		tooltip.innerHTML = tbl;
		document.body.insertBefore(tooltip);
		return true;
	}    
	
	function turnToolTip(status)
	{
		if (status == "none") document.body.style.cursor = "arrow";
		try
		{
			if (turnToolTip.arguments[1] != null && turnToolTip.arguments[1] != "")
			{
				document.getElementById("mToolTipMsg").innerHTML = turnToolTip.arguments[1];
			}
			document.getElementById("mtooltip").style.display=status;			
			var y = 0;
			var x = 0;
		    var winH = (document.body.clientHeight/2)-80;
		    y = winH+document.body.scrollTop;
		    x = ((document.body.clientWidth/2)-(screen.width/6))+document.body.scrollLeft;			
			document.getElementById("mtooltip").style.left = x;
			document.getElementById("mtooltip").style.top = y;			
		}
		catch(e){}
	}	
    
    function trim(str, chars) {
        return ltrim(rtrim(str, chars), chars);
    }

    function ltrim(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    }

    function rtrim(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    }    
    
    String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g,"");
    }
    String.prototype.ltrim = function() {
	    return this.replace(/^\s+/,"");
    }
    String.prototype.rtrim = function() {
	    return this.replace(/\s+$/,"");
    }
    
    function setCookie(cookieName,cookieValue,nDays) {
      var today = new Date();
      var expire = new Date();
      if (nDays==null || nDays==0) nDays=3;
      expire.setTime(today.getTime() + 3600000*24*nDays);
      document.cookie = cookieName+"="+escape(cookieValue)
        + ";expires="+expire.toGMTString();
    }

    function getCookie(cookieName) {
      var theCookie=""+document.cookie;
      var ind=theCookie.indexOf(cookieName);
      if (ind==-1 || cookieName=="") return "";
      var ind1=theCookie.indexOf(';',ind);
      if (ind1==-1) ind1=theCookie.length;
      return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
    }    
    
        function getControl(id){
            return document.all ? document.all[id] : document.getElementById(id);
        }        
        function getParentControl(id){
            return window.parent.document.all ? window.parent.document.all[id] : window.parent.document.getElementById(id);
        }    
        
        
        function getSelectedValue(id){
            var radio = document.getElementsByName(id);
            for (var i = 0; i < radio.length; i++){
                if (radio[i].checked){
                    return radio[i].value;
                }
            }
            return null;
        }
        
    //new in Cap
        
    function focusTo(id){
        getControl(id).focus();
        getControl(id).select();
    }
    
    function showHide(id, status){
        var obj = getControl(id);
        obj.style.display = status?'inline':'none';
    }
    
    function turnMe(id){
        var obj = getControl(id);
        if (obj.style.display == 'none'){
            obj.style.display = 'inline';
        }else{
            obj.style.display = 'none';
        }
        
    }    
    
    function disableControl(id, status){
        var obj = getControl(id);
        obj.disabled = status;
    }    
            
            
        function Waiting(msg){
            try
            {
                disableBackGroundAll(false);
            }catch(e){}
                createTooltipBox(msg,true);
            return true;
        }

        function confirmDelete() {
            var ret = confirm('fdfdsfds');
            alert(ret);
            if (confirm('Xóa mẩu tin này?') == false) {
                try {
                    window.event.returnValue = false;
                } catch (ex) { }
                return false;
            }
        }

        function CheckAll(obj, formIdent, prefix) {
            var status = obj.checked;
            if (status) {
                obj.value = 'Bỏ chọn tất cả';
            } else {
                obj.value = 'Chọn tất cả';
            }
            var div = document.getElementById(formIdent);
            var elms = div.getElementsByTagName("input");
            for (var i = 0, maxI = elms.length; i < maxI; ++i) {
                if (elms[i].type == 'checkbox');
                if (prefix != null && prefix != '') {
                    if (elms[i].name.indexOf(prefix) > -1) {
                        elms[i].checked = status;
                    }
                } else {
                    elms[i].checked = status;
                }
            }
        }

        function formatDate(input) {

            var stringArray = new Array();
            stringArray = input.split("/");

            var day = stringArray[0],
                month = stringArray[1],
                year = stringArray[2];

            return month + '/' + day + '/' + year;
        }

        function getYear(input) {
            var stringArray = new Array();
            stringArray = input.split("/");

            var day = stringArray[0],
                month = stringArray[1],
                year = stringArray[2];

            return year;

        }
        function getMonth(input) {
            var stringArray = new Array();
            stringArray = input.split("/");

            var day = stringArray[0],
                month = stringArray[1],
                year = stringArray[2];

            return month;

        }
        function getDay(input) {
            var stringArray = new Array();
            stringArray = input.split("/");

            var day = stringArray[0],
                month = stringArray[1],
                year = stringArray[2];

            return day;

        }
        Array.prototype.contains = function (obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function GetQuy(input) {

            var stringArray = new Array();
            stringArray = input.split("/");

            var day = stringArray[0],
                month = parseInt(stringArray[1]),
                year = stringArray[2],
                quy;



            if ([1, 2, 3].contains(month)) {
                quy = 1;
            }
            if ([4, 5, 6].contains(month)) {
                quy = 2;
            }
            if ([7, 8, 9].contains(month)) {
                quy = 3;
            }
            if ([10, 1, 12].contains(month)) {
                quy = 4;
            }
            return quy;
        }

        function contains(a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }