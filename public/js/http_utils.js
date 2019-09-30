var conPath = document.location.origin ;

var postRequest = function(url,data,method,dataType) {
    return $.post(url,data,method,dataType);
}