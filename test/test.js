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
const invalidValues = [null, '', 0, 1, 3, 4, 5, 'I', 'III', 'IIII', 'IV', 'V', 1968, '1473', 2999, 3000, 10000, 'CDXXIX', 'CD1X',
 'error', 'MCDLXXXII', 'MCMLXXX', 'MMMMCMXCIX', 'MMMMDMXCIX'];
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
	it('throws "invalid range" if the argument is less than 1 or bigger than 3999', (done) => {
		expect(() => romanNumeral(0)).to.throw('invalid range');
		expect(() => romanNumeral(-1)).to.throw('invalid range');
		expect(() => romanNumeral(4000)).to.throw('invalid range');
		done();
	});
	it.only('throws "invalid value" if the argument is not integer or valid roman number', (done) => {
		expect(() => romanNumeral('MMMMDMXCIX')).to.throw('invalid value');
		// expect(() => romanNumeral({})).to.throw('invalid value');
		// expect(() => romanNumeral('string')).to.throw('invalid value');
		done();
	});
});
