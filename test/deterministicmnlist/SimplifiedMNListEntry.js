/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

var SimplifiedMNListEntry = require('../../lib/deterministicmnlist/SimplifiedMNListEntry');
var expect = require('chai').expect;

var smlEntryJSON = {
  "proRegTxHash": "32e5ad5cf9a06eb13e0f65cb7ecde1a93ef24995d07355fac2ff05ebd5b9ddbf",
  "confirmedHash": "0000001960431ec5a566e69f28ae0f6fa3199bd99ec527cccd02f7541d77300c",
  "service": "95.183.51.146:39999",
  "pubKeyOperator": "1326ddac1044e0219dba7dccf6b43d1deed3e897717ca06757243b02516cfa67e24026f7a317cf575b40c10e7f6bf7f0",
  "keyIDVoting": "68976be39d5ef1d43761123f497c96cf4226da87",
  "isValid": true
};
var smlEntryHex = "bfddb9d5eb05ffc2fa5573d09549f23ea9e1cd7ecb650f3eb16ea0f95cade5320c30771d54f702cdcc27c59ed99b19a36f0fae289fe666a5c51e43601900000000000000000000000000ffff5fb733929c3f1326ddac1044e0219dba7dccf6b43d1deed3e897717ca06757243b02516cfa67e24026f7a317cf575b40c10e7f6bf7f087da2642cf967c493f126137d4f15e9de36b976801";
var smlEntryHash = "1f4ab767f64d321f61d0a0995faa3096bf54742d62efe594aeabba6dbfc7e830";

var smlEntryWithoutAddress = {
  "proRegTxHash": "1659e06c825212c9b11325760a18f6ea06194ec4efd603f03d8704f23d818a6f",
  "confirmedHash": "000000000ca93e850827b361743c25c8508e6e42efaaa331cc1b54326d9fd179",
  "service": "[0:0:0:0:0:0:0:0]:0",
  "pubKeyOperator": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "keyIDVoting": "428c680677c45b1c2a50a2cca57e0ad0409f5d59",
  "isValid": false
};
var smlEntryWithoutAddressHex = '6f8a813df204873df003d6efc44e1906eaf6180a762513b1c91252826ce0591679d19f6d32541bcc31a3aaef426e8e50c8253c7461b32708853ea90c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000595d9f40d00a7ea5cca2502a1c5bc47706688c4200';
var smlEntryWithoutAddressHash = '6e793293a676277c97c8d8ffe25a958e5627caeafa270da4dc9b96e2e88379ff';

describe('SimplifiedMNListEntry', function () {
  describe('constructor', function () {
    it('Should create an entry object from JSON object', function () {
      var entry = new SimplifiedMNListEntry(smlEntryJSON);
      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
    });
    it('Should create an entry object from a buffer', function () {
      var entry = new SimplifiedMNListEntry(Buffer.from(smlEntryHex, 'hex'));
      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
    });
    it('Should create an entry object from a hex string', function () {
      var entry = new SimplifiedMNListEntry(smlEntryHex);
      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
    });
    it('Should copy an instance if SimplifiedMNListEntry is passed', function () {
      var entry1 = new SimplifiedMNListEntry(smlEntryJSON);
      var entry2 = new SimplifiedMNListEntry(entry1);
      entry1.keyIDVoting = 'something';
      expect(entry2.toObject()).to.be.deep.equal(smlEntryJSON);
      expect(entry1.keyIDVoting).to.be.equal('something');
      expect(entry2.keyIDVoting).to.be.equal('68976be39d5ef1d43761123f497c96cf4226da87');
    });
  });
  describe('fromBuffer', function () {
    it('Should be able to parse data from a buffer when ip address is present', function () {
      var entry = SimplifiedMNListEntry.fromBuffer(Buffer.from(smlEntryHex, 'hex'));
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryJSON);
    });
    it('Should be able to parse data from a buffer when ip address is not present', function () {
      var entry = SimplifiedMNListEntry.fromBuffer(Buffer.from(smlEntryHex, 'hex'));
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryJSON);
    });
  });
  describe('toBuffer', function () {
    it('Should serialize data to same buffer', function () {
      var entry = new SimplifiedMNListEntry(smlEntryJSON);
      var entryBuffer = entry.toBuffer();
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryJSON);
      expect(entryBuffer.toString('hex')).to.be.equal(smlEntryHex);
    });
    it('Should serialize data to same buffer if ip address is not present', function () {
      var entry = new SimplifiedMNListEntry(smlEntryWithoutAddress);
      var entryBuffer = entry.toBuffer();
      var entryJSON = entry.toObject();
      var entryString = entryBuffer.toString('hex');
      expect(entryJSON).to.be.deep.equal(smlEntryWithoutAddress);
      expect(entryString).to.be.equal(smlEntryWithoutAddressHex);
    });
    it('Buffer size should always be the same', function () {
      var entryWithDifferentKeys = new SimplifiedMNListEntry(smlEntryJSON).toBuffer();
      var entryWithSameKeys = new SimplifiedMNListEntry(smlEntryJSON).toBuffer();
      var entryWithNoAddress = new SimplifiedMNListEntry(smlEntryWithoutAddress).toBuffer();

      expect(entryWithSameKeys.length).to.be.equal(entryWithDifferentKeys.length);
      expect(entryWithNoAddress.length).to.be.equal(entryWithDifferentKeys.length);
    });
  });
  describe('fromObject', function() {
    it('Should create an instance from a JSONObject', function () {
      var entry = SimplifiedMNListEntry.fromObject(smlEntryJSON);

      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
      expect(entry.toBuffer().toString('hex')).to.be.equal(smlEntryHex);
    });
  });
  describe('toObject', function () {
    it('Should serialize SMLEntry to JSON object', function () {
      var entry = new SimplifiedMNListEntry(smlEntryHex);

      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
    });
  });
  describe('fromHexString', function () {
    it('Should be able to create an entry from a hex string', function () {
      var entry = SimplifiedMNListEntry.fromHexString(smlEntryHex);

      expect(entry.toObject()).to.be.deep.equal(smlEntryJSON);
    });
  });
  describe('calculateHash', function () {
    it('Should get correct hash for an entry with ip address', function() {
      var entry = new SimplifiedMNListEntry(smlEntryJSON);
      var serialized = entry.toBuffer().toString('hex');
      expect(serialized.length).to.be.equal(smlEntryHex.length);
      expect(entry.toBuffer().toString('hex')).to.be.equal(smlEntryHex);
      expect(entry.calculateHash().toString('hex')).to.be.equal(smlEntryHash);
    });
    it('Should get correct hash for an entry without ip address', function() {
      var entry = new SimplifiedMNListEntry(smlEntryWithoutAddress);
      var serialized = entry.toBuffer().toString('hex');
      expect(serialized.length).to.be.equal(smlEntryWithoutAddressHex.length);
      expect(entry.toBuffer().toString('hex')).to.be.equal(smlEntryWithoutAddressHex);
      expect(entry.calculateHash().toString('hex')).to.be.equal(smlEntryWithoutAddressHash);
    });
  });
});
