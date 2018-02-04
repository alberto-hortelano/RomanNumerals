'use strict';

const romanSimbols = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
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
		console.log('isValidRoman',numeral);
		const symbolCounter = romanSimbols.reduce((symbolCounter, symbol) => {
			symbolCounter[symbol] = 0;
			return symbolCounter;
		}, {});
		console.log(symbolCounter);
		const nextLetters = romanSimbols;
		numeral.split('').map((letter) => {
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
