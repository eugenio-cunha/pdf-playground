'use strict';

const util = require('util');
const http = require('http');
const https = require('https');
const { parse } = require('url');

const request = (url, callback) => {

  const args = parse(url);

  const protocol = args.protocol === 'https' ? https : http;
  const request = protocol.request({
    host: args.host,
    port: args.port,
    path: args.path,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }, res => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', chunk => { data += chunk });
    res.on('end', () => { callback(null, { code: res.statusCode, data: JSON.parse(data) }) });
  });

  request.on('error', err => callback(err));
  request.end();
}

module.exports.ajaxGET = util.promisify(request);