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
	it('throws "invalid range" if the argument is less than 1 or bigger than 3999', (done) => {
		expect(() => romanNumeral(0)).to.throw('invalid range');
		expect(() => romanNumeral(10000)).to.throw('invalid range');
		done();
	});
	it('throws "invalid value" if the argument is not integer or valid roman number', (done) => {
		expect(() => romanNumeral('IIII')).to.throw('invalid value');
		expect(() => romanNumeral('CD1X')).to.throw('invalid value');
		expect(() => romanNumeral('MMMMCMXCIX')).to.throw('invalid value');
		expect(() => romanNumeral('MMMMDMXCIX')).to.throw('invalid value');
		expect(() => romanNumeral('1473')).to.throw('invalid value');
		expect(() => romanNumeral('error')).to.throw('invalid value');
		done();
	});
	it('converts roman to int', (done) => {
		expect(romanNumeral('MCMXCV').toInt()).to.equal(1995);
		expect(romanNumeral(1995).toInt()).to.equal(1995);

		expect(romanNumeral('I').toInt()).to.equal(1);
		expect(romanNumeral('III').toInt()).to.equal(3);
		expect(romanNumeral('IV').toInt()).to.equal(4);
		expect(romanNumeral('V').toInt()).to.equal(5);
		expect(romanNumeral('CDXXIX').toInt()).to.equal(429);
		expect(romanNumeral('MCMLXXX').toInt()).to.equal(1980);
		expect(romanNumeral('MCDLXXXII').toInt()).to.equal(1482);
		done();
	});
	it('converts int to roman', (done) => {
		expect(romanNumeral('MCMXCV').toString()).to.equal('MCMXCV');
		expect(romanNumeral(3995).toString()).to.equal('MMMCMXCV');
		expect(romanNumeral(429).toString()).to.equal('CDXXIX');

		expect(romanNumeral(1).toString()).to.equal('I');
		expect(romanNumeral(3).toString()).to.equal('III');
		expect(romanNumeral(4).toString()).to.equal('IV');
		expect(romanNumeral(5).toString()).to.equal('V');
		expect(romanNumeral(1968).toString()).to.equal('MCMLXVIII');
		expect(romanNumeral(2999).toString()).to.equal('MMCMXCIX');
		expect(romanNumeral(3000).toString()).to.equal('MMM');
		done();
	});
});
