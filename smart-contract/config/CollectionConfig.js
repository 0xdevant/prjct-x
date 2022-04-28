const whitelistAddresses = require("./whitelist.json")

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
  contractAddress: "0x1461c64FAD65105CBe15d8B2DD897c2FB77a1461",
  whitelistAddresses: whitelistAddresses,
}

module.exports = CollectionConfig
