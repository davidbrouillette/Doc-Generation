const path = require("path");
const fs = require("fs-extra");
const Docco = require("docco");
const file = require("./testfile.js");
// function processFile(file){
//     const reader = new commonmark.Parser();
//     const writer = new commonmark.HtmlRenderer();
//     const parsed = reader.parse(file);
//     const html = writer.render(parsed);
//     fs.outputFileSync("processedFile.txt", html);
//  }


// processFile(require("./testfile"));


function processFile(){
    console.log(Docco.parse(file));

}

processFile();