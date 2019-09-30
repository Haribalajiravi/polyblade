var CSS_DELAY_OFFSET = true;
var HTML_DELAY_OFFSET = true;
var HTML_TREEVIEW_ENABLE = true;
var CSS_TREEVIEW_ENABLE = true;
var HTML_AST = [];
var CSS_AST = [];
var CSS = [];
var HTML_CSS_METADATA = {};
var selectedHTMLElementId = '';
var selectedHtmlMetadata = {};
var selectedCssStyleId = '';

document.getElementById('samplePreview').src = "data:text/html;charset=utf-8," + "<p>You preview shows here</p>";

var cssEditorOnchange = function () {
    var cssStatus = document.getElementById('css_status');
    var healthyStatus = setStatusLabel("info-text", "fa-gear fa-spin", " WAITING: your style processing...");
    cssStatus.innerHTML = "";
    cssStatus.appendChild(healthyStatus);
    postRequest(conPath + '/css/parse', { css: getCSSContent() }, function (result) {
        console.log('/css/parse', result);
        CSS = result.content.classNames;
        CSS_AST = result.content.AST;
        if (CSS_TREEVIEW_ENABLE) {
            setAStToTreeView(CSS_AST, "css-tree", CSSTreeView);
        }
        CSS_TREEVIEW_ENABLE = true;

        /* CSS select option functionality on HTML tree view */
        addCssSelectOption(CSS);
        updateChangeClassToMetadata(CSS);
        //updateHtmlCssTreeView(HTML_AST);

        var healthyStatus = setStatusLabel("success-text", "fa-check", " SUCCESS: your style is healthy");
        cssStatus.innerHTML = "";
        cssStatus.appendChild(healthyStatus);
    }, "json").fail(function () {
        var errorStatus = setStatusLabel("error-text", "fa-exclamation-triangle", " ERROR: Not supported, no longer your style is usable");
        cssStatus.innerHTML = "";
        cssStatus.appendChild(errorStatus);
    });
}

var htmlEditorOnchange = function () {
    var htmlStatus = document.getElementById('html_status');
    var healthyStatus = setStatusLabel("info-text", "fa-gear fa-spin", " WAITING: your style processing...");
    htmlStatus.innerHTML = "";
    htmlStatus.appendChild(healthyStatus);
    postRequest(conPath + '/html/parse', { html: getHTMLContent() }, function (result) {
        console.log('/html/parse', result);
        HTML_AST = result.content;
        if (HTML_TREEVIEW_ENABLE) {
            setAStToTreeView(HTML_AST, "html-tree", HTMLTreeView);
        }
        HTML_TREEVIEW_ENABLE = true;
        var healthyStatus = setStatusLabel("success-text", "fa-check", " SUCCESS: your skeleton is healthy");
        htmlStatus.innerHTML = "";
        htmlStatus.appendChild(healthyStatus);
    }, 'json').fail(function () {
        var errorStatus = setStatusLabel("error-text", "fa-exclamation-triangle", " ERROR: Not supported, your skeleton is broken");
        htmlStatus.innerHTML = "";
        htmlStatus.appendChild(errorStatus);
    });;
}

var reInitTreeView = function (htmlTree) {
    while (htmlTree.hasChildNodes()) {
        htmlTree.removeChild(htmlTree.lastChild);
    }
}

var setAStToTreeView = function (AST, treeId, TreeViewOBJ) {
    var tree = document.getElementById(treeId);
    reInitTreeView(tree);
    if (AST.length > 0) {
        var treeDOM = TreeViewOBJ.createTreeView(AST);
        tree.appendChild(treeDOM);
    } else {
        var span = document.createElement('span');
        var spanText = document.createTextNode("your tree view here");
        span.appendChild(spanText);
        span.setAttribute("class", "no-content-tree-view");
        tree.appendChild(span);
    }
}

var setValueToHTMLAst = function (e, idValue) {
    onKeyCodeAction(e, 13, function () {
        var inputs = idValue.split("_");
        var type = inputs[0];
        var id = inputs[1];
        var value = document.getElementById(idValue).innerText;
        postRequest(conPath + '/html/modify', { ast: JSON.stringify(HTML_AST), id: id, type: type, value: value }, function (result) {
            console.log('/html/modify', result);
            HTML_AST = result.content.ast;
            var html = result.content.html;
            HTML_TREEVIEW_ENABLE = false;
            setHTMLContent(html);
            generatePreviewContent();
        }, 'json');
    });
}

var setValueToCSSAst = function (e, idValue) {
    onKeyCodeAction(e, 13, function () {
        var value = document.getElementById(idValue).innerText;
        postRequest(conPath + '/css/modify', { ast: JSON.stringify(CSS_AST), id: idValue, value: value }, function (result) {
            console.log('/css/modify', result);
            CSS_AST = result.content.ast;
            var css = result.content.css;
            CSS_TREEVIEW_ENABLE = false;
            setCSSContent(css);
            generatePreviewContent();
        }, 'json');
    });
}

var cssMenu = function (event, id) {
    var cm = document.getElementById("cssContextMenu");
    selectedCssStyleId = id;
    console.log(event);
    if (event.button === 2) {
        cm.style.display = "block";
        cm.style.left = event.pageX + "px";
        cm.style.top = event.pageY + "px";
    } else {
        cm.style.display = "none";
    }
    event.preventDefault();
}

var htmlMenu = function (e, type, id) {
    selectedHTMLElementId = id;
    var cm = document.getElementById("htmlContextMenu");
    console.log(e);
    if (type == "tag") {
        $('#addTag').removeClass("hide");
        $('#addText').removeClass("hide");
        if (CSS.length > 0) {
            $('#addClass').removeClass("hide");
            $('#removeClass').removeClass("hide");
            selectedHtmlMetadata = getSelectedHtmlCssMetadata();
            if (selectedHtmlMetadata.remainingCSS.length == 0 && selectedHtmlMetadata.insertedCSS.length == 0) {
                addCssSelectOption(CSS);
            } else {
                addCssSelectOption(selectedHtmlMetadata.remainingCSS);
            }
            removeCssSelectOption(selectedHtmlMetadata.insertedCSS);
        } else {
            $('#addClass').addClass("hide");
            $('#removeClass').addClass("hide");
        }
    } else if (type == "text") {
        $('#addTag').addClass("hide");
        $('#removeClass').addClass("hide");
        $('#addText').addClass("hide");
        $('#addClass').addClass("hide");
    }
    if (e.button === 2) {
        cm.style.display = "block";
        cm.style.left = e.pageX + "px";
        cm.style.top = e.pageY + "px";
    } else {
        cm.style.display = "none";
    }
    e.preventDefault();
}

var setPreview = function (content) {
    document.getElementById('samplePreview').src = "data:text/html;charset=utf-8," + escape(content);
}

var generatePreviewContent = function () {
    var header = "<head><title>Sample Preview</title><style>" + getCSSContent() + "</style></head>";
    var body = "<body>" + getHTMLContent() + "</body>";
    var html = "<html>" + header + body + "</html>";
    setPreview(html);
}

css_editor.getSession().on('change', function () {
    generatePreviewContent();
    if (CSS_DELAY_OFFSET) {
        setTimeout(function () {
            cssEditorOnchange();
            CSS_DELAY_OFFSET = true;
        }, 1000);
        CSS_DELAY_OFFSET = false;
    }
});

html_editor.getSession().on('change', function () {
    generatePreviewContent();
    if (HTML_DELAY_OFFSET) {
        setTimeout(function () {
            htmlEditorOnchange();
            HTML_DELAY_OFFSET = true;
        }, 1000);
        HTML_DELAY_OFFSET = false;
    }
});

var createOption = function (optionText) {
    var option = document.createElement("option");
    var optionTagText = document.createTextNode(optionText);
    option.setAttribute("value", optionText);
    option.appendChild(optionTagText);
    return option;
}

var createSelect = function (optionArray) {
    var select = document.createElement("select");
    if (optionArray.length == 0) {
        var option = createOption("no item");
    } else {
        var option = createOption("select item");
    }
    option.setAttribute("selected", "true");
    option.setAttribute("disabled", "disabled");
    select.appendChild(option);
    for (var i = 0; i < optionArray.length; i++) {
        select.appendChild(createOption(optionArray[i]));
    }
    return select;
}

var updateHTML = function (HTML_AST) {
    return postRequest(conPath + '/html/stringify', { ast: JSON.stringify(HTML_AST) }, function (result) {
        console.log('/html/stringify', result);
        var html = result.content;
        setHTMLContent(html);
    });
}

var updateCSS = function (HTML_AST) {
    return postRequest(conPath + '/css/stringify', { ast: JSON.stringify(CSS_AST) }, function (result) {
        console.log('/css/stringify', result);
        var css = result.content;
        setCSSContent(css);
    });
}

var hasChild = function (ast) {
    return (typeof ast.children) != 'undefined';
}

var removeCssRecursion = function (ast) {
    return ast.map((item) => {
        var existingClass = (item.type == "tag" && typeof item.attrs.class != "undefined") ? item.attrs.class : "";
        var classes = existingClass.split(" ");
        var updatedClasses = "";
        if (classes.length > 0 && CSS.includes(classes[0])) {
            updatedClasses += classes[0];
            for (var i = 1; i < classes.length; i++) {
                if (CSS.includes(classes[i])) {
                    updatedClasses += (" " + classes[i]);
                }
            }
        }
        if (item.type == "tag" && typeof item.attrs.class != "undefined") {
            item.attrs.class = updatedClasses;
        }
        if (this.hasChild(item)) {
            item.children = this.removeCssRecursion(item.children);
        }
        return item;
    });
}

// no use until now
var updateHtmlCssTreeView = function (ast) {
    HTML_AST = removeCssRecursion(ast);
    updateHTML(HTML_AST);
}

var setClassRecursion = function (ast, selectedValue, id) {
    return ast.map((item) => {
        if (item.id == id) {
            var existingClass = (item.type == "tag" && typeof item.attrs.class != "undefined") ? item.attrs.class : "";
            if (existingClass.length > 0) {
                var updatedClasses = existingClass + " " + selectedValue;
            } else {
                var updatedClasses = selectedValue;
            }
            item.attrs = { class: updatedClasses };
        }
        if (this.hasChild(item)) {
            item.children = this.setClassRecursion(item.children, selectedValue, id);
        }
        return item;
    });
}

var removeClassRecursion = function (ast, selectedValue, id) {
    return ast.map((item) => {
        if (item.id == id) {
            var classArray = item.attrs.class.split(" ");
            var updatedClasses = "";
            for (var i = 0; i < classArray.length; i++) {
                if (classArray[i] != selectedValue) {
                    updatedClasses += (classArray[i] + " ");
                }
            }
            updatedClasses = updatedClasses.trim();
            if (updatedClasses.length > 0) {
                item.attrs = { class: updatedClasses };
            } else {
                item.attrs = {};
            }
        }
        if (this.hasChild(item)) {
            item.children = this.removeClassRecursion(item.children, selectedValue, id);
        }
        return item;
    });
}

var setClassToHTML = function () {
    var selectedValue = document.getElementById('addClassNames').value;
    console.log(selectedHTMLElementId);
    HTML_AST = setClassRecursion(HTML_AST, selectedValue, selectedHTMLElementId);
    updateHTML(HTML_AST);
    updateHtmlCssMetadata(selectedValue);
    hideContextMenu("htmlContextMenu");
}

var dropClassToHTML = function (dropElementId, dropData) {
    dropData = dropData.replace(".", "");
    dropElementId = dropElementId.split("_")[1];
    console.log(dropElementId);
    console.log(dropData);
    HTML_AST = setClassRecursion(HTML_AST, dropData, dropElementId);
    updateHTML(HTML_AST);
    updateHtmlCssMetadata(dropData);
    hideContextMenu("htmlContextMenu");
}

var removeClassFromHTML = function () {
    var selectedValue = document.getElementById('removeClassNames').value;
    HTML_AST = removeClassRecursion(HTML_AST, selectedValue, selectedHTMLElementId);
    updateHTML(HTML_AST);
    HTML_CSS_METADATA[selectedHTMLElementId][selectedValue] = false;
    hideContextMenu("htmlContextMenu");
}

var addCssSelectOption = function (css_array) {
    var select = createSelect(css_array);
    select.setAttribute("id", "addClassNames");
    select.setAttribute("class", "dispiblk p5px m5px w95per b0px");
    select.setAttribute("title", "select class");
    select.setAttribute("onchange", "setClassToHTML()");
    document.getElementById("addClassDropDown").innerHTML = "";
    var classDropdown = document.getElementById("addClassDropDown");
    classDropdown.appendChild(select);
}

var removeCssSelectOption = function (css_array) {
    var select = createSelect(css_array);
    select.setAttribute("id", "removeClassNames");
    select.setAttribute("class", "dispiblk p5px m5px w95per b0px");
    select.setAttribute("title", "select class");
    select.setAttribute("onchange", "removeClassFromHTML()");
    document.getElementById("removeClassDropDown").innerHTML = "";
    var classDropdown = document.getElementById("removeClassDropDown");
    classDropdown.appendChild(select);
}

var updateHtmlCssMetadata = function (css_value) {
    if (typeof HTML_CSS_METADATA[selectedHTMLElementId] == "undefined") {
        var css_keys = {};
        for (var i = 0; i < CSS.length; i++) {
            css_keys[CSS[i]] = false;
            HTML_CSS_METADATA[selectedHTMLElementId] = css_keys;
        }
    }
    HTML_CSS_METADATA[selectedHTMLElementId][css_value] = true;
}

var getSelectedHtmlCssMetadata = function () {
    var insertedCSS = []; var remainingCSS = [];
    if (typeof HTML_CSS_METADATA[selectedHTMLElementId] != "undefined") {
        css_array = Object.keys(HTML_CSS_METADATA[selectedHTMLElementId]);
        for (var i = 0; i < css_array.length; i++) {
            if (HTML_CSS_METADATA[selectedHTMLElementId][css_array[i]]) {
                insertedCSS.push(css_array[i]);
            } else {
                remainingCSS.push(css_array[i]);
            }
        }
    }
    return { insertedCSS: insertedCSS, remainingCSS: remainingCSS };
}

var updateChangeClassToMetadata = function (css_array) {
    var html_ids = Object.keys(HTML_CSS_METADATA);
    for (var j = 0; j < html_ids.length; j++) {
        var css_keys = HTML_CSS_METADATA[html_ids[j]];
        for (var i = 0; i < CSS.length; i++) {
            if (typeof HTML_CSS_METADATA[html_ids[j]][CSS[i]] == "undefined") {
                css_keys[CSS[i]] = false;
                HTML_CSS_METADATA[html_ids[j]] = css_keys;
            }
        }
        var css_keys_arr = Object.keys(css_keys);
        for (var i = 0; i < css_keys_arr.length; i++) {
            if (!CSS.includes(css_keys_arr[i])) {
                delete HTML_CSS_METADATA[html_ids[j]][css_keys_arr[i]];
            }
        }
    }
}

var deleteHTMLRescursion = function (ast, id) {
    return ast.map(item => {
        if (item.id == id) {
            return {};
        }
        if (this.hasChild(item)) {
            item.children = this.deleteHTMLRescursion(item.children, id);
        }
        return item;
    }).filter(value => Object.keys(value).length !== 0);
}

var deleteElement = function () {
    var childId = selectedHTMLElementId;
    HTML_AST = deleteHTMLRescursion(HTML_AST, childId);
    updateHTML(HTML_AST);
    hideContextMenu("htmlContextMenu");
}

var deleteStyle = function () {
    var cssId = selectedCssStyleId;
    console.log(cssId);
    if (cssId.includes("property")) {
        idValues = cssId.split("_");
        property_index = parseInt(idValues[2]);
        CSS_AST = CSS_AST.map(item => {
            item.declarations = item.declarations.filter((value, index) => {
                return index != property_index;
            });
            return item;
        });
    } else {
        CSS_AST = CSS_AST.map(item => {
            return (item.id == cssId) ? {} : item;
        }).filter(value => Object.keys(value).length !== 0);
        console.log(CSS_AST);
    }
    updateCSS(CSS_AST);
    hideContextMenu("cssContextMenu");
}

$('#addTextContent').on("keypress", function (e) {
    if (e.keyCode == 13) {
        addTextToTag();
        return false; // prevent the button click from happening
    }
});

var addElementRecursion = function (ast, id, content, type) {
    return ast.map(item => {
        if (item.id == id) {
            if (this.hasChild(item)) {
                item.children.push({ type: type, content: content });
            } else {
                item.children = [{ type: type, content: content }];
            }
        }
        if (this.hasChild(item)) {
            item.children = this.addElementRecursion(item.children, id, content, type);
        }
        return item;
    });
}

var addTextToTag = function () {
    var childId = selectedHTMLElementId;
    var content = document.getElementById("addTextContent").value;
    HTML_AST = addElementRecursion(HTML_AST, childId, content, "text");
    updateHTML(HTML_AST);
    hideContextMenu("htmlContextMenu");
}

var copyTagSet = function () {
    var htmlContent = document.getElementById("tag").innerHTML;
    var select = document.createElement("select");
    select.setAttribute("class", "dispiblk p5px m5px w95per b0px");
    select.setAttribute("onchange", "addTag()");
    select.setAttribute("id", "addHTMLTag");
    select.innerHTML = htmlContent;
    document.getElementById("addTagDropDown").appendChild(select);
}

copyTagSet();

var addTag = function () {
    var selectTag = document.getElementById("addHTMLTag").value;
    var childId = selectedHTMLElementId;
    var tag = "<" + selectTag + ">" + tagJSON[selectTag] + "</" + selectTag + ">";
    HTML_AST = addElementRecursion(HTML_AST, childId, tag, "text");
    updateHTML(HTML_AST);
    hideContextMenu("htmlContextMenu");
}