function createLoading() {
    $("#form1").append('<div style="display:none;height:900px;width:550px;position:fixed;z-index:1000;left:50%;top:35%;margin-left:auto;margin-right:auto;" id="LoadingImage"><img src="../Images/loader3.gif" /></div>')
    //$('div#LoadingImage').hide();
}

function showLoading(status) {
    if (status) {
        $('div#LoadingImage').show();
        $("#main :input").attr("disabled", true);
        $('#main').css('opacity', 0.0);
        $('#main').css('filter', 'alpha(opacity=0)');
        $('#main').animate({ opacity: 0.5, filter: 'alpha(opacity=50)' }, 500);
        $('#main').css('display', 'block');
    }
    else {
        $('div#LoadingImage').hide();
        $("#main :input").attr("disabled", false);
        $('#main').css('opacity', 1);
        $('#main').css('filter', 'alpha(opacity=0)');
        $('#main').css('display', 'inline');
    }
}

$(document).ready(function () {
    createLoading();
    $(document).ajaxStart(function () { showLoading(true); }).ajaxStop(function () { showLoading(false); });
});
