const whitelistAddresses = require("../config/whitelist.json");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
global.Buffer = global.Buffer || require("buffer").Buffer;

let merkleTree;

class Whitelist {
  static getMerkleTree() {
    if (merkleTree === undefined) {
      const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));

      merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    }

    return merkleTree;
  }

  static getProofForAddress(address) {
    return Whitelist.getMerkleTree().getHexProof(keccak256(address));
  }

  // prettier-ignore
  static getRawProofForAddress(address) {
    return Whitelist.getProofForAddress(address)
      .toString()
      .replaceAll('\'', '')
      .replaceAll(' ', '');
  }

  static contains(address) {
    return (
      Whitelist.getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >=
      0
    );
  }
}

module.exports = Whitelist;
