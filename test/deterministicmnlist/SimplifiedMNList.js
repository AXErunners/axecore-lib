/* eslint-disable */
var expect = require('chai').expect;
var sinon = require('sinon');
var SMNListFixture = require('../fixtures/mnList');
var SimplifiedMNList = require('../../lib/deterministicmnlist/SimplifiedMNList');
var constants = require('../../lib/constants');

describe('SimplifiedMNList', function () {
  describe('constructor', function () {
    it('Should call applyDiff with the first argument passed to the constructor', function () {
      var spy = sinon.spy(SimplifiedMNList.prototype, "applyDiff");

      var mnList = new SimplifiedMNList(SMNListFixture.getFirstDiff());

      expect(mnList.applyDiff.callCount).to.be.equal(1);
      expect(mnList.applyDiff.calledWithExactly(SMNListFixture.getFirstDiff())).to.be.true;
      spy.restore();
    });
    it("Should not call applyDiff if the first argument isn't passed", function () {
      var spy = sinon.spy(SimplifiedMNList.prototype, "applyDiff");

      var mnList = new SimplifiedMNList();

      expect(mnList.applyDiff.callCount).to.be.equal(0);
      spy.restore();
    });
  });
  describe('applyDiff', function () {
    it('Should apply diff and sort MN entries', function () {
      var mnList = new SimplifiedMNList();
      var diff = SMNListFixture.getFirstDiff();

      mnList.applyDiff(diff);
      expect(mnList.mnList.length).to.be.equal(diff.mnList.length);
      // Since mn list is sorted and diff isn't, we need to check the list that way
      mnList.mnList.forEach(function (entry) {
        var diffIndex = diff.mnList.findIndex(function (diffEntry) {
          return diffEntry.proRegTxHash === entry.proRegTxHash
        });
        // toObject since diff is just JSON, while entry in the list is an instance of SimplifiedMNListEntry
        expect(entry.toObject()).to.be.deep.equal(diff.mnList[diffIndex]);
      });
      expect(mnList.calculateMerkleRoot()).to.be.equal(diff.merkleRootMNList);
    });
    it('Should update entries', function () {
      var mnList = new SimplifiedMNList(SMNListFixture.getFirstDiff());
      var mnsCountInTheFirstDiff = SMNListFixture.getFirstDiff().mnList.length;
      var mnsCountInTheSecondDiff = SMNListFixture.getSecondDiff().mnList.length;
      var mnsDeleted = SMNListFixture.getSecondDiff().deletedMNs.length;

      mnList.applyDiff(SMNListFixture.getSecondDiff());

      // Check that there are masternodes to be deleted
      expect(mnsDeleted).to.be.equal(1);
      // Check that there are masternodes to be updated - resulting list should be shorter than two diff - deleted count
      expect(mnsCountInTheFirstDiff + mnsCountInTheSecondDiff - mnsDeleted).to.be.above(mnList.mnList.length);
      expect(mnList.mnList.length).to.be.equal(SMNListFixture.getFirstTwoDiffsCombined().mnList.length);
      // Check that calculated merkle root is the same as merkle root in the latest applied diff
      expect(mnList.calculateMerkleRoot()).to.be.equal(SMNListFixture.getSecondDiff().merkleRootMNList);
    });
    it("Should throw an error if calculated merkle root doesn't match merkle root in the diff", function () {
      var mnList = new SimplifiedMNList(SMNListFixture.getFirstDiff());
      expect(function () {
        mnList.applyDiff(SMNListFixture.getThirdDiff());
      }).to.throw('Merkle root from the diff doesn\'t match calculated merkle root after diff is applied');
    });
    it("Should set base block hash on the first call and don't change it on any further calls", function () {
      var mnList = new SimplifiedMNList();
      expect(mnList.baseBlockHash).to.be.equal(constants.NULL_HASH);

      mnList.applyDiff(SMNListFixture.getFirstDiff());
      expect(mnList.baseBlockHash).to.be.equal(SMNListFixture.getFirstDiff().baseBlockHash);

      mnList.applyDiff(SMNListFixture.getSecondDiff());
      // Should be equal to the block hash from the first diff
      expect(mnList.baseBlockHash).to.be.equal(SMNListFixture.getFirstDiff().baseBlockHash);
    });
  });
  describe('calculateMerkleRoot', function () {
    it('Should calculate merkle root', function () {
      var mnListJSON = SMNListFixture.getMNListJSON();
      var mnList = new SimplifiedMNList();

      mnList.applyDiff(mnListJSON);
      var calculatedRoot = mnList.calculateMerkleRoot();

      expect(calculatedRoot).to.be.equal(mnListJSON.merkleRootMNList);
    });
    it('Should return a zero hash if the list is empty', function () {
      var mnList = new SimplifiedMNList();

      var root = mnList.calculateMerkleRoot();
      expect(root).to.be.equal('0000000000000000000000000000000000000000000000000000000000000000');
    });
  });
  describe('getValidMasternodesList', function () {
    it('Should return a valid masternodes list', function () {
      var mnList = new SimplifiedMNList(SMNListFixture.getFirstDiff());

      var validMNs = mnList.getValidMasternodesList();
      expect(validMNs).to.be.an('Array');
      expect(mnList.mnList.length).to.be.equal(100);
      expect(validMNs.length).to.be.equal(95);
      expect(mnList.mnList.filter(function (entry) {
        return !entry.isValid
      }).length).to.be.equal(5);
      validMNs.forEach(function (mnListEntry) {
        expect(mnListEntry.isValid).to.be.true;
      });
    });
    it('Should return an empty array if mn list is empty', function () {
      var mnList = new SimplifiedMNList();

      expect(mnList.getValidMasternodesList().length).to.be.equal(0);
    });
  });
  describe('toSmplifiedMNListDiff', function () {
    it('Should return a simplified masternode lits diff, from which would be possible to restore the same list',
      function () {
        var originalMNList = new SimplifiedMNList(SMNListFixture.getFirstDiff());
        originalMNList.applyDiff(SMNListFixture.getSecondDiff());
        expect(originalMNList.mnList.length).to.be.equal(122);

        var diff = originalMNList.toSimplifiedMNListDiff();

        var restoredMNList = new SimplifiedMNList(diff);
        expect(restoredMNList.baseBlockHash).to.be.equal(originalMNList.baseBlockHash);
        expect(restoredMNList.blockHash).to.be.equal(originalMNList.blockHash);
        // Note that base block hash always should be the same as base block hash of the first diff
        expect(restoredMNList.baseBlockHash).to.be.equal(SMNListFixture.getFirstDiff().baseBlockHash);
        // And block hash should be the same as block hash of the latest applied diff
        expect(restoredMNList.blockHash).to.be.equal(SMNListFixture.getSecondDiff().blockHash);
        expect(restoredMNList.mnList).to.be.deep.equal(originalMNList.mnList);
        expect(restoredMNList.merkleRootMNList).to.be.deep.equal(originalMNList.merkleRootMNList);
        expect(restoredMNList.getValidMasternodesList()).to.be.deep.equal(originalMNList.getValidMasternodesList());
        expect(restoredMNList.cbTx.toObject()).to.be.deep.equal(originalMNList.cbTx.toObject());
        expect(restoredMNList.cbTxMerkleTree).to.be.deep.equal(originalMNList.cbTxMerkleTree);
      }
    );
    it('Should throw if no diffs were applied to it', function () {
      var mnList = new SimplifiedMNList();

      expect(function () {
        mnList.toSimplifiedMNListDiff()
      }).to.throw("Can't convert MN list to diff - cbTx is missing");
    })
  });
});
