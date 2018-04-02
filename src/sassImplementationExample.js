import sass from 'sass.js'; // https://github.com/medialize/sass.js/

var css             = ".selector { color: red; } .selector2 { bg-color: red; }";
var elementID       = "element1";
var elementSelector = "#"+elementID;
var data            = elementSelector + "{ " + css + "}";

var val = sass.compile(data, printValue);

function printValue(res) {
  if(res.status == 0) {
    document.write("data: "+data+"<br />status: "+res.status+"<br />text: "+res.text);
  } else {
    document.write("error occured");
  }
  
}