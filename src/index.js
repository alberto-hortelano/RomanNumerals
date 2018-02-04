'use strict';

class RomanNumerals {
	constructor (numeral) {
		const romanSimbols = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
		// Sanitize input
		this.sanitize (numeral);
	}

	sanitize (numeral) {
		if (numeral === null || numeral === undefined || numeral === '' ) {
			throw new Error('value required');
		} else if (Number.isInteger(numeral) &&
			(numeral < 1 || numeral > 3999)
		) {
			throw new Error('invalid range');
		} else {
			this.input = numeral;
		}

	}
}
const romanNumeral = (numeral) => {
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
