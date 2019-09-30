var express = require('express');
var router = express.Router();
var css_properties = require('./../css_properties');
var htmlHandler = require('./../utils/html_parse_stringify');

router.post('/parse', function (req, res, next) {
    var htmlContent = req.body.html;
    try {
        res.statusCode = 200;
        res.send({ status: 'success', content: htmlHandler.parse(htmlContent) });
    } catch (error) {
        res.statusCode = 400;
        res.send({ status: 'failed', message: error });
    }
});

router.post('/stringify', function (req, res, next) {
    var ast = JSON.parse(req.body.ast);
    try {
        res.statusCode = 200;
        res.send({ status: 'success', content: htmlHandler.stringify(ast) });
    } catch (error) {
        res.statusCode = 400;
        res.send({ status: 'failed', message: error });
    }
});

router.post('/modify', function (req, res, next) {
    var requestBody = req.body;
    var ast = JSON.parse(requestBody.ast);
    var id = requestBody.id;
    var type = requestBody.type;
    var value = requestBody.value
    try {
        res.statusCode = 200;
        var resultAst = htmlHandler.setValueToAST(type, id, value, ast);
        var resultHTML = htmlHandler.stringify(resultAst);
        res.send({ status: 'success', content: { ast: resultAst, html: resultHTML } });
    } catch (error) {
        res.statusCode = 400;
        res.send({ status: 'failed', message: error });
    }
});

module.exports = router;