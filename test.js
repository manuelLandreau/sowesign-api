const fs = require('fs'),
  PDFParser = require('pdf2json'),
  HummusRecipe = require('hummus-recipe'),
  pdfDoc = new HummusRecipe('input.pdf', 'output.pdf'),
  pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError) );
pdfParser.on('pdfParser_dataReady', pdfData => fs.writeFile('./F1040EZ.json', JSON.stringify(pdfData), () => console.log('ok')));

pdfParser.loadPDF('./input.pdf');

// const path = require('path');
// const IMAGE =  path.resolve(__dirname, './test.jpg');
const coord = require('./F1040EZ.json').formImage['Pages'][0]['Texts'][1];

console.log(coord);
pdfDoc
// edit 1st page
  .editPage(1)
  .image('./test.jpg', coord.x, coord.y, {width: 150})
  .text('nom et date', coord.x, coord.y)
  .endPage()
  .endPDF(()=> console.log('ok'));