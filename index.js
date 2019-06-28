/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

var bitcore = module.exports;

// module information
bitcore.version = 'v' + require('./package.json').version;
bitcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of axecore-lib found. ' +
      'Please make sure that you are not mixing instances of classes of the different versions of axecore.';
    console.warn(message);
  }
};
bitcore.versionGuard(global._axecore);
global._axecore = bitcore.version;

// crypto
bitcore.crypto = {};
bitcore.crypto.BN = require('./lib/crypto/bn');
bitcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
bitcore.crypto.Hash = require('./lib/crypto/hash');
bitcore.crypto.Random = require('./lib/crypto/random');
bitcore.crypto.Point = require('./lib/crypto/point');
bitcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
bitcore.encoding = {};
bitcore.encoding.Base58 = require('./lib/encoding/base58');
bitcore.encoding.Base58Check = require('./lib/encoding/base58check');
bitcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
bitcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
bitcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
bitcore.util = {};
bitcore.util.buffer = require('./lib/util/buffer');
bitcore.util.js = require('./lib/util/js');
bitcore.util.preconditions = require('./lib/util/preconditions');
bitcore.util.hashUtil = require('./lib/util/hashutil');
bitcore.util.merkleTree = require('./lib/util/merkletree');

// errors thrown by the library
bitcore.errors = require('./lib/errors');

// main bitcoin library
bitcore.Address = require('./lib/address');
bitcore.Block = require('./lib/block');
bitcore.MerkleBlock = require('./lib/block/merkleblock');
bitcore.SimplifiedMNList = require('./lib/deterministicmnlist/SimplifiedMNList');
bitcore.SimplifiedMNListDiff = require('./lib/deterministicmnlist/SimplifiedMNListDiff');
bitcore.SimplifiedMNListEntry = require('./lib/deterministicmnlist/SimplifiedMNListEntry');
bitcore.BlockHeader = require('./lib/block/blockheader');
bitcore.HDPrivateKey = require('./lib/hdprivatekey.js');
bitcore.HDPublicKey = require('./lib/hdpublickey.js');
bitcore.Networks = require('./lib/networks');
bitcore.Opcode = require('./lib/opcode');
bitcore.PrivateKey = require('./lib/privatekey');
bitcore.PublicKey = require('./lib/publickey');
bitcore.Script = require('./lib/script');
bitcore.Transaction = require('./lib/transaction');
bitcore.GovObject = require('./lib/govobject');
bitcore.URI = require('./lib/uri');
bitcore.Unit = require('./lib/unit');
bitcore.Message = require('./lib/message');
bitcore.Mnemonic = require('./lib/mnemonic');
bitcore.BloomFilter = require('./lib/bloomfilter');

// dependencies, subject to change
bitcore.deps = {};
bitcore.deps.bnjs = require('bn.js');
bitcore.deps.bs58 = require('bs58');
bitcore.deps.Buffer = Buffer;
bitcore.deps.elliptic = require('elliptic');
bitcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
bitcore.Transaction.sighash = require('./lib/transaction/sighash');
