import whitelistAddresses from "../../config/whitelist.json";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

let merkleTree;

const getMerkleTree = () => {
  if (merkleTree === undefined) {
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));

    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  }

  return merkleTree;
};

const getProofForAddress = (address) => {
  return getMerkleTree().getHexProof(keccak256(address));
};

const getRawProofForAddress = (address) => {
  return getProofForAddress(address)
    .toString()
    .replaceAll("'", "")
    .replaceAll(" ", "");
};

const contains = (address) => {
  return getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >= 0;
};

module.exports = {
  getMerkleTree,
  getProofForAddress,
  getRawProofForAddress,
  contains,
};
