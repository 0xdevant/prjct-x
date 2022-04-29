const chai = require("chai");
const { expect } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { MerkleTree } = require("merkletreejs");
const CollectionConfig = require("../config/CollectionConfig");
const ContractArguments = require("../config/ContractArguments");
const { keccak256 } = ethers.utils;

chai.use(chaiAsPromised);

const whitelistAddresses = [
  // Hardhat test addresses...
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
];

function getMintPrice(mintAmount) {
  return ethers.utils
    .parseEther(CollectionConfig.price.toString())
    .mul(mintAmount);
}

describe(CollectionConfig.contractName, function () {
  let owner;
  let whitelistedUser;
  let holder;
  let externalUser;
  let contract;

  before(async () => {
    [owner, whitelistedUser, holder, externalUser] = await ethers.getSigners();
  });

  it("Contract deployment", async function () {
    const Contract = await ethers.getContractFactory(
      CollectionConfig.contractName
    );
    contract = await Contract.deploy(...ContractArguments);

    await contract.deployed();
  });

  it("Check initial data", async function () {
    expect(await contract.name()).to.equal(CollectionConfig.tokenName);
    expect(await contract.symbol()).to.equal(CollectionConfig.tokenSymbol);
    expect(await contract.cost()).to.equal(getMintPrice(1));
    expect(await contract.maxSupply()).to.equal(CollectionConfig.maxSupply);
    expect(await contract.maxMintAmountPerTx()).to.equal(
      CollectionConfig.whitelistSale.maxMintAmountPerTx
    );
    expect(await contract.hiddenMetadataUri()).to.equal(
      CollectionConfig.hiddenMetadataUri
    );

    expect(await contract.paused()).to.equal(true);
    expect(await contract.whitelistMintEnabled()).to.equal(false);
    expect(await contract.revealed()).to.equal(false);

    await expect(contract.tokenURI(1)).to.be.revertedWith(
      "ERC721AMetadata: URI query for nonexistent token"
    );
  });

  it("Before any sale", async function () {
    [owner, whitelistedUser, holder, externalUser];

    // Nobody should be able to mint from a paused contract
    await expect(
      contract.connect(whitelistedUser).mint(1, { value: getMintPrice(1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint([], 1, { value: getMintPrice(1) })
    ).to.be.revertedWith("Whitelist sale is not enabled!");
    await expect(
      contract.connect(holder).mint(1, { value: getMintPrice(1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract.connect(holder).whitelistMint([], 1, { value: getMintPrice(1) })
    ).to.be.revertedWith("Whitelist sale is not enabled!");
    await expect(
      contract.connect(owner).mint(1, { value: getMintPrice(1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract.connect(owner).whitelistMint([], 1, { value: getMintPrice(1) })
    ).to.be.revertedWith("Whitelist sale is not enabled!");

    // The owner should always be able to run mintForAddress
    await (await contract.mintForAddress(1, await owner.getAddress())).wait();
    await (
      await contract.mintForAddress(1, await whitelistedUser.getAddress())
    ).wait();
    // But not over the maxMintAmountPerTx
    await expect(
      contract.mintForAddress(
        await (await contract.maxMintAmountPerTx()).add(1),
        await holder.getAddress()
      )
    ).to.be.revertedWith("Invalid mint amount!");

    // Check balances
    expect(await contract.balanceOf(await owner.getAddress())).to.equal(1);
    expect(
      await contract.balanceOf(await whitelistedUser.getAddress())
    ).to.equal(1);
    expect(await contract.balanceOf(await holder.getAddress())).to.equal(0);
    expect(await contract.balanceOf(await externalUser.getAddress())).to.equal(
      0
    );
  });

  it("Whitelist Sale", async () => {
    const leaves = whitelistAddresses.map((account) => keccak256(account));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const merkleRoot = tree.getHexRoot();

    await contract.setMerkleRoot(merkleRoot);

    const merkleProof = tree.getHexProof(
      keccak256(await whitelistedUser.getAddress())
    );

    // enable whitelist mint
    await contract.setWhitelistMintEnabled(true);

    // mint without paying ether
    await expect(
      contract.connect(whitelistedUser).whitelistMint(merkleProof, 2)
    ).to.be.rejectedWith(
      Error,
      "insufficient funds for intrinsic transaction cost"
    );

    // mint with correct amount of ether
    await contract.connect(whitelistedUser).whitelistMint(merkleProof, 1, {
      value: getMintPrice(1),
    });
    // trying to mint twice with the same WL address
    await expect(
      contract.connect(whitelistedUser).whitelistMint(merkleProof, 1, {
        value: getMintPrice(1),
      })
    ).to.be.revertedWith("Address already claimed!");

    // Pretending to be someone else
    await expect(
      contract.connect(holder).whitelistMint(merkleProof, 1, {
        value: getMintPrice(1),
      })
    ).to.be.revertedWith("Invalid proof!");

    // Sending an invalid proof
    await expect(
      contract
        .connect(holder)
        .whitelistMint(
          tree.getHexProof(keccak256(await holder.getAddress())),
          2,
          {
            value: getMintPrice(2),
          }
        )
    ).to.be.revertedWith("Invalid proof!");

    // Sending no proof at all
    await expect(
      contract.connect(holder).whitelistMint([], 1, { value: getMintPrice(1) })
    ).to.be.revertedWith("Invalid proof!");

    // Pause whitelist sale
    await contract.setWhitelistMintEnabled(false);

    // Check balances
    expect(await contract.balanceOf(await owner.getAddress())).to.equal(1);
    expect(
      await contract.balanceOf(await whitelistedUser.getAddress())
    ).to.equal(2);
    expect(await contract.balanceOf(await holder.getAddress())).to.equal(0);
    expect(await contract.balanceOf(await externalUser.getAddress())).to.equal(
      0
    );
  });

  it("Not allow normal mint while whitelist mint is open", async () => {
    // enable whitelist mint
    await contract.setWhitelistMintEnabled(true);
    expect(contract.connect(externalUser).mint(3)).to.be.revertedWith(
      "The contract is paused!"
    );
  });

  it("Not allow when mint amount is less than equal 0 or more than 20, or total supply exceeds max supply", async () => {
    // enable public mint
    await contract.setPaused(false);

    let accounts = await ethers.getSigners();
    const testAccounts = accounts.slice(0, 1010); // account 1 - 1010

    expect(
      contract.connect(testAccounts[4]).mint(3, {
        value: getMintPrice(1),
      })
    ).to.be.revertedWith("Invalid mint amount!");

    // 1010 accounts mint 2 each => 2020 sold
    for (account of testAccounts) {
      await contract.connect(account).mint(2, {
        value: getMintPrice(2),
      });
    }

    // total supply is 2020 now, next mint won't go through because it will exceed max supply
    expect(
      contract.connect(testAccounts[8]).mint(2, {
        value: getMintPrice(2),
      })
    ).to.be.revertedWith("Max supply exceeded!");
  });

  it("Public sale", async function () {
    let accounts = await ethers.getSigners();
    const testAccount = accounts.slice(10); // 10 test accounts

    await contract.setPaused(false);
    await contract.connect(holder).mint(2, { value: getMintPrice(2) });
    await contract.connect(whitelistedUser).mint(1, { value: getMintPrice(1) });
    // Sending insufficient funds
    await expect(
      contract.connect(holder).mint(1, { value: getMintPrice(1).sub(1) })
    ).to.be.rejectedWith(
      Error,
      "insufficient funds for intrinsic transaction cost"
    );
    // Sending an invalid mint amount
    await expect(
      contract
        .connect(whitelistedUser)
        .mint(await (await contract.maxMintAmountPerTx()).add(1), {
          value: getMintPrice(
            await (await contract.maxMintAmountPerTx()).add(1).toNumber()
          ),
        })
    ).to.be.revertedWith("Invalid mint amount!");
    // Sending a whitelist mint transaction
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint([], 1, { value: getMintPrice(1) })
    ).to.be.revertedWith("Address already claimed!");

    // Pause public sale
    await contract.setPaused(true);
  });

  it("Owner only functions", async function () {
    await expect(
      contract
        .connect(externalUser)
        .mintForAddress(1, await externalUser.getAddress())
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setRevealed(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract
        .connect(externalUser)
        .setCost(ethers.utils.parseEther("0.0000001"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setMaxMintAmountPerTx(99999)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setHiddenMetadataUri("INVALID_URI")
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setUriPrefix("INVALID_PREFIX")
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setUriSuffix("INVALID_SUFFIX")
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setPaused(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract
        .connect(externalUser)
        .setMerkleRoot(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setWhitelistMintEnabled(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(contract.connect(externalUser).withdraw()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Token URI generation", async function () {
    const uriPrefix = "ipfs://__COLLECTION_CID__/";
    const uriSuffix = ".json";
    const totalSupply = await contract.totalSupply();

    expect(await contract.tokenURI(1)).to.equal(
      CollectionConfig.hiddenMetadataUri
    );

    // Reveal collection
    await contract.setUriPrefix(uriPrefix);
    await contract.setRevealed(true);

    // ERC721A uses token IDs starting from 0 internally...
    await expect(contract.tokenURI(0)).to.be.revertedWith(
      "ERC721AMetadata: URI query for nonexistent token"
    );

    // Testing first and last minted tokens
    expect(await contract.tokenURI(1)).to.equal(`${uriPrefix}1${uriSuffix}`);
    expect(await contract.tokenURI(totalSupply)).to.equal(
      `${uriPrefix}${totalSupply}${uriSuffix}`
    );
  });
});
