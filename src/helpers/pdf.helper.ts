const fs = require('fs'),
    PDFParser = require('pdf2json'),
    pdfParser = new PDFParser();

export function extractTags(path) {

    pdfParser.loadPDF(path);

    const data = null;

    pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
    pdfParser.on('pdfParser_dataReady', pdfData => data = pdfData);

    return data.formImage['Pages'][0]['Texts'].filter(text => {
        if (text['R'][0][text].substr(0, 2) === '%23') {
            return {
                x: text.x,
                y: text.y,
                tagName: text.R[1].T
            }
        }
        return false;
    });
}

export function sign(input, signature, coord) {
    let output = {...input};
    pdfDoc = new HummusRecipe(input, output);
    pdfDoc
    // edit 1st page
        .editPage(1)
        .image(signature, coord.x, coord.y, {width: 150})
        .text('nom et date', coord.x, coord.y)
        .endPage()
        .endPDF(()=> console.log('ok'));
}