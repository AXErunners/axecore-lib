/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

var constants = require('../../constants');
var Preconditions = require('../../util/preconditions');
var BufferWriter = require('../../encoding/bufferwriter');
var BufferReader = require('../../encoding/bufferreader');
var AbstractPayload = require('./abstractpayload');
var utils = require('../../util/js');

var isUnsignedInteger = utils.isUnsignedInteger;
var isHexString = utils.isHexaString;

var CURRENT_PAYLOAD_VERSION = 1;
var HASH_SIZE = constants.SHA256_HASH_SIZE;

/**
 * @typedef {Object} CoinbasePayloadJSON
 * @property {number} version
 * @property {number} height
 * @property {string} merkleRootMNList
 * @property {string} merkleRootQuorums
 */

/**
 * @class CoinbasePayload
 * @property {number} version
 * @property {number} height
 * @property {string} merkleRootMNList
 * @property {string} merkleRootQuorums
 */
function CoinbasePayload() {
  AbstractPayload.call(this);
  this.version = CURRENT_PAYLOAD_VERSION;
}

CoinbasePayload.prototype = Object.create(AbstractPayload.prototype);
CoinbasePayload.prototype.constructor = AbstractPayload;

/* Static methods */

/**
 * Parse raw transition payload
 * @param {Buffer} rawPayload
 * @return {CoinbasePayload}
 */
CoinbasePayload.fromBuffer = function (rawPayload) {
  var payloadBufferReader = new BufferReader(rawPayload);
  var payload = new CoinbasePayload();
  payload.version = payloadBufferReader.readUInt16LE();
  payload.height = payloadBufferReader.readUInt32LE();
  payload.merkleRootMNList = payloadBufferReader.read(HASH_SIZE).reverse().toString('hex');
  if (payload.version >= 2) {
    payload.merkleRootQuorums = payloadBufferReader.read(HASH_SIZE).reverse().toString('hex');
  }

  if (!payloadBufferReader.finished()) {
    throw new Error('Failed to parse payload: raw payload is bigger than expected.');
  }

  payload.validate();
  return payload;
};

/**
 * Create new instance of payload from JSON
 * @param {string|CoinbasePayloadJSON} payloadJson
 * @return {CoinbasePayload}
 */
CoinbasePayload.fromJSON = function fromJSON(payloadJson) {
  var payload = new CoinbasePayload();
  payload.version = payloadJson.version;
  payload.height = payloadJson.height;
  payload.merkleRootMNList = payloadJson.merkleRootMNList;
  if (payload.version >= 2) {
    payload.merkleRootQuorums = payloadJson.merkleRootQuorums;
  }

  payload.validate();
  return payload;
};

/* Instance methods */

/**
 * Validates payload data
 * @return {boolean}
 */
CoinbasePayload.prototype.validate = function() {
  Preconditions.checkArgument(isUnsignedInteger(this.version), 'Expect version to be an unsigned integer');
  Preconditions.checkArgument(isUnsignedInteger(this.height), 'Expect height to be an unsigned integer');
  Preconditions.checkArgument(isHexString(this.merkleRootMNList), 'expect merkleRootMNList to be a hex string but got ' + typeof this.merkleRootMNList);
  Preconditions.checkArgument(this.merkleRootMNList.length === constants.SHA256_HASH_SIZE * 2, 'Invalid merkleRootMNList size');
  if (this.version >= 2) {
    Preconditions.checkArgument(isHexString(this.merkleRootQuorums), 'expect merkleRootQuorums to be a hex string but got ' + typeof this.merkleRootQuorums);
    Preconditions.checkArgument(this.merkleRootQuorums.length === constants.SHA256_HASH_SIZE * 2, 'Invalid merkleRootQuorums size');
  }
  return true;
};

/**
 * Serializes payload to JSON
 * @return {CoinbasePayloadJSON}
 */
CoinbasePayload.prototype.toJSON = function toJSON() {
  this.validate();
  const json = {
    version: this.version,
    height: this.height,
    merkleRootMNList: this.merkleRootMNList,
  };
  if (this.version >= 2) {
    json.merkleRootQuorums = this.merkleRootQuorums
  }
  return json;
};

/**
 * Serialize payload to buffer
 * @return {Buffer}
 */
CoinbasePayload.prototype.toBuffer = function toBuffer() {
  this.validate();
  var payloadBufferWriter = new BufferWriter();

  payloadBufferWriter
    .writeUInt16LE(this.version)
    .writeUInt32LE(this.height)
    .write(Buffer.from(this.merkleRootMNList, 'hex').reverse());

  if (this.version >= 2) {
    payloadBufferWriter.write(Buffer.from(this.merkleRootQuorums, 'hex').reverse());
  }

  return payloadBufferWriter.toBuffer();
};

/**
 * Copy payload instance
 * @return {CoinbasePayload}
 */
CoinbasePayload.prototype.copy = function copy() {
  return CoinbasePayload.fromJSON(this.toJSON());
};

module.exports = CoinbasePayload;
