'use strict';
const expect = require('chai').expect;
let folder;
switch (process.env.NODE_ENV) {
	case 'test':
		folder = 'build';
		break;
	default:
		folder = 'src';
}
console.log(process.env.NODE_ENV,folder);
const hi = require(`../${folder}/index`);
describe('Test',() => {
	it('does some test', (done) => {
		expect(hi()).to.equal('hi');
		done();
	});
});
