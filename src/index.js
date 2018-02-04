'use strict';

function RomanNumerals(numeral){
}
const romanNumeral = (numeral) => {
	if (numeral === null || numeral === undefined || numeral === '' ) {
		throw new Error('value required');
	}
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
