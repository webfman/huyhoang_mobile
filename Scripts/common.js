//Get top coordinate in viewport of JQuery object
function getTop(jqObject) {
    if (jqObject instanceof jQuery)
        return jqObject[0].getBoundingClientRect().top;
    else
        return null;
}

//Get right coordinate in viewport of JQuery object
function getRight(jqObject) {
    if (jqObject instanceof jQuery)
        return jqObject[0].getBoundingClientRect().right;
    else
        return null;
}

//Get bottom coordinate in viewport of JQuery object
function getBottom(jqObject) {
    if (jqObject instanceof jQuery)
        return jqObject[0].getBoundingClientRect().bottom;
    else
        return null;
}

//Get left coordinate in viewport of JQuery object
function getLeft(jqObject) {
    if (jqObject instanceof jQuery)
        return jqObject[0].getBoundingClientRect().left;
    else
        return null;
}

/*
    Set position for Kendo Notification object
    notifyObj: Kendo Notification object variable
*/
function setNotificationPosition(notifyObj, top, right, bottom, left) {
    if (notifyObj instanceof kendo.Class && notifyObj.options.name === 'Notification' &&
        (typeof top === 'number' || top === null) &&
        (typeof right === 'number' || right === null) &&
        (typeof bottom === 'number' || bottom === null) &&
        (typeof left === 'number' || left === null)) {
        notifyObj.getNotifications().first().parent().remove();
        notifyObj.setOptions({
            position: {
                top: top,
                right: $(window).width() - right,
                bottom: $(window).height() - bottom,
                left: left
            }
        });
    }
}
function GetPriceText(id) {

    var variable = document.getElementById(id);
    var new_value = variable.value.replace(/\,/g, "");
    variable.value = OnChangeFormat(new_value);
}