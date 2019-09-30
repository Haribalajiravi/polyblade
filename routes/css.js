var express = require('express');
var router = express.Router();
var css_properties = require('./../css_properties');
var cssHandler = require('./../utils/css_parse_handler');

router.get('/:cssname', function (req, res, next) {
    const cssname = req.params.cssname;
    switch (cssname) {
        case 'text':
            res.render('text', { title: 'Text Properties', text: true }); break;
        case 'font':
            res.render('font', { title: 'Font Properties', font: true }); break;
        case 'margin':
            res.render('margin', { title: 'Margin Properties', margin: true }); break;
        case 'padding':
            res.render('padding', { title: 'Padding Properties', padding: true }); break;
        default:
            res.render('error', { title: 'Error - 404', layout: false });
    }
});

router.post('/parse', function (req, res, next) {
    var cssContent = req.body.css;
    try {
        res.statusCode = 200;
        res.send({ status: 'success', content: cssHandler.parsedCSS(cssContent) });
    } catch (error) {
        res.statusCode = 400;
        res.send({ column: error.column, line: error.line, reason: error.reason });
    }
});

router.post('/stringify', function (req, res, next) {
    var ast = JSON.parse(req.body.ast);
    try {
        res.statusCode = 200;
        res.send({ status: 'success', content: cssHandler.stringify(ast) });
    } catch (error) {
        res.statusCode = 400;
        res.send({ status: 'failed', message: error });
    }
});

router.post('/modify', function (req, res, next) {
    var requestBody = req.body;
    var ast = JSON.parse(requestBody.ast);
    var id = requestBody.id;
    var value = requestBody.value
    try {
        res.statusCode = 200;
        var resultAst = cssHandler.setValueToAst(id, value, ast);
        var resultCSS = cssHandler.stringify(resultAst);
        res.send({ status: 'success', content: { ast: resultAst, css: resultCSS } });
    } catch (error) {
        res.statusCode = 400;
        res.send({ status: 'failed', message: error });
    }
});
module.exports = router;
