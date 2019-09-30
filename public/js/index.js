$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        hideContextMenu('htmlContextMenu');
        hideContextMenu('cssContextMenu');
    }
});

var setStatusLabel = function (status, icon, context) {
    var span = document.createElement("span");
    span.setAttribute("class", "status-text " + status);
    var spanText = document.createTextNode(context);
    var i = document.createElement("i");
    i.setAttribute("class", "fa " + icon);
    span.appendChild(i);
    span.appendChild(spanText);
    return span;
}

var hideContextMenu = function (menuName) {
    document.getElementById(menuName).style.display = 'none';
}

var showContextMenu = function () {
    document.getElementById(menuName).style.display = 'block';
}

var onKeyCodeAction = function (e, keyValue, actionMethod) {
    if (e.which == keyValue) {
        e.preventDefault();
        actionMethod();
    }
}

var dragData = function (event, key, data, dragGhostId) {
    var dragGhostDOM = document.getElementById(dragGhostId);
    event.dataTransfer.setDragImage(dragGhostDOM, 0, 0);
    event.dataTransfer.setData(key, data);
}

var allowDrop = function (event) {
    event.preventDefault();
}

var dropData = function (event, key) {
    event.preventDefault();
    var data = event.dataTransfer.getData(key);
    dropClassToHTML(event.target.id, data);
}

var stopPropagation = function (event) {
    event.stopPropagation();
}

var avoidRichText = function (id) {
    setTimeout(function () {
        var value = document.getElementById(id).innerText;
        document.getElementById(id).innerText = value.replace(/(\r\n\t|\n|\r\t)/gm, "");
    }, 1);
}
