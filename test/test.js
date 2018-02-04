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
const {RomanNumerals, romanNumerals} = require(`../${folder}/index`);

describe('RomanNumerals',() => {
	it('returns an object if called as function or as class', (done) => {
		const asFunction = romanNumerals();
		expect(asFunction).to.be.an.instanceof(RomanNumerals);
		const asClass = new romanNumerals();
		expect(asClass).to.be.an.instanceof(RomanNumerals);
		done();
	});
});
