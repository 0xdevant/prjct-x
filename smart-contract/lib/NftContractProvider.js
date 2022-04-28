const { ethers } = require("hardhat")
const CollectionConfig = require("../config/CollectionConfig")

class NftContractProvider {
  static async getContract() {
    // Check configuration
    if (CollectionConfig.contractAddress === null) {
      throw "\x1b[31merror\x1b[0m " + "Please add the contract address to the configuration before running this command."
    }

    if ((await ethers.provider.getCode(CollectionConfig.contractAddress)) === "0x") {
      throw "\x1b[31merror\x1b[0m " + `Can't find a contract deployed to the target address: ${CollectionConfig.contractAddress}`
    }

    return await ethers.getContractAt(CollectionConfig.contractName, CollectionConfig.contractAddress)
  }
}

module.exports = NftContractProvider
