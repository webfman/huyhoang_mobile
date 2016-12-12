function createLoading() {

    //$("#form1").append('<div style="opacity: 0.7;display:block;height:900px;width:550px;position:fixed;z-index:1000;left:50%;top:35%;margin-left:auto;margin-right:auto;" id="LoadingImage"><img src="Images/Preloader_3.gif" /></div>')

    $("#form1").append('<div style="width: 100%;height: 100%;top: 0;left: 0;position: fixed;display: block;opacity: 0.7;background-color: #fff;z-index: 99;text-align: center;" id="LoadingImage"><img style="position: absolute;top: 40%;left: 45%;z-index: 99999999999999;" src="Images/Preloader_3.gif" /></div>')
}

function showLoading(status) {
    if (status) {
        $('div#LoadingImage').show();
        
        //$("#MainContent :input").attr("disabled", true);
        //$('#MainContent').css('opacity', 0.0);
        //$('#MainContent').css('filter', 'alpha(opacity=0)');
        //$('#MainContent').animate({ opacity: 0.5, filter: 'alpha(opacity=50)' }, 500);
        //$('#MainContent').css('display', 'block');
    }
    else {
        $('div#LoadingImage').hide();

        //$("#MainContent :input").attr("disabled", false);
        //$('#MainContent').css('opacity', 1);
        //$('#MainContent').css('filter', 'alpha(opacity=0)');
        //$('#MainContent').css('display', 'inline');
    }
}

$(document).ready(function () {
    createLoading();
    showLoading(false);

    $(document).ajaxStart(function () { showLoading(true); }).ajaxStop(function () { showLoading(false); });
});
