/* eslint-disable */
var expect = require('chai').expect;
var merkleTreeUtil = require('../../lib/util/merkletree');
var getMerkleTree = merkleTreeUtil.getMerkleTree;
var getMerkleRoot = merkleTreeUtil.getMerkleRoot;

var hashes = [
  Buffer.from('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'hex'),
  Buffer.from('bf7e815688420059a4a77c66ad8d154487a25f3fcee73e36514f66fbc26ae91a', 'hex'),
  Buffer.from('18083d9866ba7fde28e819520ff4a4e9a7c871fe7929d997c84aebe7ae8b9385', 'hex')
];

var expectedTree = [
  Buffer.from('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', 'hex'),
  Buffer.from('bf7e815688420059a4a77c66ad8d154487a25f3fcee73e36514f66fbc26ae91a', 'hex'),
  Buffer.from('18083d9866ba7fde28e819520ff4a4e9a7c871fe7929d997c84aebe7ae8b9385', 'hex'),
  Buffer.from('509051b275340cb2c5bf784764c4ca4505a2d96178e8166523145ce496dd1c24', 'hex'),
  Buffer.from('30b07f4b48fac0ff36f1ba88198267392d4b684db4eb8dff313722c86fab17e4', 'hex'),
  Buffer.from('f7be256fbaef5f3f5eb1d0807852a396314c11a964848b57e6a38b8e82c8777b', 'hex')
];

describe('merkleTree', function () {
  describe('getMerkleTree', function () {
    it('should build a proper merkle tree', function () {
      var tree = getMerkleTree(hashes);

      expect(tree).to.be.an('array');
      // Three leaves, two nodes and a root, 6 in total
      expect(tree.length).to.be.equal(6);
      tree.forEach(function (node, index) {
        expect(node).to.be.instanceOf(Buffer);
        // sha256 is 32 bytes
        expect(node.length).to.be.equal(32);
        expect(node).to.be.deep.equal(expectedTree[index]);
      });
    });
  });
  describe('getMerkleRoot', function () {
    it('should return a copy of merkle root from merkle tree', function () {
      var tree = getMerkleTree(hashes);
      var root = getMerkleRoot(tree);

      // Last element of the tree is root
      expect(root).to.be.deep.equal(expectedTree[5]);

      // Test that resulted buffer is decoupled from the tree
      root.reverse();
      expect(root).to.be.not.deep.equal(expectedTree[5]);
    });
    it('should return undefined if tree is empty', function () {
      var root = getMerkleRoot([]);

      expect(root).to.be.undefined;
    });
  });
});
