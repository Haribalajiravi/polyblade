var beautify = ace.require("ace/ext/beautify");
var html_editor = ace.edit("html-editor");
html_editor.setTheme("ace/theme/xcode");
html_editor.session.setMode("ace/mode/html");
html_editor.session.setNewLineMode("unix");
html_editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

var css_editor = ace.edit("css-editor");
css_editor.setTheme("ace/theme/xcode");
css_editor.session.setMode("ace/mode/css");
css_editor.session.setNewLineMode("unix");
css_editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

// global variables
var selectTag = document.getElementById("tag").value;
var tagJSON = {
    button: "Click here",
    span: "I'm Span tag",
    div: "I'm Div tag",
    h1: "I'm Larger than h2 tag"
};

var selectTagValue = function () { selectTag = document.getElementById("tag").value; }
var getHTMLContent = function () { return html_editor.getValue().replace(/[\t\n\r]/gm, ''); }
var getCSSContent = function () { return css_editor.getValue().replace(/[\t\n\r]/gm, ''); }
var setHTMLContent = function (content) { html_editor.setValue(content); }
var appendHTMLContent = function (content) { html_editor.setValue(getHTMLContent() + content); }
var setCSSContent = function (content) { css_editor.setValue(content); }
var appendCSSContent = function (content) { css_editor.setValue(getCSSContent() + content); }
var beautifyHTML = function () { beautify.beautify(html_editor.session); }
var beautifyCSS = function () { beautify.beautify(css_editor.session); }
var setTheme = function (id, sid) { var theme = document.getElementById(sid).value; ace.edit(id).setTheme("ace/theme/" + theme); }
var toggle = function (id1, id2) {
    var ID1 = $("#" + id1).hasClass("hide");
    var ID2 = $("#" + id2).hasClass("hide");
    if (ID1) { $("#" + id1).removeClass("hide"); } else { $("#" + id1).addClass("hide"); }
    if (ID2) { $("#" + id2).removeClass("hide"); } else { $("#" + id2).addClass("hide"); }
}
var createTag = function () {
    var tag = "<" + selectTag + ">" + tagJSON[selectTag] + "</" + selectTag + ">";
    appendHTMLContent(tag); beautifyHTML();
}
var createStyle = function () {
    var styleType = document.getElementById("styleType").value;
    var styleName = document.getElementById("addStyle").value;
    var style = styleType + styleName + "{}";
    appendCSSContent(style); beautifyCSS();
}

var expandEditor = function (id) {
    var expand = $("#collapse" + id).hasClass("hide");
    if (expand) {
        $("#collapse" + id).removeClass("hide");
        $("#expand" + id).addClass("hide");
        $("#" + id + "-editor").addClass("enlarge2 f13pt");
        $("#editorDiv" + id).addClass("enlarge modalBg");
    }
}
var collapaseEditor = function (id) {
    var collapse = $("#collapse" + id).hasClass("hide");
    if (!collapse) {
        $("#collapse" + id).addClass("hide");
        $("#expand" + id).removeClass("hide");
        $("#" + id + "-editor").removeClass("enlarge2 f13pt");
        $("#editorDiv" + id).removeClass("enlarge modalBg");
    }
}

var HTMLTreeView = {
    createCheckbox: function (idValue) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", idValue);
        return checkbox;
    },
    createTreeLable: function (idValue, labelText, attribute) {
        var label = document.createElement("label");
        var spanTagText = document.createTextNode(labelText);
        var parentSpan = document.createElement("span");

        var span = document.createElement("span");
        span.setAttribute("contenteditable", "true");
        span.setAttribute("onmousedown", "stopPropagation(event)");
        span.setAttribute("id", "tag_" + idValue);
        span.setAttribute("onpaste", "avoidRichText(this.id)");
        span.setAttribute("onkeypress", "setValueToHTMLAst(event,this.id)");
        span.setAttribute("ondrop", "dropData(event,'cssname')");
        span.setAttribute("ondragover", "allowDrop(event)");
        span.setAttribute("title", "Double click to edit content");
        span.appendChild(spanTagText);
        if ((typeof attribute.class) != "undefined") { span.setAttribute("class", "tree-view-tag bbrr0px btrr0px"); } else { span.setAttribute("class", "tree-view-tag box-shadow"); }
        parentSpan.appendChild(span);

        if ((typeof attribute.class) != "undefined") {
            var spanClass = document.createElement("span");
            spanClass.setAttribute("id", "class_" + idValue);
            spanClass.setAttribute("class", "tree-view-class bblr0px btlr0px");
            $("#tag_" + idValue).addClass("bbrr0px btrr0px");
            var spanClassText = document.createTextNode(attribute.class.split(' ').join(','));
            spanClass.appendChild(spanClassText);
            parentSpan.appendChild(spanClass);
            parentSpan.setAttribute("class", "html-class box-shadow");
        }
        label.appendChild(parentSpan);
        var i = document.createElement("i");
        i.setAttribute("class", "fa fa-gear context-setting");
        i.setAttribute("title", "right click to view options");
        label.appendChild(i);
        label.setAttribute("class", "menu_label");
        label.setAttribute("onmousedown", "htmlMenu(event,'tag','" + idValue + "')");
        label.setAttribute("onContextMenu", "return false");
        label.setAttribute("for", idValue);
        return label;
    },
    createListText: function (idValue, listText) {
        var list = document.createElement("li");
        var spanTagText = document.createTextNode(listText);
        var span = document.createElement("span");
        span.setAttribute("class", "tree-view-text box-shadow");
        span.setAttribute("contenteditable", "true");
        span.setAttribute("onmousedown", "stopPropagation(event)");
        span.setAttribute("id", "text_" + idValue);
        span.setAttribute("onpaste", "avoidRichText(this.id)");
        span.setAttribute("onkeypress", "setValueToHTMLAst(event,this.id)");
        span.setAttribute("title", "Double click to edit content");
        span.appendChild(spanTagText);
        list.appendChild(span);
        var i = document.createElement("i");
        i.setAttribute("class", "fa fa-gear context-setting");
        i.setAttribute("title", "right click to view options");
        list.appendChild(i);
        list.setAttribute("onmousedown", "htmlMenu(event,'text','" + idValue + "')");
        list.setAttribute("onContextMenu", "return false");
        return list;
    },
    createTreeView: function (ast) {
        var div = document.createElement("div");
        var rootOl = document.createElement("ol");
        rootOl.setAttribute("id", "htmlmenutree");
        div.appendChild(this.createChildrenRecursive(rootOl, ast));
        return div;
    },
    createChildrenRecursive: function (rootOl, ast) {
        for (var i = 0; i < ast.length; i++) {
            var item = ast[i];
            var ol = document.createElement("ol");
            var li;
            if (item.type == "tag") {
                li = document.createElement("li");
                var label = this.createTreeLable(item.id, item.name, item.attrs);
                var checkbox = this.createCheckbox(item.id);
                li.appendChild(label); li.appendChild(checkbox);
                rootOl.appendChild(li);
            } else if (item.type == "text") {
                li = this.createListText(item.id, item.content);
                rootOl.appendChild(li);
            }
            if (this.hasChild(item)) {
                li.appendChild(this.createChildrenRecursive(ol, item.children));
                rootOl.appendChild(li);
            }
        }
        return rootOl;
    },
    hasChild: function (ast) {
        return (typeof ast.children) != 'undefined';
    }
}

var CSSTreeView = {
    createCheckbox: function (idValue) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", idValue);
        return checkbox;
    },
    createTreeLable: function (idValue, labelText, color) {
        var label = document.createElement("label");
        var spanTagText = document.createTextNode(labelText);
        var parentSpan = document.createElement("span");

        var span = document.createElement("span");
        span.setAttribute("id", "style_" + idValue);
        if (color == "tree-view-tag") {
            span.setAttribute("contenteditable", "true");
            span.setAttribute("onpaste", "avoidRichText(this.id)");
            span.setAttribute("onkeypress", "setValueToCSSAst(event,this.id)");
            span.setAttribute("onmousedown", "stopPropagation(event)");
        }
        span.appendChild(spanTagText);
        if (color != "tree-view-class") {
            span.setAttribute("title", "Double click to edit content");
        }
        span.setAttribute("class", color + " box-shadow");
        parentSpan.appendChild(span);
        label.appendChild(parentSpan);
        label.setAttribute("class", "menu_label");
        label.setAttribute("for", idValue);
        if (color == "tree-view-tag" || color == "tree-view-text") {
            label.setAttribute("onmousedown", "cssMenu(event,'" + idValue + "')");
            label.setAttribute("onContextMenu", "return false");
            var i = document.createElement("i");
            i.setAttribute("class", "fa fa-gear context-setting");
            i.setAttribute("title", "right click to view options");
            label.appendChild(i);
        }
        return label;
    },
    createTreeView: function (ast) {
        var div = document.createElement("div");
        var rootOl = document.createElement("ol");
        rootOl.setAttribute("id", "cssmenutree");
        div.appendChild(this.createChildren(rootOl, ast));
        return div;
    },
    createChildren: function (rootOl, ast) {
        for (var i = 0; i < ast.length; i++) {
            var item = ast[i];
            var ol0 = document.createElement("ol");
            var li0 = document.createElement("li");
            var label0 = this.createTreeLable(item.id, item.cssname, "tree-view-tag");
            var checkbox0 = this.createCheckbox(item.id);

            var drag = document.createElement("span");
            // var dragTagText = document.createTextNode("drag");
            // drag.appendChild(dragTagText);
            drag.setAttribute("class", "cursor-grab drag-ico");
            drag.setAttribute("draggable", "true");
            drag.setAttribute("ondragstart", "dragData(event,'cssname','" + item.cssname + "','style_" + item.id + "')");
            li0.appendChild(drag);
            li0.appendChild(label0); li0.appendChild(checkbox0);
            styles = item.declarations;
            for (var j = 0; j < styles.length; j++) {
                style = styles[j];
                var ol1 = document.createElement("ol");
                var li1 = document.createElement("li");
                var label1 = this.createTreeLable(item.id + "_property_" + j, style.property, "tree-view-text");
                var checkbox1 = this.createCheckbox(item.id + "_property_" + j);
                li1.appendChild(label1); li1.appendChild(checkbox1);
                ol0.appendChild(li1);
                li1.appendChild(ol1);
                var li2 = document.createElement("li");
                var label2 = this.createTreeLable(item.id + "_value_" + j, style.value, "tree-view-class");
                var checkbox2 = this.createCheckbox(item.id + "_value_" + j);
                li2.appendChild(label2); li2.appendChild(checkbox2);
                ol1.appendChild(li2);
            }
            rootOl.appendChild(li0);
            li0.appendChild(ol0);
        }
        return rootOl;
    }
};