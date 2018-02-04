'use strict';

function RomanNumerals(numeral){
}
const romanNumeral = (numeral) => {
	if (numeral === null || numeral === undefined || numeral === '' ) {
		throw new Error('value required');
	} else if (Number.isInteger(numeral) &&
		(numeral < 1 || numeral > 3999)
	) {
		throw new Error('invalid range');
	}
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
