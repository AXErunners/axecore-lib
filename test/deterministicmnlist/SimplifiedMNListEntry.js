/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

var SimplifiedMNListEntry = require('../../lib/deterministcmnlist/SimplifiedMNListEntry');
var expect = require('chai').expect;

var smlEntryWithNoAddress = {
  "proRegTxHash": "01040eb32f760490054543356cff463865633439dd073cffa570305eb086f70e",
  "service": "[0:0:0:0:0:0:0:0]:0",
  "keyIDOperator": "0000000000000000000000000000000000000000",
  "keyIDVoting": "c2ae01fb4084cbc3bc31e7f59b36be228a320404",
  "isValid": false
};
var smlEntryWithNoAddressHex = '01040eb32f760490054543356cff463865633439dd073cffa570305eb086f70e0000000000000000000000000000000000000000000000000000000000000000000000000000c2ae01fb4084cbc3bc31e7f59b36be228a32040400';

var smlEntryWithSameKeys = {
  "proRegTxHash": "f7737beb39779971e9bc59632243e13fc5fc9ada93b69bf48c2d4c463296cd5a",
  "service": "207.154.244.13:19999",
  "keyIDOperator": "43ce12751c4ba45dcdfe2c16cefd61461e17a54d",
  "keyIDVoting": "43ce12751c4ba45dcdfe2c16cefd61461e17a54d",
  "isValid": true
};

var smlEntryWithDifferentKeys = {
  "proRegTxHash": "75aa128db4cd7679fd88206bd6ef71f57e1b6fe04c2da5515193a6fcd40a47eb",
  "service": "159.89.110.184:19999",
  "keyIDOperator": "03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c",
  "keyIDVoting": "43ce12751c4ba45dcdfe2c16cefd61461e17a54d",
  "isValid": true
};
var smlEntryWithDifferentKeysHex = '75aa128db4cd7679fd88206bd6ef71f57e1b6fe04c2da5515193a6fcd40a47eb0000000000000000000000009f596eb84e1f03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c43ce12751c4ba45dcdfe2c16cefd61461e17a54d01';

describe('SimplifiedMNListEntry', function () {
  describe('constructor', function () {
    it('Should create an entry object from JSON object', function () {
      var entry = new SimplifiedMNListEntry(smlEntryWithDifferentKeys);
      expect(entry.toObject()).to.be.deep.equal(smlEntryWithDifferentKeys);
    });
    it('Should create an entry object from a buffer', function () {
      var entry = new SimplifiedMNListEntry(Buffer.from(smlEntryWithDifferentKeysHex, 'hex'));
      expect(entry.toObject()).to.be.deep.equal(smlEntryWithDifferentKeys);
    });
    it('Should create an entry object from a hex string', function () {
      var entry = new SimplifiedMNListEntry(smlEntryWithDifferentKeysHex);
      expect(entry.toObject()).to.be.deep.equal(smlEntryWithDifferentKeys);
    });
    it('Should copy an instance if SimplifiedMNListEntry is passed', function () {
      var entry1 = new SimplifiedMNListEntry(smlEntryWithDifferentKeys);
      var entry2 = new SimplifiedMNListEntry(entry1);
      entry1.keyIDVoting = 'something';
      expect(entry2.toObject()).to.be.deep.equal(smlEntryWithDifferentKeys);
      expect(entry1.keyIDVoting).to.be.equal('something');
      expect(entry2.keyIDVoting).to.be.equal('43ce12751c4ba45dcdfe2c16cefd61461e17a54d');
    });
  });
  describe('fromBuffer', function () {
    it('Should be able to parse data from a buffer when ip address is present', function () {
      var entry = SimplifiedMNListEntry.fromBuffer(Buffer.from(smlEntryWithDifferentKeysHex, 'hex'));
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryWithDifferentKeys);
    });
    it('Should be able to parse data from a buffer when ip address is not present', function () {
      var entry = SimplifiedMNListEntry.fromBuffer(Buffer.from(smlEntryWithDifferentKeysHex, 'hex'));
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryWithDifferentKeys);
    });
  });
  describe('toBuffer', function () {
    it('Should serialize data to same buffer', function () {
      var entry = new SimplifiedMNListEntry(smlEntryWithDifferentKeysHex);
      var entryBuffer = entry.toBuffer();
      var entryJSON = entry.toObject();
      expect(entryJSON).to.be.deep.equal(smlEntryWithDifferentKeys);
      expect(entryBuffer.toString('hex')).to.be.equal(smlEntryWithDifferentKeysHex);
    });
    it('Should serialize data to same buffer if ip address is not present', function () {
      var entry = new SimplifiedMNListEntry(smlEntryWithNoAddress);
      var entryBuffer = entry.toBuffer();
      var entryJSON = entry.toObject();
      var entryString = entryBuffer.toString('hex');
      expect(entryJSON).to.be.deep.equal(smlEntryWithNoAddress);
      expect(entryString).to.be.equal(smlEntryWithNoAddressHex);
    });
    it('Buffer size should always be the same', function () {
      var entryWithDifferentKeys = new SimplifiedMNListEntry(smlEntryWithDifferentKeys).toBuffer();
      var entryWithSameKeys = new SimplifiedMNListEntry(smlEntryWithSameKeys).toBuffer();
      var entryWithNoAddress = new SimplifiedMNListEntry(smlEntryWithNoAddress).toBuffer();

      expect(entryWithSameKeys.length).to.be.equal(entryWithDifferentKeys.length);
      expect(entryWithNoAddress.length).to.be.equal(entryWithDifferentKeys.length);
    })
  });
});
