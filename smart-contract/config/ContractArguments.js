const { utils } = require("ethers");
const CollectionConfig = require("./CollectionConfig");

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.tokenName,
  CollectionConfig.tokenSymbol,
  utils.parseEther(CollectionConfig.price.toString()),
  CollectionConfig.maxSupply,
  CollectionConfig.whitelistSale.maxMintAmountPerTx,
  CollectionConfig.hiddenMetadataUri,
];

module.exports = ContractArguments;
