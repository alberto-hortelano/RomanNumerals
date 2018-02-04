'use strict';

const romanSymbols = ['M', 'm', 'D', 'd', 'C', 'c', 'L', 'l', 'X', 'x', 'V', 'v', 'I'];
const maxRepeat = {
	M: 3,
  m: 1,
  D: 3,
  d: 1,
  C: 3,
  c: 1,
  L: 3,
  l: 1,
  X: 3,
  x: 1,
  V: 3,
  v: 1,
  I: 3
}
const twoSimbols = {
	'CM': 'm',
	'CD': 'd',
	'XC': 'c',
	'XL': 'l',
	'IX': 'x',
	'IV': 'v'
};

class RomanNumerals {
	constructor (numeral) {
		console.log('constructor');
		// Sanitize input
		this.sanitize (numeral);
	}

	sanitize (numeral) {
		// Empty input
		if (numeral === null || numeral === undefined || numeral === '' ) {
			throw new Error('value required');
		// Out of range
		} else if (
			Number.isInteger(numeral) &&
			(numeral < 1 || numeral > 3999)
		) {
			throw new Error('invalid range');
		// Invalid value
		} else if (
			!Number.isInteger(numeral) &&
			(
				(typeof numeral === 'string' || numeral instanceof String) &&
				this.isValidRoman(numeral)
			)
		) {

		} else {
			this.input = numeral;
		}

	}
	isValidRoman (numeral) {
		const errorText = 'invalid value';
		// change two character symbols for one lower letter
		Object.keys(twoSimbols).forEach((symbol) => {
			numeral = numeral.replace(symbol, twoSimbols[symbol]);
		});
		const nextValid = maxRepeat;
		const remainingSymbols = romanSymbols;
		numeral.split('').forEach((letter) => {
			// Invalidate bigger symbols
			romanSymbols.slice(0,romanSymbols.indexOf(letter)).forEach(symbol => {
				console.log(symbol);
				nextValid[symbol] = 0;
			});
			// Reduce in one ramining uses of this letter
			nextValid[letter]--;
			if (nextValid[letter] === 0) {
				throw new Error(errorText);
			}
			console.log(letter);
		});
		return true;
	}
}
const romanNumeral = (numeral) => {
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
