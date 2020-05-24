'use strict';

const build = require('../src/pdf');
const { expect } = require('chai');

describe('PDF', () => {

  it('build', done => {
    build(`async PDF() { return { content: [{text: 'TDD'}] } }`, b64 => {
      
      expect(b64).to.be.contain('data:application/pdf;base64')
      done();
    })
  })
});