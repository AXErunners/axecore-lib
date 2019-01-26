/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

var _ = require('lodash');
var constants = require('../constants');

/**
 * Determines whether a string contains only hexadecimal values
 *
 * @name JSUtil.isHexa
 * @param {string} value
 * @return {boolean} true if the string is the hex representation of a number
 */
var isHexa = function isHexa(value) {
  if (!_.isString(value)) {
    return false;
  }
  return /^[0-9a-fA-F]+$/.test(value);
};

/**
 * @namespace JSUtil
 */
module.exports = {
  /**
   * Test if an argument is a valid JSON object. If it is, returns a truthy
   * value (the json object decoded), so no double JSON.parse call is necessary
   *
   * @param {string} arg
   * @return {Object|boolean} false if the argument is not a JSON string.
   */
  isValidJSON: function isValidJSON(arg) {
    var parsed;
    if (!_.isString(arg)) {
      return false;
    }
    try {
      parsed = JSON.parse(arg);
    } catch (e) {
      return false;
    }
    if (typeof(parsed) === 'object') {
      return true;
    }
    return false;
  },
  isHexa: isHexa,
  isHexaString: isHexa,

  /**
   * Clone an array
   */
  cloneArray: function(array) {
    return [].concat(array);
  },

  /**
   * Define immutable properties on a target object
   *
   * @param {Object} target - An object to be extended
   * @param {Object} values - An object of properties
   * @return {Object} The target object
   */
  defineImmutable: function defineImmutable(target, values) {
    Object.keys(values).forEach(function(key){
      Object.defineProperty(target, key, {
        configurable: false,
        enumerable: true,
        value: values[key]
      });
    });
    return target;
  },
  /**
   * Checks that a value is a natural number, a positive integer or zero.
   *
   * @param {*} value
   * @return {Boolean}
   */
  isNaturalNumber: function isNaturalNumber(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value &&
      value >= 0;
  },
  isUnsignedInteger: function(number) {
    return typeof number === 'number' && !isNaN(number) && number >= 0 && number === parseInt(number, 10);
  },
  isSha256HexString: function (string) {
    // * 2 as hash size in bytes, and when represented as a hex string 2 symbols is 1 byte
    return isHexa(string) && string.length === constants.SHA256_HASH_SIZE * 2;
  },
  isHexStringOfSize: function (string, size) {
    return isHexa(string) && string.length === size;
  }
};
