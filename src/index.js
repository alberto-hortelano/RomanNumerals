'use strict';
const originalSymbols = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
const romanSymbols = ['M', 'm', 'D', 'd', 'C', 'c', 'L', 'l', 'X', 'x', 'V', 'v', 'I'];
const symbolValues = {
	M: 1000,
  m: 900,
  D: 500,
  d: 400,
  C: 100,
  c: 90,
  L: 50,
  l: 40,
  X: 10,
  x: 9,
  V: 5,
  v: 4,
  I: 1
};
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
};
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
		// Sanitize input
		this.sanitize (numeral);
	}

	sanitize (numeral) {
	console.log('sanitize',numeral);
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
				!this.isValidRoman(numeral)
			)
		) {
			throw new Error('invalid value');
		} else {
			this.input = numeral;
			console.log('is valid',numeral);
		}

	}
	toOneChar (numeral) {
		// change two character symbols for one lower letter
		Object.keys(twoSimbols).forEach((symbol) => {
			numeral = numeral.replace(symbol, twoSimbols[symbol]);
		});
		return numeral;
	}
	isValidRoman (numeral) {
		let isValid = true;
		// Only valid symbols
		numeral.split('').forEach((letter) => {
			if (originalSymbols.indexOf(letter) < 0) {
				isValid = false;
			}
		});
		numeral = this.toOneChar(numeral);
		const nextValid = JSON.parse(JSON.stringify(maxRepeat));
		const remainingSymbols = romanSymbols;
		numeral.split('').forEach((letter) => {
			// Invalidate bigger symbols
			// console.log(letter,nextValid);
			romanSymbols.slice(0,romanSymbols.indexOf(letter)).forEach(symbol => {
				nextValid[symbol] = 0;
			});
			// Reduce in one ramining uses of this letter
			nextValid[letter]--;
			if (nextValid[letter] < 0) {
				isValid = false;
			}
			// console.log(letter,isValid);
		});
		return isValid;
	}
	toInt () {
		console.log('toInt',this.input);
		const oneChar = this.toOneChar(this.input);
		let result = 0;
		oneChar.split('').forEach(symbol => {
			console.log(symbol,result);
			result += symbolValues[symbol];
		});
		return result;
	}
}
const romanNumeral = (numeral) => {
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
