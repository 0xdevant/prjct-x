const whitelistAddresses = require("./whitelist.json");

const CollectionConfig = {
  contractName: "PRJCTX",
  tokenName: "PRJCT-X",
  tokenSymbol: "PRJCTX",
  hiddenMetadataUri: "ipfs://__CID__/hidden.json",
  price: 0.08,
  maxSupply: 2022,
  whitelistSale: {
    maxMintAmountPerTx: 2,
  },
  publicSale: {
    maxMintAmountPerTx: 2,
  },
  contractAddress: "0xdD7f48DfbC22Ee11518F44803Eeb43a95daD6685",
  whitelistAddresses: whitelistAddresses,
};

module.exports = CollectionConfig;
