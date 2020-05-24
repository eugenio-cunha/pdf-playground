'use strict';

const vm = require('vm');
const path = require('path');
const { ajaxGET } = require('./ajaxGET');
const pdfMakePrinter = require('pdfmake/src/printer');

module.exports = async (src, callback) => {
	let definition;
	try {
		const sandbox = { ajaxGET, PDF: null };
		const script = new vm.Script(src);
		const context = vm.createContext(sandbox);
		script.runInContext(context);
		definition = await sandbox.PDF();

	} catch (err) {
		const syntax = JSON.stringify(err.message);
		const line = err.stack.split('evalmachine.<anonymous>:')[1].substring(0, 1);
		definition = {
			content: [
				{ text: `Line of error: ${line}`, style: 'header', color: 'gray' },
				{ text: `SyntaxError: ${syntax}`, style: 'header', color: 'red' }
			]
		};
	}

	const fontDescriptors = {
		Roboto: {
			normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
			bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
			italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
			bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
		}
	};

	const printer = new pdfMakePrinter(fontDescriptors);
	const doc = printer.createPdfKitDocument(definition);
	const chunks = [];

	doc.on('data', chunk => chunks.push(chunk));
	doc.on('end', () => callback(`data:application/pdf;base64,${Buffer.concat(chunks).toString('base64')}`));
	doc.end();
}