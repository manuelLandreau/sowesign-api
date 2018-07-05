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