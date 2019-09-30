var HTML = require('html-parse-stringify');

var html = {
    childID: 0,
    parse: function (html_content) {
        return this.setChildID(HTML.parse(html_content));
    },
    stringify: function (ast) {
        return HTML.stringify(ast);
    },
    hasChild: function (ast) {
        return (typeof ast.children) != 'undefined';
    },
    setChildID: function (ast) {
        this.childID = 0;
        return this.setChildIDRecursion(ast);
    },
    setChildIDRecursion: function (ast) {
        return ast.map(item => {
            item.id = 'child-' + (this.childID++);
            if (item.type == 'text') {
                item.content = item.content.trim();
                if (item.content == '') {
                    return {};
                }
            }
            if (this.hasChild(item)) {
                item.children = this.setChildIDRecursion(item.children);
            }
            return item;
        }).filter(value => Object.keys(value).length !== 0);
    },
    hasId: function (ast) {
        return (typeof ast.id) != 'undefined';
    },
    setValueToAST: function (type, id, value, ast) {
        return this.setValueRecursion(ast, type, id, value);
    },
    setValueRecursion: function (ast, type, id, value) {
        return ast.map(item => {
            if (item.type == type && item.id == id) {
                if (item.type == 'tag') {
                    item.name = value;
                }
                if (item.type == 'text') {
                    item.content = value;
                }
            }
            if (this.hasChild(item)) {
                item.children = this.setValueRecursion(item.children, type, id, value);
            }
            return item;
        });
    }
};

module.exports = html;