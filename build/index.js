'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var originalSymbols = ['M', 'D', 'C', 'L', 'X', 'V', 'I'];
var romanSymbols = ['M', 'm', 'D', 'd', 'C', 'c', 'L', 'l', 'X', 'x', 'V', 'v', 'I'];
var symbolValues = {
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
var maxRepeat = {
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
var twoSimbols = {
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

var RomanNumerals = function () {
	function RomanNumerals(numeral) {
		_classCallCheck(this, RomanNumerals);

		// Sanitize input
		this.sanitize(numeral);
	}
	/**
  * sanitize
  * Makes sure that the input is correct
  */


	_createClass(RomanNumerals, [{
		key: 'sanitize',
		value: function sanitize(numeral) {
			// Empty input
			if (numeral === null || numeral === undefined || numeral === '') {
				throw new Error('value required');
				// Out of range
			} else if (Number.isInteger(numeral) && (numeral < 1 || numeral > 3999)) {
				throw new Error('invalid range');
				// Invalid value
			} else if (!Number.isInteger(numeral) && (typeof numeral === 'string' || numeral instanceof String) && !this.isValidRoman(numeral)) {
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

	}, {
		key: 'toOneChar',
		value: function toOneChar(numeral) {
			// change two character symbols for one lower letter
			Object.keys(twoSimbols).forEach(function (symbol) {
				numeral = numeral.replace(symbol, twoSimbols[symbol]);
			});
			return numeral;
		}
		/**
   * toTwoChars
   * Converts back to two letter symbols
   */

	}, {
		key: 'toTwoChars',
		value: function toTwoChars(numeral) {
			// change one lower letter symbols for two characters
			Object.keys(twoSimbols).forEach(function (symbol) {
				numeral = numeral.replace(twoSimbols[symbol], symbol);
			});
			return numeral;
		}
		/**
   * isValidRoman
   * Checks if the input is a valid roman number
   */

	}, {
		key: 'isValidRoman',
		value: function isValidRoman(numeral) {
			var isValid = true;
			// Only valid symbols
			numeral.split('').forEach(function (letter) {
				if (originalSymbols.indexOf(letter) < 0) {
					isValid = false;
				}
			});
			// change two character symbols for one lower letter
			numeral = this.toOneChar(numeral);
			// clone maxRepeat
			var nextValid = JSON.parse(JSON.stringify(maxRepeat));
			// Check that the input is legal
			numeral.split('').forEach(function (letter) {
				// Invalidate bigger symbols than current letter
				romanSymbols.slice(0, romanSymbols.indexOf(letter)).forEach(function (symbol) {
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

	}, {
		key: 'toInt',
		value: function toInt() {
			// return input if it's already an integer
			if (Number.isInteger(this.input)) {
				return this.input;
			}
			var result = 0;
			// change two character symbols for one lower letter
			var oneChar = this.toOneChar(this.input);
			// Add to result the value of each symbol
			oneChar.split('').forEach(function (symbol) {
				result += symbolValues[symbol];
			});
			return result;
		}
		/**
   * toString
   * Transform the input into a roman number
   */

	}, {
		key: 'toString',
		value: function toString() {
			// return input if it's already a roman number
			if (typeof this.input === 'string' || this.input instanceof String) {
				return this.input;
			}
			var result = '';
			// remaining value to convert
			var remaining = this.input;
			romanSymbols.forEach(function (symbol) {
				// Times to repeat current letter
				var amount = Math.floor(remaining / symbolValues[symbol]);
				// Add letters to result
				result += Array(amount + 1).join(symbol);
				// remove added value from remaining
				remaining -= symbolValues[symbol] * amount;
			});
			return this.toTwoChars(result);
		}
	}]);

	return RomanNumerals;
}();

var romanNumeral = function romanNumeral(numeral) {
	// always return an instance
	return new RomanNumerals(numeral);
};

module.exports = {
	RomanNumerals: RomanNumerals,
	romanNumeral: romanNumeral
};