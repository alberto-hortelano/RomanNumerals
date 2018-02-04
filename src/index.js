'use strict';

const romanSimbols = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];

class RomanNumerals {
	constructor (numeral) {
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
			!Number.isInteger(numeral) ||
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
