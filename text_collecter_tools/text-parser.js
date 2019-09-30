var fs = require('fs');
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('text.txt')
});

var datas = []; 
lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  var data = {} ;
  var vals = line.split("	");
  data.value = vals[0] ;
  data.description = vals[1] ;
  datas.push(data);
});

setTimeout(function() {
		console.log("datas = > ", datas);
		var cc = JSON.stringify(datas);
		    fs.writeFile('datas.json', cc, 'utf8', function() {

		    });
}, 3000);