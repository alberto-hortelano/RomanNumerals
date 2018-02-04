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
const {RomanNumerals, romanNumeral} = require(`../${folder}/index`);

describe('RomanNumerals',() => {
	it('returns an object if called as function or as class', (done) => {
		const asFunction = romanNumeral(1);
		expect(asFunction).to.be.an.instanceof(RomanNumerals);
		const asClass = new romanNumeral(1);
		expect(asClass).to.be.an.instanceof(RomanNumerals);
		done();
	});
	it('throws "value required" if called without arguments', (done) => {
		expect(() => romanNumeral()).to.throw('value required');
		expect(() => romanNumeral(null)).to.throw('value required');
		expect(() => romanNumeral('')).to.throw('value required');
		done();
	});
});
