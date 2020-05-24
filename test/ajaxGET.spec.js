'use strict';

const { ajaxGET } = require('../src/ajaxGET');
const { expect, should } = require('chai');

describe('ajaxGET', () => {

    it('GET', async () => {

      const { code, data } = await ajaxGET('https://jsonplaceholder.typicode.com/todos/1');
      
      should().exist(data);
      expect(code).to.be.equal(200);
  }); 
});