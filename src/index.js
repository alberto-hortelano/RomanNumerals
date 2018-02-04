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
/**
 * RomanNumerals
 * library for converting between arabic and roman numbers
 */
class RomanNumerals {
	constructor (numeral) {
		// Sanitize input
		this.sanitize (numeral);
	}
	/**
	 * sanitize
	 * Makes sure that the input is correct
	 */
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
				!this.isValidRoman(numeral)
			)
		) {
			throw new Error('invalid value');
		} else {
			this.input = numeral;
		}
	}
	/**
	 * toOneChar
	 * Converts two letters convinations in one letter
	 * it uses the second letter as lower
	 */
	toOneChar (numeral) {
		// change two character symbols for one lower letter
		Object.keys(twoSimbols).forEach((symbol) => {
			numeral = numeral.replace(symbol, twoSimbols[symbol]);
		});
		return numeral;
	}
	/**
	 * toTwoChars
	 * Converts back to two letter symbols
	 */
	toTwoChars (numeral) {
		// change one lower letter symbols for two characters
		Object.keys(twoSimbols).forEach((symbol) => {
			numeral = numeral.replace(twoSimbols[symbol], symbol);
		});
		return numeral;
	}
	/**
	 * isValidRoman
	 * Checks if the input is a valid roman number
	 */
	isValidRoman (numeral) {
		let isValid = true;
		// Only valid symbols
		numeral.split('').forEach((letter) => {
			if (originalSymbols.indexOf(letter) < 0) {
				isValid = false;
			}
		});
		// change two character symbols for one lower letter
		numeral = this.toOneChar(numeral);
		// clone maxRepeat
		const nextValid = JSON.parse(JSON.stringify(maxRepeat));
		// Check that the input is legal
		numeral.split('').forEach((letter) => {
			// Invalidate bigger symbols than current letter
			romanSymbols.slice(0,romanSymbols.indexOf(letter)).forEach(symbol => {
				nextValid[symbol] = 0;
			});
			// Reduce in one ramining uses of current letter
			nextValid[letter]--;
			// current letter is not legal
			if (nextValid[letter] < 0) {
				isValid = false;
			}
		});
		return isValid;
	}
	/**
	 * toInt
	 * Transforms the input into an integer
	 */
	toInt () {
		// return input if it's already an integer
		if (Number.isInteger(this.input)) {
			return this.input;
		}
		let result = 0;
		// change two character symbols for one lower letter
		const oneChar = this.toOneChar(this.input);
		// Add to result the value of each symbol
		oneChar.split('').forEach(symbol => {
			result += symbolValues[symbol];
		});
		return result;
	}
	/**
	 * toString
	 * Transform the input into a roman number
	 */
	toString () {
		// return input if it's already a roman number
		if (typeof this.input === 'string' || this.input instanceof String) {
			return this.input;
		}
		let result = '';
		// remaining value to convert
		let remaining = this.input;
		romanSymbols.forEach(symbol => {
			// Times to repeat current letter
			const amount = Math.floor(remaining / symbolValues[symbol]);
			// Add letters to result
			result += Array(amount+1).join(symbol);
			// remove added value from remaining
			remaining -= symbolValues[symbol] * amount;
		});
		return this.toTwoChars(result);
	}
}
const romanNumeral = (numeral) => {
	// always return an instance
	return new RomanNumerals(numeral);
}

module.exports = {
	RomanNumerals,
	romanNumeral,
};
