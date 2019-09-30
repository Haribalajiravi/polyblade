var css = require('css');
var ast = css.parse('body { font-size: 12px; } .cc { color: red;}', { source: 'source.css' });
var cc = { type: 'declaration',
property: 'font-face',
value: 'Arial'}; 
ast.stylesheet.rules[0].declarations.push(cc);
 console.log('parse/',JSON.stringify(ast));
var css = css.stringify({"type":"stylesheet","stylesheet":{"rules":[{"type":"rule","selectors":[".cc"],"declarations":[{"type": "declaration","property":"","value":""}]},{"type":"rule","selectors":[".cc2"],"declarations":[]}]}});
 console.log('stringify/',css);
//var result = css.stringify(ast, { sourcemap: true });