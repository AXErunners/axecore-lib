/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

var SimplifiedMNListDiff = require('../../lib/deterministcmnlist/SimplifiedMNListDiff');
var expect = require('chai').expect;
var sinon = require('sinon');

var mnListDiffHexString = '000001ee5108348a2c59396da29dc5769b2a9bb303d7577aee9cd95136c49b9b0000030f51f12e7069a7aa5f1bc9085ddb3fe368976296fd3b6d73fdaf898cc005000000044488a599e5d61709664c32305befd58bef29e33bc6e718af0233f938557a57a95c8119b7b136d94e477a0d2917d5f7245ff299cc6e31994f6236a8fb34fec88f905efa3e6743c889823f00147d36d12fd12ad401c19089f0affcabd423deef673f3a7f84d7ad33214994b5aecf4c1e192cb65b86750b1377e069073d1eba477a010f03000500010000000000000000000000000000000000000000000000000000000000000000ffffffff0603c494000106ffffffff02c3240e4300000000232102f94276f4ab08cb1662d4be95b21e0439401e881deb19022dea67044b699d8d4aacbd240e43000000001976a91496dc3875f032c9439c4b1e4c3c9ddbd8a9c9594888ac00000000260100c4940000e4882a7c3996b2cf4953f5adcace5295cb8c6a8c9c858c2c2d6279c4f00c1a8b0101040eb32f760490054543356cff463865633439dd073cffa570305eb086f70a0301040eb32f760490054543356cff463865633439dd073cffa570305eb086f70e0000000000000000000000000000000000000000000000000000000000000000000000000000c2ae01fb4084cbc3bc31e7f59b36be228a32040400f7737beb39779971e9bc59632243e13fc5fc9ada93b69bf48c2d4c463296cd5a000000000000000000000000cf9af40d4e1f03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c43ce12751c4ba45dcdfe2c16cefd61461e17a54d0175aa128db4cd7679fd88206bd6ef71f57e1b6fe04c2da5515193a6fcd40a47eb0000000000000000000000009f596eb84e1f03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c01';

var mnListDiffJSON = {
  "baseBlockHash": "000001ee5108348a2c59396da29dc5769b2a9bb303d7577aee9cd95136c49b9b",
  "blockHash": "0000030f51f12e7069a7aa5f1bc9085ddb3fe368976296fd3b6d73fdaf898cc0",
  "cbTxMerkleTree": "05000000044488a599e5d61709664c32305befd58bef29e33bc6e718af0233f938557a57a95c8119b7b136d94e477a0d2917d5f7245ff299cc6e31994f6236a8fb34fec88f905efa3e6743c889823f00147d36d12fd12ad401c19089f0affcabd423deef673f3a7f84d7ad33214994b5aecf4c1e192cb65b86750b1377e069073d1eba477a010f",
  "cbTx": "03000500010000000000000000000000000000000000000000000000000000000000000000ffffffff0603c494000106ffffffff02c3240e4300000000232102f94276f4ab08cb1662d4be95b21e0439401e881deb19022dea67044b699d8d4aacbd240e43000000001976a91496dc3875f032c9439c4b1e4c3c9ddbd8a9c9594888ac00000000260100c4940000e4882a7c3996b2cf4953f5adcace5295cb8c6a8c9c858c2c2d6279c4f00c1a8b",
  "deletedMNs": [
    '01040eb32f760490054543356cff463865633439dd073cffa570305eb086f70a'
  ],
  "mnList": [
    {
      "proRegTxHash": "01040eb32f760490054543356cff463865633439dd073cffa570305eb086f70e",
      "service": "[0:0:0:0:0:0:0:0]:0",
      "keyIDOperator": "0000000000000000000000000000000000000000",
      "keyIDVoting": "c2ae01fb4084cbc3bc31e7f59b36be228a320404",
      "isValid": false
    },
    {
      "proRegTxHash": "f7737beb39779971e9bc59632243e13fc5fc9ada93b69bf48c2d4c463296cd5a",
      "service": "207.154.244.13:19999",
      "keyIDOperator": "03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c",
      "keyIDVoting": "43ce12751c4ba45dcdfe2c16cefd61461e17a54d",
      "isValid": true
    },
    {
      "proRegTxHash": "75aa128db4cd7679fd88206bd6ef71f57e1b6fe04c2da5515193a6fcd40a47eb",
      "service": "159.89.110.184:19999",
      "keyIDOperator": "03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c",
      "keyIDVoting": "03d90b1cdc04f1dbe435a4ba51ca2d1ddb53e08c",
      "isValid": true
    }
  ]
};

describe('SimplifiedMNListDiff', function () {
  describe('constructor', function () {
    it('Should call .fromObject method, if an object is passed as a first arg', function () {
      sinon.spy(SimplifiedMNListDiff, "fromObject");

      var diff = new SimplifiedMNListDiff(mnListDiffJSON);

      expect(SimplifiedMNListDiff.fromObject.callCount).to.be.equal(1);
      expect(SimplifiedMNListDiff.fromObject.calledWith(mnListDiffJSON)).to.be.true;

      SimplifiedMNListDiff.fromObject.restore();
    });
    it('Should call .fromBuffer method, if a buffer is passed as a first arg', function () {
      sinon.spy(SimplifiedMNListDiff, "fromBuffer");

      var diff = new SimplifiedMNListDiff(Buffer.from(mnListDiffHexString, 'hex'));

      expect(SimplifiedMNListDiff.fromBuffer.callCount).to.be.equal(1);
      expect(SimplifiedMNListDiff.fromBuffer.calledWith(Buffer.from(mnListDiffHexString, 'hex'))).to.be.true;

      SimplifiedMNListDiff.fromBuffer.restore();
    });
    it('Should call .fromHexString method, if a hex string is passed as a first arg', function () {
      sinon.spy(SimplifiedMNListDiff, "fromHexString");

      var diff = new SimplifiedMNListDiff(mnListDiffHexString);

      expect(SimplifiedMNListDiff.fromHexString.callCount).to.be.equal(1);
      expect(SimplifiedMNListDiff.fromHexString.calledWith(mnListDiffHexString)).to.be.true;

      SimplifiedMNListDiff.fromHexString.restore();
    });
    it('Should call a copy method of passed instance, if instance is passed', function () {
      var instance = new SimplifiedMNListDiff(mnListDiffJSON);
      sinon.spy(instance, 'copy');

      var copy = new SimplifiedMNListDiff(instance);

      expect(instance.copy.callCount).to.be.equal(1);
      copy.baseBlockHash = '000002ee5108348a2f59396de29dc5769b2a9bb303d7577aee9cd95136c49b9a';
      expect(instance.baseBlockHash).to.be.not.equal(copy.baseBlockHash);

      instance.copy.restore();
    });
    it('Should throw an error if argument is not a hex string, buffer or object', function () {
      expect(SimplifiedMNListDiff.bind(SimplifiedMNListDiff, 2))
        .to.throw('Unrecognized argument passed to SimplifiedMNListDiff constructor');
      expect(SimplifiedMNListDiff.bind(SimplifiedMNListDiff, 'not a hex string'))
        .to.throw('Unrecognized argument passed to SimplifiedMNListDiff constructor');
      expect(SimplifiedMNListDiff.bind(SimplifiedMNListDiff, true))
        .to.throw('Unrecognized argument passed to SimplifiedMNListDiff constructor');
    });
  });
  describe('fromObject', function () {
    it('Should be able to create an instance from object', function () {
      var diff = SimplifiedMNListDiff.fromObject(mnListDiffJSON);
      expect(diff.toObject()).to.be.deep.equal(mnListDiffJSON);
    });
  });
  describe('toObject', function () {
    it('Should return an object with serialized diff data', function () {
      var diff = new SimplifiedMNListDiff(mnListDiffJSON);
      expect(diff.toObject()).to.be.deep.equal(mnListDiffJSON);
    });
  });
  describe('fromBuffer', function () {
    it('Should be able to parse a buffer', function () {
      var buf = Buffer.from(mnListDiffHexString, 'hex');
      var smlDiff = new SimplifiedMNListDiff(buf);
      var parsed = smlDiff.toObject();
      expect(parsed).to.be.deep.equal(mnListDiffJSON);
    });
  });
  describe('toBuffer', function () {
    it('Should be able to serialize data', function () {
      var buf = new SimplifiedMNListDiff(mnListDiffJSON).toBuffer();
      expect(buf.toString('hex')).to.be.equal(mnListDiffHexString);
    });
  });
  describe('fromHexString', function () {
    it('Should be able to create an instance from a hex string', function () {
      var diff = SimplifiedMNListDiff.fromHexString(mnListDiffHexString);
      expect(diff.toObject()).to.be.deep.equal(mnListDiffJSON);
    });
  });
  describe('copy', function() {
    it('Should create a detached copy of an instance', function () {
      var instance = new SimplifiedMNListDiff(mnListDiffJSON);
      var copy = new SimplifiedMNListDiff(instance);

      copy.baseBlockHash = '000002ee5108348a2f59396de29dc5769b2a9bb303d7577aee9cd95136c49b9a';
      expect(instance.baseBlockHash).to.be.not.equal(copy.baseBlockHash);
    })
  })
});
