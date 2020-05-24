'use strict';

const path = require('path');
const cors = require('cors');
const build = require('./pdf');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (_, res) => { res.json({ ping: 'pong' }) });

app.post('/pdf', (req, res) => {
	build(req.body.content, b64 => {
		res.contentType('application/pdf');
		res.send(b64);
	}, err => res.send(`ERROR: ${err}`));
});

module.exports = app;