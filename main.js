
var ethers = require('ethers');
var XLSX = require('xlsx');
var FileSaver = require('file-saver');
// var Blob = require('blob');


walletsNr = 20;

var jsonArr = [];
for (var i = 0; i < walletsNr; i++) {
  var wallet = ethers.Wallet.createRandom();

  privateKey = wallet.privateKey;
  address = wallet.address;
  jsonArr.push({'privateKey': privateKey, 'address': address});
}


var ws = XLSX.utils.json_to_sheet(jsonArr);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "People");

/* write workbook (use type 'binary') */
// var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
var wbout = XLSX.writeFile(wb, "sheetjs.xlsx", {bookType:'xlsx', type:'binary'});

/* generate a download */
function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/*
var b = new Blob([s2ab(wbout)],{type:"application/octet-stream"});

FileSaver.saveAs(b, "sheetjs.xlsx");*/
