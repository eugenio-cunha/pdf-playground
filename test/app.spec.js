'use strict';

const app = require('../src/app');
const { ajaxGET } = require('../src/ajaxGET');
const { expect, should } = require('chai');

describe('App', () => {

  before(done => {
    app.listen(process.env.HTTP_PORT, err => {
      should().not.exist(err);

      done();
    });
  })

  it.skip('ping', async () => {
    const { data } = await ajaxGET(`http://localhost:${process.env.HTTP_PORT}/ping`);
    
    expect(data).to.be.deep.equal({ ping: 'pong' });
  })
});