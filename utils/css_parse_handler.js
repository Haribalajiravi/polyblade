var css = require('css');

var parser = {
    metaData: function (content) {
        return css.parse(content, { source: 'source.css' });
    },
    stringify: function (ast) {
        var AST_FORMAT = {
            type: 'stylesheet',
            stylesheet: {
                rules: []
            }
        };
        for (var i = 0; i < ast.length; i++) {
            var rule = { type: 'rule', selectors: [], declarations: [] };
            var cssname = ast[i].cssname;
            rule.selectors.push(cssname);
            var declarations = ast[i].declarations;
            if (declarations.length == 0) {
                rule.declarations = [{ type: 'declaration', property: '', value: '' }];
            }
            for (var j = 0; j < declarations.length; j++) {
                var declaration = { type: 'declaration', property: '', value: '' };
                declaration.property = declarations[j].property;
                declaration.value = declarations[j].value;
                rule.declarations.push(declaration);
            }
            AST_FORMAT.stylesheet.rules.push(rule);
        }
        var cssStringified = css.stringify(AST_FORMAT);
        return cssStringified.replace(/: ;/g, '');
    },
    pureCSSJSON: function (content) {
        var childId = 0;
        var rules = this.metaData(content).stylesheet.rules;
        return rules.map((rule) => {
            return {
                cssname: rule.selectors[0],
                id: 'css-' + (childId++),
                declarations: rule.declarations.map((declaration) => {
                    return {
                        property: declaration.property,
                        value: declaration.value
                    };
                })
            };
        });
    },
    parsedCSS: function (content) {
        var ast = this.pureCSSJSON(content);
        var classNames = ast.map((item) => {
            var className = item.cssname;
            console.log(className);
            if (className.charAt(0) == '.' && !this.hasDelimiter(className)) {
                return className.substr(1);
            } else {
                return {};
            }
        }).filter(value => Object.keys(value).length !== 0);
        return { classNames: classNames, AST: ast };
    },
    hasDelimiter: function (css) {
        var delimiters = { " ": true, ":": true, ",": true, "#": true, "+": true, "=": true, "*": true, "<": true, ">": true, ".": true };
        for (var i = 0; i < css.length; i++) {
            if (delimiters[css[i]] && css[0] != ".")
                return true;
        }
        return false;
    },
    setValueToAst: function (id, styleValue, ast) {
        return ast.map((item) => {
            datas = id.split("_");
            type = datas[0];
            idValue = datas[1];
            item.cssname = (idValue == item.id) ? styleValue : item.cssname;
            return item;
        });
    }
}

module.exports = parser;
